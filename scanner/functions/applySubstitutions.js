function applySubstitutions(text, subs) {
                var res = text,
                    firstOfKind = 0;

                if (subs) {
                    if (angular.isArray(subs)) {
                        angular.forEach(subs, function (sub, i) {
                            res = res.replace('%' + (i + 1), sub);
                            res = res.replace('{' + (i + 1) + '}', sub);
                        });
                    } else {
                        angular.forEach(subs, function (v, k) {
                            ++firstOfKind;

                            res = res.replace('{' + k + '}', v);
                            res = res.replace('%' + k, v);
                            res = res.replace('%' + (firstOfKind), v);
                            res = res.replace('{' + (firstOfKind) + '}', v);
                        });
                    }
                }
                res = res.replace(/\n/g, '<br>');

                return res;
            }