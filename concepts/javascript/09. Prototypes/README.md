Prototype là cơ chế mà các object trong javascript kế thừa các tính năng từ một object khác.
Nó là nguyên mẫu của các đối tượng được xây dựng bởi chức năng đó

Class.prototype tro den ham khoi tao cua nguyen mau (class cha dai khai the)
```js
    Animal.prototype.showAge = function(){
        console.log( this.age );
    }
;
```

1. When reading obj.prop, if obj doesn’t have a prop property, JavaScript will look for obj.__proto__.prop, then it will look for obj.__proto__.__proto__.prop, and so on, until it either finds our property or reaches the end of the prototype chain.
2. When writing to obj.prop, JavaScript will usually write to the object directly instead of traversing the prototype chain.
3. We can use obj.hasOwnProperty('prop') to determine whether our object has an own property called prop. In other words, it means there is a property wire called prop attached to that object directly.
4. We can “pollute” a prototype shared by many objects by mutating it. We can even do this to the Object Prototype — the default prototype for {} objects! But we shouldn’t do that unless we’re pranking our colleagues.
5. You probably won’t use prototypes much directly in practice. However, they are fundamental to how JavaScript objects work, so it is handy to understand their underlying mechanics. Some advanced JavaScript features, including classes, can be expressed in terms of prototypes.