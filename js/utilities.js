export function rgb(r, g, b) {
  return ["rgb(", r, ",", g, ",", b, ")"].join("");
}
  
export function twoLevelCopyArr(array) {
  var newArray = [];
  for (let i = 0; i < array.length; i++) {
    newArray.push(array[i].slice());
  }
  return newArray;
}

export function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}