$(document).ready(function () {
    $('body').addClass('ready');
    $('ul.left-menu li').click(function (e){
        $('ul.left-menu li').not(this).removeClass('active');
        $(this).toggleClass("active");
        //e.preventDefault();
    })
});