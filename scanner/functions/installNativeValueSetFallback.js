function installNativeValueSetFallback(npt) {
                            EventRuler.on(npt, "mouseenter", function(event) {
                                var $input = $(this), input = this, value = input.inputmask._valueGet();
                                if (value !== getBuffer().join("")) {
                                    $input.trigger("setvalue");
                                }
                            });
                        }