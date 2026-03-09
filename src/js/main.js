import { loadPartials } from "./includes.js";
import gsap from "gsap";

loadPartials();

// Ensure partials load before GSAP runs
window.addEventListener("partialsLoaded", () => {
  const nav = document.querySelector(".kc-nav");
  if (!nav) return;

  const links = nav.querySelectorAll(".nav-inner a");
  const navSweep = nav.querySelector(".nav-sweep");

  // Determine active link from current path
  const currentPath = window.location.pathname || "/index.html";
  const currentPage = currentPath.split("/").pop() || "index.html";
  const normalizedCurrentPage = currentPage.toLowerCase();

  let activeLink = null;
  links.forEach((link) => {
    const href = (link.getAttribute("href") || "").toLowerCase();
    if (href.endsWith(normalizedCurrentPage)) {
      activeLink = link;
    }
  });

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // Start collapsed
  tl.set(nav, { scaleY: 0 });
  tl.set(links, { opacity: 0, x: -900 });

  // Nav expands
  tl.to(
    nav,
    {
      scaleY: 1,
      duration: 1.6
    },
    "+=0.4"
  );

  if (navSweep) {
    tl.to(
      navSweep,
      {
        opacity: 1,
        duration: 0.2
      },
      "-=0.6"
    )
      .to(navSweep, {
        x: "200%",
        duration: 1.8,
        ease: "power2.out"
      })
      .to(
        navSweep,
        {
          opacity: 0,
          duration: 0.3
        },
        "-=0.9"
      );
  }

  // Slide in links
  tl.to(
    links,
    {
      opacity: 1,
      x: 0,
      duration: 2.2,
      stagger: 0.6,
      ease: "power3.out"
    },
    "-=0.8"
  );

  // Glow blast, then fade
  tl.to(links, {
    textShadow: "0 0 18px #25e4ff, 0 0 36px #25e4ff, 0 0 56px #25e4ff",
    duration: 0.9,
    ease: "power2.out"
  }).to(links, {
    textShadow: "0 0 0px #25e4ff",
    duration: 1.2,
    ease: "power2.inOut",
    onComplete: () => {
      // Keep active link pulsing
      if (activeLink) {
        gsap.to(activeLink, {
          textShadow: "0 0 10px #25e4ff, 0 0 22px #25e4ff, 0 0 42px #25e4ff",
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    }
  });

  links.forEach((link) => {
    const ripple = link.querySelector(".ripple");

    link.addEventListener("mouseenter", () => {
      gsap.fromTo(
        link,
        {
          textShadow: "0 0 4px #25e4ff"
        },
        {
          textShadow: "0 0 16px #25e4ff, 0 0 32px #25e4ff",
          duration: 0.4
        }
      );

      if (ripple) {
        gsap.fromTo(
          ripple,
          {
            opacity: 0,
            scale: 0.3
          },
          {
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
          }
        );
      }
    });

    link.addEventListener("mouseleave", () => {
      if (link === activeLink) return;

      gsap.to(link, {
        textShadow: "0 0 0px transparent",
        duration: 0.45,
        ease: "power2.out"
      });
    });
  });
});
