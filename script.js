const products = [
  { id: "first-form", number: "01", name: "THE FIRST FORM", type: "Leather Boot", price: 680, material: "Full-grain leather", color: "Dark Brown", description: "Built as a single statement.", sizes: [38, 39, 40, 41, 42, 43, 44, 45], unavailableSizes: [39, 45] },
  { id: "second-line", number: "02", name: "THE SECOND LINE", type: "Chelsea Boot", price: 720, material: "Polished calf leather", color: "Black", description: "A clean form with no wasted gesture.", sizes: [38, 39, 40, 41, 42, 43, 44, 45], unavailableSizes: [40] },
  { id: "ground-cut", number: "03", name: "GROUND CUT", type: "Low Boot", price: 640, material: "Oiled leather", color: "Brown", description: "Low, dense, and made for contact.", sizes: [38, 39, 40, 41, 42, 43, 44, 45], unavailableSizes: [38, 44] },
  { id: "night-sole", number: "04", name: "NIGHT SOLE", type: "Tall Boot", price: 790, material: "Structured leather", color: "Black", description: "A vertical silhouette cut from shadow.", sizes: [38, 39, 40, 41, 42, 43, 44, 45], unavailableSizes: [42] },
  { id: "plain-object", number: "05", name: "PLAIN OBJECT", type: "Minimal Boot", price: 610, material: "Matte leather", color: "Warm Brown", description: "Nothing added. Nothing disguised.", sizes: [38, 39, 40, 41, 42, 43, 44, 45], unavailableSizes: [45] }
];

const detailCopy = {
  MATERIAL: 'The surface carries grain, pressure, and use.',
  FORM: 'The silhouette is held clean from heel to toe.',
  SOLE: 'Dense underfoot. Quiet in motion.'
};

const state = { currentIndex: 0, mode: 'intro', selectedProductId: null, selectedSize: null, cart: [] };
const $ = (s) => document.querySelector(s);
const app = $('#app');
const track = $('#shoeTrack');
const archiveLineEl = $('#archiveLine');
const activeNameEl = $('#activeName');
const activeCountEl = $('#activeCount');
const inspectNumberEl = $('#inspectNumber');
const inspectNameEl = $('#inspectName');
const inspectTypeEl = $('#inspectType');
const inspectDescriptionEl = $('#inspectDescription');
const inspectMaterialEl = $('#inspectMaterial');
const inspectColorEl = $('#inspectColor');
const inspectPriceEl = $('#inspectPrice');
const inspectObjectEl = $('#inspectObject');
const detailTextEl = $('#detailText');
const sizeLineEl = $('#sizeLine');
const sizeStatusEl = $('#sizeStatus');
const claimActionEl = $('#claimAction');
const returnToLineEl = $('#returnToLine');
const confirmReturnEl = $('#confirmReturn');
let drag = { active: false, startX: 0, startOffset: 0, offset: 0, lastX: 0, lastT: 0, velocity: 0, inspect: false, moved: false };
let snapTimer;

function shoeSvg(product) {
  const tall = product.id === 'night-sole';
  const low = product.id === 'ground-cut';
  const chelsea = product.id === 'second-line';
  const plain = product.id === 'plain-object';
  const leather = product.color.includes('Black') ? '#151310' : product.color.includes('Warm') ? '#5A3826' : '#2C1C14';
  const accent = product.color.includes('Black') ? '#34302a' : '#704832';
  const shaftTop = tall ? 70 : low ? 235 : 130;
  const shaftBottom = low ? 330 : 390;
  const toeLift = chelsea ? 425 : 448;
  const heelH = plain ? 78 : tall ? 116 : 94;
  return `<svg class="shoe-svg" viewBox="0 0 760 560" aria-hidden="true">
    <defs><linearGradient id="g-${product.id}" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="${accent}"/><stop offset=".46" stop-color="${leather}"/><stop offset="1" stop-color="#080808"/></linearGradient><filter id="shadow-${product.id}" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="28" stdDeviation="18" flood-color="#000" flood-opacity=".72"/></filter></defs>
    <g filter="url(#shadow-${product.id})">
      <ellipse class="shoe-shadow" cx="382" cy="507" rx="288" ry="34" fill="#000" opacity=".58"/>
      <path class="upper" d="M174 ${shaftTop} C242 ${shaftTop - 32} 350 ${shaftTop - 16} 391 ${shaftTop + 22} C374 ${shaftBottom - 96} 392 ${shaftBottom - 42} 468 ${shaftBottom} C548 ${shaftBottom + 42} 632 ${shaftBottom + 20} 696 ${toeLift} C722 468 714 493 676 505 L173 505 C129 476 129 370 189 335 C174 266 158 180 174 ${shaftTop}Z" fill="url(#g-${product.id})"/>
      <path class="heel" d="M127 421 L217 421 L203 ${421 + heelH} L139 ${421 + heelH} Z" fill="#100b08"/>
      <path class="sole" d="M112 488 C260 514 514 514 704 489 C731 502 724 529 696 540 C512 558 262 558 104 538 C84 523 88 501 112 488Z" fill="#0c0b0a"/>
      <path class="welt" d="M162 475 C305 493 525 493 681 476" fill="none" stroke="#8F8A80" stroke-width="4" opacity=".46"/>
      <path class="highlight" d="M232 ${shaftTop + 28} C286 ${shaftTop + 9} 344 ${shaftTop + 18} 362 ${shaftTop + 45} M272 364 C356 337 458 355 535 405 M530 437 C591 439 635 449 674 472" fill="none" stroke="#F1EEE8" stroke-width="3" opacity=".13"/>
      ${chelsea ? '<path d="M390 150 C424 184 425 260 401 313" fill="none" stroke="#8F8A80" stroke-width="14" opacity=".28"/>' : ''}
      ${plain ? '<path d="M185 352 C294 319 444 326 559 411" fill="none" stroke="#080808" stroke-width="10" opacity=".24"/>' : ''}
    </g></svg>`;
}

function renderShoes() {
  track.innerHTML = products.map((p, i) => `<button class="shoe-item" data-index="${i}" aria-label="Examine ${p.name}">${shoeSvg(p)}</button>`).join('');
  track.querySelectorAll('.shoe-item').forEach(btn => btn.addEventListener('click', () => {
    if (!drag.moved && Number(btn.dataset.index) === state.currentIndex) openInspect();
    setTimeout(() => { drag.moved = false; }, 0);
  }));
  updateLine();
}

function setMode(mode) { state.mode = mode; app.className = `experience mode-${mode}`; }
function updateLine() {
  drag.offset = -state.currentIndex * 32;
  track.style.setProperty('--offset', `${drag.offset}vw`);
  [...track.children].forEach((el, i) => {
    const d = Math.abs(i - state.currentIndex);
    el.classList.toggle('active', i === state.currentIndex);
    el.style.setProperty('--distance', d);
  });
  const p = products[state.currentIndex];
  activeNameEl.textContent = p.name; activeCountEl.textContent = `${p.number} / 05`;
}
function move(delta) { state.currentIndex = Math.max(0, Math.min(products.length - 1, state.currentIndex + delta)); updateLine(); }
function snapFromOffset() { state.currentIndex = Math.max(0, Math.min(products.length - 1, Math.round(-drag.offset / 32))); updateLine(); }
function openInspect() { state.selectedProductId = products[state.currentIndex].id; state.selectedSize = null; renderInspect(); setMode('inspect'); }
function renderInspect() {
  const p = products[state.currentIndex];
  inspectNumberEl.textContent = p.number; inspectNameEl.textContent = p.name; inspectTypeEl.textContent = p.type; inspectDescriptionEl.textContent = p.description;
  inspectMaterialEl.textContent = p.material; inspectColorEl.textContent = p.color; inspectPriceEl.textContent = `$${p.price}`; inspectObjectEl.innerHTML = shoeSvg(p);
  detailTextEl.textContent = detailCopy.MATERIAL; document.querySelectorAll('.detail-mark').forEach(m => m.classList.toggle('active', m.dataset.detail === 'MATERIAL'));
  sizeLineEl.innerHTML = p.sizes.map(size => `<button class="size-mark" type="button" ${p.unavailableSizes.includes(size) ? 'disabled' : ''} aria-label="${p.unavailableSizes.includes(size) ? `Size ${size} unavailable` : `Select size ${size}`}">${size}</button>`).join('');
  sizeStatusEl.textContent = 'NO SIZE SELECTED'; claimActionEl.disabled = true; claimActionEl.classList.remove('ready');
  sizeLineEl.querySelectorAll('.size-mark:not(:disabled)').forEach(btn => btn.addEventListener('click', () => { state.selectedSize = btn.textContent; sizeLineEl.querySelectorAll('.size-mark').forEach(b => b.classList.remove('selected')); btn.classList.add('selected'); sizeStatusEl.textContent = `FORM ${state.selectedSize} SELECTED`; claimActionEl.disabled = false; claimActionEl.classList.add('ready'); }));
}
function confirmClaim() {
  const p = products[state.currentIndex]; const item = { id: p.id, name: p.name, size: state.selectedSize, price: p.price };
  state.cart.push(item); localStorage.setItem('qianshoes:lastSelection', JSON.stringify(item)); setMode('confirmation');
}

renderShoes(); setTimeout(() => setMode('line'), 1500);
archiveLineEl.addEventListener('pointerdown', startLine); track.addEventListener('pointerdown', startLine);
function startLine(e) { if (state.mode !== 'line') return; drag.active = true; drag.moved = false; drag.startX = drag.lastX = e.clientX; drag.startOffset = drag.offset; drag.lastT = performance.now(); track.setPointerCapture?.(e.pointerId); }
addEventListener('pointermove', e => { if (drag.active) { const now = performance.now(); const dx = e.clientX - drag.startX; if (Math.abs(dx) > 6) drag.moved = true; drag.offset = drag.startOffset + (dx / innerWidth) * 100; drag.offset = Math.min(0, Math.max(-(products.length - 1) * 32, drag.offset)); track.style.setProperty('--offset', `${drag.offset}vw`); drag.velocity = (e.clientX - drag.lastX) / Math.max(1, now - drag.lastT); drag.lastX = e.clientX; drag.lastT = now; } if (drag.inspect) { const r = Math.max(-12, Math.min(12, (e.clientX - drag.startX) / 14)); inspectObjectEl.style.setProperty('--rotate', `${r}deg`); } });
addEventListener('pointerup', () => { if (drag.active) { drag.active = false; clearTimeout(snapTimer); snapTimer = setTimeout(snapFromOffset, 80); } drag.inspect = false; });
addEventListener('wheel', e => { if (state.mode === 'line') { e.preventDefault(); drag.offset -= (e.deltaY || e.deltaX) * .04; drag.offset = Math.min(0, Math.max(-(products.length - 1) * 32, drag.offset)); track.style.setProperty('--offset', `${drag.offset}vw`); clearTimeout(snapTimer); snapTimer = setTimeout(snapFromOffset, 180); } }, { passive: false });
inspectObjectEl.addEventListener('pointerdown', e => { if (state.mode === 'inspect') { drag.inspect = true; drag.startX = e.clientX; inspectObjectEl.setPointerCapture?.(e.pointerId); } });
document.querySelectorAll('.detail-mark').forEach(btn => btn.addEventListener('click', () => { document.querySelectorAll('.detail-mark').forEach(b => b.classList.remove('active')); btn.classList.add('active'); detailTextEl.textContent = detailCopy[btn.dataset.detail]; }));
returnToLineEl.addEventListener('click', () => setMode('line')); confirmReturnEl.addEventListener('click', () => setMode('line')); claimActionEl.addEventListener('click', () => !claimActionEl.disabled && confirmClaim());
addEventListener('keydown', e => { if (state.mode === 'line') { if (e.key === 'ArrowRight') move(1); if (e.key === 'ArrowLeft') move(-1); if (e.key === 'Enter') openInspect(); } else if (e.key === 'Escape') setMode('line'); });
