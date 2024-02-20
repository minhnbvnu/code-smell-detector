function queryStringToSign (options){
  return 'GET\n\n\n' + options.date + '\n' + options.resource
}