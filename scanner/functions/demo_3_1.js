function demo_3_1() {
    //加了个其它参数closed
    $.jBox.prompt('Hello jBox', 'jBox', 'info', { closed: function () { alert('prompt is closed.'); } });
}