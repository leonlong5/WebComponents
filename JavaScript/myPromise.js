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
    const { _value, _status} = this;
    switch (_status) {
      case PENDIND:
        this._fullfilledQueues.push(onFullfilled);
        this._rejectedQueues.push(onRejected);
        break
      case FULFILLED:
        onFullfilled(_value)
        break
      case REJECTED:
        break
    }
    return new MyPromise((onFullfilledNext, onRejectedNext)=>{
      
    })
  }
}
