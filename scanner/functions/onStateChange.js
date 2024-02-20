function onStateChange (ev){
                var status = ev.data;
                if (status === 1) {
                    this.status = 'playing';
                } else {
                    this.status = 'paused';
                }
                playPauseCallback();
            }