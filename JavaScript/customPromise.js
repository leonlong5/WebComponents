const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
class CustomPromise {
  constructor(excutor) {
    this.status = PENDING
    this.value = undefined
    this.fulfilledQueue = []
    this.rejectedQueue = []
    try {
      excutor(this.resolve.bind(this), this.reject.bind(this))
    } catch(err) {
      this.reject(err)
    }
  }

  resolve (val) {
    this.status = FULFILLED
    this.value = val
    let cb
    while (cb = this.fulfilledQueue.shift()) {
      cb(val)
    }
  }

  reject (err) {
    this.status =REJECTED
    this.value = err
    let cb
    while (cb = this.rejectedQueue.shift()) {
      cb(err)
    }
  }

  cat‍‌‌‍‌‍‍‌‍‍‌‌‍‍‌‌‍‌‍ch (fn) {
    this.rejectedQueue.push(fn)
  }

  then (onFulfilled, onRejected) {
    switch(this.status) {
      case PENDING:
        this.fulfilledQueue.push(onFulfilled)
        this.rejectedQueue.push(onRejected)
        break
      case FULFILLED:
        onFulfilled(this.value)
        break
      case REJECTED:
        onRejected(this.value)
        break
    }
  }
}



//problem

const p = new CustomPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('Success');
  }, 500);
});

p.then(console.log); // after 500ms, print out 'Success'

p.then((response) => {
  console.log('Another ' + response);
}); // after the first Success prints, our code should immediately print 'Another Success'

const badPromise = new CustomPromise((resolve, reject) => {
  setTimeout(() => {
    reject('Error');
  }, 800);
});

badPromise.then(() => {
  throw new Error('This code should not run');
}, console.log); // after 800ms, print out 'Error'

badPromise.cat‍‌‌‍‌‍‍‌‍‍‌‌‍‍‌‌‍‌‍ch((error) => {
  console.log('Oh no ' + error);
}); // after the above prints, immediately print 'Oh no Error'
