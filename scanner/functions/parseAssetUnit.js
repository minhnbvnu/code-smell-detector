function parseAssetUnit( xml ) {

      if ( ( xml !== undefined ) && ( xml.hasAttribute( 'meter' ) === true ) ) {

        return parseFloat( xml.getAttribute( 'meter' ) );

      } else {

        return 1; // default 1 meter

      }

    }