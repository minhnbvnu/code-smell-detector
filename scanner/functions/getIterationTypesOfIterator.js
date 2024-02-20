function getIterationTypesOfIterator(type, resolver, errorNode, errorOutputContainer) {
                return getIterationTypesOfIteratorWorker(type, resolver, errorNode, errorOutputContainer, 
                /*noCache*/
                false);
            }