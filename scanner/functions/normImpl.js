function normImpl(x, p, axis) {
	  if (axis === void 0) {
	    axis = null;
	  }

	  if (x.rank === 0) {
	    return abs$8(x);
	  } // consider vector when no axis is specified


	  if (x.rank !== 1 && axis === null) {
	    return normImpl(reshape(x, [-1]), p, axis);
	  } // vector


	  if (x.rank === 1 || typeof axis === 'number' || Array.isArray(axis) && axis.length === 1) {
	    if (p === 1) {
	      return sum$1(abs$8(x), axis);
	    }

	    if (p === Infinity) {
	      return max$4(abs$8(x), axis);
	    }

	    if (p === -Infinity) {
	      return min$9(abs$8(x), axis);
	    }

	    if (p === 'euclidean' || p === 2) {
	      // norm(x, 2) = sum(abs(xi) ^ 2) ^ 1/2
	      return sqrt$3(sum$1(pow$5(abs$8(x), scalar(2, 'int32')), axis));
	    }

	    throw new Error("Error in norm: invalid ord value: " + p);
	  } // matrix (assumption axis[0] < axis[1])


	  if (Array.isArray(axis) && axis.length === 2) {
	    if (p === 1) {
	      return max$4(sum$1(abs$8(x), axis[0]), axis[1] - 1);
	    }

	    if (p === Infinity) {
	      return max$4(sum$1(abs$8(x), axis[1]), axis[0]);
	    }

	    if (p === -Infinity) {
	      return min$9(sum$1(abs$8(x), axis[1]), axis[0]);
	    }

	    if (p === 'fro' || p === 'euclidean') {
	      // norm(x) = sqrt(sum(pow(x, 2)))
	      return sqrt$3(sum$1(square(x), axis));
	    }

	    throw new Error("Error in norm: invalid ord value: " + p);
	  }

	  throw new Error("Error in norm: invalid axis: " + axis);
	}