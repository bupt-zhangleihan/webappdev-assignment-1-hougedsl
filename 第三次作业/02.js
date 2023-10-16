// 获取 <h1> 元素
var heading = document.getElementById("myHeading");

// 获取 <button> 元素
var button = document.getElementById("myButton");

// 创建一个标志，用于跟踪文本颜色状态
var isTextColorRed = true;

// 添加单击事件处理程序，以切换文本颜色
button.addEventListener("click", function() {
    if (isTextColorRed) {
        heading.style.color = "blue";
    } else {
        heading.style.color = "red";
    }
    isTextColorRed = !isTextColorRed;
});
