function recursiveSearch(obj, key, val) {
  var result = null;
  if (obj instanceof Array) {
    for (var i = 0; i < obj.length; i++) {
      result = recursiveSearch(obj[i], key, val);
      if (result) {
        break;
      }
    }
  } else {
    for (var prop in obj) {
      if (prop === key) {
        if (obj[prop] === val) {
          return obj;
        }
      }
      if (obj[prop] instanceof Object || obj[prop] instanceof Array) {
        result = recursiveSearch(obj[prop], key, val);
        if (result) {
          break;
        }
      }
    }
  }
  return result;
}
export function getObject(obj, key, val) {
  return recursiveSearch(obj, key, val);
}
