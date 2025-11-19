import { loadPartials } from "./includes.js";
import gsap from "gsap";

loadPartials();

// ENSURE partials load before GSAP runs
window.addEventListener("partialsLoaded", () => {

  const nav = document.querySelector(".kc-nav");
  const links = nav.querySelectorAll(".nav-inner a");

  // Determine active link
  const current = window.location.pathname;
  let activeLink = null;

  links.forEach(link => {
    if (current.includes(link.dataset.page)) {
      activeLink = link;
    }
  });

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // START collapsed
  tl.set(nav, { scaleY: 0 });
  tl.set(links, { opacity: 0, x: -900 });

  // NAV EXPANDS (slower)
  tl.to(nav, {
    scaleY: 1,
    duration: 1.6,
  }, "+=0.4");  // brief pause before expanding

  tl.to(".nav-sweep", {
  opacity: 1,
  duration: 0.2
}, "-=0.6");

tl.to(".nav-sweep", {
  x: "200%",        // moves fully across the nav
  duration: 1.8,     // slower, smoother
  ease: "power2.out"
});

tl.to(".nav-sweep", {
  opacity: 0,
  duration: 0.3
}, "-=0.9");

  // SLIDE IN LINKS (slower, smoother)
  tl.to(links, {
    opacity: 1,
    x: 0,
    duration: 2.2,
    stagger: 0.60,
    ease: "power3.out"
  }, "-=0.8");

  // GLOW BLAST (slower & smoother)
  tl.to(links, {
    textShadow: "0 0 18px #25e4ff, 0 0 36px #25e4ff, 0 0 56px #25e4ff",
    duration: 0.9,
    ease: "power2.out"
  });

  // GLOW FADE (slower)
  tl.to(links, {
    textShadow: "0 0 0px #25e4ff",
    duration: 1.2,
    ease: "power2.inOut",
    onComplete: () => {

      // ACTIVE LINK PULSE (slow, elegant)
      if (activeLink) {
        gsap.to(activeLink, {
          textShadow:
            "0 0 10px #25e4ff, 0 0 22px #25e4ff, 0 0 42px #25e4ff",
          duration: 2.2,      // ← slowed way down
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    }
  });



links.forEach(link => {
  const ripple = link.querySelector(".ripple");

  link.addEventListener("mouseenter", () => {
    
    // Glow bump
    gsap.fromTo(link, {
      textShadow: "0 0 4px #25e4ff"
    }, {
      textShadow: "0 0 16px #25e4ff, 0 0 32px #25e4ff",
      duration: 0.4,
    });

    // Ripple expansion
    gsap.fromTo(ripple, {
      opacity: 0,
      scale: 0.3
    }, {
      opacity: 0.6,
      scale: 1.8,
      duration: 0.55,
      ease: "power2.out",
      onComplete() {
        gsap.to(ripple, {
          opacity: 0,
          duration: 0.4
        });
      }
    });

    link.addEventListener("mouseleave", () => {
  if (link === activeLink) return; // do NOT kill the pulse on the active link

  gsap.to(link, {
    textShadow: "0 0 0px transparent",
    duration: 0.45,
    ease: "power2.out"
  });
});
  });
});
});