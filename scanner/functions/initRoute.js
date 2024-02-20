function initRoute(router){
    return new Promise((resolve) => {
        if(permissionList.length == 0){
            console.log("没有权限数据，正在获取")
            store.dispatch('auth/getNavList').then(() => {
                store.dispatch('auth/getPermissionList').then((res) => {
                    console.log("权限列表生成完毕")
                    permissionList = res
                    res.forEach(function(v){
                        let routeItem = router.match(v.path)
                        if(routeItem){
                            routeItem.meta.permission = v.permission ? v.permission : []
                            routeItem.meta.name = v.name
                        }
                    })
                    resolve()
                })
            })
        } else{
            console.log("已有权限数据")
            resolve()
        }
    })
}