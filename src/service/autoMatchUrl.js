/*
  根据prefix自动匹配基础url
 */

export default function autoMatchUrl(prefix){
  let baseUrl = '';
  switch (prefix){
    default:
      baseUrl =  'http://qupap.xin:3390/mms-web/';
  }
  return `${baseUrl}${prefix}`;
}
