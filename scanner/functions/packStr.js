function packStr() {
      if (str.length > 0) {
        // pack str with attributes to ops

        /**
         * @type {Object<string,any>}
         */
        const attributes = {};
        let addAttributes = false;
        currentAttributes.forEach((value, key) => {
          addAttributes = true;
          attributes[key] = value;
        });
        /**
         * @type {Object<string,any>}
         */

        const op = {
          insert: str
        };

        if (addAttributes) {
          op.attributes = attributes;
        }

        ops.push(op);
        str = '';
      }
    }