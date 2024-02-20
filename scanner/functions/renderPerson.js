function renderPerson(person) {
  const result = [];
  result.push(`<p>${person.name}</p>`);
  result.push(emitPhotoData(person.photo));
  return result.join('\n');
}