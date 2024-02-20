function newElement(name, attributes) {
            return {
                name: name || '',
                value: '',
                attributes: attributes || {},
                children: []
            };
        }