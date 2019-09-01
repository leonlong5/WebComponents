// 1. fib function with memo
const memoFib = function() {
  let memo = {}
  return function fib(n) {
    if (n in memo) { return memo[n] }
    else {
      if (n <= 1) { memo[n] = n }
      else { memo[n] = fib(n - 1) + fib(n - 2) }
      return memo[n]
    }
  }
 }
 console.log('meno:')
 console.log(memoFib()(10))



 //2. with memo as arguments
 function fibonacci(num, memo) {
   memo = memo || {};

   if (memo[num]) return memo[num];
   if (num <= 1) return num;

   return memo[num] = fibonacci(num - 1, memo) + fibonacci(num - 2, memo);
 }
 console.log(fibonacci(10))



//3. cache function excution
function memoize(fn) {
    // todo
    var cache={};

    return function(arg){
        if (cache[arg]){
           return cache[arg];
        }
        else{
           cache[arg] = fn(arg);
            return cache[arg];
        }
    }
}


function fib(n) {
    // fibonacci
    if (n <= 1) {return n}
    return fib(n-1) + fib(n-2)
}
let n = 10;
var memoizedFib = memoize(fib);
console.log(memoizedFib(n))
