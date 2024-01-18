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
  upadeStudent(body) {
    return requests.put(`/student/${body._id}`,body); 
  },
  getByIdStudent(id) {
    return requests.get(`/student/${id}` );
  },
 
};

export default StudentService;
