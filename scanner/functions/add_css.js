function add_css (name) {
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = require.toUrl(name);
        document.getElementsByTagName('head')[0].appendChild(link);
    }