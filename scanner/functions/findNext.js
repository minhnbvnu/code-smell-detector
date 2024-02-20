function findNext(key, obj) {

      // console.log (" key is: "+ key);
      // console.log ("array is " + JSON.stringify (obj));
      var keys = Object.keys(obj);

      var len = keys.length;
      var curindex = keys.indexOf(key);
      var modulus = (curindex + 1) % len;

      //console.log ("*********** len="+len+" curr="+curindex+" next="+modulus);

      //console.log ("Keys array "+ JSON.stringify(keys));

      //console.log ("Current index: "+ keys.indexOf(key) );
      //console.log ("returning index of " + (keys.indexOf(key) + 1) % (keys.length));
      // console.log ("keys length is "+ keys.length);
      return keys[modulus];

      /*
       var size = Object.keys(obj).length;
       var i;
       for (i=0; i<size; i++) {
          if (Object.keys(obj)[i] == key)
          break;
       }
       i = (i + 1) % size;
       return Object.keys(obj)[i];
       */
    }