function mapUrlObjToStrObj(urlObj){
  const Url = {};
  keys(urlObj).forEach((key)=>{
    const item = urlObj[key];
    Url[key]=item.url;
  });
  return Url;
}