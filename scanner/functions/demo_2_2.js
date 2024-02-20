function demo_2_2() {
    var html1 = '<div class="msg-div">' +
                        '<p>购买数量：</p><div class="field"><input type="text" id="amount" name="amount" style="width:75px;" value="1" /></div>' +
                        '<p>收货地址：</p><div class="field"><textarea id="address" name="address"></textarea></div>' +
                        '<div class="errorBlock" style="display: none;"></div>' +
                        '</div>';

    var html2 = '<div class="msg-div">' +
                        '<p>给卖家留言：<span style="color:gray">（选填，可以告诉卖家您对商品的特殊要求）</span></p><div class="field"><textarea id="message" name="message"></textarea></div>' +
                        '</div>';

    var data = {};
    var states = {};
    states.state1 = {
        content: html1,
        buttons: { '下一步': 1, '取消': 0 },
        submit: function (v, h, f) {
            if (v == 0) {
                return true; // close the window
            }
            else {
                h.find('.errorBlock').hide('fast', function () { $(this).remove(); });

                data.amount = f.amount; //或 h.find('#amount').val();
                if (data.amount == '' || parseInt(data.amount) < 1) {
                    $('<div class="errorBlock" style="display: none;">请输入购买数量！</div>').prependTo(h).show('fast');
                    return false;
                }
                data.address = f.address;
                if (data.address == '') {
                    $('<div class="errorBlock" style="display: none;">请输入收货地址！</div>').prependTo(h).show('fast');
                    return false;
                }

                $.jBox.nextState(); //go forward
                // 或 $.jBox.goToState('state2')
            }

            return false;
        }
    };
    states.state2 = {
        content: html2,
        buttons: { '上一步': -1, '提交': 1, '取消': 0 },
        buttonsFocus: 1, // focus on the second button
        submit: function (v, o, f) {
            if (v == 0) {
                return true; // close the window
            } else if (v == -1) {
                $.jBox.prevState() //go back
                // 或 $.jBox.goToState('state1');
            }
            else {
                data.message = f.message;

                // do ajax request here
                $.jBox.nextState('<div class="msg-div">正在提交...</div>');
                // 或 $.jBox.goToState('state3', '<div class="msg-div">正在提交...</div>')

                // asume that the ajax is done, than show the result
                var msg = [];
                msg.push('<div class="msg-div">');
                msg.push('<p>下面是提交的数据</p>');
                for (var p in data) {
                    msg.push('<p>' + p + ':' + data[p] + '</p>');
                }
                msg.push('</div>');
                window.setTimeout(function () { $.jBox.nextState(msg.join('')); }, 2000);
            }

            return false;
        }
    };
    states.state3 = {
        content: '',
        buttons: {} // no buttons
    };
    states.state4 = {
        content: '',
        buttons: { '确定': 0 }
    };

    $.jBox.open(states, '提交订单', 450, 'auto');
}