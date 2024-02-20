function onYTPlayerReady() {
                // fix non-responsive keyboard shortcuts bug
                $('input.speed-slider').val(0.5).change().val(1).change();
    
                // Some YouTube embeds only support normal speed
                if (this._ytEl.getAvailablePlaybackRates()[0] === 1) {
                    $('.speed-box').html('This media only supports 1x playback rate. Sorry.');
                }
    
                this.duration = this._ytEl.getDuration();
                
                setTimeout(() => {
                    // kickstart youtube
                    this.play();
                    setTimeout(() => {
                        this.pause();
                        
                        this._isReady = true;
                        window._ytEl = this._ytEl;

                        
                        
                    },500);
        
                },1000);

            
            }