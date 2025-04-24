import axios from "axios";

const bdbiblioteca_unheval = axios.create({
  baseURL: 'http://127.0.0.1:8000/api'
})

export default bdbiblioteca_unheval