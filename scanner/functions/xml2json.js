function xml2json(xml, json) {
        const res = {};

        const attributes = xml.getAttributeNames();
        if (attributes.length > 0) {
            res['@attributes'] = {};
            for (let i = 0; i < attributes.length; i++) {
                res['@attributes'][attributes[i]] = xml.getAttributeNode(attributes[i]).value;
            }
        }

        if (xml.childElementCount > 0) {
            for (let j = 0; j < xml.childElementCount; j++) {
                xml2json(xml.children[j], res);
            }
        } else if (xml.textContent) {
            res.value = xml.textContent;
        }

        const name = xml.nodeName;

        if (!json[name]) {
            json[name] = res;
        } else if (json[name].length > 0) {
            json[name].push(res);
        } else {
            json[name] = [res];
        }

        return json;
    }