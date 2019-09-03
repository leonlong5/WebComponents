//html <ul id='posts'></ul>
//css
// #posts {
//   /* We need to limit the height and show a scrollbar */
//   width: 200px;
//   height: 300px;
//   overflow: auto;
//
//   /* Optional, only to check that it works with margin/padding */
//   margin: 30px;
//   padding: 20px;
//   border: 10px solid white;
// }
// li {
//   padding: 10px;
//   list-style-type: none;
// }
// li:hover {
//   background: #ccc;
// }

var listElm = document.querySelector('#posts');
var nextItem = 1;
function loadMore() {
  let frag = document.createDocumentFragment();
  for (let i = 0; i < 10; i++) {
    let item = document.createElement('li')
    item.innerText = 'Item ' + nextItem++
    frag.appendChild(item)
  }
  listElm.appendChild(frag)
}




//when scroll to the bottom of ul, we load 10 more items to the list
listElm.addEventListener('scroll', throttle(callback))

loadMore();

//throttle function limit loadMore every 1 seconds
function throttle(fn) {
  let canRun = true;
  return function () {
    if (!canRun) {
      return
    }

    canRun = false;
    setTimeout(()=>{
      fn.apply(this)
      canRun = true;
    }, 1000)
  }
}

function callback(){
  if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
    loadMore();
  }
 }

 //The Element.scrollTop property gets or sets the number of pixels that an element's content is scrolled vertically.
 // scrollHeight: ENTIRE  content & padding (visible or not)
 // Height of all content + paddings, despite of height of the element.

 // clientHeight: VISIBLE content & padding
 // Only visible height: content portion limited by explicitly defined height of the element.

 // offsetHeight: VISIBLE content & padding + border + scrollbar
 // Height occupied by the element on document.
