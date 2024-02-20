function isComplete(npt) {
                    var complete = true, nptValue = npt._valueGet(), ml = nptValue.length;
                    for (var i = 0; i < ml; i++) {
                        if (isMask(i) && nptValue.charAt(i) == getPlaceHolder(i)) {
                            complete = false;
                            break;
                        }
                    }
                    return complete;
                }