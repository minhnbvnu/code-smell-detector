function updateUI() {
                $timeout(function () {
                    $element.css('left', (($window.innerWidth - width) / 2) + 'px');
                }, 300);
            }