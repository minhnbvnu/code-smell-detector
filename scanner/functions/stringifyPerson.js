function stringifyPerson(person) {
  if (!person || typeof person !== 'object') {
    return person;
  }

  const parts = [];
  if (person.name) {
    parts.push(person.name);
  }

  const email = person.email || person.mail;
  if (typeof email === 'string') {
    parts.push(`<${email}>`);
  }

  const url = person.url || person.web;
  if (typeof url === 'string') {
    parts.push(`(${url})`);
  }

  return parts.join(' ');
}