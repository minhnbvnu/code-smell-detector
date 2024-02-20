function randomUUID() {
            const uuid = crypto.randomUUID();
            if (uuids.has(uuid)) {
                throw new Error(`uuid collision ${uuid}`)
            }
            uuids.add(uuid);
            return uuid;
        }