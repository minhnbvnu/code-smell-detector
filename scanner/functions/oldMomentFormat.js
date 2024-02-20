function oldMomentFormat(mom, formatStr) {
    return oldMomentProto.format.call(mom, formatStr); // oldMomentProto defined in moment-ext.js
}