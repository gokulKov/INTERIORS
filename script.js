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

const filterButtons=[...document.querySelectorAll('.room-filter')];
const roomPhoto=(id)=>`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1000&q=85`;
const roomGallery=[
  {key:'living',title:'Living Room',images:[
    roomPhoto('1600210492486-724fe5c67fb0'),roomPhoto('1630699144035-c0f6311ec482'),roomPhoto('1758448511322-8bfc73daf606'),roomPhoto('1776303054657-4d21e2a6ef18'),roomPhoto('1701092868263-2ed67ac8dfa0'),roomPhoto('1653972233739-667468bbd5a9')]},
  {key:'master',title:'Master Bedroom',images:[
    'https://www.davidweekleyhomes.com/media/CommunityImage/a2f78e21-3d08-4a6f-aea2-bc16b0c97dba.jpg?h=800','https://koala.sh/api/image/v2-u5x9c-qh5r5.jpg?dream=&height=832&width=1216','https://ucghawaii.com/wp-content/uploads/2025/01/Leonardo_Kino_XL_luxury_master_bedroom_3.jpg','https://koala.sh/api/image/v2-a3060-1ijqa.jpg?dream=&height=832&width=1216','https://st.hzcdn.com/simgs/pictures/bedrooms/villa-calabria-award-winning-custom-home-masterpiece-design-group-img~85c1059f099c41bf_9-1703-1-88e3a57.jpg','https://kindredhomes.imgix.net/media-library/2023/10/1250/296-duxbury-ct-sunnyvale-tx-75182-High-Res-19.jpg?auto=format&fit=crop&h=432&q=60&w=530']},
  {key:'kitchen',title:'Modular Kitchen',images:[
    'https://vaastukitchen.com/home-slider/slide6-mobile.jpg','https://koala.sh/api/image/v2-a5wpu-jjhcr.jpg?dream=&height=832&width=1216','https://static.wixstatic.com/media/93633e_e5d09489a6e84ccdb02c959d41f0adbd~mv2.png/v1/fill/w_980%2Ch_551%2Cal_c%2Cq_90%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/93633e_e5d09489a6e84ccdb02c959d41f0adbd~mv2.png','https://images.prismic.io/boskyinterior/acEUgJGXnQHGY2Iq_Whisk_0f6ca3c4fae28c4a0d443955befcc733dr.jpeg?auto=format%2Ccompress&h=545&rect=0%2C0%2C1408%2C767&w=1000','https://www.nakshastore.com/uploads/article/Modular%20Kitchen%20%26%20Home%20Interior%20Design%20%20Naksha%20Store_1765791364.jpg','https://shoplvng.co.in/cdn/shop/files/LVNG_-_MODERN_KITCHEN_12_1000x.png?v=1695904541']},
  {key:'dining',title:'Dining Room',images:[
    roomPhoto('1713192707180-74d7affad614'),roomPhoto('1740009151858-33ecbc455c2c'),roomPhoto('1713192707415-86198e4d8490'),roomPhoto('1721742141232-3cb44e2b452e'),roomPhoto('1633505412556-82c0921e8f4a'),roomPhoto('1730104231026-46e3cf7c3141')]},
  {key:'pooja',title:'Pooja Room',images:[
    'https://lightandlayer.com/img/image6_pooja-room-design-ideas_traditional-artwork.jpg','https://st.hzcdn.com/simgs/d66180e60a5e01c2_14-9748/_.jpg','https://www.decorpot.com/images/blogimage61160823Marble.jpg','https://assets-news.housing.com/news/wp-content/uploads/2021/03/16173604/A-look-into-south-Indian-traditional-homes-and-interior-decor-image-16.jpg','https://www.decorpot.com/images/blogimage680402662marble.jpg','https://img.interiorcompany.com/interior/webproduct/837638513356283047487.png?aio=w-768%3B']},
  {key:'bathroom',title:'Bathroom',images:[
    roomPhoto('1695002817411-203c7f19dfa3'),roomPhoto('1723258339959-61093d7d86d3'),roomPhoto('1638799869566-b17fa794c4de'),'https://volzero.com/img/article/104837_70872.jpg','https://gardilo.com/images/large/designing-your-own-bathroom-modern-fixtures.webp','https://genroom.io/images/blog/best-ai-bathroom-design-tools-cover-1780325340.png']},
  {key:'office',title:'Home Office',images:[
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85','https://www.decorhomeideas.com/wp-content/uploads/2024/11/home-office-setups-12.jpg','https://photos.zillowstatic.com/fp/e1fd370838d619029870444b69123699-cc_ft_960.jpg','https://jlclosets.com/?lm=682DD2C4&n=jkbi4RZXNNUfNB5oyhsw&seraph_accel_gi=wp-content%2Fuploads%2F2025%2F03%2Fcontemporary-home-office-floating-shelves-L-shaped-desk-768x768.jpg','https://radyinterior.ae/wp-content/uploads/2025/01/Home-office-interior-design-1024x768.webp','https://www.davidweekleyhomes.com/media/CommunityImage/bd531824-7033-41ec-bdd6-afd10d4edc56.jpg?h=800']},
  {key:'dressing',title:'Dressing Room',images:[
    'https://s.alicdn.com/%40sc04/kf/H1f3394f02bb24526a8c622e14b58d6cfb.jpg_640x640.jpg','https://s.alicdn.com/%40sc04/kf/H1f79dc57f1a549e08e25ca54d73f94fdI/Vermonhouzz-Premium-Luxury-Walk-in-Closet-Integrated-Vanity-Table-Design-for-High-End-Villa-and-Hotel-Suite-Collaboration.jpg','https://st.hzcdn.com/fimgs/pictures/closets/interiors-schneider-construction-and-restoration-img~95c1983a0a569bd4_1350-1-f00086d-w720-h720-b2-p0.jpg','https://i.pinimg.com/originals/f2/36/90/f236904960efc060e482014c15029285.jpg','https://blkp.co.id/uploads/blkp/220715cnQ4jzRAJgNU0GlukioW7dmKC68fTHx9s2qrVEZSDvLPhI5MwBFae3pYOy1t.jpg','https://images.prismic.io/boskyinterior/aYsN5d0YXLCxVpQD_c8ce927a-6f38-44f6-a6e9-ed3f4377cd72.jpeg?auto=format%2Ccompress&h=545&rect=0%2C0%2C1408%2C767&w=1000']},
  {key:'theatre',title:'Home Theatre',images:[
    'https://cdn.prod.website-files.com/670b870a7253a1dc8a5d70c8/68ff3a8b0b5e8a76059a3ddd_IMG_1036-v2.jpg','https://www.home-theater-projector-guru.com/storage/161477/crafting-the-perfect-movie-screen-wall-for-your-home-theater.jpeg','https://primepix.in/storage/media/image-2-1783321168-aUj7h.jpeg','https://primepix.in/storage/media/image-3-1783319605-OiLpM.jpeg','https://www.homeautomationchennai.com/images/home-theatre.webp','https://img.onmanorama.com/content/dam/mm/en/lifestyle/decor/images/2025/4/13/home-theatre-c.jpg/photos/1x1/photo.jpg']},
  {key:'guest',title:'Guest Bedroom',images:[
    'https://images.squarespace-cdn.com/content/v1/63dde481bbabc6724d988548/2d3c9827-23e8-4723-a0b4-c20be6c2cc8b/6.jpeg','https://koala.sh/api/image/v2-a2qmd-aa947.jpg?dream=&height=832&width=1216','https://aetherisconcepts.com/cdn/shop/articles/Gemini_Generated_Image_82gik882gik882gi.png?v=1775394248','https://static.eclife.com/jeditor/01744084552139.webp','https://images.squarespace-cdn.com/content/v1/63dde481bbabc6724d988548/347c144f-d398-4bce-9b63-02962e1763ef/2.jpg','https://www.decorpot.com/images/blogimage2125438691budget-friendly-designs.jpg']}
];
const roomGrid=document.querySelector('.room-grid');
roomGallery.forEach(room=>room.images.forEach((src,index)=>{
  const card=document.createElement('article');
  card.className='room-card reveal';
  card.dataset.room=room.key;
  card.innerHTML=`<img src="${src}" alt="${room.title} interior inspiration, design ${index+1}" loading="lazy" decoding="async"><div class="room-card-copy"><span>${String(index+1).padStart(2,'0')} / INSPIRATION</span><h3>${room.title}</h3><a href="tel:+919500652563" aria-label="Enquire about a ${room.title.toLowerCase()} interior">Enquire ↗</a></div>`;
  roomGrid.append(card);
  observer.observe(card);
}));
const roomCards=[...document.querySelectorAll('.room-card')];
filterButtons.forEach(button=>button.addEventListener('click',()=>{
  const filter=button.dataset.filter;
  filterButtons.forEach(item=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active))});
  roomCards.forEach(card=>{const show=filter==='all'||card.dataset.room===filter;card.hidden=!show;if(show){card.classList.remove('in-view');requestAnimationFrame(()=>card.classList.add('in-view'))}});
}));
