function postProcessProtobuf(msg, pbType) {
  const type = pbType || msg.$type;

  if (msg && type && type.fields) {
    const fields = type.fields;

    for (const fieldName in fields) {
      const field = fields[fieldName];

      if (field && msg[field.name]) {
        if (!field.resolvedType && field.repeated && msg[field.name].length === 0) {
          // Remove empty arrays that are likely the default value
          msg[field.name] = undefined;
          delete msg[field.name];
        } else if (field.resolvedType) {
          // Handle integer enum to string change
          if (field.resolvedType instanceof Enum) {
            if (field.repeated) {
              if (msg[field.name].length === 0) {
                // Remove empty arrays that are likely the default value
                msg[field.name] = undefined;
                delete msg[field.name];
              } else {
                // Map array of enums to strings using reflection information
                msg[field.name] = msg[field.name].map(
                  entry => field.resolvedType.valuesById[entry]
                );
              }
            } else {
              // Map enums to strings using reflection information
              msg[field.name] = field.resolvedType.valuesById[msg[field.name]];
            }
          } else if (field instanceof MapField) {
            // Recursive processing on key,value field
            for (const key of Object.keys(msg[field.name])) {
              msg[field.name][key] = postProcessProtobuf(msg[field.name][key], field.resolvedType);
            }
          } else if (field.resolvedType instanceof Type) {
            // Recursive processing on fields of an object
            if (field.repeated) {
              if (msg[field.name].length === 0) {
                msg[field.name] = undefined;
                delete msg[field.name];
              } else {
                msg[field.name] = msg[field.name].map(entry =>
                  postProcessProtobuf(entry, field.resolvedType)
                );
              }
            } else {
              msg[field.name] = postProcessProtobuf(msg[field.name], field.resolvedType);
            }
          }
        }
      }
    }
  }
  return msg;
}