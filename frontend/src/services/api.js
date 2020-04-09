// Importando Axios
import axios from 'axios';
// 'Criando' o axios, o baseurl será a url que sera mantida em todas as chamadas.
const api = axios.create({
    baseURL: 'http://localhost:3333',
})

export default api;