function UpdateCount({setCount, count, children}) {
        if (count < 3) {
          setCount(c => c + 1);
        }
        return <span>{children}</span>;
      }