let matrix = [[0, 0, 1, 0],
              [0, 0, 1, 0],
              [0, 0, 1, 0],
              [1, 0, 0, 0]];

//give two cordinates [x1, y1], [x2, y2], find the shorest distance between them
//0 is empty room, 1 is wall

function shorestDis(x1, y1, x2, y2) {
  let queue = [[x1, x2, 0]];
  let visited = {};  //use a visited map to keep tracking of visited coordinates
  while (queue.length != 0) {
    let n = queue.length;
    //console.log(queue)
    for (let i = 0; i < n; i++) {
      let [x, y, dis] = queue.shift();
      visited[x.toString()+y.toString()] = true
      if (x == x2 && y == y2){
        return dis
      }

      for (let dir of [[0,1],[1,0],[-1,0],[0,-1]]){

        let newX = x + dir[0];
        let newY = y + dir[1];
        let key = newX.toString()+newY.toString()
        if (0 <= newX && newX < matrix.length && 0 <= newY && newY < matrix[0].length && matrix[newX][newY] != 1 && !(key in visited)){
          visited[key] = true;
          let nextDis = dis+1
          //console.log(newX +' '+ newY + ' ' + nextDis)
          queue.push([newX, newY, nextDis])
        }
      }
    }
  }
  return -1;
}


console.log(shorestDis(0,0,0,3))

console.log(shorestDis(1,1,1,3))




//find all points within x radius
let Map = [ [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]];
function findAllPoints(radius, x, y) {
    let queue = [[x, y, 0]];
    let visited = {};
    let res = [];
    while (queue.length != 0) {
      let n = queue.length;

      for (let i = 0; i < n; i++) {
        let [x1, y1, dis] = queue.shift();
        visited[x1.toString()+y1.toString()] = true
        if (dis >= radius) {
          return res;
        }


        for (let dir of [[0,1], [0, -1], [1, 0], [-1, 0]]){
          let newX = x1 + dir[0]
          let newY = y1 + dir[1]
          let key = newX.toString()+newY.toString();
          let n = Map.length;
          let m = Map[0].length;
          if (0 <= newX && newX < n && 0 <= newY && newY < m && !(key in visited)){
            res.push(key)
            visited[key] = true
            queue.push([newX, newY, dis+1])
          }
        }
      }
    }
    return res
}

console.log(findAllPoints(1, 1, 1))
