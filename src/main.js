// Main Application Entrypoint for Ofrenda Viva
// View Management, Interactive Altar, AI Oracle, Pioneers Gallery & Audio

import './style.css';
import { PetalSystem } from './petals.js';
import { soundscape } from './audio.js';
import { spiritRegistry, PIONEER_SPIRITS } from './spirits.js';
import { spiritAI } from './aiEngine.js';
import { AltarManager } from './altar.js';

// DOM Elements: Canvas & Views
const canvas = document.getElementById('petal-canvas');
const viewSections = document.querySelectorAll('.view-section');
const navLinkButtons = document.querySelectorAll('.nav-link-btn');
const footerNavLinks = document.querySelectorAll('.footer-nav-link');

// Navigation & Brand
const brandLink = document.getElementById('brand-link');
const btnEnterAltar = document.getElementById('btn-enter-altar');
const btnHeroLaunch = document.getElementById('btn-hero-launch');
const btnHeroOracle = document.getElementById('btn-hero-oracle');
const btnScatterHero = document.getElementById('btn-scatter-hero');
const btnBannerEnter = document.getElementById('btn-banner-enter');
const btnGotoPioneers = document.getElementById('btn-goto-pioneers');
const btnAltarToOracle = document.getElementById('btn-altar-to-oracle');
const btnQuickScatter = document.getElementById('btn-quick-scatter');

// Audio Controls
const btnSoundscape = document.getElementById('btn-soundscape');

// Altar Elements
const spiritPillsContainer = document.getElementById('spirit-pills');
const currentSpiritPhoto = document.getElementById('current-spirit-photo');
const spiritNameEl = document.getElementById('spirit-name');
const spiritEpithetEl = document.getElementById('spirit-epithet');
const spiritDatesEl = document.getElementById('spirit-dates');
const litCountEl = document.getElementById('lit-count');
const btnLightAll = document.getElementById('btn-light-all');
const btnSaveAltar = document.getElementById('btn-save-altar');
const btnViewStory = document.getElementById('btn-view-story');
const moodPills = document.querySelectorAll('.mood-pill');

// Oracle Elements
const oracleOutput = document.getElementById('oracle-output');
const consoleSpiritName = document.getElementById('console-spirit-name');
const consoleStatus = document.getElementById('console-status');
const generationMetrics = document.getElementById('generation-metrics');
const oracleUserPrompt = document.getElementById('oracle-user-prompt');
const btnInvokeAi = document.getElementById('btn-invoke-ai');
const btnCopyText = document.getElementById('btn-copy-text');
const btnSpeakText = document.getElementById('btn-speak-text');
const tabButtons = document.querySelectorAll('.tab-btn');
const quickChips = document.querySelectorAll('.chip-btn');

// Pioneers Grid
const pioneersGrid = document.getElementById('pioneers-grid');

// Modals
const btnAddAncestor = document.getElementById('btn-add-ancestor');
const ancestorModal = document.getElementById('ancestor-modal');
const btnCloseModal = document.getElementById('btn-close-modal');
const btnCancelModal = document.getElementById('btn-cancel-modal');
const ancestorForm = document.getElementById('ancestor-form');

const bioModal = document.getElementById('bio-modal');
const btnCloseBio = document.getElementById('btn-close-bio');
const bioTitle = document.getElementById('bio-title');
const bioBody = document.getElementById('bio-body');

const offeringModal = document.getElementById('offering-modal');
const btnCloseOffering = document.getElementById('btn-close-offering');
const btnCloseOfferingConfirm = document.getElementById('btn-close-offering-confirm');
const offeringLoreTitle = document.getElementById('offering-lore-title');
const offeringLoreSub = document.getElementById('offering-lore-sub');
const offeringLoreBody = document.getElementById('offering-lore-body');

const toast = document.getElementById('toast');

// State
let petalSystem = null;
let altarManager = null;
let activeMode = 'epitaph';
let isGenerating = false;
let currentView = 'landing';

// Toast Utility
function showToast(message, duration = 3000) {
  toast.textContent = message;
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, duration);
}

// ==========================================================================
// VIEW SWITCHER
// ==========================================================================
function switchView(viewName) {
  currentView = viewName;

  // Toggle sections
  viewSections.forEach(sec => {
    if (sec.id === `view-${viewName}`) {
      sec.classList.add('active');
    } else {
      sec.classList.remove('active');
    }
  });

  // Update navbar active states
  navLinkButtons.forEach(btn => {
    if (btn.dataset.view === viewName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Scroll to top smoothly
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Play subtle chime on view transition
  if (viewName === 'sanctuary') {
    soundscape.playChime(660);
    showToast('🕯️ Bienvenido al Santuario del Altar');
  } else if (viewName === 'oracle') {
    soundscape.playChime(528);
    showToast('🔮 En sintonía con el Oráculo del Espíritu');
  }
}

// ==========================================================================
// INITIALIZE APPLICATION
// ==========================================================================
function initApp() {
  // 1. Particle System
  petalSystem = new PetalSystem(canvas);
  petalSystem.start();

  // 2. Altar Manager
  altarManager = new AltarManager(petalSystem);

  // 3. Render Spirit Selectors & Pioneers Gallery
  renderSpiritPills();
  renderPioneersGallery();

  // 4. Bind Navigation Buttons
  bindNavigation();

  // 5. Bind Candle & Offering Interactivity
  bindCandleClicks();
  bindOfferingClicks();

  // 6. Bind Audio Toggle
  btnSoundscape.addEventListener('click', () => {
    const isPlaying = soundscape.toggle();
    if (isPlaying) {
      btnSoundscape.classList.add('active');
      showToast('🎶 Paisaje sonoro activado: Guitarra acústica, viento sagrado y fuego');
    } else {
      btnSoundscape.classList.remove('active');
      showToast('Silencio sagrado');
    }
  });

  // 7. Mood Atmosphere Pills
  moodPills.forEach(pill => {
    pill.addEventListener('click', () => {
      moodPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      document.body.className = pill.dataset.theme;
      soundscape.playChime(580);
    });
  });

  // 8. Scatter Petals
  if (btnScatterHero) {
    btnScatterHero.addEventListener('click', (e) => {
      soundscape.playChime(720);
      petalSystem.burstPetals(75, e.clientX, e.clientY);
      showToast('🌼 Lluvia de cempasúchil esparcida');
    });
  }

  if (btnQuickScatter) {
    btnQuickScatter.addEventListener('click', (e) => {
      soundscape.playChime(720);
      petalSystem.burstPetals(60, e.clientX, e.clientY);
      showToast('🌼 Lluvia de flores doradas');
    });
  }

  // 9. Light All Candles
  btnLightAll.addEventListener('click', () => {
    altarManager.lightAllCandles();
    updateCandleDOM();
    showToast('🕯️ Todas las veladoras están encendidas con devoción');
  });

  // 10. Oracle Mode Tabs
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeMode = btn.dataset.mode;
      triggerAIGeneration();
    });
  });

  // 11. Quick Prompt Suggestion Chips
  quickChips.forEach(chip => {
    chip.addEventListener('click', () => {
      oracleUserPrompt.value = chip.dataset.prompt;
      activeMode = 'whisper';
      tabButtons.forEach(b => b.classList.toggle('active', b.dataset.mode === 'whisper'));
      triggerAIGeneration();
      soundscape.playMarimba(520);
    });
  });

  // 12. Oracle Invocation
  btnInvokeAi.addEventListener('click', triggerAIGeneration);
  oracleUserPrompt.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') triggerAIGeneration();
  });

  // 13. Copy Output
  btnCopyText.addEventListener('click', () => {
    navigator.clipboard.writeText(oracleOutput.innerText).then(() => {
      showToast('📋 Versos copiados al portapapeles');
    });
  });

  // 14. Ethereal Speech Recitation
  btnSpeakText.addEventListener('click', () => {
    if (soundscape.isSpeaking) {
      soundscape.stopSpeaking();
      btnSpeakText.classList.remove('speaking');
      btnSpeakText.innerHTML = '🔊 Escuchar';
    } else {
      btnSpeakText.classList.add('speaking');
      btnSpeakText.innerHTML = '⏹️ Detener';
      soundscape.speakText(oracleOutput.innerText, () => {
        btnSpeakText.classList.remove('speaking');
        btnSpeakText.innerHTML = '🔊 Escuchar';
      });
      showToast('🗣️ Recitando versos sagrados');
    }
  });

  // 15. Custom Ancestor Modal
  btnAddAncestor.addEventListener('click', () => {
    ancestorModal.classList.remove('hidden');
  });
  btnCloseModal.addEventListener('click', () => ancestorModal.classList.add('hidden'));
  btnCancelModal.addEventListener('click', () => ancestorModal.classList.add('hidden'));
  ancestorForm.addEventListener('submit', handleAddAncestorSubmit);

  // 16. Bio Lore Modal
  btnViewStory.addEventListener('click', openBioModal);
  btnCloseBio.addEventListener('click', () => bioModal.classList.add('hidden'));

  // 17. Offering Lore Modal
  btnCloseOffering.addEventListener('click', () => offeringModal.classList.add('hidden'));
  btnCloseOfferingConfirm.addEventListener('click', () => offeringModal.classList.add('hidden'));

  // 18. Snapshot Postcard
  btnSaveAltar.addEventListener('click', saveAltarSnapshot);

  // 19. Copal Smoke Continuous Emitter
  initCopalSmokeEmitter();

  // 20. Initial Setup
  updateAltarDisplay();
  triggerAIGeneration();
}

// Bind Navigation
function bindNavigation() {
  navLinkButtons.forEach(btn => {
    btn.addEventListener('click', () => switchView(btn.dataset.view));
  });

  footerNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      switchView(link.dataset.view);
    });
  });

  brandLink.addEventListener('click', (e) => {
    e.preventDefault();
    switchView('landing');
  });

  if (btnEnterAltar) btnEnterAltar.addEventListener('click', () => switchView('sanctuary'));
  if (btnHeroLaunch) btnHeroLaunch.addEventListener('click', () => switchView('sanctuary'));
  if (btnHeroOracle) btnHeroOracle.addEventListener('click', () => switchView('oracle'));
  if (btnBannerEnter) btnBannerEnter.addEventListener('click', () => switchView('sanctuary'));
  if (btnGotoPioneers) btnGotoPioneers.addEventListener('click', () => switchView('pioneers'));
  if (btnAltarToOracle) btnAltarToOracle.addEventListener('click', () => switchView('oracle'));
}

// Continuous Copal Smoke Emitter
function initCopalSmokeEmitter() {
  const copalEl = document.getElementById('copal-burner');
  setInterval(() => {
    if (!copalEl || !petalSystem) return;
    if (currentView !== 'sanctuary') return;
    const rect = copalEl.getBoundingClientRect();
    petalSystem.addCopalSmoke(rect.left + rect.width / 2, rect.top + 10);
  }, 320);
}

// Render Spirit Pills
function renderSpiritPills() {
  spiritPillsContainer.innerHTML = '';
  const spirits = spiritRegistry.getAllSpirits();

  spirits.forEach(s => {
    const pill = document.createElement('button');
    pill.className = `spirit-pill ${s.id === altarManager.currentSpirit.id ? 'active' : ''}`;
    pill.innerHTML = `
      <img src="${s.image}" alt="${s.name}" class="pill-avatar" />
      <span>${s.name}</span>
    `;

    pill.addEventListener('click', () => {
      document.querySelectorAll('.spirit-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      altarManager.setSpirit(s.id);
      updateAltarDisplay();
      triggerAIGeneration();
      showToast(`🏵️ El altar ahora honra a ${s.name}`);
    });

    spiritPillsContainer.appendChild(pill);
  });
}

// Render Pioneers Gallery Cards
function renderPioneersGallery() {
  if (!pioneersGrid) return;
  pioneersGrid.innerHTML = '';

  PIONEER_SPIRITS.forEach(pioneer => {
    const card = document.createElement('div');
    card.className = 'pioneer-card';
    card.innerHTML = `
      <img src="${pioneer.image}" alt="${pioneer.name}" class="pioneer-img" />
      <div class="pioneer-info">
        <h3 class="pioneer-name">${pioneer.name}</h3>
        <p class="pioneer-epithet">${pioneer.epithet}</p>
        <span class="pioneer-years">${pioneer.years}</span>
        <p class="pioneer-bio">${pioneer.legacy}</p>
        <button class="btn-honor-pioneer" data-id="${pioneer.id}">
          🏵️ Honrar en el Altar
        </button>
      </div>
    `;

    const btnHonor = card.querySelector('.btn-honor-pioneer');
    btnHonor.addEventListener('click', () => {
      altarManager.setSpirit(pioneer.id);
      renderSpiritPills();
      updateAltarDisplay();
      triggerAIGeneration();
      switchView('sanctuary');
    });

    pioneersGrid.appendChild(card);
  });
}

// Update Altar Centerpiece Display with micro-animation
function updateAltarDisplay() {
  const spirit = altarManager.currentSpirit;
  const frame = document.getElementById('shrine-frame-el');
  if (frame) {
    frame.style.transform = 'scale(0.92) rotate(-2deg)';
    setTimeout(() => {
      frame.style.transform = '';
    }, 250);
  }

  currentSpiritPhoto.src = spirit.image;
  spiritNameEl.textContent = spirit.name;
  spiritEpithetEl.textContent = spirit.epithet;
  spiritDatesEl.textContent = spirit.years;
  consoleSpiritName.textContent = spirit.name;
}

// Bind Candles Click Handlers
function bindCandleClicks() {
  altarManager.candles.forEach(candle => {
    const el = document.getElementById(`candle-${candle.id}`);
    if (el) {
      el.addEventListener('click', () => {
        const isLit = altarManager.toggleCandle(candle.id, el);
        updateCandleDOM();
        if (isLit) {
          showToast(`🕯️ ${candle.label} encendida`);
        } else {
          showToast(`💨 ${candle.label} apagada`);
        }
      });
    }
  });
  updateCandleDOM();
}

// Bind Offering Clicks to Lore Popups
function bindOfferingClicks() {
  const offeringCards = document.querySelectorAll('.offering-card');
  offeringCards.forEach(card => {
    const offeringId = card.dataset.offeringId;
    if (!offeringId) return;

    card.addEventListener('click', () => {
      const lore = altarManager.interactOffering(offeringId, card);
      if (lore) {
        openOfferingLoreModal(lore);
      }
    });
  });
}

function openOfferingLoreModal(lore) {
  offeringLoreTitle.textContent = `🌺 ${lore.title}`;
  offeringLoreSub.textContent = `${lore.subtitle} • (${lore.origin})`;
  offeringLoreBody.innerHTML = `
    <div style="background: rgba(255, 183, 3, 0.1); border-left: 3px solid var(--cempasuchil-gold); padding: 0.85rem; border-radius: 0 8px 8px 0; margin-bottom: 0.5rem;">
      <h5 style="color: var(--cempasuchil-gold); margin-bottom: 0.3rem;">Simbolismo Ancestral:</h5>
      <p style="font-size: 0.95rem; line-height: 1.6;">${lore.lore}</p>
    </div>
    <p style="font-size: 0.82rem; color: #cbd5e1; font-style: italic;">
      "Al colocar esta ofrenda en el altar, nutres el alma en su visita anual y mantienes vivo el lazo sagrado entre vivos y difuntos."
    </p>
  `;
  offeringModal.classList.remove('hidden');
}

// Update Candle DOM State
function updateCandleDOM() {
  altarManager.candles.forEach(candle => {
    const el = document.getElementById(`candle-${candle.id}`);
    if (!el) return;
    const flame = el.querySelector('.flame');
    if (candle.lit) {
      flame.classList.remove('snuffed');
    } else {
      flame.classList.add('snuffed');
    }
  });
  litCountEl.textContent = altarManager.getLitCount();
}

// Trigger Local AI Generation with Streaming Typewriter
async function triggerAIGeneration() {
  if (isGenerating) return;
  isGenerating = true;

  soundscape.stopSpeaking();
  btnSpeakText.classList.remove('speaking');
  btnSpeakText.innerHTML = '🔊 Escuchar';

  const spirit = altarManager.currentSpirit;
  const prompt = oracleUserPrompt.value;
  consoleStatus.innerHTML = `<span class="pulse-sparkle">✦</span> Conectando con el espíritu de <strong>${spirit.name}</strong>...`;
  oracleOutput.innerHTML = '';

  const startTime = performance.now();

  try {
    await spiritAI.generateStream(activeMode, spirit, prompt, ({ token, accumulated, done }) => {
      oracleOutput.textContent = accumulated;
      oracleOutput.scrollTop = oracleOutput.scrollHeight;

      if (done) {
        const duration = Math.round(performance.now() - startTime);
        consoleStatus.innerHTML = `<span class="pulse-sparkle">✦</span> En comunión con <strong>${spirit.name}</strong>`;
        generationMetrics.textContent = `Tiempo de inferencia: ${duration}ms • Modelo: ${spiritAI.currentModelName} • Nube: 0% (Totalmente Local)`;
        isGenerating = false;
      }
    });
  } catch (err) {
    console.error('Generation error:', err);
    oracleOutput.textContent = 'Hubo una pausa en la sintonía del espíritu. Intenta de nuevo.';
    isGenerating = false;
  }
}

// Handle Custom Ancestor Submission
function handleAddAncestorSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('form-name').value;
  const relation = document.getElementById('form-relation').value;
  const years = document.getElementById('form-years').value;
  const memories = document.getElementById('form-memories').value;
  const favorites = document.getElementById('form-favorites').value;
  const photoFileInput = document.getElementById('form-photo-file');

  const createAndRegister = (imageDataUrl) => {
    const newSpirit = spiritRegistry.addCustomSpirit({
      name,
      relationship: relation,
      years,
      memories,
      favoriteThings: favorites,
      image: imageDataUrl || '/assets/sugar_skull.jpg'
    });

    renderSpiritPills();
    altarManager.setSpirit(newSpirit.id);
    updateAltarDisplay();
    triggerAIGeneration();

    ancestorModal.classList.add('hidden');
    ancestorForm.reset();
    switchView('sanctuary');
    showToast(`🌸 ${name} ahora reposa en el altar con nosotros`);
  };

  if (photoFileInput.files && photoFileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      createAndRegister(uploadEvent.target.result);
    };
    reader.readAsDataURL(photoFileInput.files[0]);
  } else {
    createAndRegister(null);
  }
}

// Bio Lore Modal Open
function openBioModal() {
  const spirit = altarManager.currentSpirit;
  bioTitle.textContent = `📜 ${spirit.name} — ${spirit.epithet}`;
  bioBody.innerHTML = `
    <div style="display: flex; gap: 1rem; align-items: flex-start; margin-bottom: 1rem;">
      <img src="${spirit.image}" alt="${spirit.name}" style="width: 105px; height: 105px; border-radius: 14px; object-fit: cover; border: 2px solid var(--cempasuchil-gold);" />
      <div>
        <h4 style="color: var(--cempasuchil-gold); margin-bottom: 0.25rem;">Años de Vida: ${spirit.years}</h4>
        <p style="font-style: italic; color: #cbd5e1;">"${spirit.quote}"</p>
      </div>
    </div>
    <div>
      <h5 style="color: #ffd166; margin-bottom: 0.25rem;">Biografía:</h5>
      <p>${spirit.biography}</p>
    </div>
    <div style="margin-top: 0.75rem;">
      <h5 style="color: #ffd166; margin-bottom: 0.25rem;">Legado en la Computación Abierta:</h5>
      <p>${spirit.legacy}</p>
    </div>
    <div style="margin-top: 0.75rem;">
      <h5 style="color: #ffd166; margin-bottom: 0.25rem;">Ofrendas Tradicionales en su Altar:</h5>
      <p>${spirit.favoriteOfferings?.join(' • ') || 'Pan de muerto, flores de cempasúchil'}</p>
    </div>
    <div style="margin-top: 0.75rem; background: rgba(255, 183, 3, 0.1); border-left: 3px solid var(--cempasuchil-gold); padding: 0.7rem; border-radius: 0 8px 8px 0;">
      <h5 style="color: var(--cempasuchil-gold); margin-bottom: 0.2rem;">Susurro del Más Allá:</h5>
      <p style="font-family: var(--font-poetic);">${spirit.spiritWhisper}</p>
    </div>
  `;
  bioModal.classList.remove('hidden');
}

// Save Altar Snapshot as High-Resolution Memorial Postcard
function saveAltarSnapshot() {
  const spirit = altarManager.currentSpirit;
  const offCanvas = document.createElement('canvas');
  offCanvas.width = 1200;
  offCanvas.height = 1200;
  const ctx = offCanvas.getContext('2d');

  const grad = ctx.createRadialGradient(600, 600, 50, 600, 600, 750);
  grad.addColorStop(0, '#241432');
  grad.addColorStop(0.6, '#130a1c');
  grad.addColorStop(1, '#050308');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1200, 1200);

  ctx.strokeStyle = '#ffb703';
  ctx.lineWidth = 8;
  ctx.strokeRect(35, 35, 1130, 1130);
  ctx.strokeStyle = '#e63946';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(48, 48, 1104, 1104);

  ctx.fillStyle = '#ffd166';
  ctx.font = 'bold 44px "Cinzel Decorative", serif, Georgia';
  ctx.textAlign = 'center';
  ctx.fillText('OFRENDA VIVA: MEMORIA ETERNA', 600, 115);

  ctx.fillStyle = '#ff9e1b';
  ctx.font = '26px "Playfair Display", serif';
  ctx.fillText(`En sagrado homenaje a ${spirit.name} (${spirit.years})`, 600, 165);

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = spirit.image;
  img.onload = () => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(600, 390, 170, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, 430, 220, 340, 340);
    ctx.restore();

    ctx.beginPath();
    ctx.arc(600, 390, 172, 0, Math.PI * 2);
    ctx.strokeStyle = '#ffb703';
    ctx.lineWidth = 10;
    ctx.stroke();

    ctx.fillStyle = '#f8f9fa';
    ctx.font = 'italic 23px "Playfair Display", serif';
    ctx.fillText(`"${spirit.quote}"`, 600, 620);

    const lines = [
      'Hay tres muertes en este mundo:',
      'La primera cuando cesa el cuerpo y el aliento.',
      'La segunda cuando nos bajan a la tierra.',
      'Y la tercera cuando nadie pronuncia nuestro nombre.',
      '',
      'Hoy tu memoria florece en el sendero dorado de cempasúchil.',
      'Preservado 100% en Privacidad con Inteligencia Artificial Abierta.'
    ];

    ctx.fillStyle = '#fed7aa';
    ctx.font = '20px "Playfair Display", serif';
    let lineY = 690;
    lines.forEach(l => {
      ctx.fillText(l, 600, lineY);
      lineY += 40;
    });

    ctx.fillStyle = '#94a3b8';
    ctx.font = '16px "Outfit", sans-serif';
    ctx.fillText('Ofrenda Viva • Santuario de Código Abierto • Día de los Muertos 2026', 600, 1110);

    const link = document.createElement('a');
    link.download = `Ofrenda_Viva_${spirit.name.replace(/\s+/g, '_')}_Recuerdo.png`;
    link.href = offCanvas.toDataURL('image/png');
    link.click();
    showToast('📸 Postal conmemorativa descargada en alta resolución');
  };
}

// Start Application on DOM Ready
window.addEventListener('DOMContentLoaded', initApp);
