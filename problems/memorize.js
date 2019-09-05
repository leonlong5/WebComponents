
console.log('version 1 starts here ------------------->')
//version 1
function memorize(f) {
  let cache = {};
  return function () {
    //we use arguments length and the arguments as key
    var key = arguments.length + Array.prototype.join.call(arguments, ',')

    if (key in cache) {
      console.log('Form the cache')
      return cache[key]
    } else {
      //if not found, we excute function to get the results, then store it to cache
      console.log('From the function')
      return cache[key] = f.apply(this, arguments)
    }
  }
}

var add = function(a, b, c) {
  return a + b + c
}

var memoizedAdd = memorize(add)

memoizedAdd(1, 2, 3)//6
memoizedAdd(1, 2, 3)//6







console.log('                                                        ')
console.log('                                                        ')
console.log('version 2 starts here ------------------->')
//version 2
var propValue = function(obj){
    return obj.value
}
var memoizedAdd = memorize(propValue)
//if the argument is an object, it will convert to '[Object object]', so we got 1, 1
memoizedAdd({value: 1}) // 1
memoizedAdd({value: 2}) // 1


//we can introduce Map here, Map can use object as key
let john = { name: "John" };
let visitsCountMap = new Map();
visitsCountMap.set(john, 'this is an object key');
console.log(visitsCountMap.get(john))


console.log('                                               ')
console.log('                                               ')
console.log('                                               ')
function memorize2(func, resolver){
  var memoize = function(key) {
    let address = resolver? resolver.apply(this, arguments): key
    console.log(address)

    if (!memoize.cache[address]) {
      console.log('from the function')
      memoize.cache[address] = func.apply(this, arguments)
    }

    return memoize[address]
  }
  memoize.cache = new Map()
  return memoize
}

// method 1, create a resolver function to serialize the arguments to a string
var memoizedAdd2 = memorize2(add, function(){
    var args = Array.prototype.slice.call(arguments)
    return JSON.stringify(args)
})

memoizedAdd2(1,2,3) //'[1,2,3]'   'from the function'

// method 2, take advantage of Map
var memoizedAdd3 = memorize2(propValue)
memoizedAdd3({value: 1})//1 from function
memoizedAdd3({value: 1})//1 from cache
