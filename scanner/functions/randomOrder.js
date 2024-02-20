function randomOrder(items) {
            const copy = items.slice();
            copy.sort((a, b) => jenkinsHash(seed + a.id) - jenkinsHash(seed + b.id));
            return copy;
        }