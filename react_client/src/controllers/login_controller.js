import { post } from '../services/login_service';

export const login = async (email, password) => {
  return await post("api/login/", email, password);
};