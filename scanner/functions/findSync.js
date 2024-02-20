function findSync(startPath) {
    let result = [];

    function finder(fullPath) {
        let files = fs.readdirSync(fullPath);
        files.forEach((val, index) => {
            let fPath = path.join(fullPath, val);
            let stats = fs.statSync(fPath);
            // 如果是文件夹则继续查找
            if (stats.isDirectory()) {
                finder(fPath);
            };
            // 如果是CSS文件并且不在exclude列表中
            if (stats.isFile() && path.extname(fPath) == ".css") {
                var fileName = val.substring(0, val.indexOf(".")) + ".css"
                if(excludeFile.indexOf(fileName) < 0){
                    let relativePath = config.build.assetsPublicPath + path.posix.join(config.build.assetsSubDirectory, "/css", val);
                    result.push(relativePath)
                }
            }
        });

    }
    finder(startPath);
    return result;
}