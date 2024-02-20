function getContent (content) {
    // 去掉 @charset，因为它可能触发 cssom 库的 bug
    // 使用空格占位避免改动代码位置
    return content.replace(/^(\@charset\b.+?;)(.*?)/i, function ($0, $1, $2) {
        return Array($1.length).join(' ') + $2
    });
}