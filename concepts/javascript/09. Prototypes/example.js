//Tạo ra 1 mẫu khởi tạo, cũng là tạo ra 1 prototype object
function Person(_age, _name){
    this.age = _age;
    this.name = _name;
 }
 var jack_person = new Person(10, "Jack");
 //Có thể thêm thuộc tính vào thuộc tính prototype của hàm khởi tạo
 Person.prototype.height = 0;
  
 //Tạo ra 1 instance của Person
 //Có cả 3 thuộc tính của mẫu khởi tạo Person

 for (var att in jack_person){
    console.log(att);
 }
  
 //Xem đối tượng prototype của instance vừa tạo
console.log( jack_person.__proto__);


