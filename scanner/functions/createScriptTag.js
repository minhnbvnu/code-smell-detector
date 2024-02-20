function createScriptTag(scr, url, charset) {
            scr.setAttribute('type', 'text/javascript');
            scr.setAttribute('defer', 'defer');
            charset && scr.setAttribute('charset', charset);
            scr.setAttribute('src', url);
            document.getElementsByTagName('head')[0].appendChild(scr);
        }