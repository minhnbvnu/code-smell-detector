function triangulate(contours) {
		// libtess will take 3d verts and flatten to a plane for tesselation
		// since only doing 2d tesselation here, provide z=1 normal to skip
		// iterating over verts only to get the same answer.
		tessy.gluTessNormal(0, 0, 1);

		const triangleVerts = [];
		tessy.gluTessBeginPolygon(triangleVerts);

		for (let i = 0; i < contours.length; i++) {
			tessy.gluTessBeginContour();
			const contour = contours[i];
			for (let j = 0; j < contour.length; j += 2) {
				const coords = [contour[j], contour[j + 1], 0];
				tessy.gluTessVertex(coords, coords);
			}
			tessy.gluTessEndContour();
		}

		tessy.gluTessEndPolygon();

		return triangleVerts;
	}