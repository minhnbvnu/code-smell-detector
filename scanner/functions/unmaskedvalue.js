function unmaskedvalue($input, skipDatepickerCheck) {
                var input = $input[0];
                if (tests && (skipDatepickerCheck === true || !$input.hasClass('hasDatepicker'))) {
                    var buffer = _buffer.slice();
                    checkVal(input, buffer);
                    return $.map(buffer, function (element, index) {
                        return isMask(index) && element != getBufferElement(_buffer.slice(), index) ? element : null;
                    }).join('');
                }
                else {
                    return input._valueGet();
                }
            }