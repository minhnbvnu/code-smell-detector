function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.test.hellobutton/" + s : s.substring(0, index) + "/com.test.hellobutton/" + s.substring(index + 1);
    return path;
}