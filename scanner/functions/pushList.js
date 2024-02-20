function pushList() {
        if (useNative !== undefined) {
            var fn = useNative ? Renderer.mergeNativeBlend : Renderer.mergeManualBlend;
            renderPipe.push(fn(iCanvas, currentList));
        }
    }