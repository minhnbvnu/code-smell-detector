function replay(audio) {
        console.log('replay');
        audio.write(generate(44100));
        setTimeout(function() {
            replay(audio)
        }, 10);
    }