import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
let dispose: (()=>void)|undefined;
function setup(){
  dispose?.();
  const root=document.querySelector<HTMLElement>('[data-product-home]');
  if(!root)return;
  document.documentElement.classList.add('pp-enhanced','studio-enhanced');
  const abort=new AbortController();
  const {signal}=abort;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let paused=false;
  try{paused=sessionStorage.getItem('ezra-product-motion')==='paused';}catch{/* Storage is optional. */}
  let context:gsap.Context|undefined;
  let panelTween:gsap.core.Tween|undefined;
  const panels=[...root.querySelectorAll<HTMLElement>('[data-preview-panel]')];
  const buttons=[...root.querySelectorAll<HTMLButtonElement>('[data-preview-select]')];
  let current=0;
  const motionOff=()=>paused||reduced.matches;
  const select=(index:number)=>{
    if(index===current)return;
    panelTween?.kill();
    gsap.set(panels,{clearProps:'opacity,transform'});
    current=index;
    panels.forEach((panel,i)=>{
      panel.classList.toggle('is-current',i===index);
      panel.setAttribute('aria-hidden',String(i!==index));
      panel.tabIndex=i===index?0:-1;
      buttons[i].setAttribute('aria-pressed',String(i===index));
    });
    if(!motionOff())panelTween=gsap.fromTo(panels[index],{opacity:.3,y:12},{opacity:1,y:0,duration:.35,ease:'power2.out',clearProps:'opacity,transform'});
  };
  buttons.forEach((button,index)=>button.addEventListener('click',()=>select(index),{signal}));
  const configure=()=>{
    context?.revert();panelTween?.kill();gsap.set(panels,{clearProps:'opacity,transform'});
    document.documentElement.dataset.motion=motionOff()?'paused':'active';
    window.dispatchEvent(new Event('studio:motion'));
    root.querySelectorAll<HTMLButtonElement>('[data-pp-motion]').forEach(b=>{b.textContent=paused?b.dataset.resume!:b.dataset.pause!;b.setAttribute('aria-pressed',String(paused));});
    if(motionOff())return;
    context=gsap.context(()=>{
      if(scrollY<100)gsap.from('[data-entrance]',{y:25,opacity:0,duration:.75,stagger:.12,ease:'power3.out',clearProps:'all'});
      root.querySelectorAll<HTMLElement>('[data-media-reveal]').forEach(media=>{
        gsap.fromTo(media,{clipPath:'inset(9% 0 9% 0 round 9px)'},{clipPath:'inset(0% 0 0% 0 round 9px)',duration:.8,ease:'power3.out',scrollTrigger:{trigger:media,start:'top 90%',once:true},clearProps:'clipPath'});
      });
      if(matchMedia('(min-width: 1001px)').matches){
        gsap.to('[data-aperture]',{y:-22,ease:'none',scrollTrigger:{trigger:'.pp-opening',start:'top top',end:'bottom top',scrub:.6}});
      }
    },root);
  };
  root.querySelectorAll('[data-pp-motion]').forEach(b=>b.addEventListener('click',()=>{paused=!paused;try{sessionStorage.setItem('ezra-product-motion',paused?'paused':'active');}catch{}configure();},{signal}));
  reduced.addEventListener('change',configure,{signal});
  const desktop=matchMedia('(min-width: 1001px)');desktop.addEventListener('change',configure,{signal});
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(!entry.isIntersecting)return;root.querySelectorAll('.pp-header nav a').forEach(a=>{if(a.getAttribute('href')===`#${entry.target.id}`)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});});
  },{rootMargin:'-15% 0px -55% 0px'});
  root.querySelectorAll('#work,#approach,#about,#contact').forEach(el=>observer.observe(el));
  let frame=0;
  root.querySelectorAll('details').forEach(d=>d.addEventListener('toggle',()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>ScrollTrigger.refresh());},{signal}));
  document.fonts.ready.then(()=>{if(!signal.aborted)configure();});
  dispose=()=>{abort.abort();context?.revert();panelTween?.kill();observer.disconnect();cancelAnimationFrame(frame);document.documentElement.classList.remove('pp-enhanced');};
}
setup();
document.addEventListener('astro:page-load',setup);
document.addEventListener('astro:before-swap',()=>dispose?.());
