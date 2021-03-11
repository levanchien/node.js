/* 
[Just JavaScript] 03. Values and Variables

let reaction = 'yikes';
reaction[0] = 'l';
console.log(reaction); => yikes

👉 All Primitive Values Are Immutable

===============================================

1. Primitive values are immutable. There’s nothing we can do in our code to affect them or change them in any way. They stay what they are. For example, we can’t set a property on a string value because it is a primitive value. Arrays are not primitive, so we can set their properties.

2. Variables are not values. Each variable points to a particular value. We can change which value it points to by using the = assignment operator.

3. Variables are like wires. A “wire” is not a JavaScript concept — but it helps us imagine how variables point to values. There’s also a different kind of “wire” that’s not a variable, but we haven’t discussed it yet.

4. Look out for contradictions. If two things that you learned seem to contradict each other, don’t get discouraged. Usually it’s a sign that there’s a deeper truth lurking underneath.

5. Nouns and verbs matter. We’re building a mental model so that we can be confident in what can or cannot happen in our universe. It’s fine to be sloppy in casual speech, but our thinking needs to be precise.

*/