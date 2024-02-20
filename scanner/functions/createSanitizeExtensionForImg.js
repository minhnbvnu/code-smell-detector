function createSanitizeExtensionForImg() {
  return [
    {
      type: 'lang',
      regex: /<.*?>/g,
      replace: function (match) {
        if (match.startsWith('<img')) {
          return match.replace(/on\w+="[^"]*"/gi, '');
        }
        return match;
      },
    },
  ];
}