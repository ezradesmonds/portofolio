// document.addEventListener('DOMContentLoaded', function() {
//     // 1. Initialize Lenis for Smooth Scrolling
//     const lenis = new Lenis({
//         duration: 1.2,
//         easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing for a nice feel
//         direction: 'vertical',
//         gestureDirection: 'vertical',
//         smooth: true,
//         mouseMultiplier: 1,
//         smoothTouch: false,
//         touchMultiplier: 2,
//         infinite: false,
//     });

//     function raf(time) {
//         lenis.raf(time);
//         requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);

//     // Register GSAP ScrollTrigger plugin
//     gsap.registerPlugin(ScrollTrigger);

//     // 2. GSAP Animations

//     // Hero Section Entrance Animation
//     // Animates elements with 'reveal-element' class that also have 'delay-X'
//     // This runs once on page load for the hero section
//     gsap.from(".hero-content .reveal-element", {
//         opacity: 0,
//         y: 50,
//         duration: 1.2,
//         ease: "power3.out",
//         stagger: 0.2, // Stagger the animation of elements
//         delay: 0.5 // Start animation after a short delay
//     });

//     // General Reveal Animation for sections
//     // Animates elements with 'reveal-element' when they enter the viewport
//     gsap.utils.toArray(".projects-section .reveal-element, .skills-section .reveal-element, .contact-section .reveal-element").forEach(element => {
//         gsap.from(element, {
//             opacity: 0,
//             y: 50,
//             duration: 1,
//             ease: "power2.out",
//             scrollTrigger: {
//                 trigger: element,
//                 start: "top 85%", // When the top of the element is 85% down from the top of the viewport
//                 end: "bottom center",
//                 // markers: true, // Uncomment for debugging scroll trigger
//                 toggleActions: "play none none reverse" // Play on scroll in, reverse on scroll out
//             }
//         });
//     });

//     // Staggered Project Card Animation on Scroll
//     gsap.from(".project-card", {
//         opacity: 0,
//         y: 80,
//         stagger: 0.15, // Stagger each card
//         duration: 0.8,
//         ease: "back.out(1.7)",
//         scrollTrigger: {
//             trigger: ".project-grid",
//             start: "top 80%", // When the top of the grid enters view
//             // markers: true,
//             toggleActions: "play none none reverse"
//         }
//     });

//     // Staggered Skill Item Animation on Scroll
//     gsap.from(".skill-item", {
//         opacity: 0,
//         scale: 0.8,
//         stagger: 0.1,
//         duration: 0.6,
//         ease: "power2.out",
//         scrollTrigger: {
//             trigger: ".skills-grid",
//             start: "top 85%",
//             // markers: true,
//             toggleActions: "play none none reverse"
//         }
//     });


//     // Smooth Scroll for Navigation Links (using Lenis)
//     document.querySelectorAll('nav ul li a').forEach(anchor => {
//         anchor.addEventListener('click', function (e) {
//             e.preventDefault();
//             const targetId = this.getAttribute('href');
//             // Use Lenis.scrollTo for smooth scroll
//             lenis.scrollTo(targetId, {
//                 offset: -70, // Adjust for fixed header height
//                 duration: 1.2,
//                 easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//             });
//         });
//     });

//     // Contact Form Submission (remains client-side only for this example)
//     const contactForm = document.getElementById('contactForm');
//     if (contactForm) {
//         contactForm.addEventListener('submit', function(event) {
//             event.preventDefault();
//             alert('Thank you for your message! I will get back to you shortly.');
//             contactForm.reset();
//         });
//     }
// });