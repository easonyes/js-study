// //求一组数中的最大值和最小值，以及所在位置
            
//             //1.用户输入数组长度
//             var arr = [], maxValue, minValue, maxIndex, minIndex, n;
//             n = +prompt('请输入数组长度：');
//             if (n <= 0) {
//                 n = +prompt('请重新输入数组长度');
//             }
//             arr.length = n;

//             //2.用户输入数组内容
//             for (var i = 0; i < arr.length; i++) {
//                 arr[i] = +prompt('请输入第' + (i + 1) + '个数：');
//             }

//             //3.打印数组
//             console.log(arr);

//             //找到最大及最小值和他们的位置并打印
//             maxValue = minValue = arr[0];
//             maxIndex = minIndex = 0;
//             // console.log(max);
//             // console.log(min);
//             for (var j = 1; j < arr.length; j++) {
//                 if (maxValue < arr[j]){
//                     maxValue = arr[j];
//                     maxIndex = j;
//                 }
//                 if (minValue > arr[j]){
//                     minValue = arr[j];
//                     minIndex = j;
//                 }
//                 // max = max > arr[j] ? max : arr[j];
//                 // min = min < arr[j] ? min : arr[j];
//             }
//             console.log('最大值为：' + maxValue + '  最大值的位置是：' + maxIndex);
//             console.log('最小值为：' + minValue + '  最小值的位置是：' + minIndex);
    // function feibo(n) {
    //     if (n === 1 || n === 2) {
    //         return 1;
    //     }

    //     return feibo(n - 1) + feibo(n - 2);
    // };

    // console.log(feibo(6));
    // function add(n) {
    //     if (n === 1) return 1;

    //     return add(n - 1) + n;
    // };

    // console.log(add(100));

    //对象
    //  var p = {
    //     name: '小七',
    //     age: 20,
    //     sex: '女',
    //     love: function(){
    //         console.log('loveme');
    //     }
    //  };

    //  p.love();
    //  console.log(typeof p);

    // function Dog(option) {
    //     this.name = option.name;
    //     this.age = option.age;
    //     this.dogFriends = option.dogFriends;

    //     this.eat = function (something) {
    //         console.log(this.name + "在吃" + something);
    //     };

    //     this.run = function(somewhere) {
    //         console.log(this.name + "在" +somewhere + "跑");
    //     };
    // };

    // var smallDog = new Dog({name:"豆包", age:1});

    // console.log(smallDog.name);

    // smallDog.name = "桥豆";
    // console.log(smallDog.name);
    // smallDog.eat("milk", "hot dog");

    //var arr = new Array();
    // //给数组添加一个方法
    // arr.eat = function() {
    //     alert("数组会吃dongx");
    // };

    // arr.eat();

    // var arr1 = new Array();
    // arr1.eat();

    //var arr = new Array();

    // Array.prototype.eat = function (){
    //     alert("吃");
    // };

    // var arr = new Array();
    // arr.eat();
    // console.log(arr.constructor);

    // function Cat(option) {

    // };

    // Cat.prototype = {
    //     eat: function (something) {
    //         console.log("吃" + something);
    //     }
    // };

    // var cat = new Cat();
    // cat.eat("fish");
    var arr = [2, 4, 3, 2, 5, 1];
    console.log(arr);

// //1. sort
//     console.log(arr.sort());
//     console.log(arr.sort(function (a, b){
//         return b - a;
//     }));

    console.log(arr.slice(1));
    console.log(arr.slice(1, 4));

    //console.log(arr.splice(0, 2));
    // var i = arr.length, j, x;
    // while(i > 0) {
    //     for (j = 0; j < i; j++) {
    //         if(arr[j] < arr[j + 1]){
    //             x = arr[j];
    //             arr[j] = arr[j + 1];
    //             arr[j + 1] = x;
    //         }
    //     }
    //     i--;
    // }

    // console.log(arr);

    //var arr = [1, 3, 5, "哈哈哈", 7, 9, 11];

    // arr.splice(2, 0, "哈哈哈", "哈哈哈", "测试");
    // console.log(arr);
    // arr.forEach(function (value, index) {
    //     console.log(index + "---" + value);
    // });

    // var arr = [1, 3, 5, 7, 9, 11];

    // // arr1 = arr.map(function(value, index) {
    // //     return value * 2;
    // // });

    // var arr1 = arr.filter(function(value, index) {
    //     return value > 5 && value < 10;
    // });

    // console.log(arr.every(function(value, index) {
    //     return index > 3;
    // }));
    // // console.log(arr1);





    


    
            