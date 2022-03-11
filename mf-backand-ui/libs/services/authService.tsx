import axios from 'axios';
const API_URL = 'http://localhost:8000/api/';
class AuthService {
  login(email: string, password: string) {
    return axios
      .post(API_URL + 'login', {
        email,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          localStorage.setItem('roles', JSON.stringify(response.data.roles));
          localStorage.setItem('permissions', JSON.stringify(response.data.permissions));
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    localStorage.removeItem('roles');
    localStorage.removeItem('permissions');
  }
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  }
  getUserRoles(){
    const userRoles = localStorage.getItem('roles');
    if (userRoles) return JSON.parse(userRoles);
    return [];
  }
  getUserPermissions(){
    const userPermissions = localStorage.getItem('permissions');
    if (userPermissions) return JSON.parse(userPermissions);
    return [];
  }
}

export default new AuthService();
