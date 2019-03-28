/**
 * 返回传入 id 的标签
 * @param {string}id
 * @returns {object}
 */
function $(id) {
  return typeof id === "string" ? document.getElementById(id) : null;
}

/**
 * 获取滚动的头部距离和左边距离
 * scroll().top , scroll().left
 * @returns {*}
 */
function scroll() {
  if(window.pageYOffset !== null) {
    return {
      top: window.pageYOffset,
      left: window.pageXOffset,
    }
  }else if(document.compatMode === "CSS1Compat") { //W3C
    return {
      top: document.documentElement.scrollTop,
      left: document.documentElement.scrollLeft,
    }
  }

  return {
    top: document.body.scrollTop,
    left: document.scrollLeft,
  };
}

/**
 * 获取屏幕的宽度和高度
 * @returns {{width: number, height: number}}
 */
function client() {
  if (window.innerWidth) {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  } else if (document.compatMode === 'CSS1Compat') { // W3C
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    }
  }

  return {
    width: document.body.clientWidth,
    height: document.body.clientHeight,
  }
}

/**
 * 阻止冒泡
 */
function stopPro() {
  if (event && event.stopPropagation()) { // w3c标准
    event.stopPropagation();
  } else { // IE系列 IE 678
    event.cancelBubble = true;
  }
}

/**
 * 匀速动画函数
 * @param {object}obj
 * @param {number}target
 * @param {number}speed
 */
function constant(obj, target, speed) {
  // 1. 清除定时器
  clearInterval(obj.timer);

  // 2. 判断方向
  let dir = obj.offsetLeft < target ? speed : -speed;

  // 2. 设置定时器
  obj.timer = setInterval(function () {
    obj.style.left = obj.offsetLeft + dir + 'px';

    if (Math.abs(target - obj.offsetLeft) < speed) {
      clearInterval(obj.timer);
      obj.style.left = target + 'px';
    }
  }, 50);
}

/**
 * 缓动动画
 * @param{object} obj
 * @param data
 * @param{number|缓动系数} n
 * @param{number} ms
 * @param{function} fn
 */
function buffer(obj, data, n, ms, fn) {
// 1. 清除定时器
  clearInterval(obj.timer);

// 2. 设置定时器
  let begin = 0, target = 0, speed = 0;
  obj.timer = setInterval(function () {
    // 2.0.0 旗帜
    let flag = true;
    for (let k in data) {
      // 2.0 获取初始值
      if ('opacity' === k) {
        begin = Math.round(parseFloat(getStyleAttr(obj, k)) * 100 )  || 100;
        target = parseInt(data[k] * 100);
      } else if ("scrollTop" === k) {
        begin = obj.scrollTop;
        target = parseInt(data[k]);
      } else {
        begin = parseInt(getStyleAttr(obj, k)) || 0;
        target = parseInt(data[k]);
      }

      // 2.1 求出步长
      speed = (target - begin) / n;

      // 2.2 判断取整方向
      speed = (target > begin) ? Math.ceil(speed) : Math.floor(speed);
      // 2.2 动起来
      if ('opacity' === k) {
        obj.style[k] = (begin + speed) / 100;
        obj.style.filter = 'alpha(opacity:' + (begin + speed) + ')';
      } else if ("scrollTop" === k) {
        obj.scrollTop = begin + speed;
      } else {
        obj.style[k] = begin + speed + 'px';
      }
      console.log(begin, target);
      if (begin !== target) {
        flag = false;
      }
    }
    // 3. 清除定时器
    if (flag) {
      clearInterval(obj.timer);

      // 判断有没有回调函数
      if (fn) {
        fn();
      }
    }
  }, ms);
}
/**
 * 获取元素的css样式值
 * @param{object} obj
 * @param{string} attr
 * @returns {*}
 */
function getStyleAttr(obj, attr) {
  if (obj.currentStyle) { // IE 和 Opera
    return obj.currentStyle[attr];
  } else {
    return window.getComputedStyle(obj, null)[attr];
  }
}



