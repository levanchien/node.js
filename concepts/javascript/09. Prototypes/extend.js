//Tạo ra 1 hàm khởi tạo cơ sở
function Animal(_age){
    this.age = _age;
 }
  
 //Có thể thêm thuộc tính vào thuộc tính prototype của hàm khởi tạo
//  Animal.prototype.showAge = function(){
//     console.log( this.age );
//  };
  
 //Tạo ra 1 hàm khởi tạo con (sẽ dùng để kế thừa hàm cơ sở)
 function Dog(_color){
    this.color = _color;
 }
//  //Thực hiện kế thừa, gán hàm khởi tạo của Animal cho prototype của Dog
 Dog.prototype = new Animal();
 Dog.prototype.showColor = function(){
    console.log( this.color );
 };
  
//  //Kiểm tra sự kế thừa
 var chophuquoc = new Dog('yellow');
//  chophuquoc.age = 3;
//  chophuquoc.showAge();       //3
//  chophuquoc.showColor();     //yellow

console.log('Animal.prototype: ', Animal.prototype) // show thong tin cua ham cha
console.log('Dog.prototype: ', Dog.prototype) // show thong tin cua ham cha -> Animal
console.log(chophuquoc.__proto__) // => tro den instance (doi tuong) duoc tao ra
chophuquoc.__proto__.DMM = 'JS'; // them thuoc tinh
chophuquoc.__proto__.VL = function() { // them function vao prototype
    console.log(this);
}
chophuquoc.VL();
chophuquoc.__proto__ = null;
console.log(chophuquoc.__proto__)
console.log(chophuquoc);