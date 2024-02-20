function createQueue(items) {
            const elements = (items == null ? void 0 : items.slice()) || [];
            let headIndex = 0;
            function isEmpty() {
                return headIndex === elements.length;
            }
            function enqueue(...items2) {
                elements.push(...items2);
            }
            function dequeue() {
                if (isEmpty()) {
                    throw new Error("Queue is empty");
                }
                const result = elements[headIndex];
                elements[headIndex] = void 0;
                headIndex++;
                if (headIndex > 100 && headIndex > elements.length >> 1) {
                    const newLength = elements.length - headIndex;
                    elements.copyWithin(
                    /*target*/
                    0, 
                    /*start*/
                    headIndex);
                    elements.length = newLength;
                    headIndex = 0;
                }
                return result;
            }
            return {
                enqueue,
                dequeue,
                isEmpty
            };
        }