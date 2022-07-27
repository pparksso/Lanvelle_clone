const mainSwiper = new Swiper("#mainVisual", {
  navigation: {
    nextEl: "#mainVisual .next",
    prevEl: "#mainVisual .prev",
  },
  loop: true,
  speed: 1000,
  autoplay: {
    delay: 8000,
  },
});
