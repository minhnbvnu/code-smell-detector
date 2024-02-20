function addObjectAllocatorPatcher(fn) {
            objectAllocatorPatchers.push(fn);
            fn(objectAllocator);
        }