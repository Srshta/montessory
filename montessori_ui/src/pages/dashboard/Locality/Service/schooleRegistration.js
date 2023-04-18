import requests from './httpService';
const SchooleRegistrationService = {
  getAllSchooleRegistration() {
    return requests.get('/registration');
  },
//   upadeCity(body) {
//     return requests.put(`/city/${body.id}`,body); 
//   },
  creteSchooleRegistration(body){
    return requests.post('/registration/add',body); 
  },
//   deleteCity(body){
//     return requests.delete(`/city/${body._id}`); 
//   },
//   getAllCoupon() {
//     return requests.get('/coupon');
//   },
//   upadeCoupon(body) {
//     return requests.put(`/coupon/${body._id}`,body); 
//   },
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

export default SchooleRegistrationService;
