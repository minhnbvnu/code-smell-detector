function diffChildren(oldChildren, newChildren, patches){
    oldChildren.forEach((child, index) => {
        walk(child, newChildren[index], ++num, patches)
    })
}