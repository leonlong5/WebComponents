new Promise(resolve => {
  resolve(1);
  Promise.resolve().then(() => console.log(2));
}).then( t => console.log(t));

console.log(3);

//can you tell the print order of the numbers?
