function setupAudioPlayers() {
    $('.audio-player').each(function() {
        var $player = $(this);
        var audio = $player.find('audio').get(0);
        var $position = $player.find('.position');
        var loaded = false;

        audio.onplaying = function() {
            $player.addClass('playing');
            $player.removeClass('paused');
        };
        audio.onpause = function() {
            $player.addClass('playing');
            $player.addClass('paused');
        };
        audio.onended = function() {
            $player.removeClass('playing');
            $player.removeClass('paused');
        };
        audio.ontimeupdate = function() {
            var t = audio.currentTime;
            var msg = "";

            msg = Math.floor(t/60)+':'+Math.ceil(t % 60);

            $position.text(msg);
        };

        $player.find('.do-play').click(function(e) {
            e.preventDefault();
            if (!loaded) {
                audio.load();
                loaded = true;
            }
            audio.play();
        });

        $player.find('.do-pause').click(function(e) {
            e.preventDefault();
            audio.pause();
        });

        $player.find('.do-stop').click(function(e) {
            e.preventDefault();
            audio.pause();
            audio.currentTime = 0;
        });
    });
}