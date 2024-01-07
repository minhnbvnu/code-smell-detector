function defineSwitchSet( params ){
  elesfn[ params.field ] = function(){
    let ele = this[0];

    if( ele ){
      if( params.overrideField ){
        let val = params.overrideField( ele );

        if( val !== undefined ){
          return val;
        }
      }

      return ele._private[ params.field ];
    }
  };

  elesfn[ params.on ] = defineSwitchFunction( {
    event: params.on,
    field: params.field,
    ableField: params.ableField,
    overrideAble: params.overrideAble,
    value: true
  } );

  elesfn[ params.off ] = defineSwitchFunction( {
    event: params.off,
    field: params.field,
    ableField: params.ableField,
    overrideAble: params.overrideAble,
    value: false
  } );
}