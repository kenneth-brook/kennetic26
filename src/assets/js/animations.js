import gsap from 'gsap'

gsap.from('.hero h1', {
  duration: 1.5,
  y: 50,
  opacity: 0,
  ease: 'power3.out'
})
