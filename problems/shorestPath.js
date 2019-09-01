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
