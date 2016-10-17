/**
 * Created by LiuLei on 2016/8/9.
 */
/*
* 瀑布流的特点
* 1.等宽不等高
* 2.第二列的第一张图片要加载到第一行中高度最矮的位置
* 3.拖动滚动条加载图片到当前页面的尾部
*
* */
window.onload = function() {
    waterfall('main','box');
    //用json格式 模拟后台数据
    var dattaInt = {
        "data":[{"src":'0.jpg'},{"src":'1.jpg'},{"src":'2.jpg'},{"src":'3.jpg'},{"src":'4.jpg'},{"src":'5.jpg'},{"src":'6.jpg'},{"src":'7.jpg'},{"src":'8.jpg'},{"src":'9.jpg'},{"src":'10.jpg'},{"src":'11.jpg'},{"src":'12.jpg'},{"src":'13.jpg'},{"src":'14.jpg'},{"src":'15.jpg'},{"src":'16.jpg'},{"src":'17.jpg'},{"src":'17.jpg'},{"src":'18.jpg'},]
    };
    //(滚走的距离+可视区的距离) > (滚走的距离+相对父盒子的高度(clientTop)+自身高度的一半)
    window.onscroll = function() {
        //如果为true 具备加载数据块能力，把后台传过来的数据渲染到页面的尾部
        if(checkScrollSlide) {
            var aParent = document.getElementById('main');
            for(var i=0;i<dattaInt.data.length; i++) {
                var oBox = document.createElement('div');
                oBox.className = 'box';
                aParent.appendChild(oBox);
                var oPic = document.createElement('div');
                oPic.className = 'pic';
                oBox.appendChild(oPic);
                var oImg = document.createElement('img');
                oImg.src = "images/" + dattaInt.data[i].src;
                console.log(oImg.src);
                oPic.appendChild(oImg);
            }
            waterfall('main','box');
        }
    }
}
//将main下的所有class为box的元素取出来
function waterfall(parent,box) {
    var aParent = document.getElementById(parent);
    var oBoxs = getByClass(aParent,box);
   //计算整个页面显示的列数(页面的宽度/box的宽)
    var oBoxW = oBoxs[0].offsetWidth;  //获取一个盒子的宽度
    var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
    //设置main的宽， 因为现在main的宽是随着浏览器变化的
    aParent.style.cssText = 'width:' + oBoxW * cols + "px; margin:0 auto";
    var hArr = []; //用来存放每一例高度的数组
    for(var i=0; i<oBoxs.length; i++) {
        if(i<cols) {
            hArr.push(oBoxs[i].offsetHeight); //取出第一排的高度
        }else {
            //apply()更改对象或方法中this的一个指向，此时Math.min方法指向的是一个数组
            var minH = Math.min.apply(null,hArr); //取出数组中最小的宽度
            var index = getMinhIndex(hArr,minH);  //最小高度的索引
            oBoxs[i].style.position = "absolute"; //设置绝对定位
            oBoxs[i].style.top = minH + 'px';
            oBoxs[i].style.left = oBoxW * index + 'px';
            //最小的高度 加上 第二次进来的高度，此时它就不是最小的高度了
            hArr[index] += oBoxs[i].offsetHeight;
        }
    }

}
//根据class获取元素
function getByClass(parent,clsName) {
    var boxArr = [];  //用来存储获取到的所有class为box的元素
    var oElements = parent.getElementsByTagName('*')//获取父元素下所有的子元素
    for(var i=0; i<oElements.length; i++) {
        //判断如果oElements下的className 正好等于传进来的classNames,就添加到新数组
        if(oElements[i].className == clsName) {
            boxArr.push(oElements[i]);
        }
    }
    return boxArr;
}
//找最小高度的索引位置
function getMinhIndex(arr,val) {
    for(var i in arr) { //数组中的值等于传过来的最小值，取出它的索引
        if(arr[i] == val) {
            return i;
        }
    }
}

//检测是否具备加载数据块的条件
function checkScrollSlide() {
    //找到所有的盒子，通过索引找到最后一个盒子
    var aParent = document.getElementById('main');
    var oBoxs = getByClass(aParent,'box');
    var lastBoxH = oBoxs[oBoxs.length-1].offsetTop + Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
    //能力检测 滚走的距离 兼容ie 谷歌等浏览器
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    //能力检测 可视区的距离 兼容ie 谷歌等浏览器
    var height = document.body.clientHeight || document.documentElement.clientHeight;
    return (lastBoxH<scrollTop+height) ? true : false;
}