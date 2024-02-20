function generateRandomState() {
      var rgbValues = {
         red: 0,
         green: 0,
         blue: 0
      };

      rgbValues.red = Math.floor(Math.random() * 255);
      rgbValues.green = Math.floor(Math.random() * 255);
      rgbValues.blue = Math.floor(Math.random() * 255);

      return {
         state: {
            desired: rgbValues
         }
      };
   }