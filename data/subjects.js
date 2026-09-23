export const subjects = [
  {
    id: 'physics',
    name: 'Physics',
    short: 'PHY',
    marks: 180,
    questions: 45,
    difficulty: 'Moderate → difficult / calculation-heavy',
    units: [
      { id: 'phy-1', no: 1, name: 'Physics and Measurement', chapters: [
        ['physics-measurement', 'Units and Measurements', 1]
      ]},
      { id: 'phy-2', no: 2, name: 'Kinematics', chapters: [
        ['motion-straight-line', 'Motion in a Straight Line', 1],
        ['motion-plane', 'Motion in a Plane', 1],
        ['circular-motion', 'Uniform Circular Motion', 0]
      ]},
      { id: 'phy-3', no: 3, name: 'Laws of Motion', chapters: [
        ['laws-of-motion', 'Laws of Motion', 1]
      ]},
      { id: 'phy-4', no: 4, name: 'Work, Energy and Power', chapters: [
        ['work-energy-power', 'Work, Energy and Power', 2]
      ]},
      { id: 'phy-5', no: 5, name: 'Rotational Motion', chapters: [
        ['system-particles-rotational-motion', 'System of Particles and Rotational Motion', 2]
      ]},
      { id: 'phy-6', no: 6, name: 'Gravitation', chapters: [
        ['gravitation', 'Gravitation', 2]
      ]},
      { id: 'phy-7', no: 7, name: 'Properties of Solids and Liquids', chapters: [
        ['mechanical-solids', 'Mechanical Properties of Solids', 0],
        ['mechanical-fluids', 'Mechanical Properties of Fluids', 2],
        ['thermal-properties', 'Thermal Properties of Matter', 1]
      ]},
      { id: 'phy-8', no: 8, name: 'Thermodynamics', chapters: [
        ['thermodynamics', 'Thermodynamics', 2]
      ]},
      { id: 'phy-9', no: 9, name: 'Kinetic Theory of Gases', chapters: [
        ['kinetic-theory', 'Kinetic Theory', 2]
      ]},
      { id: 'phy-10', no: 10, name: 'Oscillations and Waves', chapters: [
        ['oscillations', 'Oscillations', 2],
        ['waves', 'Waves', 1]
      ]},
      { id: 'phy-11', no: 11, name: 'Electrostatics', chapters: [
        ['electric-charges-fields', 'Electric Charges and Fields', 1],
        ['electrostatic-potential-capacitance', 'Electrostatic Potential and Capacitance', 3]
      ]},
      { id: 'phy-12', no: 12, name: 'Current Electricity', chapters: [
        ['current-electricity', 'Current Electricity', 1]
      ]},
      { id: 'phy-13', no: 13, name: 'Magnetic Effects of Current and Magnetism', chapters: [
        ['moving-charges-magnetism', 'Moving Charges and Magnetism', 2],
        ['magnetism-matter', 'Magnetism and Matter', 0]
      ]},
      { id: 'phy-14', no: 14, name: 'Electromagnetic Induction and Alternating Currents', chapters: [
        ['electromagnetic-induction', 'Electromagnetic Induction', 3],
        ['alternating-current', 'Alternating Current', 1]
      ]},
      { id: 'phy-15', no: 15, name: 'Electromagnetic Waves', chapters: [
        ['electromagnetic-waves', 'Electromagnetic Waves', 2]
      ]},
      { id: 'phy-16', no: 16, name: 'Optics', chapters: [
        ['ray-optics', 'Ray Optics and Optical Instruments', 2],
        ['wave-optics', 'Wave Optics', 0]
      ]},
      { id: 'phy-17', no: 17, name: 'Dual Nature of Matter and Radiation', chapters: [
        ['dual-nature', 'Dual Nature of Radiation and Matter', 3]
      ]},
      { id: 'phy-18', no: 18, name: 'Atoms and Nuclei', chapters: [
        ['atoms', 'Atoms', 2],
        ['nuclei', 'Nuclei', 1]
      ]},
      { id: 'phy-19', no: 19, name: 'Electronic Devices', chapters: [
        ['semiconductor', 'Semiconductor Electronics: Materials, Devices and Simple Circuits', 2]
      ]},
      { id: 'phy-20', no: 20, name: 'Experimental Skills', chapters: [
        ['experimental-skills', 'Experimental Skills', 2]
      ]}
    ]
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    short: 'CHEM',
    marks: 180,
    questions: 45,
    difficulty: 'Moderate → medium-hard / NCERT + conceptual',
    units: [
      { id: 'chem-1', no: 1, name: 'Some Basic Concepts in Chemistry', chapters: [
        ['mole-concept', 'Some Basic Concepts of Chemistry', 2]
      ]},
      { id: 'chem-2', no: 2, name: 'Atomic Structure', chapters: [
        ['structure-atom', 'Structure of Atom', 1]
      ]},
      { id: 'chem-3', no: 3, name: 'Chemical Bonding and Molecular Structure', chapters: [
        ['chemical-bonding', 'Chemical Bonding and Molecular Structure', 2]
      ]},
      { id: 'chem-4', no: 4, name: 'Chemical Thermodynamics', chapters: [
        ['chem-thermodynamics', 'Thermodynamics', 3]
      ]},
      { id: 'chem-5', no: 5, name: 'Solutions', chapters: [
        ['solutions', 'Solutions', 2]
      ]},
      { id: 'chem-6', no: 6, name: 'Equilibrium', chapters: [
        ['equilibrium', 'Equilibrium', 1]
      ]},
      { id: 'chem-7', no: 7, name: 'Redox Reactions and Electrochemistry', chapters: [
        ['redox', 'Redox Reactions', 1],
        ['electrochemistry', 'Electrochemistry', 2]
      ]},
      { id: 'chem-8', no: 8, name: 'Chemical Kinetics', chapters: [
        ['chemical-kinetics', 'Chemical Kinetics', 2]
      ]},
      { id: 'chem-9', no: 9, name: 'Classification of Elements and Periodicity in Properties', chapters: [
        ['periodic-table', 'Classification of Elements and Periodicity in Properties', 2]
      ]},
      { id: 'chem-10', no: 10, name: 'P-Block Elements', chapters: [
        ['p-block', 'The p-Block Elements', 2]
      ]},
      { id: 'chem-11', no: 11, name: 'd- and f-Block Elements', chapters: [
        ['d-f-block', 'The d- and f-Block Elements', 3]
      ]},
      { id: 'chem-12', no: 12, name: 'Co-ordination Compounds', chapters: [
        ['coordination-compounds', 'Coordination Compounds', 6]
      ]},
      { id: 'chem-13', no: 13, name: 'Purification and Characterisation of Organic Compounds', chapters: [
        ['purification-characterisation', 'Purification and Characterisation of Organic Compounds', 0]
      ]},
      { id: 'chem-14', no: 14, name: 'Some Basic Principles of Organic Chemistry', chapters: [
        ['goc', 'Organic Chemistry — Some Basic Principles and Techniques', 1]
      ]},
      { id: 'chem-15', no: 15, name: 'Hydrocarbons', chapters: [
        ['hydrocarbons', 'Hydrocarbons', 3]
      ]},
      { id: 'chem-16', no: 16, name: 'Organic Compounds Containing Halogens', chapters: [
        ['haloalkanes-haloarenes', 'Haloalkanes and Haloarenes', 1]
      ]},
      { id: 'chem-17', no: 17, name: 'Organic Compounds Containing Oxygen', chapters: [
        ['alcohols-phenols-ethers', 'Alcohols, Phenols and Ethers', 0],
        ['aldehydes-ketones-acids', 'Aldehydes, Ketones and Carboxylic Acids', 4]
      ]},
      { id: 'chem-18', no: 18, name: 'Organic Compounds Containing Nitrogen', chapters: [
        ['amines', 'Amines', 2]
      ]},
      { id: 'chem-19', no: 19, name: 'Biomolecules', chapters: [
        ['chem-biomolecules', 'Biomolecules', 3]
      ]},
      { id: 'chem-20', no: 20, name: 'Principles Related to Practical Chemistry', chapters: [
        ['practical-chemistry', 'Principles Related to Practical Chemistry', 2]
      ]}
    ]
  },
  {
    id: 'biology',
    name: 'Biology',
    short: 'BIO',
    marks: 360,
    questions: 90,
    difficulty: 'Easy → moderate / NCERT-heavy',
    units: [
      { id: 'bio-1', no: 1, name: 'Diversity in Living World', chapters: [
        ['living-world', 'The Living World', 3],
        ['biological-classification', 'Biological Classification', 5],
        ['plant-kingdom', 'Plant Kingdom', 2],
        ['animal-kingdom', 'Animal Kingdom', 3]
      ]},
      { id: 'bio-2', no: 2, name: 'Structural Organisation in Animals and Plants', chapters: [
        ['morphology-flowering-plants', 'Morphology of Flowering Plants', 3],
        ['anatomy-flowering-plants', 'Anatomy of Flowering Plants', 0],
        ['structural-organisation-animals', 'Structural Organisation in Animals', 2]
      ]},
      { id: 'bio-3', no: 3, name: 'Cell Structure and Function', chapters: [
        ['cell-unit-of-life', 'Cell: The Unit of Life', 7],
        ['bio-biomolecules', 'Biomolecules', 2],
        ['cell-cycle-division', 'Cell Cycle and Cell Division', 2]
      ]},
      { id: 'bio-4', no: 4, name: 'Plant Physiology', chapters: [
        ['photosynthesis', 'Photosynthesis in Higher Plants', 5],
        ['respiration-plants', 'Respiration in Plants', 1],
        ['plant-growth-development', 'Plant Growth and Development', 3]
      ]},
      { id: 'bio-5', no: 5, name: 'Human Physiology', chapters: [
        ['breathing-gases', 'Breathing and Exchange of Gases', 1],
        ['body-fluids-circulation', 'Body Fluids and Circulation', 3],
        ['excretory-products', 'Excretory Products and Their Elimination', 1],
        ['locomotion-movement', 'Locomotion and Movement', 5],
        ['neural-control', 'Neural Control and Coordination', 1],
        ['chemical-coordination', 'Chemical Coordination and Integration', 3]
      ]},
      { id: 'bio-6', no: 6, name: 'Reproduction', chapters: [
        ['sexual-reproduction-flowering', 'Sexual Reproduction in Flowering Plants', 4],
        ['human-reproduction', 'Human Reproduction', 4],
        ['reproductive-health', 'Reproductive Health', 1]
      ]},
      { id: 'bio-7', no: 7, name: 'Genetics and Evolution', chapters: [
        ['inheritance-variation', 'Principles of Inheritance and Variation', 3],
        ['molecular-basis-inheritance', 'Molecular Basis of Inheritance', 2],
        ['evolution', 'Evolution', 6]
      ]},
      { id: 'bio-8', no: 8, name: 'Biology and Human Welfare', chapters: [
        ['human-health-disease', 'Human Health and Diseases', 5],
        ['microbes-human-welfare', 'Microbes in Human Welfare', 1]
      ]},
      { id: 'bio-9', no: 9, name: 'Biotechnology and Its Applications', chapters: [
        ['biotech-principles-processes', 'Biotechnology: Principles and Processes', 4],
        ['biotech-applications', 'Biotechnology and Its Applications', 1]
      ]},
      { id: 'bio-10', no: 10, name: 'Ecology and Environment', chapters: [
        ['organisms-populations', 'Organisms and Populations', 4],
        ['ecosystem', 'Ecosystem', 2],
        ['biodiversity-conservation', 'Biodiversity and Conservation', 1]
      ]}
    ]
  }
];

export function flattenSubjects() {
  return subjects.flatMap((subject) => subject.units.flatMap((unit) => unit.chapters.map(([id, name, pyqs2026, note]) => ({
    id,
    name,
    pyqs2026,
    marks2026: pyqs2026 * 4,
    unitId: unit.id,
    unitNo: unit.no,
    unitName: unit.name,
    subjectId: subject.id,
    subjectName: subject.name,
    note: note ?? ''
  }))));
}

export const allChapters = flattenSubjects();
export const totalChapters = allChapters.length;

export function getSubject(subjectId) {
  return subjects.find((subject) => subject.id === subjectId);
}
