function toMarkdown(list) {
    const sortedList = list.sort((a, b) => a.title.localeCompare(b.title));
    let num = 1;
    const items = sortedList.map(item => `${num++}. [${item.title}](${item.href}) 👉 ${item.desc}`);
    const markdown = items.join('\n');
    return markdown;
}