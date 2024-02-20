function __embind_register_value_array(rawType, name, constructorSignature, rawConstructor, destructorSignature, rawDestructor) {
          tupleRegistrations[rawType] = { name: readLatin1String(name), rawConstructor: embind__requireFunction(constructorSignature, rawConstructor), rawDestructor: embind__requireFunction(destructorSignature, rawDestructor), elements: [] };
        }