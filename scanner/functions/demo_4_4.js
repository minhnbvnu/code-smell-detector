function demo_4_4() {
    $.jBox.tip("正在XX，你懂的...", 'loading');
    // 模拟2秒后完成操作
    window.setTimeout(function () { $.jBox.tip('XX已完成。', 'success'); }, 2000);
}