function LegacyJSONLoader( manager ) {

    if ( typeof manager === 'boolean' ) {

      console.warn( 'THREE.JSONLoader: showStatus parameter has been removed from constructor.' );
      manager = undefined;

    }

    this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;

    this.withCredentials = false;

  }