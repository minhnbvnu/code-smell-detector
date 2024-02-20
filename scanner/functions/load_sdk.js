function load_sdk(s, id, src) {
    var js, fjs = document.getElementsByTagName(s)[0];
    if (document.getElementById(id)) return;
    js = document.createElement(s);
    js.id = id;
    js.src = src;
    fjs.parentNode.insertBefore(js, fjs);
}