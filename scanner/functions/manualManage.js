function manualManage() {

                let myId = "my_ms";
                if ($('#' + myId).length || !isManual) {
                    return;
                }

                // 浏览器提醒
                chrome.runtime.sendMessage({ type: "answerError" });

                // 设置类型等待
                ManageType = "wait";

                let timerId = "my_ds_c";
                let buttonId = "my_bt_c";
                let html = '<div id="' + myId + '" style="color: red; font-size: 20px; text-align: center;">此题无完全匹配答案，已填写(选择)一个相对最匹配的答案(可能是错误的)。你可以点击下面按钮切换到手动做题并修正答案后再次点击按钮切换到自动做题。<br>';
                html += '<span>若 <span id="' + timerId + '">' + WaitingTime + '</span> 秒无操作则继续自动做题</span><br>';
                html += '<button id="' + buttonId + '" value="auto" style="color: green; font-size: 24px; text-align: center; margin-top: 10px;">切换到手动做题</button>';
                html += '</div>';

                $(".header-row").append(html);

                let timeLeftSeconds = 0;
                let timeLeftEvenv = null;
                // button点击事件
                $('#' + buttonId).off('click').on('click', function () {
                    if (timeLeftEvenv != null) {
                        clearInterval(timeLeftEvenv);
                        timeLeftEvenv = null;
                    }
                    if ($(this).val() == 'auto') {
                        $(this).val('manual');
                        $(this).text('切换到自动做题');
                        $(this).css('color', 'red');
                        ManageType = "manual";
                    } else {
                        $(this).val('auto');
                        $(this).text('切换到手动做题');
                        $(this).css('color', 'green');
                        ManageType = 'auto';
                        $('#' + myId).remove();
                        getAnswers();
                    }
                });

                // 定时事件
                timeLeftEvenv = setInterval(function () {
                    timeLeftSeconds++;
                    $('#' + timerId).text(WaitingTime - timeLeftSeconds);
                    if (timeLeftSeconds >= WaitingTime) {
                        $('#' + myId).remove();
                        clearInterval(timeLeftEvenv);
                        timeLeftEvenv = null;
                        ManageType = 'auto';
                        answerSubmit(1);
                    }
                }, 1000);
            }