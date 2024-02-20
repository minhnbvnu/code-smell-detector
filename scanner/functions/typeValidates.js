function typeValidates( type ){
        input.setAttribute("type", type);
        input.value = "\x01";
        return has("input-checkvalidity") && input.type == type &&
               (/search|tel/.test(type) || input.value != "\x01" || !input.checkValidity());
    }