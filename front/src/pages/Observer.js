// Observer.js
class Observer {
    constructor() {
      this.observers = [];
    }
  
    subscribe(fn) {
      this.observers.push(fn);
    }
  
    unsubscribe(fnToRemove) {
      this.observers = this.observers.filter(fn => fn !== fnToRemove);
    }
  
    notify(data) {
      this.observers.forEach(fn => fn(data));
    }
  }
  
  export default Observer;
  