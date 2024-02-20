function drawEmotionChart() {
	if (emotions) {
		emotionChart.visible = true;
		emotionChart.clear();
		emotionChart.beginFill(0x80ff00);

		const angryy = -220 * emotions[3]["probability"];
		const sady = -220 * emotions[2]["probability"];
		const surprisedy = -220 * emotions[6]["probability"];
		const happyy = -220 * emotions[1]["probability"];
		
		emotionChart.drawRect(10, K_PROJECT_HEIGHT, 227.5, angryy);
		emotionChart.drawRect(247.5, K_PROJECT_HEIGHT, 227.5, sady);
		emotionChart.drawRect(485, K_PROJECT_HEIGHT, 227.5, surprisedy);
		emotionChart.drawRect(722.5, K_PROJECT_HEIGHT, 227.5, happyy);

		angryLabelText.visible = true;
		sadLabelText.visible = true;
		surprisedLabelText.visible = true;
		happyLabelText.visible = true;

		angryLabelText.position.x = K_PROJECT_WIDTH / 4 + 123.75
		angryLabelText.position.y = K_PROJECT_HEIGHT + angryy + 30;

		sadLabelText.position.x = K_PROJECT_WIDTH / 4 + 361.25;
		sadLabelText.position.y = K_PROJECT_HEIGHT + sady + 30;

		surprisedLabelText.position.x = K_PROJECT_WIDTH / 4 + 598.75
		surprisedLabelText.position.y = K_PROJECT_HEIGHT + surprisedy + 30;

		happyLabelText.position.x = K_PROJECT_WIDTH / 4 + 836.25;
		happyLabelText.position.y = K_PROJECT_HEIGHT + happyy + 30;
	}
}