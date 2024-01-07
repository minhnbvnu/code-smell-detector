function mendData(){
    // because the source data doesn't connect nodes properly, use the cytoscape api to mend it:

    cy.startBatch();

    // put nodes in bins based on name
    var nodes = cy.nodes();
    var bin = {};
    var metanames = [];
    for( var i = 0; i < nodes.length; i++ ){
      var node = nodes[i];
      var name = node.data('station_name');
      var nbin = bin[ name ] = bin[ name ] || [];

      nbin.push( node );

      if( nbin.length === 2 ){
        metanames.push( name );
      }
    }

    // connect all nodes together with walking edges
    for( var i = 0; i < metanames.length; i++ ){
      var name = metanames[i];
      var nbin = bin[ name ];

      for( var j = 0; j < nbin.length; j++ ){
        for( var k = j + 1; k < nbin.length; k++ ){
          var nj = nbin[j];
          var nk = nbin[k];

          cy.add({
            group: 'edges',
            data: {
              source: nj.id(),
              target: nk.id(),
              is_walking: true
            }
          });

          //.css({
        //    'line-color': 'yellow'
          // });
        }
      }

    }

    cy.endBatch(); //.autolock( true );
  }