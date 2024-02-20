function transformDeclaration(decl) {
                if (decl.value instanceof anonymous_1.default && !decl.parsed) {
                    if (typeof decl.value.value === 'string') {
                        this.parse.parseNode(decl.value.value, ['value', 'important'], decl.value.getIndex(), decl.fileInfo(), function (err, result) {
                            if (err) {
                                decl.parsed = true;
                            }
                            if (result) {
                                decl.value = result[0];
                                decl.important = result[1] || '';
                                decl.parsed = true;
                            }
                        });
                    }
                    else {
                        decl.parsed = true;
                    }
                    return decl;
                }
                else {
                    return decl;
                }
            }