function extractSubject(witResponse) {
  let entities = witResponse.entities;
  let subject = null;
  if ("subject:subject" in entities) {
    let subjectArray = entities["subject:subject"];
    let subjectObject = subjectArray[0];
    subject = subjectObject["body"];
  }
  return subject;
}