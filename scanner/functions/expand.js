function expand() {
                    recomputeAllHeights();
                    footer.lastPosY = 0;
                    // adjust CSS values with new heights in case they changed
                    // PP added height
                    $element.css({ 'height':footer.height + 'px', '-webkit-transform': 'translate3d(0, 0, 0)', 'transform': 'translate3d(0, 0, 0)' });
                    $element.css({ 'transition': '300ms ease-in-out', 'padding': 0 });
                    $scope.onExpand();
                    $scope.state = FooterState.EXPANDED;
                }