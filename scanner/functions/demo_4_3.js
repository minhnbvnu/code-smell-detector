function demo_4_3() {
    //加了个其它参数closed
    $.jBox.tip('关闭后设置输入框为已选', 'error', { closed: function () { $('#tip-input2').select(); } });
}