function DecoderConfirmRight() {
    var Decoderselected = $("#Decoder_select_result option:selected").val();
    var DecoderRightvalues = DecoderRight.getValue().trim();
    // console.log(DecoderRightvalues);
    if ("1" == Decoderselected) {
        DecoderLeft.setValue("[" + hexToBytes(DecoderRightvalues).toString() + "]");
    } else if ("2" == Decoderselected) {
        let bytes = new TextEncoder().encode(DecoderRightvalues);
        const typedArray = new Int8Array(new Uint8Array(bytes));
        // console.log(bytes)
        DecoderLeft.setValue("[" + typedArray.toString() + "]");
    }
}