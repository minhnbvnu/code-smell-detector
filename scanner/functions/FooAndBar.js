function FooAndBar() {
          const {foo} = readContext(Context, 0b001);
          const {bar} = readContext(Context, 0b010);
          return <Text text={`Foo: ${foo}, Bar: ${bar}`} />;
        }