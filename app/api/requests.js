import axios from "axios";
const server_url = "http://localhost:5000/api";
// import Cookies from 'js-cookie';




function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export function getMyInfo(setDoctorsData) {
  const token = getCookie('token');
  console.log(document.cookie)
  console.log(token)
  axios.get(server_url + "/getMyInfo", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    setDoctorsData(res.data);
  });
}


 export function addDoctor(doctorInfo, setRes){
  axios
    .post(`${server_url}/addDoctor`, doctorInfo)
    .then((response) => {
      setRes({
        status: response.status,
        text: response.statusText
      });
      console.log("success");
    })
    .catch((err) => {
      console.log(err.response);
      console.log('bisey var');
      setRes({
        status: err.response?.status || 500, 
        text: err.response?.data?.message || 'An error occurred' 
      });
    });
}

export function addHospital(doctorInfo, setRes){
  axios
    .post(`${server_url}/addHospital`, doctorInfo)
    .then((response) => {
      setRes({
        status: response.status,
        text: response.statusText
      });
      console.log("success");
    })
    .catch((err) => {
      console.log(err.response);
      console.log('bisey var');
      setRes({
        status: err.response?.status || 500, 
        text: err.response?.data?.message || 'An error occurred' 
      });
    });
}

export function signup(userInfo, setRes, setCookie, setUsername){
  axios
    .post(`${server_url}/signup`, userInfo)
    .then((response) => {
      setRes({
        status: response.status,
        text: response.statusText
      });
      const token = response.data.token;
      console.log(token);
      setCookie('token', token, 7)
      setUsername(response.data.name);
    })
    .catch((err) => {
      console.log(err.response);
      console.log('bisey var');
      setRes({
        status: err.response?.status || 500, 
        text: err.response?.data?.message || 'An error occurred' 
      });
    });
}


export function getAllDoctors(setDoctorsData) {
  axios.get(server_url + "/getAllDoctors").then((res) => {
    setDoctorsData(res.data);
  });
}

export function getAllHospitals(setHospitalsData) {
  axios.get(server_url + "/getAllHospitals").then((res) => {
    setHospitalsData(res.data);
  });
}





// /** log into the system */
// export function adminLogin(loginInfo, setSuccess) {
//   axios
//     .post(`${server_url}api/token/`, loginInfo)
//     .then((response) => {
//       if (response.data.access) {
//         localStorage.setItem("admin", JSON.stringify(response.data));
//         setSuccess(true);
//       }

//       return response.data;
//     })
//     .catch((err) => {
//       console.log(err);
//       setSuccess(false);
//     });
// }




// /** approves the request (need authHeader) */
// export function approveRequest(id, navigate, setMsg) {
//   axios
//     .post(
//       `${server_url}api/requested/approve/${id}/`,
//       {},
//       {
//         headers: authHeader(),
//       }
//     )
//     .then((res) => {
//       if (res.status === 200) {
//         alert("Approved!");
//         navigate(-1);
//       } else {
//         setMsg(true);
//       }
//     });
// }

// /** reject the request (need authHeader) */
// export function rejectRequest(id, navigate, setMsg) {
//   axios
//     .post(
//       `${server_url}api/requested/reject/${id}/`,
//       {},
//       {
//         headers: authHeader(),
//       }
//     )
//     .then((res) => {
//       if (res.status === 200) {
//         alert("Rejected!");
//         navigate(-1);
//       } else {
//         setMsg(true);
//       }
//     })
//     .catch((err) => console.log(err));
// }
