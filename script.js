document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(
    Flip,
    ScrollTrigger,
    ScrollSmoother,
    ScrollToPlugin,
    SplitText,
    TextPlugin
  );

  const menu = document.getElementById("menuContainer");
  const closeMenu = document.getElementById("closeBtn");
  const menuBtn = document.getElementById("menuBtn");
  let mySplitText = new SplitText(".animatedText", { type: "chars" });
  let chars = mySplitText.chars;
  const menuBtnRelative = document.getElementById("menuBtnRelative");
  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.5,
    smoothTouch: 0.1,
    effects: true,
  });

  const tl = gsap.timeline({
    onComplete: resumeScroll,
  });

  function pauseScroll() {
    smoother.paused(true);
  }

  function resumeScroll() {
    smoother.paused(false);
  }

  function isMobile() {
    return /Mobi|Android|iPhone/i.test(navigator.userAgent);
  }

  /*menu*/
  function showMenu() {
    menu.classList.add("show");
    gsap.to([".mI1, .mI2, .mI3, .alert"], {
      y: 0,
      stagger: 0.1,
      duration: 1,
      opacity: 1,
    });
  }

  function removeMenu() {
    menu.classList.remove("show");
    gsap.to([".alert, .mI3, .mI2, .mI1"], {
      y: "100%",
      stagger: 0.1,
      opacity: 0,
    });
  }

  pauseScroll();

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      showMenu();
      pauseScroll();
    });
  }

  if (menuBtnRelative) {
    menuBtnRelative.addEventListener("click", () => {
      showMenu();
      pauseScroll();
    });
  }

  if (closeMenu) {
    closeMenu.addEventListener("click", () => {
      removeMenu();
      resumeScroll();
    });
  }

  function scrollToId(id) {
    const element = document.querySelector(`#${id}`);
    if (element) {
      gsap.to(window, {
        scrollTo: element,
        duration: 2.5,
        ease: "power4.inOut",
      });
    }
  }

  document.querySelectorAll(".scroll-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const id = link.getAttribute("data-scroll");
      scrollToId(id);
    });
  });

  tl.to(".Item1", {
    y: 0,
    rotation: "0",
    delay: 0.5,
    opacity: 1,
    duration: 0.8,
    ease: "power4.inOut",
  })
    .to(".Item1", {
      y: -350,
      rotation: "-4deg",
      opacity: 0,
      duration: 0.8,
      ease: "power4.inOut",
    })
    .to(
      ".Item2",
      { y: 0, rotation: "0", opacity: 1, duration: 0.8, ease: "power4.inOut" },
      "-=0.5"
    )
    .to(".Item2", {
      y: -350,
      rotation: "-4deg",
      opacity: 0,
      duration: 0.8,
      ease: "power4.inOut",
    })
    .to(
      ".Item3",
      { y: 0, rotation: "0", opacity: 1, duration: 0.8, ease: "power4.inOut" },
      "-=0.5"
    )
    .to(".Item3", {
      y: -350,
      rotation: "-4deg",
      opacity: 0,
      duration: 0.8,
      ease: "power4.inOut",
    })
    .to(
      ".Item4",
      {
        y: 0,
        rotation: "0",
        opacity: 1,
        duration: 0.8,
        ease: "power4.inOut",
      },
      "-=0.5"
    );
  if (isMobile()) {
    tl.to(".Item4", {
      duration: 1.3,
      ease: "power4.inOut",
      fontSize: "7.9rem",
    });
  } else {
    tl.to(".Item4", {
      duration: 1.3,
      ease: "power4.inOut",
      fontSize: "29rem",
    });
  }
  tl.to(".loadingScreen", {
    y: "-110%",
    duration: 1.5,
    ease: "power4.inOut",
  }).to(
    [".HeroTitle, .HeroP, .scrollMessage"],
    {
      opacity: 1,
      duration: 1,
      ease: "power4.in",
    },
    "<"
  );

  gsap.to(".HeroTitle", {
    y: -150,
    /*opacity: 0,*/
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      scrub: true,
    },
  });

  gsap.to(".scrollMessage", {
    y: -150,
    /* opacity: 0,*/
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      scrub: true,
    },
  });

  gsap.to(".HeroP", {
    y: -150,
    opacity: 0,
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      scrub: true,
    },
  });

  /*gsap.to(".heroText", {
    y: "0%",
    opacity: 1,
    scrollTrigger: {
      trigger: ".heroTextContainer",
      start: "top bottom",
      end: "bottom bottom",
      scrub: true,
    },
  });*/

  if (!isMobile()) {
    gsap.to(".heroIMG", {
      y: "-10%",
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  ScrollTrigger.create({
    trigger: ".hero",
    start: "center center",
    end: "bottom top",
    scrub: true,
    onEnter: () => {
      gsap.to(".fixedNav", {
        opacity: 1,
        pointerEvents: "auto",
      });
      gsap.to(".RelativeNav", {
        opacity: 0,
        pointerEvents: "none",
      });
    },
    onLeaveBack: () => {
      gsap.to(".fixedNav", {
        opacity: 0,
        pointerEvents: "none",
      });
      gsap.to(".RelativeNav", {
        opacity: 1,
        pointerEvents: "auto",
      });
    },
  });

  gsap.set(".centerYline", {
    rotate: "90deg",
    scaleX: 0,
  });

  gsap.set(".lateralLine", {
    rotate: "30deg",
    scaleX: 0,
  });

  gsap.set(".lateralRightLine", {
    rotate: "-30deg",
    scaleX: 0,
  });

  gsap.set(".lateralMiniLine", {
    rotate: "60deg",
    scaleX: 0,
  });

  gsap.set(".lateralMiniRightLine", {
    rotate: "-60deg",
    scaleX: 0,
  });

  gsap.set(".suit", {
    y: "110vh",
  });

  let tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".craftMaterials",
      start: "center center",
      end: "+=4000",
      scrub: true,
      pin: true,
    },
  });

  tl2.to(".centerLine", {
    scaleX: 1,
    ease: "power4.out",
  });

  tl2.to(
    ".centerYline",
    {
      scaleX: 1,
      ease: "power4.out",
    },
    "+=0.01"
  );

  tl2.to(
    ".lateralLine",
    {
      scaleX: 1,
      ease: "power4.out",
    },
    "<"
  );

  tl2.to(
    ".lateralRightLine",
    {
      scaleX: 1,
      ease: "power4.out",
    },
    "<"
  );

  tl2.to(
    ".lateralMiniLine",
    {
      scaleX: 1,
      ease: "power4.out",
    },
    "<"
  );

  tl2.to(
    ".lateralMiniRightLine",
    {
      scaleX: 1,
      ease: "power4.out",
    },
    "<"
  );

  tl2.to(
    ".suit",
    {
      y: 0,
      ease: "power4.out",
    },
    "<"
  );

  tl2.to(
    ".lines",
    {
      opacity: 0.2,
      ease: "power2.out",
    },
    "+=0.3"
  );

  tl2.to(
    ".suit",
    {
      duration: 1,
      scale: 1.6,
      ease: "power2.out",
    },
    "<"
  );

  tl2.from(
    ".material1",
    {
      x: "-100%",
      opacity: 0,
      ease: "power2.out",
    },
    "+=0.05"
  );

  tl2.from(
    ".material2",
    {
      x: "-100%",
      opacity: 0,
      ease: "power2.out",
    },
    "<"
  );

  tl2.from(
    ".material3",
    {
      y: "100%",
      opacity: 0,
      ease: "power2.out",
    },
    "<"
  );

  tl2.from(
    ".material4",
    {
      y: "100%",
      opacity: 0,
      ease: "power2.out",
    },
    "<"
  );

  if (!isMobile()) {
    gsap.to(".suit2", {
      scrollTrigger: {
        trigger: ".craftDetailsContent",
        duration: 2,
        ease: "power2.inOut",
        start: "center center",
        scrub: true,
      },
      y: "95vh",
      x: "100%",
      scale: 1.5,
    });
  }

  gsap.to([".i1, .i2, .i3, .i4, .i5, .i6"], {
    scrollTrigger: {
      trigger: ".wrapperAnimation",
      start: "bottom bottom",
      scrub: 0.6,
      pin: true,
    },
    stagger: 1,
    opacity: 1,
  });

  if (!isMobile()) {
    gsap.to(".aboutGrid", {
      scrollTrigger: {
        trigger: ".aboutGrid",
        start: "top center",
        scrub: true,
      },
      y: "50vh",
    });
  }

  gsap.to(chars, {
    color: "#eeeeee",
    stagger: 0.1,

    scrollTrigger: {
      trigger: ".craftDetailsContent",
      start: "top center",
      end: "center center",
      scrub: true,
    },
  });

  /* gsap.to(".scene1", {
    scrollTrigger: {
      trigger: ".scene1",
      start: "top bottom",
    },
    duration: 1,
    ease: "power2.inOut",
    x: "0",
  });

  gsap.to(".scene2", {
    scrollTrigger: {
      trigger: ".scene2",
      start: "top bottom",
    },
    duration: 1,
    ease: "power2.inOut",
    x: "0",
  });

  gsap.to(".scene3", {
    scrollTrigger: {
      trigger: ".scene3",
      start: "top bottom",
    },
    duration: 1,
    ease: "power2.inOut",
    x: "0",
  });

  gsap.to(".scene4", {
    scrollTrigger: {
      trigger: ".scene4",
      start: "top bottom",
    },
    duration: 1,
    ease: "power2.inOut",
    x: "0",
  });*/

  if (!isMobile()) {
    gsap.to(".Scene img", {
      y: "-30%",
      ease: "none",
      scrollTrigger: {
        trigger: ".Scene",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(".LastsScene img", {
      y: "-30%",
      ease: "none",
      scrollTrigger: {
        trigger: ".LastsScene",
        start: "top bottom",
        scrub: true,
      },
    });
  }
});
