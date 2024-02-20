function demo_3_6_2() {
    var submit = function (v, h, f) {
        if (v == true)
            jBox.tip("恩", 'info');
        else
            jBox.tip("好吖", 'info');

        return true;
    };
    // 自定义按钮
    $.jBox.confirm("天使，做我女朋友吧？", "表白提示", submit, { buttons: { '恩': true, '好吖': false} });
}