// Interactive Ofrenda Altar State, Lore & Presentation Manager

import { soundscape } from './audio.js';
import { spiritRegistry } from './spirits.js';

export const OFFERING_LORE = {
  sugar_skull: {
    title: 'Calaverita de Azúcar',
    subtitle: 'El dulce recordatorio de la inmortalidad',
    origin: 'Arte popular mexicano del siglo XVII',
    lore: 'Elaboradas con azúcar de caña y decoradas con vivos colores, las calaveritas no representan la tristeza de la muerte, sino la dulzura de la vida eterna y la alegría con la que celebramos a quienes amamos. Llevan el nombre del difunto en la frente para asegurar su visita.',
    soundFreq: 587
  },
  pan_de_muerto: {
    title: 'Pan de Muerto Tradicional',
    subtitle: 'La ofrenda fraterna con esencia de azahar',
    origin: 'Fusión prehispánica y virreinal',
    lore: 'Su forma circular representa el ciclo interminable de la vida y la muerte. Las tiras en relieve sobre la corteza simbolizan los cuatro puntos cardinales y los huesos de nuestros ancestros, mientras que la bolita superior representa el cráneo. La esencia de azahar guía las almas con su fragancia.',
    soundFreq: 440
  },
  cempasuchil: {
    title: 'Flor de Cempasúchil',
    subtitle: 'Veinte flores en náhuatl: Luz del sol en la tierra',
    origin: 'La leyenda de Xóchitl y Huitzilin',
    lore: 'Conocida como la "Flor de Muertos", su brillante color dorado y su penetrante fragancia crean senderos desde las puertas de los hogares hasta los altares. Para los mexicas, guardaba el calor de Tonatiuh (el dios sol) para iluminar el camino de las almas que cruzan desde el Mictlán.',
    soundFreq: 659
  },
  copal: {
    title: 'Sahumerio de Copal Sagrado',
    subtitle: 'La resina divina que limpia el camino astral',
    origin: 'Ritual ancestral mesoamericano',
    lore: 'El copal es una resina aromática extraída del árbol sagrado de copal. Al quemarse en brasas sobre el sahumerio de barro, su humo blanco y aromático purifica el espacio terrenal, ahuyenta a los malos espíritus y eleva nuestras oraciones hasta el reino celestial.',
    soundFreq: 330
  },
  water: {
    title: 'Vaso de Agua Pura',
    subtitle: 'Mitigación de la sed del largo viaje',
    origin: 'Símbolo universal de la vida y pureza',
    lore: 'Las almas recorren un largo y extenuante camino a través de los nueve niveles del Mictlán. El vaso de agua fresca y cristalina es lo primero que se les ofrece al llegar a la ofrenda para calmar su sed y recobrar fuerzas para su estancia entre los vivos.',
    soundFreq: 523
  },
  salt: {
    title: 'Plato de Sal Blanca',
    subtitle: 'Elemento de preservación y purificación',
    origin: 'Elemento de purificación espiritual',
    lore: 'La sal es un potente elemento purificador. Se coloca en un pequeño plato de barro para evitar que el alma del difunto se corrompa en su trayecto de ida y vuelta a través del inframundo, asegurando su pureza y retorno seguro a la eternidad.',
    soundFreq: 698
  }
};

export class AltarManager {
  constructor(petalSystem) {
    this.petalSystem = petalSystem;
    this.currentSpirit = spiritRegistry.getAllSpirits()[0];
    this.currentLightingTheme = 'medianoche'; // medianoche, crepusculo, penumbra
    this.candles = [
      { id: 'c1', label: 'Luz de Guía (Cielo)', lit: true, tier: 1 },
      { id: 'c2', label: 'Luz de Memoria (Cielo)', lit: true, tier: 1 },
      { id: 'c3', label: 'Luz de Paz (Tierra)', lit: true, tier: 2 },
      { id: 'c4', label: 'Luz de Esperanza (Tierra)', lit: true, tier: 2 },
      { id: 'c5', label: 'Luz del Viaje (Inframundo)', lit: true, tier: 3 },
      { id: 'c6', label: 'Luz de Purificación (Inframundo)', lit: true, tier: 3 }
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
        this.petalSystem.burstPetals(18, rect.left + rect.width / 2, rect.top);
      }
    } else {
      soundscape.playMarimba(320);
    }

    return candle.lit;
  }

  lightAllCandles() {
    this.candles.forEach(c => c.lit = true);
    soundscape.playChime(528);
    this.petalSystem.burstPetals(65);
  }

  getLitCount() {
    return this.candles.filter(c => c.lit).length;
  }

  interactOffering(id, element) {
    const lore = OFFERING_LORE[id];
    if (!lore) return null;

    soundscape.playMarimba(lore.soundFreq || 500);

    if (element) {
      const rect = element.getBoundingClientRect();
      if (id === 'copal') {
        for (let i = 0; i < 15; i++) {
          this.petalSystem.addCopalSmoke(rect.left + rect.width / 2, rect.top);
        }
      } else {
        this.petalSystem.burstPetals(12, rect.left + rect.width / 2, rect.top);
      }
    }

    return lore;
  }
}
