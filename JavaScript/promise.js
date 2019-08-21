

// Promise constructor is a function called executor，after executor function finished，it will call resolve/reject
var promise = new Promise(function(resolve, reject) {
  /*
    if succuess, call resolve
    if fail, call reject
  */
})

function Promise(executor) {
  var self = this;
  self.status = 'pending'; //promise status
  self.data = undefined;   //promise value
  self.onResolvedCallback = []
  self.onRejectedCallback = []

  function resolve(value) {
    if (self.status == 'pending') {
      self.status = 'resolved';
      self.data = value
      for (var i = 0; i < self.onResolvedCallback.length; i++) {
        self.onRejectedCallback[i](value)
      }
    }
  }

  function reject(reason) {
    if (self.status === 'pending') {
      self.status = 'rejected'
      self.data = reason
      for(var i = 0; i < self.onRejectedCallback.length; i++) {
        self.onRejectedCallback[i](reason)
      }
    }
  }

  try {
    excutor(resolve, reject)  //run excutor and pass arguments
  } catch(e) {
    reject(e)
  }
}

//then method take two parameters, which are two callback functions onResolved, onRejectted
Promise.prototype.then = function(onResolved, onRejectted) {
  var self = this;
  var promise2;

  //when parameters passed in then method is not a function
  onResolved = typeof onResolved === 'function' ? onResolved : function(v) {}
  onRejected = typeof onRejected === 'function' ? onRejected : function(r) {}

  if (self.status === 'resolved') {
    //if promise1 status is resolved, we call onResolved
    //it might throw an error, so we wrap into try/catch block
    return promise2 = new Promise(function(resolve, reject){
      try {
        var x = onResolved(self.data)
        if (x instanceof Promise) { // if onResolved returned a new Promise object，use its result as promise2's result
          x.then(resolve, reject)
        }
        resolve(x) // otherwise use its returned value
      } catch (e) {
        reject(e) // if error
      }
    })
  }

  if (self.status === 'rejected') {
    return promise2 = new Promise(function(resolve, reject) {
      try {
       var x = onRejected(self.data)
       if (x instanceof Promise) {
         x.then(resolve, reject)
       }
     } catch (e) {
       reject(e)
     }
    })
  }

  if (self.status === 'pending') {
    return promise2 = new Promise(function(resolve, reject) {
      self.onResolvedCallback.push(function(value) {
        try {
          var x = onResolved(self.data)
          if (x instanceof Promise) {
            x.then(resolve, reject)
          }
        } catch (e) {
          reject(e)
        }
      })

      self.onRejectedCallback.push(function(reason) {
        try {
          var x = onRejected(self.data)
          if (x instanceof Promise) {
            x.then(resolve, reject)
          }
        } catch (e) {
          reject(e)
        }
      })
    })
  }
}
