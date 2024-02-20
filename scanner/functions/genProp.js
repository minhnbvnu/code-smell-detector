function genProp(data){
    let returnProp = {}
    if(data.type == "character varying"){
        returnProp.type = "string"
    }else{
        returnProp.type = data.type;
    }
    if(data.maxLength){
        returnProp.maxLength = data.maxLength;
    }
    returnProp.required = !data.nullable;
    returnProp.description = "FILL ME OUT!!!!";
    return returnProp;

}