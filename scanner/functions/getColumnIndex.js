function getColumnIndex(line, genColumn) {
            let index = line.length;
            for (let i = index - 1; i >= 0; index = i--) {
                const current = line[i];
                if (genColumn >= current[COLUMN])
                    break;
            }
            return index;
        }