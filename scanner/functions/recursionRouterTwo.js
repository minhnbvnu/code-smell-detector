function recursionRouterTwo(userRouter = [], allRouter = []) {
    const realRoutes = allRouter
        .filter(item => userRouter.includes(item.path))
        .map(item =>{
            return {
                ...item,
                redirect:item.children?item.children[0].path:null,
                children: item.children
                    ? recursionRouterTwo(userRouter, item.children)
                    : null
            }
        })
    return realRoutes

}