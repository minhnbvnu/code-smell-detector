function searchCookie(regex) {
  var cs = document.cookie.split(/;\s*/), ret=[];
  $.each(cs, function(i,c) {
      if (c.match(regex)) {
          var cook = c.split('=');
          ret.push({"name": cook[0], "val": cook[1]});
      }
      });
  return ret;
}