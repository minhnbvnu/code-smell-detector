function errorToString(err) {
   if (isUndefined(err)) {
      return undefined;
   } else if (err.toString().length > maxStatusDetailLength) {
      return err.toString().substring(0, maxStatusDetailLength - 3) + '...';
   } else {
      return err.toString();
   }
}