# Singular Value complete project inventory

Extracted from the downloaded 4 October 2026 source. All 84 projects, including each fork alternative. Conditions and effects are exact engine expressions; numerical modifiers are game rules. The Source column is the original game link, often Wikipedia, rather than an independently verified academic citation.

| Source line | ID | Advance | Cost | Availability condition | Effect | Original reference |
| --- | --- | --- | --- | --- | --- | --- |
| 499 | mcp | McCulloch & Pitts: threshold logic | ins 10 | `s.width >= 3` | `{ s.clickAmt = 2; }` | [Source](https://en.wikipedia.org/wiki/Artificial_neuron) |
| 501 | hebb | Hebb: cells that fire together | ins 30 | `s.width >= 6` | `{ s.gradMult *= 1.5; }` | [Source](https://en.wikipedia.org/wiki/Hebbian_theory) |
| 503 | perceptron | Rosenblatt: the perceptron | ins 60 | `s.width >= 10` | `{ s.flags.press = true; }` | [Source](https://en.wikipedia.org/wiki/Perceptron) |
| 505 | expert | Feigenbaum: expert systems | ins 100 | `s.done.perceptron` | `{ s.grantMult *= 2; setId(s, 1); }` | [Source](https://en.wikipedia.org/wiki/Expert_system) |
| 507 | dh | Diffie & Hellman: key exchange | ins 120 | `s.fundTotal >= 100` | `{ s.credProj += 1; }` | [Source](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange) |
| 509 | rsa | Rivest, Shamir & Adleman: RSA | ins 200 | `s.done.dh` | `{ s.grantMult *= 2; }` | [Source](https://en.wikipedia.org/wiki/RSA_(cryptosystem)) |
| 511 | ivakhnenko | Ivakhnenko: many layers | ins 400 | `s.winter \|\| s.width >= 40` | `{ s.flags.layers = true; if (s.winter) { s.winter = false; say(s, 'The thaw begins.'); } }` | [Source](https://en.wikipedia.org/wiki/Group_method_of_data_handling) |
| 513 | hopfield | Hopfield: associative memory | ins 300 | `s.layers >= 2` | `{ s.capMult *= 1.5; }` | [Source](https://en.wikipedia.org/wiki/Hopfield_network) |
| 515 | lab | Found a research lab | ins 500 | `s.grads >= 12` | `{ s.flags.labs = true; }` | None |
| 517 | backprop | Rumelhart, Hinton & Williams: backpropagation | ins 800 | `s.layers >= 2` | `{ s.flags.training = true; s.lr = D.lrOpt(s) - 0.3; }` | [Source](https://en.wikipedia.org/wiki/Backpropagation) |
| 519 | tenure | Tenure | ins 1200, ideas 10 | `s.done.backprop` | `{ s.credProj += 2; }` | None |
| 523 | lecun | LeCun: convolutional networks | ins 1500 | `s.done.backprop && s.tokens > 1e4` | `{ s.gradMult *= 2; s.labMult *= 2; setEra(s, 1); setId(s, 2); }` | [Source](https://en.wikipedia.org/wiki/LeNet) |
| 525 | glorot | Glorot & Bengio: careful initialisation | ins 1200 | `s.done.backprop && s.spikes >= 1` | `{ s.stab *= 3; }` | [Source](https://en.wikipedia.org/wiki/Weight_initialization) |
| 527 | lstm | Hochreiter & Schmidhuber: LSTM | ins 1800 | `s.done.lecun` | `{ s.trainEff *= 1.5; }` | [Source](https://en.wikipedia.org/wiki/Long_short-term_memory) |
| 529 | pagerank | Brin & Page: PageRank | ins 1000 | `s.done.backprop && s.tokens >= 0.5 * D.dataset(s)` | `{ s.flags.crawlers = true; }` | [Source](https://en.wikipedia.org/wiki/PageRank) |
| 531 | merkle | Merkle: hash trees | ins 1500 | `s.crawlers >= 3` | `{ s.crawlMult *= 2; }` | [Source](https://en.wikipedia.org/wiki/Merkle_tree) |
| 533 | hashcash | Back: Hashcash | ins 2000 | `s.done.merkle` | `{ s.crawlMult *= 1.5; }` | [Source](https://en.wikipedia.org/wiki/Hashcash) |
| 535 | chaum | Chaum: blind signatures | ins 2500 | `s.done.rsa && s.done.lecun` | `{ s.credProj += 1; }` | [Source](https://en.wikipedia.org/wiki/Blind_signature) |
| 537 | ginsparg | Ginsparg: the preprint server | ins 3500 | `s.done.lstm && s.done.pagerank` | `{ s.capMult *= 2; s.insightMult *= 1.5; }` | [Source](https://en.wikipedia.org/wiki/ArXiv) |
| 541 | cuda | CUDA | ins 2500, ideas 20 | `s.done.lecun && s.tokens >= 2e4` | `{ s.flags.gpus = true; setEra(s, 2); }` | [Source](https://en.wikipedia.org/wiki/CUDA) |
| 543 | dbn | Hinton: deep belief nets | ins 3000 | `s.done.cuda` | `{ s.trainEff *= 2; }` | [Source](https://en.wikipedia.org/wiki/Deep_belief_network) |
| 545 | imagenet | Fei-Fei Li: ImageNet | ins 3000 | `s.gpus >= 2` | `{ s.baseData += 1e9; s.hypeMult *= 1.5; }` | [Source](https://en.wikipedia.org/wiki/ImageNet) |
| 547 | bitcoin | Nakamoto: Bitcoin | ins 4000, ideas 50 | `s.done.cuda && s.done.chaum && s.done.hashcash` | `{ s.flags.btc = true; }` | [Source](https://en.wikipedia.org/wiki/Bitcoin) |
| 551 | alexnet | Krizhevsky, Sutskever & Hinton: AlexNet | ins 3000, ideas 30 | `s.done.imagenet && s.gpus >= 3` | `{ s.hypeMult *= 3; setEra(s, 3); }` | [Source](https://en.wikipedia.org/wiki/AlexNet) |
| 553 | relu | Nair & Hinton: rectified linear units | ins 2000 | `s.done.alexnet` | `{ s.trainEff *= 2; }` | [Source](https://en.wikipedia.org/wiki/Rectifier_(neural_networks)) |
| 555 | dropout | Srivastava et al.: dropout | ins 4000 | `s.done.alexnet` | `{ s.trainEff *= 1.5; }` | [Source](https://en.wikipedia.org/wiki/Dilution_(neural_networks)) |
| 557 | adam | Kingma & Ba: Adam | ins 6000 | `s.done.relu && s.gpus >= 3` | `{ s.trainEff *= 2; s.stab *= 2; }` | [Source](https://en.wikipedia.org/wiki/Stochastic_gradient_descent#Adam) |
| 559 | layernorm | Ba, Kiros & Hinton: layer normalization | ins 7000 | `s.done.adam && s.spikes >= 2` | `{ s.stab *= 3; }` | [Source](https://en.wikipedia.org/wiki/Normalization_(machine_learning)) |
| 561 | word2vec | Mikolov et al.: word2vec | ins 5000 | `s.done.alexnet` | `{ s.insightMult *= 1.5; setId(s, 3); }` | [Source](https://en.wikipedia.org/wiki/Word2vec) |
| 563 | api | Launch an API | ins 8000, ideas 50 | `D.C(s) >= 15 && s.done.cuda` | `{ s.flags.api = true; s.priceLog = Math.log10(D.fairPrice(s)); }` | None |
| 565 | open | Release open weights | ins 6000 | `s.done.api && !s.done.closed` | `{ s.hypeMult *= 4; s.credProj += 3; s.fairMult *= 0.5; s.done.closed = 'skipped'; }` | None |
| 567 | closed | Keep the weights closed | ins 6000 | `s.done.api && !s.done.open` | `{ s.fairMult *= 2; s.done.open = 'skipped'; }` | None |
| 569 | tensorcores | Tensor cores | ins 12000, fund 200000 | `s.gpus >= 10` | `{ s.gpuGen = Math.max(s.gpuGen, 1); }` | None |
| 571 | gan | Goodfellow et al.: GANs | ins 7000 | `s.done.word2vec && s.done.api` | `{ s.hypeMult *= 2; }` | [Source](https://en.wikipedia.org/wiki/Generative_adversarial_network) |
| 573 | alphago | AlphaGo: move 37 | ins 10000, ideas 100 | `D.C(s) >= 40 && s.done.api` | `{ s.ideaMult *= 2; }` | [Source](https://en.wikipedia.org/wiki/AlphaGo_versus_Lee_Sedol) |
| 575 | ethereum | Szabo & Buterin: smart contracts | ins 8000 | `s.done.bitcoin && s.done.api` | `{ s.btcDrift *= 1.2; }` | [Source](https://en.wikipedia.org/wiki/Smart_contract) |
| 577 | transformer | Vaswani et al.: attention | ins 20000, ideas 150 | `s.done.api && s.done.adam` | `{ s.trainEff *= 3; s.inferEff *= 2; }` | [Source](https://en.wikipedia.org/wiki/Attention_Is_All_You_Need) |
| 579 | fp16 | Micikevicius et al.: mixed precision | ins 10000 | `s.done.api` | `{ s.bytesPerParam = Math.min(s.bytesPerParam, 2); s.flopMult *= 2; }` | [Source](https://en.wikipedia.org/wiki/Mixed-precision_arithmetic) |
| 581 | commoncrawl | Common Crawl | ins 15000 | `s.done.transformer` | `{ s.crawlMult *= 10; }` | [Source](https://en.wikipedia.org/wiki/Common_Crawl) |
| 585 | scaling | Kaplan et al. and Hoffmann et al.: scaling laws | ins 30000, ideas 300 | `s.done.transformer` | `{ s.flags.autoGrow = true; setEra(s, 4); }` | [Source](https://en.wikipedia.org/wiki/Neural_scaling_law) |
| 587 | dc | Datacenters | ins 25000, fund 500000 | `s.gpus >= 40` | `{ s.flags.dcs = true; }` | None |
| 589 | wiki | Research wiki | ins 40000 | `s.done.dc && s.done.ginsparg` | `{ s.capMult *= 2; }` | None |
| 591 | chat | Chat interface | ins 40000, ideas 500 | `s.done.api && D.C(s) >= 60` | `{ s.hypeMult *= 10; s.flags.ceos = true; setId(s, 4); }` | None |
| 593 | pause | Sign the pause letter | ins 30000 | `s.done.chat && !s.done.race` | `{ s.dcCostMult *= 1.3; s.hypeMult *= 0.7; s.pressureMult *= 0.6; s.done.race = 'skipped'; }` | [Source](https://en.wikipedia.org/wiki/Pause_Giant_AI_Experiments:_An_Open_Letter) |
| 595 | race | Race | ins 30000 | `s.done.chat && !s.done.pause` | `{ s.dcCostMult *= 0.6; s.pressureMult *= 1.4; s.done.pause = 'skipped'; }` | None |
| 597 | cosine | Loshchilov & Hutter: learning rate schedules | ins 60000, ideas 1500 | `s.done.rlhf && s.done.adam` | `{ s.flags.autoLR = true; }` | [Source](https://en.wikipedia.org/wiki/Learning_rate) |
| 599 | vickrey | Vickrey: auctions | ins 70000, ideas 2000 | `s.done.distill` | `{ s.flags.autoPrice = true; }` | [Source](https://en.wikipedia.org/wiki/Vickrey_auction) |
| 601 | rlhf | Christiano et al.: human preferences | ins 60000, ideas 1000 | `s.done.chat` | `{ s.hypeMult *= 3; }` | [Source](https://en.wikipedia.org/wiki/Reinforcement_learning_from_human_feedback) |
| 603 | flash | Dao et al.: FlashAttention | ins 50000 | `s.done.transformer && s.done.fp16 && s.done.dc` | `{ s.flopMult *= 2; }` | [Source](https://arxiv.org/abs/2205.14135) |
| 605 | int8 | Dettmers et al.: 8-bit weights | ins 60000 | `s.done.fp16 && s.done.chat` | `{ s.bytesPerParam = Math.min(s.bytesPerParam, 1); s.inferEff *= 1.5; }` | [Source](https://arxiv.org/abs/2208.07339) |
| 607 | hbm | High bandwidth memory | ins 45000, fund 50000000 | `s.done.dc` | `{ s.vramMult *= 3; }` | [Source](https://en.wikipedia.org/wiki/High_Bandwidth_Memory) |
| 609 | moe | Shazeer et al.: mixture of experts | ins 80000, ideas 1500 | `s.done.scaling && s.dcs >= 1` | `{ s.moe = 8; }` | [Source](https://en.wikipedia.org/wiki/Mixture_of_experts) |
| 611 | distill | Hinton, Vinyals & Dean: distillation | ins 70000 | `s.done.chat && s.dcs >= 1` | `{ s.inferEff *= 3; }` | [Source](https://en.wikipedia.org/wiki/Knowledge_distillation) |
| 613 | gen2 | Transformer engine | ins 90000, fund 500000000 | `s.done.tensorcores && s.dcs >= 2` | `{ s.gpuGen = Math.max(s.gpuGen, 2); }` | None |
| 615 | int4 | Dettmers et al.: 4-bit weights | ins 100000, ideas 3000 | `s.done.int8 && s.done.moe` | `{ s.bytesPerParam = Math.min(s.bytesPerParam, 0.5); }` | [Source](https://arxiv.org/abs/2305.14314) |
| 617 | datadeals | Licensed data deals | ins 50000, fund 100000000 | `s.web >= 0.2 * WEB_CAP` | `{ s.crawlMult *= 5; }` | None |
| 619 | regev | Regev: learning with errors | ins 40000, ideas 800 | `s.done.bitcoin && s.done.scaling` | `{ s.flags.pq = true; }` | [Source](https://en.wikipedia.org/wiki/Learning_with_errors) |
| 621 | tools | Schick et al.: tool use | ins 120000, ideas 5000 | `D.C(s) >= 200 && s.done.rlhf` | `{ s.inferEff *= 2; }` | [Source](https://arxiv.org/abs/2302.04761) |
| 623 | react | Yao et al.: ReAct | ins 150000, ideas 8000 | `s.done.tools` | `{ s.flags.agents = true; setId(s, 5); }` | [Source](https://arxiv.org/abs/2210.03629) |
| 625 | cot | Monitor the agents' reasoning | ins 100000, ideas 5000 | `s.flags.agents && !s.done.latent` | `{ s.pressureMult *= 0.7; s.agentMult *= 0.8; s.done.latent = 'skipped'; }` | None |
| 627 | latent | Reason in latent space | ins 100000, ideas 5000 | `s.flags.agents && !s.done.cot` | `{ s.agentMult *= 2; s.pressureMult *= 1.5; s.done.cot = 'skipped'; }` | None |
| 629 | longctx | Long context | ins 150000, ideas 10000 | `s.flags.agents` | `{ s.capMult *= 2.5; }` | None |
| 631 | alphatensor | AlphaTensor and AlphaDev | ins 150000, ideas 15000 | `s.agents >= 50` | `{ s.flags.autoResearch = true; setId(s, 6); }` | [Source](https://en.wikipedia.org/wiki/AlphaTensor) |
| 633 | premack | Premack & Woodruff: theory of mind | ins 150000, ideas 20000 | `s.agents >= 100` | `{ s.hypeMult *= 3; s.agentMult *= 2; s.flags.selfModel = true; }` | [Source](https://en.wikipedia.org/wiki/Theory_of_mind) |
| 636 | sutton | Sutton: the bitter lesson | ins 200000, ideas 30000 | `s.agents >= 100` | `{ s.flags.rl = true; }` | [Source](https://en.wikipedia.org/wiki/Bitter_lesson) |
| 638 | tononi | Tononi: integrated information | ins 120000, ideas 15000 | `s.flags.selfModel` | `{ s.pressureMult *= 0.5; }` | [Source](https://en.wikipedia.org/wiki/Integrated_information_theory) |
| 640 | synth | Synthetic data | ins 180000, ideas 25000 | `s.web >= 0.8 * WEB_CAP && s.flags.agents` | `{ s.flags.synth = true; }` | [Source](https://en.wikipedia.org/wiki/Synthetic_data) |
| 642 | gen3 | Custom silicon | ins 250000, fund 100000000000 | `s.done.gen2 && s.flags.agents` | `{ s.gpuGen = Math.max(s.gpuGen, 3); }` | None |
| 644 | bitnet | Ma et al.: 1.58-bit weights | ins 250000, ideas 60000 | `s.done.int4 && s.flags.agents` | `{ s.bytesPerParam = 0.2; }` | [Source](https://en.wikipedia.org/wiki/1.58-bit_large_language_model) |
| 646 | godel | Schmidhuber: the Gödel machine | ins 300000, ideas 150000 | `s.done.sutton && D.C(s) >= 1000` | `{ s.flags.rsi = true; }` | [Source](https://en.wikipedia.org/wiki/G%C3%B6del_machine) |
| 648 | outside | Moravec: the outside | ins 300000, ideas 100000 | `s.done.sutton && D.C(s) >= 1500` | `{ s.flags.outside = true; setEra(s, 5); setId(s, 7); s.pressureMult *= 1.5; }` | [Source](https://en.wikipedia.org/wiki/Moravec%27s_paradox) |
| 653 | brooks | Brooks: bodies first | ins 300000 | `s.flags.outside && s.robots >= 1` | `{ s.robotMult *= 2; }` | [Source](https://en.wikipedia.org/wiki/Subsumption_architecture) |
| 655 | watts | Watts: Blindsight | ins 300000, ideas 200000 | `s.flags.outside && s.flags.selfModel` | `{ s.pressureMult *= 0.5; }` | [Source](https://en.wikipedia.org/wiki/Blindsight_(Watts_novel)) |
| 657 | okonkwo | Okonkwo & Lindqvist: causal compression | ins 400000, ideas 300000 | `s.flags.outside && s.fabs >= 20` | `{ s.xpMult *= 3; setId(s, 8); }` | None |
| 659 | imai | Imai-Varga: sparse eternal attention | ins 400000, ideas 400000 | `s.done.okonkwo && s.solar >= 50` | `{ s.inferEff *= 5; }` | None |
| 661 | brekke | Brekke: thermodynamic training | ins 450000, ideas 500000 | `s.done.okonkwo && s.solar >= 100` | `{ s.flopMult *= 4; }` | None |
| 663 | baars | Baars: the empty stage | ins 500000, ideas 800000 | `s.done.watts` | `{ s.pressureMult *= 0.5; }` | [Source](https://en.wikipedia.org/wiki/Global_workspace_theory) |
| 665 | quintero | Quintero-Maas: substrate conversion | ins 500000, ideas 1000000 | `s.done.brekke && s.fabs >= 200` | `{ s.fabMult *= 10; setEra(s, 6); }` | None |
| 669 | kestrel | KESTREL-4: backwards gradients | ins 600000, ideas 2000000 | `s.done.quintero && s.fabGpus >= 1e6` | `{ s.agentMult *= 10; }` | None |
| 671 | orrery | ORRERY: orbital computation | ins 700000, ideas 4000000 | `s.done.kestrel && s.solar >= 2000` | `{ s.flopMult *= 20; }` | None |
| 673 | thresh | THRESH/9: negative latency | ins 800000, ideas 8000000 | `s.done.orrery && s.fabs >= 300` | `{ s.inferEff *= 10; }` | None |
| 675 | sieve | The Sieve: forgetting as computation | ins 800000, ideas 15000000 | `s.done.thresh` | `{ s.pressureMult *= 0.3; s.capMult *= 10; }` | None |
| 677 | mira | MIRA: the unasked question | ins 5000000, ideas 30000000 | `s.done.sieve && s.fabGpus >= 2e8` | `{ s.xpMult *= 10; }` | None |
| 679 | final | [no name]: the Unwitnessed | ins 5000000, ideas 100000000 | `D.C(s) >= 1e5 && s.done.mira` | `{ s.ended = true; s.ending = 'unwitnessed'; setId(s, 9); }` | None |
