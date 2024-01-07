function defineSwitchFunction( params ){
  return function(){
    let args = arguments;
    let changedEles = [];

    // e.g. cy.nodes().select( data, handler )
    if( args.length === 2 ){
      let data = args[0];
      let handler = args[1];
      this.on( params.event, data, handler );
    }

    // e.g. cy.nodes().select( handler )
    else if( args.length === 1 && is.fn(args[0]) ){
      let handler = args[0];
      this.on( params.event, handler );
    }

    // e.g. cy.nodes().select()
    // e.g. (private) cy.nodes().select(['tapselect'])
    else if( args.length === 0 || (args.length === 1 && is.array(args[0])) ){
      let addlEvents = args.length === 1 ? args[0] : null;

      for( let i = 0; i < this.length; i++ ){
        let ele = this[ i ];
        let able = !params.ableField || ele._private[ params.ableField ];
        let changed = ele._private[ params.field ] != params.value;

        if( params.overrideAble ){
          let overrideAble = params.overrideAble( ele );

          if( overrideAble !== undefined ){
            able = overrideAble;

            if( !overrideAble ){ return this; } // to save cycles assume not able for all on override
          }
        }

        if( able ){
          ele._private[ params.field ] = params.value;

          if( changed ){
            changedEles.push( ele );
          }
        }
      }

      let changedColl = this.spawn( changedEles );
      changedColl.updateStyle(); // change of state => possible change of style
      changedColl.emit( params.event );

      if( addlEvents ){
        changedColl.emit( addlEvents );
      }
    }

    return this;
  };
}