import axios from 'axios';

type requestType = 'get' | 'post';

interface ServerData {
  method: requestType,
  url: string,
  withCredentials: boolean,
  params: any,
  [string: string]: any,
}

const PATH = 'https://jsonplaceholder.typicode.com';

export const apiRequest = (method:requestType, path: string, { params }: any): Promise<any> =>
  new Promise(async (resolve, reject) => {
    const url = PATH.concat(path);

    try {
      const executeObject: ServerData = {
        method,
        url,
        withCredentials: true,
        params,
      };
      const result = await axios.request<ServerData>(executeObject);
  
      resolve(result.data);
    } catch (err) {
      console.log(`failed ${method} `, url);
      reject(err);
    }
  });
