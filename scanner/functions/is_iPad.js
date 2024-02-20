function is_iPad() {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/iPad/i) == "ipad") {
                return true;
            } else {
                return false;
            }
        }