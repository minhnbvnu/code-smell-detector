async function dispatchTask(){
    // 对于windows操作系统, 需要额外安装32位/64位chrome浏览器
    let currentPlatform = os.platform();
    if(currentPlatform ==='win32'){
        console.log(`windows系统需要额外安装 32位 & 64位 的chrome浏览器`)
        await autoInstall("win32")
        await autoInstall("win64")
        console.log("install complete")
    }
}