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

/// reference: https://stackoverflow.com/questions/105034/how-do-i-create-a-guid-uuid
export function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

/// reference: https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers 
export function mapRange (number, inMin, inMax, outMin, outMax) {
  return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}