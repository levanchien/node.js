####Kinds of Equality
In JavaScript, there are several kinds of equality. If you’ve been writing JavaScript for a while, you’re probably familiar with at least two of them:
* Strict Equality: a === b (triple equals).
* Loose Equality: a == b (double equals).
* Same Value Equality: Object.is(a, b).

JavaScript has several kinds of equality. They include Same Value Equality, Strict Equality, and Loose Equality.
1. Same Value Equality, or Object.is(a, b), matches the concept of the sameness of values that we introduced in the previous module.
* Understanding this kind of equality helps prevent bugs! You will often need to know when you’re dealing with the same value, and when you’re dealing with two different values.
* When we draw a diagram of values and variables, the same value cannot appear twice on it. Object.is(a, b) is true when variables a and b point to the same value on our diagram.
2. In practice, you will use Strict Equality, or a === b, more often. It is equivalent to the Same Value Equality except for two rare special cases:
* NaN === NaN is false, even though they are the same value.
* 0 === -0 and -0 === 0 is true, but they are different values.
3. You can check whether x is NaN using Number.isNaN(x).
4. Loose Equality (==) is a set of arcane rules and is often avoided.
