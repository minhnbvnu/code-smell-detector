function sub2srt(sub) {
    return sub
        .map((item, index) => {
            return `${index + 1}\n${item.start.replace('.', ',')} --> ${item.end.replace('.', ',')}\n${item.text}`;
        })
        .join('\n\n');
}