import FileSaver from 'file-saver';
import API from 'src/utils/api';
export const checkHello = async (bodyData) => {
  const { data } = await API.post('/student', JSON.stringify(bodyData));
  console.log('data::::', data);
  return data;
};

export const getHtmlInfo = async (bodyData) => {
  const { data, headers } = await API.post('/generateHtml', JSON.stringify(bodyData));
  console.log('data::::', data);
  console.log('headers::::', headers);
  var blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
  FileSaver.saveAs(blob, '사랑해.html');

  return data;
};
