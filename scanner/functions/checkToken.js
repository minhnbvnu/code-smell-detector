function checkToken(cancel, callback){
    if(!Auth.hasToken()){
        // 自动获取Token
        if(Auth.tokenTimeoutMethod == "getNewToken"){
            // 如果当前有请求正在获取Token
            if(getTokenLock){
                setTimeout(function(){
                    checkToken(cancel, callback)
                }, 500)
            } else {
                getTokenLock = true
                store.dispatch("auth/getNewToken").then(() => {
                    console.log("已获取新token")
                    callback()
                    getTokenLock = false
                })
            }
        }
        // 跳转授权Token
        if(Auth.tokenTimeoutMethod == "jumpAuthPage" && Auth.isLogin()){
            if(router.currentRoute.path != '/auth'){
                // BUG: 无法保证一定会中断所有请求
                cancel()
                router.push('/auth')
            }
        }
    } else {
        callback()
    }
}