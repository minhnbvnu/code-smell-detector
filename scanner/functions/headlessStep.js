function headlessStep(){
      if( !cy._private.animationsRunning ){ return; }

      util.requestAnimationFrame( function animationStep( now ){
        stepAll( now, cy );
        headlessStep();
      } );
    }