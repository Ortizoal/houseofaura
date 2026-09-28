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
function render(filter='all'){grid.innerHTML=products.filter(p=>filter==='all'||p.type===filter).map(p=>`<article class="product-card" data-name="${p.name}"><div class="product-image" style="--tone:${p.tone}"></div><div class="product-info"><h3>${p.name}</h3><p>${p.desc}</p></div></article>`).join('')}
render();
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');render(btn.dataset.filter)}));
document.querySelector('[data-menu]').addEventListener('click',()=>document.querySelector('[data-mobile-menu]').classList.toggle('open'));
document.querySelectorAll('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>document.querySelector('[data-mobile-menu]').classList.remove('open')));
grid.addEventListener('click',e=>{const card=e.target.closest('.product-card');if(!card)return;document.querySelector('#dress').value=`I’m interested in ${card.dataset.name}. Please share availability and details.`;document.querySelector('#order').scrollIntoView({behavior:'smooth'})});
document.querySelector('#orderForm').addEventListener('submit',e=>{e.preventDefault();const data=new FormData(e.currentTarget);const subject=encodeURIComponent(`House of Aura order enquiry from ${data.get('name')}`);const body=encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nPieces: ${data.get('dress')}\nLocation: ${data.get('location')}`);window.location.href=`mailto:Jessicaxr198@gmail.com?subject=${subject}&body=${body}`;document.querySelector('[data-success]').hidden=false});
