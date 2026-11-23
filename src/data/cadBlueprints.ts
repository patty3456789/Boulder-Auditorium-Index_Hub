import { CadBlueprint } from '../types';

/**
 * Exact photo-traced hardware coordinates and CAD elevation specifications.
 * Proportions traced directly from uploaded FOH Rack 01, X32 Console, FOH Rack 02 "BHS",
 * Stage Right Audio/Rigging Racks, and Black Box Soundcraft Si Expression photographs.
 */
export const CAD_BLUEPRINTS: CadBlueprint[] = [
  {
    id: 'foh-rack-1',
    tabLabel: 'foh rack 01',
    title: 'FOH Rack 01 · Wireless, DSP & Main Amplification',
    subtitle: 'Full 42U Elevation · Furman Power, 27x Shure BLX4R, Marshall/Crestron, Q-SYS 110f & 4x Crown XTi 4002',
    location: 'FOH Control Booth (Left Bay)',
    referencePhoto: './assets/aistudio/IMG_6049_4c9ec864.jpg',
    referencePhotoAlt: 'FOH Rack 01 front elevation showing Shure wireless receivers, Marshall monitors, Crestron touchpanel, Q-SYS Core, Listen server, and Crown XTi 4002 amps',
    svgWidth: 560,
    svgHeight: 980,
    layoutType: 'single-rack',
    rackFrame: {
      x: 70,
      y: 24,
      width: 340,
      height: 928,
      totalU: 42,
      label: 'FOH RACK 01 (42U // AE DESIGN + FORD AV)'
    },
    units: [
      {
        id: 'r1-furman-top',
        assetId: 'FOH-DIST-01',
        slotLabel: 'U41–U42',
        title: 'AE Design / Ford AV Header & Furman M-8Dx',
        model: 'Furman M-8Dx Conditioner (2U Custom Panel)',
        summary:
          'Custom-screened top power conditioner installed by Ford AV / AE Design. Features convenience outlet, dimmer-controlled pull lamps, digital LED voltmeter (~117V), protection OK LED, and main breaker rocker.',
        motif: 'furman-ae-m8dx',
        x: 92,
        y: 36,
        width: 296,
        height: 44,
        rackUnits: 2,
        tags: ['AE DESIGN', 'FORD AV', '117V'],
        signalPath: {
          input: '120V AC Filtered Booth Dedicated Circuit',
          processing: 'SMP Surge Protection + LiFT EMI/RFI Noise Filtration',
          output: 'Switched Rear Duplex Banks -> UA844+SWB Distros & Video/DSP Bay'
        },
        powerAndClock: 'Master switched upper rack power; verify PROTECTION OK green LED before show.',
        specs: [
          'Voltage readout normal range: 115V–121V AC',
          'Dual telescoping rack lights with rotary dimmer knob',
          'Service RJ45 pass-through jack on upper right corner'
        ],
        photoPath: './assets/aistudio/IMG_6051_27d7deda.jpg'
      },
      {
        id: 'r1-ua844-upper',
        assetId: 'FOH-DIST-01',
        slotLabel: 'U37–U40',
        title: 'Upper Shure UA844+SWB Distro Quad (4x 1U)',
        model: '4x Shure UA844+SWB Wideband UHF Distribution (470–952 MHz)',
        summary:
          'Four stacked active antenna and DC power distribution chassis feeding clean RF split lines and low-voltage DC power across the upper 16 wireless receivers.',
        motif: 'shure-ua844',
        x: 92,
        y: 82,
        width: 296,
        height: 84,
        rackUnits: 4,
        tags: ['4x UA844+SWB', '470-952 MHz'],
        signalPath: {
          input: 'House/Stage Remote UHF Diversity Antenna Coax Feed',
          processing: 'Active RF Amplification + 4-Way Passive/Buffered Splitting',
          output: 'BNC RF Pairs + 15V DC Cables -> BLX4R Channels 1–16'
        },
        powerAndClock: 'DC powered via inline PSUs plugged into Upper Furman M-8Dx.',
        specs: [
          'Front BNC punch blanks capped left/right (rear antenna routing)',
          'Verify 4 solid green power LEDs on right side of faceplates',
          'Eliminates 16 separate wall-wart adapters inside rack'
        ],
        photoPath: './assets/aistudio/IMG_6058_07463666.jpg'
      },
      {
        id: 'r1-blx-upper',
        assetId: 'FOH-WIR-01',
        slotLabel: 'U29–U36',
        title: 'Upper Wireless Bank · Shure BLX4R Ch 1–16',
        model: '16x Shure BLX4R Half-Rack UHF Receivers (H10, H8 & J10 Bands)',
        summary:
          'Eight 1U dual-mount shelves housing Principal and Lead Cast receivers labeled 1 through 16 on yellow square markers. Backlit LCD displays show group/channel codes and live RF/audio bars.',
        motif: 'blx4r-pair',
        x: 92,
        y: 168,
        width: 296,
        height: 168,
        rackUnits: 8,
        tags: ['CH 1–16', 'H10 / H8 / J10'],
        signalPath: {
          input: 'Shure BLX1 Bodypack UHF RF via Upper UA844+SWB Distros',
          processing: 'Internal Antenna Diversity Selection & Pilot-Tone Squelch',
          output: 'Rear Balanced XLR Outs -> Behringer X32 Local Inputs 1–16'
        },
        powerAndClock: 'Bands staggered: Ch 1–4 (H10 542-572), Ch 5–8 (H8 518-542), Ch 9–16 (J10 584-608).',
        specs: [
          'Check RF signal bar strength during 5:30 PM line check',
          'Group/Channel frequency locks avoid DTV station splatter',
          'Receivers stay racked; packs deploy understage in descending cast order'
        ],
        photoPath: './assets/aistudio/IMG_6051_27d7deda.jpg'
      },
      {
        id: 'r1-marshall',
        assetId: 'FOH-VID-01',
        slotLabel: 'U26–U28',
        title: 'Marshall Dual Rackmount LCD Stage Preview',
        model: 'Marshall V-R702 / Dual 7-Inch Broadcast Monitor (3U)',
        summary:
          'Dual 16:9 preview screens providing direct stage proscenium sightline and auxiliary video monitoring when FOH sliding booth glass is closed.',
        motif: 'marshall-dual-lcd',
        x: 92,
        y: 338,
        width: 296,
        height: 70,
        rackUnits: 3,
        tags: ['STAGE CAM', 'DUAL LCD'],
        signalPath: {
          input: 'Auditorium Wide Stage Camera / AV Matrix Feed',
          processing: 'Dedicated Hardware Scaling & Under-Monitor Menu Controls',
          output: 'Zero-Latency Visual Stage Reference for Booth Cueing'
        },
        powerAndClock: '12V DC supply tied to upper rack conditioning.',
        specs: [
          'Right monitor displays live auditorium stage proscenium feed',
          'Left monitor handles secondary aux / backstage camera input',
          'Dedicated POWER, INPUT, F1–F4, and rotary MENU encoder per side'
        ],
        photoPath: './assets/aistudio/IMG_6049_4c9ec864.jpg'
      },
      {
        id: 'r1-crestron-touch',
        assetId: 'FOH-VID-01',
        slotLabel: 'U22–U25',
        title: 'Crestron Main System Touchpanel (BHS Splash)',
        model: 'Crestron TSW Custom 4U Rackmount Control Bezel',
        summary:
          'Flush-mounted BHS system touchscreen interface centered in a 4U black brushed aluminum faceplate, waking to the Boulder Panthers Est. 1875 crest.',
        motif: 'crestron-touch',
        x: 92,
        y: 410,
        width: 296,
        height: 90,
        rackUnits: 4,
        tags: ['CRESTRON', 'BHS EST. 1875'],
        signalPath: {
          input: 'Operator Touch Macros over PoE Control VLAN',
          processing: 'Executes Crestron CP4N System Presets & Routing Scenes',
          output: 'House Lighting/AV Integration & Room State Commands'
        },
        powerAndClock: 'PoE+ powered over booth control switch.',
        specs: [
          'Splash prompt: "Press Anywhere to Begin"',
          'Provides emergency house audio bypass & auditorium presets',
          'Communicates directly with lower Crestron CP4N at U13'
        ],
        photoPath: './assets/aistudio/IMG_6049_4c9ec864.jpg'
      },
      {
        id: 'r1-blx-lower',
        assetId: 'FOH-WIR-02',
        slotLabel: 'U16–U21',
        title: 'Lower Wireless Bank · Ch 17–25 & Handhelds HH1/HH2',
        model: '9x BLX4R Bodypack Receivers + 2x Handheld Receivers (6U Total)',
        summary:
          'Supporting cast bodypack bank Ch 17–25 (notice Bay 25 left half-rack paired with a blank right slot) sitting above dedicated yellow-tagged Handheld receivers HH1 and HH2.',
        motif: 'blx4r-single-blank',
        x: 92,
        y: 502,
        width: 296,
        height: 128,
        rackUnits: 6,
        tags: ['CH 17–25', 'HH1 / HH2'],
        signalPath: {
          input: 'Ensemble BLX1 Packs & BLX2 SM58 Handhelds via Lower UA844 Distros',
          processing: 'Diversity UHF Demodulation Across J10 & H10 Sub-Bands',
          output: 'Rear Balanced XLRs -> Behringer X32 Channels 17–27'
        },
        powerAndClock: 'Row 5 has Ch 25 + Blank plate; Row 6 houses Handhelds HH1 & HH2.',
        specs: [
          'Keep HH1 and HH2 staged for director speech & emcee use',
          'Bay 25 right-half blank panel maintains uniform airflow',
          'Yellow tag "HH1" / "HH2" prevents cross-patching with lavs'
        ],
        photoPath: './assets/aistudio/IMG_6060_4a0c897d.jpg'
      },
      {
        id: 'r1-ua844-lower',
        assetId: 'FOH-DIST-01',
        slotLabel: 'U12–U15',
        title: 'Lower Shure UA844 & UA844+SWB Distro Quad',
        model: '3x Shure UA844 + 1x Shure UA844+SWB (4x 1U)',
        summary:
          'Lower RF & DC distribution bank servicing Channels 17–25 and HH1/HH2 receivers.',
        motif: 'shure-ua844',
        x: 92,
        y: 632,
        width: 296,
        height: 82,
        rackUnits: 4,
        tags: ['3x UA844', '1x UA844+SWB'],
        signalPath: {
          input: 'Cascaded Antenna Expansion Port from Upper UA844+SWB Bank',
          processing: 'Buffered Unity RF Distribution',
          output: 'RF/DC Looms -> Receivers 17–25, HH1 & HH2'
        },
        powerAndClock: 'Confirm all 4 green right-side LEDs active at pre-show.',
        specs: [
          'Top 3 units: Shure UA844 UHF Antenna/Power Distribution Systems',
          '4th unit: Shure UA844+SWB Wideband Distribution System',
          'Keep BNC caps on unused front ports to prevent dust ingress'
        ],
        photoPath: './assets/aistudio/IMG_6050_6ab1af93.jpg'
      },
      {
        id: 'r1-cp4n-qsys',
        assetId: 'FOH-DSP-01',
        slotLabel: 'U9–U11',
        title: 'Crestron CP4N, QSC Q-SYS Core 110f & Vented Shelf',
        model: 'Crestron CP4N (1U) + Q-SYS Core 110f (1U) + NVX Shelf / Blank (2U)',
        summary:
          'Digital automation & house acoustic brain: Crestron 4-Series control processor above the QSC Q-SYS Core 110f DSP and ventilated NVX transceiver shelf.',
        motif: 'crestron-cp4n',
        x: 92,
        y: 716,
        width: 296,
        height: 76,
        rackUnits: 3,
        tags: ['CP4N', 'Q-SYS 110f'],
        signalPath: {
          input: 'Behringer X32 Main L/C/R & Control LAN Traffic',
          processing: 'Permanent 980-Seat Room FIR/IIR Tuning, Limiters & Delay Matrix',
          output: 'Protected Line Feeds -> 4x Crown XTi 4002 Power Amps'
        },
        powerAndClock: 'Always powered via Lower Furman ("Master Power Leave On").',
        specs: [
          'CP4N front indicators: PWR, NET, MSG, HW-R, SW-R + USB service port',
          'Q-SYS Core 110f front blue power LED confirms active DSP graph',
          'Never bypass Q-SYS limiter stages or duplicate heavy GEQ curves'
        ],
        photoPath: './assets/aistudio/IMG_6050_6ab1af93.jpg'
      },
      {
        id: 'r1-listen-furman',
        assetId: 'FOH-DSP-01',
        slotLabel: 'U7–U8',
        title: 'Listen Wi-Fi Server & Lower Furman M-8x2',
        model: 'Listen Technologies Wi-Fi Server (1U) + Furman M-8x2 ("Leave On")',
        summary:
          'ADA assistive listening RF/Wi-Fi broadcast appliance above the critical lower Furman conditioner stamped with the yellow "Master Power (Leave On)" warning tag.',
        motif: 'listen-server',
        x: 92,
        y: 794,
        width: 296,
        height: 48,
        rackUnits: 2,
        tags: ['LISTEN ADA', 'LEAVE ON'],
        signalPath: {
          input: 'Q-SYS Core 110f Aux/Dialogue Matrix Feed',
          processing: 'Low-Latency Audio Encoding for Patron Mobile/Receivers',
          output: 'House Auditorium ADA RF / Wi-Fi Broadcast Coverage'
        },
        powerAndClock: 'CRITICAL: Do NOT toggle off lower Furman ("Master Power Leave On").',
        specs: [
          'Listen server displays illuminated circular ring power button',
          'Lower Furman provides AC conditioning directly to Crown amp bank',
          'Verify Listen server stream active prior to every public show'
        ],
        photoPath: './assets/aistudio/IMG_6050_6ab1af93.jpg'
      },
      {
        id: 'r1-crown-amps',
        assetId: 'FOH-AMP-01',
        slotLabel: 'U1–U6 (Bottom 8U)',
        title: '4x Crown XTi 4002 Power Amplifier Stack',
        model: '4x Crown XTi 4002 Stereo Amps (Blue Tape 1, 2, 3 & Yellow RIGHT)',
        summary:
          'Bottom 8U primary PA amplifier bay driving Left, Center, Right main house clusters and balcony delay zones. Unit #3 actively displays "PRESET 6" on blue backlit LCD.',
        motif: 'crown-xti-4002',
        x: 92,
        y: 844,
        width: 296,
        height: 100,
        rackUnits: 8,
        tags: ['AMP 1', 'AMP 2', 'AMP 3', 'RIGHT'],
        signalPath: {
          input: 'QSC Q-SYS Core 110f Balanced Crossover/Processed Outputs',
          processing: 'Crown HiQnet DSP Presets (PRESET 6) & PeakX Limiting',
          output: 'Speakon Conduits -> Auditorium House L/C/R & Balcony Delays'
        },
        powerAndClock: 'Powers on LAST after X32 boot; powers down FIRST on strike.',
        specs: [
          'Hand-labeled blue tape tabs 1, 2, 3 left ears; yellow RIGHT on unit 4',
          'Rotary attenuators per Ch 1 & Ch 2 remain at calibrated house detents',
          'Dual perforated intake grilles require unobstructed front airflow'
        ],
        photoPath: './assets/aistudio/IMG_6050_6ab1af93.jpg'
      }
    ]
  },
  {
    id: 'foh-x32-console',
    tabLabel: 'foh x32 desk',
    title: 'FOH Mix Position · Behringer X32 & Genelec Monitors',
    subtitle: 'Traced Angled Desk Roadcase, Stereo Genelecs, 32-Channel Surface & Under-Desk Atmos Staging',
    location: 'FOH Control Booth (Window Counter)',
    referencePhoto: './assets/aistudio/IMG_6052_95f76de5.jpg',
    referencePhotoAlt: 'Behringer X32 digital mixing console inside custom purple roadcase flanked by stereo Genelec monitors',
    svgWidth: 560,
    svgHeight: 540,
    layoutType: 'console-desk',
    units: [
      {
        id: 'x32-genelecs',
        assetId: 'FOH-MON-01',
        slotLabel: 'Flanking Left & Right',
        title: 'Stereo Genelec Nearfield Studio Monitors',
        model: 'Genelec 8020 / 8030 Die-Cast Aluminum Pair',
        summary:
          'Nearfield studio monitors angled inward inside the custom purple roadcase deck, directly connected to the X32 rear Monitor L/R XLR outputs for offline PFL/solo verification.',
        motif: 'genelec-monitor',
        x: 34,
        y: 44,
        width: 492,
        height: 120,
        tags: ['GENELEC L', 'GENELEC R', 'PFL SOLO'],
        signalPath: {
          input: 'X32 Rear Monitor / Control Room Balanced XLR L/R',
          processing: 'X32 Monitor Dim / Mono / PFL Priority Switching',
          output: 'Booth Nearfield Reference (Independent of House PA)'
        },
        powerAndClock: 'Active self-powered monitors; check level knob on upper right X32.',
        specs: [
          'Essential for checking swapped BLX1 packs via PFL before unmuting to house',
          'Slide center FOH glass open during show so Genelecs never fool room balance',
          'Press MONO next to Monitor knob to check phase compatibility'
        ],
        photoPath: './assets/aistudio/IMG_6052_95f76de5.jpg'
      },
      {
        id: 'x32-strip',
        assetId: 'FOH-CON-01',
        slotLabel: 'Upper-Left Strip',
        title: 'Channel Strip · Preamp, Gate, Dyn, 4-Band EQ & Sends',
        model: 'MIDAS Programmable Preamps + Amber Collar Encoders',
        summary:
          'Dedicated hands-on channel processing controls for whichever channel or bus is currently selected. Press any View button to jump straight to detailed graphs on the 7-inch screen.',
        motif: 'x32-preamp-eq',
        x: 96,
        y: 66,
        width: 210,
        height: 98,
        tags: ['PREAMP', '48V', 'GATE/DYN', 'EQ'],
        signalPath: {
          input: 'Selected Channel Analog A/D or AES50 Digital Feed',
          processing: 'HA Trim -> Polarity -> Lo Cut -> Gate -> 4-Band PEQ -> Comp',
          output: 'Internal Bus Sends 1–16 & Main L/C/R Matrix'
        },
        powerAndClock: 'Target -18dBFS to -12dBFS vocal peaks; NEVER toggle +48V unmuted.',
        specs: [
          '72 dB gain range (+23 dBu max non-clip input)',
          'Pre/Post EQ swappable via Home -> Config/Dyn screen',
          'Use Lo Cut (75–100 Hz) aggressively on handhelds/lavs to cut stage rumble'
        ],
        photoPath: './assets/aistudio/IMG_6062_fd9bdf68.jpg'
      },
      {
        id: 'x32-display',
        assetId: 'FOH-CON-01',
        slotLabel: 'Upper-Center',
        title: '7-Inch TFT Main Display, Meters & Monitor/Talkback',
        model: '800x480 Daylight TFT + 6 Push-Encoders + 24-Seg L/R/Solo Meters',
        summary:
          'Real-time visual feedback hub showing channel RTA curves, routing patches, scene cue lists, AES50/Card sync squares, plus Monitor Level, Phones Level, and XLR Talkback gooseneck.',
        motif: 'x32-display-mon',
        x: 310,
        y: 66,
        width: 154,
        height: 98,
        tags: ['7" TFT', 'RTA', 'TALKBACK'],
        signalPath: {
          input: 'Console UI Telemetry, PFL/AFL Solo Bus & Talkback Mic',
          processing: '6 Context-Sensitive Push Encoders + Layer Up/Down + Page Keys',
          output: 'Monitor L/R -> Genelecs + Talkback A/B -> Stage Monitors'
        },
        powerAndClock: 'Top bar displays 48K internal clock ("L") & green sync squares.',
        specs: [
          'Hold HOME for 3 seconds to engage/release Console Lock ("X")',
          '8 Dedicated Screen buttons: HOME, METERS, ROUTING, SETUP, LIBRARY, EFFECTS, MUTE GRP, UTILITY',
          'Fat32 USB Type-A top port records 2-track WAV or loads firmware/shows'
        ],
        photoPath: './assets/aistudio/IMG_6062_fd9bdf68.jpg'
      },
      {
        id: 'x32-inputs',
        assetId: 'FOH-CON-01',
        slotLabel: 'Lower-Left (1–16)',
        title: '16x Motorized Input Faders & Color Scribble Strips',
        model: '100mm High-Resolution Faders (Ch 1–16 / 17–32 / Aux-USB / Bus Masters)',
        summary:
          'Left fader bank showing custom blue, green, red, and purple LCD scribble strips mapped to musical wireless channels, Aux playback, and "GOD MIC" as pictured during live show setup.',
        motif: 'x32-faders-left',
        x: 96,
        y: 170,
        width: 210,
        height: 150,
        tags: ['CH 1–16', 'CH 17–32', 'AUX/FX'],
        signalPath: {
          input: 'Local XLR 1–27 Wireless + Aux In 1–6 / X-USB Card Returns',
          processing: 'Sends on Faders (Hold >1s to Latch) + Individual Mute/Solo',
          output: 'Assigns to DCA 1–8, Subgroups, or Main Stereo L/R'
        },
        powerAndClock: 'Note: Keep preamp gains locked during shows unless alerted by Lead Mixer.',
        specs: [
          'Press SENDS ON FADERS after selecting a Mix Bus to mix monitors on left bank',
          'Custom scribble color/icon edited under SETUP -> SCRIBBLE STRIP',
          'Black Box mode maps Laptop Aux 14–15 directly to Ch 1 convenience fader'
        ],
        photoPath: './assets/aistudio/IMG_6062_fd9bdf68.jpg'
      },
      {
        id: 'x32-dca-bus',
        assetId: 'FOH-CON-01',
        slotLabel: 'Lower-Center (DCA / Main)',
        title: 'TheatreMix Dynamic DCA Bank & Main L/R Fader',
        model: '8x Motorized Group/DCA Faders + Independent Main LR Master Fader',
        summary:
          'Right fader bank controlled dynamically via TheatreMix OSC scenes so active scene actors automatically populate onto DCAs 1–8 for effortless live vocal fader riding.',
        motif: 'x32-faders-dca',
        x: 310,
        y: 170,
        width: 100,
        height: 150,
        tags: ['DCA 1–8', 'THEATREMIX', 'MAIN LR'],
        signalPath: {
          input: 'Virtual VCA Control Links to Assigned Actor Lavs & FX Groups',
          processing: 'Scene-by-Scene DCA Reassignment + Independent Main LR Bus',
          output: 'Main LR -> XLR 15–16 -> QSC Q-SYS Core 110f'
        },
        powerAndClock: 'CLEAR SOLO button immediately above Main LR releases all active solos.',
        specs: [
          'DCA 1 Leads · DCA 2 Supporting/Ensemble · DCA 3 Handhelds · DCA 4 QLab L/R',
          'Toggle layers for BUS 1–8, BUS 9–16 & MATRIX 1–6 outputs',
          'Enable Setup -> Global Safe Main Levels to prevent accidental PA surges'
        ],
        photoPath: './assets/aistudio/IMG_6062_fd9bdf68.jpg'
      },
      {
        id: 'x32-scenes-assign',
        assetId: 'FOH-CON-01',
        slotLabel: 'Lower-Right',
        title: 'Scenes Go/Back, Custom Assign Matrix & 6 Mute Groups',
        model: 'Scenes Transport + 36 Assignable Controls (Sets A/B/C) + 6 Mute Groups',
        summary:
          'Tactile green-backlit Assign buttons, red GO cue trigger, Undo/Prev/Next scene navigation, and 6 Mute Groups immediately left of the padded Behringer armrest.',
        motif: 'x32-scenes-assign',
        x: 414,
        y: 170,
        width: 50,
        height: 150,
        tags: ['GO / BACK', 'MUTE GRP 1–6'],
        signalPath: {
          input: 'Operator Tactile Presses & TheatreMix / QLab OSC Triggers',
          processing: 'Advances Scene Memory / Toggles Assigned Mute Groups or Reverb Sends',
          output: 'Safe-Filtered Scene Recalls & Global Ensemble Mutes'
        },
        powerAndClock: 'Use Setup/Scenes Parameter Safes to protect HA preamp gains across cues.',
        specs: [
          'Red GO advances next TheatreMix/Scene cue; Prev/Back reverts early trigger',
          'Assign Banks A/B/C hold 4 rotary pots + 8 buttons with dedicated LCDs',
          'To assign Mute Groups safely, enable MUTE GRP mode next to Main Screen first'
        ],
        photoPath: './assets/aistudio/IMG_6062_fd9bdf68.jpg'
      },
      {
        id: 'x32-atmos-staging',
        assetId: 'ATMOS-UPG-01',
        slotLabel: 'Under Console Desk',
        title: 'Staged Dolby Atmos Hardware (UPS, Switches & QSC Boxes)',
        model: 'Tripp Lite Smart UPS + Netgear M4300 AV Switches + QSC Amplifiers',
        summary:
          'Cartons staged underneath the X32 desk containing expansion hardware for the 45-speaker Sundance Dolby Atmos upgrade prior to mounting into FOH Rack 02 ("BHS").',
        motif: 'atmos-staged-boxes',
        x: 66,
        y: 356,
        width: 428,
        height: 140,
        tags: ['TRIPP LITE UPS', 'NETGEAR AV', 'QSC STAGED'],
        signalPath: {
          input: 'Atmos AV Trunk & Dedicated Booth AC Circuit',
          processing: 'AES67 / Q-LAN Managed AV Switching & UPS Battery Backup',
          output: 'Mounts into FOH Rack 02 ("BHS") Enclosed Server Cabinet'
        },
        powerAndClock: 'Keep walkways clear and inventory serial numbers before integrator install.',
        specs: [
          'Visible staged cartons: Tripp Lite UPS ("BHS"), Netgear AV boxes, QSC units',
          'Coordinated between External AV Integrator and Auditorium Tech Director',
          'Do not open or repurpose staged cartons for musical shows'
        ],
        photoPath: './assets/aistudio/IMG_6053_a461b340.jpg'
      }
    ]
  },
  {
    id: 'foh-rack-2-atmos',
    tabLabel: 'foh rack 02 (bhs)',
    title: 'FOH Rack 02 ("BHS") · Sundance Dolby Atmos Mesh Enclosure',
    subtitle: 'Traced 42U Enclosed Server Rack · Switches #1/#2, Core/DSP, Patch Panels, 9x Amps, UPS & Blue Cat6 Trunk',
    location: 'FOH Control Booth (Right of Rack 01)',
    referencePhoto: './assets/aistudio/IMG_6054_81c186af.jpg',
    referencePhotoAlt: 'FOH Rack 02 enclosed BHS mesh server cabinet standing beside FOH Rack 01 with white tape rack labels',
    svgWidth: 560,
    svgHeight: 740,
    layoutType: 'atmos-rack',
    rackFrame: {
      x: 110,
      y: 78,
      width: 280,
      height: 626,
      totalU: 42,
      label: 'FOH RACK 02 ("BHS" ATMOS ENCLOSURE)'
    },
    units: [
      {
        id: 'bhs-conduit',
        assetId: 'ATMOS-UPG-01',
        slotLabel: 'Ceiling Trunk',
        title: 'Overhead Blue Cat6 Bundle & Wall Conduit Penetration',
        model: 'Shielded Cat6 AV Trunk & Metal Conduit Entry',
        summary:
          'Overhead bundled blue Cat6 cables exiting the wall patch plate behind the booth electrical panel and entering the top entry port of FOH Rack 02.',
        motif: 'bhs-conduit-trunk',
        x: 110,
        y: 16,
        width: 280,
        height: 54,
        tags: ['BLUE CAT6 TRUNK', 'WALL PATCH'],
        signalPath: {
          input: 'Booth Rear Wall Data Penetration & Cinema Network Trunk',
          processing: 'Shielded Cat6 / Fiber Links (Atmos Audio + Control)',
          output: 'Top-of-Rack Terminations -> Patch Panels #1/#2 & Netgear Switches'
        },
        powerAndClock: 'Maintain minimum bend radius on overhead Cat6 bundles.',
        specs: [
          'Routed cleanly alongside booth electrical panel "BOOTH Fed From: MDBA"',
          'Separates high-bandwidth cinema AV traffic from analog wireless mic lines',
          'Supports 45 Atmos surround nodes + 4 flown ceiling subwoofer quadrants'
        ],
        photoPath: './assets/aistudio/IMG_6061_334a2159.jpg'
      },
      {
        id: 'bhs-switches-core',
        assetId: 'ATMOS-UPG-01',
        slotLabel: 'Top Bays (Tape: Switch #1/#2, Core, QSC)',
        title: 'Netgear AV Switches #1 & #2, Core Server & QSC DSP',
        model: 'Managed AVB/AES67 Switches + Dolby Cinema Processor / QSC Core',
        summary:
          'Upper perforated-door bays traced directly from the green "BHS" rack tape labels: Switch #1, Switch #2, Core / Server, and Q-SYS DSP routing.',
        motif: 'bhs-atmos-rack-unit',
        x: 126,
        y: 96,
        width: 248,
        height: 120,
        rackUnits: 8,
        tags: ['SWITCH #1', 'SWITCH #2', 'CORE / QSC'],
        signalPath: {
          input: 'DCP Cinema Server AES67 / Network Streams',
          processing: 'Dolby Atmos Object Rendering -> 45 Surround + 4 LFE Sub Feeds',
          output: 'VLAN-Segmented Multichannel Streams -> Amps 1–9'
        },
        powerAndClock: 'PTP/Word Clock master synchronization managed on Switch #1.',
        specs: [
          'Green label tape at upper right door frame marks "BHS"',
          'White rail tape indexes Switch #1, Switch #2, Core, and QSC',
          'Mesh perforated front door ensures thermal exhaust for dual switches'
        ],
        photoPath: './assets/aistudio/IMG_6054_81c186af.jpg'
      },
      {
        id: 'bhs-patch-panels',
        assetId: 'ATMOS-UPG-01',
        slotLabel: 'Mid Bays (Tape: Patch #1/#2)',
        title: 'Structured AV Patch Panels #1 & #2',
        model: 'High-Density RJ45 Keystone & Amplifier Interconnect Bays',
        summary:
          'Central passive interconnect bays bridging the overhead blue Cat6 auditorium runs to local Atmos amplifiers and cinema processor I/O.',
        motif: 'bhs-atmos-rack-unit',
        x: 126,
        y: 222,
        width: 248,
        height: 82,
        rackUnits: 6,
        tags: ['PATCH PANEL #1', 'PATCH PANEL #2'],
        signalPath: {
          input: 'Structured Blue Cat6 Auditorium Conduit Trunk',
          processing: '1:1 TIA-568B Structured Cross-Connect',
          output: 'Switch Ports & Processor Input Patch Cords'
        },
        powerAndClock: 'Passive termination bay; verify latch integrity before festival.',
        specs: [
          'Labeled sequentially on right-hand vertical white rail tape',
          'Eliminates strain on active Netgear switch ports during service',
          'Supports diagnostic loopback testing per auditorium speaker quadrant'
        ],
        photoPath: './assets/aistudio/IMG_6054_81c186af.jpg'
      },
      {
        id: 'bhs-amps-1-9',
        assetId: 'ATMOS-UPG-01',
        slotLabel: 'Lower Bays (Tape: Amps 1–9)',
        title: 'QSC Networked Cinema Amplifiers (Amps 1–9)',
        model: '9x High-Efficiency Multi-Channel Cinema Power Amplifiers',
        summary:
          'Dense lower stack feeding 45 discrete auditorium surround speakers across left, right, overhead ceiling, and rear walls plus 4x 18-inch flown ceiling subwoofers.',
        motif: 'bhs-atmos-rack-unit',
        x: 126,
        y: 310,
        width: 248,
        height: 292,
        rackUnits: 20,
        tags: ['AMPS 1–9', '45 CH + 4 SUBS'],
        signalPath: {
          input: 'Q-SYS / Dolby Processor Network & Analog Outputs',
          processing: 'Internal Cinema EQ, Speaker Protection & Quadrant Limiting',
          output: '45 Surround Channels + 4x 18" Flown Ceiling Subwoofers'
        },
        powerAndClock: 'High-current draw balanced across booth MDBA legs via lower UPS.',
        specs: [
          'Individual amplifier bays indexed Amp 1 through Amp 9 down right rail',
          'Leave mesh door closed and unlocked only during active maintenance',
          'Monitor thermal airflow beneath lower perforated grille'
        ],
        photoPath: './assets/aistudio/IMG_6054_81c186af.jpg'
      },
      {
        id: 'bhs-ups',
        assetId: 'ATMOS-UPG-01',
        slotLabel: 'Bottom Bay (Tape: UPS)',
        title: 'Tripp Lite Heavy-Duty Rackmount UPS',
        model: 'Tripp Lite Online / SmartPro Battery Backup System',
        summary:
          'Bottom heavy battery backup unit isolating the Atmos Core server, switches, and critical DSP state from auditorium brownouts.',
        motif: 'furman-m8x2',
        x: 126,
        y: 608,
        width: 248,
        height: 78,
        rackUnits: 4,
        tags: ['TRIPP LITE', 'UPS BACKUP'],
        signalPath: {
          input: 'Booth 120V/208V Dedicated Power Circuit',
          processing: 'True Sine-Wave Conditioning & Instant Battery Failover',
          output: 'Protected AC Rails -> Switches, Core & Processor Logic'
        },
        powerAndClock: 'Mounted at bottom U1–U4 for structural center-of-gravity stability.',
        specs: [
          'Always verify zero fault alarms on UPS front LCD prior to Sundance screenings',
          'Powers critical switches so cinema sync never drops during flicker',
          'Check battery runtime health annually before January festival window'
        ],
        photoPath: './assets/aistudio/IMG_6054_81c186af.jpg'
      }
    ]
  },
  {
    id: 'stage-right-racks',
    tabLabel: 'stage right racks',
    title: 'Stage Right Wing · Audio/Comms Stack & Rigging Bay',
    subtitle: 'Traced Dual-Bay Elevation · Clear-Com MS-702 / DX210, Crown XLS, 3x iNUKE NU1000, S16 Stagebox & ETC QuickTouch',
    location: 'Stage Right Wing',
    referencePhoto: './assets/aistudio/IMG_6036__2__6f6ae340.jpg',
    referencePhotoAlt: 'Stage Right rack showing Servoreeler, Clear-Com MS-702, Clear-Com HME DX210, Crown XLS1000, 3x Behringer iNUKE NU1000 amps, and S16 stagebox',
    svgWidth: 560,
    svgHeight: 680,
    layoutType: 'dual-rack',
    rackFrame: {
      x: 38,
      y: 34,
      width: 224,
      height: 610,
      totalU: 16,
      label: 'SR AUDIO & COMMS RACK'
    },
    secondaryRackFrame: {
      x: 298,
      y: 34,
      width: 224,
      height: 610,
      totalU: 19,
      label: 'SR RIGGING & CONTROL RACK'
    },
    units: [
      {
        id: 'sr-servoreeler',
        assetId: 'SR-COM-01',
        slotLabel: 'SR-L Top (2U)',
        title: 'Servoreeler Systems SRC Interface Controller',
        model: 'Xedit Corp SRC 24VDC Motorized Reel Controller',
        summary:
          'Top-mounted motorized cable/mic reel power controller with illuminated master amber power switch on the left and green RETRACT / red DEPLOY pushbuttons on the right.',
        motif: 'servoreeler-src',
        x: 48,
        y: 48,
        width: 204,
        height: 54,
        rackUnits: 2,
        tags: ['SERVOREELER', 'RETRACT / DEPLOY'],
        signalPath: {
          input: '120V AC -> 24VDC 8.4A Internal Power Supply',
          processing: 'Dual 3A 4A-SB Fuse Protection & Rear Speed Trims',
          output: 'Motorized Overhead Sanctuary / Stage Choir Mic Drop Reels'
        },
        powerAndClock: 'Switch off master key/rocker when overhead reels are not in production.',
        specs: [
          'Green RETRACT raises ceiling cable reels cleanly',
          'MASTER + red DEPLOY lowers mic drops to pre-calibrated trim stops',
          'Never hold DEPLOY past lower limit stop'
        ],
        photoPath: './assets/aistudio/IMG_6036__2__6f6ae340.jpg'
      },
      {
        id: 'sr-clearcom-ms702',
        assetId: 'SR-COM-01',
        slotLabel: 'SR-L 1U',
        title: 'Clear-Com MS-702 Encore Dual-Channel Master',
        model: 'Clear-Com MS-702 2-Channel Partyline Master Station (1U)',
        summary:
          'Hardwired backstage intercom master featuring 1/4" Panel Mic, 4-pin XLR Headset jack, Channel A & B Talk/Call/Volume controls, Partyline Link LED, Announce, and right speaker louvers.',
        motif: 'clearcom-ms702',
        x: 48,
        y: 106,
        width: 204,
        height: 36,
        rackUnits: 1,
        tags: ['CLEAR-COM MS-702', 'CH A / CH B'],
        signalPath: {
          input: 'Panel/Headset Mic + Stage Beltpacks (XLR-3 Partyline Ch A & B)',
          processing: 'Internal 30V DC Partyline Power & Sidetone Null Trim',
          output: 'Stage Right, Booth, Spotlights & Fly-Rail Hardwired Beltpacks'
        },
        powerAndClock: 'Verify amber Partyline Link LED matches SM call channel configuration.',
        specs: [
          'Allows Stage Manager to address Ch A (Audio/LX) and Ch B (Deck/Fly) separately or linked',
          'Remote Mic Kill button silences open stage headsets quickly during quiet scenes',
          'Program level rotary knob blends house stage audio onto beltpack ears'
        ],
        photoPath: './assets/aistudio/IMG_6036__2__6f6ae340.jpg'
      },
      {
        id: 'sr-clearcom-dx210',
        assetId: 'SR-COM-01',
        slotLabel: 'SR-L 1U',
        title: 'Clear-Com HME DX210 Wireless Intercom Base',
        model: 'Clear-Com HME DX210 Digital 2.4 GHz Base Station (1U)',
        summary:
          'Wireless beltpack transceiver integrated directly with the MS-702 partyline via 2-Wire/4-Wire matrix controls, featuring CLR/BND registration LED display, Aux In/Out, and Headset Talk controls.',
        motif: 'clearcom-dx210',
        x: 48,
        y: 146,
        width: 204,
        height: 36,
        rackUnits: 1,
        tags: ['HME DX210', '2.4 GHz'],
        signalPath: {
          input: 'Clear-Com MS-702 2W Partyline + 2.4GHz Wireless Headsets (IC1/IC2)',
          processing: 'Digital Spread Spectrum Encryption & Echo Cancellation',
          output: 'Full-Duplex Roving Stage Crew & Followspot Comms'
        },
        powerAndClock: 'Use CLR/BND button only if pairing a replacement wireless beltpack.',
        specs: [
          'Bridges IC1/IC2 wireless groups cleanly into hardwired Ch A/B',
          'Inspect 2W Input/Output null pots only during initial seasonal setup',
          'Avoid placing Wi-Fi routers directly beside DX210 rear dipole antennas'
        ],
        photoPath: './assets/aistudio/IMG_6036__2__6f6ae340.jpg'
      },
      {
        id: 'sr-crown-xls',
        assetId: 'SR-COM-01',
        slotLabel: 'SR-L 2U',
        title: 'Crown XLS1000 DriveCore Amplifier',
        model: 'Crown XLS1000 High-Density Amplifier (2U Silver Faceplate)',
        summary:
          'Distinctive silver-chassis 2U DriveCore amp reading "STEREO BYPASS" on its center glowing cyan LCD, flanked by CH1/CH2 notched level dials and honeycomb ventilation grille.',
        motif: 'crown-xls1000',
        x: 48,
        y: 186,
        width: 204,
        height: 64,
        rackUnits: 2,
        tags: ['XLS1000', 'STEREO BYPASS'],
        signalPath: {
          input: 'FOH Stage Monitor Aux / Stage Right Submix',
          processing: 'DriveCore Class-D Switching (STEREO BYPASS Active)',
          output: 'On-Stage Monitor Feeds / Side-Fill Reinforcement'
        },
        powerAndClock: 'Verify cyan LCD reads STEREO BYPASS and Ch1/Ch2 green signal LEDs react.',
        specs: [
          'Ch1 & Ch2 gain pots set for balanced stage foldback without acoustic bleed',
          'Power switch bottom-right glowing blue LED when online',
          'Zero-latency PureBand crossover available via LCD MODE/MENU if needed'
        ],
        photoPath: './assets/aistudio/IMG_6036__2__6f6ae340.jpg'
      },
      {
        id: 'sr-inuke-trio',
        assetId: 'SR-COM-01',
        slotLabel: 'SR-L 6U (3x 2U)',
        title: '3x Behringer iNUKE NU1000 Foldback & Dressing Amps',
        model: '3x Behringer iNUKE NU1000 Ultra-Lightweight Amps',
        summary:
          'Signature curved silver ear-handle trio with glowing amber rotary detents and central status LCDs. Drives on-stage wedges and understage dressing room actor cue monitors.',
        motif: 'behringer-inuke',
        x: 48,
        y: 254,
        width: 204,
        height: 184,
        rackUnits: 6,
        tags: ['3x iNUKE NU1000', 'UNDERSTAGE CUES'],
        signalPath: {
          input: 'Behringer S16 Stagebox Outputs / Stage Foldback Sends',
          processing: 'Stereo Dual-Channel High-Density Class-D Amplification',
          output: 'On-Stage Foldback Wedges & Understage Dressing Room Speakers'
        },
        powerAndClock: 'Amber collars illuminate when active; confirm online before 4:45 PM actor call.',
        specs: [
          'CRITICAL FOR MUSICALS: Understage actors miss entrances if iNUKEs stay powered down',
          'Top-to-bottom stacked amps 1–3 map across floor wedges & dressing zones',
          'Check orange clip LEDs only flash momentarily during loudest chorus numbers'
        ],
        photoPath: './assets/aistudio/IMG_6036__2__6f6ae340.jpg'
      },
      {
        id: 'sr-s16-stagebox',
        assetId: 'SR-COM-01',
        slotLabel: 'SR-L Bottom 3U',
        title: 'Behringer S16 / S32 Digital Stagebox',
        model: 'AES50 Digital Stagebox (Dual XLR Input Rows + 8 XLR Outputs)',
        summary:
          'Bottom 3U digital snake box connecting wired stage mics, floor sub-snakes, and pit spots via rear XLR-in banks (lower 16 plugged bottom row), routing back to FOH over SuperMAC AES50.',
        motif: 'behringer-s16',
        x: 48,
        y: 442,
        width: 204,
        height: 92,
        rackUnits: 3,
        tags: ['STAGEBOX', 'AES50 +16 OUT'],
        signalPath: {
          input: 'Wired Stage Microphones, Choir Mics & Pit Spot Inputs',
          processing: '24-Bit/48kHz MIDAS Remote-Controllable Preamps',
          output: 'Balanced Monitor XLRs -> iNUKEs + Shielded Cat-5e AES50 Trunk -> FOH X32'
        },
        powerAndClock: 'Verify green AES50-A clock sync LED lock on right panel edge.',
        specs: [
          'Accepts remote gain & +48V changes directly from FOH X32 console',
          'Maximum AES50 run: 100 meters via shielded Ethercon Cat-5e only',
          'Notice white-taped XLR inputs populated on lower input rows'
        ],
        photoPath: './assets/aistudio/IMG_6036__2__6f6ae340.jpg'
      },
      {
        id: 'sr-rig-furman',
        assetId: 'SR-RIG-01',
        slotLabel: 'SR-R Top 1U',
        title: 'Stage Right Control Rack Conditioner',
        model: 'Furman Power Conditioner (1U)',
        summary:
          'Upper power rail supplying surge protection and front service outlet for the Stage Right rigging & preview rack.',
        motif: 'furman-m8x2',
        x: 308,
        y: 48,
        width: 204,
        height: 32,
        rackUnits: 1,
        tags: ['SR POWER', '1U'],
        signalPath: {
          input: 'Stage Right Wing Dedicated AC Mains',
          processing: 'Surge Conditioning & Front Convenience Receptacle',
          output: 'Feeds ETC QuickTouch, Touchpanels & Marshall Stage Monitor'
        },
        powerAndClock: 'Check green protection indicator on right panel.',
        specs: [
          'Pull-out dual gooseneck illumination knobs',
          'Supplies clean AC to rigging & video stack independently of audio amps',
          'Do not overload front outlet with stage lighting dimmer packs'
        ],
        photoPath: './assets/aistudio/IMG_6037__2__c20b29d9.jpg'
      },
      {
        id: 'sr-etc-quicktouch',
        assetId: 'SR-RIG-01',
        slotLabel: 'SR-R 7U',
        title: 'ETC QuickTouch Rigging Controller Enclosure',
        model: 'ETC QuickTouch Automated Batten / Rigging Cabinet (7U)',
        summary:
          'Large matte-black 7U locked steel cabinet with vertical piano hinge and key cylinder at bottom-left, controlling powered stage rigging battens.',
        motif: 'etc-quicktouch',
        x: 308,
        y: 84,
        width: 204,
        height: 174,
        rackUnits: 7,
        tags: ['ETC QUICKTOUCH', 'KEY LOCKED'],
        signalPath: {
          input: 'Authorized Key Unlock + Deadman E-Stop Rigging Command',
          processing: 'Load-Cell & Upper/Lower Trim Safety Interlocks',
          output: 'Overhead Stage Fly Battens & Lighting Electrics Hoists'
        },
        powerAndClock: 'Strict TD / Certified Rigging Crew operation only—keep cabinet locked.',
        specs: [
          'Safety interlock key prevents unauthorized batten travel during rehearsals',
          'Clear underneath stage area completely before opening door',
          'Audio choir mic reels operate separately via Servoreeler SRC controller'
        ],
        photoPath: './assets/aistudio/IMG_6037__2__c20b29d9.jpg'
      },
      {
        id: 'sr-touch-mid',
        assetId: 'SR-RIG-01',
        slotLabel: 'SR-R 4U',
        title: 'Stage Wing System Control Touchscreen',
        model: 'Flush 4U Stage Control Touch Bezel',
        summary:
          'Middle 4U wide textured steel panel housing the recessed stage-wing touchscreen interface for local house/worklight cues.',
        motif: 'crestron-touch',
        x: 308,
        y: 262,
        width: 204,
        height: 92,
        rackUnits: 4,
        tags: ['WING TOUCH', '4U BEZEL'],
        signalPath: {
          input: 'Stage Manager / Crew Touch Inputs',
          processing: 'Q-SYS / Crestron Stage Macro Bus',
          output: 'Worklights, Stage Mute & Dressing Monitor Volume Macros'
        },
        powerAndClock: 'Synced over Ethernet directly with FOH Rack 01 CP4N.',
        specs: [
          'Allows Stage Right crew to toggle worklights without walking up to FOH',
          'Keep screen clean with dry microfiber cloth only',
          'Reports active preset state cleanly across booth & wing'
        ],
        photoPath: './assets/aistudio/IMG_6037__2__c20b29d9.jpg'
      },
      {
        id: 'sr-marshall-duals',
        assetId: 'SR-RIG-01',
        slotLabel: 'SR-R 3U + Bottom 4U',
        title: 'Wing Marshall Dual LCD & Lower Crestron Touchpanel',
        model: 'Marshall 3U Dual LCD Monitor + Bottom Crestron Panel (7U Total)',
        summary:
          'Bottom half of Stage Right control rack matching FOH Rack 01: dual 7-inch stage/conductor camera displays above an illuminated Crestron touch interface.',
        motif: 'marshall-dual-lcd',
        x: 308,
        y: 358,
        width: 204,
        height: 186,
        rackUnits: 7,
        tags: ['MARSHALL DUAL', 'CRESTRON'],
        signalPath: {
          input: 'Pit Conductor Camera & House Stage Camera Feeds',
          processing: 'Low-Latency Dual Broadcast Preview + Crestron Control',
          output: 'Backstage Cue Visibility for ASM / Audio Crew'
        },
        powerAndClock: 'Lower Crestron wakes on tap to mirror BHS system controls.',
        specs: [
          'Provides backstage visual lock on conductor beat when curtain wings block view',
          'Mirror-paired with FOH Rack 01 Marshall preview unit',
          'F1–F4 buttons select camera inputs cleanly per act'
        ],
        photoPath: './assets/aistudio/IMG_6037__2__c20b29d9.jpg'
      }
    ]
  },
  {
    id: 'black-box-si',
    tabLabel: 'black box rig',
    title: 'Fall Black Box · Soundcraft Si Expression 3 & Radial ProAV1',
    subtitle: 'Traced 30-Fader Console Geometry, Color-Coded Channel Strip Encoders & Radial Multimedia DI',
    location: 'Black Box / Stage Apron Portable Table',
    referencePhoto: './assets/aistudio/IMG_6066_3037d5bb.jpg',
    referencePhotoAlt: 'Soundcraft Si Expression 3 mixing console with color-coded channel strip encoders alongside Radial ProAV1 DI box',
    svgWidth: 560,
    svgHeight: 540,
    layoutType: 'console-desk',
    units: [
      {
        id: 'si-faders-1-16',
        assetId: 'BB-CON-01',
        slotLabel: 'Left Bank (Faders 1–16)',
        title: 'Fader Bank A · Input Channels 1–16 (Glow Meters)',
        model: '16x Motorized Faders with LED Bargraph + Solo/Sel/On',
        summary:
          'Left half of the Soundcraft Si Expression 3 featuring 16 FaderGlow-illuminated channels, vertical signal meters above every strip, rotary pan/send encoders, and ON/SEL/SOLO buttons.',
        motif: 'si-faders-bank',
        x: 42,
        y: 44,
        width: 230,
        height: 214,
        tags: ['CH 1–16', 'FADERS', 'BLACK BOX'],
        signalPath: {
          input: 'Rear Local XLR Microphones & Radial ProAV1 Playback Feeds (Ch 14–15)',
          processing: '40-Bit DSP Channel Strip + Color-Coded FaderGlow States',
          output: 'Main LR Mix & Under-Seating Speaker Matrix'
        },
        powerAndClock: 'FaderGlow color signals Bus (amber), FX (blue), GEQ (red), Input (white).',
        specs: [
          'In Black Box mode, Laptop Aux patches into Ch 14–15 routed onto convenient faders',
          'SEL key spotlights that channel onto upper color-coded Totem strip',
          'Press ON button firmly to pass channel audio to main mix'
        ],
        photoPath: './assets/aistudio/IMG_6066_3037d5bb.jpg'
      },
      {
        id: 'si-faders-17-30',
        assetId: 'BB-CON-01',
        slotLabel: 'Right Bank (17–30 + LR/M)',
        title: 'Fader Bank B · Channels 17–30, Submixes & Master L/R',
        model: '14x Input/Submix Faders + 2x Master LR/Mono Faders',
        summary:
          'Right fader bank visible in photo showing Submixes 1–4, white board-tape labels for "God Mic" and "Aux", Layer A/B/C/D toggles, and the dedicated L&R / Mono master faders.',
        motif: 'si-faders-bank',
        x: 280,
        y: 44,
        width: 238,
        height: 214,
        tags: ['17–30', 'SUBMIX 1–4', 'GOD MIC / L&R'],
        signalPath: {
          input: 'Bank Layers B/C/D, Lexicon FX Returns & "God Mic" Stage Address',
          processing: 'Dedicated Mix 1–14 Bus Masters + Stereo L/R & Mono Summing',
          output: 'Rear XLR Line Outs 15–16 -> Under-Seating Daisy-Chained Amplifiers'
        },
        powerAndClock: 'Press CLR to release solos cleanly without interrupting active cues.',
        specs: [
          'White board-tape strip marks SUBMIXES 1–4, God Mic, and Laptop Aux',
          'Store/Recall scene transport sits immediately left of Master L/R fader',
          'Never mute Master LR abruptly without smoothly fading playback first'
        ],
        photoPath: './assets/aistudio/IMG_6066_3037d5bb.jpg'
      },
      {
        id: 'si-strip-dsp',
        assetId: 'BB-CON-01',
        slotLabel: 'Upper Color-Coded Strip',
        title: 'Si Color-Coded Channel Strip & Lexicon LCD Control',
        model: 'IN (Blue) · GATE/COMP (Green) · EQ (Red) · OUT (Yellow) · FX/Menu (Blue)',
        summary:
          'Iconic Soundcraft color-coded top encoder deck on the right half: Blue Preamp/HPF/+48V, Green Gate & Compressor, Red 4-Band Sweep EQ, Yellow Output/Delay/Pan, and Lexicon touchscreen/encoders.',
        motif: 'si-strip-dsp',
        x: 42,
        y: 266,
        width: 296,
        height: 184,
        tags: ['BLUE IN', 'GREEN DYN', 'RED EQ', 'LEXICON FX'],
        signalPath: {
          input: 'Selected Channel on Either Fader Bank',
          processing: 'Immediate Analog-Style Knobs: +48V, Gain, HPF -> Gate/Comp -> 4-Band EQ -> Lexicon FX',
          output: 'Main L/R Bus or Mixes 1–14'
        },
        powerAndClock: 'Lock power-cord strain relief on rear right corner before show doors.',
        specs: [
          'Left half of upper surface is flush navy metal work surface (script/tape tray)',
          'Press ALT + ON/SOLO shortcuts per manual for rapid bus sends',
          '48V button sits in light blue IN strip—always mute channel before toggling'
        ],
        photoPath: './assets/aistudio/IMG_6066_3037d5bb.jpg'
      },
      {
        id: 'si-radial-proav1',
        assetId: 'BB-CON-01',
        slotLabel: 'Playback DI Stage',
        title: 'Radial ProAV1 Multi-Media Passive DI Box',
        model: 'Radial Engineering ProAV1 (Green Steel Chassis · TRS/RCA/XLR)',
        summary:
          'Traced directly from closeup photo IMG_6020: rugged green passive direct box taking consumer orange/grey RCA or 3.5mm laptop playback leads and outputting hum-free balanced low-Z XLR to console.',
        motif: 'radial-proav1',
        x: 350,
        y: 286,
        width: 168,
        height: 146,
        tags: ['RADIAL PROAV1', 'GROUND LIFT', '-15dB PAD'],
        signalPath: {
          input: 'Playback Laptop 3.5mm TRS / Dual RCA (Orange & Grey Cables)',
          processing: 'Passive Eclipse Transformer Isolation + Stereo-to-Mono Merge + -15dB Pad',
          output: 'Balanced Lo-Z 600-Ohm XLR Output -> Si Expression / X32 Local Input'
        },
        powerAndClock: 'PASSIVE UNIT: Never send +48V phantom power back into XLR output needlessly (Pin-1 LIFT eliminates 60Hz hum).',
        specs: [
          'Keep Pin-1 LIFT engaged whenever laptop charger creates ground loop buzz',
          'Do NOT depress XLR INPUT SELECT push-switch unless feeding line-level XLR',
          'Passive transformer provides rock-solid RF rejection across long stage floor runs'
        ],
        photoPath: './assets/aistudio/IMG_6020_37cce247.jpg'
      }
    ]
  }
];
