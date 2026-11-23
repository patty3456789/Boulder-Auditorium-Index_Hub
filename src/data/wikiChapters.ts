import { TeamNote, WikiChapter } from '../types';

export const WIKI_CHAPTERS: WikiChapter[] = [
  {
    id: 'x32-architecture',
    category: 'x32 core & signal flow',
    title: 'X32 Signal Flow, Block Diagram & Bus Architecture',
    summary:
      'Complete architectural walkthrough of the Behringer X32 40-input, 25-bus processing engine, stage-to-speaker signal chain, and physical layout.',
    manualRef: 'X32 Manual · Section 1–4 & Appendix Block Diagram (p. 6–12, 66)',
    paragraphs: [
      'The Behringer X32 in the Boulder Auditorium FOH balcony booth acts as the central 40-input, 25-bus digital nerve center for mainstage musicals, assemblies, and concerts. Rather than thinking of the console as a linear copper wire path, treat it as a programmable 40-MHz floating-point SHARC DSP matrix where physical connectors (Local XLR 1–32, Aux In 1–6, AES50 A/B, and X-USB 32x32) are decoupled from internal processing channels.',
      'In our standard auditorium patch, the 27 Shure BLX4R wireless receivers in FOH Rack 01 terminate via labeled XLR snakes directly into Local Inputs 1–27 on the rear of the X32. Every input channel processes audio in strict serial order: Analog MIDAS Headamp (Preamp + +48V) -> 24-bit A/D Converter -> Digital Trim (when HA Split is active) -> Polarity Invert -> Low-Cut Filter (20–400 Hz) -> Noise Gate / Ducking -> Input Insert Point -> 4-Band Full Parametric EQ (or 6-band on buses) -> Dynamics Compressor/Expander -> Channel Fader / Mute / Pan -> Assignments to Stereo LR, Mono/Center, and Mix Buses 1–16.',
      'Understanding the 25 mix buses prevents routing confusion under show pressure. Buses 1–16 are general-purpose Mix Buses configurable in stereo pairs as Pre-Fader Monitor Sends, Post-Fader FX Sends, or Fixed Subgroups. Buses 17–18 form the Stereo Main LR bus, Bus 19 is the dedicated Mono/Center (M/C) bus feeding center cluster horns or subwoofers, and Buses 20–25 are the 6 Matrix Buses derived exclusively from Main LR, M/C, and Mix Buses 1–16—ideal for feeding Balcony Delays, Lobby/Dressing Room Feeds, or Assistive Listening without corrupting the house mix balance.'
    ],
    walkthroughs: [
      {
        heading: 'Tracing Any Input Through the X32 Channel Strip',
        steps: [
          'Press [SELECT] above any input fader (e.g., Ch 01 Lead Vocal) to bind the entire upper Channel Strip hardware encoders to that channel.',
          'Verify Preamp source routing on the [HOME > CONFIG] tab; confirm source reads "L01" (Local XLR 1) rather than AES50 unless operating a remote S16 stagebox.',
          'Check [PREAMP] HA Gain (-12 dB to +60 dB), Polarity (Ø), and Low Cut frequency (set 90–110 Hz for vocal lavaliers to strip stage floor rumble).',
          'Press [VIEW] in the MAIN BUS section to confirm whether the channel feeds Stereo LR, M/C, or Subgroup buses—never double-assign a channel to both LR and an active Subgroup feeding LR unless intentional parallel compression is used.'
        ]
      }
    ],
    whyItMatters: {
      title: 'Why Bus Separation Saves Shows',
      body: 'If you drive the understage dressing room monitors or Listen ADA assistive listening transmitter directly off Main LR without a Matrix or Post-Fader Bus, muting the house PA between acts leaves actors unable to hear stage calls, or worse, blasts raw sub-heavy FX into small cue speakers. Matrix 1–6 keep house, delay, and cue feeds acoustically independent.'
    },
    specsTable: [
      { label: 'Total Processing Channels', value: '32 Input Ch + 8 Aux In + 8 FX Returns (Stereo)' },
      { label: 'Internal Mix Buses', value: '16 Mix Buses + Main LR + Mono/Center + 6 Matrices (25 Total)' },
      { label: 'Internal Precision', value: '40-Bit Floating Point DSP (44.1 / 48 kHz)' },
      { label: 'Nominal Operating Level', value: '+4 dBu Line / -18 dBFS Digital Reference' },
      { label: 'A/D – D/A Latency', value: '0.8 ms Local In to Local Out' }
    ],
    troubleshooting: [
      {
        symptom: 'Meter dances on Channel Strip LCD, but zero audio reaches House LR.',
        cause: 'Channel is muted, assigned to an un-routed Subgroup without LR assignment, or DCA fader controlling the channel is pulled down.',
        resolution: 'Press [SELECT] on channel -> hit [VIEW] under MAIN BUS -> verify "ST" button is lit, DCA Mute groups are clear, and TheatreMix has not parked the DCA.'
      }
    ]
  },
  {
    id: 'x32-startup-shutdown',
    category: 'x32 core & signal flow',
    title: 'Power Sequencing, Safe Main Levels, Lock & Safe Shutdown',
    summary:
      'Strict booth power-up and shutdown order protecting Crown XTi 4002 amplifiers, Q-SYS DSP, and X32 flash memory.',
    manualRef: 'X32 Manual · Section 3 & 7.9 Setup/Global (p. 11, 56)',
    paragraphs: [
      'Digital consoles generate transient pops and DC clicks across analog outputs during FPGA boot and shutdown. Powering the Crown XTi 4002 amplifiers or Behringer iNUKE stage monitors before the X32 completes boot sends full-scale pops straight into the 980-seat house clusters and high-frequency compression drivers.',
      'Golden Rule: "First On, Last Off" for the Console and DSP; "Last On, First Off" for Power Amplifiers. In FOH Rack 01, the bottom Furman M-8x2 labeled "Master Power (Leave On)" feeds continuous infrastructure, while individual amp channels or X32 master outputs must remain muted before console boot. Additionally, the X32 stores active scene edits and global preferences in volatile RAM until flushed cleanly to flash storage.',
      'Yanking the power cord or tripping the booth Furman switch while the X32 is running risks corrupting the active Show file or losing mid-rehearsal EQ offsets. Always trigger Safe Shutdown from the Setup menu so the operating system commits all buffers and cleanly powers down the surface.'
    ],
    walkthroughs: [
      {
        heading: 'FOH Pre-Show Power-Up & Safe Main Levels',
        steps: [
          'Verify FOH Rack 01 upper Furman M-8Dx reads ~117V AC and all 4 UA844+SWB RF distros show green LEDs.',
          'Power on the Behringer X32 via its rear rocker switch and wait ~25 seconds for motorized faders to home and the 7" TFT screen to stabilize.',
          'Navigate to [SETUP > GLOBAL] and verify "Safe Main Levels" is enabled—this automatically drops Main LR and M/C faders to -∞ dB on power-up to prevent accidental playback blasts.',
          'Confirm Q-SYS Core 110f is online (STATUS LED solid) and Stage Right iNUKE / Crown amps are brought online only after X32 Main LR is muted.',
          'To walk away during intermission without accidental bumps, press and hold [HOME] for 3 seconds (or press the Lock icon in [SETUP > GLOBAL]) to lock the surface; hold [HOME] again to unlock.'
        ]
      },
      {
        heading: 'Mandatory Post-Show Safe Shutdown',
        steps: [
          'Press [MUTE] on Main LR, M/C, and Stage Foldback buses before turning off any rack switch.',
          'Press [SETUP] next to the 7" display and stay on the [GLOBAL] tab.',
          'Press the first rotary encoder under the screen labeled "Shutdown" and confirm the prompt.',
          'Wait until the screen explicitly displays "Safe to turn off X32" before flipping the rear power switch.'
        ]
      }
    ],
    whyItMatters: {
      title: 'Flash Corruption Prevention',
      body: 'During musical tech week, our TheatreMix bridge and X32 Scenes change dozens of EQ and DCA settings per night. Cutting power without [SETUP > GLOBAL > Shutdown] can revert the console to yesterday’s RAM snapshot and force a 20-minute pre-curtain panic rebuild.'
    },
    troubleshooting: [
      {
        symptom: 'Surface faders and buttons are completely unresponsive during intermission.',
        cause: 'Console Lock was engaged by holding the [HOME] key for >2 seconds.',
        resolution: 'Check top-right status bar for the padlock icon, then press and hold [HOME] until the unlock confirmation clears.'
      }
    ]
  },
  {
    id: 'x32-preamp-gain-48v',
    category: 'x32 core & signal flow',
    title: 'MIDAS Preamp Gain Staging & +48V Phantom Power Rules',
    summary:
      'Achieving the -18 dBFS to -12 dBFS vocal sweet spot while enforcing hardware safety for wireless receivers and DI boxes.',
    manualRef: 'X32 Manual · Section 5.1 Preamps & Gain Sharing (p. 20)',
    paragraphs: [
      'Every Behringer X32 local XLR input passes through a digitally controlled MIDAS microphone preamplifier capable of -12 dB to +60 dB in precise 2.5 dB analog relay steps (with fine digital trim interpolated smoothly). Setting preamp gain correctly is the single most impactful factor in keeping 27 open bodypack mics clean, intelligible, and feedback-resistant inside a 980-seat room.',
      'Unlike analog consoles where pushing meters close to 0 VU adds warm tape saturation, digital 0 dBFS is an absolute brick wall—any sample exceeding 0 dBFS produces harsh digital square-wave clipping. Our strict Boulder Auditorium vocal target is -18 dBFS to -12 dBFS on normal spoken and sung peaks, leaving 12 to 18 dB of dynamic headroom for sudden actor shouts or musical climaxes.',
      'Phantom Power (+48V) must be treated with surgical discipline. Never engage +48V globally without checking the patch. While Shure BLX4R receivers use transformerless balanced XLR outputs that typically tolerate phantom power, unbalanced 1/8"-to-XLR adapters, laptop headphone cables, or consumer iPods plugged into XLR channels WILL suffer fried audio ICs or loud pops if +48V is active. Only passive/active DI boxes (like our Radial ProAV1 if using an active condenser source—though ProAV1 itself is passive—or overhead choir/pit condensers like Shure SM81/KSM) ever require +48V.'
    ],
    walkthroughs: [
      {
        heading: 'Setting Gain & Phantom Power Safely per Channel',
        steps: [
          'Press [SELECT] on the target channel and look at the [CONFIG/PREAMP] section on the left side of the surface.',
          'Before turning +48V ON, mute the channel and verify the physical source on the input sheet (Condenser mic = +48V ON; Shure BLX4R / Dynamic mic / Radial ProAV1 passive DI / Laptop = +48V OFF).',
          'Have the actor speak at full projection level while watching the yellow/amber meter LEDs on the channel strip.',
          'Turn the GAIN encoder until speech averages around the -18 dB LED and loudest peaks flash -12 dB (never hitting the -6 dB or CLIP red LED).',
          'Engage the [LOW CUT] button and sweep to ~100 Hz for lavaliers to strip HVAC rumble and collar rustle without thinning vocal chest tone.'
        ]
      }
    ],
    whyItMatters: {
      title: 'Why -18 dBFS Beats "Hot" Gain',
      body: 'X32 Compressor thresholds, Noise Gates, and Auto-Mixers assume nominal vocal levels sit near -18 dBFS. Over-gaining preamps into the -3 dBFS range drives stage monitors into premature feedback and leaves zero headroom when two cast members belt a duet simultaneously.'
    },
    specsTable: [
      { label: 'Target Dialog / Vocal Average', value: '-18 dBFS to -12 dBFS' },
      { label: 'Absolute Ceiling (Danger)', value: '-6 dBFS (Never touch 0 dBFS CLIP)' },
      { label: 'Lav Mic High-Pass (HPF)', value: '95 Hz – 120 Hz (24 dB/oct or 12 dB/oct)' },
      { label: '+48V Allowed Channels', value: 'Condenser Mics & Active DIs ONLY' }
    ],
    troubleshooting: [
      {
        symptom: 'Loud crackle or distorted square wave even with channel fader at -20 dB.',
        cause: 'Preamp GAIN is too high, clipping the A/D converter before the fader ever sees the signal; or Shure BLX1 bodypack internal gain switch is overdriven.',
        resolution: 'Press [SELECT], turn Preamp GAIN counterclockwise until meters stay below -12 dBFS; if still distorting while preamp gain is at -12 dB pad, switch the BLX1 transmitter pad or lower sensitivity.'
      }
    ]
  },
  {
    id: 'x32-gate-eq-dyn',
    category: 'x32 core & signal flow',
    title: 'Channel Strip Processing: Gate, 4-Band PEQ & Dynamics',
    summary:
      'Dialing in Peak vs. RMS detection, Logarithmic vs. Linear envelope behavior, and clean musical theater vocal EQ.',
    manualRef: 'X32 Manual · Section 5.2–5.4 Gate, PEQ & Dynamics (p. 21–24)',
    paragraphs: [
      'A major differentiator between an amateur mix and a crisp theatrical mix is how cleanly the Channel Strip manages 20+ open omni lavaliers. Each X32 input provides a full Gate/Expander, 4-band fully parametric EQ (plus Low Cut), and Dynamics Compressor/Expander selectable anywhere along the strip order.',
      'On theatrical wireless mics, hard Noise Gates ("Gate" mode) frequently clip the first syllable of an actor’s line ("chopping"). Instead, use the gentle 1:2 or 1:3 **Expander** mode with a soft Threshold (-48 dBFS) and moderate Hold/Release, or leave the Gate bypassed when actively riding faders via TheatreMix. In the Dynamics section, note the critical distinction from the X32 Manual: **Peak** detection reacts instantaneously to plosive spikes ("p" and "t" hits) to prevent A/D or amp limiting, whereas **RMS** detection tracks average perceived loudness for smooth musical vocal leveling.',
      'Similarly, **Logarithmic (Log)** envelope scaling yields natural, musical release curves on singing voices, while **Linear (Lin)** delivers aggressive punch on drums or spoken announcements. Use the 4-band Parametric EQ subtractively first: notch room resonances around 250–400 Hz ("boxiness") and 2.5–4 kHz ("nasal feedback bite") before ever boosting high air above 8 kHz.'
    ],
    walkthroughs: [
      {
        heading: 'Standard Musical Lavalier Strip Template',
        steps: [
          'PREAMP: Low Cut ON at 105 Hz. Set Preamp Gain for -18 dBFS average.',
          'GATE: Keep OFF for rapid ensemble banter, or set Mode = EXP3 (3:1 gentle expansion), Range = 12 dB, Attack = 2 ms, Hold = 60 ms, Release = 250 ms to tame bleed without chopping breaths.',
          'PEQ: Band 1 (PEQ) cut -3 dB @ 320 Hz (Q 2.0) to clean chest/collar mud. Band 2 cut -2 to -4 dB @ 3.2 kHz (Q 3.5) for headset/cheek mic sibilance/feedback margin. Band 4 High Shelf subtle +1.5 dB @ 10 kHz only if hair/wig muffles articulation.',
          'DYNAMICS: Engage Compressor in **RMS / Log** mode, Ratio 3:1, Knee 2, Attack 10 ms, Release 150 ms, Threshold set so normal speech shows 2–4 dB gain reduction.'
        ]
      }
    ],
    whyItMatters: {
      title: 'Pre-EQ vs. Post-EQ Sidechain & Keying',
      body: 'In the X32 Dynamics page, engaging "Pre-EQ" causes the compressor to react before your EQ cuts mud, meaning low-end thumps will pump the vocal down. Keep Dynamics "Post-EQ" (default) or use the Dynamics Key Filter (e.g., 3–6 kHz bandpass) as a transparent vocal de-esser.'
    },
    troubleshooting: [
      {
        symptom: 'First word of every line fades in late or stutters.',
        cause: 'Channel Gate threshold is set too high or Gate Range is set to 60 dB.',
        resolution: 'Press [VIEW] in the GATE block and press [GATE] encoder to toggle Gate OFF, or switch Mode from GATE to EXP2 and lower Range to 10–15 dB.'
      }
    ]
  },
  {
    id: 'x32-buses-matrices',
    category: 'x32 core & signal flow',
    title: 'Mix Buses 1–16, Subgroups, Matrices & Delay Alignment',
    summary:
      'Configuring Pre/Post tap points, Subgroup vs. Bus summing, and using Matrix 1–6 to drive house zones and balcony delays.',
    manualRef: 'X32 Manual · Section 5.6–5.8 & 7.2 Meters/Routing (p. 25–28, 44)',
    paragraphs: [
      'Every pair of Mix Buses (1–2, 3–4, etc.) on the X32 can assume a completely different role via the [HOME > CONFIG] or Bus [CONFIG] tab: **Pre-EQ**, **Post-EQ**, **Pre-Fader**, **Post-Fader**, or **Subgroup**. Pre-Fader sends ignore the main channel fader and feed Stage Right foldback wedges via iNUKE amps so performers hear themselves even if FOH pulls them down in the house. Post-Fader sends track the main channel fader proportionally—mandatory for Reverb/Delay FX engines (Buses 13–16) so FX tails vanish when you mute an actor.',
      'Subgroups lock send levels at unity (0.0 dB) with routing determined purely by ON/OFF toggles, making them ideal for applying a single bus compressor across a Vocal Choir or Pit Percussion Bus before returning to Main LR.',
      'Downstream of Main LR and M/C sit the **6 Matrix Buses (MTX 1–6)**. In Boulder Auditorium, Main LR feeds the House Left/Right clusters, Mono/Center drives Center Cluster dialog reinforcement, and Matrix outputs feed dedicated **Balcony Under/Overhang Delays**, **Understage Dressing Room Monitors**, and the **Listen Technologies ADA Server**. Using the X32 output delay (`[ROUTING > OUT 1–16]` Delay ms) or Q-SYS Core 110f alignment delays ensures balcony listeners hear direct stage acoustics and PA wavefronts time-aligned within 10–15 ms (Haas effect).'
    ],
    walkthroughs: [
      {
        heading: 'Sending Main LR to a Matrix Zone (e.g., Lobby / ADA / Balcony)',
        steps: [
          'Press [SELECT] on the Main LR master fader (or select Bus 1–16 on the right fader bank).',
          'Press [SENDS ON FADER] or press [VIEW] in the MAIN BUS / SENDS section and page to the Matrix Sends tab.',
          'Turn up the Matrix 1–6 send rotary encoders for Main LR and M/C (usually unity 0.0 dB Post-Fader).',
          'Select Matrix 1 on the right bank ("MTX 1–6" layer) to adjust independent zone volume, 6-band Matrix EQ, or limiter without changing house speaker volume.'
        ]
      }
    ],
    whyItMatters: {
      title: 'Why Post-Fader FX Prevents Ghost Reverb',
      body: 'If you accidentally configure FX Bus 13 (Hall Reverb) as Pre-Fader instead of Post-Fader, pulling a soloist’s fader down to -∞ leaves their dry voice off while still feeding full reverb into the house!'
    },
    troubleshooting: [
      {
        symptom: 'Dressing room speakers understage get louder/quieter whenever FOH mixes an actor.',
        cause: 'Dressing room feed was tapped Post-Fader instead of Pre-Fader or dedicated Matrix post-LR.',
        resolution: 'Confirm stage cue feed derives either from Main LR Matrix (so dressing room hears the finished house mix) or Pre-Fader Stage Bus depending on Stage Manager call.'
      }
    ]
  },
  {
    id: 'x32-dca-theatremix',
    category: 'show control & automation',
    title: 'DCA Groups, Mute Groups & TheatreMix Dynamic Mapping',
    summary:
      'Operating Boulder Auditorium’s TheatreMix live character DCA workflow alongside X32 Mute Groups and Spill layers.',
    manualRef: 'X32 Manual · Section 5.9–5.10 DCA & Mute Groups + Booth TheatreMix Ops',
    paragraphs: [
      'A **DCA (Digitally Controlled Amplifier)** passes zero audio through itself; instead, moving a DCA fader remotely scales the effective output level of every assigned input channel simultaneously while keeping Post-Fader FX sends proportional! Mute Groups act similarly as fast global mute switches across whole ensembles, orchestra pits, or wireless banks during intermission.',
      'During the Spring Musical (with 25+ active Shure BLX1 bodypacks), manually flipping across Channels 1–16 and 17–32 pages every time a new character enters is error-prone. Boulder Auditorium pairs the X32 over Ethernet with **TheatreMix**, which dynamically updates DCA 1–8 assignments and scribble-strip names/colors on the **right-hand fader bank (DCA 1–8 layer)** on every single scene cue.',
      'When FOH Co-Head 01 presses **GO** in TheatreMix (with Co-Head 02 tracking the annotated script), actors entering the scene pop onto DCAs 1–6 with their exact character names illuminated in the LCD scribble strips, while offstage cast members remain cleanly muted or parked out of the active DCA window. Even with TheatreMix managing assignments, the mixer still physically rides the character DCA faders live by ear.'
    ],
    walkthroughs: [
      {
        heading: 'Verifying & Riding TheatreMix DCAs Live',
        steps: [
          'Ensure the right-hand fader bank layer button [GROUP DCA 1–8] is lit solid.',
          'Check Ethernet link between the FOH laptop running TheatreMix and the X32 rear REMOTE Ethernet port (confirm IP subnet matches [SETUP > NETWORK]).',
          'Assign DCAs cleanly by default when TheatreMix is idle: DCA 1 = Lead Lavs, DCA 2 = Ensemble Lavs, DCA 3 = HH1/HH2 Handhelds, DCA 4 = QLab / Playback L/R.',
          'Configure [MUTE GRP] buttons in the bottom-right corner: Mute Grp 1 = All Wireless Lavs (for instant intermission cutoff), Mute Grp 2 = Playback/FX.'
        ]
      },
      {
        heading: 'Using X32 Built-In DCA Spill for Mid-Show Emergency Tweaks',
        steps: [
          'If a character assigned to DCA 3 sounds muffled or boxy mid-scene, hold [SELECT] on DCA 3.',
          'Press [SELECT] on the specific underlying channel (or flip left bank to CH 1–16 / 17–32) to tweak that actor’s PEQ without touching other cast members sharing DCA 3.'
        ]
      }
    ],
    whyItMatters: {
      title: 'Two-Person FOH Split Discipline',
      body: 'Trying to read script dialog cues, fire TheatreMix Go, and mix live harmonies solo leads to missed pickups. Co-Head 01 keeps eyes on stage and fingers on DCA faders; Co-Head 02 keeps eyes on the script and calls/triggers transitions.'
    },
    troubleshooting: [
      {
        symptom: 'Pressing "GO" in TheatreMix does not update the X32 DCA scribble strips.',
        cause: 'X32 Ethernet IP changed, booth switch port unplugged, or TheatreMix OSC link dropped.',
        resolution: 'Open [SETUP > NETWORK] on X32 to confirm static IP matches TheatreMix target. Immediately switch left fader bank to [CH 1–16] / [CH 17–32] to mix manually until link restores.'
      }
    ]
  },
  {
    id: 'x32-fx-rta',
    category: 'x32 core & signal flow',
    title: 'Virtual FX Rack 1–8, TruEQ Graphic EQ & 100-Band RTA',
    summary:
      'Deploying the X32’s 8 stereo FX slots (Vocal Plates, Dual TruEQ, Precision Limiter) and real-time acoustic feedback hunting.',
    manualRef: 'X32 Manual · Section 4 & 5.15–5.18 Effects, EQ & RTA (p. 13–17, 31–33)',
    paragraphs: [
      'The X32 provides 8 stereo Virtual FX slots inside the `[EFFECTS]` rack. **Slots 1–4** are dual-mono or true-stereo Send/Return engines fed by Mix Buses (typically Buses 13–16 feeding a lush Vintage Room / Hall Reverb for musical vocals and a gentle Chorus or Tap Delay). **Slots 5–8** are dedicated Insert-only processors ideal for inserting **Dual TruEQ 31-Band Graphic EQs** onto Main LR, Stage Foldback Monitor Buses, or **Combinator** multiband compression on vocal subgroups.',
      'Crucially, the X32’s **100-Band Real-Time Analyzer (RTA)** overlays directly behind the channel Parametric EQ curve or the Slot 5–8 Graphic EQ curve! Instead of guessing which frequency is ringing when a stage wedge or house cluster starts to howl during a 5:30 PM line check, you can inspect the glowing RTA bars in real time and pull down the exact offending 1/3-octave fader.',
      'Always watch your FX return levels: heavy reverb muddies spoken dialog. Keep FX Returns on Mute Group 2 or link FX Return mutes so spoken scenes stay bone-dry and intelligible, lifting Reverb only during sung ballads.'
    ],
    walkthroughs: [
      {
        heading: 'Inserting a 31-Band TruEQ + RTA on Stage Monitor Bus 1',
        steps: [
          'Press [EFFECTS] and page to Slot 5 (or 6–8).',
          'Set FX Type to "Dual TruEQ" and assign Insert Source A to Bus 01 (Stage Monitors).',
          'Select Bus 01, open [CONFIG], and ensure the physical [INSERT] button is engaged ON (default Pre-Fader).',
          'Press [RTA] on the display/EQ screen to overlay live frequency energy across the 31 graphic bands, and notch ringing frequencies -3 to -6 dB cleanly.'
        ]
      }
    ],
    whyItMatters: {
      title: 'TruEQ vs. Standard Graphic EQ',
      body: 'Behringer’s Dual TruEQ uses specialized phase-compensated filters that interact far less with adjacent sliders than legacy analog GEQs, preserving vocal warmth while slicing narrow feedback spikes.'
    },
    troubleshooting: [
      {
        symptom: 'Graphic EQ faders move on screen, but monitor tone doesn’t change at all.',
        cause: 'FX slot was routed as an Insert in the Effects screen, but the target Bus’s [INSERT] switch wasn’t turned ON.',
        resolution: 'Select Bus 01 -> press [VIEW] in Config/Preamp -> turn [INSERT] ON.'
      }
    ]
  },
  {
    id: 'x32-routing-matrix',
    category: 'x32 core & signal flow',
    title: 'Routing Matrix: Input Patching, Out 1–16, Aux & P16',
    summary:
      'Mastering the 8-channel block patch philosophy across Home, Out 1–16, Aux Out, XLR Out, AES50, and Ultranet P16.',
    manualRef: 'X32 Manual · Section 7.2 Routing Tabs (p. 44–49)',
    paragraphs: [
      'The `[ROUTING]` button is where many new operators accidentally silence an entire rig because the X32 routes signals in **blocks of 8** on inputs (`Inputs 1–8`, `9–16`, `17–24`, `25–32`, `Aux In Remap`) and individually per physical connector on outputs (`Out 1–16`, `Aux Out`, `P16 Ultranet`).',
      'On the `[ROUTING > HOME]` page, Local 1–8, Local 9–16, Local 17–24, and Local 25–32 map our 27 Shure BLX4R receivers and booth playback directly to Channels 1–32. For the **XLR OUT** tab on the rear panel, outputs are patched in groups of 4: in Boulder Auditorium, XLR Out 13–16 typically carry **Out 13–16** where Out 14 = Matrix/Center, Out 15 = Main Left, and Out 16 = Main Right feeding the QSC Q-SYS Core 110f and Crown XTi 4002 amplification matrix.',
      'Be mindful of **Tap Points** when defining `OUT 1–16`. Set outputs feeding House PA and Q-SYS to **Post-Fader** so the X32 master LR fader actually controls room volume. Never accidentally set a house PA physical XLR output to "Pre-Fader" or "Direct Out Pre-Fader", or pulling down the LR fader will leave the auditorium blasting at full tilt!'
    ],
    walkthroughs: [
      {
        heading: 'Auditing Main Outputs Before Showtime',
        steps: [
          'Press [ROUTING] and navigate to the [XLR OUT] tab.',
          'Verify Outputs 1–4, 5–8, 9–12, and 13–16 assignments match the physical snake labels plugged into the back of the X32.',
          'Switch to the [OUT 1–16] tab and verify Output 15 = "Main L (Post Fader)" and Output 16 = "Main R (Post Fader)" (plus Center/Sub/Stage buses on 1–14 as patched).',
          'Check [HOME] input blocks: 1–8 = Local 1–8, 9–16 = Local 9–16, 17–24 = Local 17–24, 25–32 = Local 25–32.'
        ]
      }
    ],
    whyItMatters: {
      title: 'Block-of-8 Input Trap',
      body: 'Switching "Inputs 25–32" to "Card 25–32" for virtual soundcheck silently breaks Channels 25–27 (BLX Ch 25 + Handhelds HH1/HH2)! Always restore all four Local input blocks after USB virtual soundcheck.'
    },
    troubleshooting: [
      {
        symptom: 'Wireless receivers Ch 17–25 show solid RF and audio meters on rack LCDs, but X32 Ch 17–25 are completely dead.',
        cause: 'Input block 17–24 or 25–32 on [ROUTING > HOME] is pointed at AES50 A or Card instead of Local.',
        resolution: 'Open [ROUTING > HOME], highlight Inputs 17–24 and 25–32, and assign both back to Local 17–24 and Local 25–32.'
      }
    ]
  },
  {
    id: 'x32-aes50-clocking',
    category: 'networking & stageboxes',
    title: 'AES50 SuperMAC, S16 Stagebox & Clock Sync Rules',
    summary:
      'Connecting external Behringer S16/S32 stageboxes, FOH-to-Monitor split consoles, and preventing digital clock clicks.',
    manualRef: 'X32 Manual · Section 3.4, 5.19 & 7.9 Clock / HA Gain Split (p. 11, 34, 56)',
    paragraphs: [
      'AES50 is Klark Teknik’s deterministic 48-channel bidirectional audio + clock + preamp remote control protocol carried over a single shielded Cat-5e/Cat-6 cable with EtherCON locking shells. Notice our Stage Right Rack also houses a **Behringer S16/S32 Digital Snake** when deploying additional stage pit or choir microphones back to FOH.',
      'Two engineering rules are non-negotiable over AES50: First, **use Shielded (STP) Cat-5e/6 with grounded EtherCON boots**—unshielded office patch cables accumulate electrostatic floor charge that drops AES50 sync mid-show with an ear-splitting burst of digital white noise! Second, **there can only ever be ONE Clock Master** in an AES50 network. When FOH X32 connects to a Stage Right S16 stagebox, set FOH X32 `[SETUP > CONFIG]` Clock Source = **Internal (48 kHz)** and configure the S16 as Clock Slave synced to AES50 Port A.',
      'If linking two consoles (e.g., FOH X32 + Soundcraft/Monitor X32), enable **HA Gain Split** in `[SETUP > PREAMPS]` once soundcheck preamps are locked. HA Gain Split freezes the shared analog preamp gain and gives each console an independent +/-18 dB digital Trim so one operator doesn’t clip the other console’s mix.'
    ],
    walkthroughs: [
      {
        heading: 'Syncing FOH X32 to Stage Right S16 Stagebox',
        steps: [
          'Connect a shielded EtherCON Cat-5e/6 line between FOH X32 [AES50 A] and Stage Right S16 [AES50 A].',
          'On FOH X32, open [SETUP > CONFIG]: set Sample Rate = 48 kHz and Synchronization = Internal.',
          'Verify the top status bar AES50-A badge turns solid GREEN (red/flashing means bad cable or clock mismatch).',
          'Open [ROUTING > HOME] and patch whichever block of 8 channels (e.g., Inputs 25–32 for pit/stage mics) to "AES50 A1–8".',
          'Open [SETUP > PREAMPS] to verify "HA Remote" is enabled for Port A so FOH can adjust S16 headamps remotely.'
        ]
      }
    ],
    whyItMatters: {
      title: 'Shielded EtherCON Saves Speakers',
      body: 'Static discharge on an unshielded Ethernet run across a theatre stage floor momentarily breaks AES50 frame sync—resulting in full-scale digital pops. Always verify continuity between EtherCON metal shells.'
    },
    troubleshooting: [
      {
        symptom: 'Loud periodic digital ticks/clicks every 3 seconds over S16 stagebox channels.',
        cause: 'Dual Clock Masters (both consoles set to Internal) or Sample Rate mismatch (44.1 kHz vs 48 kHz).',
        resolution: 'Set FOH X32 to Internal 48 kHz, and force all slave S16/S32/secondary consoles to sync to AES50 A.'
      }
    ]
  },
  {
    id: 'x32-scenes-safes',
    category: 'show control & automation',
    title: 'Scenes, Snippets, Parameter Safes & Cue Recall',
    summary:
      'Managing Show Files on USB, isolating Global Safes so cue recalls never wipe room EQ, and MIDI/OSC hooks.',
    manualRef: 'X32 Manual · Section 7.5 Scenes & Cue Management (p. 51–53)',
    paragraphs: [
      'A common disaster for novice X32 technicians is saving a Scene at rehearsal #1, tuning the house PA and wireless EQ over the next three days, and then loading an earlier Scene—instantly wiping out all room EQ, routing, and preamp gains! Understanding **Show**, **Cue**, **Scene**, **Snippet**, and **Safes** solves this permanently.',
      'A **Show** is the top-level container holding up to 500 Cues, 100 Scenes, and 100 Snippets. A **Scene** captures virtually the entire console state unless blocked by **Recall Safes**. A **Snippet** is vastly safer for live theater: it saves ONLY the parameters you select (for example, just Mute statuses and Fader levels on Ch 1–8) while leaving preamps, routing, and house EQ untouched.',
      'Before running any automated cue show, set **Global Console Safes** (`[SCENES > SAFES]`): check **Config / Preamp**, **Routing**, and **Output Routing** in the Console Safe matrix. That way, even if an operator loads an old backup Scene mid-show, your physical input patches and -18 dBFS preamp gains stay locked safely in place.'
    ],
    walkthroughs: [
      {
        heading: 'Locking Routing & Preamps with Global Safes',
        steps: [
          'Press [VIEW] in the SCENES section next to the main screen.',
          'Page to the [SAFES] tab.',
          'Under "Console Safe", highlight and check [Routing], [HA Config], and [Output Config] (plus Main LR if you manage master house level manually).',
          'To back up the entire Show to thumb drive before tech week, switch to the [SHOWS] tab, insert a FAT32 USB drive in the top surface port, and press Utility -> Export Show.'
        ]
      }
    ],
    whyItMatters: {
      title: 'FAT32 USB Backups Every Night',
      body: 'Always export the current `.shw` Show file to a physical USB stick kept in the FOH booth drawer after dress rehearsals. If a cue script triggers an unintended scene overwrite, restoring a complete Show takes under 15 seconds.'
    },
    troubleshooting: [
      {
        symptom: 'Recalling Cue 2 suddenly mutes the intercom/playback channels or flips Routing back to AES50.',
        cause: 'Scene was saved when an old Routing config was active, and Routing Safe wasn’t checked.',
        resolution: 'Immediately check [Routing] and [HA Config] inside [SCENES > SAFES], restore Local routing, and re-save the Scene.'
      }
    ]
  },
  {
    id: 'x32-usb-recording',
    category: 'x32 core & signal flow',
    title: 'X-USB 32x32 Multitrack Card & 2-Track Booth Recorder',
    summary:
      'Running QLab multitrack playback, Virtual Soundcheck without actors onstage, and stereo archival show recording.',
    manualRef: 'X32 Manual · Section 7.6–7.8 Recorder, Card & Virtual Soundcheck (p. 54–55)',
    paragraphs: [
      'Every Boulder Auditorium X32 houses the rear **X-USB 32x32 bidirectional USB 2.0 audio interface** (32 inputs from Mac/PC + 32 multitrack outputs to DAW/QLab). This unlocks two superpowers: firing discrete multi-zone QLab sound effects directly into dedicated X32 channels with zero analog noise, and recording a 32-track raw rehearsal for **Virtual Soundcheck**.',
      'During Virtual Soundcheck, you play back yesterday’s pre-fader multitrack wireless recordings through the exact X32 channels so Co-Heads can spend two quiet hours sculpting vocal PEQ, compression, and TheatreMix DCA transitions without holding 25 tired high school actors onstage.',
      'In addition, the dedicated **USB-A port on the top-right surface** records and plays uncompressed stereo WAV files directly onto a FAT32 thumb drive via the built-in 2-Track Recorder. Use this slot for intermission walk-in music or quick stereo director reference recordings.'
    ],
    walkthroughs: [
      {
        heading: 'Running Virtual Soundcheck Safely',
        steps: [
          'Verify USB Type-B cable runs from the X32 X-USB Card slot to the FOH Mac/Windows DAW (48 kHz project rate).',
          'Open [SETUP > CARD] and confirm Configuration = "32 in / 32 out".',
          'Press [ROUTING > HOME] and temporarily set "Routing Preset" or Input blocks 1–32 from Local to "Card 1–32" (or enable Play/Record swap in newer firmware).',
          'Dial in your vocal EQs and Dynamics with the house PA live.',
          'CRITICAL: Immediately revert [ROUTING > HOME] back to "Local 1–32" and save before actors arrive for line check!'
        ]
      }
    ],
    whyItMatters: {
      title: 'FAT32 Format Requirement on Top USB Slot',
      body: 'The top-panel 2-track USB recorder cannot read exFAT or NTFS flash drives. Keep a dedicated 16–32 GB FAT32 thumb drive labeled "FOH X32 AUDIO" in the booth drawer.'
    },
    troubleshooting: [
      {
        symptom: 'Top panel USB Recorder refuses to recognize thumb drive or fails to record.',
        cause: 'Drive formatted as exFAT/NTFS/APFS, or USB 3.0 drive draws excessive startup current.',
        resolution: 'Reformat drive to MS-DOS (FAT32) on laptop and use a standard USB 2.0/3.0 32 GB stick.'
      }
    ]
  },
  {
    id: 'shure-blx4r-wireless',
    category: 'rf wireless & batteries',
    title: 'Shure BLX4R 27-Channel RF Matrix & 4:45 PM Understage Ops',
    summary:
      'Managing H10/H8/J10 UHF bands, UA844+SWB distros, 70-cell AA charger discipline, ear/neck taping, and live swap protocol.',
    manualRef: 'FOH Rack 01 Inventory & Boulder RF SOP',
    paragraphs: [
      'FOH Rack 01 houses 27 permanently racked **Shure BLX4R** half-rack UHF wireless receivers across three coordinated frequency bands: **H10 (542–572 MHz)** on Ch 1–4, **H8 (518–542 MHz)** on Ch 5–8, and **J10 (584–608 MHz)** across Ch 9–25 plus Handhelds HH1 & HH2. Eight **Shure UA844+SWB / UA844** distribution chassis stack above and below the receivers to distribute remote antenna RF and clean 15V DC power.',
      'Notice the physical rack layout in FOH Rack 01: Ch 1–16 sit in 8 dual shelves above the Marshall monitors, while Ch 17–24 occupy 4 dual shelves below the Crestron touchpanel; Ch 25 occupies a left half-rack bay paired with a blank spacer plate on the right, and HH1/HH2 handheld receivers sit in the bottom wireless row. Because receivers never leave the FOH rack, only the **BLX1 bodypacks** and **BLX2 handhelds** travel understage.',
      'Understage Co-Head 03 owns the **4:45 PM Call** workflow: pulling fresh AA NiMH batteries from the FOH 70-cell wire rack bay, loading packs in descending cast call order, dressing omni lavaliers cleanly over the actor’s ear and cheekbone with medical tape plus a collar strain-relief loop, and executing zero-drama mid-show swaps via silent text or booth walkie if a sweat-out or element crackle occurs.'
    ],
    walkthroughs: [
      {
        heading: '4:45 PM Call to 5:30 PM Line Check Protocol',
        steps: [
          'At 4:30 PM, pull 54+ freshly charged AA cells (2 per BLX1/BLX2 plus 10 hot spares) from the 70-cell booth charger rack.',
          'Stage BLX1 bodypacks understage in descending call order; verify Group/Channel numbers on each BLX1 LCD match its yellow-tagged BLX4R receiver in FOH Rack 01.',
          'Tape mic capsule ~1 inch behind the corner of the actor’s mouth on the cheekbone (avoiding hairline friction), route cable over the ear, tape behind neck, and leave a 2-inch slack loop before clipping the pack.',
          '5:30–5:45 PM Line Check: Have each actor speak 1-to-10 while FOH solos the channel on Genelec monitors via PFL, confirming solid green RF bars and -18 to -12 dBFS audio peaks.'
        ]
      },
      {
        heading: 'Emergency Mid-Show Wireless Element/Pack Swap',
        steps: [
          'Actor exits wing with crackling mic -> Understage Co-Head signals FOH via silent text or booth comms.',
          'FOH Mutes the faulty channel strip immediately.',
          'Understage Co-Head transfers actor to Spare Pack (or swaps faulty capsule) in <30 seconds and confirms Pack Power ON.',
          'FOH presses [SOLO/PFL] on the replacement channel in Genelecs to confirm clean dialog before unmuting into the house.'
        ]
      }
    ],
    whyItMatters: {
      title: 'Why Nightly Battery Stripping Is Mandatory',
      body: 'Leaving NiMH rechargeable AA cells inside BLX1 bodypacks overnight causes parasitic drain that pushes batteries below recovery voltage and risks corrosive leaks inside expensive Shure battery trays. Every single cell returns to the 70-cell charger after curtain.'
    },
    specsTable: [
      { label: 'Ch 1–4 Frequency Band', value: 'Shure H10 (542 – 572 MHz)' },
      { label: 'Ch 5–8 Frequency Band', value: 'Shure H8 (518 – 542 MHz)' },
      { label: 'Ch 9–25 & HH1/HH2', value: 'Shure J10 (584 – 608 MHz)' },
      { label: 'Power Distribution', value: '8x Shure UA844+SWB / UA844 Active Distros' }
    ],
    troubleshooting: [
      {
        symptom: 'Receiver RF indicator drops out when actor walks downstage left.',
        cause: 'BLX1 whip antenna bent flat against sweaty skin or metal belt buckle, or duplicate channel powered on.',
        resolution: 'Ensure BLX1 whip hangs vertically downward out of mic belt pouch; verify no spare pack backstage was accidentally left turned on to the same Group/Channel.'
      }
    ]
  },
  {
    id: 'stage-right-black-box',
    category: 'comms, stage right & black box',
    title: 'Stage Right Comms, iNUKE Amps & Black Box Soundcraft Si',
    summary:
      'Operating Clear-Com MS-702 wired partyline, HME DX210 wireless intercom, Behringer iNUKE wedges, and Black Box Si Expression 3.',
    manualRef: 'Stage Right Stack & Fall One-Act Black Box Rig Specs',
    paragraphs: [
      'Stage Right houses two side-by-side racks bridging backstage communications, stage foldback, and theatre rigging. The **Audio/Comms Stack** is topped by a Servoreeler SRC cable reel, followed by our **Clear-Com MS-702** 2-channel wired intercom master station (labeled "A-LIGHTING / B-AUDIO") and **HME DX210** digital 2.4 GHz wireless intercom base station linking the Stage Manager, FOH Booth, Spot Ops, and Deck Crew.',
      'Below intercom sits a **Crown XLS1000** DriveCore amplifier ("STEREO BYPASS") and three **Behringer iNUKE NU1000** Class-D DSP amplifiers driving on-stage floor wedges plus the **understage dressing room cue monitors** so waiting actors never miss an entrance cue. A **Behringer S16/S32** stagebox completes the stack alongside the adjacent locked **ETC QuickTouch** Rigging Controller rack.',
      'For the **Fall One-Act Black Box** season—where audience seating moves directly onto the stage—we pivot to an intimate rig centered on the **Soundcraft Si Expression 3** digital console and a playback laptop connected through a green **Radial ProAV1** passive stereo-to-mono multimedia DI (providing RCA/3.5mm/1/4" ground-lifted XLR output into Channels 14–15 or dedicated Submixes). Output feeds directly into daisy-chained under-seating speakers beneath the audience risers.'
    ],
    walkthroughs: [
      {
        heading: 'Soundcraft Si Expression 3 & Radial ProAV1 Black Box Check',
        steps: [
          'Connect playback laptop headphone/interface output into the Radial ProAV1 3.5mm or dual 1/4" inputs; confirm XLR out patches to console input with +48V Phantom Power OFF.',
          'On the Si Expression 3, inspect the right bank scribble labels: Submixes 1–4, "God Mic" talkback, "Aux", and Main L&R/Mono.',
          'Engage the Radial ProAV1 Ground Lift switch if any 60 Hz laptop charger hum enters the under-seating speakers; engage -15 dB Pad if laptop headphone output clips the Si preamp.',
          'Walk every under-seating speaker riser before house opens to confirm clean daisy-chain continuity.'
        ]
      }
    ],
    whyItMatters: {
      title: 'Clear-Com Ch A vs. Ch B Discipline',
      body: 'Keeping Lighting on Channel A and Audio/Stage Ops on Channel B of the Clear-Com MS-702 prevents audio cue troubleshooting from talking over critical rail/fly or spotlight calls during transitions.'
    },
    troubleshooting: [
      {
        symptom: 'Loud 60 Hz buzz from under-seating Black Box speakers when playback laptop is plugged into AC wall power.',
        cause: 'Ground loop between stage electrical outlet and Stage Right amplifier rack ground.',
        resolution: 'Press the Ground Lift switch on the green Radial ProAV1 Multi-Media DI.'
      }
    ]
  },
  {
    id: 'qsys-crown-atmos',
    category: 'dsp, amplification & atmos',
    title: 'Q-SYS Core 110f, Crown XTi 4002 Amps, Haunted House & Atmos Rack 02',
    summary:
      'Managing QSC Q-SYS house speaker processing, Crown XTi Preset 6, Antimi MP3 Haunted House rigs, and the Sundance 45-ch Atmos Rack.',
    manualRef: 'FOH Rack 01 Lower Bay, Rack 02 "BHS" & Seasonal Operations',
    paragraphs: [
      'Downstream of the X32, main house audio enters the **QSC Q-SYS Core 110f** unified DSP in FOH Rack 01 (`U11`). Q-SYS handles room equalization, loudspeaker crossovers, house safety limiting, Crestron CP4N room presets (Assembly Mode vs. Concert/Musical Mode), and routing to the **Listen Technologies Wi-Fi Assistive Listening Server** (`U9`). From Q-SYS, analog/networked feeds hit four **Crown XTi 4002** amplifiers (`U1–U8`) taped **"1", "2", "3", and "RIGHT"** loaded with **PRESET 6** factory speaker tunings driving the House Left, Center, Right clusters and Balcony delays.',
      'For the annual **Halloween Haunted House** community event, our crew deploys completely off-grid from the X32: portable **Antimi MP3 Players** feed compact rechargeable Bluetooth/AUX speakers staged inside dark set rooms, pre-loaded with looping horror ambience and adjusted for balanced hallway bleed.',
      'For the **Sundance Film Festival / Dolby Atmos Cinema Upgrade**, FOH Booth expands into **FOH Rack 02 ("BHS" Enclosed Mesh Rack)** right beside the X32 desk. Connected via overhead blue Cat-6 conduit into ceiling arrays, this rack houses dual **Netgear AV Switches**, a dedicated cinema Q-SYS Core, **Amps 1–9** driving **45 surround channels** and **4x 18-inch flown ceiling subwoofers**, plus heavy UPS backup.'
    ],
    walkthroughs: [
      {
        heading: 'Pre-Show Check of Q-SYS, Crown Amps & Atmos Isolation',
        steps: [
          'Confirm Lower Furman M-8x2 ("Master Power Leave On") indicator LEDs are green; NEVER flip this off casually during normal shows.',
          'Inspect all four Crown XTi 4002 LCDs: verify "PRESET 6" is loaded on every chassis, clip LEDs are dark, and thermal meters read nominal.',
          'Check Crestron Touchpanel (`U22–U25`) shows "Full Auditorium / Musical Mode" so Q-SYS unlocks FOH X32 inputs rather than podium lectern auto-mix mode.',
          'During Sundance Cinema shows, verify Rack 02 "BHS" Switch #1 and Switch #2 PoE/AV link lights and confirm cinema server outputs pass calibration pink noise cleanly across all 45 surrounds.'
        ]
      }
    ],
    whyItMatters: {
      title: 'Never Overwrite Crown XTi Preset 6',
      body: 'The Crown XTi 4002 internal DSP presets (Preset 6) contain exact high-pass protective crossovers and limiter thresholds tuned by Ford AV for Boulder Auditorium’s flown arrays. Recalling another preset or "Bypass" can physically blow speaker diaphragms.'
    },
    troubleshooting: [
      {
        symptom: 'X32 meters look great, Crown amps are powered on, but zero sound comes from auditorium house speakers.',
        cause: 'Crestron CP4N / Q-SYS Core 110f is still set to "Lobby / Podium Only" or "System Mute" preset.',
        resolution: 'Wake the Crestron Touchpanel in FOH Rack 01 (U22–U25), select "Show / FOH Console Mode", and verify House Audio is unmuted.'
      }
    ]
  }
];

export const DEFAULT_TEAM_NOTES: TeamNote[] = [
  {
    id: 'note-1',
    title: 'Always Power Amps Last / Off First',
    body: 'FOH X32 boots FIRST before unmuting/bringing up Crown XTi 4002 and Stage Right iNUKE channels. Run [SETUP > GLOBAL > Shutdown] every night before pulling rack power.',
    createdAt: 'Pinned Booth SOP',
    pinned: true
  },
  {
    id: 'note-2',
    title: '4:45 PM Call · BLX1 Understage Rule',
    body: 'Fresh AA NiMH cells from the 70-cell booth charger go in at 4:45 PM. Every single AA comes back OUT of the BLX1 packs after curtain—zero overnight drain.',
    createdAt: 'RF Crew SOP',
    pinned: true
  },
  {
    id: 'note-3',
    title: 'Crestron Mode Check Before Panic',
    body: 'If X32 meters are healthy and Crown XTi 4002 displays show Preset 6 but the room is silent, check the Crestron Touchpanel (U22–U25) to ensure Q-SYS Core 110f is in FOH Console Mode.',
    createdAt: 'FOH Rack 01 Note',
    pinned: true
  }
];
