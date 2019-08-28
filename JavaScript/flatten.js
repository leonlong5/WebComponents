nested = [[0], 1, [2,3], [4, [5, 6]]];

function flatten(arr) {
  let res = []
  for (let item of arr) {  //for each of item in array
    if (Array.isArray(item)) {  //if it is an array
      temp = flatten(item)         //recursively flatten it, return an array
      res = [...res, ...temp]   //concat it into cur res
    } else {
      res.push(item)            //if it is a value, directly push to res
    }
  }
  return res
}
console.log(flatten(nested))
