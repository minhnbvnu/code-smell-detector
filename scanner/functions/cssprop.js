function cssprop(name, el){
        var supported = false,
            capitalized = name.charAt(0).toUpperCase() + name.slice(1),
            length = VENDOR_PREFIXES.length,
            style = el.style;

        if(typeof style[name] == "string"){
            supported = true;
        }else{
            while(length--){
                if(typeof style[VENDOR_PREFIXES[length] + capitalized] == "string"){
                    supported = true;
                    break;
                }
            }
        }
        return supported;
    }