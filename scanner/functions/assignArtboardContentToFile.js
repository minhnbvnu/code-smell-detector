function assignArtboardContentToFile(name, abData, outputArr) {
  var obj = find(outputArr, function(o) {return o.name == name;});
  if (!obj) {
    obj = {name: name, html: '', js: '', css: ''};
    outputArr.push(obj);
  }
  obj.html += abData.html;
  obj.js += abData.js;
  obj.css += abData.css;
}