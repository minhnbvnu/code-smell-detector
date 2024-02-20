function buildFormDataParam (data, indentation, bodyTrim) {
  return `${indentation}"${sanitizeString(data.key, bodyTrim)}" = "${sanitizeString(data.value, bodyTrim)}"`;
}