function updateTodoList() {
    if (! useIDE) { return; }
    const todoPane = document.getElementById('todoPane');

    let result = '<table style="width: 100%">\n';
    let hasAnyTodo = false;

    function processFile(type, name, url) {
        const source = fileContents[url];
        if (source === undefined) {
            console.log('No source code for ' + url);
            return;
        }
        
        // Terminate early if there's no todo() at all
        if (source.indexOf('todo(') === -1) { return; }

        // Individual items
        let line = 1;
        let pos = 0;

        // Track the current top-level section or function
        // in which the todos occur
        let currentParseEvent = {url: url, line: undefined, name: undefined};
        let currentParseFunction = {url: url, line: undefined, name: undefined};

        // Location of the previous newline in source, which
        // is used when parsing sections
        let prevNewLinePos = -1;

        // Table mapping all sections (with insertion order mapping
        // the order in which they appear) to arrays of the todos.
        // Top-level is the empty string section. Insert top-level
        // first to ensure that it always appears first.
        const sectionTable = {'': {url: url, line: 1, todoArray: []}};

        //////////////////////////////////////////////////////////////////////////
        // Parse
        
        while (pos < source.length) {
            // Find the first of a "todo" or newline
            let a = source.indexOf('todo(', pos);
            if (a === -1) { a = Infinity; }
            
            let b = source.indexOf('\n', pos);
            if (b === -1) { b = Infinity; }

            if (b < a) {
                // Newline was first
                ++line;

                const chr = source[b + 1];
                if (chr !== ' ' && chr !== '\t') {
                    // Top-level line that may change the current
                    // parse event/function
                    let lineEnd = source.indexOf('\n', b + 1);
                    if (lineEnd === -1) { lineEnd = source.length; }
                    const defMatch = source.substring(b + 1, lineEnd).match(/def[ \t]+([^ \t \(]+)/);
                    if (defMatch) {
                        // Entering a function
                        currentParseFunction.name = defMatch[1] + '()';
                        currentParseFunction.line = line;
                    }
                }
                prevNewLinePos = b;
                
            } else if (a < b) {
                // "todo(" appears before the next newline
                
                if (a === prevNewLinePos + 1) {
                    // todo() was at top level
                    currentParseFunction.name = undefined;
                }
                    
                // Find the end
                a += 'todo('.length;

                // Find the start quote
                while (a < source.length && source[a] !== '"' && source[a] !== '\n') { ++a; }
                if (a === source.length || source[a] === '\n') {
                    // This is an ill-formed todo() statement; stop processing
                    // this file.
                    console.log('Newline or end of file in todo in ' + name);
                    break;
                }
                
                // a is now the open quote position. Find the end
                ++a;
                b = a;
                while (b < source.length && source[b] !== '\n' && (source[b] !== '"' || source[b - 1] === '\\')) { ++b; }
                if (b === source.length || source[b] === '\n') {
                    // This is an ill-formed todo() statement; stop processing
                    // this file.
                    console.log('Newline or end of file in todo in ' + name);
                    break;
                }

                // b is now the close quote position
                const message = escapeHTMLEntities(source.substring(a, b));
                const displaySection =
                      currentParseFunction.name ?
                      currentParseFunction :
                      currentParseEvent.name ? 
                      currentParseEvent : {name: ''};

                let section = sectionTable[displaySection.name];
                if (! section) { sectionTable[displaySection.name] = section = {url: displaySection.url, line: displaySection.line, todoArray: []}; }

                section.todoArray.push({url: url, line: line, message: message});
            }
            
            pos = b + 1;
        }

        //////////////////////////////////////////////////////////////////////
        // Visualize todos

        // Remove empty top-level sections
        if (sectionTable[''].todoArray.length === 0) { delete sectionTable['']; }

        // Header
        result += `<tr style="cursor:pointer" onclick="editorGotoFileLine('${url}', 1)"><td colspan="2" style="border-bottom: double 3px; padding-bottom: 1px"><b>`;
        if (type === 'mode') {
            result += `<code>${name}</code>`;
        } else {
            result += name;
        }
        result += '</b></td></tr>\n';

        let first = true;
        for (let sectionName in sectionTable) {
            const section = sectionTable[sectionName];
            
            // Put headers between groups of todos
            if (sectionName !== '') {
                if (! first) { result += '<tr><td colspan="2" height="6px"></td></tr>'; }
                result += `<tr onclick="editorGotoFileLine('${section.url}', ${section.line})" style="cursor:pointer"><td colspan="2"><code>${sectionName}:</code></td></tr>`;
            }

            for (let i = 0; i < section.todoArray.length; ++i) {
                const todo = section.todoArray[i];
                result += `<tr valign=top style="cursor:pointer" onclick="editorGotoFileLine('${todo.url}', ${todo.line})">` +
                    `<td style="text-align: right; padding-right:10px">${todo.line}</td><td>${todo.message}</td></tr>\n`;
            } // i
            
            first = false;
        } // section

        // Separator between files
        result += '<tr><td colspan=2>&nbsp;</td></tr>\n';
        hasAnyTodo = true;
    } // processFile()
    
    for (let i = 0; i < gameSource.scripts.length; ++i) {
        const url = gameSource.scripts[i];
        // Do not save internal quadplay scripts
        if (! /(^|\/)_[A-Za-z0-9]+\.pyxl$/.test(url[0])) {
            processFile('script', url.replace(/^.*\//, ''), url);
        }
    }
    
    for (let i = 0; i < gameSource.modes.length; ++i) {
        const mode = gameSource.modes[i];
        // Do not save internal quadplay modes
        if (mode.name[0] !== '_') {
            processFile('mode', mode.name.replace('*', ''), mode.url);
        }
    }

    result += '</table>';
    
    // If there are no todo() statements
    if (! hasAnyTodo) {
        result += 'Put <a href="../doc/manual.md.html#standardlibrary/debugging"><code>todo()</code></a> statements in your code to automatically generate this list.';
    }

    todoPane.innerHTML = result;//`<div class="hideScrollBars" style="width: 97%">${result}</div>`;
}