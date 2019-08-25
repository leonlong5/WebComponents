const isFunction = variable => typeof variable === 'function';
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class MyPromise {
  constructor (handle) {
    if (!isFunction(handle)) {
      throw new Error('Not a function')
    }
    this._status = PENDING;
    this._value = undefined;
    // 添加成功回调函数队列
    this._fulfilledQueues = []
    // 添加失败回调函数队列
    this._rejectedQueues = []
    // 执行handle
    try {
      handle(this._resolve.bind(this), this._reject.bind(this))
    } catch (err) {
      this._reject(err)
    }
  }

  //when async call resolved or rejected, we popout the callbacks passed with then methods to excute
  _resolve (val) {
    if (this._status != PENDING) return;
    const run = () => {
        this._status = FULFILLED;
        this._value = val;
        let cd;
        while (cb = this._fulfilledQueues.shift()) {
          cb(val)
        }
    }
    //call it async
    setTimeout(()=> run(), 0)
  }

  _reject (err) {
    if (this._status != PENDING) return;
    const run = () => {
      this._status =REJECTED;
      this._value = err
      let cb;
      while (cb = this._rejectedQueues.shift()) {
        cb(err)
      }
    }
  }

  then (onFulfilled, onRejected) {
    const {_value, _status} = this;
    //return a new MyPromise
    return new Promise((resolveNext, rejectedNext) => {
      //fulfilled callback
      let fulfilled = value => {
        try {
            if (!isFunction(onFulfilled)) {
              resolveNext(value)
            } else {
              let res = onFulfilled(value); //get user onFullfilled method returned value, could be a promise or a value
              if (res instanceof  MyPromise) {
                //if retuened new promise, we pass the callbacks util the next promise resolved/rejected
                res.then(resolveNext, rejectedNext)
              } else {
                //if returned somethingelse, pass res into resolveNext
                resolveNext(res)
              }
            }
        } catch (err) {
            //if error happend, new returned promise status is rejected
            rejectedNext(err)
        }
      }
      //rejected callback
      let rejected = error => {
        try {
          if (!isFunction(onRejected)) {
            rejectedNext(error)
          } else {
              let res = onRejected(error);
              if (res instanceof MyPromise) {
                // if cur callback returned a new promise, we pass the resolve of promise to it
                res.then(resolveNext, rejectedNext)
              } else {
                onFulfilledNext(res)
              }
          }
        } catch (err) {
          // if any error, cal reject
          rejectedNext(err)
        }
      }

      switch (_status) {
        //while is pending, pass the callback functions into queue
        case PENDING :
          this._fulfilledQueues.push(fulfilled);
          this._rejectedQueues.push(rejected);

          console.log('pending', this._fulfilledQueues)
          break;
        case FULFILLED:
          fulfilled(_value);
          break;
        case REJECTED:
          rejected(_value)
          break;
      }
    })
  }
}

let promise1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(123)
  }, 1000)
})
promise2 = promise1.then(res => {
  // 返回一个普通值
  console.log(res)
  return 'return a value'
  return new Promise((resolve, reject) => {
    setTimeout(() => {
     resolve('这里返回一个Promise')
    }, 2000)
  })
})
promise2.then(res => {
  console.log(res) //1秒后打印出：这里返回一个普通值
})
