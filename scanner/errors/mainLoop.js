function mainLoop(node, index, nodes) {
			var active = activeNodes.first(),
				next = null,
				ratio = 0,
				demerits = 0,
				candidates = [],
				badness,
				currentLine = 0,
				tmpSum,
				currentClass = 0,
				fitnessClass,
				candidate,
				newNode;

			// The inner loop iterates through all the active nodes with line < currentLine and then
			// breaks out to insert the new active node candidates before looking at the next active
			// nodes for the next lines. The result of this is that the active node list is always
			// sorted by line number.
			while (active !== null) {

				candidates = [{
					demerits: Infinity
				}, {
					demerits: Infinity
				}, {
					demerits: Infinity
				}, {
					demerits: Infinity
				}];

				// Iterate through the linked list of active nodes to find new potential active nodes
				// and deactivate current active nodes.
				while (active !== null) {
					next = active.next;
					currentLine = active.data.line + 1;
					ratio = computeCost(active.data.position, index, active.data, currentLine);

					// Deactive nodes when the distance between the current active node and the
					// current node becomes too large (i.e. it exceeds the stretch limit and the stretch
					// ratio becomes negative) or when the current node is a forced break (i.e. the end
					// of the paragraph when we want to remove all active nodes, but possibly have a final
					// candidate active node---if the paragraph can be set using the given tolerance value.)
					if (ratio < -1 || (node.type === 'penalty' && node.penalty === -linebreak.infinity)) {
						activeNodes.remove(active);
					}

					// If the ratio is within the valid range of -1 <= ratio <= tolerance calculate the
					// total demerits and record a candidate active node.
					if (-1 <= ratio && ratio <= options.tolerance) {
						badness = 100 * Math.pow(Math.abs(ratio), 3);

						// Positive penalty
						if (node.type === 'penalty' && node.penalty >= 0) {
							demerits = Math.pow(options.demerits.line + badness, 2) + Math.pow(node.penalty, 2);
						// Negative penalty but not a forced break
						} else if (node.type === 'penalty' && node.penalty !== -linebreak.infinity) {
							demerits = Math.pow(options.demerits.line + badness, 2) - Math.pow(node.penalty, 2);
						// All other cases
						} else {
							demerits = Math.pow(options.demerits.line + badness, 2);
						}

						if (node.type === 'penalty' && nodes[active.data.position].type === 'penalty') {
							demerits += options.demerits.flagged * node.flagged * nodes[active.data.position].flagged;
						}

						// Calculate the fitness class for this candidate active node.
						if (ratio < -0.5) {
							currentClass = 0;
						} else if (ratio <= 0.5) {
							currentClass = 1;
						} else if (ratio <= 1) {
							currentClass = 2;
						} else {
							currentClass = 3;
						}

						// Add a fitness penalty to the demerits if the fitness classes of two adjacent lines
						// differ too much.
						if (Math.abs(currentClass - active.data.fitnessClass) > 1) {
							demerits += options.demerits.fitness;
						}

						// Add the total demerits of the active node to get the total demerits of this candidate node.
						demerits += active.data.demerits;

						// Only store the best candidate for each fitness class
						if (demerits < candidates[currentClass].demerits) {
							candidates[currentClass] = {
								active: active,
								demerits: demerits,
								ratio: ratio
							};
						}
					}

					active = next;

					// Stop iterating through active nodes to insert new candidate active nodes in the active list
					// before moving on to the active nodes for the next line.
					// TODO: The Knuth and Plass paper suggests a conditional for currentLine < j0. This means paragraphs
					// with identical line lengths will not be sorted by line number. Find out if that is a desirable outcome.
					// For now I left this out, as it only adds minimal overhead to the algorithm and keeping the active node
					// list sorted has a higher priority.
					if (active !== null && active.data.line >= currentLine) {
						break;
					}
				}

				tmpSum = computeSum(index);

				for (fitnessClass = 0; fitnessClass < candidates.length; fitnessClass += 1) {
					candidate = candidates[fitnessClass];

					if (candidate.demerits < Infinity) {
						newNode = new Typeset.LinkedList.Node(breakpoint(index, candidate.demerits, candidate.ratio,
							candidate.active.data.line + 1, fitnessClass, tmpSum, candidate.active));
						if (active !== null) {
							activeNodes.insertBefore(active, newNode);
						} else {
							activeNodes.push(newNode);
						}
					}
				}
			}
		}