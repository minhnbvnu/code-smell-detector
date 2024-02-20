function diffAttr(oldAttrs, newAttrs){
    let patch = {};
    for(let key in oldAttrs){
        if(oldAttrs[key] !== newAttrs[key]){
            patch[key] = newAttrs[key];
        }
    }

    for(let key in newAttrs){
        if(!oldAttrs.hasOwnProperty(key)){
            patch[key] = newAttrs[key]
        }
    }
    return patch;
}