function marshalEmotions(expressions, emotionStruct) {
	emotionStruct.angry.push(expressions[3]["probability"]);
	emotionStruct.sad.push(expressions[2]["probability"]);
	emotionStruct.surprised.push(expressions[6]["probability"]);
	emotionStruct.happy.push(expressions[1]["probability"]);
}