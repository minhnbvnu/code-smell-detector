function xml2Object(xml) {
        try {
            var obj = {};
            if (xml.children.length > 0) {
                for (var i = 0; i < xml.children.length; i++) {
                    var item = xml.children.item(i);
                    var attributes = item.attributes;
                    for (var idx in attributes) {
                        var itemAtt = attributes[idx];
                        var dataKey = itemAtt.nodeName;
                        var dataValue = itemAtt.nodeValue;

                        if (dataKey !== undefined) {
                            obj[dataKey] = dataValue;
                        }
                    }
                    var nodeName = item.nodeName;

                    if (typeof obj[nodeName] == 'undefined') {
                        obj[nodeName] = xml2json(item);
                    } else {
                        if (typeof obj[nodeName].push == 'undefined') {
                            var old = obj[nodeName];

                            obj[nodeName] = [];
                            obj[nodeName].push(old);
                        }
                        obj[nodeName].push(xml2json(item));
                    }
                }
            } else {
                obj = xml.textContent;
            }
            return obj;
        } catch (e) {
            console.log(e.message);
        }
    }