const mySlider = new Splide("#mySlider", {
    type: "loop",
    autoScroll: { speed: 2, pauseOnHover: (boolean = !1) },
    classes: { pagination: "splide__pagination custom-pagin", page: "splide__pagination__page custom-page" },
    pagination: (boolean = !1),
});

mySlider.mount(window.splide.Extensions)

anime({
    targets: [".top3__text", ".slider__text"],
    opacity:
    {
        value: [0, 1],
        duration: 500,
        easing: "easeInOutSine",
    }
}),
    anime({
        targets: [".top3__text", ".slider__text"],
        scale:
        {
            value: 1.3,
            delay: 500,
            duration: 500,
            easing: "easeInOutSine"
        },
        direction: "alternate"
    })