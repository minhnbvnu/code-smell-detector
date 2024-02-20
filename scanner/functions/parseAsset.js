function parseAsset( xml ) {

      return {
        unit: parseAssetUnit( getElementsByTagName( xml, 'unit' )[ 0 ] ),
        upAxis: parseAssetUpAxis( getElementsByTagName( xml, 'up_axis' )[ 0 ] )
      };

    }