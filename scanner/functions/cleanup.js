function cleanup() {
                    $window.removeEventListener('orientationchange', updateUI);
                    deregisterWatch();
                }