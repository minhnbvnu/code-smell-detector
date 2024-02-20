function arrayIndexPropertyNames(o, length)
        {
            var array = [];
            for (var i = 0; i < length; ++i) {
                if (i in o)
                    array.push("" + i);
            }
            return array;
        }