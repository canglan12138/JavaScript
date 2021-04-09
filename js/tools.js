/*
     * 定义一个函数，用来获取指定元素的当前的样式
     * 参数：
     * 		obj 要获取样式的元素
     * 		name 要获取的样式名
     */
function getStyle(obj , name){

  if(window.getComputedStyle){
    //正常浏览器的方式，具有getComputedStyle()方法
    return getComputedStyle(obj , null)[name];
  }else{
    //IE8的方式，没有getComputedStyle()方法
    return obj.currentStyle[name];
  }
}

/*
* 移动函数
* */
/*
 * 参数：
 * 	obj:要执行动画的对象
 * 	target:执行动画的目标位置
 * 	speed:移动的速度(正数向右移动，负数向左移动)
 * attr:要执行动画的样式，比如：left top width height
 *  callback:回调函数，这个函数将会在动画执行完毕以后执行
 */
function move(obj,target,speed,attr,callback) {
  //关闭上一个定时器
  clearInterval(obj.timer)

  //判断当前位置
  //如果当前位置大于目标位置，速度为负
  var current = parseInt(getStyle(obj,attr))
  if (current > target) {
    speed = -speed
  }

  //开启定时器
  //向执行动画的对象中添加一个 timer 属性，保存属于自己的定时器
  obj.timer = setInterval(() => {
    //获取对象原来的值
    var oldValue = parseInt(getStyle(obj,attr))
    //在原来的值的基础上增加
    var newValue = oldValue + speed
    //判断速度是否大于0，新的值是否大于目标值，来决定移动的方向
    /*
    * 情况一：速度大于0，新的值大于目标值
    *         从左向右移动
    * 情况二：速度小于0，新的值小于目标值
    *         从右向左移动
    * */
    if (speed > 0 && newValue > target || speed < 0 && newValue < target) {
      newValue = target
    }
    //将新值给对象
    obj.style[attr] = newValue + 'px'
    //当新的值等于目标值，清除定时器
    if (newValue == target) {
      clearInterval(obj.timer)
      ////动画执行完毕，调用回调函数
      callback && callback()
    }
  },30)
}
