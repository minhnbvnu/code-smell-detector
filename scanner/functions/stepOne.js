function stepOne( ele, isCore ){
    let _p = ele._private;
    let current = _p.animation.current;
    let queue = _p.animation.queue;
    let ranAnis = false;

    // if nothing currently animating, get something from the queue
    if( current.length === 0 ){
      let next = queue.shift();

      if( next ){
        current.push( next );
      }
    }

    let callbacks = function( callbacks ){
      for( let j = callbacks.length - 1; j >= 0; j-- ){
        let cb = callbacks[ j ];

        cb();
      }

      callbacks.splice( 0, callbacks.length );
    };

    // step and remove if done
    for( let i = current.length - 1; i >= 0; i-- ){
      let ani = current[ i ];
      let ani_p = ani._private;

      if( ani_p.stopped ){
        current.splice( i, 1 );

        ani_p.hooked = false;
        ani_p.playing = false;
        ani_p.started = false;

        callbacks( ani_p.frames );

        continue;
      }

      if( !ani_p.playing && !ani_p.applying ){ continue; }

      // an apply() while playing shouldn't do anything
      if( ani_p.playing && ani_p.applying ){
        ani_p.applying = false;
      }

      if( !ani_p.started ){
        startAnimation( ele, ani, now, isCore );
      }

      step( ele, ani, now, isCore );

      if( ani_p.applying ){
        ani_p.applying = false;
      }

      callbacks( ani_p.frames );

      if( ani_p.step != null ){
        ani_p.step(now);
      }

      if( ani.completed() ){
        current.splice( i, 1 );

        ani_p.hooked = false;
        ani_p.playing = false;
        ani_p.started = false;

        callbacks( ani_p.completes );
      }

      ranAnis = true;
    }

    if( !isCore && current.length === 0 && queue.length === 0 ){
      doneEles.push( ele );
    }

    return ranAnis;
  }