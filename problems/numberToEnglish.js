function numberToWrods(num) {
  if (num == 0) {
    return 'Zero'
  }

  let to19 = ' One Two Three Four Five Six Seven Eight Nine Ten Eleven Twelve Thirteen Fourteen Fifteen Sixteen Seventeen Eighteen Nineteen'.split(' ')
  let tens = '_ _ Twenty Thirty Forty Fifty Sixty Seventy Eighty Ninety'.split(" ");

  function words(n) {
      if (n < 20) {
        return [to19[n]]
      }
      //tens
      if (n < 100) {
        return [[tens[Math.floor(n/10)]] , ...words(n%10)]
      }
      //hundrens
      if (n < 1000) {
        return [ [to19[Math.floor(n/100)]], 'Hundrend', ...words(n%100) ]
      }
      //thousands
      if (n < 1000**2) {
        return [ ...words(Math.floor(n/1000)), 'Thounsand', ...words(n%1000)]
      }
      //millopns
      if (n < 1000**3) {
        return [ ...words(Math.floor(n/1000**2)), 'Million', ...words(n%1000**2)]
      }
      //billions
      if (n < 1000**4) {
        return [ words(Math.floor(n/1000**3)), 'Billion', ...words(n%1000**3)]
      }
  }
  let res = words(num).join(' ')
  console.log(res)
  return res
}

out = numberToWrods(7);
out = numberToWrods(15);
out = numberToWrods(76);
out = numberToWrods(123);
out = numberToWrods(2548);
out = numberToWrods(12345678);
out = numberToWrods(1234567890);
