function timeupdateHandle () {
        let duration = aliplayer_el.duration       
        console.log('duration', duration)
        if (!isNaN(duration) && duration !== 0) {
          aliplayer_el.removeEventListener('timeupdate', timeupdateHandle)
          self.adDuration = Math.ceil(aliplayer_el.duration)
          if (self.html.querySelector('.autoplay-video-ad').style.display !== 'none') {
            self.html.querySelector('.autoplay-video-ad').style.display = 'none'
            player.play()
          }
          self.html.querySelector('#video-ad-duration').innerText = self.adDuration
          self.setAdInterval()
          // document.getElementById('loadflag').style.display = 'none'
        }
      }