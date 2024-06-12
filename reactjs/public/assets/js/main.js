
var container = document.getElementById('container');
var selectButton = document.getElementById('selectButton');

var container1 = document.getElementById('container1');
var selectButton1 = document.getElementById('selectButton1');

var container2 = document.getElementById('container2');
var selectButton2 = document.getElementById('selectButton2');

selectButton.addEventListener('mouseenter', function () {
    container.classList.add('hovered');
});

selectButton.addEventListener('mouseleave', function () {
    container.classList.remove('hovered');
});

selectButton1.addEventListener('mouseenter', function () {
    container1.classList.add('hovered');
});

selectButton1.addEventListener('mouseleave', function () {
    container1.classList.remove('hovered');
});

selectButton2.addEventListener('mouseenter', function () {
    container2.classList.add('hovered');
});

selectButton2.addEventListener('mouseleave', function () {
    container2.classList.remove('hovered');
});