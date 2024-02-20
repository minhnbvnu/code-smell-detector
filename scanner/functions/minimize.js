function minimize() {
                    footer.lastPosY = footer.height;
                    $element.css({ '-webkit-transform': 'translate3d(0, ' + footer.lastPosY + 'px, 0)', 'transform': 'translate3d(0, ' + footer.lastPosY + 'px, 0)' });
                    $scope.onMinimize();
                    $scope.state = FooterState.MINIMIZED;
                }