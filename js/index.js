superHero = {};

superHero.apipath = 'https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/all.json';

superHero.get = function () {
    $.ajax({
        type: 'GET',
        url: superHero.apipath,
        success: function (data) {
            superHero.sliderCharacter(data);
            superHero.list(data);
        }
    });
}



$(document).ready(function () {
    superHero.slider();
    superHero.get();
    superHero.bindevent();
});

superHero.slider = function () {
    var slider = new Swiper('.swiper-container', {
        // Optional parameters
        loop: true,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });


}

superHero.sliderCharacter = function (data) {
    for (let i = 0; i < 20; i++) {
        const markup = `<div class="swiper-slide character"><div class="character__image"> <img src="${data[i].images.sm}" alt="${data[i].name}"></div><div class="character__details"><h2 class="character__name">${data[i].name}</h2><h3 class="character__publisher">${data[i].biography.publisher}</h3></div><span class="icon heart"></span></div>`;
        $('body').find('.characters-swiper-container .swiper-wrapper').append(markup);
    }
    var swiper = new Swiper('.characters-swiper-container', {
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: true,
        slidesPerView: 4,     
        spaceBetween: 30,  
        autoplay: {
            delay: 4000,
            disableOnInteraction: true,
        },
    })
}

superHero.list = function (data) {
    for (let i = 0; i < data.length; i++) {

        var publisher = (data[i].biography.publisher === '' || data[i].biography.publisher === null) ? data[i].biography.publisher : data[i].biography.publisher.replace(/\s+/g, '').toLowerCase();


        const markup = `<div class="characterBox"><div class="character" data-publisher="${publisher}"><div class="character__image"> <img src="${data[i].images.sm}" alt="${data[i].name}"></div><div class="character__details"><h2 class="character__name">${data[i].name}</h2><h3 class="character__publisher">${data[i].biography.publisher}</h3></div> <span class="icon heart"></span></div></div>`;
        $('body').find('.superhero__bottomSection').append(markup);
    }
}


superHero.bindevent = function () {
    $('.drpDwn').on('click', function () {
        $(this).toggleClass('active');
    });

    $('.drpDwn').find('li').on('click', function () {
        $(this).parent().parent().siblings().children().first().text($(this).text());
        var publisher = $(this).attr('data-publisher');
        $('.character').parent().show();
        if(publisher){
            $(".character[data-publisher!='" + publisher + "']").parent().hide();
            $(publisher).parent().show();
        }else{
            $('.character').parent().hide();
        }
    });

    $('#search').on('keyup',function(){
        var text = $(this).val().toLowerCase();
        $('.characterBox').filter(function(){
            $(this).toggle($(this).text().toLowerCase().indexOf(text) > -1);
        });
    });




};

