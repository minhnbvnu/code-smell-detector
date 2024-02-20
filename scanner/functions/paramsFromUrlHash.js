function paramsFromUrlHash(){
        return window.location.hash.replace(/^#/,'').split('&').reduce(function(o,entry){ if(entry=='') return o; entry=entry.split('='); o[decodeURIComponent(entry[0])] = decodeURIComponent(entry[1]); return o;},{});
    }