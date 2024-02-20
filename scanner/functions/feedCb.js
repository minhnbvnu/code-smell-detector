function feedCb(varbinds) {
                for (let i = 0; i < varbinds.length; i++) {
                    if (SNMP.isVarbindError(varbinds[i])) {
                        node.error(SNMP.varbindError(varbinds[i]), msg);
                    } else {
                        response.push({ oid: varbinds[i].oid, value: varbinds[i].value });
                    }
                }
            }