function reg(n) {
            return function (e) {
                var v = e.target.result;
                if (v.value) v = v.value;
                keys[n].push(v.os + ": " + v.k);
            };
        }