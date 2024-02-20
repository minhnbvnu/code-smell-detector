function drawFaceModel(landmarks) {
	function draw(points) {
		faceModel.moveTo(landmarks[points[0]][0], landmarks[points[0]][1]);

		for (let i = 1; i < points.length; i += 1) {
			faceModel.lineTo(landmarks[points[i]][0], landmarks[points[i]][1]);
		}
	}

	if (landmarks) {	
		faceModel.visible = true;
		faceModel.clear();
		faceModel.lineStyle(3, 0x80ff00, 1);
		draw(K_FACE_OUTLINE);
		draw(K_FACE_MOUTH);
		draw(K_FACE_SEPTUM);
		draw(K_FACE_NOSE);
		draw(K_FACE_LEFT_EYE);
		draw(K_FACE_RIGHT_EYE);
		draw(K_FACE_LEFT_BROW);
		draw(K_FACE_RIGHT_BROW);
	}
}