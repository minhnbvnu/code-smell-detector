function simpleCloneInputData(input) {
            // make a simple copy of the pointers because we will get a reference if we don't
            // we only need clientXY for the calculations
            var pointers = [];
            var i = 0;
            while (i < input.pointers.length) {
                pointers[i] = {
                    clientX: round(input.pointers[i].clientX),
                    clientY: round(input.pointers[i].clientY)
                };
                i++;
            }
            return {
                timeStamp: now(),
                pointers: pointers,
                center: getCenter(pointers),
                deltaX: input.deltaX,
                deltaY: input.deltaY
            };
        }