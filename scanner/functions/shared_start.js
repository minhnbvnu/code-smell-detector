function shared_start(B, drop_prct) {
        if (B.length == 1) {
            return B[0];
        }
        var A = [];
        var common;
        var min_lead_prct = 10;
        for (var i = 0; i < B.length; i++) {
            var str = B[i].str;
            var localmin = 0;
            if(drop_prct === true){
                while ( str.substr(0, 1) == '%') {
                    localmin = localmin+1;
                    str = str.substring(1);
                }
            }
            min_lead_prct = Math.min(min_lead_prct, localmin);
            A.push(str);
        }

        if (A.length > 1) {
            var tem1, tem2, s;
            A = A.slice(0).sort();
            tem1 = A[0];
            s = tem1.length;
            tem2 = A.pop();
            while (s && tem2.indexOf(tem1) == -1) {
                tem1 = tem1.substring(0, --s);
            }
            if (tem1 === "" || tem2.indexOf(tem1) !== 0) {
                return {
                    str:prepend_n_prc('', min_lead_prct),
                    type: "computed",
                    from: B[0].from,
                    to: B[0].to
                    };
            }
            return {
                str: prepend_n_prc(tem1, min_lead_prct),
                type: "computed",
                from: B[0].from,
                to: B[0].to
            };
        }
        return null;
    }