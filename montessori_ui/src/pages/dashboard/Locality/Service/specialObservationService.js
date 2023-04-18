import requests from './httpService';
const SpecialObservationService = {

  getAllSpecialObservation(id) {
    return requests.get(`/specialobservation/list/${id}`);
  },

  creteSpecialobservation(body){
    return requests.post('/specialobservation/add',body); 
  },
  deleteSpecialobservation(body){
    return requests.delete(`/specialobservation/${body._id}`); 
  },

  upadeSpecialobservation(body) {
    return requests.put(`/specialobservation/${body._id}`,body); 
  },
}


export default SpecialObservationService;
