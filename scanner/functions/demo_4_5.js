function demo_4_5() {
    var submit = function (v, h, f) {
        if (v == 'ok') {
            $.jBox.tip("正在删除数据...", 'loading');
            // 模拟2秒后完成操作
            window.setTimeout(function () { $.jBox.tip('删除成功。', 'success'); }, 2000);
        }
        else if (v == 'cancel') {
            // 取消
        }

        return true; //close
    };

    $.jBox.confirm("确定要删除数据吗？", "提示", submit);
}