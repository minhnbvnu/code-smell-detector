function stopRepeatRequest(url, c){
    for( let i = 0; i < requestList.length; i++){
        if(requestList[i] == url){
            c()
            return
        }
    }
    requestList.push(url)
}