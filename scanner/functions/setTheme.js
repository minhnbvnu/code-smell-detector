function setTheme(fileName){
    // 获取head中的外链样式表组
    var domHead = document.getElementsByTagName('HEAD').item(0),
        styleList = domHead.querySelectorAll("link[rel='stylesheet']"),
        urlList = [],
        themeList = []

    for(var i = 0; i < styleList.length; i++){
        urlList.push(styleList[i].getAttribute("href"))
    }
        
    // 获取已加载的主题文件列表
    themeList = getFileList(urlList, fileName.split("-")[0])

    // 如果head中的样式表中没有对应的文件则向head中写入file
    if(window.themeURL){
        // 删除其他主题文件
        themeList.forEach(el => {
            if(window.themeURL.indexOf(el) >= 0){
                var item = document.querySelectorAll(`link[href="${el}"]`)[0]
                item.parentNode.removeChild(item)
            }
        })
        // 插入新style
        var style = document.createElement("link");
        var matchFileURL = getFileList(window.themeURL, fileName)
        if(matchFileURL.length > 1 || matchFileURL.length < 0){
            console.error("主题文件的文件名格式错误，出现多个或没有样式文件！")
            return
        }
        style.href = matchFileURL[0]
        style.rel = 'stylesheet'
        style.type = 'text/css'
        domHead.appendChild(style)
    }
}