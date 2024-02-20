function endcloseplugin(err) {
  return function(type) {
    if (err) setStyle = "error";
    if (type == "endPlugin") return cont();
    return pass();
  };
}