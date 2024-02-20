function $outputAppend(m, location, linkAll) {
    if (m !== '' && m !== undefined) {
        // Uncomment to debug mystery output. Also
        // use your browser debugger to 'pause on caught exceptions'
        //console.trace();
        
        // Remove tags and then restore HTML entities
        console.log(m.replace(/<.+?>/g, '').replace(/&quot;/g,'"').replace(/&amp;/g, '&').replace(/&gt;/g, '>').replace(/&lt;/g, '<'));

        if (outputDisplayPane.childNodes.length > MAX_DEBUG_OUTPUT_LENGTH) {
            // Remove a lot, so that we amortize the cost of manipulating the DOM
            while (outputDisplayPane.childNodes.length > MAX_DEBUG_OUTPUT_LENGTH - 20) {
                outputDisplayPane.removeChild(outputDisplayPane.firstChild);
            }
        }

        if (location && location.url) {
            let tooltip = location.url.replace(/^.*\//, '');
            if (/[A-Z]/.test(tooltip[0])) {
                // For modes, remove the extension
                tooltip = tooltip.replace(/\.pyxl$/, '');
            }
            tooltip += ':' + location.line_number;
            
            if (linkAll) {
                m = `<span style="cursor:pointer" title="${tooltip}" onclick="editorGotoFileLine('${location.url}', ${location.line_number}, undefined, false)">${m}</span>`;
            } else {
                m = `<a class="outputLink" onclick="editorGotoFileLine('${location.url}', ${location.line_number}, undefined, false)">${tooltip}</a>` + m;
            }
        }
        
        outputDisplayPane.insertAdjacentHTML('beforeend', m);
        
        // Scroll to bottom
        outputDisplayPane.scrollTop = outputDisplayPane.scrollHeight - outputDisplayPane.clientHeight;
    }
}