import axios from "axios";

const applyJob = async (email, user_fullname, email_shopname, shopname, status, date) => {
  try {
    const response = await axios.post(`http://localhost:3001/applyjob`, { email, user_fullname, email_shopname, shopname, status, date });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getUserApplyJob = async (email) => {
  try {
    const response = await axios.get(`http://localhost:3001/userapplyjob/${email}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { applyJob, getUserApplyJob };
