function buildSideFaces() {

    				const start = verticesArray.length / 3;
    				let layeroffset = 0;
    				sidewalls( contour, layeroffset );
    				layeroffset += contour.length;

    				for ( let h = 0, hl = holes.length; h < hl; h ++ ) {

    					const ahole = holes[ h ];
    					sidewalls( ahole, layeroffset );

    					//, true
    					layeroffset += ahole.length;

    				}


    				scope.addGroup( start, verticesArray.length / 3 - start, 1 );


    			}