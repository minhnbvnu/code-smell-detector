function stress(state, times, finish) {
        var now = +new Date,
          lock = false,
          work = state.work || function () {
              lock = false;
              window.scrollTo(0, times % 2 === 0 ? 100 : 0);
              //log(times, 'scrolling', times % 2 === 0 ? 'down' : 'up');
          };
        times *= 2; //each test consists of scrolling down, and then back up

        bind(window, 'scroll.stressTest', function () {
            if(lock) return; //prevent multiple events
            lock = true;
            if (--times > 0 && !state.cancel) {
                //log('again!');
                setTimeout(work, 0);
            } else {
                setTimeout(function(){
                  //Safari can't unbind from within the bound function
                  unbind(window, 'scroll.stressTest');
                  finish((+new Date) - now);
                }, 0);
            }
        });

        work();
    }