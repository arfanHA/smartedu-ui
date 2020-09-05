import axios from 'axios'

let _http = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 15000,
    headers: { 'X-Custom-Header': 'foobar' }
});

_http.defaults.headers.post['Content-Type'] = 'application/json';
// export function setToken(token) {
//     _http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// } 

export default _http;