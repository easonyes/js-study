/* 
  返回传入 id 的标签
*/
function $(id) {
  return typeof id === "string" ? document.getElementById(id) : null;
}

// 获取滚动的头部距离和左边距离
// scroll().top , scroll().left
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



