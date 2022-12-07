export function rgb(r, g, b) {
    return ["rgb(",r,",",g,",",b,")"].join("");
  }
  
export function twoLevelCopyArr(array) {
    var newArray = [];
    for (let i = 0; i < array.length; i++) {
      newArray.push(array[i].slice());
    }
    return newArray;
}