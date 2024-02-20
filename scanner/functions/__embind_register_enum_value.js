function __embind_register_enum_value(rawEnumType, name, enumValue) {
          var enumType = requireRegisteredType(rawEnumType, "enum");
          name = readLatin1String(name);
          var Enum = enumType.constructor;
          var Value = Object.create(enumType.constructor.prototype, { value: { value: enumValue }, constructor: { value: createNamedFunction(enumType.name + "_" + name, function() {
          }) } });
          Enum.values[enumValue] = Value;
          Enum[name] = Value;
        }