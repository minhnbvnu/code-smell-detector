function __path__(parent, offset)
        {
            //ddd("offset", arguments[2])
            var root = parent;

            for (var i = 2; i < arguments.length; ++i)
            {
                var index = arguments[i];
                if (i === 3)
                    index += offset;

                if (index === -1)
                    parent = parent.parentNode;
                else
                    parent = parent.childNodes[index];
            }

            //ddd(arguments[2], root, parent);
            return parent;
        }