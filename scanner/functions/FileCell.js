function FileCell({
    file,
    prefix,
    expandedLines,
    setExpandedLines,
    hasChildren,
    setFileFilter
}) {
    if (hasChildren) {
        const expandedIndex = expandedLines.indexOf(prefix + file);
        const isExpanded = expandedIndex >= 0;
        const newExpandedLines = isExpanded
            ? [
                  ...expandedLines.slice(0, expandedIndex),
                  ...expandedLines.slice(expandedIndex + 1)
              ]
            : [...expandedLines, prefix + file];

        return (
            <>
                <button
                    type="button"
                    onClick={() => setExpandedLines(newExpandedLines)}
                    className="expandbutton"
                >
                    {isExpanded ? String.fromCharCode(0x2013) : '+'}
                </button>
                <a
                    href="javascript:void(0)"
                    onClick={() => setFileFilter(prefix + file)}
                >
                    {file}
                </a>
            </>
        );
    } else {
        return <a href={`./${prefix}${file}.html`}>{file}</a>;
    }
}