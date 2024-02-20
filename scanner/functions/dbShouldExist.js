function dbShouldExist(name) {
  return new Promise(function (resolve) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      xhr.status.should.equal(200);
      resolve();
    };
    xhr.open('HEAD', 'http://localhost:5984/' + name);
    xhr.send();
  });
}