window.onload = function () {
    // 获取数据
    var outer = document.getElementById("outer");
    var myUl = document.getElementById("myUl");
    var ulLis = myUl.children; // 获取ul里面的li
    var myOl = document.getElementById("myOl");
    var olLis = myOl.children; // 获取ol里面的li
    var theUl = document.getElementById("theUl");
    var theLis = theUl.children;
    var len = ulLis.length;

// automate slider
    var timer = null;
    var num = 0;

    function autoplay() {

        timer = setInterval(function () {
            num ++;
            // console.log(num);
            if (num > len -1) {
                num = 0;
            }
            for (var i = 0; i < len; i++) {
                ulLis[i].className = "";
                olLis[i].className = "";
                theLis[i].className = "";
            }
            ulLis[num].className = "current";
            olLis[num].className = "current";
            theLis[num].className = "current";

            // 获取当前li里面的img的src 即(ulLis下的孩子的src)
            var imgSrc = ulLis[num].children[0].src;
            // 更换背景
            outer.style.backgroundImage = "url(" + imgSrc + ")"
        }, 3000);

    }
    autoplay();

// 鼠标控制
    outer.children[3].onmouseenter = function () {
        // console.log(1);
        clearInterval(timer);
    };
    outer.children[3].onmouseleave = function () {
        autoplay();
    };

// 鼠标移上小图切换背景
    for (var i = 0; i < len; i++) {
        // 自定义index
        olLis[i].index = i;
        // console.log(olLis[i].index);
        // 鼠标以上切换图片
        olLis[i].onmouseenter = function () {
            for (var i = 0; i < len; i++) {
                ulLis[i].className = "";
                olLis[i].className = "";
                theLis[i].className = "";
            }
            ulLis[this.index].className = "current";
            olLis[this.index].className = "current";
            theLis[this.index].className = "current";

            // 获取当前li里面的img的src 即(ulLis下的孩子的src)
            var imgSrc = ulLis[this.index].children[0].src;
            // 更换背景
            outer.style.backgroundImage = "url(" + imgSrc + ")";
            num = this.index;
        }
    }
};

