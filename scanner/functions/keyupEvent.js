function keyupEvent(e) {
                    var $input = $(this), input = this;
                    var k = e.keyCode;
                    opts.onKeyUp.call(this, e, opts); //extra stuff to execute on keyup
                    if (k == opts.keyCode.TAB && $input.hasClass('focus.inputmask') && input._valueGet().length == 0) {
                        buffer = _buffer.slice();
                        writeBuffer(input, buffer);
                        if (!isRTL) caret(input, 0);
                        undoBuffer = input._valueGet();
                    }
                }