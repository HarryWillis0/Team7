window.onload = function () {
    // get data
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

            // get the children of ulLis
            var imgSrc = ulLis[num].children[0].src;
            // change bg
            outer.style.backgroundImage = "url(" + imgSrc + ")"
        }, 3000);

    }
    autoplay();

// mouse control
    outer.children[3].onmouseenter = function () {
        // console.log(1);
        clearInterval(timer);
    };
    outer.children[3].onmouseleave = function () {
        autoplay();
    };

// change bg when mouseenter
    for (var i = 0; i < len; i++) {
        //define an index
        olLis[i].index = i;
        // console.log(olLis[i].index);
        // onmouseenter event to change imgs
        olLis[i].onmouseenter = function () {
            for (var i = 0; i < len; i++) {
                ulLis[i].className = "";
                olLis[i].className = "";
                theLis[i].className = "";
            }
            ulLis[this.index].className = "current";
            olLis[this.index].className = "current";
            theLis[this.index].className = "current";


            var imgSrc = ulLis[this.index].children[0].src;
            // change bg
            outer.style.backgroundImage = "url(" + imgSrc + ")";
            num = this.index;
        }
    }
};

