function showPanel( id ) {

    		for ( var i = 0; i < container.children.length; i ++ ) {

    			container.children[ i ].style.display = i === id ? 'block' : 'none';

    		}

    		mode = id;

    	}