type ResquestType = {
  REQUEST: string,
  SUCCESS: string,
  FAILURE: string,
};

type REQUEST = 'REQUEST' | 'SUCCESS' | 'FAILURE';

const REQUEST_TYPE_LIST: Array<REQUEST> = ['REQUEST', 'SUCCESS', 'FAILURE'];

export function createRequestTypes(base: string): ResquestType {
  const res = {
    REQUEST: '',
    SUCCESS: '',
    FAILURE: '',
  };

  REQUEST_TYPE_LIST.forEach(type => (res[type] = `${base}_${type}`));

  return res;
}
