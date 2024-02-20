function CapitalizedText(props) {
          const [text, setText] = useState(props.text);
          const [count, setCount] = useState(0);
          const capitalizedText = useMemo(
            () => {
              yieldValue(`Capitalize '${text}'`);
              return text.toUpperCase();
            },
            [text],
          );

          yieldValue(count);

          if (count < 3) {
            setCount(count + 1);
          }

          if (text === 'hello' && count === 2) {
            setText('hello, world.');
          }
          return <Text text={capitalizedText} />;
        }