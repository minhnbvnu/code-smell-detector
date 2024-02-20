function _genSign(userinfo,sapiKey)
{
    //ksort(); //need to sort userinfo's key
    var queryString = query.stringify(userinfo);
  
    var addKey = queryString + '&sign_key=' + sapiKey;
    
   // console.log('addKey ::' + addKey);
    var md5 = crypto.createHash('md5');
    var result = md5.update(addKey).digest('hex');//hex, default is binary
   // console.log('result ::' + result);
    return result;
}