function computePaddingValues( width, height, paddingObject, relativeTo ) {
      // Assuming percentage is number from 0 to 1
      if(paddingObject.units === '%') {
        switch(relativeTo) {
          case 'width':
            return width > 0 ? paddingObject.pfValue * width : 0;
          case 'height':
            return height > 0 ? paddingObject.pfValue * height : 0;
          case 'average':
            return ( width > 0 ) && ( height > 0 ) ? paddingObject.pfValue * ( width + height ) / 2 : 0;
          case 'min':
            return ( width > 0 ) && ( height > 0 ) ? ( ( width > height ) ? paddingObject.pfValue * height : paddingObject.pfValue * width ) : 0;
          case 'max':
            return ( width > 0 ) && ( height > 0 ) ? ( ( width > height ) ? paddingObject.pfValue * width : paddingObject.pfValue * height ) : 0;
          default:
            return 0;
        }
      } else if(paddingObject.units === 'px') {
        return paddingObject.pfValue;
      } else {
        return 0;
      }
    }