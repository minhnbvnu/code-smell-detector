function _pjs_getScript(url, success){
    var script = document.createElement('script'),
        head = document.getElementsByTagName('head')[0],
        done = false;
    script.src = url;
    script.onload = script.onreadystatechange=function(){
        if(!done&&(!this.readyState||this.readyState=='loaded'||this.readyState=='complete')){
            done = true;
            if (success) { success() }
            script.onload = script.onreadystatechange=null;
            head.removeChild(script);
        }
    };
    head.appendChild(script);
}