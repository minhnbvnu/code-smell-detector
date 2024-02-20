function iterateOverDoubleTriangles( offset1, count1, offset2, count2, depth1, index1, depth2, index2 ) {

    				for ( let i2 = offset2, l2 = offset2 + count2; i2 < l2; i2 ++ ) {

    					setTriangle( triangle2, i2 * 3, otherIndexAttr, otherPositionAttr );
    					triangle2.a.applyMatrix4( matrixToLocal );
    					triangle2.b.applyMatrix4( matrixToLocal );
    					triangle2.c.applyMatrix4( matrixToLocal );
    					triangle2.needsUpdate = true;

    					for ( let i1 = offset1, l1 = offset1 + count1; i1 < l1; i1 ++ ) {

    						setTriangle( triangle, i1 * 3, indexAttr, positionAttr );
    						triangle.needsUpdate = true;

    						if ( intersectsTriangles( triangle, triangle2, i1, i2, depth1, index1, depth2, index2 ) ) {

    							return true;

    						}

    					}

    				}

    				return false;

    			}