function save_space(s, on_success, on_error) {
  if (s._id) {
    delete s['artifacts'];
    load_resource("put", "/spaces/"+s._id,s,on_success,on_error);
  } else {
    load_resource("post", "/spaces",s,on_success,on_error);
  }
}