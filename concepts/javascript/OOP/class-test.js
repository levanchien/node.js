class Car {
    constructor(name) {
        this.name = name;
    }

    run() {
        console.log('run');
    }
}

const car1 = new Car('Mers');
const car2 = new Car('Mers');


console.log(car1 === car2);

// thay doi prototype thong qua __proto__
// __proto__ tro den prototype
// newObject.__proto__ === Object.prototype
car1.__proto__.fill = function fill(params) {
    console.log('fill');
}

// only object car1
car1.refill = function refill() {
    console.log(`${this.name} refill`);
}

car1.run();

Car.prototype.stop = function stop() {
    console.log('stop !');
}

car1.stop();

car2.run();
car2.fill();
car1.refill();
car2.refill(); // Error

console.log(car1.__proto__ === car2.__proto__); // true
console.log(car1.__proto__ === Car.prototype); // true
