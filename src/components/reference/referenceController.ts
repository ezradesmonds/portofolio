import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {desktopMotion} from './desktopMotion';

gsap.registerPlugin(ScrollTrigger);
let dispose:(()=>void)|undefined;
function setup(){
 dispose?.();
 const root=document.querySelector<HTMLElement>('[data-reference]');if(!root)return;
 document.documentElement.classList.add('studio-enhanced');
 const abort=new AbortController(),{signal}=abort;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),desktop=matchMedia('(min-width: 1000px)');
 let paused=false;try{paused=sessionStorage.getItem('ezra-reference-motion')==='paused';}catch{}
 let context:gsap.Context|undefined,cleanupMotion:(()=>void)|undefined;
 const configure=()=>{
  context?.revert();cleanupMotion?.();cleanupMotion=undefined;
  const off=paused||reduced.matches;
  root.classList.toggle('motion-paused',off||!desktop.matches);
  document.documentElement.dataset.motion=off?'paused':'active';
  window.dispatchEvent(new Event('studio:motion'));
  root.querySelectorAll<HTMLButtonElement>('[data-reference-motion]').forEach(button=>{button.setAttribute('aria-pressed',String(paused));button.setAttribute('aria-label',paused?button.dataset.resume!:button.dataset.pause!);button.textContent=button.closest('.sidebar')?(paused?'▷':'Ⅱ'):(paused?button.dataset.resume!:button.dataset.pause!);});
  context=gsap.context(()=>{
   if(off)return;
   if(desktop.matches)cleanupMotion=desktopMotion(root);
   else gsap.from('.hero-title>span',{y:25,opacity:0,duration:.65,stagger:.1,clearProps:'all'});
  },root);
  ScrollTrigger.refresh();
 };
 root.querySelectorAll('[data-reference-motion]').forEach(button=>button.addEventListener('click',()=>{paused=!paused;try{sessionStorage.setItem('ezra-reference-motion',paused?'paused':'active');}catch{}configure();},{signal}));
 reduced.addEventListener('change',configure,{signal});desktop.addEventListener('change',configure,{signal});
 const menu=root.querySelector<HTMLElement>('#mobile-menu')!,menuButton=root.querySelector<HTMLButtonElement>('[data-menu]')!;
 const closeMenu=()=>{menu.hidden=true;menuButton.setAttribute('aria-expanded','false');};
 menuButton.addEventListener('click',()=>{menu.hidden=!menu.hidden;menuButton.setAttribute('aria-expanded',String(!menu.hidden));},{signal});
 menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu,{signal}));
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!menu.hidden){closeMenu();menuButton.focus();}},{signal});
 const sidebar=root.querySelector('.sidebar')!;
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;const name=entry.target.id==='journey'?'about':entry.target.id;sidebar.classList.toggle('is-visible',name!=='home');root.querySelectorAll('.nav-panel a').forEach(link=>{if(link.getAttribute('href')===`#${name}`)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}),{rootMargin:'-15% 0px -60% 0px'});
 root.querySelectorAll('section[id]').forEach(section=>observer.observe(section));
 root.querySelectorAll<HTMLButtonElement>('[data-gallery-move]').forEach(button=>button.addEventListener('click',()=>{
  const track=root.querySelector<HTMLElement>('.project-list')!,card=track.querySelector<HTMLElement>('.project')!;
  const amount=(card.offsetWidth+24)*Number(button.dataset.galleryMove),trigger=ScrollTrigger.getById('work-gallery');
  if(trigger)window.scrollTo({top:Math.min(trigger.end,Math.max(trigger.start,scrollY+amount)),behavior:'smooth'});
  else track.scrollBy({left:amount,behavior:paused||reduced.matches?'instant':'smooth'});
 },{signal}));
 root.querySelectorAll<HTMLElement>('.project').forEach((card,i)=>card.addEventListener('focusin',event=>{
  if(!(event.target instanceof HTMLElement)||!event.target.matches(':focus-visible'))return;
  const trigger=ScrollTrigger.getById('work-gallery');if(trigger)window.scrollTo({top:Math.min(trigger.end,trigger.start+i*(card.offsetWidth+24)),behavior:'instant'});
 },{signal}));
 let refreshFrame=0;
 const refresh=()=>{cancelAnimationFrame(refreshFrame);refreshFrame=requestAnimationFrame(()=>ScrollTrigger.refresh());};
 // Media dimensions are reserved in CSS. Refreshing every lazy-image load interrupts
 // native smooth anchor navigation; only disclosure geometry needs an explicit refresh.
 root.querySelectorAll('details').forEach(d=>d.addEventListener('toggle',refresh,{signal}));
 document.fonts.ready.then(()=>{if(!signal.aborted)configure();});
 dispose=()=>{abort.abort();context?.revert();cleanupMotion?.();observer.disconnect();cancelAnimationFrame(refreshFrame);};
}
setup();document.addEventListener('astro:page-load',setup);document.addEventListener('astro:before-swap',()=>dispose?.());
