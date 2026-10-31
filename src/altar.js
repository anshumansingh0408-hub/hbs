// Interactive Ofrenda Altar State & Presentation Manager

import { soundscape } from './audio.js';
import { spiritRegistry } from './spirits.js';

export class AltarManager {
  constructor(petalSystem) {
    this.petalSystem = petalSystem;
    this.currentSpirit = spiritRegistry.getAllSpirits()[0];
    this.candles = [
      { id: 'c1', label: 'Luz de Guía (Cielo)', lit: true, tier: 1 },
      { id: 'c2', label: 'Luz de Memoria (Cielo)', lit: true, tier: 1 },
      { id: 'c3', label: 'Luz de Paz (Tierra)', lit: true, tier: 2 },
      { id: 'c4', label: 'Luz de Esperanza (Tierra)', lit: true, tier: 2 },
      { id: 'c5', label: 'Luz del Viaje (Inframundo)', lit: true, tier: 3 },
      { id: 'c6', label: 'Luz de Purificación (Inframundo)', lit: true, tier: 3 }
    ];
    this.offerings = [
      { id: 'sugar_skull', name: 'Calavera de Azúcar', image: '/assets/sugar_skull.jpg', tier: 2, placed: true },
      { id: 'pan_de_muerto', name: 'Pan de Muerto', image: '/assets/pan_de_muerto.jpg', tier: 2, placed: true },
      { id: 'cempasuchil', name: 'Ramo de Cempasúchil', image: '/assets/cempasuchil.jpg', tier: 2, placed: true },
      { id: 'copal', name: 'Sahumerio de Copal', image: '/assets/copal.jpg', tier: 3, placed: true }
    ];
  }

  setSpirit(spiritId) {
    this.currentSpirit = spiritRegistry.getSpiritById(spiritId);
    soundscape.playChime(660);
    this.petalSystem.burstPetals(45);
  }

  toggleCandle(id, element) {
    const candle = this.candles.find(c => c.id === id);
    if (!candle) return;
    candle.lit = !candle.lit;

    if (candle.lit) {
      soundscape.playChime(candle.tier === 1 ? 784 : candle.tier === 2 ? 659 : 528);
      if (element) {
        const rect = element.getBoundingClientRect();
        this.petalSystem.burstPetals(15, rect.left + rect.width / 2, rect.top);
      }
    }

    return candle.lit;
  }

  lightAllCandles() {
    this.candles.forEach(c => c.lit = true);
    soundscape.playChime(528);
    this.petalSystem.burstPetals(60);
  }

  getLitCount() {
    return this.candles.filter(c => c.lit).length;
  }
}
