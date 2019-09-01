
let child = document.querySelector('.child');
let parent = document.querySelector('.parent')
//from cur node traverse up to HTML or document
while (child.tagName != 'HTML') {
  child = child.parentNode
  if (child.isEqualNode(parent)) {
    console.log('find it')
  }
}

//top down dfs serach
console.log(search(parent))
function search(node) {
    if (node.isEqualNode(child) ) {
      return true
    }
    for (let i = 0, n = node.children.length; i < n; i++) {
      console.log(node.children[i])
      if (search(node.children[i])) {
        return true
      }
    }
    return false


//bfs

console.log(bfs(parent))

function bfs(node) {
  let queue = [node];

  while (queue.length != 0) {
    let n = queue.length;
    for (let i = 0; i < n; i++) {
      let node = queue.shift();
      console.log(node)
      if (node.isEqualNode(child)){
        return true
      }
      for (let j = 0; j < node.children.length; j++){
        queue.push(node.children[j])
      }
    }
  }
  return false
}
