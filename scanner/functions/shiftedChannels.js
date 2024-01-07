function shiftedChannels(channels, channel, shift) {
	  var channelIdx = channels.indexOf(channel);
	  var res = channels.map(function (c, idx) {
	    if (idx === channelIdx) {
	      return c + " - " + shift;
	    } else {
	      return c;
	    }
	  });
	  return res.join();
	}