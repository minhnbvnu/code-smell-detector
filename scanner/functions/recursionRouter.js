function recursionRouter(userRouter = [], allRouter = []) {
    const realRoutes = allRouter
        .filter(item => userRouter.includes(item.pathName))
        .map(item => ({
            ...item,
            children: item.children
                ? recursionRouter(userRouter, item.children)
                : null
        }))
    return realRoutes
}