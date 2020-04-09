// Importando Axios
import axios from 'axios';
// 'Criando' o axios, o baseurl será a url que sera mantida em todas as chamadas.
const api = axios.create({
    baseURL: 'http://192.168.0.102:3333',
})

export default api;