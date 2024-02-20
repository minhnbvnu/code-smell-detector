function addCodeToSourceStats(code, scriptURL) {
    if ((scriptURL.replace(/^.*\//, '')[0] === '_') ||
        scriptURL.startsWith('quad://scripts/') ||
        scriptURL.startsWith(location.href.replace(/\/console\/quadplay\.html.*$/, '/scripts/'))) {
        // Ignore statements from system files
        return;
    }

    // Remove strings
    code = code.replace(/"(?:[^"\\]|\\.)*"/g, '');

    // Remove comments
    code = code.replace(/\/\*([\s\S]*?)\*\//g, '');
    code = code.replace(/\/\/.*$/gm, '');

    // Compact literals
    const lineArray = code.split('\n');
    try {
        compactMultilineLiterals(lineArray);
    } catch (e) {
        // Error occured during compaction of multiline literals
        e.url = scriptURL;
        console.log(e);
    }
    code = lineArray.join('\n');

    // Remove section headers
    const sectionRegex = /(?:^|\n).*\n[-─—━⎯=═⚌]{5,}[ \t]*\n/gm;
    code = code.replace(sectionRegex, '\n');

    // Remove function definition lines
    code = code.replace(/\n *def [^\n]+: *\n/gm, '\n');

    // Remove variable declarations with no assignment
    code = code.replace(/^ *let +[^ \n=]+ *$/gm, '');

    // Remove LOCAL, WITH, and PRESERVING_TRANSFORM lines
    code = code.replace(/\n *&? *(local:?|preserving_transform:?|with .*) *\n/gm, '\n');

    // Remove ELSE without following IF:
    code = code.replace(/\n *else: *\n/g, '\n');

    // Remove DEBUG_WATCH, DEBUG_PRINT, TODO, and ASSERT (assume that they are on their own lines to simplify parsing)
    code = code.replace(/(debug_watch|debug_print|todo|assert) *\(.*\n/g, '\n');

    // Remove blank lines
    code = code.replace(/\n\s*\n/g, '\n');

    const count = Math.max(1, (code.split(';').length - 1) + (code.split('\n').length - 1) - 1);

    resourceStats.sourceStatementsByURL[scriptURL] = count;
    
    resourceStats.sourceStatements += count;
}