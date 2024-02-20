function parseXML(str, cb) {
        var obj, current, parser = sax.parser(true, { trim: true, lowercase: true });
        parser.onerror = parser.onend = done;
        function done(err) {
            parser.onerror = parser.onend = function () { };
            cb(err, obj);
        }
        function newElement(name, attributes) {
            return {
                name: name || '',
                value: '',
                attributes: attributes || {},
                children: []
            };
        }
        parser.oncdata = parser.ontext = function (t) {
            if (current)
                current.value += t;
        };
        parser.onopentag = function (node) {
            var element = newElement(node.name, node.attributes);
            if (current) {
                element.parent = current;
                current.children.push(element);
            }
            else { // root object
                obj = element;
            }
            current = element;
        };
        parser.onclosetag = function () {
            if (typeof current.parent !== 'undefined') {
                var just_closed = current;
                current = current.parent;
                delete just_closed.parent;
            }
        };
        parser.write(str).close();
    }