function ParseURL(buffer) {
  var result = { };
  result.protocol = "";
  result.user = "";
  result.password = "";
  result.host = "";
  result.port = "";
  result.path = "";
  result.query = "";

  var section = "PROTOCOL";
  var start = 0;
  var wasSlash = false;

  while(start < buffer.length) {
    if(section == "PROTOCOL") {
      if(buffer.charAt(start) == ':') {
        section = "AFTER_PROTOCOL";
        start++;
      } else if(buffer.charAt(start) == '/' && result.protocol.length() == 0) { 
        section = PATH;
      } else {
        result.protocol += buffer.charAt(start++);
      }
    } else if(section == "AFTER_PROTOCOL") {
      if(buffer.charAt(start) == '/') {
    if(!wasSlash) {
          wasSlash = true;
    } else {
          wasSlash = false;
          section = "USER";
    }
        start ++;
      } else {
        throw new ParseException("Protocol shell be separated with 2 slashes");
      }       
    } else if(section == "USER") {
      if(buffer.charAt(start) == '/') {
        result.host = result.user;
        result.user = "";
        section = "PATH";
      } else if(buffer.charAt(start) == '?') {
        result.host = result.user;
        result.user = "";
        section = "QUERY";
        start++;
      } else if(buffer.charAt(start) == ':') {
        section = "PASSWORD";
        start++;
      } else if(buffer.charAt(start) == '@') {
        section = "HOST";
        start++;
      } else {
        result.user += buffer.charAt(start++);
      }
    } else if(section == "PASSWORD") {
      if(buffer.charAt(start) == '/') {
        result.host = result.user;
        result.port = result.password;
        result.user = "";
        result.password = "";
        section = "PATH";
      } else if(buffer.charAt(start) == '?') {
        result.host = result.user;
        result.port = result.password;
        result.user = "";
        result.password = "";
        section = "QUERY";
        start ++;
      } else if(buffer.charAt(start) == '@') {
        section = "HOST";
        start++;
      } else {
        result.password += buffer.charAt(start++);
      }
    } else if(section == "HOST") {
      if(buffer.charAt(start) == '/') {
        section = "PATH";
      } else if(buffer.charAt(start) == ':') {
        section = "PORT";
        start++;
      } else if(buffer.charAt(start) == '?') {
        section = "QUERY";
        start++;
      } else {
        result.host += buffer.charAt(start++);
      }
    } else if(section == "PORT") {
      if(buffer.charAt(start) == '/') {
        section = "PATH";
      } else if(buffer.charAt(start) == '?') {
        section = "QUERY";
        start++;
      } else {
        result.port += buffer.charAt(start++);
      }
    } else if(section == "PATH") {
      if(buffer.charAt(start) == '?') {
    section = "QUERY";
    start ++;
      } else {
    result.path += buffer.charAt(start++);
      }
    } else if(section == "QUERY") {
      result.query += buffer.charAt(start++);
    }
  }

  if(section == "PROTOCOL") {
    result.host = result.protocol;
    result.protocol = "http";
  } else if(section == "AFTER_PROTOCOL") {
    throw new ParseException("Invalid url");
  } else if(section == "USER") {
    result.host = result.user;
    result.user = "";
  } else if(section == "PASSWORD") {
    result.host = result.user;
    result.port = result.password;
    result.user = "";
    result.password = "";
  }

  return result;
}