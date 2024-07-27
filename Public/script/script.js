$(document).ready(function () {
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        autoplay: true,
        autoplayTimeout: 1000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });
    window.addEventListener('scroll', () => {
        if (window.scrollY > 150) {
            $('nav').addClass('sticky');

        }
        else {
            $('nav').removeClass('sticky');
        }
    });


    $('#payNow').click(function (e) {
        e.preventDefault();
        $('.form').css('display', 'flex');
    });
    $('#cancel').click(function (e) {
        e.preventDefault();
        $('.form').css('display', 'none');
    });



});