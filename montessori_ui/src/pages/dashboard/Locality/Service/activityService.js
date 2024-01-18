import requests from './httpService';
const ActivityService = {
  getAllActivity(id) {
    return requests.get(`/activity/list/${id}`);
  },
  getAllSuperActivity(id) {
    return requests.get(`/superactivity/list/${id}`);
  },
//   upadeCity(body) {
//     return requests.put(`/city/${body.id}`,body); 
//   },
  creteActivity(body){
    return requests.post('/activity/add',body); 
  },
  deleteActivity(body){
    return requests.delete(`/activity/${body}`); 
    
  },



  findActivityList(body){
    return requests.post(`/activity/find`,body); 
  },
//   getAllCoupon() {
//     return requests.get('/coupon');
//   },
getAllAddClass() {
  return requests.get('/addclass');
},

  upadeActivity(body) {
    return requests.put(`/activity/${body._id}`,body); 
  },
//   creteCoupon(body){
//     return requests.post('/coupon/add',body); 
//   },
//   deleteCoupon(body){
//     return requests.delete(`/coupon/${body._id}`); 
//   },
//   createVendorOrdersById(body){
//     return requests.post('/orders/getvendororders',body); 
//   },

//   getAllVendorList() {
//     return requests.get('/vendorlist');
//   },
userPermitions(){
  const userDetails = JSON.parse(localStorage.getItem("userDetail"));
switch(userDetails.role){
case 'SCHOOLE':
return {studentDetailsEdit:true, studentDetailsDelete:true,
  //  studentActivityEdit:true, studentActivityDelete:true
  }
case 'TEACHER':
return {studentDetailsEdit:false, studentDetailsDelete:false,
  studentActivityEdit:false, studentActivityDelete:false}
case 'PARENT':
return {ageEdit:false}
}
}
};




export default ActivityService;
