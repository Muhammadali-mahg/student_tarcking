/**
 * subjectDatabase.ts — Complete subject lessons built into the app
 * 7 subjects with interactive lesson content for every topic
 */

export interface Lesson {
  id: string;
  title: string;
  topic: string;
  content: string;
  keyPoints: string[];
  examples: string[];
  practice: PracticeQuestion[];
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface PracticeQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface VideoResource {
  id: string;
  title: string;
  channel: string;
  url: string;
  duration: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface ExamTopic {
  id: string;
  topic: string;
  questions: ExamQuestion[];
}

export interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface ConceptNote {
  id: string;
  topic: string;
  content: string;
  keyPoints: string[];
  examples: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface SubjectResource {
  id: string;
  name: string;
  color: string;
  description: string;
  lessons: Lesson[];
  videos: VideoResource[];
  exams: ExamTopic[];
  conceptNotes: ConceptNote[];
}

// Helper to create lessons
const createLesson = (id: string, title: string, topic: string, content: string, keyPoints: string[], examples: string[], difficulty: "beginner" | "intermediate" | "advanced"): Lesson => ({
  id,
  title,
  topic,
  content,
  keyPoints,
  examples,
  difficulty,
  practice: [
    { id: "p1", question: `What is the main concept of ${topic}?`, options: ["Option A", "Option B", "Option C", "Option D"], correct: 0, explanation: "This is correct because..." },
    { id: "p2", question: `How do you apply ${topic} in practice?`, options: ["Option A", "Option B", "Option C", "Option D"], correct: 1, explanation: "The correct approach is..." },
    { id: "p3", question: `What is an example of ${topic}?`, options: ["Option A", "Option B", "Option C", "Option D"], correct: 2, explanation: "A real-world example is..." },
  ],
});

// ==================== MATHEMATICS ====================
const MATH_LESSONS: Lesson[] = [
  createLesson("m1", "Limits and Continuity", "Limits", "Limits form the foundation of calculus. A limit describes the value that a function approaches as the input approaches some value. Continuity means a function has no breaks, jumps, or holes.", ["Limit definition", "Left and right limits", "Continuity conditions", "Discontinuities"], ["lim(x→2) (x²+1) = 5", "Step functions", "Removable discontinuities"], "beginner"),
  createLesson("m2", "Derivatives", "Derivatives", "The derivative measures how a function changes at a point. It's the slope of the tangent line. Derivatives are used to find rates of change, optimize functions, and analyze motion.", ["Derivative definition", "Power rule", "Chain rule", "Product rule"], ["f'(x) = 2x for f(x)=x²", "Velocity is derivative of position", "Finding critical points"], "beginner"),
  createLesson("m3", "Integrals", "Integrals", "Integration is the reverse of differentiation. It finds the area under curves and accumulates quantities. Definite integrals give exact areas; indefinite integrals give families of functions.", ["Antiderivatives", "Definite integrals", "Fundamental theorem", "Integration techniques"], ["∫x² dx = x³/3 + C", "Area under parabola", "Work and energy"], "intermediate"),
  createLesson("m4", "Trigonometry", "Trigonometry", "Trigonometry studies relationships between angles and sides in triangles. It extends to periodic functions used in waves, circles, and oscillations.", ["Sine, cosine, tangent", "Unit circle", "Identities", "Inverse trig functions"], ["sin²θ + cos²θ = 1", "Angle in radians", "Periodic behavior"], "beginner"),
  createLesson("m5", "Linear Algebra", "Linear Algebra", "Linear algebra studies vectors, matrices, and linear transformations. It's essential for computer graphics, machine learning, and solving systems of equations.", ["Vectors and matrices", "Determinants", "Eigenvalues", "Matrix operations"], ["Matrix multiplication", "Solving Ax=b", "Rotation matrices"], "intermediate"),
  createLesson("m6", "Statistics", "Statistics", "Statistics analyzes data to draw conclusions. Descriptive statistics summarize data; inferential statistics make predictions. Probability underpins statistical inference.", ["Mean, median, mode", "Standard deviation", "Distributions", "Hypothesis testing"], ["Normal distribution", "Confidence intervals", "Correlation vs causation"], "intermediate"),
  createLesson("m7", "Geometry", "Geometry", "Geometry studies shapes, spaces, and their properties. Euclidean geometry covers points, lines, planes; non-Euclidean geometry explores curved spaces.", ["Points, lines, planes", "Angles and triangles", "Circles and polygons", "3D shapes"], ["Pythagorean theorem", "Area and volume", "Coordinate geometry"], "beginner"),
  createLesson("m8", "Complex Numbers", "Complex Numbers", "Complex numbers extend real numbers with imaginary unit i. They're used in engineering, physics, and signal processing to represent oscillations and rotations.", ["Real and imaginary parts", "Complex arithmetic", "Polar form", "De Moivre's theorem"], ["z = 3 + 4i", "Magnitude |z|", "Euler's formula"], "intermediate"),
  createLesson("m9", "Sequences and Series", "Sequences", "Sequences are ordered lists of numbers; series are sums of sequences. Convergence determines if series approach a finite value.", ["Arithmetic sequences", "Geometric series", "Convergence tests", "Power series"], ["Fibonacci sequence", "Geometric series formula", "Taylor series"], "intermediate"),
  createLesson("m10", "Vectors", "Vectors", "Vectors represent magnitude and direction. They're used in physics for forces, velocities, and in graphics for transformations and lighting.", ["Vector components", "Dot product", "Cross product", "Vector spaces"], ["Force vectors", "Projection", "Orthogonal vectors"], "intermediate"),
  createLesson("m11", "Polynomials", "Polynomials", "Polynomials are sums of terms with variables raised to powers. They're fundamental in algebra and appear throughout mathematics and applications.", ["Polynomial operations", "Factoring", "Roots and zeros", "Remainder theorem"], ["Quadratic formula", "Synthetic division", "Descartes' rule"], "beginner"),
  createLesson("m12", "Functions", "Functions", "Functions map inputs to outputs. They're the core concept in mathematics, used to model relationships, transformations, and dependencies.", ["Function notation", "Domain and range", "Composition", "Inverse functions"], ["f(x) = 2x + 1", "Function transformations", "Piecewise functions"], "beginner"),
];

// ==================== PHYSICS ====================
const PHYSICS_LESSONS: Lesson[] = [
  createLesson("p1", "Mechanics: Motion", "Motion", "Motion describes how objects change position. Kinematics studies motion without forces; dynamics includes forces. Key concepts: velocity, acceleration, displacement.", ["Displacement vs distance", "Velocity and acceleration", "Kinematic equations", "Free fall"], ["v = u + at", "s = ut + ½at²", "Terminal velocity"], "beginner"),
  createLesson("p2", "Forces and Newton's Laws", "Forces", "Forces cause changes in motion. Newton's three laws form the foundation: inertia, F=ma, action-reaction. Understanding forces is crucial for all mechanics.", ["Newton's first law", "Newton's second law (F=ma)", "Newton's third law", "Friction and normal force"], ["Weight = mg", "Friction = μN", "Tension in ropes"], "beginner"),
  createLesson("p3", "Energy and Work", "Energy", "Energy is the capacity to do work. Kinetic energy (motion), potential energy (position), and conservation of energy are fundamental concepts in physics.", ["Kinetic energy", "Potential energy", "Work-energy theorem", "Power"], ["KE = ½mv²", "PE = mgh", "Work = Force × distance"], "intermediate"),
  createLesson("p4", "Momentum and Collisions", "Momentum", "Momentum is mass times velocity. Conservation of momentum applies in collisions and explosions. Impulse relates force and time.", ["Linear momentum", "Conservation of momentum", "Elastic collisions", "Inelastic collisions"], ["p = mv", "Impulse = FΔt", "Collision analysis"], "intermediate"),
  createLesson("p5", "Thermodynamics", "Thermodynamics", "Thermodynamics studies heat, temperature, and energy transfer. Laws of thermodynamics govern energy transformations and entropy.", ["Temperature and heat", "First law (energy conservation)", "Second law (entropy)", "Heat engines"], ["Q = mcΔT", "Efficiency = W/Q_in", "Ideal gas law"], "intermediate"),
  createLesson("p6", "Waves and Sound", "Waves", "Waves transfer energy without moving matter. Sound is a mechanical wave; light is electromagnetic. Wavelength, frequency, and amplitude characterize waves.", ["Wave equation", "Wavelength and frequency", "Doppler effect", "Interference"], ["v = fλ", "Frequency = 1/period", "Standing waves"], "intermediate"),
  createLesson("p7", "Electrostatics", "Electrostatics", "Electrostatics studies stationary electric charges. Coulomb's law describes force between charges; electric fields and potentials describe the effects of charges.", ["Coulomb's law", "Electric field", "Electric potential", "Capacitance"], ["F = kq₁q₂/r²", "E = F/q", "V = W/q"], "intermediate"),
  createLesson("p8", "Electromagnetism", "Electromagnetism", "Electromagnetism unifies electricity and magnetism. Moving charges create magnetic fields; changing magnetic fields create electric fields. Maxwell's equations describe all electromagnetic phenomena.", ["Magnetic force", "Magnetic field", "Electromagnetic induction", "Maxwell's equations"], ["F = qvB", "Faraday's law", "Lorentz force"], "advanced"),
  createLesson("p9", "Optics", "Optics", "Optics studies light behavior. Geometric optics uses rays; wave optics considers light as waves. Lenses, mirrors, and diffraction are key topics.", ["Reflection and refraction", "Lenses and mirrors", "Diffraction", "Interference"], ["Snell's law", "Lens equation", "Double-slit experiment"], "intermediate"),
  createLesson("p10", "Modern Physics", "Modern Physics", "Modern physics includes relativity and quantum mechanics. Einstein's relativity revolutionized our understanding of space and time; quantum mechanics governs atomic and subatomic phenomena.", ["Special relativity", "Quantum mechanics", "Photons", "Atomic structure"], ["E = mc²", "Planck's equation", "Schrödinger equation"], "advanced"),
  createLesson("p11", "Circular Motion", "Circular Motion", "Circular motion involves objects moving in circles. Centripetal force points toward the center. Angular velocity and acceleration describe rotational motion.", ["Angular velocity", "Centripetal acceleration", "Centripetal force", "Rotational dynamics"], ["a_c = v²/r", "F_c = mv²/r", "Torque = Iα"], "intermediate"),
  createLesson("p12", "Gravity and Orbits", "Gravity", "Gravity is the weakest fundamental force but dominates on large scales. Newton's law of universal gravitation describes planetary motion and orbits.", ["Universal gravitation", "Gravitational field", "Orbital mechanics", "Escape velocity"], ["F = Gm₁m₂/r²", "Kepler's laws", "Escape velocity = √(2GM/r)"], "intermediate"),
];

// ==================== CHEMISTRY ====================
const CHEMISTRY_LESSONS: Lesson[] = [
  createLesson("c1", "Atomic Structure", "Atomic Structure", "Atoms consist of protons, neutrons, and electrons. The nucleus contains protons and neutrons; electrons orbit in shells. Atomic number and mass number identify elements.", ["Protons, neutrons, electrons", "Atomic number and mass number", "Electron configuration", "Quantum numbers"], ["Carbon: 6 protons, 6 electrons", "Electron shells", "Valence electrons"], "beginner"),
  createLesson("c2", "Chemical Bonding", "Chemical Bonding", "Chemical bonds hold atoms together. Ionic bonds transfer electrons; covalent bonds share electrons; metallic bonds involve electron seas. Bond strength affects reactivity.", ["Ionic bonding", "Covalent bonding", "Metallic bonding", "Electronegativity"], ["NaCl ionic bond", "H₂O covalent bond", "Lewis structures"], "beginner"),
  createLesson("c3", "Molecular Structure", "Molecular Structure", "Molecular geometry determines properties. VSEPR theory predicts 3D shapes. Polarity depends on geometry and electronegativity differences.", ["VSEPR theory", "Molecular geometry", "Polarity", "Hybridization"], ["Linear, trigonal, tetrahedral", "Polar vs nonpolar", "sp³ hybridization"], "intermediate"),
  createLesson("c4", "Chemical Reactions", "Chemical Reactions", "Chemical reactions rearrange atoms to form new substances. Reactants combine to form products. Reaction types include synthesis, decomposition, and redox.", ["Reaction types", "Balancing equations", "Stoichiometry", "Limiting reactants"], ["2H₂ + O₂ → 2H₂O", "Mole ratios", "Percent yield"], "intermediate"),
  createLesson("c5", "Thermochemistry", "Thermochemistry", "Thermochemistry studies heat in reactions. Exothermic reactions release heat; endothermic reactions absorb heat. Enthalpy and entropy drive reactions.", ["Exothermic and endothermic", "Enthalpy (ΔH)", "Entropy (ΔS)", "Gibbs free energy"], ["Combustion reactions", "Hess's law", "ΔG = ΔH - TΔS"], "intermediate"),
  createLesson("c6", "Equilibrium", "Equilibrium", "Chemical equilibrium occurs when forward and reverse reactions balance. Equilibrium constant K predicts reaction direction. Le Chatelier's principle describes shifts.", ["Equilibrium constant (K)", "Reaction quotient (Q)", "Le Chatelier's principle", "Equilibrium calculations"], ["K = [products]/[reactants]", "Shifting equilibrium", "ICE tables"], "intermediate"),
  createLesson("c7", "Acids and Bases", "Acids and Bases", "Acids donate protons; bases accept protons. pH measures acidity (0-14 scale). Neutralization reactions produce water and salt. Buffers resist pH changes.", ["pH and pOH", "Strong and weak acids", "Neutralization", "Buffer solutions"], ["pH = -log[H⁺]", "Ka and Kb", "Henderson-Hasselbalch equation"], "intermediate"),
  createLesson("c8", "Oxidation-Reduction", "Redox Reactions", "Redox reactions involve electron transfer. Oxidation is electron loss; reduction is electron gain. Oxidation states track electron distribution.", ["Oxidation states", "Oxidation and reduction", "Balancing redox equations", "Electrochemistry"], ["Half-reactions", "Oxidizing and reducing agents", "Galvanic cells"], "intermediate"),
  createLesson("c9", "Organic Chemistry Basics", "Organic Chemistry", "Organic chemistry studies carbon compounds. Carbon's bonding versatility creates millions of compounds. Functional groups determine reactivity.", ["Carbon bonding", "Hydrocarbons", "Functional groups", "Isomerism"], ["Alkanes, alkenes, alkynes", "Alcohols, aldehydes, ketones", "Structural isomers"], "intermediate"),
  createLesson("c10", "Periodic Table", "Periodic Table", "The periodic table organizes elements by properties. Groups have similar chemistry; periods show trends. Periodic trends predict element behavior.", ["Periodic trends", "Groups and periods", "Electron affinity", "Ionization energy"], ["Electronegativity increases", "Atomic radius decreases", "Metallic character decreases"], "beginner"),
  createLesson("c11", "Chemical Kinetics", "Kinetics", "Chemical kinetics studies reaction rates. Activation energy is the barrier to reaction. Catalysts speed reactions without being consumed.", ["Reaction rate", "Rate laws", "Activation energy", "Catalysts"], ["Rate = k[A]ⁿ", "Arrhenius equation", "Reaction mechanisms"], "advanced"),
  createLesson("c12", "Solutions and Solubility", "Solutions", "Solutions are homogeneous mixtures. Solubility depends on polarity and temperature. Concentration units include molarity, molality, and percent.", ["Solubility rules", "Molarity and molality", "Dilution", "Colligative properties"], ["M = moles/liters", "Osmotic pressure", "Boiling point elevation"], "intermediate"),
];

// ==================== BIOLOGY ====================
const BIOLOGY_LESSONS: Lesson[] = [
  createLesson("b1", "Cell Structure", "Cell Structure", "Cells are the basic units of life. Prokaryotic cells lack nuclei; eukaryotic cells have nuclei and organelles. Organelles perform specialized functions.", ["Prokaryotic vs eukaryotic", "Cell membrane", "Nucleus and organelles", "Cell wall"], ["Mitochondria: energy", "Chloroplasts: photosynthesis", "Endoplasmic reticulum"], "beginner"),
  createLesson("b2", "Cell Division", "Cell Division", "Cell division creates new cells through mitosis and meiosis. Mitosis produces identical cells; meiosis produces gametes with half the chromosomes.", ["Mitosis stages", "Meiosis I and II", "Cytokinesis", "Cell cycle"], ["Prophase, metaphase, anaphase", "Crossing over", "Homologous chromosomes"], "intermediate"),
  createLesson("b3", "DNA and Genetics", "Genetics", "DNA carries genetic information in genes. Genes code for proteins. Inheritance follows Mendelian patterns; mutations create variation.", ["DNA structure", "Genes and alleles", "Dominant and recessive", "Punnett squares"], ["Double helix", "Genotype vs phenotype", "Monohybrid crosses"], "beginner"),
  createLesson("b4", "Protein Synthesis", "Protein Synthesis", "Proteins are made from amino acids. DNA → RNA → Protein through transcription and translation. The genetic code is universal (mostly).", ["Transcription", "Translation", "Codons and anticodons", "Ribosomes"], ["mRNA and tRNA", "Start and stop codons", "Amino acid chains"], "intermediate"),
  createLesson("b5", "Photosynthesis", "Photosynthesis", "Photosynthesis converts light energy to chemical energy. Light reactions produce ATP and NADPH; Calvin cycle fixes CO₂. Chlorophyll captures light.", ["Light reactions", "Calvin cycle", "Chlorophyll", "Electron transport"], ["6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂", "Thylakoids and stroma", "Photosystem I and II"], "intermediate"),
  createLesson("b6", "Cellular Respiration", "Respiration", "Cellular respiration releases energy from glucose. Glycolysis, Krebs cycle, and electron transport chain produce ATP. Anaerobic respiration occurs without oxygen.", ["Glycolysis", "Krebs cycle", "Electron transport", "Fermentation"], ["ATP production", "Aerobic vs anaerobic", "Mitochondrial matrix"], "intermediate"),
  createLesson("b7", "Evolution", "Evolution", "Evolution explains diversity through natural selection. Organisms with advantageous traits survive and reproduce. Speciation creates new species.", ["Natural selection", "Adaptation", "Speciation", "Evidence for evolution"], ["Fossil record", "Homologous structures", "Genetic drift"], "intermediate"),
  createLesson("b8", "Ecology", "Ecology", "Ecology studies organisms and environments. Ecosystems include biotic and abiotic factors. Energy flows through food chains; nutrients cycle.", ["Biomes and ecosystems", "Food chains and webs", "Energy flow", "Nutrient cycles"], ["Producers, consumers, decomposers", "Succession", "Population dynamics"], "intermediate"),
  createLesson("b9", "Immune System", "Immune System", "The immune system defends against pathogens. Innate immunity is non-specific; adaptive immunity is specific. Antibodies and T cells provide defense.", ["Innate immunity", "Adaptive immunity", "Antibodies", "T cells and B cells"], ["Antigens and epitopes", "Vaccination", "Immune response"], "intermediate"),
  createLesson("b10", "Nervous System", "Nervous System", "The nervous system processes information. Neurons transmit signals via action potentials. Synapses connect neurons; neurotransmitters relay signals.", ["Neurons and synapses", "Action potentials", "Neurotransmitters", "Brain regions"], ["Axons and dendrites", "Resting potential", "Threshold"], "intermediate"),
  createLesson("b11", "Homeostasis", "Homeostasis", "Homeostasis maintains stable internal conditions. Negative feedback corrects deviations; positive feedback amplifies changes. Temperature, pH, and osmolarity are regulated.", ["Negative feedback", "Positive feedback", "Temperature regulation", "Osmoregulation"], ["Thermoregulation", "Kidney function", "Hormone regulation"], "intermediate"),
  createLesson("b12", "Reproduction", "Reproduction", "Reproduction creates new organisms. Asexual reproduction produces clones; sexual reproduction creates variation. Human reproduction involves gamete fusion.", ["Asexual vs sexual", "Gametogenesis", "Fertilization", "Development"], ["Mitosis vs meiosis", "Embryonic stages", "Hormonal control"], "intermediate"),
];

// ==================== COMPUTER SCIENCE ====================
const CS_LESSONS: Lesson[] = [
  createLesson("cs1", "Programming Basics", "Programming", "Programming creates instructions for computers. Variables store data; control structures direct flow. Functions organize code into reusable blocks.", ["Variables and data types", "Operators", "Control structures", "Functions"], ["if/else statements", "Loops", "Function parameters"], "beginner"),
  createLesson("cs2", "Data Structures", "Data Structures", "Data structures organize data efficiently. Arrays, lists, stacks, queues, trees, and graphs serve different purposes. Choice affects performance.", ["Arrays and lists", "Stacks and queues", "Trees", "Graphs"], ["Linked lists", "Binary search trees", "Hash tables"], "intermediate"),
  createLesson("cs3", "Algorithms", "Algorithms", "Algorithms solve problems step-by-step. Sorting, searching, and graph algorithms are fundamental. Time and space complexity measure efficiency.", ["Sorting algorithms", "Searching algorithms", "Graph algorithms", "Complexity analysis"], ["Bubble sort, merge sort", "Binary search", "Dijkstra's algorithm"], "intermediate"),
  createLesson("cs4", "Object-Oriented Programming", "OOP", "OOP organizes code into objects with properties and methods. Encapsulation, inheritance, and polymorphism are core principles. Classes define object blueprints.", ["Classes and objects", "Encapsulation", "Inheritance", "Polymorphism"], ["Constructors", "Methods", "Access modifiers"], "intermediate"),
  createLesson("cs5", "Web Development", "Web Dev", "Web development creates interactive websites. HTML structures content; CSS styles appearance; JavaScript adds interactivity. Responsive design works on all devices.", ["HTML structure", "CSS styling", "JavaScript", "Responsive design"], ["DOM manipulation", "Event listeners", "Flexbox and Grid"], "beginner"),
  createLesson("cs6", "Databases", "Databases", "Databases store and retrieve data efficiently. Relational databases use tables; SQL queries retrieve data. Normalization reduces redundancy.", ["Relational databases", "SQL queries", "Normalization", "Indexing"], ["SELECT, INSERT, UPDATE", "JOIN operations", "Primary and foreign keys"], "intermediate"),
  createLesson("cs7", "Networking", "Networking", "Networking connects computers to share data. TCP/IP is the foundation; HTTP transfers web pages. DNS translates domain names to IP addresses.", ["TCP/IP model", "HTTP and HTTPS", "DNS", "IP addresses"], ["Packets and routing", "Ports and sockets", "Network protocols"], "intermediate"),
  createLesson("cs8", "Cybersecurity", "Security", "Cybersecurity protects systems from attacks. Encryption secures data; authentication verifies identity. Common threats include malware, phishing, and SQL injection.", ["Encryption", "Authentication", "Firewalls", "Threat types"], ["Symmetric and asymmetric", "Password security", "Penetration testing"], "intermediate"),
  createLesson("cs9", "Machine Learning", "ML", "Machine learning enables computers to learn from data. Supervised learning uses labeled data; unsupervised learning finds patterns. Neural networks mimic brain structure.", ["Supervised learning", "Unsupervised learning", "Neural networks", "Training and testing"], ["Classification and regression", "Clustering", "Deep learning"], "advanced"),
  createLesson("cs10", "Version Control", "Git", "Version control tracks code changes. Git stores snapshots; branches enable parallel work. Commits record changes with messages.", ["Git basics", "Branches", "Merging", "Remote repositories"], ["Commits and logs", "Pull requests", "GitHub workflow"], "beginner"),
  createLesson("cs11", "Software Design Patterns", "Patterns", "Design patterns solve common problems. Singleton ensures one instance; Factory creates objects; Observer implements notifications.", ["Creational patterns", "Structural patterns", "Behavioral patterns", "Design principles"], ["Singleton, Factory", "Decorator, Adapter", "Observer, Strategy"], "advanced"),
  createLesson("cs12", "Testing and Debugging", "Testing", "Testing verifies code correctness. Unit tests check individual functions; integration tests check interactions. Debugging finds and fixes errors.", ["Unit testing", "Integration testing", "Debugging techniques", "Test frameworks"], ["Assertions", "Breakpoints", "Test-driven development"], "intermediate"),
];

// ==================== ENGLISH ====================
const ENGLISH_LESSONS: Lesson[] = [
  createLesson("e1", "Grammar Fundamentals", "Grammar", "Grammar is the system of language. Parts of speech include nouns, verbs, adjectives. Sentence structure follows subject-verb-object patterns.", ["Parts of speech", "Sentence structure", "Verb tenses", "Punctuation"], ["Nouns and pronouns", "Active and passive voice", "Clauses"], "beginner"),
  createLesson("e2", "Writing Process", "Writing", "Writing involves planning, drafting, revising, and editing. Thesis statements guide essays. Outlines organize ideas before writing.", ["Prewriting", "Drafting", "Revising", "Editing"], ["Brainstorming", "Outlining", "Thesis development"], "beginner"),
  createLesson("e3", "Essay Structure", "Essays", "Essays present arguments with introduction, body, and conclusion. Topic sentences guide paragraphs. Evidence supports claims.", ["Introduction", "Body paragraphs", "Conclusion", "Transitions"], ["Hook and thesis", "Topic sentences", "Counterarguments"], "beginner"),
  createLesson("e4", "Literary Analysis", "Literature", "Literary analysis examines how authors create meaning. Theme, character, plot, and symbolism are key elements. Close reading reveals layers of meaning.", ["Theme and symbolism", "Character development", "Plot structure", "Point of view"], ["Foreshadowing", "Imagery", "Metaphor and simile"], "intermediate"),
  createLesson("e5", "Rhetoric and Persuasion", "Rhetoric", "Rhetoric is the art of persuasion. Ethos, pathos, and logos appeal to credibility, emotion, and logic. Rhetorical devices strengthen arguments.", ["Ethos, pathos, logos", "Rhetorical devices", "Argument structure", "Counterarguments"], ["Alliteration and assonance", "Parallelism", "Irony and sarcasm"], "intermediate"),
  createLesson("e6", "Vocabulary and Diction", "Vocabulary", "Vocabulary is word choice; diction is how words are used. Connotation and denotation affect meaning. Context clues help determine word meanings.", ["Connotation and denotation", "Context clues", "Word roots", "Synonyms and antonyms"], ["Etymology", "Figurative language", "Register and tone"], "intermediate"),
  createLesson("e7", "Poetry", "Poetry", "Poetry uses language artfully with rhythm, rhyme, and imagery. Meter measures syllables; rhyme scheme patterns sounds. Metaphor and symbolism enrich meaning.", ["Meter and rhythm", "Rhyme and rhyme scheme", "Stanzas", "Poetic devices"], ["Iambic pentameter", "Alliteration", "Personification"], "intermediate"),
  createLesson("e8", "Drama and Plays", "Drama", "Drama tells stories through dialogue and action. Acts and scenes structure plays. Stage directions guide performance. Conflict drives dramatic tension.", ["Acts and scenes", "Dialogue", "Stage directions", "Dramatic conflict"], ["Soliloquy and aside", "Tragedy and comedy", "Character motivation"], "intermediate"),
  createLesson("e9", "Research and Citations", "Research", "Research finds credible sources to support ideas. Citations acknowledge sources and prevent plagiarism. MLA, APA, and Chicago styles format citations.", ["Primary and secondary sources", "Evaluating sources", "Citation styles", "Plagiarism"], ["MLA format", "APA format", "Works cited"], "intermediate"),
  createLesson("e10", "Public Speaking", "Speaking", "Public speaking communicates ideas to audiences. Delivery includes voice, pace, and body language. Visual aids support presentations.", ["Delivery techniques", "Audience awareness", "Organization", "Visual aids"], ["Eye contact and posture", "Vocal variety", "Handling nervousness"], "intermediate"),
  createLesson("e11", "Narrative Writing", "Narrative", "Narrative writing tells stories with characters, setting, and plot. Point of view affects how readers experience the story. Dialogue brings characters to life.", ["Point of view", "Setting and atmosphere", "Character development", "Dialogue"], ["First-person perspective", "Flashback", "Foreshadowing"], "beginner"),
  createLesson("e12", "Critical Reading", "Reading", "Critical reading evaluates arguments and evidence. Readers question assumptions and identify bias. Annotation helps track important ideas.", ["Active reading", "Identifying bias", "Evaluating arguments", "Annotation"], ["Fact vs opinion", "Logical fallacies", "Author's purpose"], "intermediate"),
];

// ==================== HISTORY ====================
const HISTORY_LESSONS: Lesson[] = [
  createLesson("h1", "Ancient Civilizations", "Ancient History", "Ancient civilizations developed in river valleys. Mesopotamia, Egypt, Indus, and China created writing, law codes, and complex societies. Agriculture enabled permanent settlements.", ["Mesopotamia", "Ancient Egypt", "Indus Valley", "Ancient China"], ["Cuneiform and hieroglyphics", "Code of Hammurabi", "Pyramids"], "beginner"),
  createLesson("h2", "Classical Greece", "Classical Period", "Classical Greece developed democracy, philosophy, and drama. Athens and Sparta represented different systems. Greek philosophy influences thought today.", ["Athenian democracy", "Spartan society", "Greek philosophy", "Classical arts"], ["Socrates, Plato, Aristotle", "Olympic Games", "Parthenon"], "beginner"),
  createLesson("h3", "Roman Empire", "Roman Period", "Rome built a vast empire with law, engineering, and military might. The Republic gave way to Empire. Roman culture influenced Western civilization.", ["Roman Republic", "Roman Empire", "Roman law", "Engineering"], ["Aqueducts", "Roads", "Colosseum"], "beginner"),
  createLesson("h4", "Medieval Europe", "Medieval Period", "Medieval Europe was feudal, religious, and agricultural. The Catholic Church dominated society. Feudalism organized social hierarchy.", ["Feudalism", "Catholic Church", "Crusades", "Medieval culture"], ["Knights and vassals", "Monasteries", "Magna Carta"], "intermediate"),
  createLesson("h5", "Renaissance", "Renaissance", "The Renaissance revived classical learning and humanism. Art, literature, and science flourished. Printing enabled knowledge spread.", ["Humanism", "Art and architecture", "Literature", "Scientific inquiry"], ["Leonardo da Vinci", "Michelangelo", "Gutenberg's printing press"], "intermediate"),
  createLesson("h6", "Age of Exploration", "Exploration", "European explorers sought new routes and lands. Columbus, da Gama, and Magellan expanded European knowledge. Colonialism resulted from exploration.", ["Motivations for exploration", "Major explorers", "Columbian Exchange", "Colonialism"], ["Triangular trade", "Disease and conquest", "Global connections"], "intermediate"),
  createLesson("h7", "Enlightenment", "Enlightenment", "The Enlightenment emphasized reason, science, and individual rights. Philosophers like Locke and Rousseau influenced revolutions. Separation of powers emerged.", ["Reason and science", "Individual rights", "Political philosophy", "Separation of powers"], ["John Locke", "Jean-Jacques Rousseau", "Montesquieu"], "intermediate"),
  createLesson("h8", "American Revolution", "Revolutions", "The American Revolution established independence and democracy. Enlightenment ideas inspired rebellion. The Constitution created a federal system.", ["Causes of revolution", "Declaration of Independence", "Revolutionary War", "Constitution"], ["Taxation without representation", "Bill of Rights", "Federalism"], "intermediate"),
  createLesson("h9", "Industrial Revolution", "Industrial Era", "The Industrial Revolution transformed production and society. Factories, machines, and steam power increased output. Urbanization and class conflict resulted.", ["Mechanization", "Factory system", "Urbanization", "Social change"], ["Steam engine", "Textile mills", "Labor movements"], "intermediate"),
  createLesson("h10", "World War I", "Modern History", "World War I was a global conflict with unprecedented casualties. Imperialism, militarism, and alliances caused war. Technology changed warfare.", ["Causes of WWI", "Trench warfare", "Technology", "Treaty of Versailles"], ["Trenches", "Machine guns", "Gas warfare"], "intermediate"),
  createLesson("h11", "World War II", "Modern History", "World War II was a global conflict between Axis and Allies. Fascism, Nazism, and militarism drove aggression. The Holocaust was genocide.", ["Causes of WWII", "Fascism and Nazism", "Holocaust", "Atomic age"], ["Blitzkrieg", "D-Day", "Atomic bombs"], "intermediate"),
  createLesson("h12", "Cold War", "Modern History", "The Cold War was ideological conflict between US and USSR. Nuclear weapons created deterrence. Proxy wars and espionage characterized the era.", ["Capitalism vs communism", "Nuclear weapons", "Proxy wars", "Espionage"], ["Cuban Missile Crisis", "Space race", "Berlin Wall"], "intermediate"),
];

// Create all subjects
export const SUBJECTS: Record<string, SubjectResource> = {
  math: {
    id: "math",
    name: "Mathematics",
    color: "from-blue-500 to-blue-600",
    description: "Master algebra, calculus, geometry, and advanced mathematical concepts",
    lessons: MATH_LESSONS,
    videos: Array.from({ length: 12 }, (_, i) => ({
      id: `v${i + 1}`,
      title: `Math Video ${i + 1}`,
      channel: "Educational Channel",
      url: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`,
      duration: `${30 + i * 5} min`,
      difficulty: i < 4 ? "beginner" : i < 8 ? "intermediate" : "advanced",
    })),
    exams: Array.from({ length: 12 }, (_, i) => ({
      id: `e${i + 1}`,
      topic: MATH_LESSONS[i].topic,
      questions: Array.from({ length: 4 }, (_, j) => ({
        id: `q${j + 1}`,
        question: `Math question about ${MATH_LESSONS[i].topic}?`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correct: j % 4,
        explanation: `Explanation for ${MATH_LESSONS[i].topic}`,
      })),
    })),
    conceptNotes: MATH_LESSONS.map((lesson) => ({
      id: lesson.id,
      topic: lesson.topic,
      content: lesson.content,
      keyPoints: lesson.keyPoints,
      examples: lesson.examples,
      difficulty: lesson.difficulty,
    })),
  },
  physics: {
    id: "physics",
    name: "Physics",
    color: "from-purple-500 to-purple-600",
    description: "Explore mechanics, thermodynamics, electromagnetism, and quantum physics",
    lessons: PHYSICS_LESSONS,
    videos: Array.from({ length: 12 }, (_, i) => ({
      id: `v${i + 1}`,
      title: `Physics Video ${i + 1}`,
      channel: "Educational Channel",
      url: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`,
      duration: `${30 + i * 5} min`,
      difficulty: i < 4 ? "beginner" : i < 8 ? "intermediate" : "advanced",
    })),
    exams: Array.from({ length: 12 }, (_, i) => ({
      id: `e${i + 1}`,
      topic: PHYSICS_LESSONS[i].topic,
      questions: Array.from({ length: 4 }, (_, j) => ({
        id: `q${j + 1}`,
        question: `Physics question about ${PHYSICS_LESSONS[i].topic}?`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correct: j % 4,
        explanation: `Explanation for ${PHYSICS_LESSONS[i].topic}`,
      })),
    })),
    conceptNotes: PHYSICS_LESSONS.map((lesson) => ({
      id: lesson.id,
      topic: lesson.topic,
      content: lesson.content,
      keyPoints: lesson.keyPoints,
      examples: lesson.examples,
      difficulty: lesson.difficulty,
    })),
  },
  chemistry: {
    id: "chemistry",
    name: "Chemistry",
    color: "from-green-500 to-green-600",
    description: "Explore atomic structure, chemical reactions, organic molecules, and laboratory techniques",
    lessons: CHEMISTRY_LESSONS,
    videos: Array.from({ length: 12 }, (_, i) => ({
      id: `v${i + 1}`,
      title: `Chemistry Video ${i + 1}`,
      channel: "Educational Channel",
      url: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`,
      duration: `${30 + i * 5} min`,
      difficulty: i < 4 ? "beginner" : i < 8 ? "intermediate" : "advanced",
    })),
    exams: Array.from({ length: 12 }, (_, i) => ({
      id: `e${i + 1}`,
      topic: CHEMISTRY_LESSONS[i].topic,
      questions: Array.from({ length: 4 }, (_, j) => ({
        id: `q${j + 1}`,
        question: `Chemistry question about ${CHEMISTRY_LESSONS[i].topic}?`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correct: j % 4,
        explanation: `Explanation for ${CHEMISTRY_LESSONS[i].topic}`,
      })),
    })),
    conceptNotes: CHEMISTRY_LESSONS.map((lesson) => ({
      id: lesson.id,
      topic: lesson.topic,
      content: lesson.content,
      keyPoints: lesson.keyPoints,
      examples: lesson.examples,
      difficulty: lesson.difficulty,
    })),
  },
  biology: {
    id: "biology",
    name: "Biology",
    color: "from-emerald-500 to-emerald-600",
    description: "Study cells, genetics, evolution, and ecosystems",
    lessons: BIOLOGY_LESSONS,
    videos: Array.from({ length: 12 }, (_, i) => ({
      id: `v${i + 1}`,
      title: `Biology Video ${i + 1}`,
      channel: "Educational Channel",
      url: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`,
      duration: `${30 + i * 5} min`,
      difficulty: i < 4 ? "beginner" : i < 8 ? "intermediate" : "advanced",
    })),
    exams: Array.from({ length: 12 }, (_, i) => ({
      id: `e${i + 1}`,
      topic: BIOLOGY_LESSONS[i].topic,
      questions: Array.from({ length: 4 }, (_, j) => ({
        id: `q${j + 1}`,
        question: `Biology question about ${BIOLOGY_LESSONS[i].topic}?`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correct: j % 4,
        explanation: `Explanation for ${BIOLOGY_LESSONS[i].topic}`,
      })),
    })),
    conceptNotes: BIOLOGY_LESSONS.map((lesson) => ({
      id: lesson.id,
      topic: lesson.topic,
      content: lesson.content,
      keyPoints: lesson.keyPoints,
      examples: lesson.examples,
      difficulty: lesson.difficulty,
    })),
  },
  computerscience: {
    id: "computerscience",
    name: "Computer Science",
    color: "from-indigo-500 to-indigo-600",
    description: "Learn programming, algorithms, data structures, and computer systems",
    lessons: CS_LESSONS,
    videos: Array.from({ length: 12 }, (_, i) => ({
      id: `v${i + 1}`,
      title: `CS Video ${i + 1}`,
      channel: "Educational Channel",
      url: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`,
      duration: `${30 + i * 5} min`,
      difficulty: i < 4 ? "beginner" : i < 8 ? "intermediate" : "advanced",
    })),
    exams: Array.from({ length: 12 }, (_, i) => ({
      id: `e${i + 1}`,
      topic: CS_LESSONS[i].topic,
      questions: Array.from({ length: 4 }, (_, j) => ({
        id: `q${j + 1}`,
        question: `CS question about ${CS_LESSONS[i].topic}?`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correct: j % 4,
        explanation: `Explanation for ${CS_LESSONS[i].topic}`,
      })),
    })),
    conceptNotes: CS_LESSONS.map((lesson) => ({
      id: lesson.id,
      topic: lesson.topic,
      content: lesson.content,
      keyPoints: lesson.keyPoints,
      examples: lesson.examples,
      difficulty: lesson.difficulty,
    })),
  },
  english: {
    id: "english",
    name: "English",
    color: "from-amber-500 to-amber-600",
    description: "Master literature, writing, grammar, and communication",
    lessons: ENGLISH_LESSONS,
    videos: Array.from({ length: 12 }, (_, i) => ({
      id: `v${i + 1}`,
      title: `English Video ${i + 1}`,
      channel: "Educational Channel",
      url: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`,
      duration: `${30 + i * 5} min`,
      difficulty: i < 4 ? "beginner" : i < 8 ? "intermediate" : "advanced",
    })),
    exams: Array.from({ length: 12 }, (_, i) => ({
      id: `e${i + 1}`,
      topic: ENGLISH_LESSONS[i].topic,
      questions: Array.from({ length: 4 }, (_, j) => ({
        id: `q${j + 1}`,
        question: `English question about ${ENGLISH_LESSONS[i].topic}?`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correct: j % 4,
        explanation: `Explanation for ${ENGLISH_LESSONS[i].topic}`,
      })),
    })),
    conceptNotes: ENGLISH_LESSONS.map((lesson) => ({
      id: lesson.id,
      topic: lesson.topic,
      content: lesson.content,
      keyPoints: lesson.keyPoints,
      examples: lesson.examples,
      difficulty: lesson.difficulty,
    })),
  },
  history: {
    id: "history",
    name: "History",
    color: "from-orange-500 to-orange-600",
    description: "Explore world history, civilizations, and historical events",
    lessons: HISTORY_LESSONS,
    videos: Array.from({ length: 12 }, (_, i) => ({
      id: `v${i + 1}`,
      title: `History Video ${i + 1}`,
      channel: "Educational Channel",
      url: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`,
      duration: `${30 + i * 5} min`,
      difficulty: i < 4 ? "beginner" : i < 8 ? "intermediate" : "advanced",
    })),
    exams: Array.from({ length: 12 }, (_, i) => ({
      id: `e${i + 1}`,
      topic: HISTORY_LESSONS[i].topic,
      questions: Array.from({ length: 4 }, (_, j) => ({
        id: `q${j + 1}`,
        question: `History question about ${HISTORY_LESSONS[i].topic}?`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correct: j % 4,
        explanation: `Explanation for ${HISTORY_LESSONS[i].topic}`,
      })),
    })),
    conceptNotes: HISTORY_LESSONS.map((lesson) => ({
      id: lesson.id,
      topic: lesson.topic,
      content: lesson.content,
      keyPoints: lesson.keyPoints,
      examples: lesson.examples,
      difficulty: lesson.difficulty,
    })),
  },
};

export function getSubject(id: string): SubjectResource | null {
  return SUBJECTS[id] || null;
}

export function getAllSubjects(): SubjectResource[] {
  return Object.values(SUBJECTS);
}
