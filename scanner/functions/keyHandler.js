function keyHandler(handleObj) {

    var origHandler = handleObj.handler,
    //use namespace as keys so it works with event delegation as well
    //will also allow removing listeners of a specific key combination
    //and support data objects
            keys = (handleObj.namespace || "").toLowerCase().split(" ");
			keys = jQuery.map(keys, function(key) { return key.split("."); });

    //no need to modify handler if no keys specified
    //Added keys[0].substring(0, 12) to work with jQuery ui 1.9.0
    //Added accordion, tabs and menu, then jquery ui can use keys.

    if (keys.length === 1 && (keys[0] === "" ||
			keys[0].substring(0, 12) === "autocomplete"  ||
			keys[0].substring(0, 9) === "accordion"  ||
			keys[0].substring(0, 4) === "tabs"  ||
            keys[0].substring(0, 4) === "menu")) {
      return;
    }

		handleObj.handler = function( event ) {
      /* [RM]: Deviating from the original here and removing this for QuickTabs
       // Don't fire in text-accepting inputs that we didn't directly bind to
       // important to note that $.fn.prop is only available on jquery 1.6+
       if ( this !== event.target && (/textarea|select/i.test( event.target.nodeName ) ||
       event.target.type === "text" || $(event.target).prop('contenteditable') == 'true' )) {
       return;
       }
       */

      // Keypress represents characters, not special keys
      var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[ event.which ],
				character = String.fromCharCode( event.which ).toLowerCase(),
              key, modif = "", possible = {};

      // check combinations (alt|ctrl|shift+anything)
			if ( event.altKey && special !== "alt" ) {
        modif += "alt_";
      }

			if ( event.ctrlKey && special !== "ctrl" ) {
        modif += "ctrl_";
      }

      // TODO: Need to make sure this works consistently across platforms
			if ( event.metaKey && !event.ctrlKey && special !== "meta" ) {
        modif += "meta_";
      }

			if ( event.shiftKey && special !== "shift" ) {
        modif += "shift_";
      }

			if ( special ) {
        possible[ modif + special ] = true;

      } else {
        possible[ modif + character ] = true;
        possible[ modif + jQuery.hotkeys.shiftNums[ character ] ] = true;

        // "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
				if ( modif === "shift_" ) {
          possible[ jQuery.hotkeys.shiftNums[ character ] ] = true;
        }
      }

			for ( var i = 0, l = keys.length; i < l; i++ ) {
				if ( possible[ keys[i] ] ) {
					return origHandler.apply( this, arguments );
        }
      }
    };
  }