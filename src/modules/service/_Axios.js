import Qs from 'qs'
import axios from 'axios'
import {getToken,removeToken} from "../utils/common";
import {MessageBox} from 'element-ui'
import autoMatchUrl from './autoMatchUrl'

//请求拦截器（于transformRequest之前处理）
axios.interceptors.request.use((config)=>{
  return config;
},(error)=>{
  return Promise.reject(error);
});

//返回拦截器（于transformResponse之后处理）
//返回的数据类型默认是json，若是其他类型就会出现问题，用try,catch捕获异常
axios.interceptors.response.use((response)=>{
  const res = response && response.data;
  const TITLE = '提示';
  const WITHOUTTOKEN = '登录已超时，请重新登陆';
  if(res && res.code === 2000){
    MessageBox.confirm(WITHOUTTOKEN,TITLE,{
      confirmButtonText:'确定',
      callback:()=>{
        removeToken();
        window.location.reload();
      }
    })
  }
  return response;
},(error)=>{
  return Promise.reject(error)
});

function checkStatus(response) {
  if (response) {
    const status = response.status;
    if (status === 200 || status === 304 || status === 400) {
      // 如果不需要除了data之外的数据，可以直接 return response.data
      return response;
    } else {
      let errorInfo = '';
      switch (status) {
        case -1:
          errorInfo = '远程服务响应失败,请稍后重试';
          break;
        case 500:
          errorInfo = '500：访问服务失败';
          break;
        case 404:
          errorInfo = '404：资源不存在';
          break;
        case 501:
          errorInfo = '501：未实现';
          break;
        case 502:
          errorInfo = '502：无效网关';
          break;
        case 401:
          errorInfo = '访问令牌无效或已过期';
          break;
      }
      return {
        status,
        msg: errorInfo
      }
    }
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  };
}

function checkCode(res) {
    const data = res && res.data;
    return data;

}

export default function _Axios(url,{
  method = 'post',
  timeout = 10000,
  prefix = '',
  data = {},
  headers = {},
  dataType = 'json'
}){
  const baseURL = autoMatchUrl(prefix);

  headers = Object.assign(method === 'get'?{
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  } : {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }, headers);

  const defaultConfig = {
    baseURL,
    url,
    method,
    params:data,
    data: data,
    timeout,
    headers,
    responseType: dataType
  };
  if(method === 'get'){
    //delete defaultConfig.data;
  }else{
    delete defaultConfig.params;
  }

  if (getToken() && getToken() !== 'undefined') {
    defaultConfig.data['sid'] = getToken();
  }

  const contentType = headers['Content-Type'];

  if (typeof contentType !== 'undefined') {
    if (~contentType.indexOf('multipart')) {
      // 类型 `multipart/form-data;`
      defaultConfig.data = data;
    } else if (~contentType.indexOf('json')) {
      // 类型 `application/json`
      // 服务器收到的raw body(原始数据) "{name:"jhon",sex:"man"}"（普通字符串）
      defaultConfig.data = JSON.stringify(data);
    } else {
      // 类型 `application/x-www-form-urlencoded`
      // 服务器收到的raw body(原始数据) name=homeway&key=nokey
      defaultConfig.data = Qs.stringify(data);
    }
  }
  return axios(defaultConfig)
    .then((response) => {
      return checkStatus(response);
    })
    .then((res) => {
      return checkCode(res);
    });
}

