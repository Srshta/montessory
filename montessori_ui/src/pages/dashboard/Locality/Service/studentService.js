import requests from './httpService';

const StudentService = {
  getAllStudent(id) {
    return requests.get(`/student/list/${id}`);
  },
//   upadeCity(body) {
//     return requests.put(`/city/${body.id}`,body); 
//   },
  creteStudent(body){
    return requests.post('/student/add',body); 
  },
  getAllStudentById(id,body){
    return requests.post(`/student/list/${id}`,body); 
  },
  deleteStudent(id){
    return requests.delete(`/student/${id}`); 
  },
//   getAllCoupon() {
//     return requests.get('/coupon');
//   },
  upadeStudent(body) {
    return requests.put(`/student/${body._id}`,body); 
  },

  getByIdStudent(id) {
    return requests.get(`/student/${id}` );
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

export default StudentService;
