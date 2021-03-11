* Properties are wires — a bit like variables. They both point at values. Unlike variables, properties start from objects in our universe.
* Properties have names. Properties belong to particular objects. You can’t have more than one property with the same name on an object.
* Generally, you can perform an assignment in three steps:
  1. Figure out which wire is on the left.
  2. Figure out which value is on the right.
  3. Point that wire to that value.
* An expression like obj.property is calculated in three steps:
  1. Figure out which value is on the left.
  2. If it’s null or undefined, throw an error.
  3. If that property exists, the result is the value its wire points to.
  4. If that property doesn’t exist, the result is undefined.