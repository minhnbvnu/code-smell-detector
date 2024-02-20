function parseEBML(string){
  var offset = 0;
  var json = {};
  while(offset < string.length){
    var el_id = toBinary(string.substr(offset, 4));
    var segments = el_id.match(/^0*1/)[0].length;
    var id = el_id.substring(segments - 1, segments * 8);
    var hexid = parseInt(id, 2).toString(16);

    offset += segments;
    
    var el_size = toBinary(string.substr(offset, 8));
    var segments = el_size.match(/^0*1/)[0].length;
    var size = parseInt(el_size.substring(segments, segments * 8),2);
    
    offset += segments;

    var data = string.substr(offset, size);
    offset += size;
    var element = schema[hexid];
    var name = element ? element.name : hexid;
    var value = data;

    console.log(string.substr(offset, 4), name, el_id)
    if(element){
      var type = element.type;

      if(type == 'm'){
        value = parseEBML(data);
      }else if(type == 's'){
        value = data;
      }else if(type == 'u'){
        value = parseInt(toBinary(data),2);
      }else if(type == "8"){
        //TODO: parse UTF 8

        value = data;
      }else if(type == "b"){
        //binary
        value = data;
      }else if(type == "f"){
        //float
        value = numparse.toDouble(data)
      }else{
        console.log('unknown type', type)
      }
    }
    var parsed_data = value //{original: data, val: value}; //so that generateEBML can return original.
    if(!element || element.mu){
      if(!json[name]) json[name] = [];
      json[name].push(parsed_data);
    }else{
      json[name] = parsed_data;
    }
    //console.log(hexid, size, data);
    
  }

  return json;
}