function getUniqueComponents(alreadyRegistered, contents) {
    let componentList = [];

    const contentFormatter = componentFormatterFactory.getFormatter(contents.distro);
    for (let contentType in contents) {
        const formatterFn = contentFormatter[contentType];
        let content = contents[contentType];
        if (formatterFn && content) {
            if(!Array.isArray(content)) {
                content = [content];
            }
            componentList = componentList.concat(content.reduce((prev, next) => {
                const uniqueId = JSON.stringify(next);
                if(!alreadyRegistered[uniqueId]) {
                    alreadyRegistered[uniqueId] = true;
                    const component = formatterFn(next);
                    if(component) {
                        prev.push(component);
                    }
                }
                return prev;
            }, []));
        }
    }
    
    return componentList;
}