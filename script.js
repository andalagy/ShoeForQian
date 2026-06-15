const root = document.getElementById('experience');
const dots = [...document.querySelectorAll('.stage-dot')];
const dialLabel = document.getElementById('dialLabel');
const claimButton = document.getElementById('claimButton');
const sizeStatus = document.getElementById('sizeStatus');
const sizesEl = document.getElementById('sizes');
const details = {
  leather: 'Full-grain hide burnished until the surface holds light like oil on stone.',
  stitching: 'A recessed line of tonal stitches locks the upper with measured, architectural tension.',
  structure: 'The shaft is blocked to stand cleanly, then softened where the ankle naturally bends.',
  sole: 'A stacked dark sole lowers the silhouette and gives the object its grounded weight.'
};
const order = ['discovery','examination','claim'];
let stage = 'discovery';
let selectedSize = null;
function setPointer(x, y){root.style.setProperty('--mx', `${x}px`);root.style.setProperty('--my', `${y}px`)}
addEventListener('pointermove', e => setPointer(e.clientX, e.clientY), {passive:true});
setPointer(innerWidth/2, innerHeight/2);
function setStage(next){ if(stage === 'collected') return; stage = next; root.className = `experience stage-${next}`; dots.forEach(d=>d.classList.toggle('active', d.dataset.stage===next)); dialLabel.textContent = next[0].toUpperCase()+next.slice(1); }
dots.forEach(dot => dot.addEventListener('click', () => setStage(dot.dataset.stage)));
addEventListener('wheel', e => { if(stage === 'collected') return; const i=order.indexOf(stage); setStage(order[Math.max(0, Math.min(order.length-1, i + (e.deltaY > 0 ? 1 : -1)))]); }, {passive:true});
addEventListener('keydown', e => { if(!['ArrowRight','ArrowDown','ArrowLeft','ArrowUp'].includes(e.key)) return; const i=order.indexOf(stage); const dir=['ArrowRight','ArrowDown'].includes(e.key)?1:-1; setStage(order[Math.max(0, Math.min(order.length-1, i+dir))]); });
document.querySelectorAll('.mark').forEach(mark => mark.addEventListener('click', () => { document.querySelectorAll('.mark').forEach(m=>m.classList.remove('active')); mark.classList.add('active'); document.querySelector('#detailCopy .label').textContent = mark.textContent; document.querySelector('#detailCopy .statement').textContent = details[mark.dataset.detail]; setPointer(innerWidth * parseFloat(mark.style.getPropertyValue('--x')) / 100, innerHeight * parseFloat(mark.style.getPropertyValue('--y')) / 100); }));
[38,39,40,41,42,43,44,45].forEach(size => { const b=document.createElement('button'); b.className='size'; b.textContent=size; b.disabled=[39,45].includes(size); b.setAttribute('aria-label', b.disabled ? `Size ${size} unavailable` : `Select size ${size}`); b.addEventListener('click',()=>{ selectedSize=size; document.querySelectorAll('.size').forEach(s=>s.classList.remove('selected')); b.classList.add('selected'); sizeStatus.textContent=`FORM ${size} SELECTED.`; claimButton.disabled=false; claimButton.classList.add('ready'); }); sizesEl.appendChild(b); });
claimButton.addEventListener('click', () => { if(!selectedSize) return; stage='collected'; root.className='experience stage-collected'; });
document.getElementById('returnButton').addEventListener('click', () => { stage='claim'; root.className='experience stage-claim'; });
root.focus({preventScroll:true});
