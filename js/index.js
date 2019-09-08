superHero = {};

superHero.apipath = 'https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/all.json';

superHero.get = function () {
    $.ajax({
        type: 'GET',
        url: superHero.apipath,
        success: function (data) {
            superHero.sliderCharacter(data);
        }
    });
}



$(document).ready(function () {
    superHero.slider();
    superHero.get();
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

    var swiper = new Swiper('.characters-swiper-container', {
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

    })
}

superHero.sliderCharacter = function (data) {
    for (let i = 0; i < data.length; i++) {
        const markup = `<div class="swiper-slide character"><div class="character__image"> <img src="${data[i].images.md}" alt="${data[i].name}"></div><div class="character__details"><div class="character__name"><h2>${data[i].name}</h2></div><div class="character__desciption"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid ad nostrum ut quam? Voluptatibus, minus perspiciatis! Sequi voluptatum, eligendi necessitatibus nostrum sit quod rerum repellat earum, omnis eveniet, totam corporis.</p></div></div></div>`;
        $('body').find('.characters-swiper-container .swiper-wrapper').append(markup);
    }

}


