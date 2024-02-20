function computeHeights() {
                    footer.height = footer.maxHeight > 0 ? footer.maxHeight : $window.innerHeight - headerHeight - handleHeight - tabsHeight;

                    // PP
                    
                     // PP 
                     footer.height -=50;

                     if ($rootScope.platformOS == 'ios') footer.height -=30;
                     //if ($rootScope.platformOS == 'android') footer.height -=10;

                    $element.css({ 'height': footer.height + 'px' });

                    if (footer.initialState == FooterState.MINIMIZED) {

                        minimize();
                    } else {
                        collapse();
                    }
                }