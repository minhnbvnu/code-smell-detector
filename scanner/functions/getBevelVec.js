function getBevelVec( inPt, inPrev, inNext ) {

    				// computes for inPt the corresponding point inPt' on a new contour
    				//   shifted by 1 unit (length of normalized vector) to the left
    				// if we walk along contour clockwise, this new contour is outside the old one
    				//
    				// inPt' is the intersection of the two lines parallel to the two
    				//  adjacent edges of inPt at a distance of 1 unit on the left side.

    				let v_trans_x, v_trans_y, shrink_by; // resulting translation vector for inPt

    				// good reading for geometry algorithms (here: line-line intersection)
    				// http://geomalgorithms.com/a05-_intersect-1.html

    				const v_prev_x = inPt.x - inPrev.x,
    					v_prev_y = inPt.y - inPrev.y;
    				const v_next_x = inNext.x - inPt.x,
    					v_next_y = inNext.y - inPt.y;

    				const v_prev_lensq = ( v_prev_x * v_prev_x + v_prev_y * v_prev_y );

    				// check for collinear edges
    				const collinear0 = ( v_prev_x * v_next_y - v_prev_y * v_next_x );

    				if ( Math.abs( collinear0 ) > Number.EPSILON ) {

    					// not collinear

    					// length of vectors for normalizing

    					const v_prev_len = Math.sqrt( v_prev_lensq );
    					const v_next_len = Math.sqrt( v_next_x * v_next_x + v_next_y * v_next_y );

    					// shift adjacent points by unit vectors to the left

    					const ptPrevShift_x = ( inPrev.x - v_prev_y / v_prev_len );
    					const ptPrevShift_y = ( inPrev.y + v_prev_x / v_prev_len );

    					const ptNextShift_x = ( inNext.x - v_next_y / v_next_len );
    					const ptNextShift_y = ( inNext.y + v_next_x / v_next_len );

    					// scaling factor for v_prev to intersection point

    					const sf = ( ( ptNextShift_x - ptPrevShift_x ) * v_next_y -
    							( ptNextShift_y - ptPrevShift_y ) * v_next_x ) /
    						( v_prev_x * v_next_y - v_prev_y * v_next_x );

    					// vector from inPt to intersection point

    					v_trans_x = ( ptPrevShift_x + v_prev_x * sf - inPt.x );
    					v_trans_y = ( ptPrevShift_y + v_prev_y * sf - inPt.y );

    					// Don't normalize!, otherwise sharp corners become ugly
    					//  but prevent crazy spikes
    					const v_trans_lensq = ( v_trans_x * v_trans_x + v_trans_y * v_trans_y );
    					if ( v_trans_lensq <= 2 ) {

    						return new Vector2( v_trans_x, v_trans_y );

    					} else {

    						shrink_by = Math.sqrt( v_trans_lensq / 2 );

    					}

    				} else {

    					// handle special case of collinear edges

    					let direction_eq = false; // assumes: opposite

    					if ( v_prev_x > Number.EPSILON ) {

    						if ( v_next_x > Number.EPSILON ) {

    							direction_eq = true;

    						}

    					} else {

    						if ( v_prev_x < - Number.EPSILON ) {

    							if ( v_next_x < - Number.EPSILON ) {

    								direction_eq = true;

    							}

    						} else {

    							if ( Math.sign( v_prev_y ) === Math.sign( v_next_y ) ) {

    								direction_eq = true;

    							}

    						}

    					}

    					if ( direction_eq ) {

    						// console.log("Warning: lines are a straight sequence");
    						v_trans_x = - v_prev_y;
    						v_trans_y = v_prev_x;
    						shrink_by = Math.sqrt( v_prev_lensq );

    					} else {

    						// console.log("Warning: lines are a straight spike");
    						v_trans_x = v_prev_x;
    						v_trans_y = v_prev_y;
    						shrink_by = Math.sqrt( v_prev_lensq / 2 );

    					}

    				}

    				return new Vector2( v_trans_x / shrink_by, v_trans_y / shrink_by );

    			}