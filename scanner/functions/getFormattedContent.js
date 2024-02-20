function getFormattedContent(content, formatterFn) {
    if (!formatterFn || !content) {
        return null;
    }
    if(!Array.isArray(content)) {
        return formatterFn(content);
    }
    return content.reduce((prev, next) => {
        const formattedContent = formatterFn(next);
        if(formattedContent) {
            prev.push(formattedContent);
        }
        return prev;
    }, []);    
}