function getAverageNegativeEmotions(emotionDataArray, startFrame, endFrame) {
  if (emotionDataArray.length > 0) {
    let acc = 0;
    let n = 0;

    for (let i = 0; i < emotionDataArray.length; i += 1) {
      if (
        emotionDataArray[i].frame >= startFrame &&
        emotionDataArray[i].frame < endFrame &&
        emotionDataArray[i].sad
      ) {
        acc +=
          emotionDataArray[i].sad +
          emotionDataArray[i].angry +
          emotionDataArray[i].fearful +
          emotionDataArray[i].disgusted;
        n += 4;
      }
    }

    if (n > 0) {
      return acc / n;
    }
  }

  return null;
}