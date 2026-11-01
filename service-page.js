const serviceQuery = new URLSearchParams(location.search);
const services = window.interiorServices || [];
const activeService = services.find(service => service.key === serviceQuery.get('service')) || services[0];
const galleryRooms = window.roomGallery || [];
const fallbackPhotos = [
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1100&q=85',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1100&q=85',
  'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1100&q=85',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1100&q=85',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1100&q=85',
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1100&q=85',
  'https://images.unsplash.com/photo-1630699144035-c0f6311ec482?auto=format&fit=crop&w=1100&q=85',
  'https://images.unsplash.com/photo-1713192707180-74d7affad614?auto=format&fit=crop&w=1100&q=85',
  'https://images.unsplash.com/photo-1695002817411-203c7f19dfa3?auto=format&fit=crop&w=1100&q=85',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1100&q=85'
];
const roomImages = keys => keys.flatMap(key => galleryRooms.find(room => room.key === key)?.images || []);
const matchingRoomImages = [...new Set(roomImages(activeService.rooms))];
const selectedServiceImages = window.serviceImageSets?.[activeService.key] || [activeService.image, ...matchingRoomImages];
const chosenImages = [...new Set(selectedServiceImages.filter(Boolean))].slice(0, 10);
while (chosenImages.length < 10) chosenImages.push(fallbackPhotos[chosenImages.length]);
const backupImages = [...new Set([...matchingRoomImages, ...fallbackPhotos])].filter(src => !chosenImages.includes(src));

document.title = `${activeService.title} in Coimbatore | Fashion Interiors`;
document.querySelector('meta[name="description"]').content = `${activeService.desc} Explore 10 ${activeService.title.toLowerCase()} ideas from Fashion Interiors in Coimbatore.`;
document.querySelector('#service-kicker').textContent = `${activeService.label} · COIMBATORE`;
document.querySelector('#service-title').innerHTML = `${activeService.title}<br><em>made for living.</em>`;
document.querySelector('#service-description').textContent = activeService.desc;
document.querySelector('#service-gallery-title').textContent = `${activeService.title}, thoughtfully chosen.`;
document.querySelector('#service-result-count').textContent = '10 ideas to explore';
document.querySelector('#service-year').textContent = new Date().getFullYear();
if (activeService.image) document.querySelector('#service-hero').style.setProperty('--service-hero-image', `url("${activeService.image}")`);
const message = `Hi Fashion Interiors, I am interested in ${activeService.title} for my home in Coimbatore. I would like to discuss my requirements and get a consultation. Please let me know the next steps. Thank you!`;
document.querySelector('#service-whatsapp').href = `https://wa.me/919500652563?text=${encodeURIComponent(message)}`;

const serviceGrid = document.querySelector('#service-detail-grid');
chosenImages.forEach((src, index) => {
  const card = document.createElement('article');
  card.className = 'service-detail-card';
  const image = document.createElement('img');
  image.src = src;
  image.alt = `${activeService.title} design inspiration in Coimbatore, idea ${index + 1}`;
  image.loading = index < 3 ? 'eager' : 'lazy';
  image.decoding = 'async';
  image.referrerPolicy = 'no-referrer';
  image.addEventListener('error', () => {
    if (!image.dataset.fallback && backupImages[index] && image.src !== backupImages[index]) {
      image.dataset.fallback = 'used';
      image.src = backupImages[index];
    } else {
      card.classList.add('image-unavailable');
      image.remove();
    }
  });
  const overlay = document.createElement('div');
  overlay.className = 'service-detail-card-copy';
  const label = document.createElement('span');
  label.textContent = `${activeService.label} · ${String(index + 1).padStart(2, '0')}`;
  const title = document.createElement('h2');
  title.textContent = `${activeService.title} idea ${String(index + 1).padStart(2, '0')}`;
  overlay.append(label, title);
  card.append(image, overlay);
  serviceGrid.append(card);
});
