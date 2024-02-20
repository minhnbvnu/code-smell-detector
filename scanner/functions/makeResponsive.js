function makeResponsive(el){
       var svg = el.getElementsByTagName("svg")[0];
       if (svg) {
        if (svg.width) {svg.removeAttribute("width")}
        if (svg.height) {svg.removeAttribute("height")}
        svg.style.width = "100%";
        svg.style.height = "100%";
       }
    }