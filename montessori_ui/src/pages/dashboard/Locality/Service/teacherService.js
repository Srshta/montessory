import requests from './httpService';
const TeacherService = {
  getAllTeacher(id) {
    return requests.get(`/teacher/list/${id}`);
  },
//   upadeCity(body) {
//     return requests.put(`/city/${body.id}`,body); 
//   },
  creteTeacher(body){
    return requests.post('/teacher/add',body); 
  },
  deleteTeacher(body){
    return requests.delete(`/teacher/${body._id}`); 
  },
//   getAllCoupon() {
//     return requests.get('/coupon');
//   },
getAllAddClass() {
  return requests.get('/addclass');
},

  upadeTeacher(body) {
    return requests.put(`/teacher/${body._id}`,body); 
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

export default TeacherService;
