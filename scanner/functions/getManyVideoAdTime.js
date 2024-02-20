function getManyVideoAdTime(){
      manyVideoAd_ele.removeEventListener('canplay', getManyVideoAdTime)
      videoAdDetak.href = adVideoSource_[indexVideo_ - 1].adVideoLink
      self.html.querySelector('#many-video-ad-duration').innerText = Math.ceil(manyVideoAd_ele.duration)
    }