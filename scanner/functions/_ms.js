function _ms(a) {
                if (a.length <= 1)
                    return a;
                var m = Math.floor(a.length / 2), left = a.slice(0, m), right = a.slice(m);
                left = _ms(left);
                right = _ms(right);
                return merge(left, right);
            }