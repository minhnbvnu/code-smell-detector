function showGameDoc(url, useFileContents) {
    const docEditor = document.getElementById('docEditor');
    setEditorTitle(url);

    const preserveScroll = (docEditor.lastURL === url);
    docEditor.lastURL = url;

    const srcdoc = useFileContents ? fileContents[url] : undefined;

    // Store old scroll position
    let oldScrollX = 0, oldScrollY = 0;
    {
        const element = document.getElementById('doc');
        if (element) {
            if (element.contentWindow) {
                // Only works when the document is on the same domain
                const doc = element.contentWindow.document;
                const html = doc.getElementsByTagName('html')[0];
                oldScrollX = Math.max(html.scrollLeft, doc.body.scrollLeft);
                oldScrollY = Math.max(html.scrollTop, doc.body.scrollTop);
            } else {
                oldScrollX = element.scrollLeft;
                oldScrollY = element.scrollTop;
            }
        }
    }
    
    // Strip anything sketchy that looks like an HTML attack from the URL
    console.assert(url !== undefined);
    url = url.replace(/['" ><]/g, '');

    // Add a base tag to HTML documents so that relative URLs are parsed correctly
    const baseTag = `<base href="${urlDir(url)}">`;
    if (url.endsWith('.html')) {
        // Includes the .md.html case
        let s = `<iframe id="doc" width="125%" height="125%" onload="setIFrameScroll(this, ${oldScrollX}, ${oldScrollY})" `;
        
        if (srcdoc !== undefined) {
            const html = (baseTag + srcdoc).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
            s += 'srcdoc="' + html + '"';
        } else {
            s += `src="${url}?"`;
        }
        docEditor.innerHTML = s +'></iframe>';
    } else if (url.endsWith('.md')) {
        // Trick out .md files using Markdeep
        
        function markdeepify(text) {
            const markdeepURL = makeURLAbsolute('', 'quad://doc/markdeep.min.js');
            text = baseTag + text;
            // Escape quotes to avoid ending the srcdoc prematurely
            return `${text.replace(/"/g, '&quot;')}
                <style>
body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif}

.md a, .md div.title, contents, .md .tocHeader, 
.md h1, .md h2, .md h3, .md h4, .md h5, .md h6, .md .nonumberh1, .md .nonumberh2, .md .nonumberh3, .md .nonumberh4, .md .nonumberh5, .md .nonumberh6, 
.md .shortTOC, .md .mediumTOC, .md .longTOC {
    color: inherit;
    font-family: inherit;
}
.md .title, .md h1, .md h2, .md h3, .md h4, .md h5, .md h6, .md .nonumberh1, .md .nonumberh2, .md .nonumberh3, .md .nonumberh4, .md .nonumberh5, .md .nonumberh6 {
margin-top: 0; padding-top: 0
}
.md h2 { border-bottom: 2px solid }
.md div.title { font-size: 40px }
.md .afterTitles { height: 0; padding-top: 0; padding-bottom: 0 }
</style>\n

<!-- Markdeep: --><script src='${markdeepURL}'></script>\n`;            
        }

        if (srcdoc !== undefined) {
            docEditor.innerHTML = `<iframe id="doc" onload="setIFrameScroll(this, ${oldScrollX}, ${oldScrollY})" srcdoc="${markdeepify(srcdoc)}" border=0 width=125% height=125%></iframe>`;
        } else {
            LoadManager.fetchOne({
                errorCallback: function () { console.log('Error while loading', url); },
                forceReload: true}, url, 'text', null,  function (text) {
                    docEditor.innerHTML = `<iframe id="doc" srcdoc="${markdeepify(text)}" onload="setIFrameScroll(this, ${oldScrollX}, ${oldScrollY})" border=0 width=125% height=125%></iframe>`;
                });
        }
    } else {
        // Treat as text file
        docEditor.innerHTML = `<object id="doc" width="125%" height="125%" type="text/plain" data="${url}?" border="0"> </object>`;
    }
}