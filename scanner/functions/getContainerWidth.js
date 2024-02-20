function getContainerWidth() {
                            var rect = iElement[0].getBoundingClientRect();
                            return rect.width ? rect.width : rect.right - rect.left;
                        }