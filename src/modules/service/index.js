import Axios from './_Axios';
import urls from './RESTFULLURLS';

let FUNS = {};
Object.keys(urls).forEach((key)=>{
  FUNS[key] = (option = {})=>{
    return Axios(urls[key], option);
  }
});

export default FUNS;

