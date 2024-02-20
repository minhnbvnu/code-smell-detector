function isSongMenuExist(name,array){
    return array.some((item)=>{
        return item===name;
    });
}