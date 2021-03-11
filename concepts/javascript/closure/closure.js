debugger;

const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

const addCofficient = (val) => multiply(val, 1.8);
const addConst = (val) => add(val, 32);

const convertCtoF = (val) => {
  let result = val;
  result = addCofficient(result);
  result = addConst(result);
  return result;
};

convertCtoF(100);

var moar = foo(5); // Closure  
console.log(moar(15));
