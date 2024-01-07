function complete(){
        c++;

        if( c === 2 ){
          expect( parseFloat(n1.style().width) ).to.equal(200);
          expect( parseFloat(n2.style().width) ).to.equal(200);
          next();
        }
      }