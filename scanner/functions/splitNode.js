function splitNode( node, offset, count, centroidBoundingData = null, depth = 0 ) {

    		if ( ! reachedMaxDepth && depth >= maxDepth ) {

    			reachedMaxDepth = true;
    			if ( verbose ) {

    				console.warn( `MeshBVH: Max depth of ${ maxDepth } reached when generating BVH. Consider increasing maxDepth.` );
    				console.warn( geo );

    			}

    		}

    		// early out if we've met our capacity
    		if ( count <= maxLeafTris || depth >= maxDepth ) {

    			triggerProgress( offset + count );
    			node.offset = offset;
    			node.count = count;
    			return node;

    		}

    		// Find where to split the volume
    		const split = getOptimalSplit( node.boundingData, centroidBoundingData, triangleBounds, offset, count, strategy );
    		if ( split.axis === - 1 ) {

    			triggerProgress( offset + count );
    			node.offset = offset;
    			node.count = count;
    			return node;

    		}

    		const splitOffset = partition( indexArray, triangleBounds, offset, count, split );

    		// create the two new child nodes
    		if ( splitOffset === offset || splitOffset === offset + count ) {

    			triggerProgress( offset + count );
    			node.offset = offset;
    			node.count = count;

    		} else {

    			node.splitAxis = split.axis;

    			// create the left child and compute its bounding box
    			const left = new MeshBVHNode();
    			const lstart = offset;
    			const lcount = splitOffset - offset;
    			node.left = left;
    			left.boundingData = new Float32Array( 6 );

    			getBounds( triangleBounds, lstart, lcount, left.boundingData, cacheCentroidBoundingData );
    			splitNode( left, lstart, lcount, cacheCentroidBoundingData, depth + 1 );

    			// repeat for right
    			const right = new MeshBVHNode();
    			const rstart = splitOffset;
    			const rcount = count - lcount;
    			node.right = right;
    			right.boundingData = new Float32Array( 6 );

    			getBounds( triangleBounds, rstart, rcount, right.boundingData, cacheCentroidBoundingData );
    			splitNode( right, rstart, rcount, cacheCentroidBoundingData, depth + 1 );

    		}

    		return node;

    	}