import axios from 'axios';
import {BASE_URL} from './baseApi';


export function loadMessages() {
  return axios.get(`${BASE_URL}/message`);
}