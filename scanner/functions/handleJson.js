function handleJson(json) {
    var curData = mockEditor.curData;
    try {
      curData.text = json;
      var obj = JSON.parse(json);
      curData.format = true;
      curData.jsonData = obj;      
    } catch (e) {
      curData.format = e.message;
    }
  }