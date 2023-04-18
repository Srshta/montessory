import requests from './httpService';
const CalelnderEventsService = {
  getAllCalelnderEvents(id) {
    return requests.get(`/calelnderevents/list/${id}`);
  },
  getCalelnderEvents(id) {
    return requests.get(`/calelnderevents/list/${id}`);
  },
//   upadeCity(body) {
//     return requests.put(`/city/${body.id}`,body); 
//   },
  creteCalelnderEvents(body){
    return requests.post('/calelnderevents/add',body); 
  },
  deleteCalelnderEvents(body){
    return requests.delete(`/calelnderevents/${body._id}`); 
  },
//   getAllCoupon() {
//     return requests.get('/coupon');
//   },
getAllAddClass() {
  return requests.get('/addclass');
},
  upadeCalelnderEvents(body) {
    return requests.put(`/calelnderevents/${body._id}`,body); 
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

export default CalelnderEventsService;
