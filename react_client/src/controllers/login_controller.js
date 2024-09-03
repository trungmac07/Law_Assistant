import { post_login } from '../services/login_service';

export const login = async (email, password) => {
  return await post_login("api/login/", email, password);
};