//1. find the maximum sum of the subarry
//2. find the start and end index
let arr = [-2,1,-3,4,-1,2,1,-5,4];

curSum = arr[0];
let start = 0;
let end = 0;
let maxSum = 0;
for (let i = 1; i < arr.length; i++) {
  if (arr[i] + curSum >= arr[i]) {
    curSum += arr[i];
    if (maxSum < curSum) {
      end = i;
    }
    maxSum = Math.max(maxSum, curSum)

  } else {
    curSum = arr[i]
    start = i;
  }
}

console.log('current sum: ' + curSum);
console.log('max sum: '+maxSum);

console.log('start: ' + start, 'end: ' + end)
