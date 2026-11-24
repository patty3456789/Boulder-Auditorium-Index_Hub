import { ShowConfig } from '../types';

export const SHOW_CONFIGS: Record<string, ShowConfig> = {
  'spring-musical': {
    key: 'spring-musical',
    name: 'Spring Musical',
    tag: 'FULL PRODUCTION · 27 WIRELESS',
    description:
      '25+ Shure BLX1 bodypacks plus HH1/HH2 handhelds, TheatreMix dynamic DCA scene mapping on the Behringer X32, live unamplified orchestra pit, and dedicated understage RF support.',
    timeline: 'Build Feb 11 · Sitzprobe Feb 22–27 · Cue-to-Cue Mar 8–10 · Tech Mar 22–26 · Shows Mar 31–Apr 3 · Strike Apr 5–7',
    overrides: {
      console: 'Behringer X32 (FOH Balcony Overhang Booth)',
      primaryInput: 'Shure BLX4R Ch 1–25 + HH1/HH2 -> Local Rear XLR 1–27',
      controlMode: 'TheatreMix Dynamic DCA Right-Bank + Manual Vocal Fader Riding',
      outputZones: ['House L/C/R Clusters & Balcony Delays', 'Stage Foldback Wedges', 'Understage Dressing Room Cue Monitors']
    },
    crewSplit: [
      {
        role: 'FOH Co-Head 01 (Lead Mixer)',
        task: 'Monitors input levels on -18dBFS to -12dBFS peaks, triggers TheatreMix "Go", and rides active DCA character faders by ear.'
      },
      {
        role: 'FOH Co-Head 02 (Script & Comms)',
        task: 'Follows annotated script to self-call audio cues, tracks cue sheets, and coordinates booth walkie / silent text troubleshooting.'
      },
      {
        role: 'Understage Co-Head 03 (RF Tech)',
        task: 'Preps 4:45 PM battery loads, fits mic cors with medical tape over ear/neck, and executes instant mid-show pack or element swaps.'
      }
    ],
    phases: [
      {
        title: 'Pre-Show Power & System Verification',
        steps: [
          'Verify FOH Rack 01 upper Furman M-8Dx reads ~117V and lower Furman M-8x2 ("Master Power Leave On") feeds Q-SYS Core 110f and all 4 Crown XTi 4002 amps.',
          'Confirm all 27 Shure BLX4R receivers (Ch 1–25 + HH1/HH2) are powered via UA844+SWB distros with zero RF interference.',
          'Boot Behringer X32 before amps, load active musical show file, verify Safe Main Levels on Setup/Global, and confirm TheatreMix sync.',
          'Verify Stage Right Clear-Com MS-702 / HME DX210 comms link and Behringer iNUKE amps so understage dressing rooms receive live stage audio.',
          'Slide center FOH booth glass windows open for acoustic direct monitoring of the 980-seat house.'
        ]
      },
      {
        title: '4:45 PM Call · Actor Micing & Line Check',
        steps: [
          'Pull freshly charged AA NiMH cells from the 70-cell FOH wire rack bay and load Shure BLX1 bodypacks understage.',
          'Inspect omni lavalier elements and cable strain relief; stage packs in descending cast call order.',
          'Apply medical tape neatly along actor cheek, over the ear, and down the neck with a relief loop at the collar.',
          '5:30–5:45 PM: Execute full cast mic line check—verify RF/Audio bars on BLX4R LCDs, solo each channel on Genelecs via PFL, and check off cast sheet.'
        ]
      },
      {
        title: 'Showtime Operations & Live Recovery',
        steps: [
          'Self-call pickup/mute cues from the annotated FOH script alongside Stage Manager calls.',
          'Press TheatreMix "Go" on scene transitions to repopulate active characters onto the right DCA fader bank.',
          'Monitor acoustic orchestra pit balance (unamplified; only enable spot mics for piano/harp if scheduled in current scene).',
          'Fault recovery: Understage tech swaps failed pack/cord; FOH mutes faulty strip, solos replacement via Genelec PFL, confirms level, then unmutes cleanly.'
        ]
      },
      {
        title: 'Post-Show De-Mic & Nightly Battery Cycle',
        steps: [
          'Mute X32 master outputs before powering down any downstream amplification; de-mic actors understage and coil cables loosely.',
          'Remove every AA battery from all 25+ bodypacks and handhelds; load immediately into the 70-cell booth charger.',
          'Dock all department walkie-talkies into the red toolbox charging bay and inspect spare mic tape stock.',
          'Run X32 Safe Shutdown from Setup/Global, save TheatreMix offsets, power console off last, and close sliding booth windows.'
        ]
      }
    ]
  },
  'black-box': {
    key: 'black-box',
    name: 'Fall Black Box',
    tag: 'INTIMATE PLAYBACK · UNDER-SEATING ARRAY',
    description:
      'Compact intimate seating configuration pairing playback laptop feeds (via Radial ProAV1 DI or X32 Ch 14–15) and Soundcraft Si Expression 3 routing into daisy-chained under-seating speakers.',
    timeline: 'Fall Season · Intimate Stage Seating Configuration',
    overrides: {
      console: 'Soundcraft Si Expression 3 / Behringer X32 Bridge Mode',
      primaryInput: 'Playback Laptop -> Radial ProAV1 DI / X32 Local Inputs 14–15 (Channel 1 Master)',
      controlMode: 'Manual Cue Triggering + Master Fader Riding',
      outputZones: ['Under-Seating Daisy-Chained Speaker Array']
    },
    crewSplit: [
      {
        role: 'FOH Operator 01 (Playback)',
        task: 'Tracks script margins to self-call lighting-adjacent audio cues and triggers sound effects on the show laptop.'
      },
      {
        role: 'FOH Operator 02 (Output & Comms)',
        task: 'Sculpts room tone and master level on Channel 1 / L-R while monitoring Clear-Com for Technical Director notes.'
      }
    ],
    phases: [
      {
        title: 'Patching & Under-Seating Inspection',
        steps: [
          'Power on digital console first, verify Radial ProAV1 Multi-Media DI ground lift and -15dB pad settings before energizing Stage Right iNUKE / Crown amps.',
          'Confirm playback laptop feeds Channel 14/15 (mapped cleanly to Channel 1 fader or stereo playback bus).',
          'Walk the audience riser perimeter to verify every daisy-chained under-seating speaker passes balanced pink noise or test music cleanly.'
        ]
      },
      {
        title: 'Cue Leveling & Script Preparation',
        steps: [
          'Step through every pre-recorded SFX and scene change track to normalize gain trim and trim sharp peaks.',
          'Confirm every cue timestamp, fade-out duration, and self-call trigger line in the booth script binder.'
        ]
      },
      {
        title: 'Performance Execution & Nightly Shutdown',
        steps: [
          'Execute self-called cues cleanly throughout all one-act transitions with smooth fade tails.',
          'Post-show: Mute master bus, power down amps then console, keep patched floor XLR runs secured, and dock walkies.'
        ]
      }
    ]
  },
  'haunted-house': {
    key: 'haunted-house',
    name: 'Fall Haunted House',
    tag: 'DECENTRALIZED · ANTMI MP3 UNITS',
    description:
      'Decentralized multi-room horror attraction running standalone Antimi MP3 players on 4-hour MicroSD continuous loops backed by wing JBL powered wedges.',
    timeline: 'October Seasonal Run · Full Auditorium & Backstage Walkthrough',
    overrides: {
      console: 'Main House Console Bypassed (Standalone Room Nodes)',
      primaryInput: 'MicroSD 4-Hour Continuous Loops + Wing iPod Sub-Mixer',
      controlMode: 'Local Room Unit Gain & Nightly Sweeps',
      outputZones: ['Individual Attraction Room Speakers', 'Stage Wing JBL Powered Monitors']
    },
    crewSplit: [
      {
        role: 'Deployment Crew (All Co-Heads)',
        task: 'Deploys fully charged Antimi players before doors, stages spares in FOH booth, and executes 100% unit retrieval nightly.'
      }
    ],
    phases: [
      {
        title: 'Pre-Doors Room Deployment',
        steps: [
          'Verify every Antimi standalone MP3 unit holds its room-specific MicroSD card loaded with the 4-hour continuous loop track.',
          'Deploy units to designated haunt rooms, connect 3.5mm/speaker outputs, verify loop start, and set room volume against bleed.',
          'Power on wing JBL powered monitors fed by the auxiliary iPod sub-mixer for hall ambiance.'
        ]
      },
      {
        title: 'Live Attraction Monitoring',
        steps: [
          'Stage at least 2 fully charged spare Antimi units in the FOH booth for instant hot-swapping if a room player stops.',
          'Walk entry hallways periodically to ensure wing JBL bleed does not mask scare cues inside adjoining rooms.'
        ]
      },
      {
        title: 'Mandatory Nightly Retrieval & Recharge',
        steps: [
          'Walk every single haunted house corridor post-show to switch off and collect 100% of deployed Antimi MP3 players.',
          'Leave all XLR extensions patched in place for next night, then plug every Antimi unit into FOH booth charging strips overnight.'
        ]
      }
    ]
  },
  'sundance-cinema': {
    key: 'sundance-cinema',
    name: 'Sundance Film Festival',
    tag: 'CINEMA · 45 SURROUNDS + 4 FLOWN SUBS',
    description:
      'High-density cinema surround configuration linking FOH Rack 02 ("BHS" mesh cabinet), 45 auditorium surround enclosures, and 4 flown 18-inch ceiling subwoofers.',
    timeline: 'January Festival Residency · External Integration Coordination',
    overrides: {
      console: 'Dolby Cinema Processor + QSC Q-SYS Core 110f Network Matrix',
      primaryInput: 'DCP Cinema Server -> Dual Netgear AV Switches (Blue Cat6 Trunk)',
      controlMode: 'Calibrated Cinema Reference SPL & Processor Health',
      outputZones: ['House L/C/R Screen Channels', '45x Atmos Surrounds', '4x 18-in Flown Subwoofers']
    },
    crewSplit: [
      {
        role: 'Booth Technical Lead',
        task: 'Coordinates with Technical Director & visiting festival projectionists; verifies FOH Rack 02 UPS, switches, amps, and Listen ADA server.'
      }
    ],
    phases: [
      {
        title: 'Atmos Rack & Array Verification',
        steps: [
          'Verify FOH Rack 02 ("BHS" mesh cabinet) Tripp Lite UPS load, Netgear AV switches #1/#2 link LEDs, Core DPS lock, and QSC Atmos Amps 1–9.',
          'Confirm test sweep across House L/C/R, all 45 surround channels, and the 4 flown 18-inch ceiling subwoofer quadrants.',
          'Check FOH Rack 01 Listen Technologies Wi-Fi server to ensure ADA assistive listening broadcasts clean dialogue.'
        ]
      },
      {
        title: 'Screening Supervision & Shutdown',
        steps: [
          'Keep sliding booth windows sealed or calibrated per festival projectionist instruction; monitor stage/house via Marshall Dual LCD.',
          'After final reel strike, confirm amps sequence off cleanly before shutting down upstream DCP / network processors.'
        ]
      }
    ]
  }
};
