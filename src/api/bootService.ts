import API from 'src/utils/api';
export const checkHello = async (bodyData) => {
  const { data } = await API.post('/student', JSON.stringify(bodyData));
  console.log('data::::', data);
  return data;
};

export const getHtmlInfo = async (bodyData) => {
  const { data } = await API.post('/generateHtml', JSON.stringify(bodyData));
  console.log('data::::', data);
  return data;
};
