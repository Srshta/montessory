require('dotenv').config();

var fs = require('fs');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const mongoose = require("mongoose");
const connectDB = require('../config/db');
// const productRoutes = require('../routes/productRoutes');
const userRoutes = require('../routes/userRoutes');
const adminRoutes = require('../routes/adminRoutes');
const registrationRoutes = require('../routes/schooleRegistrationRoutes');
const calelnderEventsRoutes =require('../routes/calenderEventsRoutes');
const activityTabelRoutes = require('../routes/activityTabelRoutes')
const superActivityRoutes = require('../routes/superActivityRoutes')
const subActivityRoutes = require('../routes/subActivityRoutes')
const studentRouter =require('../routes/studentRoutes')
const  addClassRoutes =require('../routes/addClassRoutes')
const  teacherRoutes =require('../routes/teacherRoutes')
const activityRoutes =require('../routes/activityRoutes')
const attendenceRoutes =require('../routes/attendenceRoutes')
const specialObservation=require('../routes/specialObservationRoutes')
// const soundRoutes=require('../routes/soundRoutes')
const { isAuth, isAdmin } = require('../config/auth');
const SpecialObservation = require('../models/SpecialObservation');
connectDB();
const app = express();
// We are using this for the express-rate-limit middleware
// See: https://github.com/nfriedly/express-rate-limit
// app.enable('trust proxy');
app.set('trust proxy', 1);
app.use(express.static("public"));
app.use(express.static("client"));
app.use(express.json({ limit: '4mb' }));
app.use(express.urlencoded({
  extended: false
}));
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(cors());
let bucket;
mongoose.connection.on("connected", () => {
  var db = mongoose.connections[0].db;
  bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "newBucket"
  });
  console.log("connected");
});
//root route
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname,"public","admin/index.html"));
});
app.use('/client', (req, res) => {
  res.sendFile(path.join(__dirname,"public","client/index.html"));
});
//this for route will need for store front, also for admin dashboard
// app.use('/api/products/', productRoutes);


app.get("/api/image/download/:filename", (req, res) => {
  const file = bucket
    .find({
      filename: req.params.filename
    })
    .toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404)
          .json({
            err: "no files exist"
          });
      }
      console.log
      res.writeHead(200, {'Content-Type': files[0].contentType});
      bucket.openDownloadStreamByName(req.params.filename,{contentType:'image/png'})
        .pipe(res);
    });
});
;
app.use('/api/user/', userRoutes);
//if you not use admin dashboard then these two route will not needed.
app.use('/api/admin/', adminRoutes);
// Use express's default error handling middleware
app.use('/api/addclass', addClassRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/activity', activityRoutes)
app.use('/api/calelnderevents', calelnderEventsRoutes)
app.use('/api/attendence', attendenceRoutes)
app.use('/api/registration', registrationRoutes);
app.use('/api/student', studentRouter)
app.use('/api/activitytabel', activityTabelRoutes )
app.use('/api/superactivity', superActivityRoutes )
app.use('/api/subactivity', subActivityRoutes)
app.use('/api/specialobservation', specialObservation)
// app.use('/api/sound', soundRoutes)
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(400).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`server running on port ${PORT}`));

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
