function unbindMouseUpEvent() {
                            if (mouseUpBound) {
                              mouseUpBound = false;
                              $document.unbind('mouseup', documentMouseUpEvent);
                            }
                        }