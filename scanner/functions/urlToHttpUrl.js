function urlToHttpUrl(url,rep){
    
    var patt1 = new RegExp("^//");
    var result = patt1.test(url);
    if(result){
        url = rep+":"+url;
    }
    return  url;
}