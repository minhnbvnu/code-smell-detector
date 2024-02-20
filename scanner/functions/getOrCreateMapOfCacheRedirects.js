function getOrCreateMapOfCacheRedirects(redirectedReference) {
                return redirectedReference ? getOrCreateMap(redirectedReference.commandLine.options, 
                /*create*/
                true) : ownMap;
            }