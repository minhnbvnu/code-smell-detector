function getAveragePositiveEmotions(emotionDataArray, startFrame, endFrame) {
  if (emotionDataArray.length > 0) {
    let acc = 0;
    let n = 0;

    for (let i = 0; i < emotionDataArray.length; i += 1) {
      if (
        emotionDataArray[i].frame >= startFrame &&
        emotionDataArray[i].frame < endFrame &&
        emotionDataArray[i].happy
      ) {
        acc += emotionDataArray[i].happy;
        n += 1;
      }
    }

    if (n > 0) {
      return acc / n;
    }
  }

  return null;
}