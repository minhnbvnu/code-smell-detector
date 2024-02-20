function del(url, fn){
  var req = request('DELETE', url);
  if (fn) req.end(fn);
  return req;
}