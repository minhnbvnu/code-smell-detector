function rawText()
{
    var paste = $('div#cleartext').html();
    var newDoc = document.open('text/html', 'replace');
    newDoc.write('<pre>'+paste+'</pre>');
    newDoc.close();
}