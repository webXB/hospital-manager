/*
  根据prefix自动匹配基础url
 */

export default function autoMatchUrl(prefix){
  let baseUrl = '';
  switch (prefix){
    default:
      baseUrl = window.LOCAL_CONFIG.API_HOME;
  }
  return `${baseUrl}${prefix}`;
}
