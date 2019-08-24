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

  _resolve (val) {
    if (this._status != PENDIND) return;
    this._status = FULFILLED;
    this._value = val;
  }

  _reject (err) {
    if (this._status != PENDING) return;
    this._status = REJECTED;
    this._value = err;
  }

  then (onFullfilled, onRejected) {
    const {_value, _status} = this;
    //return a new MyPromise
    return new Promise((onFulfilledNext, onRejectedNext) => {
      //fulfilled callback
      let fulfilled = value => {
        try {
            if (!isFunction(onFullfilled)) {
              onFulfilledNext(value)
            } else {
              let res = onFulfilled(value); //get user onFullfilled method returned value, could be a promise or a value
              if (res instanceof  MyPromise) {
                //if retuened new promise, we pass the callbacks util the next promise resolved/rejected
                res.then(onFulfilledNext, onRejectedNext)
              } else {
                //if returned somethingelse, pass res into onFulfilledNext
                onFulfilledNext(res)
              }
            }
        } catch (err) {
            //if error happend, new returned promise status is rejected
            onRejectedNext(err)
        }
      }
      //rejected callback
      let rejected = error => {
        try {
          if (!isFunction(onRejected)) {
            onRejectedNext(error)
          } else {
              let res = onRejected(error);
              if (res instanceof MyPromise) {
                // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
                res.then(onFulfilledNext, onRejectedNext)
              } else {
                //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
                onFulfilledNext(res)
              }
          }
        } catch (err) {
          // 如果函数执行出错，新的Promise对象的状态为失败
          onRejectedNext(err)
        }
      }

      switch (_status) {
        //while is pending, pass the callback functions into queue
        case PEDNING:
          this._fulfilledQueues.push(fulfilled);
          this._rejectedQueues.push(rejected);
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
