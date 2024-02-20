function getNeedAnswerHistory() {
                var isNextPage = true;
                Array.from(document.querySelectorAll('.week > button')).reverse().forEach(function (e, b, c) {
                    if (isNextPage) {
                        let i = e.innerText;
                        if (i != "" && i == '开始答题') {
                            isNextPage = false;
                            e.click();
                            return;
                        }
                    }
                });

                if (isNextPage) {
                    var li = document.getElementsByClassName("ant-pagination-prev")[0];
                    if (li.getAttribute("aria-disabled") == "false") {
                        document.querySelector('a.ant-pagination-item-link > i.anticon-left').click();
                        setTimeout(getNeedAnswerHistory, parseInt(Math.random() * 1000 + 2000));
                    } else {
                        console.log("weekAskDoes");
                        chrome.runtime.sendMessage({ type: "weekAskDoes" }, {}, function (res) {
                            if (res.complete) {
                                window.close();
                            }
                        });
                    }
                }
            }