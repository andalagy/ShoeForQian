const products = [
  {
    id: "first-form",
    number: "01",
    name: "THE FIRST FORM",
    type: "Leather Boot",
    price: 680,
    material: "Full-grain leather",
    color: "Dark Brown",
    description: "Built as a single statement.",
    detailMaterial: "The surface carries grain, pressure, and use.",
    detailForm: "The upper is shaped with as few interruptions as possible.",
    detailSole: "Dense underfoot. Quiet in motion.",
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    unavailableSizes: [39, 45],
    silhouette: "boot"
  },
  {
    id: "second-line",
    number: "02",
    name: "THE SECOND LINE",
    type: "Chelsea Boot",
    price: 720,
    material: "Polished calf leather",
    color: "Black",
    description: "A clean form with no wasted gesture.",
    detailMaterial: "Polished calf leather reflects light in a controlled line.",
    detailForm: "Elastic side panels keep the profile uninterrupted.",
    detailSole: "A low stacked sole keeps the boot close to the ground.",
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    unavailableSizes: [40],
    silhouette: "chelsea"
  },
  {
    id: "ground-cut",
    number: "03",
    name: "GROUND CUT",
    type: "Low Boot",
    price: 640,
    material: "Oiled leather",
    color: "Brown",
    description: "Low, dense, and made for contact.",
    detailMaterial: "Oiled leather darkens naturally where the hand and ground meet it.",
    detailForm: "The lowered ankle line creates a heavier stance.",
    detailSole: "The sole is wide, grounded, and visually quiet.",
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    unavailableSizes: [38, 44],
    silhouette: "low"
  },
  {
    id: "night-sole",
    number: "04",
    name: "NIGHT SOLE",
    type: "Tall Boot",
    price: 790,
    material: "Structured leather",
    color: "Black",
    description: "A vertical silhouette cut from shadow.",
    detailMaterial: "Structured leather holds the shaft upright without excess decoration.",
    detailForm: "The tall shaft makes the boot read as one continuous column.",
    detailSole: "The darker sole disappears into the shadow below the foot.",
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    unavailableSizes: [42],
    silhouette: "tall"
  },
  {
    id: "plain-object",
    number: "05",
    name: "PLAIN OBJECT",
    type: "Minimal Boot",
    price: 610,
    material: "Matte leather",
    color: "Warm Brown",
    description: "Nothing added. Nothing disguised.",
    detailMaterial: "Matte leather reduces shine so the shape becomes the focus.",
    detailForm: "The silhouette is plain, almost severe, with no decorative excess.",
    detailSole: "A thin sole keeps the object minimal and direct.",
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    unavailableSizes: [45],
    silhouette: "minimal"
  }
];

const state = { currentIndex: 0, mode: 'intro', selectedProductId: null, selectedSize: null, cart: [] };
const $ = (s) => document.querySelector(s);
const app = $('#app');
const track = $('#shoeTrack');
let drag = { active: false, startX: 0, startOffset: 0, offset: 0, lastX: 0, lastT: 0, velocity: 0, inspect: false, moved: false };
let wheelLocked = false;
let snapTimer;

function createShoeSVG(product) {
  const palettes = {
    "Dark Brown": { leather: '#2C1C14', accent: '#704832', deep: '#100b08', sole: '#0c0b0a' },
    Black: { leather: '#151310', accent: '#34302a', deep: '#050505', sole: '#030303' },
    Brown: { leather: '#3b2519', accent: '#7b5037', deep: '#120c08', sole: '#0b0907' },
    "Warm Brown": { leather: '#5A3826', accent: '#8a5a3d', deep: '#1d120d', sole: '#14100d' }
  };
  const palette = palettes[product.color] || palettes["Dark Brown"];
  const shapes = {
    boot: {
      upper: 'M174 130 C232 106 342 112 388 155 C374 256 390 338 468 388 C548 430 632 416 697 447 C725 464 715 493 676 505 L173 505 C129 476 129 370 189 335 C174 266 158 180 174 130Z',
      heel: 'M126 415 L219 415 L205 515 L137 515 Z',
      sole: 'M106 486 C255 516 520 516 704 489 C733 503 724 531 695 541 C511 559 258 558 101 537 C81 520 87 500 106 486Z',
      highlight: 'M226 161 C282 138 338 146 365 174 M274 363 C358 336 462 354 537 406 M529 438 C591 440 636 450 674 472',
      detail: '<path d="M198 260 C235 251 276 253 315 268" fill="none" stroke="#8F8A80" stroke-width="4" opacity=".32"/><path d="M210 312 C247 304 289 309 329 326" fill="none" stroke="#8F8A80" stroke-width="3" opacity=".24"/>'
    },
    chelsea: {
      upper: 'M196 164 C268 132 366 140 416 184 C402 269 418 345 489 386 C558 426 628 421 693 442 C724 454 720 485 682 498 L181 498 C135 473 136 386 197 342 C188 282 174 207 196 164Z',
      heel: 'M132 421 L210 421 L199 504 L145 504 Z',
      sole: 'M125 485 C283 506 510 506 696 488 C721 499 714 521 686 529 C501 543 282 542 119 526 C97 513 103 495 125 485Z',
      highlight: 'M250 173 C315 154 367 167 399 199 M289 364 C384 342 482 362 550 404',
      detail: '<path d="M388 168 C424 202 428 269 402 326" fill="#0b0b0b" opacity=".45"/><path d="M394 179 C417 211 419 267 400 312" fill="none" stroke="#8F8A80" stroke-width="5" opacity=".3"/>'
    },
    low: {
      upper: 'M164 256 C257 214 397 236 466 335 C538 361 617 389 696 430 C730 448 721 487 676 503 L154 503 C116 478 125 405 194 362 C179 323 151 283 164 256Z',
      heel: 'M119 421 L209 421 L198 513 L132 513 Z',
      sole: 'M93 482 C256 521 526 523 715 491 C749 506 739 537 701 549 C502 569 246 566 88 540 C68 519 73 496 93 482Z',
      highlight: 'M205 278 C276 248 379 265 430 333 M270 386 C396 362 545 389 665 454',
      detail: '<path d="M184 360 C284 326 416 344 536 405" fill="none" stroke="#080808" stroke-width="9" opacity=".28"/>'
    },
    tall: {
      upper: 'M183 68 C250 45 353 55 394 98 C374 229 386 340 468 391 C548 433 630 420 696 448 C724 464 715 493 676 506 L172 506 C129 477 129 370 189 335 C176 247 155 112 183 68Z',
      heel: 'M121 403 L220 403 L205 523 L132 523 Z',
      sole: 'M103 488 C254 518 520 518 704 489 C736 503 727 534 695 545 C511 563 257 562 99 540 C78 522 84 501 103 488Z',
      highlight: 'M235 93 C289 78 342 83 369 115 M223 197 C272 181 333 188 368 220 M286 365 C370 339 466 357 537 407',
      detail: '<path d="M219 104 C210 201 221 287 251 350" fill="none" stroke="#8F8A80" stroke-width="4" opacity=".22"/><path d="M374 103 C354 205 359 302 389 360" fill="none" stroke="#000" stroke-width="7" opacity=".25"/>'
    },
    minimal: {
      upper: 'M189 154 C260 128 356 139 397 180 C384 278 400 347 470 388 C546 427 620 419 690 445 C717 459 710 487 674 499 L178 499 C137 475 138 384 196 341 C185 273 171 199 189 154Z',
      heel: 'M135 424 L207 424 L198 498 L149 498 Z',
      sole: 'M128 487 C289 503 506 503 689 489 C711 498 704 516 681 523 C505 535 288 534 124 522 C105 512 110 496 128 487Z',
      highlight: 'M242 178 C304 158 359 169 388 201 M295 368 C397 346 501 365 572 406',
      detail: '<path d="M202 343 C315 316 454 329 563 407" fill="none" stroke="#080808" stroke-width="5" opacity=".18"/>'
    }
  };
  const shape = shapes[product.silhouette] || shapes.boot;
  return `<svg class="shoe-svg shoe-${product.silhouette}" viewBox="0 0 760 560" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="g-${product.id}" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="${palette.accent}"/><stop offset=".48" stop-color="${palette.leather}"/><stop offset="1" stop-color="${palette.deep}"/></linearGradient>
      <filter id="shadow-${product.id}" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="28" stdDeviation="18" flood-color="#000" flood-opacity=".72"/></filter>
    </defs>
    <g filter="url(#shadow-${product.id})">
      <ellipse class="shoe-shadow" cx="382" cy="507" rx="288" ry="34" fill="#000" opacity=".58"/>
      <path class="upper" d="${shape.upper}" fill="url(#g-${product.id})"/>
      ${shape.detail}
      <path class="heel" d="${shape.heel}" fill="${palette.deep}"/>
      <path class="sole" d="${shape.sole}" fill="${palette.sole}"/>
      <path class="welt" d="M162 475 C305 493 525 493 681 476" fill="none" stroke="#8F8A80" stroke-width="4" opacity=".46"/>
      <path class="highlight" d="${shape.highlight}" fill="none" stroke="#F1EEE8" stroke-width="3" opacity=".15"/>
    </g>
  </svg>`;
}

const shoeSvg = createShoeSVG;

function renderShoes() {
  track.innerHTML = products.map((p, i) => `<button class="shoe-item" type="button" data-index="${i}" aria-label="Select or examine ${p.name}">${shoeSvg(p)}</button>`).join('');
  track.addEventListener('click', event => {
    if (drag.moved) { drag.moved = false; event.preventDefault(); return; }
    const shoe = event.target.closest('.shoe-item');
    if (!shoe || !track.contains(shoe)) return;
    handleShoeClick(Number(shoe.dataset.index));
  });
  renderLine();
}

function setMode(mode) { state.mode = mode; app.className = `experience mode-${mode}`; }
function circularDistance(index) {
  const total = products.length;
  const direct = Math.abs(index - state.currentIndex);
  return Math.min(direct, total - direct);
}
function renderLine() {
  drag.offset = -state.currentIndex * 32;
  track.style.setProperty('--offset', `${drag.offset}vw`);
  [...track.children].forEach((el, i) => {
    const d = circularDistance(i);
    el.classList.toggle('active', i === state.currentIndex);
    el.style.setProperty('--distance', d);
    el.setAttribute('aria-current', i === state.currentIndex ? 'true' : 'false');
    el.setAttribute('aria-label', `${i === state.currentIndex ? 'Examine' : 'Select'} ${products[i].name}`);
  });
  const p = products[state.currentIndex];
  activeName.textContent = p.name; activeCount.textContent = `${p.number} / ${String(products.length).padStart(2, '0')}`;
}
function goToIndex(nextIndex) {
  const total = products.length;
  state.currentIndex = ((nextIndex % total) + total) % total;
  if (state.mode !== 'inspect') state.selectedSize = null;
  renderLine();
}
function move(delta) { goToIndex(state.currentIndex + delta); }
function snapFromOffset() { goToIndex(Math.round(-drag.offset / 32)); }
function handleShoeClick(index) {
  if (state.mode !== 'line') return;

  if (index !== state.currentIndex) {
    goToIndex(index);
  } else {
    openInspection(index);
  }
}
function openInspection(index = state.currentIndex) { state.currentIndex = index; state.selectedProductId = products[state.currentIndex].id; state.selectedSize = null; renderLine(); renderInspect(); setMode('inspect'); }
function renderInspect() {
  const p = products[state.currentIndex];
  inspectNumber.textContent = p.number; inspectName.textContent = p.name; inspectType.textContent = p.type; inspectDescription.textContent = p.description;
  inspectMaterial.textContent = p.material; inspectColor.textContent = p.color; inspectPrice.textContent = `$${p.price}`; inspectObject.innerHTML = shoeSvg(p);
  detailText.textContent = p.detailMaterial; document.querySelectorAll('.detail-mark').forEach(m => m.classList.toggle('active', m.dataset.detail === 'MATERIAL'));
  sizeLine.innerHTML = p.sizes.map(size => `<button class="size-mark" type="button" ${p.unavailableSizes.includes(size) ? 'disabled' : ''} aria-label="${p.unavailableSizes.includes(size) ? `Size ${size} unavailable` : `Select size ${size}`}">${size}</button>`).join('');
  sizeStatus.textContent = 'NO SIZE SELECTED'; claimAction.disabled = true; claimAction.classList.remove('ready');
  sizeLine.querySelectorAll('.size-mark:not(:disabled)').forEach(btn => btn.addEventListener('click', () => { state.selectedSize = btn.textContent; sizeLine.querySelectorAll('.size-mark').forEach(b => b.classList.remove('selected')); btn.classList.add('selected'); sizeStatus.textContent = `FORM ${state.selectedSize} SELECTED`; claimAction.disabled = false; claimAction.classList.add('ready'); }));
}
function confirmClaim() {
  const p = products[state.currentIndex]; const item = { id: p.id, name: p.name, size: state.selectedSize, price: p.price };
  state.cart.push(item); localStorage.setItem('qianshoes:lastSelection', JSON.stringify(item)); setMode('confirmation');
}

renderShoes(); setTimeout(() => setMode('line'), 1500);
track.addEventListener('pointerdown', startLine);
function startLine(e) { if (state.mode !== 'line') return; drag.active = true; drag.moved = false; drag.startX = drag.lastX = e.clientX; drag.startOffset = drag.offset; drag.lastT = performance.now(); track.setPointerCapture?.(e.pointerId); }
addEventListener('pointermove', e => { if (drag.active) { const now = performance.now(); const dx = e.clientX - drag.startX; if (Math.abs(dx) > 8) drag.moved = true; drag.offset = drag.startOffset + (dx / innerWidth) * 120; track.style.setProperty('--offset', `${drag.offset}vw`); drag.velocity = (e.clientX - drag.lastX) / Math.max(1, now - drag.lastT); drag.lastX = e.clientX; drag.lastT = now; } if (drag.inspect) { const r = Math.max(-12, Math.min(12, (e.clientX - drag.startX) / 14)); inspectObject.style.setProperty('--rotate', `${r}deg`); } });
addEventListener('pointerup', () => { if (drag.active) { const dx = drag.lastX - drag.startX; drag.active = false; if (Math.abs(dx) > 24) move(dx < 0 ? 1 : -1); else renderLine(); } drag.inspect = false; });
function handleWheel(e) {
  if (state.mode !== 'line') return;
  e.preventDefault();
  if (wheelLocked) return;
  const direction = e.deltaY > 0 || e.deltaX > 0 ? 1 : -1;
  move(direction);
  wheelLocked = true;
  setTimeout(() => { wheelLocked = false; }, 600);
}
addEventListener('wheel', handleWheel, { passive: false });
inspectObject.addEventListener('pointerdown', e => { if (state.mode === 'inspect') { drag.inspect = true; drag.startX = e.clientX; inspectObject.setPointerCapture?.(e.pointerId); } });
document.querySelectorAll('.detail-mark').forEach(btn => btn.addEventListener('click', () => { document.querySelectorAll('.detail-mark').forEach(b => b.classList.remove('active')); btn.classList.add('active'); detailText.textContent = { MATERIAL: products[state.currentIndex].detailMaterial, FORM: products[state.currentIndex].detailForm, SOLE: products[state.currentIndex].detailSole }[btn.dataset.detail]; }));
returnToLine.addEventListener('click', () => setMode('line')); confirmReturn.addEventListener('click', () => setMode('line')); claimAction.addEventListener('click', () => !claimAction.disabled && confirmClaim());
document.querySelectorAll('.side-hit').forEach(zone => zone.addEventListener('click', () => move(Number(zone.dataset.direction))));
addEventListener('keydown', e => { if (state.mode === 'line') { if (e.key === 'ArrowRight') move(1); if (e.key === 'ArrowLeft') move(-1); if (e.key === 'Enter') openInspection(); } else if (e.key === 'Escape') setMode('line'); });
