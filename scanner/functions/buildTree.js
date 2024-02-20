function buildTree( geo, options ) {

    	function triggerProgress( trianglesProcessed ) {

    		if ( onProgress ) {

    			onProgress( trianglesProcessed / totalTriangles );

    		}

    	}

    	// either recursively splits the given node, creating left and right subtrees for it, or makes it a leaf node,
    	// recording the offset and count of its triangles and writing them into the reordered geometry index.
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

    	ensureIndex( geo, options );

    	// Compute the full bounds of the geometry at the same time as triangle bounds because
    	// we'll need it for the root bounds in the case with no groups and it should be fast here.
    	// We can't use the geometrying bounding box if it's available because it may be out of date.
    	const fullBounds = new Float32Array( 6 );
    	const cacheCentroidBoundingData = new Float32Array( 6 );
    	const triangleBounds = computeTriangleBounds( geo, fullBounds );
    	const indexArray = geo.index.array;
    	const maxDepth = options.maxDepth;
    	const verbose = options.verbose;
    	const maxLeafTris = options.maxLeafTris;
    	const strategy = options.strategy;
    	const onProgress = options.onProgress;
    	const totalTriangles = geo.index.count / 3;
    	let reachedMaxDepth = false;

    	const roots = [];
    	const ranges = getRootIndexRanges( geo );

    	if ( ranges.length === 1 ) {

    		const range = ranges[ 0 ];
    		const root = new MeshBVHNode();
    		root.boundingData = fullBounds;
    		getCentroidBounds( triangleBounds, range.offset, range.count, cacheCentroidBoundingData );

    		splitNode( root, range.offset, range.count, cacheCentroidBoundingData );
    		roots.push( root );

    	} else {

    		for ( let range of ranges ) {

    			const root = new MeshBVHNode();
    			root.boundingData = new Float32Array( 6 );
    			getBounds( triangleBounds, range.offset, range.count, root.boundingData, cacheCentroidBoundingData );

    			splitNode( root, range.offset, range.count, cacheCentroidBoundingData );
    			roots.push( root );

    		}

    	}

    	return roots;

    }