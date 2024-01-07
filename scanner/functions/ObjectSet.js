constructor( arrayOrObjectSet ){
    this._obj = Object.create(null);
    this.size = 0;

    if( arrayOrObjectSet != null ){
      let arr;

      if( arrayOrObjectSet.instanceString != null && arrayOrObjectSet.instanceString() === this.instanceString() ){
        arr = arrayOrObjectSet.toArray();
      } else {
        arr = arrayOrObjectSet;
      }

      for( let i = 0; i < arr.length; i++ ){
        this.add( arr[i] );
      }
    }
  }