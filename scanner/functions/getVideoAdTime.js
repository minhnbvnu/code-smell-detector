function getVideoAdTime () {
      videoAd_ele.removeEventListener('canplay', getVideoAdTime)
      //广告起播loading 
      document.getElementById('loadflag').style.display = 'none'
      self.adDuration = Math.ceil(videoAd_ele.duration)
      let adDuration_ele = self.html.querySelector('#video-ad-duration')
      adDuration_ele.innerText = self.adDuration
      videoAd_ele.play().then(() => {
        self.setAdInterval()
      })
      .catch(err => {
        self.html.querySelector('.autoplay-video-ad').style.display = 'block'
      })
    }