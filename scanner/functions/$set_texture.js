function $set_texture(spritesheetArray, fontArray) {
    if (spritesheetArray.length) {
        // Test for data transfer correctness
        console.assert(spritesheetArray[0].$uint16Data.width !== undefined);
    }
   
    // In web worker mode, send a message
    if ($GPU) {
        // console.log('sending set_texture');
        $GPU.postMessage({
            type: 'set_texture',
            spritesheetArray: spritesheetArray,
            fontArray: fontArray});
    } else {
        // Call directly
        $gpu_set_texture(spritesheetArray, fontArray);
    }
}