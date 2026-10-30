const roomCategories={
  living:{title:'Living Room',description:'Comfortable living rooms shaped around the way you unwind, gather and welcome people in.'},
  bedrooms:{title:'Bedrooms',description:'Explore restful bedroom ideas, from personal master suites to warm, welcoming guest rooms.'},
  master:{title:'Master Bedroom',description:'A calmer personal retreat with thoughtful storage, soft lighting and details made to feel like yours.'},
  kitchen:{title:'Modular Kitchen',description:'Smart kitchen layouts with practical storage, considered finishes and room for everyday cooking.'},
  dining:{title:'Dining Room',description:'Dining spaces designed for easy everyday meals and longer conversations with family.'},
  pooja:{title:'Pooja Room',description:'Quiet devotional spaces with thoughtful materials, warm light and carefully planned storage.'},
  bathroom:{title:'Bathroom',description:'Fresh, functional bathroom ideas with balanced lighting, durable finishes and useful details.'},
  office:{title:'Home Office',description:'Focused workspaces with comfortable proportions, good storage and a place for everything.'},
  dressing:{title:'Dressing Room',description:'Organised dressing spaces with wardrobes and display planned around your routine.'},
  theatre:{title:'Home Theatre',description:'A cosy home cinema with considered seating, lighting and entertainment storage.'},
  guest:{title:'Guest Bedroom',description:'A welcoming guest bedroom with comfortable layers and practical storage.'}
};
const query=new URLSearchParams(location.search);
const selectedKey=query.get('room')||'living';
const selected=roomCategories[selectedKey]||roomCategories.living;
const sourceRooms=window.roomGallery||[];
let collections=selectedKey==='bedrooms'?sourceRooms.filter(room=>room.key==='master'||room.key==='guest'):sourceRooms.filter(room=>room.key===selectedKey);
const images=collections.flatMap(room=>room.images.map(src=>({src,title:room.title})));
document.title=`${selected.title} interior design in Coimbatore | Fashion Interiors`;
document.querySelector('meta[name="description"]').content=`Explore ${selected.title.toLowerCase()} interior design ideas by Fashion Interiors in Coimbatore. Browse room inspiration and talk to our design team.`;
document.querySelector('#room-title').innerHTML=`${selected.title}<br><em>made for living.</em>`;
document.querySelector('#room-description').textContent=selected.description;
document.querySelector('#room-result-count').textContent=`${images.length} ideas to explore`;
document.querySelector('#room-year').textContent=new Date().getFullYear();
const grid=document.querySelector('#room-detail-grid');
images.forEach(({src,title},index)=>{
  const card=document.createElement('article');
  card.className='room-detail-card';
  const image=document.createElement('img');
  image.src=src;image.alt=`${title} interior inspiration in Coimbatore, idea ${index+1}`;image.loading='lazy';image.decoding='async';
  image.addEventListener('error',()=>card.classList.add('image-unavailable'),{once:true});
  const copy=document.createElement('div');copy.className='room-detail-card-copy';
  const number=document.createElement('span');number.textContent=`${String(index+1).padStart(2,'0')} / INSPIRATION`;
  const heading=document.createElement('h2');heading.textContent=title;
  const link=document.createElement('a');link.href='tel:+919500652563';link.textContent='Enquire about this room ↗';link.setAttribute('aria-label',`Enquire about a ${title.toLowerCase()} interior`);
  copy.append(number,heading,link);card.append(image,copy);grid.append(card);
});