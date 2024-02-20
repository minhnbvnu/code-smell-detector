function createFlowType(type, incomplete) {
                return incomplete ? { flags: 0, type: type.flags & 131072 /* Never */ ? silentNeverType : type } : type;
            }