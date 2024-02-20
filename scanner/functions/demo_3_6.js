function demo_3_6() {
    var submit = function (v, h, f) {
        if (v == 'ok')
            jBox.tip(v, 'info');
        else if (v == 'cancel')
            jBox.tip(v, 'info');

        return true; //close
    };

    $.jBox.confirm("确定吗？", "提示", submit);
}