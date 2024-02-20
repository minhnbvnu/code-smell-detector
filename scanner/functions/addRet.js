function addRet (elems) {
        if (Array.isArray(elems)) {
            // This was causing excessive stack size in Node (with or
            //  without Babel) against our performance test:
            //  `ret.push(...elems);`
            elems.forEach((t) => {
                ret.push(t);
            });
        } else {
            ret.push(elems);
        }
    }