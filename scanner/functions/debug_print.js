function debug_print(location, expression, ...args) {
    const prettyPrint = document.getElementById('prettyPrintEnabled').checked;
    let s = '';
    for (let i = 0; i < args.length; ++i) {
        let m = args[i]

        if (typeof m !== 'string') {
            m = QRuntime.$unparse(m, new Map(), ': ', false, true, false, '', expression, prettyPrint);
            
            if (! prettyPrint) {
                // Pretty printing automatically escapes HTML entities
                // in strings. When not pretty printing we need to do
                // so explicitly.
                m = escapeHTMLEntities(m);
            }
        } else {
            m = escapeHTMLEntities(m);
        }
        
        s += m;
        
        if (i < args.length - 1) {
            s += ' ';
        }
    }
    
    $outputAppend(s + '\n', location);
}