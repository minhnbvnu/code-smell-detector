function getBuild( data, builder ) {

      if ( data.build !== undefined ) return data.build;

      data.build = builder( data );

      return data.build;

    }