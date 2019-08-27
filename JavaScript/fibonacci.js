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
