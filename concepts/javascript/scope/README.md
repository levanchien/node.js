1. Scope
   + Trong JS, scope đề cập đến ngữ cảnh hiện tại trong code của bạn.
   + Phạm vi xác định khả năng truy cập của các biến, đối tượng và chức năng từ các phần khác nhau của code.
   + Mỗi function nó tạo ra một scope
2. Global Scope
   + Phạm vi nằm bên ngoài function
   + Một biến được khai báo bên ngoài một hàm, sẽ trở thành GLOBAL.
   + Một biến toàn cục có global scope: Tất cả các tập lệnh và function trên một trang web đều có thể truy cập nó.
3. Local Scope
   + Phạm vi nằm bên trong function
   + Các biến được khai báo trong một hàm gọi là biến cục bộ
   + Các biến cục bộ có ```Function Sope```: Chúng chỉ có thể được truy cập từ bên trong hàm.
4. Function Scope
   + Các biến cục bộ có ```Function Sope```: Chúng chỉ có thể được truy cập từ bên trong hàm.
5. Lexical Scope
   + Các function được định nghĩa trong một function khác tạo ra lexical scope
   + Các biến được khai báo trong function cha có thể được sử dụng trong function con (theo kiểu tham chiếu), nhưng không ngược lại
6. Block scope
   + Mỗi khối ```{ //inside block }``` tạo ra block scope.
   + Khai báo biến ```var``` không bị ảnh hưởng bởi block scope.
7. Scope Chain
   + Scope con nó có thể truy cập vào các scope cha
   + Js sẽ bắt đầu tìm các biến từ scope con lên cha
8. Closures
   + A closure is a function having access to the parent scope, even after the parent function has closed.
   + Một ```closure``` là một function có quyền truy cập vào scope cha kể cả khi function cha đã đóng.
   + ```js
      var add = (function () {
      var counter = 0;
      return function () {counter += 1; return counter}
      })();

      add(); // 1
      add(); // 2
      add(); // 3
   ```
9. Scope và this
   + This thay đổi theo scope (scope nơi diễn ra sự thực thi)
   + ```js
      var nav = document.querySelector('.nav'); // <nav class="nav">
      var toggleNav = function () {
      console.log(this); // <nav> element
      setTimeout(function () {
         // new scope
         console.log(this); // [object Window]
      }, 1000);
      };
      nav.addEventListener('click', toggleNav, false);```

   + Default Binding: this tham chiếu tới global object
   + Implicit Binding: this tham chiếu tới object ngữ cảnh
   + Explicit Binding: Cha mẹ đặt đâu, con ngồi đấy
   +  Explicit Binding > Implicit Binding > Default Binding
   + Refers: [link](https://viblo.asia/p/ban-ve-js-lam-the-nao-de-xac-dinh-this-GrLZDb1O5k0)
10. Hoisting
  +  Hoisting là hành động mặc định của Javascript, nó sẽ chuyển phần khai báo lên phía trên top Trong Javascript, vì vậy một biến (variable) có thể được khai báo sau khi được sử dụng

  + ```javascript
      #Ex5
      console.log(a);
      var a = 'Hello Hoisting'
      #Output = ???
      // After Hoisting
      var a;
      console.log(a);
      a = 'Hello Hoisting';

      => undefined
      ```

11. var, let, const
   + Cả 3 đều là [hoisted](https://viblo.asia/p/hoisting-javascript-WAyK8RmmlxX). Tuy nhiên ```var``` được khởi tạo với giá trị undefined. Còn ```let``` và ```const``` thì không.
   + var không bị ràng buộc bới ```block scope```
   + ```let``` tương tự ```var``` nhưng nó có ```block scope```
   + tương tự let nhưng không thể tái gán lại một giá trị mới cho biến ```const```
