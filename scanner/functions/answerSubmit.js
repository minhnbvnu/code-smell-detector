function answerSubmit(answerChoseNum = 0) {
                // 提交答案
                if (answerChoseNum > 0 && ManageType == 'auto') {
                    //!document.querySelector(".next-btn").disabled ? document.querySelector(".next-btn").click() : document.querySelector(".submit-btn").click();
                    // 有提交按钮，提交数据
                    if ($(".submit-btn").length) {
                        $(".submit-btn").click();
                    } else {
                        if ($(".next-btn").length) {
                            $(".next-btn").click();
                        }
                    }
                    setTimeoutFunc = setTimeout(getAnswers, parseInt(Math.random() * 1000 + 2000));
                }
            }