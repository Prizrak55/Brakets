export const checkObjNull = (obj: any): boolean => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === "object") {
        if (checkObjNull(obj[key])) {
          return true;
        }
      } else if (!obj[key]) {
        return true;
      }
    }
  }
  return false;
};
