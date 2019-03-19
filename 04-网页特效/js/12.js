window.onload = function() {
  // 1. 实现瀑布流布局
  waterFall("main", "box");

  // 2. 动态加载图片
  window.onscroll = function() {
    if(checkWillLoadImage()) {
      // 2.1 造数据
      let dataArr = [
        {"src": "img04.jpg"},
        {"src": "img08.jpg"},
        {"src": "img09.jpg"},
        {"src": "img12.jpg"},
        {"src": "img20.jpg"},
        {"src": "img25.jpg"},
        {"src": "img28.jpg"},
        {"src": "img30.jpg"},
        {"src": "img31.jpg"},
        {"src": "img40.jpg"},
      ];

      // 2.2 创建元素
      for(let i=0; i<dataArr.length; i++){
        let newBox = document.createElement('div');
        newBox.className = "box";
        let main = document.getElementById('main');
        main.appendChild(newBox);

        let newPic = document.createElement('div');
        newPic.className = 'pic';
        newBox.appendChild(newPic);

        let newImg = document.createElement('img');
        newImg.src = "img/" + dataArr[i].src;
        newPic.appendChild(newImg);

        // 2.3 重新布局
        waterFall("main", "box");
      }
    }
  }
};

/* 
  实现瀑布流布局
*/
function waterFall(parent, child) {
  // 1. 父盒子居中
  // 1.1 获取所有的盒子
  let main = document.getElementById(parent);
  let allBoxs = document.getElementsByClassName(child);
  
  // 1.2 获取子盒子的宽度
  let boxWidth = allBoxs[0].offsetWidth;
  // console.log(boxWidth);

  // 1.3 获取屏幕的宽度
  let screenW = document.documentElement.clientWidth;

  // 1.4 求出列数
  let cols = parseInt(screenW / boxWidth);
  //console.log(cols);

  // 1.5 父盒子居中
  main.style.width = cols * boxWidth + 'px';
  main.style.margin = "0 auto";

  // 2. 子盒子定位
  // 2.1 定义高度数组
  let heightArr = [], boxHeight = 0, minBoxHeight = 0, minBoxIndex = 0;
  // 2.2 遍历子盒子
  for(let i=0; i<allBoxs.length; i++) {
    // 2.2.1 求出每一个子盒子的高度
    boxHeight = allBoxs[i].offsetHeight;
    // 2.2.2 取出第一行盒子的高度放入高度数组
    if(i < cols) { // 第一行
      heightArr.push(boxHeight);
    }else { // 剩余行
      // 1. 取出最矮的盒子高度
      minBoxHeight = Math.min.apply(this, heightArr);
      // 2. 求出最矮盒子对应的索引
      minBoxIndex = getMinBoxIndex(heightArr, minBoxHeight);
      // 3. 子盒子定位
      allBoxs[i].style.position = 'absolute';
      allBoxs[i].style.left = minBoxIndex * boxWidth + 'px';
      allBoxs[i].style.top = minBoxHeight + 'px';
      // 4. 更新数组中的高度
      heightArr[minBoxIndex] += boxHeight;
    }
  }

  console.log(heightArr, minBoxHeight, minBoxIndex);
};

/* 
  获取数组中最矮盒子高度的索引
*/
function getMinBoxIndex(arr, val) {
  for(let i=0; i<arr.length; i++) {
    if(val === arr[i]) {
      return i;
    }
  }
};

/* 
  判断是否具备加载图片的条件
*/
function checkWillLoadImage() {
  // 1. 获取最后一个盒子
  let allBoxs = document.getElementsByClassName("box");
  let lastBox = allBoxs[allBoxs.length - 1];

  // 2. 求出最后一个盒子的 头部偏离高度（offsetTop）
  let lastBoxOffsetTop = lastBox.offsetTop;

  // 3. 求出屏幕的高度
  let screenH = document.body.clientHeight || document.documentElement.clientHeight;

  // 4. 求出页面偏离浏览器的高度
  let scrollTop = window.pageYOffset;

  return lastBoxOffsetTop <= screenH + scrollTop;
}

