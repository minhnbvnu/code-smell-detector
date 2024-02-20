function getMapOfCacheRedirects(redirectedReference) {
                return redirectedReference ? getOrCreateMap(redirectedReference.commandLine.options, 
                /*create*/
                false) : ownMap;
            }