function _formatNodeList (list, level = 0) {
    const content = [];

    for (const item of list) {
        const indent = String.prototype.padStart((4 * level), ' ');
        let itemString = `${indent}${item.key}:`;

        if ('value' in item) {
            // Pad multi-line values with a new line on either end
            itemString += (/[\r\n]/.test(item.value))
                ? `\n${item.value.trim()}\n`
                : ` ${item.value}`;
        } else {
            // Start of section
            itemString = `\n${itemString}\n`;
        }

        content.push(itemString);

        if (item.children) {
            content.push(..._formatNodeList(item.children, level + 1));
        }
    }

    return content;
}