function recursionRouterThree(userRouter = [], allRouter = []) {
    let list = []
    allRouter.forEach((item,index) =>{
        if(item.path === userRouter[0]){
            list.push(item)
        }
    })
    return list

    
    
}