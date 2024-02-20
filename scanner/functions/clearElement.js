function clearElement(el){
        if(el){
            while(el.lastChild){
                el.removeChild(el.lastChild);
            }
        }
        return el;
    }