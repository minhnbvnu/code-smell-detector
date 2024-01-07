function startEdit() {
                var dom = label.getTextEditor().getDOM();
                maptalks.DomUtil.on(dom, 'keyup', function (ev) {
                    var oEvent = ev || event;
                    if (oEvent.keyCode === 13) {
                        dom.innerText += '\n';
                    }
                    var char = String.fromCharCode(oEvent.keyCode);
                    if (oEvent.shiftKey) {
                        if (char === '1') {
                            char = '!';
                            dom.innerText += char;
                            label.endEditText();
                        }
                    }
                });
                happen.keyup(dom, {
                    keyCode: 13
                });
                happen.keyup(dom, {
                    shiftKey: true,
                    keyCode: 49
                });
            }