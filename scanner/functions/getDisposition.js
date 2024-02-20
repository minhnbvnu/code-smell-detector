function getDisposition(obj) {
  var dispotion;
  if (obj.required) {
    disposition = obj.required.slice(0);
  } else {
    disposition = [];
  }

  for (var k in obj.properties) {
    if (obj.properties.hasOwnProperty(k)) {
      if (-1 === disposition.indexOf(k)) {
        disposition.push(k);
      }
    }
  }

  return disposition;

}