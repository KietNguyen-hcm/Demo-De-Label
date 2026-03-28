let swiper;

function initSwiper() {
  const el = document.querySelector('.swiper');
  if (!el) return;

  // 🔥 nếu đã có thì destroy trước
  if (swiper) {
    swiper.destroy(true, true);
  }

  swiper = new Swiper('.swiper', {
    loop: true,
    speed: 1500,
    autoplay: {
      delay: 7000,
      disableOnInteraction: false,
    },

    observer: true,
    observeParents: true,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
}


let isTransitioning = false;

barba.init({
  transitions: [{
    name: 'fade',

    leave(data) {
      isTransitioning = true;

      return new Promise(resolve => {
        data.current.container.classList.add('fade-leave-active');
        setTimeout(resolve, 400);
      });
    },

    enter(data) {
      isTransitioning = false;

      const el = data.next.container;

      el.classList.add('fade-enter');

      setTimeout(() => {
        el.classList.add('fade-enter-active');
      }, 10);

      setTimeout(() => {
        el.classList.remove('fade-enter', 'fade-enter-active');
      }, 500);
    },

    afterEnter() {
      // fix video
      const videos = document.querySelectorAll("video");
      videos.forEach(video => {
        video.pause();
        video.currentTime = 0;
        video.play().catch(() => {});
      });

      // đóng menu
      const menu = document.getElementById("menu");
      const hamburger = document.querySelector(".hamburger");

      if (menu && hamburger) {
        menu.classList.remove("active");
        hamburger.classList.remove("active");
      }

      initSwiper();
    }
  }]
});

// ❌ chặn click khi đang transition
document.addEventListener("click", function(e) {
  if (isTransitioning && e.target.closest("a")) {
    e.preventDefault();
  }
});

document.addEventListener("click", function(e) {
  if (e.target.closest("nav a")) {
    const menu = document.getElementById("menu");
    const hamburger = document.querySelector(".hamburger");

    menu.classList.remove("active");
    hamburger.classList.remove("active");
  }
});

