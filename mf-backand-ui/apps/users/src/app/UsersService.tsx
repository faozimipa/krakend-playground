import axios from 'axios';
import { Role } from './models/Role';
const API_URL = 'http://localhost:8000/api/';
let apiConfig = {
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
  },
};

class UsersService {
  getAll() {
    return axios.get(API_URL + 'users', apiConfig).then((response) => {
      return response.data;
    });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  }

  getUserRoles() {
    const userRoles = localStorage.getItem('roles');
    if (userRoles) return JSON.parse(userRoles);
    return [];
  }

  getUserPermissions() {
    const userPermissions = localStorage.getItem('permissions');
    if (userPermissions) return JSON.parse(userPermissions);
    return [];
  }

  getAllRoles() {
    return axios.get(API_URL + 'roles', apiConfig).then((response) => {
      return response.data;
    });
  }

  addRole(role: any) {
    return axios.post(API_URL + 'roles', role, apiConfig).then((response) => {
      return response.data;
    });
  }

  getAllPermissions() {
    return axios.get(API_URL + 'permissions', apiConfig).then((response) => {
      return response.data;
    });
  }
}

export default new UsersService();
