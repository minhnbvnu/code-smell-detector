function applyMask(e) {
                    e = e || window.event;
                    var key = e.which || e.charCode || e.keyCode,
                        keyPressedChar = "",
                        selection,
                        startPos,
                        endPos,
                        value;
                    if (key >= 48 && key <= 57) {
                        keyPressedChar = String.fromCharCode(key);
                    }
                    selection = getInputSelection();
                    startPos = selection.start;
                    endPos = selection.end;
                    value = $input.val();
                    $input.val(value.substring(0, startPos) + keyPressedChar + value.substring(endPos, value.length));
                    maskAndPosition(startPos + 1);
                }