function randomColor(){
    function randCh(){
      return Math.round( Math.random() * 255 );
    }

    return 'rgb(' + randCh() + ', ' + randCh() + ', ' + randCh() + ')';
  }