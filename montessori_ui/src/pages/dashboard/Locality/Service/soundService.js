import requests from './httpService';
const SoundService = {
  getAllSound() {
    return requests.get(`/sound/list`);
  },
  creteSound(body){
    return requests.post('/sound/add',body); 
  },
  deleteSound(body){
    return requests.delete(`/sound/${body._id}`); 
  },
  findSoundList(body){
    return requests.post(`/sound/find`,body); 
  },
  upadeSound(body) {
    return requests.put(`/sound/${body._id}`,body); 
  },
  uploadImage(body){
    return requests.post('/sound/data/upload',body); 
  },
};
export default SoundService;
