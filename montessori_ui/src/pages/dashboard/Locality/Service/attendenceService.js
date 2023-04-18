import requests from './httpService';
const AttendenceService = {
  getAllAttendence(id) {
    return requests.get(`/attendence/list/${id}`);
  },
  creteAttendence(body){
    return requests.post('/attendence/add',body); 
  },
  deleteAttendence(body){
    return requests.delete(`/attendence/${body._id}`); 
  },
// getAllAddClass() {
//   return requests.get('/addclass');
// },
  upadeAttendence(body) {
    return requests.put(`/attendence/${body._id}`,body); 
  },
  getStuAttReport(body){
    return requests.post('/attendence/getreports',body); 
  },
  findAttendenceList(body){
    return requests.post(`/attendence/find`,body); 
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

export default AttendenceService;
