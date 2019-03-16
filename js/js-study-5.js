class Animal {
    speak() {
        return this;
    }

    static eat() {
        return this;
    }
}

/* let obj = new Animal();
console.log(obj.speak()) ;
let speak = obj.speak;
console.log(speak());

console.log(Animal.eat());
let eat = Animal.eat;
console.log(eat()); */

/* function foo() {};
let f1 = new foo();

console.log(f1);
console.log(foo);

console.log(f1.__proto__ === foo.prototype); */

/* var state = {
  history: [{
    squares: Array(9).fill(null),
  }],
  setp: 0,
  isTrue: true,
} */

window.onload = function() {
  var a = document.getElementsByTagName("a")[0];

  console.log(a);

  //获取a的父节点
  var parentA = a.parentNode;

  var parentAParent = a.parentNode.parentNode;

  console.log(parentA);
  console.log(parentAParent);
}


