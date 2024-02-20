function postaria2obj(addobj, callback = null) {
  var aria2jsonrpcpath = getStorage('path');

  var result = parse_url(aria2jsonrpcpath);
  var auth = result[1];
  if (auth && auth.indexOf('token:') == 0) {
    if (addobj.params) {
      addobj.params.unshift(auth);
    } else {
      addobj.params = [auth];
    }
  }

  fetch(result[0] + '?tm=' + (new Date()).getTime().toString(), {
    method: 'POST',
    body: JSON.stringify(addobj),
    headers: {
      'Authorization': auth,
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }).then((response) => {
    return response.json()
  }).then((data) => {
    if (callback) {
      callback(data)
    }
  }).catch((error) => {
    console.error('Error:', error)
    console.log('Error aria2 configuration!');
    if (addobj && addobj.method === 'aria2.addUri') {
      notice('Error adding tasks to aria2,please check the configuration!', 'Error');
    }
  })

  return 'ok';

}