## Require trong nodejs

```bash
> const example =  require('./example');
example.js
undefined
> console.log(example);
{ message: 'hi', say: [Function (anonymous)] }
undefined
> example.say()
hi
undefined
> example.message = 'King'
'King'
> example.say()
King
undefined
> const example_new = require('./example') => cache
undefined
> example_new.say()
King
undefined
>
```
1. example.js được require một lần duy nhất, sau đó tất cả các lệnh gọi require tiếp theo sẽ chỉ lấy ra trong bộ nhớ đệm
2. require tra ve gia tri la object module.export