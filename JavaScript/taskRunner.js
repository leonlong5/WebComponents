class TaskRunner {
  constructor(config) {
    this.concurrency = config.concurrency || 1;
    this.waitingList = [];
    this.counter = 0;
    this.currentQueue = [];
  }

  push(task) {
    this.waitingList.push(task);
    this.runTask();
  }

  runTask() {
    if (this.counter < this.concurrency) { //if not exceed maximum concurrency
      this.counter++;               //add counter
      if (this.waitingList.length > 0) {   //if waitingList has tasks, shift it out
        let task = this.waitingList.shift();
        let id = task.id;
        this.currentQueue.push(id);
        task.fn(function() {
          this.currentQueue.splice(this.currentQue‍‌‌‍‌‍‍‌‍‍‌‌‍‍‌‌‍‌‍ue.indexOf(id), 1);
          this.counter--;
          this.runTask();
        }.bind(this));
      }
    }
  }
}
