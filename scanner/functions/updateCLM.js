function updateCLM(clmCanvas) {
	clmCanvas.copy(cvSprite, 0, 0, cvSprite.width, cvSprite.height, 0, 0, undefined, undefined, undefined, undefined, undefined, 1 / K_FACE_CV_DOWNRES_FACTOR, 1 / K_FACE_CV_DOWNRES_FACTOR);
	clmCanvas.update();
}