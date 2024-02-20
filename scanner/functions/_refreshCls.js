function _refreshCls(cls) {
                        ng.forEach(statusCls, function(cls) {
                            element.removeClass(opt[cls]);
                        });
                        element.addClass(cls);
                    }