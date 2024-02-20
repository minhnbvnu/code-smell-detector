function removeHoles( contour, holes ) {

			var shape = contour.concat(); // work on this shape
			var hole;

			function isCutLineInsideAngles( inShapeIdx, inHoleIdx ) {
				// Check if hole point lies within angle around shape point
				var lastShapeIdx = shape.length - 1;

				var prevShapeIdx = inShapeIdx - 1;
				if ( prevShapeIdx < 0 )			prevShapeIdx = lastShapeIdx;

				var nextShapeIdx = inShapeIdx + 1;
				if ( nextShapeIdx > lastShapeIdx )	nextShapeIdx = 0;

				var insideAngle = isPointInsideAngle( shape[inShapeIdx], shape[ prevShapeIdx ], shape[ nextShapeIdx ], hole[inHoleIdx] );
				if (! insideAngle ) {
					// console.log( "Vertex (Shape): " + inShapeIdx + ", Point: " + hole[inHoleIdx].x + "/" + hole[inHoleIdx].y );
					return	false;
				}

				// Check if shape point lies within angle around hole point
				var lastHoleIdx = hole.length - 1;

				var prevHoleIdx = inHoleIdx - 1;
				if ( prevHoleIdx < 0 )			prevHoleIdx = lastHoleIdx;

				var nextHoleIdx = inHoleIdx + 1;
				if ( nextHoleIdx > lastHoleIdx )	nextHoleIdx = 0;

				insideAngle = isPointInsideAngle( hole[inHoleIdx], hole[ prevHoleIdx ], hole[ nextHoleIdx ], shape[inShapeIdx] );
				if (! insideAngle ) {
					// console.log( "Vertex (Hole): " + inHoleIdx + ", Point: " + shape[inShapeIdx].x + "/" + shape[inShapeIdx].y );
					return	false;
				}

				return	true;
			}

			function intersectsShapeEdge( inShapePt, inHolePt ) {
				// checks for intersections with shape edges
				var sIdx, nextIdx, intersection;
				for ( sIdx = 0; sIdx < shape.length; sIdx ++ ) {
					nextIdx = sIdx + 1; nextIdx %= shape.length;
					intersection = intersect_segments_2D( inShapePt, inHolePt, shape[sIdx], shape[nextIdx], true );
					if ( intersection.length > 0 )		return	true;
				}

				return	false;
			}

			var indepHoles = [];

			function intersectsHoleEdge( inShapePt, inHolePt ) {
				// checks for intersections with hole edges
				var ihIdx, chkHole,
					hIdx, nextIdx, intersection;
				for ( ihIdx = 0; ihIdx < indepHoles.length; ihIdx ++ ) {
					chkHole = holes[indepHoles[ihIdx]];
					for ( hIdx = 0; hIdx < chkHole.length; hIdx ++ ) {
						nextIdx = hIdx + 1; nextIdx %= chkHole.length;
						intersection = intersect_segments_2D( inShapePt, inHolePt, chkHole[hIdx], chkHole[nextIdx], true );
						if ( intersection.length > 0 )		return	true;
					}
				}
				return	false;
			}

			var holeIndex, shapeIndex,
				shapePt, holePt,
				holeIdx, cutKey, failedCuts = [],
				tmpShape1, tmpShape2,
				tmpHole1, tmpHole2;

			for ( var h = 0, hl = holes.length; h < hl; h ++ ) {

				indepHoles.push( h );

			}

			var minShapeIndex = 0;
			var counter = indepHoles.length * 2;
			while ( indepHoles.length > 0 ) {
				counter --;
				if ( counter < 0 ) {
					console.log( "Infinite Loop! Holes left:" + indepHoles.length + ", Probably Hole outside Shape!" );
					break;
				}

				// search for shape-vertex and hole-vertex,
				// which can be connected without intersections
				for ( shapeIndex = minShapeIndex; shapeIndex < shape.length; shapeIndex ++ ) {

					shapePt = shape[ shapeIndex ];
					holeIndex	= - 1;

					// search for hole which can be reached without intersections
					for ( var h = 0; h < indepHoles.length; h ++ ) {
						holeIdx = indepHoles[h];

						// prevent multiple checks
						cutKey = shapePt.x + ":" + shapePt.y + ":" + holeIdx;
						if ( failedCuts[cutKey] !== undefined )			continue;

						hole = holes[holeIdx];
						for ( var h2 = 0; h2 < hole.length; h2 ++ ) {
							holePt = hole[ h2 ];
							if (! isCutLineInsideAngles( shapeIndex, h2 ) )		continue;
							if ( intersectsShapeEdge( shapePt, holePt ) )		continue;
							if ( intersectsHoleEdge( shapePt, holePt ) )		continue;

							holeIndex = h2;
							indepHoles.splice(h, 1);

							tmpShape1 = shape.slice( 0, shapeIndex + 1 );
							tmpShape2 = shape.slice( shapeIndex );
							tmpHole1 = hole.slice( holeIndex );
							tmpHole2 = hole.slice( 0, holeIndex + 1 );

							shape = tmpShape1.concat( tmpHole1 ).concat( tmpHole2 ).concat( tmpShape2 );

							minShapeIndex = shapeIndex;

							// Debug only, to show the selected cuts
							// glob_CutLines.push( [ shapePt, holePt ] );

							break;
						}
						if ( holeIndex >= 0 )	break;		// hole-vertex found

						failedCuts[cutKey] = true;			// remember failure
					}
					if ( holeIndex >= 0 )	break;		// hole-vertex found
				}
			}

			return shape; 			/* shape with no holes */
		}