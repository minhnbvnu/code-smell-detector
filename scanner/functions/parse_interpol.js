function parse_interpol(value) {
    var items = [],
        pos = 0,
        next = 0,
        match;
    while (true) {
      // Match up to embedded string
      next = value.substr(pos).search(embedder);
      if (next < 0) {
        if (pos < value.length) {
          items.push(JSON.stringify(value.substr(pos)));
        }
        break;
      }
      items.push(JSON.stringify(value.substr(pos, next)));
      pos += next;

      // Match embedded string
      match = value.substr(pos).match(embedder);
      next = match[0].length;
      if (next < 0) { break; }
      if(match[1] === "#"){
        items.push(escaperName+"("+(match[2] || match[3])+")");
      }else{
        //unsafe!!!
        items.push(match[2] || match[3]);
      }
      
      pos += next;
    }
    return items.filter(function (part) { return part && part.length > 0}).join(" +\n");
  }