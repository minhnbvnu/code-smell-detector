function mapUrlObjToFuncObj(urlObj){
  const API = {};
  keys(urlObj).forEach((key)=>{
    const item = urlObj[key]; 
    API[key]=function(params){
      return http[item.method](item.url,params,item.option);
    }
  });
  return API;
}