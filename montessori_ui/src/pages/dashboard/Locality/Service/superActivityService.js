import requests from './httpService';
const SuperActivityTabelService = {
  getAllSuperActivity(id) {
    return requests.get(`/superactivity/list/${id}`);
  },
  getStudentSuperActivity(id) {
    return requests.get(`/superactivity/list/${id}`);
  },
//   upadeCity(body) {
//     return requests.put(`/city/${body.id}`,body); 
//   },
  creteSuperActivity(body){
    return requests.post('/superactivity/add',body); 
  },
  deleteSuperActivity(body){
    return requests.delete(`/superactivity/${body._id}`); 
  },
//   getAllCoupon() {
//     return requests.get('/coupon');
//   },
// getAllAddClass() {
//   return requests.get('/addclass');
// },
  upadeSuperActivity(body) {
    return requests.put(`/superactivity/${body._id}`,body); 
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

export default SuperActivityTabelService;
