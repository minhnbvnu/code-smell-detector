function viewerFaceDataStruct(frame = null, l = null, x = null) {
  this.frame = frame;
  this.landmarks = null;
  this.neutral = null;
  this.happy = null;
  this.sad = null;
  this.angry = null;
  this.fearful = null;
  this.disgusted = null;
  this.surprised = null;

  if (l) {
    this.landmarks = new Array();
    this.length = l.length;

    for (let i = 0; i < this.length; i += 1) {
      const landmark = l[i];
      this.landmarks.push([landmark[0], landmark[1]]);
    }
  }

  if (x) {
    this.neutral = x["neutral"];
    this.happy = x["happy"];
    this.sad = x["sad"];
    this.angry = x["angry"];
    this.fearful = x["fearful"];
    this.disgusted = x["disgusted"];
    this.surprised = x["surprised"];
  }
}