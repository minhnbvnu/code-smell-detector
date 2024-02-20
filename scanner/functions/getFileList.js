function getFileList(cssList, name){
    var matchFileList = []
    for(var i = 0; i < cssList.length; i++){
        var url = cssList[i]
        var fileName = url.substring(url.lastIndexOf("/")+1)
        // 可匹配[fileName].css 
        // [fileName]-[themeType].css 
        // [fileName]-[themeType].[hash]css 等
        var reg = new RegExp("^"+ name + "(\\-\\w+)*(\\.\\w+)*\\.css$")
        if(reg.test(fileName)) {
            matchFileList.push(url)
        }
    }
    return matchFileList
}