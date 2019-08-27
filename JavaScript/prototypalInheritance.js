// Vehicle - parent
function Vehicle(name) {
  this.name = name;
}
// parent method
Vehicle.prototype.start = function() {
  return "Engine of " + this.name + " starting…";
};

// Car - child
function Car(name) {
  Vehicle.call(this, name); // call super constructor.
}
// child extends parent
Car.prototype = Object.create(Vehicle.prototype);
// child method
Car.prototype.start = function() {
  console.log("Gidday! " + Vehicle.prototype.start.call(this));
};

// instances of child
var c1 = new Car("Infiniti G37");

// accessing the child method which internally access parent method
c1.start(); // outputs: "Gidday! Engine of Infiniti G37 starting…"
