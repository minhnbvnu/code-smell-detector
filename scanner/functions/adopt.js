function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }