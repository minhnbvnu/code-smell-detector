function retrieveFile(source) {
  return new Promise(function (resolve) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(this.responseText, 'ember-inspector');
    };
    xhr.open('GET', source, true);
    xhr.send();
  }, 'ember-inspector');
}