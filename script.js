const cards=[...document.querySelectorAll('.card')];
const buttons=[...document.querySelectorAll('.menu button')];
const lightbox=document.getElementById('lightbox');
const lightboxImg=document.getElementById('lightboxImg');
const counter=document.getElementById('counter');
const close=document.getElementById('close');
const prev=document.getElementById('prev');
const next=document.getElementById('next');
let current=0;

function visibleCards(){
  return cards.filter(c=>c.style.display!=='none');
}
function showCard(card){
  const list=visibleCards();
  current=list.indexOf(card);
  lightboxImg.src=card.querySelector('img').src;
  lightboxImg.alt=card.querySelector('img').alt;
  counter.textContent=`${current+1} / ${list.length}`;
  lightbox.classList.add('show');
  lightbox.setAttribute('aria-hidden','false');
}
cards.forEach(card=>{
  card.querySelector('img').addEventListener('click',()=>showCard(card));
  card.querySelector('.open').addEventListener('click',()=>showCard(card));
});
buttons.forEach(btn=>{
  btn.addEventListener('click',()=>{
    buttons.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const target=btn.dataset.target;
    cards.forEach(card=>{
      card.style.display=(target==='all'||card.dataset.id===target)?'block':'none';
    });
  });
});
function move(step){
  const list=visibleCards();
  if(!list.length)return;
  current=(current+step+list.length)%list.length;
  lightboxImg.src=list[current].querySelector('img').src;
  lightboxImg.alt=list[current].querySelector('img').alt;
  counter.textContent=`${current+1} / ${list.length}`;
}
function hide(){lightbox.classList.remove('show');lightbox.setAttribute('aria-hidden','true')}
prev.addEventListener('click',()=>move(-1));
next.addEventListener('click',()=>move(1));
close.addEventListener('click',hide);
lightbox.addEventListener('click',e=>{if(e.target===lightbox)hide()});
document.addEventListener('keydown',e=>{
  if(!lightbox.classList.contains('show'))return;
  if(e.key==='Escape')hide();
  if(e.key==='ArrowLeft')move(-1);
  if(e.key==='ArrowRight')move(1);
});
