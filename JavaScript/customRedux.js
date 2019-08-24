const createStore = function(initState) {
  let state = initState;
  let listeners = [];

  function subscribe(listener) {
    listeners.push(listener)
  }

  function getState() {
    return state;
  }

  //dispatch an action to store, get new state and notify subscribers
  function dispatch(action) {
    state = reducer(state, action);
    for (var i = 0; i < listeners.length; i++) {
      listeners[i]();
    }
  }

  //pure function, take a state, return a new state
  function reducer(state, action) {
      switch(action.type) {
        case 'INCREMENT':
          return {
            ...this.state,
            count: state.count+1
          }
        case 'DECREMENT':
          return {
            ...store.state,
            count: state.count-1
          }
        default:
        return state;
      }
  }

  return {
    subscribe,
    dispatch,
    getState
  }
}

let initState = {
  count : 0
}

let store = createStore(initState);

store.subscribe(()=>{
  let state = store.getState();
  console.log(state);
});

store.dispatch({
  type : 'INCREMENT'
})
//1
store.dispatch({
  type: 'DECREMENT'
})
//0
//change whatever
store.dispatch({
  count: 'abc'
})
//0
