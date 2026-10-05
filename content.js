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
    "finding": "A specific demonstrated memory-scaling result and decoding implementation; not proof of a complete application-scale gate stack. The 2026 author correction fixes figure 3a repetition-code and reference labels; it is not a new performance result.",
    "links": [
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2408.13687"
      },
      {
        "label": "Nature DOI",
        "url": "https://doi.org/10.1038/s41586-024-08449-y"
      },
      {
        "label": "2026 author correction",
        "url": "https://doi.org/10.1038/s41586-026-10559-8"
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
  Object.assign(papers,{
  "Q37": {
    "id": "Q37",
    "authors": "Laura Caune, Luka Skoric, Nick S. Blunt, Archibald Ruban et al.",
    "title": "Demonstrating real-time and low-latency quantum error correction with superconducting qubits",
    "date": "preprint 2024; journal 2026",
    "type": "Real-time decoding experiment",
    "finding": "A small superconducting experiment integrates FPGA decoding and feedback. Streaming throughput and full response latency are separate; its measured timings do not certify a large universal logical processor.",
    "links": [
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2410.05202"
      },
      {
        "label": "DOI",
        "url": "https://doi.org/10.1038/s41467-026-73331-6"
      }
    ],
    "game": "Unlocks authored controller profiles separating throughput and response; their numerical coefficients are game presets, not measured device timings."
  },
  "Q38": {
    "id": "Q38",
    "authors": "Volodymyr Sivak, Alexis Morvan, Michael Broughton et al.",
    "title": "Reinforcement learning control of quantum error correction",
    "date": "preprint 2025; journal 2026",
    "type": "Adaptive control experiment",
    "finding": "A classical learning controller uses error-detection information to steer superconducting control parameters against drift. The studied improvement is conditional; syndrome events do not reveal an unknown logical state.",
    "links": [
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2511.08493"
      },
      {
        "label": "DOI",
        "url": "https://doi.org/10.1038/s41586-026-10759-2"
      }
    ],
    "game": "Unlocks a bounded 10% maintenance reduction in the selected drift-management scenario. The paper does not validate this game coefficient."
  },
  "Q39": {
    "id": "Q39",
    "authors": "Craig Gidney, Noah Shutty, Cody Jones",
    "title": "Magic state cultivation: growing T states as cheap as CNOT gates",
    "date": "preprint 2024",
    "type": "Preparation protocol and resource study",
    "finding": "Cultivation grows and checks an encoded resource state. Estimated reliability and resources depend on the protocol and noise assumptions; this study does not experimentally certify every future factory.",
    "links": [
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2409.17595"
      }
    ],
    "game": "Resource-preparation reading for optional compact and parallel authored schedules. No cultivation protocol is simulated and the factory-error model is unchanged."
  },
  "Q40": {
    "id": "Q40",
    "authors": "Emma Rosenfeld et al.",
    "title": "Magic state cultivation on a superconducting quantum processor",
    "date": "preprint 2025",
    "type": "Experimental cultivation study",
    "finding": "A superconducting cultivation study includes switching into a surface code and a fidelity-bounding protocol. Its retained-output fidelity and acceptance yield are distinct; rejected attempts still consume resources.",
    "links": [
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2512.13908"
      }
    ],
    "game": "Resource-readiness reading distinguishes accepted-state fidelity from yield. No free states, acceptance multiplier or factory upgrade is granted."
  },
  "Q41": {
    "id": "Q41",
    "authors": "Johannes Bausch, Andrew W. Senior, Francisco J. H. Heras et al.",
    "title": "Learning high-accuracy error decoding for quantum processors",
    "date": "journal 2024",
    "type": "Decoder method and experimental-data analysis",
    "finding": "A learned surface-code decoder improves accuracy on studied memory datasets and simulated codes. The presented throughput remains slower than the one-microsecond target; accuracy, throughput and latency stay distinct.",
    "links": [
      {
        "label": "DOI",
        "url": "https://doi.org/10.1038/s41586-024-08148-8"
      }
    ],
    "game": "Pairs with the controller-profile decision. Profile throughput and feedback costs do not change the selected noise or decoding-accuracy model."
  },
  "Q42": {
    "id": "Q42",
    "authors": "Arian Vezvaee, Cesar Benito, Mario Morford-Oberst, Alejandro Bermudez, Daniel A. Lidar",
    "title": "Surface code scaling on heavy-hex superconducting quantum processors",
    "date": "preprint 2025; journal 2026",
    "type": "Alternative layout experiment",
    "finding": "Connectivity-aware embedding and dynamical decoupling produce directional improvements on heavy-hex layouts. This is distinct from global state-independent subthreshold scaling and from our native rotated-patch accounting.",
    "links": [
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2510.18847"
      },
      {
        "label": "DOI",
        "url": "https://doi.org/10.1038/s41467-026-76090-6"
      }
    ],
    "game": "An inspectable alternative-layout comparison. It does not change our native rotated-patch resource model."
  },
  "Q43": {
    "id": "Q43",
    "authors": "Jubo Xu, Abbas B. Ziad, Prakash Murali, Hongxiang Fan",
    "title": "MagiCFirm: A Runtime for Magic-State Cultivation with Algorithm-Hardware Co-Design",
    "date": "preprint 24 September 2026",
    "type": "Architecture and runtime study",
    "finding": "A protocol-aware runtime study evaluates FPGA resources and modeled preparation latency including retries. Conditional state-supply improvements help application runtime only while that lane limits the named workload.",
    "links": [
      {
        "label": "arXiv",
        "url": "https://arxiv.org/abs/2609.29267"
      },
      {
        "label": "Full study",
        "url": "https://arxiv.org/html/2609.29267v1"
      }
    ],
    "game": "Runtime reading makes optional schedule bottlenecks explicit. The authored task recipes do not reproduce its benchmark or implement its cultivation runtime."
  },
  "Q44": {
    "id": "Q44",
    "authors": "J. Kelly et al.",
    "title": "State preservation by repetitive error detection in a superconducting quantum circuit",
    "date": "preprint 2014; Nature online 4 March 2015",
    "type": "Superconducting repetition-code experiment",
    "finding": "Repeated parity checks suppress bit-flip failures for classical inputs in a nine-qubit line. This does not establish protection against arbitrary error channels or a universal logical processor.",
    "links": [
      {
        "label": "Publisher DOI",
        "url": "https://doi.org/10.1038/nature14270"
      },
      {
        "label": "Author manuscript",
        "url": "https://arxiv.org/abs/1411.7403"
      }
    ],
    "game": "The annual research programme uses authored studies of the existing superconducting surface-code or two-spin tutorial model. It does not reproduce this historical apparatus, algorithm, measured performance or benchmark; prices and targets are game choices."
  },
  "Q45": {
    "id": "Q45",
    "authors": "Diego Ristè and Leonardo DiCarlo",
    "title": "Digital Feedback Control",
    "date": "author manuscript 2015; chapter published 1 March 2016",
    "type": "Engineering chapter",
    "finding": "Reviews projective measurement and conditional action, including reset and entanglement feedback from earlier experiments. This chapter is not a newly demonstrated 2016 fault-tolerant gate stack.",
    "links": [
      {
        "label": "Publisher DOI",
        "url": "https://doi.org/10.1007/978-3-319-24091-6_8"
      },
      {
        "label": "Author manuscript · different title",
        "url": "https://arxiv.org/abs/1508.01385"
      }
    ],
    "game": "The annual research programme uses authored studies of the existing superconducting surface-code or two-spin tutorial model. It does not reproduce this historical apparatus, algorithm, measured performance or benchmark; prices and targets are game choices."
  },
  "Q46": {
    "id": "Q46",
    "authors": "Kristan Temme, Sergey Bravyi, Jay M. Gambetta",
    "title": "Error Mitigation for Short-Depth Quantum Circuits",
    "date": "preprint 2016; PRL published 3 November 2017",
    "type": "Mitigation methods and theory",
    "finding": "Zero-noise extrapolation and quasiprobability resampling estimate expectation values under declared assumptions. Sampling overhead and residual bias remain; mitigation is not universal quantum error correction.",
    "links": [
      {
        "label": "Publisher DOI",
        "url": "https://doi.org/10.1103/PhysRevLett.119.180509"
      },
      {
        "label": "Author manuscript",
        "url": "https://arxiv.org/abs/1612.02058"
      }
    ],
    "game": "The annual research programme uses authored studies of the existing superconducting surface-code or two-spin tutorial model. It does not reproduce this historical apparatus, algorithm, measured performance or benchmark; prices and targets are game choices."
  },
  "Q47": {
    "id": "Q47",
    "authors": "Frank Arute et al.",
    "title": "Quantum supremacy using a programmable superconducting processor",
    "date": "Nature online 23 October 2019",
    "type": "Superconducting random-circuit sampling experiment",
    "finding": "A specific 53-qubit random-circuit sampling benchmark was compared with then-selected classical methods. The historical comparison is not a current universal speedup or an application-utility result.",
    "links": [
      {
        "label": "Publisher DOI",
        "url": "https://doi.org/10.1038/s41586-019-1666-5"
      }
    ],
    "game": "The annual research programme uses authored studies of the existing superconducting surface-code or two-spin tutorial model. It does not reproduce this historical apparatus, algorithm, measured performance or benchmark; prices and targets are game choices."
  },
  "Q48": {
    "id": "Q48",
    "authors": "Christian Kraglund Andersen et al.",
    "title": "Repeated quantum error detection in a surface code",
    "date": "preprint 2019; Nature Physics online 8 June 2020",
    "type": "Superconducting error-detection experiment",
    "finding": "A seven-qubit distance-two code repeatedly detects errors. Enhanced lifetime and coherence are conditioned on no detected errors; selected surviving runs do not establish unconditional correction or logical gates.",
    "links": [
      {
        "label": "Publisher DOI",
        "url": "https://doi.org/10.1038/s41567-020-0920-y"
      },
      {
        "label": "Author manuscript",
        "url": "https://arxiv.org/abs/1912.09410"
      }
    ],
    "game": "The annual research programme uses authored studies of the existing superconducting surface-code or two-spin tutorial model. It does not reproduce this historical apparatus, algorithm, measured performance or benchmark; prices and targets are game choices."
  },
  "Q49": {
    "id": "Q49",
    "authors": "Google Quantum AI; Zijun Chen et al. on the author manuscript",
    "title": "Exponential suppression of bit or phase errors with cyclic error correction",
    "date": "preprint 2021; Nature online 14 July 2021",
    "type": "Superconducting repetition-code experiment",
    "finding": "One-dimensional repetition codes suppress bit OR phase errors with repeated rounds. They do not simultaneously protect both error types. The separate small surface-code detection experiment is not full threshold scaling.",
    "links": [
      {
        "label": "Publisher DOI",
        "url": "https://doi.org/10.1038/s41586-021-03588-y"
      },
      {
        "label": "Author manuscript · different title",
        "url": "https://arxiv.org/abs/2102.06132"
      }
    ],
    "game": "The annual research programme uses authored studies of the existing superconducting surface-code or two-spin tutorial model. It does not reproduce this historical apparatus, algorithm, measured performance or benchmark; prices and targets are game choices."
  },
  "Q50": {
    "id": "Q50",
    "authors": "Sebastian Krinner et al.",
    "title": "Realizing repeated quantum error correction in a distance-three surface code",
    "date": "preprint 2021; Nature online 25 May 2022",
    "type": "Superconducting surface-code memory experiment",
    "finding": "Seventeen superconducting qubits repeatedly measure both syndrome types, with decoding and corrections in postprocessing. Reported per-cycle performance excludes leakage-detected runs; it is not real-time universal gate qualification.",
    "links": [
      {
        "label": "Publisher DOI",
        "url": "https://doi.org/10.1038/s41586-022-04566-8"
      },
      {
        "label": "Author manuscript",
        "url": "https://arxiv.org/abs/2112.03708"
      }
    ],
    "game": "The annual research programme uses authored studies of the existing superconducting surface-code or two-spin tutorial model. It does not reproduce this historical apparatus, algorithm, measured performance or benchmark; prices and targets are game choices."
  },
  "Q51": {
    "id": "Q51",
    "authors": "Google Quantum AI; Rajeev Acharya et al. on the author manuscript",
    "title": "Suppressing quantum errors by scaling a surface code logical qubit",
    "date": "preprint 2022; Nature online 22 February 2023",
    "type": "Superconducting surface-code scaling experiment",
    "finding": "Distance five modestly outperforms the average of distance-three subsets in the specified memory experiment. Adding physical qubits also introduces errors; this limited improvement is distinct from the later below-threshold result.",
    "links": [
      {
        "label": "Publisher DOI",
        "url": "https://doi.org/10.1038/s41586-022-05434-1"
      },
      {
        "label": "Author manuscript",
        "url": "https://arxiv.org/abs/2207.06431"
      }
    ],
    "game": "The annual research programme uses authored studies of the existing superconducting surface-code or two-spin tutorial model. It does not reproduce this historical apparatus, algorithm, measured performance or benchmark; prices and targets are game choices."
  }
});
  const chapters = [
    {name:'First signal',title:'One qubit.',accent:'A world of possibility.',subtitle:'A room. A refrigerator. A very fragile beginning.',instrument:'The first apparatus',goal:'Find a signal. Balance researchers, notes storage, and engineering designs.',transition:'A signal worth listening to.',story:'You have persuaded a superconducting circuit to behave coherently. The room is still larger than the computer.'},
    {name:'Control room',title:'Listen closely.',accent:'The noise has a shape.',subtitle:'Preparation, control, and measurement. In that order.',instrument:'The control room',goal:'Characterize the device. Reserve calibration time before expanding.',transition:'The laboratory learns to listen.',story:'Every good result begins with a calibration. Every calibration ends with another question.'},
    {name:'Noisy circuits',title:'Small errors.',accent:'Bigger possibilities.',subtitle:'A processor is more than the sum of its qubits.',instrument:'The noisy processor',goal:'Fund the laboratory with delivered service jobs, then validate the two-spin tutorial.',transition:'One qubit becomes a machine.',story:'The chip is growing. So is the list of things that can go wrong. Your first useful calculation is waiting.'},
    {name:'Protected memory',title:'Fragile parts.',accent:'A steadier whole.',subtitle:'Many physical qubits. One carefully protected idea.',instrument:'The surface-code memory',goal:'Expand notes storage and automate routine work. Trade physical space for qualified memory.',transition:'The information survives.',story:'You do not read the unknown state. You read the evidence of errors, and let the decoder do its work.'},
    {name:'Logical machine',title:'Keep it alive.',accent:'Then put it to work.',subtitle:'Memory, operations, routing, and an actual schedule.',instrument:'The logical foundry',goal:'Balance fabrication, maintenance, and service while qualifying gates and factories.',transition:'Protection becomes orchestration.',story:'A memory can remember. A computer must also act. The difference takes rather more space than the brochure suggested.'},
    {name:'Useful work',title:'A little less noise.',accent:'A little more possibility.',subtitle:'The machine is ready for a question worth asking.',instrument:'The useful instrument',goal:'Bring the whole laboratory together for a named workload and its full resource budget.',transition:'At last, a question worth asking.',story:'The machine is no longer the point. The experiment is. Choose your work, and give it the resources it needs.'}
  ];
  // Prices and designs are game-economy choices, not findings from the cited papers.
  // id, chapter, title, game effect, papers, prerequisites, funding, effort, designs, qualification
  const projects = [
    ['feynman',0,'A world to simulate','Give the first experiment a purpose.',['Q01'],[],15,8,0,'signal'],
    ['deutsch',0,'A universal idea','Open the circuit notebook.',['Q02'],['feynman'],25,24,0],
    ['divincenzo',0,'The physical checklist','Make hardware readiness part of the plan.',['Q03'],['deutsch'],45,60,0],
    ['nakamura',0,'Coherent control','Enter the control room.',['Q24'],['divincenzo'],70,100,0],
    ['ramsey',1,'A fringe in the noise','Expose drift and the Ramsey T₂* estimate.',['Q04'],['nakamura'],90,160,0,'ramsey'],
    ['echo',1,'An echo, not a miracle','Separate echo T₂ from Ramsey T₂*.',['Q04'],['ramsey'],110,210,8,'echo'],
    ['readout',1,'Read the result carefully','Reduce the scenario’s residual readout bias.',['Q04'],['ramsey'],120,240,10,'readout'],
    ['rb',1,'Characterize the gates','Unlock pulse engineering. Manual calibration still requires apparatus time.',['Q05'],['echo','readout'],150,320,18,'benchmark'],
    ['coupled',1,'The second conversation','Connect calibrated qubits. Enter the noisy era.',['Q04','Q26'],['rb'],200,440,25,'coupled'],
    ['nisq',2,'The noisy intermediate era','Open explicitly qualified laboratory service contracts.',['Q06'],['coupled'],520,650,45,'circuit'],
    ['vqe',2,'A hybrid conversation','Optimize a classically reproducible two-spin tutorial.',['Q16'],['nisq'],800,1000,75],
    ['ansatz',2,'Choose the question well','Reveal the tutorial’s exact variational energy landscape.',['Q17'],['vqe'],700,1300,90],
    ['mitigation',2,'More shots. Less bias.','Enable a costly measurement-mitigation scenario.',['Q18'],['vqe','readout'],1200,1600,110],
    ['classical',2,'The classical challenger','Validate the tutorial; open the path to correction.',['Q33','Q34'],['ansatz','mitigation'],1500,2200,150,'vqe'],
    ['shor',3,'Information worth protecting','Introduce encoded-memory experiments.',['Q07'],['classical'],1800,3200,240],
    ['stabilizer',3,'Read errors, not secrets','Reveal syndrome detection events.',['Q30','Q29'],['shor'],1950,3900,300],
    ['surface',3,'A patch of protection','Allocate ideal rotated memory patches.',['Q08'],['stabilizer'],2100,4700,400],
    ['decoder',3,'A classical companion','Unlock streaming decoder upgrades.',['Q09'],['surface'],2400,5500,480],
    ['threshold',3,'Below the threshold','Qualify the current memory regime; enter logical engineering.',['Q09'],['decoder'],2700,6500,600,'memory'],
    ['surgery',4,'Make room to operate','Reserve routing and spare footprint for logical operations.',['Q25'],['threshold'],3300,8000,800],
    ['gates',4,'A memory learns to act','Qualify a separate logical-operation model.',['Q30'],['surgery'],3600,9500,1000,'gates'],
    ['ancilla',4,'A careful kind of resource','Enable the selected distillation-output scenario.',['Q11'],['gates'],4200,11000,1200],
    ['factories',4,'A factory needs a floor plan','Allocate factories and produce scheduling rehearsal credits.',['Q10'],['ancilla'],4800,13500,1500,'factory'],
    ['accounting',4,'Count everything that matters','Open full resource previews and the useful-work chapter.',['Q20','Q21'],['factories'],5400,16000,1900],
    ['lloyd',5,'Let the spins evolve','Open the named Ising-dynamics resource scenario.',['Q14'],['accounting'],6000,20000,2400],
    ['hamiltonian',5,'A better simulation recipe','Qualify the selected dynamics precision recipe.',['Q15'],['lloyd'],8800,26000,3000],
    ['factoring',5,'Fifteen, without the theatre','Open a toy factor certificate and its logical resource recipe.',['Q12'],['accounting'],5100,10000,900],
    ['grover',5,'A search with an honest oracle','Count the toy oracle, its access, and repetition costs.',['Q13'],['accounting'],5100,12000,1100],
    ['chemistry',5,'An energy, not a miracle cure','Open a named electronic-model resource scenario.',['Q19'],['hamiltonian'],6900,24000,2800],
    ['audit',5,'Useful, with the caveats intact','Audit the interpretation. Completing a scientific scenario unlocks the ending.',['Q22','Q23'],['hamiltonian'],10000,34000,4000]
  ].map(([id,chapter,title,effect,papers,requires,funds,effort,designs,qualification]) => ({id,chapter,title,effect,papers,requires,cost:{funds,effort,designs},qualification}));
  projects.push(
    {id:'controller2026',chapter:3,optional:true,title:'The controller has two clocks · 2026',effect:'Choose authored streaming or response profiles. Throughput and latency trade off; physical and logical error parameters stay separate.',papers:['Q37','Q41'],requires:['decoder'],cost:{funds:250,effort:600,designs:60}},
    {id:'adaptive2026',chapter:4,optional:true,title:'Control that listens · 2026',effect:'Reduce selected maintenance need by 10% through classical drift management. Calibration duty still consumes time; no universal device fidelity boost.',papers:['Q38'],requires:['threshold'],qualification:'memory',cost:{funds:1400,effort:4200,designs:400}},
    {id:'state-readiness',chapter:5,optional:true,title:'Ready when the algorithm is · 2026',effect:'Compare compact and parallel schedules for the same 32-spin task, with footprint, factory waiting and workspace fully counted. Factory quality stays unchanged.',papers:['Q39','Q40','Q43'],requires:['accounting'],cost:{funds:1800,effort:6000,designs:600}}
  );
  // Publication history inspires these authored studies; it does not dictate the laboratory calendar.
  projects.push(
    {"id": "history2015", "chapter": 3, "historyYear": 2015, "title": "Read the checks. Keep the secret. · 2015", "effect": "Repeated checks provide error evidence. Our surface-code scenario does not reproduce Kelly’s bit-flip repetition experiment. Qualify fresh study evidence, then research the discovery to open the next annual study.", "papers": ["Q44"], "requires": ["decoder"], "cost": {"funds": 450, "effort": 900, "designs": 120}, "study": {"kind": "parity-checks", "experiment": "memory", "criterion": "Distance 3 with currently qualified surface-code memory."}},
    {"id": "history2016", "chapter": 4, "historyYear": 2016, "title": "Measure. Decide. Respond. · 2016", "effect": "Meet a named feedback budget through controller planning. The 20 μs target is authored; the chapter reviews earlier feedback work. Qualify fresh study evidence, then research the discovery to open the next annual study.", "papers": ["Q45"], "requires": ["surgery", "history2015"], "cost": {"funds": 650, "effort": 1200, "designs": 150}, "study": {"kind": "feedback-budget", "experiment": "gates", "criterion": "Qualified operations with modeled feedback ≤20 μs."}},
    {"id": "history2017", "chapter": 2, "historyYear": 2017, "title": "Bias has a bill. · 2017", "effect": "Purchase precision with acquisition time, then validate the measured interval. Our mitigation model is not zero-noise extrapolation. Qualify fresh study evidence, then research the discovery to open the next annual study.", "papers": ["Q46", "Q18"], "requires": ["mitigation", "history2016"], "cost": {"funds": 850, "effort": 1500, "designs": 200}, "study": {"kind": "mitigation-budget", "experiment": "vqe", "criterion": "θ=65° ±1°, mitigation on, at least 16,384 shots per group; actual ground criterion must pass."}},
    {"id": "history2018", "chapter": 2, "historyYear": 2018, "title": "A precise answer to the wrong question. · 2018", "effect": "Precisely measure an intentionally poor preparation. This two-spin study separates ansatz and sampling errors; it does not simulate barren-plateau training. Qualify fresh study evidence, then research the discovery to open the next annual study.", "papers": ["Q06", "Q17"], "requires": ["ansatz", "history2017"], "cost": {"funds": 950, "effort": 1700, "designs": 220}, "study": {"kind": "ansatz-budget", "experiment": "vqe", "criterion": "θ=20° ±1°, at least 16,384 shots per group; ansatz error >0.5 and sampling bound ≤0.12."}},
    {"id": "history2019", "chapter": 4, "historyYear": 2019, "title": "A factory takes a floor. · 2019", "effect": "Inspect the footprint left by one factory. Tile studies and sampling benchmarks are distinct; this is an authored distillation-layout study, not the Arute experiment. Qualify fresh study evidence, then research the discovery to open the next annual study.", "papers": ["Q10", "Q47"], "requires": ["factories", "history2018"], "cost": {"funds": 1200, "effort": 2200, "designs": 300}, "study": {"kind": "factory-footprint", "experiment": "factory", "criterion": "One qualified factory and at least two application slots."}},
    {"id": "history2020", "chapter": 3, "historyYear": 2020, "title": "An uninterrupted promise. · 2020", "effect": "Reserve maintenance time while checking memory. This full-memory scenario does not reproduce Andersen’s detection-conditioned, postselected lifetime. Qualify fresh study evidence, then research the discovery to open the next annual study.", "papers": ["Q48"], "requires": ["surface", "history2019"], "cost": {"funds": 1350, "effort": 2500, "designs": 320}, "study": {"kind": "maintenance-budget", "experiment": "memory", "criterion": "Qualified memory; calibration duty ≥maintenance target and planned service ≤50%."}},
    {"id": "history2021", "chapter": 4, "historyYear": 2021, "title": "Which errors does the code protect? · 2021", "effect": "Record the distinction between a repetition code and this game’s full surface-code scenario. Chen’s bit-or-phase result is not used as a universal gate guarantee. Qualify fresh study evidence, then research the discovery to open the next annual study.", "papers": ["Q49"], "requires": ["threshold", "history2020"], "cost": {"funds": 1500, "effort": 2800, "designs": 380}, "study": {"kind": "model-boundary", "experiment": "gates", "criterion": "Distance 3 with the current logical operation stack qualified."}},
    {"id": "history2022", "chapter": 3, "historyYear": 2022, "title": "Memory can wait. Feedback cannot. · 2022", "effect": "Qualify memory with no fresh-state factories, then compare actual feedback with an authored 20 μs target. Planning credits are not stored states; Krinner’s postprocessed result is not a real-time gate demonstration. Qualify fresh study evidence, then research the discovery to open the next annual study.", "papers": ["Q50"], "requires": ["surgery", "history2021"], "cost": {"funds": 1700, "effort": 3100, "designs": 450}, "study": {"kind": "memory-latency", "experiment": "memory", "criterion": "Qualified memory, no factories allocated, and feedback ≤40 μs."}},
    {"id": "history2023", "chapter": 3, "historyYear": 2023, "title": "A larger patch. A smaller floor. · 2023", "effect": "Trade code protection against usable footprint. Twelve slots and the selected error fit are game-study criteria, not the paper’s observed performance. Qualify fresh study evidence, then research the discovery to open the next annual study.", "papers": ["Q51", "Q09"], "requires": ["threshold", "history2022"], "cost": {"funds": 2100, "effort": 3600, "designs": 550}, "study": {"kind": "scaled-memory", "experiment": "memory", "criterion": "Distance 5, qualified memory, and at least twelve application slots."}},
    {"id": "history2024", "chapter": 4, "historyYear": 2024, "title": "Accurate is not automatically fast. · 2024", "effect": "Reserve authored throughput headroom while meeting latency. The study does not implement a learned decoder or improve its decoding accuracy. Qualify fresh study evidence, then research the discovery to open the next annual study.", "papers": ["Q41"], "requires": ["controller2026", "history2023"], "cost": {"funds": 2400, "effort": 4300, "designs": 650}, "study": {"kind": "decoder-budget", "experiment": "gates", "criterion": "Qualified operations; syndrome stream ≤80% of decoder capacity and feedback ≤20 μs."}},
    {"id": "history2025", "chapter": 5, "historyYear": 2025, "title": "Ready states, counted honestly. · 2025", "effect": "Choose preparation throughput against footprint for the same task. This partial lane study is not full workload qualification or a cultivation-yield simulation. Qualify fresh study evidence, then research the discovery to open the next annual study.", "papers": ["Q40", "Q21"], "requires": ["state-readiness", "history2024"], "cost": {"funds": 2800, "effort": 5000, "designs": 750}, "study": {"kind": "supply-budget", "experiment": "factory", "criterion": "Qualified factory; the selected Dynamics plan fits its slots and its factory lane ≤gate lane."}}
  );
  // Classical laboratory engineering. Every numerical effect below is a game rule.
  const engineering = [
    {id:'workflow',title:'A laboratory that takes notes',effect:'Double staff research output and improve classical design organization by 25%. Game coefficients; no quantum speedup is claimed.',requires:['deutsch'],engineeringRequires:[],cost:{funds:160,effort:90,designs:12},group:null},
    {id:'storage1',title:'Room for the next idea',effect:'Give each notebook four times its notes capacity. More storage delays the full-store design bonus.',requires:['deutsch'],engineeringRequires:[],cost:{funds:90,effort:80,designs:18},group:null},
    {id:'storage2',title:'An indexed research library',effect:'Multiply notebook capacity by four again. Keep researchers and storage in balance.',requires:['nisq'],engineeringRequires:['storage1'],cost:{funds:600,effort:700,designs:150},group:null},
    {id:'pricing',title:'A price for the work delivered',effect:'Automatically match contract prices to available service capacity. Revenue still requires delivered jobs.',requires:['nisq'],engineeringRequires:[],cost:{funds:900,effort:900,designs:180},group:null},
    {id:'autoCalibration',title:'Let the instruments keep time',effect:'Automatically reserve calibration duty for the current maintenance target. Calibration still consumes apparatus time.',requires:['classical'],engineeringRequires:[],cost:{funds:1800,effort:1800,designs:350},group:null},
    {id:'automation',title:'The classical night shift',effect:'Unlock classical automation station purchases. Their notes and designs consume shared service capacity.',requires:['classical'],engineeringRequires:[],cost:{funds:2400,effort:2400,designs:450},group:null},
    {id:'storage3',title:'A library with a floor plan',effect:'Multiply notebook capacity by four again. Larger discoveries need space as well as staff.',requires:['surface'],engineeringRequires:['storage2'],cost:{funds:4000,effort:4200,designs:650},group:null},
    {id:'scheduler',title:'Every station has a schedule',effect:'Double staff and automation research output and increase design output by 50% through classical scheduling. These are game coefficients.',requires:['threshold'],engineeringRequires:['automation'],cost:{funds:7000,effort:6500,designs:1200},group:null},
    {id:'workshop',title:'Build the laboratory around it',effect:'Unlock fabrication and integration station purchases. These build game hardware, not magic states.',requires:['threshold'],engineeringRequires:[],cost:{funds:6000,effort:5500,designs:900},group:null},
    {id:'synthesis',title:'Ideas that can leave the notebook',effect:'Double classical design generation. Designs are engineering plans, not quantum states or scientific evidence.',requires:['threshold'],engineeringRequires:['scheduler'],cost:{funds:12000,effort:10000,designs:1800},group:null},
    {id:'open',title:'An open laboratory notebook',effect:'Choose open dissemination: gain four trust slots and double service demand, with a 30% lower fair price. Excludes proprietary dissemination.',requires:['nisq'],engineeringRequires:[],cost:{funds:300,effort:250,designs:60},group:'dissemination'},
    {id:'proprietary',title:'A private service desk',effect:'Choose proprietary dissemination: a 50% higher fair price. Excludes open dissemination. These contract effects are game assumptions.',requires:['nisq'],engineeringRequires:[],cost:{funds:300,effort:250,designs:60},group:'dissemination'},
    {id:'verified',title:'Commission before expansion',effect:'Choose verified rollout: workshop output falls 20%, and maintenance need falls 20%. Excludes rapid rollout; coefficients are game assumptions.',requires:['threshold'],engineeringRequires:[],cost:{funds:4000,effort:4000,designs:600},group:'rollout'},
    {id:'rapid',title:'Build ahead of the queue',effect:'Choose rapid rollout: workshop output rises 40%, and maintenance need rises 20%. Excludes verified rollout; coefficients are game assumptions.',requires:['threshold'],engineeringRequires:[],cost:{funds:4000,effort:4000,designs:600},group:'rollout'}
  ];
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
  // Finite classical tutorials and management scenarios; numbers are authored game rules.
  const objectives = [
    ['landscape','Map the energy valley',['vqe'],null,.40,200,25,null],
    ['precision','Resolve the ground estimate',['ansatz','mitigation'],null,.12,450,60,null],
    ['reference30','Check a second preparation',['classical'],30,.12,700,90,null],
    ['bias-floor','Cross the bias floor',['classical'],null,.04,1000,140,.006],
    ['reference60','A demanding cross-check',['surface'],60,.06,1400,200,null],
    ['final-check','The final calibration witness',['accounting'],45,.06,1800,300,null]
  ].map(([id,name,requires,angle,tolerance,funds,designs,maxBias])=>({id,name,title:name,requires,angle,tolerance,maxBias,reference:angle===null?'Ground energy':'Exact recorded preparation',reward:{funds,designs,trust:1},papers:['Q16','Q18'],description:'Classically sampled two-spin tutorial. One trial interval; rewards are laboratory management rules.'}));
  const precisionRequests = [
    ['desk30','Service desk · 30°',['classical'],30,.16,800,null],
    ['desk45','Service desk · 45°',['classical'],45,.12,1100,null],
    ['desk60','Precision desk · 60°',['surface'],60,.10,1500,null],
    ['desk65','Precision desk · 65°',['threshold'],65,.08,2000,null],
    ['audit30','Independent check · 30°',['gates'],30,.06,2700,null],
    ['audit45','Independent check · 45°',['accounting'],45,.04,3500,.006]
  ].map(([id,name,requires,angle,tolerance,payout,maxBias])=>({id,name,title:name,requires,angle,tolerance,payout,maxBias,reference:'Exact recorded preparation',papers:['Q16','Q18'],description:'A finite request for a fresh known-preparation tutorial measurement, paid only after its declared interval qualifies.'}));
  const procurementOffers = [
    {id:'local',name:'Local instrument supplier',title:'Local instrument supplier',requires:['classical'],units:64,cost:220,designs:12,seconds:20},
    {id:'bulk',name:'Scheduled bulk delivery',title:'Scheduled bulk delivery',requires:['classical'],units:512,cost:1200,designs:64,seconds:90}
  ];
  const dynamicsRecipes = [
    {id:'balanced',name:'Balanced schedule',dataWidth:32,workspace:0,width:32,depth:200,gates:4800,magic:192},
    {id:'compact',name:'Compact floor plan',dataWidth:32,workspace:0,width:32,depth:320,gates:4800,magic:128},
    {id:'parallel',name:'Parallel workspace',dataWidth:32,workspace:8,width:40,depth:160,gates:6400,magic:256}
  ];
  return {papers,chapters,projects,engineering,experiments,workloads,objectives,precisionRequests,procurementOffers,dynamicsRecipes};
});
