function addToContainerChain(next) {
                if (lastContainer) {
                    lastContainer.nextContainer = next;
                }
                lastContainer = next;
            }