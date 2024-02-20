function generateDjb2Hash(data) {
            let acc = 5381;
            for (let i = 0; i < data.length; i++) {
                acc = (acc << 5) + acc + data.charCodeAt(i);
            }
            return acc.toString();
        }