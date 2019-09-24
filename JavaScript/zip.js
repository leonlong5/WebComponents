zip(['a', 'b'], [1, 2], [true, false]);
// => [['a', 1, true], ['b', 2, false]]


function zip () {
  let arrays = Array.from(arguments);
  let result = [];
  let n = arrays.length;
  let m = arrays[0].length;


  for (let j = 0; j < m; j++){
    let temp = []
    for (let i = 0; i < n; i++) {
      temp.push(arrays[i][j])
    }
    result.push(temp);
  }
  return result;
}
