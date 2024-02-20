function setObjectAllocator(alloc) {
            Object.assign(objectAllocator, alloc);
            forEach(objectAllocatorPatchers, (fn) => fn(objectAllocator));
        }