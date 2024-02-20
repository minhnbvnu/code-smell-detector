function collapse() {
                    footer.lastPosY = tabs ? footer.height - tabsHeight : footer.height - footer.defaultHeight;
                    $element.css({ '-webkit-transform': 'translate3d(0, ' + footer.lastPosY + 'px, 0)', 'transform': 'translate3d(0, ' + footer.lastPosY + 'px, 0)' });
                    $scope.onCollapse();
                    $scope.state = FooterState.COLLAPSED;
                }