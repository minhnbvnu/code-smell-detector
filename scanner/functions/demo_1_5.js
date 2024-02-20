function demo_1_5() {
    var content = {
        state1: {
            content: '状态一',
            buttons: { '下一步': 1, '取消': 0 },
            buttonsFocus: 0,
            submit: function (v, h, f) {
                if (v == 0) {
                    return true; // close the window
                }
                else {
                    $.jBox.nextState(); //go forward
                    // 或 $.jBox.goToState('state2')
                }
                return false;
            }
        },
        state2: {
            content: '状态二，请关闭窗口哇：）',
            buttons: { '上一步': 1, '取消': 0 },
            buttonsFocus: 0,
            submit: function (v, h, f) {
                if (v == 0) {
                    return true; // close the window
                } else {
                    $.jBox.prevState() //go back
                    // 或 $.jBox.goToState('state1');
                }

                return false;
            }
        }
    };

    $.jBox(content);
}