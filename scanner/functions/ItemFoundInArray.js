function ItemFoundInArray(aArray, aItem) {
      for (var i = 0; i < aArray.length; i++)
        if (aItem == aArray[i])
          return true;
      return false;
    }