import API from 'src/utils/api';
export const checkHello = async (bodyData) => {
  const { data } = await API.post('/student');
  console.log('data::::', data);
  return data;
};
