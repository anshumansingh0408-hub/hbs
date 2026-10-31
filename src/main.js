// Main Application Entrypoint for Ofrenda Viva

import './style.css';
import { PetalSystem } from './petals.js';
import { soundscape } from './audio.js';
import { spiritRegistry } from './spirits.js';
import { spiritAI } from './aiEngine.js';
import { AltarManager } from './altar.js';

// DOM Elements
const canvas = document.getElementById('petal-canvas');
const spiritPillsContainer = document.getElementById('spirit-pills');
const currentSpiritPhoto = document.getElementById('current-spirit-photo');
const spiritNameEl = document.getElementById('spirit-name');
const spiritEpithetEl = document.getElementById('spirit-epithet');
const spiritDatesEl = document.getElementById('spirit-dates');
const litCountEl = document.getElementById('lit-count');

// Audio Controls
const btnSoundscape = document.getElementById('btn-soundscape');
const audioVisualizer = document.getElementById('audio-visualizer');
const btnScatter = document.getElementById('btn-scatter');

// Oracle Controls
const oracleOutput = document.getElementById('oracle-output');
const consoleSpiritName = document.getElementById('console-spirit-name');
const consoleStatus = document.getElementById('console-status');
const generationMetrics = document.getElementById('generation-metrics');
const oracleUserPrompt = document.getElementById('oracle-user-prompt');
const btnInvokeAi = document.getElementById('btn-invoke-ai');
const btnCopyText = document.getElementById('btn-copy-text');
const tabButtons = document.querySelectorAll('.tab-btn');

// Altar Buttons
const btnLightAll = document.getElementById('btn-light-all');
const btnSaveAltar = document.getElementById('btn-save-altar');
const btnViewStory = document.getElementById('btn-view-story');

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

const toast = document.getElementById('toast');

// State
let petalSystem = null;
let altarManager = null;
let activeMode = 'epitaph';
let isGenerating = false;

// Toast Utility
function showToast(message, duration = 3000) {
  toast.textContent = message;
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, duration);
}

// Initialize Application
function initApp() {
  // 1. Particle System
  petalSystem = new PetalSystem(canvas);
  petalSystem.start();

  // 2. Altar Manager
  altarManager = new AltarManager(petalSystem);

  // 3. Render Spirit Selectors
  renderSpiritPills();

  // 4. Bind Candle Interactivity
  bindCandleClicks();

  // 5. Bind Audio Toggle
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

  // 6. Scatter Marigold Petals
  btnScatter.addEventListener('click', (e) => {
    soundscape.playChime(720);
    petalSystem.burstPetals(75, e.clientX, e.clientY);
    showToast('🌼 Lluvia de cempasúchil esparcida para guiar a los espíritus');
  });

  // 7. Light All Candles
  btnLightAll.addEventListener('click', () => {
    altarManager.lightAllCandles();
    updateCandleDOM();
    showToast('🕯️ Todas las veladoras están encendidas con devoción');
  });

  // 8. Mode Tabs Switch
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeMode = btn.dataset.mode;
      triggerAIGeneration();
    });
  });

  // 9. AI Invoke Button
  btnInvokeAi.addEventListener('click', () => {
    triggerAIGeneration();
  });

  oracleUserPrompt.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      triggerAIGeneration();
    }
  });

  // 10. Copy Output
  btnCopyText.addEventListener('click', () => {
    navigator.clipboard.writeText(oracleOutput.innerText).then(() => {
      showToast('📋 Poesía copiada al portapapeles');
    });
  });

  // 11. Custom Ancestor Modal
  btnAddAncestor.addEventListener('click', () => {
    ancestorModal.classList.remove('hidden');
  });

  btnCloseModal.addEventListener('click', () => {
    ancestorModal.classList.add('hidden');
  });

  btnCancelModal.addEventListener('click', () => {
    ancestorModal.classList.add('hidden');
  });

  ancestorForm.addEventListener('submit', handleAddAncestorSubmit);

  // 12. Bio Lore Modal
  btnViewStory.addEventListener('click', openBioModal);
  btnCloseBio.addEventListener('click', () => {
    bioModal.classList.add('hidden');
  });

  // 13. Snapshot Altar
  btnSaveAltar.addEventListener('click', saveAltarSnapshot);

  // 14. Continuous Copal Smoke Emitter
  initCopalSmokeEmitter();

  // 15. Initial Generation for First Spirit
  updateAltarDisplay();
  triggerAIGeneration();
}

// Copal Smoke continuous particle emitter
function initCopalSmokeEmitter() {
  const copalEl = document.getElementById('copal-burner');
  setInterval(() => {
    if (!copalEl || !petalSystem) return;
    const rect = copalEl.getBoundingClientRect();
    petalSystem.addCopalSmoke(rect.left + rect.width / 2, rect.top + 10);
  }, 350);
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

// Update Altar Centerpiece Display
function updateAltarDisplay() {
  const spirit = altarManager.currentSpirit;
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
      <img src="${spirit.image}" alt="${spirit.name}" style="width: 100px; height: 100px; border-radius: 12px; object-fit: cover; border: 2px solid var(--cempasuchil-gold);" />
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
    <div style="margin-top: 0.75rem; background: rgba(255, 183, 3, 0.1); border-left: 3px solid var(--cempasuchil-gold); padding: 0.6rem;">
      <h5 style="color: var(--cempasuchil-gold); margin-bottom: 0.2rem;">Susurro del Más Allá:</h5>
      <p style="font-family: var(--font-poetic);">${spirit.spiritWhisper}</p>
    </div>
  `;
  bioModal.classList.remove('hidden');
}

// Save Altar Snapshot as Downloadable Keepsake
function saveAltarSnapshot() {
  const spirit = altarManager.currentSpirit;
  const offCanvas = document.createElement('canvas');
  offCanvas.width = 1000;
  offCanvas.height = 1000;
  const ctx = offCanvas.getContext('2d');

  // Background
  const grad = ctx.createRadialGradient(500, 500, 50, 500, 500, 600);
  grad.addColorStop(0, '#1c1328');
  grad.addColorStop(1, '#07050a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1000, 1000);

  // Decorative border
  ctx.strokeStyle = '#ffb703';
  ctx.lineWidth = 6;
  ctx.strokeRect(30, 30, 940, 940);
  ctx.strokeStyle = '#e63946';
  ctx.lineWidth = 2;
  ctx.strokeRect(40, 40, 920, 920);

  // Title
  ctx.fillStyle = '#ffd166';
  ctx.font = 'bold 36px "Cinzel Decorative", serif, Georgia';
  ctx.textAlign = 'center';
  ctx.fillText('OFRENDA VIVA: RECUERDO ETERNO', 500, 90);

  ctx.fillStyle = '#ff9e1b';
  ctx.font = '22px "Playfair Display", serif';
  ctx.fillText(`En memoria de ${spirit.name} (${spirit.years})`, 500, 130);

  // Draw portrait image
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = spirit.image;
  img.onload = () => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(500, 320, 140, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, 360, 180, 280, 280);
    ctx.restore();

    // Gold circle ring around portrait
    ctx.beginPath();
    ctx.arc(500, 320, 142, 0, Math.PI * 2);
    ctx.strokeStyle = '#ffb703';
    ctx.lineWidth = 8;
    ctx.stroke();

    // Verse snippet
    ctx.fillStyle = '#f8f9fa';
    ctx.font = 'italic 20px "Playfair Display", serif';
    ctx.fillText(`"${spirit.quote}"`, 500, 510);

    // Epitaph excerpt
    const lines = [
      'Hay tres muertes:',
      'La primera cuando cesa el cuerpo.',
      'La segunda cuando nos entierran.',
      'Y la tercera cuando nadie pronuncia nuestro nombre.',
      '',
      'Hoy tu nombre brilla con amor en el santuario digital.',
      '100% Privado • Preservado con Inteligencia Artificial Abierta'
    ];

    ctx.fillStyle = '#fed7aa';
    ctx.font = '18px "Playfair Display", serif';
    let lineY = 570;
    lines.forEach(l => {
      ctx.fillText(l, 500, lineY);
      lineY += 34;
    });

    // Signature
    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px "Outfit", sans-serif';
    ctx.fillText('Creado con Ofrenda Viva • Día de los Muertos • Noviembre 2026', 500, 920);

    // Download trigger
    const link = document.createElement('a');
    link.download = `Ofrenda_Viva_${spirit.name.replace(/\s+/g, '_')}.png`;
    link.href = offCanvas.toDataURL('image/png');
    link.click();
    showToast('📸 Recuerdo fotográfico descargado con éxito');
  };
}

// Start Application on DOM Ready
window.addEventListener('DOMContentLoaded', initApp);
