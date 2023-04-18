import requests from './httpService';
const AddClassService = {
  getAllAddClass(id) {
    return requests.get(`/addclass/list/${id}`);
  },
//   upadeCity(body) {
//     return requests.put(`/city/${body.id}`,body); 
//   },
  creteAddClass(body){
    return requests.post('/addclass/add',body); 
  },
  deleteAddClass(body){
    return requests.delete(`/addclass/${body._id}`); 
  },
//   getAllCoupon() {
//     return requests.get('/coupon');
//   },
  upadeAddClass(body) {
    return requests.put(`/addclass/${body._id}`,body); 
  },

  getAddClassNameById(body){
    return requests.post('/addclassname/getAddClassNameById',body);
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

export default AddClassService;
