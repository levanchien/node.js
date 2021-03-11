1. Objects are never “nested” in our universe.
2. Pay close attention to which wire is on the left side of assignment.
3. Changing an object’s property is also called mutating that object.
4. If you mutate an object, your code will “see” that change via any wires pointing at that object. Sometimes, this may be what you want. However, mutating accidentally shared data may cause bugs.
5. Mutating the objects you’ve just created in code is safe. Broadly, how much you’ll use mutation depends on your app’s architecture. Even if you won’t use it a lot, it’s worth your time to understand how it works.
6. You can declare a variable with const instead of let. That allows you to enforce that this variable’s wire always points at the same value. But remember that const does not prevent object mutation!