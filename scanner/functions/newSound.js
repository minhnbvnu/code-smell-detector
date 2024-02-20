function newSound()
{
    print('new sound');

    var sound = new snd.Sound();

    var notes = music.genScale('A3', 'natural minor', 2);
    var curNote = notes[0];

    function nextNote(curNote)
    {
        for (;;)
        {
            var note = rnd.elem(notes);

            var cons = music.consonance(curNote, note);

            if (cons < 0)
                continue;

            return note;
        }
    }

    print('generating sound...');
    var startTime = (new Date()).getTime();

    for (var noteIdx = 0; noteIdx < 6; ++noteIdx)
    {
        var curNote = nextNote(curNote);

        var f0 = curNote.getFreq();
        var f1 = 2.01 * f0;

        for (var i = 0; i < 16000; ++i)
        {
            var t = i / sound.sampleRate;

            var s0 = triOsc(t, f0, 0.25);
            var s1 = triOsc(t, f1, 0.20);

            var e0 = ARExpEnv(t, 0.02, 0.2);
            var e1 = ARExpEnv(t, 0.01, 0.4);

            var s = (e0 * s0 + e1 * s1) / 2;

            sound.setSample(sound.numSamples, 0, s);
        }
    }

    var endTime = (new Date()).getTime();
    print('done generating, time =', endTime - startTime, 'ms');

    window.canvas.clear('#000000');
    window.canvas.setColor(255, 0, 0);

    for (var i = 0; i < sound.numSamples; ++i)
    {
        var s = sound.getSample(i, 0);

        var x = ((i / sound.numSamples) * window.width) | 0;
        var y = (((s + 1) / 2) * window.height) | 0;

        window.canvas.drawPoint(x, y);
    }

    print('num samples:', sound.numSamples);

    tmpName = stdio.tmpname();
    print('writing sound to:', tmpName);
    sound.writeWAV(tmpName);

    if (ffi.os === 'OSX')
    {
        var r = stdlib.system('play ' + tmpName);
        if (r !== 0)
            print('install sox program for sound playback - e.g. "brew install sox"');
    }
    else
    {
        var r = stdlib.system('aplay ' + tmpName);
        if (r !== 0)
            print('install aplay program for sound playback');
    }

    stdlib.system('rm ' + tmpName);
}