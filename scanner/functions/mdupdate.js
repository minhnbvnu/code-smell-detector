function mdupdate() {
    var converter = new Showdown.converter();
    var tmp = $("#editmd").val();
    sessionStorage.setItem("editmd", tmp);
    tmp = tmp.replace(/~~~~\{(.*)\}\n([\s\S]*?)~~~~\n/mg, function(a1, a2, a3) {return "<pre><code class=\"language-"+a2+"\">"+reescape(a3)+"</code></pre>";});
    tmp = tmp.replace(/~~~~\n([\s\S]*?)~~~~\n/mg, function(a1, a2) {return "<pre><code>"+reescape(a2)+"</code></pre>"});
    tmp = converter.makeHtml(tmp);
    $("#edithtml").html(tmp);
    Prism.highlightAll();
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "edithtml"]);
}