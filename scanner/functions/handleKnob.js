function handleKnob(knob,value){

        if (!filterChain) return;
        if (knob.isDisabled) return;

        var label = knob.getLabel();

        switch (label){
            case "volume":{
                filterChain.volumeValue(value);
                break;
            }
            case "panning":{
                filterChain.panningValue((value-50)/50);
                break;
            }
            case "high":{
                filterChain.highValue(value/100);
                break;
            }
            case "mid":{
                filterChain.midValue(value/100);
                break;
            }
            case "low":{
                filterChain.lowValue(value/100);
                break;
            }
            case "lowPass":{
                filterChain.lowPassFrequencyValue(value/100);
                break;
            }
            case "reverb":{
                filterChain.reverbValue(value);
                break;
            }
            case "distortion":{
                filterChain.distortionValue(value);
                break;

            }
            case "delay":{
                filterChain.delayValue(value)
                break;
            }
            case "compression":{
                filterChain.compressionValue(value);
                break;
            }
        }

    }