function semiTonesFrom(source,root,semitones,finetune){
        var target;

        target = context.createBufferSource();
        target.buffer = source.buffer;

        if (semitones){
            var rootNote = periodNoteTable[root];
            var rootIndex = noteNames.indexOf(rootNote.name);
            var targetName = noteNames[rootIndex+semitones];
            if (targetName){
                var targetNote = nameNoteTable[targetName];
                if (targetNote){
                    target.playbackRate.value = (rootNote.period/targetNote.period) * source.playbackRate.value;
                }
            }
        }else{
            target.playbackRate.value = source.playbackRate.value
        }

        return target;

    }