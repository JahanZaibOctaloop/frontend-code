import {jwtDecode} from 'jwt-decode';

const verifyAdmin = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return false;
    }
    localStorage.setItem('userId', decoded.id);
    return decoded.role === 'admin';
  } catch (error) {
    console.error('Token verification error:', error);
    return false;
  }
};

export default verifyAdmin;
