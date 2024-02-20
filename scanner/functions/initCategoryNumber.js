function initCategoryNumber() {
    var nrlower = 1;
    var nrupper = 2;
    for (var cat = 1; cat <= 15; cat++) {
      //Positive numbers
      for (var nr = nrlower; nr < nrupper; nr++) {
        category[32767 + nr] = cat;
        bitcode[32767 + nr] = [];
        bitcode[32767 + nr][1] = cat;
        bitcode[32767 + nr][0] = nr;
      }
      //Negative numbers
      for (var nrneg = -(nrupper - 1); nrneg <= -nrlower; nrneg++) {
        category[32767 + nrneg] = cat;
        bitcode[32767 + nrneg] = [];
        bitcode[32767 + nrneg][1] = cat;
        bitcode[32767 + nrneg][0] = nrupper - 1 + nrneg;
      }
      nrlower <<= 1;
      nrupper <<= 1;
    }
  }