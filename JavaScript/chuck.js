chunk(['a', 'b', 'c', 'd'], 2);
// => [['a', 'b'], ['c', 'd']]

chunk(['a', 'b', 'c', 'd'], 3);
// => [['a', 'b', 'c'], ['d']]

function chunk(arr, numOfChunks) {
  result = [];
  temp = [];
  while (arr.length != 0) {
    temp = arr.slice(0,numOfChunks)
    result.push(temp);
    temp = []
    arr = arr.slice(numOfChunks)
  }
  return result
}
