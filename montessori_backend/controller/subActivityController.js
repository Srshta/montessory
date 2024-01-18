const SubActivity = require('../models/SubActivity');
const SuperActivity = require('../models/SuperActivity');
const Activity = require('../models/Activity');
const ActivityList = require('../models/ActivityList');
const AttendenceReport = require('../models/AttendenceReport');
var html_to_pdf = require('html-pdf-node');
const fs = require('fs');

const bcrypt = require('bcryptjs');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
const { signInToken, tokenForVerify, sendEmail } = require('../config/auth');
// const {replaceStr} = require('../utils/activites')
// const {replaceStr} = require('../activity')
dayjs.extend(utc);
const addSubActivity = async (req, res) => {
    try {
      const newSubActivity = new SubActivity(req.body);
      await newSubActivity.save();
      res.status(200).send({
        message: 'Sub Activity Tabel Added Successfully!',
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };
//   const loginActivity = async (req, res) => {
//     try {
//       const activity = await Activity.findOne({ mobileNumber: req.body.mobileNumber });
//       if (teacher && bcrypt.compareSync(req.body.password, teacher.password)) {
//         const token = signInToken(teacher);
//         res.send({
//           token,
//           _id: teacher._id,
//           name: teacher.orgName,
//           phone: teacher.mobileNumber,
//           email:teacher.email,
//         });
//       } else {
//         res.status(401).send({
//           message: 'Invalid Email or password!',
//         });
//       }
//     } catch (err) {
//       res.status(500).send({
//         message: err.message,
//       });
//     }
//   };
  const addAllSubActivity = async (req, res) => {
    try {
      await SubActivity.insertMany(req.body);
      res.status(200).send({
        message: 'Sub Activity Tabel Added successfully!',
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };
  const addAllSubActivityByActivityId = async (req, res) => {
    try {
      let preparePost ={};
      if(req.body.schooleId){
        preparePost = {"schooleId" : ObjectId(req.body.schooleId)};
      }
      if(req.body.activityId){
        preparePost = {...preparePost,...{"activityId" : ObjectId(req.body.activityId)}};
      }
      const subActivity = await SubActivity.find(preparePost).populate("schooleId").populate("activityId");
      res.send(subActivity);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };

  const getAllSubActivity = async (req, res) => {
    try {
      let preparePost ={};
      if(req.params.schooleId){
        preparePost = {"schooleId" : ObjectId(req.params.schooleId)};
      }
      const subActivity = await SubActivity.find(preparePost).populate("schooleId").populate("activityId");
      res.send(subActivity);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };
  
  const getStudentReport = async (req, res) => {
    let preparePost ={};
    let tableData = '';
    if(req.body.studentId){
      preparePost = {...preparePost,...{"studentId" : ObjectId(req.body.studentId)}};
    }
    if(req.body.startDate1 && req.body.endDate1){
      preparePost = {...preparePost,...{"date" : {$gte:new Date(req.body.startDate1).toISOString(), $lt:new Date(req.body.endDate1).toISOString()}}};
    }
   
 
    try {
      let attendencePercentage=0;

      const activity = await Activity.find(preparePost).populate("schooleId")
      .populate("studentId").populate("superActivityId").populate("activityId").populate("subActivityId");
      let studentReport;

const attendenceReport = await AttendenceReport.aggregate(
  
  [
    {
      $match: preparePost
    },
    {
      $group: {
        _id: '$studentId',
        "present": {
          "$sum": {
            "$cond": [
              { "$eq": ["$status", true] },
              1,
              0]
          }
        },
        "absent": {
          "$sum": {
            "$cond": [
              { "$eq": ["$status", false] },
              1,
              0]
          }
        },
        count: { $sum: 1 },
        "studentDetails": { "$push": "$$ROOT" }
      }
    }
  ]
);
if(attendenceReport.length>0){

const present=  attendenceReport[0].present;
const count=  attendenceReport[0].count;
attendencePercentage = present*100/count;
}
console.log(attendencePercentage)
console.log("attendence")
      if(activity.length>0){
         studentReport ={
          studentName:activity[0].studentId.firstName,
          doa:activity[0].studentId.doa,
          selectCity:activity[0].studentId.selectCity,
          activity:[]
          }
          studentReport.activity =  activity.map(dataresult=>{
            return { 
              superActivity:dataresult.superActivityId.superActivityName,
              activity:dataresult.activityId.activityName,
              subActivity:dataresult.subActivityId.subActivityName,
              remarks:dataresult.remarks,
              key:dataresult.key,
            }
          }
          )
      
      studentReport.activity  = studentReport.activity.reduce((result, item) => {
        const superActivity = item.superActivity;
        if (!result[superActivity]) {
          result[superActivity] = [];
        }
        result[superActivity].push(item);
        return result;
      }, {});
      
// Create table rows

for (const superActivity in studentReport.activity) {

 
  tableData += '<table style="width:95% ; border:1px solid black;">'
  tableData += '<tbody>'
  tableData  += `<tr>
  <th >Area Of Work</th>
  <th>Activity</th>
  <th>Key</th></tr>`;
  // tbody.appendChild(headerRow);
  // table.appendChild(thead);
    const activityArray = studentReport.activity[superActivity];
    // const row1 = document.createElement('tr');
     tableData  +=  `
      <tr>
        <td style="font-weight: bolder; ">${superActivity}</td>
   
        </tr>
      `;
  
    // tbody.appendChild(row1);clear
    let htmltr ='<tr>';
    for (const activityObj of activityArray) {
      //const row = document.createElement('tr');
      let htmlTd = `
        <td>${activityObj.superActivity}</td>
        <td>${activityObj.activity}</td>
  
        <td>${activityObj.key}</td>
      `;
      htmltr += htmlTd;
     // tbody.appendChild(row);
    }
    htmltr += '</tr>';
    tableData += htmltr;
    tableData += '</tbody>';
    tableData += '</table>';
   
    tableData += '<br><br><br><br>'
  }

  let options = { format: 'A4' ,displayHeaderFooter :true,displayHeaderFooter :true};
  let file = { content: `
  <!DOCTYPE html>
<html>
<head>
<style>
body {
margin: 0;
}
table, th, td {
border:1px solid black;

border-collapse: collapse;
}
td{
text-align:left;
}
.container {
border: 3px solid black;
width: 100%;
padding: 10px;
}

.logo {
display: block;
margin: 0 auto;
text-align: center;
}

h1, h3 {
margin: 0;
}

</style>
</head>
<body>
<div class="container" style="text-align: center;border: 4px solid yellow;margin: 10px;">
<img src="https://img.freepik.com/free-vector/gradient-high-school-logo-design_23-2149626932.jpg" 
style="width:20%" alt="Logo" class="logo">
<br>
<br>
<br>
<br>
<h2>Student Name: ${studentReport.studentName}</h2>
<br>
<h3>Date of Admission: ${studentReport.doa}</h3>
<br>
<h3>Address: ${studentReport.selectCity}</h3>
<br>
<h3>Attendence: ${attendencePercentage}</h3>
<br>
<tr style="text-align: center; border:1px solid black;">
  <td style="text-align: center; border:1px solid black; width:90px">Key --</td>
  <td style="text-align: center; border:1px solid black; width:239px">N: Not yet Presented </td>
  <td style="text-align: center; border:1px solid black;width:239px">A: Works with Assistance</td>
<td style="text-align: center; border:1px solid black;width:239px">I: Works Independently</td>
</tr>
</table>
<br>
<br>
<br>
<br>
<br>
<br>
${tableData}


</div>
</body>
</html>

  ` };


  html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
    const filePath = `./${studentReport.studentName}.pdf`;
    
    res.send({"pdfBuffer":pdfBuffer});
    // fs.writeFile(filePath, pdfBuffer, (error) => {
    //   if (error) {
    //     console.error('Error writing file:', error);
    //   } else {
    //     console.log('File was successfully written!');
    //   }
      
    // });
  });
} else {
  res.status(500).send({
    message: 'Records are not found',
  });
}  
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
    
  }
   
  
const findSubActivityList=async(req, res)=>{
  let preparePost ={};
  if(req.body.schooleId){
    preparePost = {"schooleId" : ObjectId(req.body.schooleId)};
  }
  try {
    const subActivity = await SubActivity.find(preparePost).populate("schooleId");
    res.send(subActivity);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}
  const getSubActivityById = async (req, res) => {
    try {
      const subActivity = await SubActivity.findById(req.params.id);
      res.send(subActivity);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };
  const updateSubActivity = async (req, res) => {
    try {
      console.log(req.params.id)
      const subActivity = await SubActivity.findById(req.params.id);
      if (subActivity) {
        subActivity.schooleId = req.body.schooleId;
        subActivity.activityId = req.body.activityId;
        subActivity.subActivityName = req.body.subActivityName;
        await subActivity.save();
        res.send({ message: 'Sub Activity Updated Successfully!' });
      }
    } catch (err) {
      res.status(400).send({ message: err });
    }
  };
  const deleteSubActivity = (req, res) => {
    SubActivity.deleteOne({ _id: req.params.id }, (err) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.status(200).send({
          message: 'Sub Activity Deleted Successfully!',
        });
      }
    });
  };
  const uploadBulkRecords=async (req, res)=>{
    try {
      // const superActivity = await SuperActivity.find({});
      const activityList = await ActivityList.find({});
    //  console.log(superActivity);
     console.log(activityList);

//     for (let i=0; i<replaceStr.length; i++){
//      const subActivityData = replaceStr[i];
//       // const superactivityname = subActivityData.superactivityname;
//       const activityes = subActivityData.activityes;
//       const subactivitys = subActivityData.subactivitys;

//       const getactivityes = activityList.find(activity=>
//          {
         
//           return  activity.activityName.trim().toLowerCase() ===activityes.trim().toLowerCase();
//       }
//       );

   
//      const jsonData = {
//       subActivityName:subactivitys,
//       activityId:getactivityes._id,
//       schooleId:"63bd1c36e6f3e018ac02b374"
//      };
//      console.log(jsonData);
//   //  const newSubActivity =  new SubActivity(jsonData);
//   //  await newSubActivity.save();

//       //console.log(subActivityData);

//       //const splitData = subActivityData.activityList.trim().split(",");
// //       for(let l=0;l<splitData.length;l++){
// // console.log(splitData[l])
// // if(splitData[l] && splitData[l] !== ''){

// //   // const newSubActivity = new SubActivity({subActivityName:splitData[l].trim(),
// //   // "activityId" : subActivityData.subActivityId,
// //   // "schooleId" : '63bd1c36e6f3e018ac02b374'});
// //   //  newSubActivity.save();
// // }
// //       }

//   }
} catch (err) {
     console.log(err)
}
    res.send({ message: 'Uploaded Successfully!' });
    
  }
  module.exports = {
    addSubActivity,
     addAllSubActivity,
    getAllSubActivity,
   getSubActivityById,
    updateSubActivity,
    getStudentReport,
    deleteSubActivity,
    findSubActivityList,
    addAllSubActivityByActivityId,
    uploadBulkRecords
    // loginActivity,
    
  };