const products=[
 {name:'The Amara Dress',type:'dresses',desc:'Soft tailoring · Ready-to-wear',tone:'#d27868'},
 {name:'The Aura Set',type:'sets',desc:'Playful separates · Everyday',tone:'#e8d3a2'},
 {name:'The Yara Dress',type:'occasion',desc:'Statement silhouette · Occasion',tone:'#ad9bc7'},
 {name:'The Enyonam Dress',type:'dresses',desc:'Flattering fit · Ready-to-wear',tone:'#7b9d86'},
 {name:'Purple Bubu',type:'sets',desc:'Feminine ease · Everyday',tone:'#8f72b7'},
 {name:'The Sade Dress',type:'occasion',desc:'Elegant movement · Occasion',tone:'#496783'},
 {name:'The Aria Dress',type:'dresses',desc:'Playful detail · Ready-to-wear',tone:'#cfbd64'},
 {name:'The Zuri Set',type:'sets',desc:'Polished comfort · Everyday',tone:'#b76b54'}
];
const grid=document.querySelector('[data-products]');
const prices={'The Amara Dress':'GH₵ 850','The Aura Set':'GH₵ 720','The Yara Dress':'GH₵ 1,150','The Enyonam Dress':'GH₵ 980','Purple Bubu':'GH₵ 680','The Sade Dress':'GH₵ 1,250','The Aria Dress':'GH₵ 890','The Zuri Set':'GH₵ 760'};
const orderEmail='jessicaxr198@gmail.com';
document.querySelector('#email').closest('label').insertAdjacentHTML('afterend','<label for="phone">Phone number<input id="phone" type="tel" name="phone" required placeholder="e.g. 024 245 6876" /></label>');
const contactConnect=document.querySelector('footer > div:nth-child(3)');
contactConnect.innerHTML='<h3>Connect</h3><a href="tel:+233242456876">024 245 6876</a><a href="https://wa.me/233242456876" target="_blank" rel="noreferrer">WhatsApp</a><a href="https://www.tiktok.com/@house_of_aura1" target="_blank" rel="noreferrer">TikTok</a><a href="mailto:jessicaxr198@gmail.com">jessicaxr198@gmail.com</a>';
document.querySelector('.whatsapp-link').href='https://wa.me/233242456876';
document.querySelectorAll('a[href^="mailto:"]').forEach(a=>{a.href=`mailto:${orderEmail}`;a.textContent=orderEmail});
document.querySelector('#orderForm').addEventListener('submit',async e=>{e.stopImmediatePropagation();e.preventDefault();const form=e.currentTarget;const data=new FormData(form);data.append('_subject',`House of Aura order enquiry from ${data.get('name')}`);data.append('_captcha','false');try{const response=await fetch(`https://formsubmit.co/ajax/${orderEmail}`,{method:'POST',headers:{Accept:'application/json'},body:data});if(!response.ok)throw new Error('Submission failed');form.reset();document.querySelector('[data-success]').hidden=false}catch(error){alert('We could not send your enquiry right now. Please try again.')}},true);
function render(filter='all'){grid.innerHTML=products.filter(p=>filter==='all'||p.type===filter).map(p=>`<article class="product-card" data-name="${p.name}"><div class="product-image" style="--tone:${p.tone}"></div><div class="product-info"><h3>${p.name}</h3><p>${p.desc}</p><strong>${prices[p.name]}</strong></div></article>`).join('')}
const productImages={'Purple Bubu':'purple bubu.jpg','The Aura Set':'aura set.jpg','The Amara Dress':'amara dress.jpg','The Enyonam Dress':'enyonam dress.jpg','The Yara Dress':'yara dress.jpg','The Sade Dress':'sade dress.jpg'};
const baseRender=render;
render=(filter='all')=>{baseRender(filter);document.querySelectorAll('.product-card').forEach(card=>{const image=productImages[card.dataset.name];if(image){const photo=card.querySelector('.product-image');photo.style.backgroundImage=`url("${image}")`;photo.style.backgroundSize='cover';photo.style.backgroundPosition='center';photo.classList.add('has-photo')}})};
render();
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');render(btn.dataset.filter)}));
document.querySelectorAll('a[href="#shop"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();document.body.className='section-view view-shop';document.querySelectorAll('.filter').forEach(b=>b.classList.toggle('active',b.dataset.filter==='dresses'));render('dresses');document.querySelector('[data-mobile-menu]').classList.remove('open');window.scrollTo({top:0,behavior:'smooth'})}));
document.querySelector('[data-menu]').addEventListener('click',()=>document.querySelector('[data-mobile-menu]').classList.toggle('open'));
document.querySelectorAll('[data-section-view]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();document.body.className=`section-view view-${a.dataset.sectionView}`;document.querySelector('[data-mobile-menu]').classList.remove('open');window.scrollTo({top:0,behavior:'smooth'})}));
document.querySelector('.brand').addEventListener('click',()=>document.body.className='');
document.querySelectorAll('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>document.querySelector('[data-mobile-menu]').classList.remove('open')));
document.querySelectorAll('a[href="#order"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();document.body.classList.add('order-view');document.querySelector('#order').scrollIntoView({behavior:'smooth'});}));
document.querySelectorAll('a[href^="#"]:not([href="#order"])').forEach(a=>a.addEventListener('click',()=>document.body.classList.remove('order-view')));
grid.addEventListener('click',()=>{document.body.className='section-view view-order';window.scrollTo({top:0,behavior:'smooth'})});
grid.addEventListener('click',e=>{const card=e.target.closest('.product-card');if(!card)return;document.querySelector('#dress').value=`I’m interested in ${card.dataset.name}. Please share availability and details.`;document.querySelector('#order').scrollIntoView({behavior:'smooth'})});
document.querySelector('#orderForm').addEventListener('submit',e=>{e.preventDefault();const data=new FormData(e.currentTarget);const subject=encodeURIComponent(`House of Aura order enquiry from ${data.get('name')}`);const body=encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nPieces: ${data.get('dress')}\nLocation: ${data.get('location')}`);window.location.href=`mailto:Jessicaxr198@gmail.com?subject=${subject}&body=${body}`;document.querySelector('[data-success]').hidden=false});
