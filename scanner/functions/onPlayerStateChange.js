function onPlayerStateChange(event) {
			if (event.data == YT.PlayerState.PLAYING) {
				// @TODO: pause and resume this timer with the video
				setTimeout(() => {
					$(rotologo).css({opacity: 1});
				}, 14150);
			}
			if (event.data == YT.PlayerState.ENDED) {
				player.destroy();
				player = null;
				// @TODO: fade to white instead of black, to work with the multiply effect
				// or fade out opacity alternatively
				// setTimeout/setInterval and check player.getCurrentTime() for when near the end?
				// or we might switch to using soundcloud for the audio and so trigger it with that, with a separate video of just clouds
				// also fade out the rotologo earlier
				$(rotologo).css({opacity: 0});
				// destroy rotologo once faded out
				setTimeout(stop_vaporwave, 1200);
			}
		}