1. *Destructuring* là cú pháp cho phép bạn gán nhanh các biến bằng các thuộc tính của object hoặc array.

```js
   const { name, age, sex = 'N/A' } = user;
   const [, value, func] = list;
```

2. *Spread syntax* hay còn gọi là cú pháp dấu ba chấm (three dots) là cú pháp giúp ta “phân rã” array và object thành các thuộc tính riêng biệt. Thường được áp dụng để shallow copy hay merge object.
```js
   // Copy nông – shallow copy
   const cloneUser = { ...user };
   const cloneList1 = [...list1]
   // Merge object
   const mergedUser = { ...user, ...info };
   //  shallow copy and add more element
   // Nếu user đã có ability thì nó sẽ bị ghi đè
   const userPlus = { ...user, ability: ['sing'] }
   const list4 = [...list1, 5]
```

3. *Rest Parameter* cũng áp dụng dấu ba chấm như spread syntax, ***thường*** xuất hiện ở tham số function dùng để xác định các phần tử “còn lại”. (maybe array or object value)

```js
   const handle = (a, b, ...c) => {
      return c
   }

   handle(1, 2, 3, 4, 5, 6) // [3,4,5,6]
```

```js
   // Rest + destructuring 
   const handle = ({ a, b, ...c }) => {
      return c
   }
   
   handle({ a: 1, b: 2, c: 3, d: 4, e: 5 }) // {c: 3, d: 4, e: 5
```

```js
   // Rest + destructuring (Rest must be last element)
   const { name, ...other} = cake;
```