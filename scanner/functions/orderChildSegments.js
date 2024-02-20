function orderChildSegments(children) {
            const specifiedOrder = [];
            const unspecifiedOrder = [];

            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                const segments = stats[child.id].segments;

                for (let j = 0; j < segments.length; j++) {
                    const seg = segments[j];

                    if (seg.min === defaultMin) {
                        unspecifiedOrder.push(seg);
                    } else {
                        specifiedOrder.push(seg);
                    }
                }
            }

            specifiedOrder.sort((a, b) => a.min - b.min);

            return specifiedOrder.concat(unspecifiedOrder);
        }