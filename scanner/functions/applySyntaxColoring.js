function applySyntaxColoring()
{
    if ($('div#cleartext').html().substring(0,11) != '<pre><code>')
    {
        // highlight.js expects code to be surrounded by <pre><code>
        $('div#cleartext').html('<pre><code>'+ $('div#cleartext').html()+'</code></pre>');
    }
    hljs.highlightBlock(document.getElementById('cleartext'));
    $('div#cleartext').css('padding','0'); // Remove white padding around code box.
}