function separateDynamic(object, useArrays) {
                    var staticItems = {};
                    var dynamicItems = {};
                    Object.keys(object).forEach(function (option) {
                        var value = object[option];
                        if (dynamic.isDynamic(value)) {
                            dynamicItems[option] = dynamic.unbox(value, option);
                            return;
                        }
                        else if (useArrays && Array.isArray(value)) {
                            for (var i = 0; i < value.length; ++i) {
                                if (dynamic.isDynamic(value[i])) {
                                    dynamicItems[option] = dynamic.unbox(value, option);
                                    return;
                                }
                            }
                        }
                        staticItems[option] = value;
                    });
                    return {
                        dynamic: dynamicItems,
                        static: staticItems
                    };
                }