function getTypeListId(types) {
                let result = "";
                if (types) {
                    const length2 = types.length;
                    let i = 0;
                    while (i < length2) {
                        const startId = types[i].id;
                        let count = 1;
                        while (i + count < length2 && types[i + count].id === startId + count) {
                            count++;
                        }
                        if (result.length) {
                            result += ",";
                        }
                        result += startId;
                        if (count > 1) {
                            result += ":" + count;
                        }
                        i += count;
                    }
                }
                return result;
            }