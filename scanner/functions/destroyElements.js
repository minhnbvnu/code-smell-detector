function destroyElements(elements) {
                stats.elementsCount--;
                check$1(elements.buffer !== null, 'must not double destroy elements');
                delete elementSet[elements.id];
                elements.buffer.destroy();
                elements.buffer = null;
            }