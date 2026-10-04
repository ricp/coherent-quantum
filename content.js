/* Campaign data. Paper metadata is copied from the reviewed bibliography. */
(function (root, factory) {
  const data = factory();
  if (typeof module === 'object' && module.exports) module.exports = data;
  else root.CoherentContent = data;
})(globalThis, function () {
  const papers = {
  "Q01": {
    "id": "Q01",
    "authors": "Richard P. Feynman",
    "title": "Simulating physics with computers",
    "date": "1982",
    "type": "Theoretical motivation",
    "finding": "Opens quantum simulation as a purpose; does not establish that every quantum problem becomes easy",
    "links": [
      {
        "label": "Publisher DOI",
        "url": "https://doi.org/10.1007/BF02650179"
      },
      {
        "label": "Caltech author archive",
        "url": "https://authors.library.caltech.edu/records/a1kgk-xyk45"
      }
    ]
  },
  "Q02": {
    "id": "Q02",
    "authors": "David Deutsch",
    "title": "Quantum theory, the Church–Turing principle and the universal quantum computer",
    "date": "1985",
    "type": "Theory",
    "finding": "Universal-machine history and circuit progression; hardware implementation remains separate",
    "links": [
      {
        "label": "DOI",
        "url": "https://doi.org/10.1098/rspa.1985.0070"
      },
      {
        "label": "paper hosted by Princeton",
        "url": "https://www.cs.princeton.edu/courses/archive/fall06/cos576/papers/deutsch85.pdf"
      }
    ]
  },
  "Q03": {
    "id": "Q03",
    "authors": "David P. DiVincenzo",
    "title": "The Physical Implementation of Quantum Computation",
    "date": "2000",
    "type": "Engineering framework",
    "finding": "Physical requirements such as initialization, coherent control, and measurement; no automatic device qualification from a single metric",
    "links": [
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/quant-ph/0002077"
      },
      {
        "label": "DOI",
        "url": "https://doi.org/10.1002/1521-3978%28200009%2948:9/11%3C771::AID-PROP771%3E3.0.CO;2-E"
      }
    ]
  },
  "Q04": {
    "id": "Q04",
    "authors": "Philip Krantz et al.",
    "title": "A Quantum Engineer’s Guide to Superconducting Qubits",
    "date": "2019; arXiv revision 2021",
    "type": "Engineering review",
    "finding": "Selected hardware architecture, control, readout, coherence, and noise; not requirements for all modalities",
    "links": [
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/1904.06560"
      },
      {
        "label": "DOI",
        "url": "https://doi.org/10.1063/1.5089550"
      }
    ]
  },
  "Q05": {
    "id": "Q05",
    "authors": "Easwar Magesan, Jay M. Gambetta, Joseph Emerson",
    "title": "Characterizing Quantum Gates via Randomized Benchmarking",
    "date": "preprint 2011, journal 2012",
    "type": "Characterization method",
    "finding": "A measured gate-error estimate and its assumptions; average RB error is not a universal threshold-model parameter",
    "links": [
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/1109.6887"
      },
      {
        "label": "DOI",
        "url": "https://doi.org/10.1103/PhysRevA.85.042311"
      }
    ]
  },
  "Q06": {
    "id": "Q06",
    "authors": "John Preskill",
    "title": "Quantum Computing in the NISQ era and beyond",
    "date": "2018",
    "type": "Perspective and scientific framework",
    "finding": "Noisy circuits, useful experiments, and the route to fault tolerance; avoids promising immediate practical speedup from qubit count",
    "links": [
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/1801.00862"
      },
      {
        "label": "open journal DOI",
        "url": "https://doi.org/10.22331/q-2018-08-06-79"
      }
    ]
  },
  "Q07": {
    "id": "Q07",
    "authors": "Peter W. Shor",
    "title": "Scheme for reducing decoherence in quantum computer memory",
    "date": "1995",
    "type": "Quantum error-correction theory",
    "finding": "Historical protection milestone; a code construction is not a qualified universal machine",
    "links": [
      {
        "label": "DOI",
        "url": "https://doi.org/10.1103/PhysRevA.52.R2493"
      }
    ]
  },
  "Q08": {
    "id": "Q08",
    "authors": "Austin G. Fowler, Matteo Mariantoni, John M. Martinis, Andrew N. Cleland",
    "title": "Surface codes: Towards practical large-scale quantum computation",
    "date": "2012",
    "type": "Code and engineering resource analysis",
    "finding": "Distance, fault-tolerance assumptions, and logical operation resources; thresholds depend on the modeled circuit and noise",
    "links": [
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/1208.0928"
      },
      {
        "label": "DOI",
        "url": "https://doi.org/10.1103/PhysRevA.86.032324"
      }
    ]
  },
  "Q09": {
    "id": "Q09",
    "authors": "Rajeev Acharya et al.",
    "title": "Quantum error correction below the surface code threshold",
    "date": "preprint 2024, Nature volume publication 2025",
    "type": "Experiment",
    "finding": "A specific demonstrated memory-scaling result and decoding implementation; not proof of a complete application-scale gate stack",
    "links": [
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2408.13687"
      },
      {
        "label": "Nature DOI",
        "url": "https://doi.org/10.1038/s41586-024-08449-y"
      }
    ]
  },
  "Q10": {
    "id": "Q10",
    "authors": "Daniel Litinski",
    "title": "A Game of Surface Codes: Large-Scale Quantum Computing with Lattice Surgery",
    "date": "preprint 2018, journal 2019",
    "type": "Architectural resource model",
    "finding": "Space-time planning, logical operations, and factories; tile approximations must not be mixed with exact standalone patch counts",
    "links": [
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/1808.02892"
      },
      {
        "label": "open journal DOI",
        "url": "https://doi.org/10.22331/q-2019-03-05-128"
      },
      {
        "label": "full HTML with equation 10",
        "url": "https://arxiv.org/html/1808.02892v3"
      }
    ]
  },
  "Q11": {
    "id": "Q11",
    "authors": "Sergey Bravyi and Alexei Kitaev",
    "title": "Universal Quantum Computation with ideal Clifford gates and noisy ancillas",
    "date": "preprint 2004, journal 2005",
    "type": "Theory",
    "finding": "Non-Clifford resources and distillation; a chosen architecture’s factories are not universal quantum fuel",
    "links": [
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/quant-ph/0403025"
      },
      {
        "label": "DOI",
        "url": "https://doi.org/10.1103/PhysRevA.71.022316"
      }
    ]
  },
  "Q22": {
    "id": "Q22",
    "authors": "Troels F. Rønnow et al.",
    "title": "Defining and detecting quantum speedup",
    "date": "2014",
    "type": "Benchmarking framework",
    "finding": "Carefully scoped comparisons and baselines; a speedup claim must identify the task and classical comparator",
    "links": [
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/1401.2910"
      },
      {
        "label": "Science DOI",
        "url": "https://doi.org/10.1126/science.1252319"
      }
    ]
  },
  "Q23": {
    "id": "Q23",
    "authors": "Scott Aaronson and Daniel Gottesman",
    "title": "Improved Simulation of Stabilizer Circuits",
    "date": "2004",
    "type": "Classical simulation theory",
    "finding": "Shows why entanglement and many qubits alone do not certify advantage",
    "links": [
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/quant-ph/0406196"
      },
      {
        "label": "DOI",
        "url": "https://doi.org/10.1103/PhysRevA.70.052328"
      }
    ]
  },
  "Q12": {
    "id": "Q12",
    "authors": "Peter W. Shor",
    "title": "Polynomial-Time Algorithms for Prime Factorization and Discrete Logarithms on a Quantum Computer",
    "date": "expanded preprint 1995, journal 1997; algorithm first reported at FOCS 1994",
    "type": "Algorithm theory",
    "finding": "Synthetic factoring and discrete-log challenges; practical costs and the comparison to best known classical algorithms must be stated",
    "links": [
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/quant-ph/9508027"
      },
      {
        "label": "SIAM DOI",
        "url": "https://doi.org/10.1137/S0097539795293172"
      }
    ]
  },
  "Q13": {
    "id": "Q13",
    "authors": "Lov K. Grover",
    "title": "A fast quantum mechanical algorithm for database search",
    "date": "1996",
    "type": "Algorithm theory",
    "finding": "Quadratic oracle-query reduction; include oracle construction and access costs",
    "links": [
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/quant-ph/9605043"
      },
      {
        "label": "ACM DOI",
        "url": "https://doi.org/10.1145/237814.237866"
      }
    ]
  },
  "Q14": {
    "id": "Q14",
    "authors": "Seth Lloyd",
    "title": "Universal Quantum Simulators",
    "date": "1996",
    "type": "Algorithm theory",
    "finding": "Simulating appropriate local dynamics; not a promise that arbitrary ground-state problems are easy",
    "links": [
      {
        "label": "Science DOI",
        "url": "https://doi.org/10.1126/science.273.5278.1073"
      }
    ]
  },
  "Q15": {
    "id": "Q15",
    "authors": "Dominic W. Berry, Andrew M. Childs, Robin Kothari",
    "title": "Hamiltonian simulation with nearly optimal dependence on all parameters",
    "date": "2015",
    "type": "Algorithm theory",
    "finding": "A workload-specific algorithm improvement and precision tradeoffs",
    "links": [
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/1501.01715"
      },
      {
        "label": "FOCS DOI",
        "url": "https://doi.org/10.1109/FOCS.2015.54"
      }
    ]
  },
  "Q16": {
    "id": "Q16",
    "authors": "Alberto Peruzzo et al.",
    "title": "A variational eigenvalue solver on a photonic quantum processor",
    "date": "preprint 2013, journal 2014",
    "type": "Experiment and algorithm",
    "finding": "Hybrid measurement/optimization tutorial; its photonic hardware should not be described as a superconducting demonstration",
    "links": [
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/1304.3061"
      },
      {
        "label": "Nature Communications DOI",
        "url": "https://doi.org/10.1038/ncomms5213"
      }
    ]
  },
  "Q17": {
    "id": "Q17",
    "authors": "Jarrod R. McClean et al.",
    "title": "Barren plateaus in quantum neural network training landscapes",
    "date": "2018",
    "type": "Theory",
    "finding": "Difficult training landscapes in specified regimes; not a universal impossibility theorem for all variational methods",
    "links": [
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/1803.11173"
      },
      {
        "label": "Nature Communications DOI",
        "url": "https://doi.org/10.1038/s41467-018-07090-4"
      }
    ]
  },
  "Q18": {
    "id": "Q18",
    "authors": "Ryuji Takagi, Suguru Endo, Shintaro Minagawa, Mile Gu",
    "title": "Fundamental limits of quantum error mitigation",
    "date": "preprint 2021, journal 2022",
    "type": "Theory and limits",
    "finding": "Sampling overhead and limitations; mitigation does not turn biased noisy output into exact results for free",
    "links": [
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2109.04457"
      },
      {
        "label": "npj Quantum Information DOI",
        "url": "https://doi.org/10.1038/s41534-022-00618-z"
      }
    ]
  },
  "Q19": {
    "id": "Q19",
    "authors": "Markus Reiher et al.",
    "title": "Elucidating Reaction Mechanisms on Quantum Computers",
    "date": "preprint 2016, journal 2017",
    "type": "Chemical-model resource analysis",
    "finding": "Named chemical-model tasks and resources; computing an energy does not automatically discover a viable industrial process",
    "links": [
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/1605.03590"
      },
      {
        "label": "PNAS DOI",
        "url": "https://doi.org/10.1073/pnas.1619152114"
      }
    ]
  },
  "Q20": {
    "id": "Q20",
    "authors": "Craig Gidney and Martin Ekerå",
    "title": "How to factor 2048 bit RSA integers in 8 hours using 20 million noisy qubits",
    "date": "preprint 2019, journal 2021",
    "type": "Resource estimate",
    "finding": "A dated illustrative scenario with stated assumptions, not a demonstration or permanent minimum",
    "links": [
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/1905.09749"
      },
      {
        "label": "open journal DOI",
        "url": "https://doi.org/10.22331/q-2021-04-15-433"
      }
    ]
  },
  "Q21": {
    "id": "Q21",
    "authors": "Craig Gidney",
    "title": "How to factor 2048 bit RSA integers with less than a million noisy qubits",
    "date": "preprint 2025",
    "type": "Resource estimate",
    "finding": "Updated size/time tradeoffs and algorithm engineering; not a working attack or prediction of deployment date",
    "links": [
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2505.15917"
      }
    ]
  },
  "Q35": {
    "id": "Q35",
    "authors": "Martin Roetteler, Michael Naehrig, Krysta M. Svore, Kristin Lauter",
    "title": "Quantum Resource Estimates for Computing Elliptic Curve Discrete Logarithms",
    "date": "2017",
    "type": "Algorithm resource estimate",
    "finding": "Relevant to elliptic-curve signature discussion; logical-circuit counts are not complete physical-machine counts",
    "links": [
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/1706.06752"
      },
      {
        "label": "ASIACRYPT DOI",
        "url": "https://doi.org/10.1007/978-3-319-70697-9_9"
      }
    ]
  },
  "Q36": {
    "id": "Q36",
    "authors": "Ashley Montanaro",
    "title": "Quantum speedup of Monte Carlo methods",
    "date": "2015",
    "type": "Algorithm theory",
    "finding": "Optional precision-estimation work; coherent access and full overhead must be counted",
    "links": [
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/1504.06987"
      },
      {
        "label": "Proceedings A DOI",
        "url": "https://doi.org/10.1098/rspa.2015.0301"
      }
    ]
  },
  "Q24": {
    "id": "Q24",
    "authors": "Yasunobu Nakamura, Yu. A. Pashkin, J. S. Tsai",
    "title": "Coherent control of macroscopic quantum states in a single-Cooper-pair box",
    "date": "1999",
    "type": "Experiment",
    "finding": "Historical superconducting control; distinguish the device from later transmon hardware",
    "links": [
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/cond-mat/9904003"
      },
      {
        "label": "Nature DOI",
        "url": "https://doi.org/10.1038/19718"
      }
    ]
  },
  "Q25": {
    "id": "Q25",
    "authors": "Clare Horsman, Austin G. Fowler, Simon Devitt, Rodney Van Meter",
    "title": "Surface code quantum computing by lattice surgery",
    "date": "preprint 2011, journal 2012",
    "type": "Code and architecture method",
    "finding": "Logical operations and routing requirements",
    "links": [
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/1111.4022"
      },
      {
        "label": "New Journal of Physics DOI",
        "url": "https://doi.org/10.1088/1367-2630/14/12/123011"
      }
    ]
  },
  "Q26": {
    "id": "Q26",
    "authors": "Alexandre Blais et al.",
    "title": "Circuit Quantum Electrodynamics",
    "date": "preprint 2020, journal 2021",
    "type": "Engineering review",
    "finding": "Resonators, control, coupling, and superconducting visual context",
    "links": [
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2005.12667"
      },
      {
        "label": "Reviews of Modern Physics DOI",
        "url": "https://doi.org/10.1103/RevModPhys.93.025005"
      }
    ]
  },
  "Q27": {
    "id": "Q27",
    "authors": "Colin D. Bruzewicz et al.",
    "title": "Trapped-Ion Quantum Computing: Progress and Challenges",
    "date": "2019",
    "type": "Engineering review",
    "finding": "Shows why architecture assumptions matter; do not apply dilution-fridge rules to all modalities",
    "links": [
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/1904.04178"
      },
      {
        "label": "Applied Physics Reviews DOI",
        "url": "https://doi.org/10.1063/1.5088164"
      }
    ]
  },
  "Q28": {
    "id": "Q28",
    "authors": "Dolev Bluvstein et al.",
    "title": "Logical quantum processor based on reconfigurable atom arrays",
    "date": "preprint 2023, Nature volume publication 2024",
    "type": "Experiment",
    "finding": "Alternative hardware and encoded circuits; distinguish detection and postselection from a general continuously corrected machine",
    "links": [
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2312.03982"
      },
      {
        "label": "Nature DOI",
        "url": "https://doi.org/10.1038/s41586-023-06927-3"
      }
    ]
  },
  "Q29": {
    "id": "Q29",
    "authors": "William K. Wootters and Wojciech H. Zurek",
    "title": "A single quantum cannot be cloned",
    "date": "1982",
    "type": "Theory",
    "finding": "Encoded information and syndrome measurements do not copy an unknown quantum state",
    "links": [
      {
        "label": "Nature DOI",
        "url": "https://doi.org/10.1038/299802a0"
      }
    ]
  },
  "Q30": {
    "id": "Q30",
    "authors": "Daniel Gottesman",
    "title": "Quantum Error Correction and Fault-Tolerance",
    "date": "2005",
    "type": "Theory overview",
    "finding": "Distinguishes coding, protected memory, fault-tolerant gates, and complete computation",
    "links": [
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/quant-ph/0507174"
      }
    ]
  },
  "Q31": {
    "id": "Q31",
    "authors": "Sergey Bravyi et al.",
    "title": "High-threshold and low-overhead fault-tolerant quantum memory",
    "date": "preprint 2023, journal 2024",
    "type": "Alternative-code analysis",
    "finding": "qLDPC is a credible alternative with different connectivity/decoding requirements; not a free surface-code multiplier",
    "links": [
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2308.07915"
      },
      {
        "label": "Nature DOI",
        "url": "https://doi.org/10.1038/s41586-024-07107-7"
      }
    ]
  },
  "Q32": {
    "id": "Q32",
    "authors": "Oded Regev",
    "title": "On Lattices, Learning with Errors, Random Linear Codes, and Cryptography",
    "date": "STOC precursor 2005, journal 2009",
    "type": "Cryptographic theory",
    "finding": "LWE hardness relationships and assumptions; cannot describe all lattice keys as proven quantum-proof",
    "links": [
      {
        "label": "Author’s journal manuscript",
        "url": "https://cims.nyu.edu/~regev/papers/qcrypto.pdf"
      },
      {
        "label": "JACM DOI",
        "url": "https://doi.org/10.1145/1568318.1568324"
      }
    ]
  },
  "Q33": {
    "id": "Q33",
    "authors": "Youngseok Kim et al.",
    "title": "Evidence for the utility of quantum computing before fault tolerance",
    "date": "2023",
    "type": "Experiment",
    "finding": "Useful benchmark narrative; the paper did not set out to prove a speedup for a problem with established classical hardness",
    "links": [
      {
        "label": "Nature DOI",
        "url": "https://doi.org/10.1038/s41586-023-06096-3"
      }
    ]
  },
  "Q34": {
    "id": "Q34",
    "authors": "Tomislav Begušić and Garnet Kin-Lic Chan",
    "title": "Fast classical simulation of evidence for the utility of quantum computing before fault tolerance",
    "date": "preprint 2023",
    "type": "Classical method and comparison",
    "finding": "Pair with Q33 to show how improved classical approaches can change interpretation; avoid declaring a universal winner",
    "links": [
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2306.16372"
      }
    ]
  }
};
  const chapters = [
    {name:'First signal',title:'One qubit.',accent:'A world of possibility.',subtitle:'A room. A refrigerator. A very fragile beginning.',instrument:'The first apparatus',goal:'Prepare a qubit. Find a signal. Give it a purpose.',transition:'A signal worth listening to.',story:'You have persuaded a superconducting circuit to behave coherently. The room is still larger than the computer.'},
    {name:'Control room',title:'Listen closely.',accent:'The noise has a shape.',subtitle:'Preparation, control, and measurement. In that order.',instrument:'The control room',goal:'Characterize the device, then connect a second qubit.',transition:'The laboratory learns to listen.',story:'Every good result begins with a calibration. Every calibration ends with another question.'},
    {name:'Noisy circuits',title:'Small errors.',accent:'Bigger possibilities.',subtitle:'A processor is more than the sum of its qubits.',instrument:'The noisy processor',goal:'Optimize a two-spin tutorial and reproduce its energy.',transition:'One qubit becomes a machine.',story:'The chip is growing. So is the list of things that can go wrong. Your first useful calculation is waiting.'},
    {name:'Protected memory',title:'Fragile parts.',accent:'A steadier whole.',subtitle:'Many physical qubits. One carefully protected idea.',instrument:'The surface-code memory',goal:'Trade physical space for qualified logical memory.',transition:'The information survives.',story:'You do not read the unknown state. You read the evidence of errors, and let the decoder do its work.'},
    {name:'Logical machine',title:'Keep it alive.',accent:'Then put it to work.',subtitle:'Memory, operations, routing, and an actual schedule.',instrument:'The logical foundry',goal:'Qualify gates and rehearse a factory schedule.',transition:'Protection becomes orchestration.',story:'A memory can remember. A computer must also act. The difference takes rather more space than the brochure suggested.'},
    {name:'Useful work',title:'A little less noise.',accent:'A little more possibility.',subtitle:'The machine is ready for a question worth asking.',instrument:'The useful instrument',goal:'Complete a named workload within its full resource budget.',transition:'At last, a question worth asking.',story:'The machine is no longer the point. The experiment is. Choose your work, and give it the resources it needs.'}
  ];
  // id, chapter, title, game effect, papers, prerequisites, funding, effort, qualification
  const projects = [
    ['feynman',0,'A world to simulate','Give the first experiment a purpose.',['Q01'],[],15,8,'signal'],
    ['deutsch',0,'A universal idea','Open the circuit notebook.',['Q02'],['feynman'],25,14],
    ['divincenzo',0,'The physical checklist','Make hardware readiness part of the plan.',['Q03'],['deutsch'],45,22],
    ['nakamura',0,'Coherent control','Enter the control room.',['Q24'],['divincenzo'],70,30],
    ['ramsey',1,'A fringe in the noise','Expose drift and the Ramsey T₂* estimate.',['Q04'],['nakamura'],90,45,'ramsey'],
    ['echo',1,'An echo, not a miracle','Separate echo T₂ from Ramsey T₂*.',['Q04'],['ramsey'],110,60,'echo'],
    ['readout',1,'Read the result carefully','Reduce the scenario’s residual readout bias.',['Q04'],['ramsey'],120,65,'readout'],
    ['rb',1,'Characterize the gates','Unlock pulse engineering and automatic calibration.',['Q05'],['echo','readout'],150,85,'benchmark'],
    ['coupled',1,'The second conversation','Connect calibrated qubits. Enter the noisy era.',['Q04','Q26'],['rb'],200,110,'coupled'],
    ['nisq',2,'The noisy intermediate era','Open explicitly qualified laboratory service contracts.',['Q06'],['coupled'],260,140,'circuit'],
    ['vqe',2,'A hybrid conversation','Optimize a classically reproducible two-spin tutorial.',['Q16'],['nisq'],320,170],
    ['ansatz',2,'Choose the question well','Reveal the tutorial’s exact variational energy landscape.',['Q17'],['vqe'],350,180],
    ['mitigation',2,'More shots. Less bias.','Enable a costly measurement-mitigation scenario.',['Q18'],['vqe','readout'],400,210],
    ['classical',2,'The classical challenger','Validate the tutorial; open the path to correction.',['Q33','Q34'],['ansatz','mitigation'],500,250,'vqe'],
    ['shor',3,'Information worth protecting','Introduce encoded-memory experiments.',['Q07'],['classical'],600,290],
    ['stabilizer',3,'Read errors, not secrets','Reveal syndrome detection events.',['Q30','Q29'],['shor'],650,320],
    ['surface',3,'A patch of protection','Allocate ideal rotated memory patches.',['Q08'],['stabilizer'],700,340],
    ['decoder',3,'A classical companion','Unlock streaming decoder upgrades.',['Q09'],['surface'],800,370],
    ['threshold',3,'Below the threshold','Qualify the current memory regime; enter logical engineering.',['Q09'],['decoder'],900,420,'memory'],
    ['surgery',4,'Make room to operate','Reserve routing and spare footprint for logical operations.',['Q25'],['threshold'],1100,480],
    ['gates',4,'A memory learns to act','Qualify a separate logical-operation model.',['Q30'],['surgery'],1200,520,'gates'],
    ['ancilla',4,'A careful kind of resource','Enable the selected distillation-output scenario.',['Q11'],['gates'],1400,570],
    ['factories',4,'A factory needs a floor plan','Allocate factories and produce scheduling rehearsal credits.',['Q10'],['ancilla'],1600,620,'factory'],
    ['accounting',4,'Count everything that matters','Open full resource previews and the useful-work chapter.',['Q20','Q21'],['factories'],1800,700],
    ['lloyd',5,'Let the spins evolve','Open the named Ising-dynamics resource scenario.',['Q14'],['accounting'],2000,780],
    ['hamiltonian',5,'A better simulation recipe','Qualify the selected dynamics precision recipe.',['Q15'],['lloyd'],2200,840],
    ['factoring',5,'Fifteen, without the theatre','Open a toy factor certificate and its logical resource recipe.',['Q12'],['accounting'],1700,650],
    ['grover',5,'A search with an honest oracle','Count the toy oracle, its access, and repetition costs.',['Q13'],['accounting'],1700,650],
    ['chemistry',5,'An energy, not a miracle cure','Open a named electronic-model resource scenario.',['Q19'],['hamiltonian'],2300,880],
    ['audit',5,'Useful, with the caveats intact','Audit the interpretation. Completing a scientific scenario unlocks the ending.',['Q22','Q23'],['hamiltonian'],2500,950]
  ].map(([id,chapter,title,effect,papers,requires,funds,effort,qualification]) => ({id,chapter,title,effect,papers,requires,cost:{funds,effort},qualification}));
  const experiments = [
    {id:'signal',name:'Prepare & measure',chapter:0,requires:[],seconds:5,cost:0,shots:128,description:'Prepare a known state, apply a pulse, and collect repeated measurements.'},
    {id:'ramsey',name:'Run a Ramsey scan',chapter:1,requires:['nakamura'],seconds:7,cost:6,shots:512,description:'A selected T₂* scenario, with drift and inhomogeneous dephasing.'},
    {id:'echo',name:'Run echo & relaxation',chapter:1,requires:['ramsey'],seconds:7,cost:10,shots:1024,description:'Separate relaxation T₁ and echo coherence T₂.'},
    {id:'readout',name:'Characterize readout',chapter:1,requires:['ramsey'],seconds:6,cost:12,shots:2048,description:'Repeated known preparations reveal a selected measurement-bias scenario.'},
    {id:'benchmark',name:'Benchmark the gates',chapter:1,requires:['readout','echo'],seconds:9,cost:18,shots:4096,description:'An illustrative RB estimate. This is not the threshold-model error parameter.'},
    {id:'circuit',name:'Run a coupled circuit',chapter:2,requires:['coupled'],seconds:8,cost:25,shots:2048,description:'Repeated preparations of a known Bell state; the histogram is sample counts.'},
    {id:'vqe',name:'Measure the trial energy',chapter:2,requires:['vqe'],seconds:10,cost:35,description:'The browser classically simulates the chosen two-spin ansatz and samples three Pauli groups.'},
    {id:'memory',name:'Rehearse protected memory',chapter:3,requires:['surface','decoder'],seconds:10,cost:40,shots:100,description:'Sample 100 illustrative detection-event trials under the current educational model.'},
    {id:'gates',name:'Qualify a logical schedule',chapter:4,requires:['surgery'],seconds:12,cost:65,shots:100,description:'A separate operation scenario, with routing and classical feedback.'},
    {id:'factory',name:'Rehearse the factory',chapter:4,requires:['ancilla'],seconds:12,cost:80,shots:100,description:'Qualify the current fictional factory scenario. Credits are schedules, not stored states.'}
  ];
  const workloads = [
    {id:'dynamics',name:'Thirty-two spins. One question.',tag:'Future scenario',requires:['hamiltonian'],width:32,gates:4800,depth:200,magic:192,repetitions:1,preparation:80,readout:40,classical:60,preparationRisk:.001,otherRisk:.0005,maxRisk:.04,maxTime:20000,precision:.02,target:.02,fee:600,payout:3500,seconds:35,description:'Periodic 32-site Ising model, J=1, hₓ=0.7, h_z=0.3. Start |0…0〉, evolve to t=1; target mean Z magnetization within 0.02.',validation:'Modeled scenario completion. No large-system magnetization is computed in this browser.'},
    {id:'factors',name:'The fifteen certificate',tag:'Classical tutorial + modeled execution',requires:['factoring'],width:2,gates:24,depth:16,magic:8,repetitions:3,preparation:12,readout:8,classical:10,preparationRisk:.0005,otherRisk:.0002,maxRisk:.06,maxTime:10000,precision:0,target:0,fee:120,payout:600,seconds:15,description:'Synthetic factor challenge N=15. Operation, oracle, fresh-state, and repetition costs are included in the educational schedule.',validation:'The browser checks 3 × 5 = 15. This certificate is classical; no quantum factoring algorithm was executed.'},
    {id:'search',name:'A search with all the costs',tag:'Classical tutorial + modeled execution',requires:['grover'],width:3,gates:60,depth:24,magic:12,repetitions:2,preparation:20,readout:10,classical:15,preparationRisk:.0005,otherRisk:.0002,maxRisk:.06,maxTime:12000,precision:0,target:0,fee:150,payout:700,seconds:18,description:'Eight known entries; the marked entry is cobalt. The recipe includes reversible-oracle and data-access operations.',validation:'The browser checks the returned index against the known oracle. No quantum search advantage is claimed.'},
    {id:'molecule',name:'An electronic energy, carefully',tag:'Future scenario',requires:['chemistry'],width:12,gates:2200,depth:190,magic:96,repetitions:2,preparation:60,readout:30,classical:90,preparationRisk:.001,otherRisk:.0005,maxRisk:.04,maxTime:30000,precision:.01,target:.01,fee:450,payout:2500,seconds:28,description:'Six-site periodic Hubbard ring: nearest-neighbor hopping t=1, on-site U=4, six electrons, balanced spins, 12 spin orbitals. Target ground-state energy per site within 0.01. A selected recipe, not a compiled chemistry calculation.',validation:'Modeled Hubbard resource-study completion. No electronic energy, catalyst, or industrial process is computed.'}
  ];
  return {papers,chapters,projects,experiments,workloads};
});
