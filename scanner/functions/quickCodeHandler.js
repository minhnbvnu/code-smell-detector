function quickCodeHandler(e)
    {
        var target = e.target,
            highlighterDiv = findParentElement(target, '.syntaxhighlighter'),
            container = findParentElement(target, '.container'),
            textarea = document.createElement('textarea'),
            highlighter
            ;

        if (!container || !highlighterDiv || findElement(container, 'textarea'))
            return;

        highlighter = getHighlighterById(highlighterDiv.id);

        // add source class name
        addClass(highlighterDiv, 'source');

        // Have to go over each line and grab it's text, can't just do it on the
        // container because Firefox loses all \n where as Webkit doesn't.
        var lines = container.childNodes,
            code = []
            ;

        for (var i = 0; i < lines.length; i++)
            code.push(lines[i].innerText || lines[i].textContent);

        // using \r instead of \r or \r\n makes this work equally well on IE, FF and Webkit
        code = code.join('\r');

        // For Webkit browsers, replace nbsp with a breaking space
        code = code.replace(/\u00a0/g, " ");

        // inject <textarea/> tag
        textarea.appendChild(document.createTextNode(code));
        container.appendChild(textarea);

        // preselect all text
        textarea.focus();
        textarea.select();

        // set up handler for lost focus
        attachEvent(textarea, 'blur', function(e)
        {
            textarea.parentNode.removeChild(textarea);
            removeClass(highlighterDiv, 'source');
        });
    }