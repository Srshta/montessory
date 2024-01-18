import requests from './httpService';
const SubActivityService = {
  getAllSubActivity(id) {
    return requests.get(`/subactivity/list/${id}`);
  },
  findActivityList(body){
    return requests.post(`/activity/find`,body); 
  },
  getAllSubActivityByActivityId(body) {
    return requests.post(`/subactivity/listbyactivityid`,body);
  },
//   upadeCity(body) {
//     return requests.put(`/city/${body.id}`,body); 
//   },
  creteSubActivity(body){
    return requests.post('/subactivity/add',body); 
  },
  deleteSubActivity(body){
    return requests.delete(`/subactivity/${body._id}`); 
  },
  getStudentReport(body){
    return requests.post(`/subactivity/studentreport`,body); 
  },
 
//   getAllCoupon() {
//     return requests.get('/coupon');
//   },
getAllAddClass() {
  return requests.get('/addclass');
},
  upadeSubActivity(body) {
    return requests.put(`/subactivity/${body._id}`,body); 
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

};

export default SubActivityService;
