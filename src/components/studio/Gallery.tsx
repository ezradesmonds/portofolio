import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { ProjectArtifact } from '../../types';
import { studioCopy } from '../../i18n/studio';

export default function Gallery({items, lang, scene, priority=false}: {items:ProjectArtifact[];lang:'en'|'id';scene?:string;priority?:boolean}) {
  const [index,setIndex]=useState(0), [manual,setManual]=useState(false), [paused,setPaused]=useState(false);
  const [ready,setReady]=useState(false);
  const dialog=useRef<HTMLDialogElement>(null), root=useRef<HTMLDivElement>(null), touch=useRef(0), beat=useRef(0);
  const reduced=useReducedMotion(), c=studioCopy(lang);
  useEffect(()=>{
    setReady(true);
    const el=root.current?.closest('[data-scene]');
    const update=(event:Event)=>{ const detail=(event as CustomEvent).detail; beat.current=detail.beat; if(!detail.active)setManual(false); if(!manual || !detail.active)setIndex(detail.beat % Math.max(1,items.length)); };
    const preference=()=>setPaused(document.documentElement.dataset.motion==='paused');
    preference(); el?.addEventListener('studio:beat',update); window.addEventListener('studio:motion',preference);
    return()=>{el?.removeEventListener('studio:beat',update);window.removeEventListener('studio:motion',preference);};
  },[manual,items.length]);
  if(!items.length)return <p>{lang==='id'?'Media belum tersedia.':'Media not yet available.'}</p>;
  const choose=(i:number)=>{setIndex((i+items.length)%items.length);setManual(true);};
  const media=(large=false)=>items[index].kind==='video'
    ? <video key={items[index].src} controls playsInline preload="none" poster={items[index].poster} src={items[index].src} aria-label={items[index].alt}/>
    : <img key={items[index].src} src={items[index].src} alt={items[index].alt} width="1600" height="1000" loading={priority?'eager':'lazy'} fetchPriority={priority?'high':undefined} decoding="async" onError={e=>{e.currentTarget.alt=`${items[index].alt} — ${lang==='id'?'Gambar tidak tersedia':'Image unavailable'}`;}}/>;
  return <div className="studio-gallery" ref={root}>
    <motion.div className="gallery-screen" key={index} initial={false} animate={{opacity:1}} transition={{duration:reduced||paused?0:.2}}
      onTouchStart={e=>touch.current=e.touches[0].clientX} onTouchEnd={e=>{const distance=touch.current-e.changedTouches[0].clientX;if(Math.abs(distance)>60)choose(index+(distance>0?1:-1));}}>
      {media()}{ready&&<button className="enlarge" onClick={()=>dialog.current?.showModal()} aria-label={c.enlarge}>↗</button>}
    </motion.div>
    {ready&&<div className="gallery-controls"><button onClick={()=>choose(index-1)} aria-label={c.previous}>←</button>
      <div className="gallery-thumbnails">{items.map((item,i)=><button key={item.src} onClick={()=>choose(i)} aria-label={`${i+1}: ${item.alt}`} aria-pressed={index===i}>{item.kind==='video'?<span>▶</span>:<img src={item.poster??item.src} alt="" width="72" height="45" loading="lazy"/>}</button>)}</div>
      <button onClick={()=>choose(index+1)} aria-label={c.next}>→</button>
    </div>}
    <p className="media-caption"><span>{String(index+1).padStart(2,'0')} / {String(items.length).padStart(2,'0')}</span> {items[index].caption}</p>
    {scene&&ready&&<button className="text-button" disabled={!manual} onClick={()=>{setManual(false);setIndex(beat.current%items.length);}}>{manual?`${c.manual} · ${c.follow} ↻`:c.follow}</button>}
    <noscript><div className="fallback-artifacts">{items.slice(1).map(a=><a key={a.src} href={a.src}>{a.caption} ↗</a>)}</div></noscript>
    <dialog ref={dialog} className="media-dialog" aria-label={items[index].caption || c.enlarge} onClick={e=>{if(e.target===dialog.current)dialog.current.close();}} onClose={()=>{dialog.current?.querySelectorAll('video').forEach(v=>v.pause());}}>
      <button autoFocus onClick={()=>dialog.current?.close()}>{c.close} ×</button>{media(true)}<p>{items[index].caption}</p>
      <button onClick={()=>choose(index-1)}>{c.previous}</button><button onClick={()=>choose(index+1)}>{c.next}</button>
    </dialog>
  </div>;
}
