const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav-links');
toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close menu':'Open menu')});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false')}));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}}),{threshold:.14});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const track=document.querySelector('.review-track');let reviewIndex=0;
function slideReviews(direction){const cards=[...document.querySelectorAll('.review-card')];if(!track||!cards.length)return;const visible=window.innerWidth<=680?1:3;const max=Math.max(0,cards.length-visible);reviewIndex=Math.max(0,Math.min(max,reviewIndex+direction));const offset=cards[reviewIndex].offsetLeft-cards[0].offsetLeft;track.style.transform=`translateX(-${offset}px)`}
document.querySelector('.review-next')?.addEventListener('click',()=>slideReviews(1));
document.querySelector('.review-prev')?.addEventListener('click',()=>slideReviews(-1));
window.addEventListener('resize',()=>slideReviews(0));document.querySelector('#year').textContent=new Date().getFullYear();

const heroSlides=[
  {kicker:'INTERIORS, WITH INTENTION',title:'A home that feels<br><em>like you.</em>',description:'Considered details. Honest materials. Spaces that make everyday life feel a little more beautiful.',image:'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=88',alt:'Warm contemporary living room designed for comfortable everyday living',stamp:'MADE FOR<br>YOUR MOMENTS'},
  {kicker:'MADE FOR EVERYDAY LIVING',title:'Thoughtful spaces,<br><em>beautifully lived.</em>',description:'From the first sketch to the final fitting, we make the details work for your everyday routine.',image:'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=88',alt:'Bright contemporary home interior with warm natural finishes',stamp:'DESIGNED AROUND<br>YOUR LIFE'},
  {kicker:'COIMBATORE, MADE MORE BEAUTIFUL',title:'Your next chapter<br><em>starts at home.</em>',description:'Explore custom kitchens, calm bedrooms and complete home interiors, planned around you.',image:'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1800&q=88',alt:'Modern modular kitchen with warm cabinetry and refined finishes',stamp:'CRAFTED WITH<br>CARE IN COIMBATORE'}
];
heroSlides.forEach(slide=>{const preload=new Image();preload.src=slide.image});
let heroIndex=0;
const heroImage=document.querySelector('#hero-image');
function showHero(index){
  heroIndex=(index+heroSlides.length)%heroSlides.length;
  const slide=heroSlides[heroIndex];
  document.querySelector('#hero-kicker').textContent=slide.kicker;
  document.querySelector('#hero-title').innerHTML=slide.title;
  document.querySelector('#hero-description').textContent=slide.description;
  document.querySelector('#hero-number').textContent=String(heroIndex+1).padStart(2,'0');
  document.querySelector('#hero-current').textContent=String(heroIndex+1).padStart(2,'0');
  document.querySelector('#hero-stamp').innerHTML=slide.stamp;
  heroImage.alt=slide.alt;
  heroImage.classList.add('changing');
  window.setTimeout(()=>{heroImage.src=slide.image;heroImage.classList.remove('changing')},140);
  document.querySelectorAll('.hero-dots button').forEach((dot,i)=>{dot.classList.toggle('active',i===heroIndex);dot.setAttribute('aria-current',i===heroIndex?'true':'false')});
}
document.querySelector('.hero-next')?.addEventListener('click',()=>showHero(heroIndex+1));
document.querySelector('.hero-prev')?.addEventListener('click',()=>showHero(heroIndex-1));
document.querySelectorAll('.hero-dots button').forEach((dot,i)=>dot.addEventListener('click',()=>showHero(i)));
let heroTimer=window.setInterval(()=>{if(!document.hidden)showHero(heroIndex+1)},5000);
const videoButtons=[...document.querySelectorAll('.video-play[data-video-id]')];
let activeVideoModal=null;
function closeVideoModal(){
  if(!activeVideoModal)return;
  const {modal,trigger}=activeVideoModal;
  modal.remove();activeVideoModal=null;document.body.classList.remove('video-modal-open');trigger?.focus();
}
function openVideoModal(button){
  closeVideoModal();
  if(location.protocol==='file:'){window.open('https://www.youtube.com/shorts/'+button.dataset.videoId,'_blank','noopener');return;}

  const modal=document.createElement('div');modal.className='video-modal';modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.setAttribute('aria-label','Video player');
  const dialog=document.createElement('div');dialog.className='video-modal-dialog';
  const close=document.createElement('button');close.className='video-modal-close';close.type='button';close.setAttribute('aria-label','Close video');close.textContent='×';
  const frame=document.createElement('iframe');frame.title='Fashion Interiors video';frame.src=`https://www.youtube.com/embed/${button.dataset.videoId}?autoplay=1&playsinline=1&rel=0`;frame.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';frame.referrerPolicy='strict-origin-when-cross-origin';frame.allowFullscreen=true;
  close.addEventListener('click',closeVideoModal);
  dialog.append(close,frame);modal.append(dialog);
  modal.addEventListener('click',event=>{if(event.target===modal)closeVideoModal()});
  document.body.append(modal);document.body.classList.add('video-modal-open');activeVideoModal={modal,trigger:button};close.focus();
}
videoButtons.forEach(button=>button.addEventListener('click',()=>openVideoModal(button)));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&activeVideoModal)closeVideoModal()});
