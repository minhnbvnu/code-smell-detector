function getMaxOverDimensions(data) {
  let dimension;
  let probability = 0;

  if (data.angry > probability) {
    probability = data.angry;
    dimension = "angry";
  }

  if (data.disgusted > probability) {
    proability = data.disgusted;
    dimension = "disgusted";
  }

  if (data.fearful > probability) {
    probability = data.fearful;
    dimension = "fearful";
  }

  if (data.happy > probability) {
    probability = data.happy;
    dimension = "happy";
  }

  if (data.neutral > probability) {
    probability = data.neutral;
    dimension = "neutral";
  }

  if (data.sad > probability) {
    probability = data.sad;
    dimension = "sad";
  }

  if (data.surprised > probability) {
    probability = data.surprised;
    dimension = "surprised";
  }

  return { probability: probability, dimension: dimension };
}