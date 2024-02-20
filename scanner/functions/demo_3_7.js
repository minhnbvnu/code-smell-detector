function demo_3_7() {
    var submit = function (v, h, f) {
        if (v == 'yes') {
            $.jBox.tip('已保存。', 'success');
        }
        if (v == 'no') {
            $.jBox.tip('没保存。');
        }
        if (v == 'cancel') {
            $.jBox.tip('已取消。');
        }

        return true;
    };
    // 可根据需求仿上例子定义按钮
    $.jBox.warning("内容已修改，是否保存？", "提示", submit);
}