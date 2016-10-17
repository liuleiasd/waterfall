/**
 * Created by LiuLei on 2016/8/9.
 */
/*
* �ٲ������ص�
* 1.�ȿ��ȸ�
* 2.�ڶ��еĵ�һ��ͼƬҪ���ص���һ���и߶����λ��
* 3.�϶�����������ͼƬ����ǰҳ���β��
*
* */
window.onload = function() {
    waterfall('main','box');
    //��json��ʽ ģ���̨����
    var dattaInt = {
        "data":[{"src":'0.jpg'},{"src":'1.jpg'},{"src":'2.jpg'},{"src":'3.jpg'},{"src":'4.jpg'},{"src":'5.jpg'},{"src":'6.jpg'},{"src":'7.jpg'},{"src":'8.jpg'},{"src":'9.jpg'},{"src":'10.jpg'},{"src":'11.jpg'},{"src":'12.jpg'},{"src":'13.jpg'},{"src":'14.jpg'},{"src":'15.jpg'},{"src":'16.jpg'},{"src":'17.jpg'},{"src":'17.jpg'},{"src":'18.jpg'},]
    };
    //(���ߵľ���+�������ľ���) > (���ߵľ���+��Ը����ӵĸ߶�(clientTop)+����߶ȵ�һ��)
    window.onscroll = function() {
        //���Ϊtrue �߱��������ݿ��������Ѻ�̨��������������Ⱦ��ҳ���β��
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
//��main�µ�����classΪbox��Ԫ��ȡ����
function waterfall(parent,box) {
    var aParent = document.getElementById(parent);
    var oBoxs = getByClass(aParent,box);
   //��������ҳ����ʾ������(ҳ��Ŀ��/box�Ŀ�)
    var oBoxW = oBoxs[0].offsetWidth;  //��ȡһ�����ӵĿ��
    var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
    //����main�Ŀ� ��Ϊ����main�Ŀ�������������仯��
    aParent.style.cssText = 'width:' + oBoxW * cols + "px; margin:0 auto";
    var hArr = []; //�������ÿһ���߶ȵ�����
    for(var i=0; i<oBoxs.length; i++) {
        if(i<cols) {
            hArr.push(oBoxs[i].offsetHeight); //ȡ����һ�ŵĸ߶�
        }else {
            //apply()���Ķ���򷽷���this��һ��ָ�򣬴�ʱMath.min����ָ�����һ������
            var minH = Math.min.apply(null,hArr); //ȡ����������С�Ŀ��
            var index = getMinhIndex(hArr,minH);  //��С�߶ȵ�����
            oBoxs[i].style.position = "absolute"; //���þ��Զ�λ
            oBoxs[i].style.top = minH + 'px';
            oBoxs[i].style.left = oBoxW * index + 'px';
            //��С�ĸ߶� ���� �ڶ��ν����ĸ߶ȣ���ʱ���Ͳ�����С�ĸ߶���
            hArr[index] += oBoxs[i].offsetHeight;
        }
    }

}
//����class��ȡԪ��
function getByClass(parent,clsName) {
    var boxArr = [];  //�����洢��ȡ��������classΪbox��Ԫ��
    var oElements = parent.getElementsByTagName('*')//��ȡ��Ԫ�������е���Ԫ��
    for(var i=0; i<oElements.length; i++) {
        //�ж����oElements�µ�className ���õ��ڴ�������classNames,����ӵ�������
        if(oElements[i].className == clsName) {
            boxArr.push(oElements[i]);
        }
    }
    return boxArr;
}
//����С�߶ȵ�����λ��
function getMinhIndex(arr,val) {
    for(var i in arr) { //�����е�ֵ���ڴ���������Сֵ��ȡ����������
        if(arr[i] == val) {
            return i;
        }
    }
}

//����Ƿ�߱��������ݿ������
function checkScrollSlide() {
    //�ҵ����еĺ��ӣ�ͨ�������ҵ����һ������
    var aParent = document.getElementById('main');
    var oBoxs = getByClass(aParent,'box');
    var lastBoxH = oBoxs[oBoxs.length-1].offsetTop + Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
    //������� ���ߵľ��� ����ie �ȸ�������
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    //������� �������ľ��� ����ie �ȸ�������
    var height = document.body.clientHeight || document.documentElement.clientHeight;
    return (lastBoxH<scrollTop+height) ? true : false;
}