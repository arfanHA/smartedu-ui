import axios from 'axios'

let _http = axios.create({
    baseURL: process.env.VUE_APP_HOST,
    timeout: process.env.VUE_APP_TIMEOUT,
    // headers: { 'X-Custom-Header': 'foobar' }
});

// _http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
_http.defaults.headers.post['Content-Type'] = 'application/json';
// export function setToken(token) {
//     _http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// } 

export default _http;