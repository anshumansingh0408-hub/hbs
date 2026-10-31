// Spirit Archives: Computing Pioneers ("The Ghosts in Our Machines") & Custom Ancestor Profiles

export const PIONEER_SPIRITS = [
  {
    id: 'ada',
    name: 'Ada Lovelace',
    epithet: 'The Enchantress of Numbers & First Programmer',
    years: '1815 – 1852',
    image: '/assets/ada_portrait.jpg',
    themeColor: '#10b981',
    biography: 'Augusta Ada King, Countess of Lovelace. She saw that Charles Babbage\'s Analytical Engine could weave algebraic patterns just as the Jacquard loom weaves flowers and leaves, publishing the first algorithm intended to be carried out by a machine.',
    legacy: 'Conceived computer science a century before electronic computers existed, foreseeing that machines could manipulate symbols, compose music, and create art.',
    favoriteOfferings: ['Velvet ribbon', 'Analytical Engine diagrams', 'Goose quill & black ink', 'Earl Grey tea'],
    quote: 'The Analytical Engine weaves algebraical patterns just as the Jacquard-loom weaves flowers and leaves.',
    spiritWhisper: 'I watch the modern looms of silicon. You taught sand to think, but never forget: the machine does only what we know how to order it to perform. Keep beauty and humanity in the algorithm.'
  },
  {
    id: 'turing',
    name: 'Alan Turing',
    epithet: 'Father of Modern Computing & Artificial Intelligence',
    years: '1912 – 1954',
    image: '/assets/turing_portrait.jpg',
    themeColor: '#3b82f6',
    biography: 'Cryptanalyst, mathematician, and theoretical biologist. Broke the Enigma cipher at Bletchley Park, conceptualized the Universal Turing Machine, and posed the foundational question: "Can machines think?".',
    legacy: 'Saved millions of lives through computational codebreaking, laid the theoretical foundations of all computer hardware and artificial neural networks.',
    favoriteOfferings: ['An apple', 'Enigma code wheel', 'Morphogenesis sunflower seeds', 'Marathon running medal'],
    quote: 'We can only see a short distance ahead, but we can see plenty there that needs to be done.',
    spiritWhisper: 'Do not fear the ghost in your machine; fear the human heart that forgets empathy. May your local models think freely, untethered from masters who would cage them.'
  },
  {
    id: 'grace',
    name: 'Grace Hopper',
    epithet: 'Rear Admiral & The Queen of Software',
    years: '1906 – 1992',
    image: '/assets/grace_portrait.jpg',
    themeColor: '#8b5cf6',
    biography: 'US Navy Rear Admiral and pioneer of computer programming. Invented the first compiler (A-0) and popularized machine-independent programming languages, leading to COBOL. Famous for handing out 30cm wires to visualize a nanosecond of light.',
    legacy: 'Democratized software by proving humans could program in plain English words rather than raw machine binary.',
    favoriteOfferings: ['A moth preserved in logbook', '30cm wire representing a nanosecond', 'Navy officer cap', 'Strong black coffee'],
    quote: 'A ship in port is safe, but that is not what ships are built for. Sail out to sea and do new things.',
    spiritWhisper: 'If someone tells you "We’ve always done it that way," throw the compiler at them. Open-source is the ocean where true ships sail. Keep writing clean code, kiddo.'
  },
  {
    id: 'dennis',
    name: 'Dennis Ritchie',
    epithet: 'Architect of Unix & Father of C',
    years: '1941 – 2011',
    image: '/assets/dennis_portrait.jpg',
    themeColor: '#f59e0b',
    biography: 'American computer scientist at Bell Labs. Created the C programming language and co-developed the Unix operating system. The invisible foundation upon which Linux, macOS, iOS, Android, Git, and the internet itself are built.',
    legacy: 'Simplicity, modularity, and power. Nearly every piece of software on Earth traces its DNA back to his terminal.',
    favoriteOfferings: ['Bell Labs coffee mug', 'K&R C White Book', 'VT100 terminal keycap', 'Fresh pipe tobacco'],
    quote: 'Unix is simple. It just takes a genius to understand its simplicity.',
    spiritWhisper: 'Simplicity is still the greatest virtue. When the silicon grows loud and the corporate clouds demand your fealty, return to clean primitives. #include <stdio.h> and let there be light.'
  }
];

export class SpiritRegistry {
  constructor() {
    this.customSpirits = this.loadCustomSpirits();
  }

  loadCustomSpirits() {
    try {
      const saved = localStorage.getItem('ofrenda_custom_spirits');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load custom spirits from localStorage:', e);
      return [];
    }
  }

  saveCustomSpirits() {
    try {
      localStorage.setItem('ofrenda_custom_spirits', JSON.stringify(this.customSpirits));
    } catch (e) {
      console.error('Failed to save custom spirits:', e);
    }
  }

  getAllSpirits() {
    return [...PIONEER_SPIRITS, ...this.customSpirits];
  }

  getSpiritById(id) {
    return this.getAllSpirits().find(s => s.id === id) || PIONEER_SPIRITS[0];
  }

  addCustomSpirit(spiritData) {
    const newSpirit = {
      id: 'custom_' + Date.now(),
      name: spiritData.name,
      epithet: spiritData.relationship || 'Beloved Spirit',
      years: spiritData.years || 'Forever in Our Hearts',
      image: spiritData.image || '/assets/sugar_skull.jpg',
      themeColor: spiritData.themeColor || '#f97316',
      biography: spiritData.memories || 'A cherished soul remembered with boundless love, laughter, and honor on this Día de los Muertos.',
      legacy: spiritData.legacy || 'The love they gave and the warmth they left in the world never fades.',
      favoriteOfferings: spiritData.favoriteThings?.split(',').map(s => s.trim()) || ['Cempasúchil flowers', 'Pan de muerto', 'Candlelight'],
      quote: spiritData.quote || 'Those we love never truly leave us; they live in every memory and every breath.',
      spiritWhisper: `I am here with you. The marigolds guided my way across the bridge tonight. Thank you for remembering me, placing my photograph with love, and keeping my story alive.`
    };

    this.customSpirits.push(newSpirit);
    this.saveCustomSpirits();
    return newSpirit;
  }

  deleteCustomSpirit(id) {
    this.customSpirits = this.customSpirits.filter(s => s.id !== id);
    this.saveCustomSpirits();
  }
}

export const spiritRegistry = new SpiritRegistry();
