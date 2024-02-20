function DecoderConfirmLeft(){
        var Decoderselected = $("#Decoder_select_result option:selected").val();
        var DecoderLeftvalues = DecoderLeft.getValue().trim();
        // console.log(DecoderLeftvalues);
        if ("1" == Decoderselected){
            // DecoderRight.setValue(bytesToHex(DecoderLeftvalues.split(',')));
            DecoderRight.setValue(bytesToHex(eval(DecoderLeftvalues)));
        }else if ("2" == Decoderselected){
            // let bytes = new Uint8Array(DecoderLeftvalues.split(','));
            let bytes = new Uint8Array(eval(DecoderLeftvalues));
            let str = new TextDecoder().decode(bytes);
            // console.log(bytes,str);
            DecoderRight.setValue(str);
        }
        // console.log(Decoderselected);
}