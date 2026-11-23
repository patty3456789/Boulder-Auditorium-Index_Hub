/**
 * show-configs.js - Show Production Matrix & Operational Runbooks
 * Standardized workflows, crew splits, and checklists for Boulder Auditorium.
 */

const ShowConfigs = {
  "spring-musical": {
    name: "Spring Musical // Anastasia",
    tag: "FULL PRODUCTION // 25+ WIRELESS",
    description: "25+ Shure BLX wireless mic channels, TheatreMix dynamic DCA scenes, live pit band (unamplified), and understage tech support.",
    timeline: "Build: Feb 11 | Sitzprobe: Feb 22–27 | Cue-to-Cue: Mar 8–10 | Tech: Mar 22–26 | Shows: Mar 31–Apr 3 | Strike: Apr 5–7",
    overrides: {
      console: "Behringer X32 (FOH Booth)",
      primaryInput: "Shure BLX4R Ch 1–25 + HH1/HH2 (Local XLR 1–27)",
      controlMode: "TheatreMix / QLab Scene DCA Mapping + Manual Fader Riding",
      outputZones: ["House L/C/R Mains", "On-Stage Foldback", "Understage Dressing Monitors"]
    },
    crewSplit: [
      { role: "FOH Co-Head 01 (Lead Mixer)", task: "Rides TheatreMix DCA faders manually by ear; advances scenes via 'Go' trigger." },
      { role: "FOH Co-Head 02 (Script & Comms)", task: "Tracks annotated script for self-cueing; handles walkie/Discord comms & backup." },
      { role: "Understage Co-Head 03 (RF Tech)", task: "Fits mic cors (medical tape over ear/neck), manages battery swaps & live pack fixes." }
    ],
    phases: {
      "01 // Pre-Show Power & System Verification": [
        "Verify FOH Rack 01 Furman conditioners and 4x Crown XTi 4002 amps are powered on.",
        "Confirm all 27 Shure BLX4R receivers (Ch 1–25, HH1, HH2) are powered on and showing clean RF.",
        "Boot Behringer X32 console; load active Anastasia show file and verify TheatreMix network sync.",
        "Confirm Stage Right iNUKE amps are active so understage dressing rooms receive live stage audio.",
        "Slide center FOH booth windows open for direct acoustic monitoring of the 980-seat house."
      ],
      "02 // 4:45 PM Call: Actor Micing & Line Check": [
        "4:45 PM: Pull fresh AA cells from 70-battery booth charger; load Shure BLX1 bodypacks.",
        "Inspect mic elements and cords; organize packs understage in descending cast order.",
        "Pre-show tech traditions/rituals; begin micing actors as makeup finishes and costumes go on.",
        "Tape mic cors securely along side of face, over the ear, and down the neck into bodypack.",
        "5:30–5:45 PM: Run full cast mic check; check off each channel on cast sheet and solo via Genelecs."
      ],
      "03 // Showtime Operations & Live Recovery": [
        "Self-call audio cues directly from annotated script alongside Stage Manager calls.",
        "Press TheatreMix 'Go' to populate active scene actors onto right-bank faders; ride levels live.",
        "Note: Live orchestra pit is acoustic/self-balanced; only spot-mic piano or harp if scheduled.",
        "Mid-show mic fault: Understage tech swaps cord/re-tapes or switches to backup pack; booth isolates via PFL before unmuting."
      ],
      "04 // Post-Show De-Mic & Battery Cycle": [
        "Mute X32 master outputs; de-mic actors understage and inspect elements for sweat or strain.",
        "Remove AA batteries from all bodypacks and dock immediately in the 70-cell FOH charger.",
        "Dock all department walkie-talkies on the red booth toolbox charger.",
        "Save updated X32/TheatreMix scene offsets, power down console, and secure booth."
      ]
    }
  },
  "black-box": {
    name: "Fall Black Box // One-Act Plays",
    tag: "PLAYBACK // UNDER-SEATING ARRAY",
    description: "Laptop soundboard playback routed into X32 Aux/Channels 14–15, feeding daisy-chained speakers under audience seating.",
    timeline: "Fall Season // Intimate Seating Configuration",
    overrides: {
      console: "Behringer X32 (FOH Booth)",
      primaryInput: "Playback Laptop Aux Out -> X32 Channels 14 & 15",
      controlMode: "Manual Software Triggering + Channel 1 Master Fader",
      outputZones: ["Under-Seating Daisy-Chained Speaker Array"]
    },
    crewSplit: [
      { role: "FOH Operator 01", task: "Self-calls cues from written script and triggers sound effects on laptop." },
      { role: "FOH Operator 02", task: "Manages Channel 1 output levels and monitors walkie channel for TD/SM notes." }
    ],
    phases: {
      "01 // Patching & Under-Seating Check": [
        "Power on Behringer X32 console and required Crown XTi amplifier channels.",
        "Patch playback laptop audio output into X32 rear inputs 14/15 (mapped to Channel 1 fader).",
        "Walk the black box seating perimeter to confirm daisy-chained under-seating speakers are linked."
      ],
      "02 // Cue Leveling & Script Prep": [
        "Trigger test cues from playback software; set Channel 1 fader trim for balanced room coverage.",
        "Verify all cue timestamps and self-calling notes in the booth script binder."
      ],
      "03 // Show Execution & Nightly Strike": [
        "Self-call and execute all SFX/music cues cleanly during performance.",
        "Post-show: Power down X32 board, leave XLR patch lines in place, and charge all booth devices."
      ]
    }
  },
  "haunted-house": {
    name: "Fall Haunted House // Multi-Zone Loops",
    tag: "DECENTRALIZED // ANTMI MP3 UNITS",
    description: "Standalone Antimi MP3 units running 4-hour MicroSD loops across attraction rooms plus wing JBL powered monitors.",
    timeline: "October Run // Multi-Room Walkthrough",
    overrides: {
      console: "Bypassed (Standalone Room Deployments)",
      primaryInput: "MicroSD Cards (4-Hour Loops) + Wing iPod Sub-Mixer",
      controlMode: "Local Unit Playback & Nightly Collection",
      outputZones: ["Attraction Room Speakers", "Wing JBL Powered Monitors"]
    },
    crewSplit: [
      { role: "Deployment Team (All Co-Heads)", task: "Distributes charged Antimi units pre-doors and sweeps house post-show for retrieval." }
    ],
    phases: {
      "01 // Pre-Doors Deployment": [
        "Verify 4-hour audio loop MicroSD cards are seated in all Antimi MP3 players.",
        "Deploy Antimi players to each haunted house zone and connect to room speakers.",
        "Set up wing JBL powered monitors and iPod sub-mixer for main circus/atmosphere theme audio."
      ],
      "02 // Active Event Monitoring": [
        "Keep charged spare Antimi units staged in FOH booth for instant swap if a room loop drops.",
        "Monitor hallway spill and adjust wing JBL levels as crowd density changes."
      ],
      "03 // Mandatory Post-Show Sweep & Charge": [
        "Walk through entire house post-show; collect every Antimi unit and power down.",
        "Return all units to FOH booth and plug every device in to charge overnight (leave XLRs in place)."
      ]
    }
  },
  "sundance-cinema": {
    name: "Sundance Film Festival // Dolby Atmos",
    tag: "CINEMA // 45-SPEAKER ATMOS + 4 FLOWN SUBS",
    description: "High-density Dolby Atmos cinema playback utilizing FOH Rack 02 ('BHS'), 45 surround speakers, and 4 ceiling sub quadrants.",
    timeline: "January Festival Window // External Integration Coordination",
    overrides: {
      console: "Dolby Cinema Processor + Q-SYS Core 110f Integration",
      primaryInput: "DCP Cinema Server / Networked AV Switches",
      controlMode: "Calibrated Cinema SPL & Processor Monitoring",
      outputZones: ["House L/C/R", "45x Dolby Atmos Surrounds", "4x 18-in Flown Subwoofers"]
    },
    crewSplit: [
      { role: "Booth Tech Lead", task: "Coordinates with Tech Director & festival projectionists; monitors Rack 02 health." }
    ],
    phases: {
      "01 // Atmos Rack & Array Verification": [
        "Confirm FOH Rack 02 ('BHS' mesh rack) Netgear switches, QSC amps, and Tripp Lite UPS are online.",
        "Verify signal lock across all 45 surround speakers and 4 flown ceiling subwoofer quadrants.",
        "Confirm ADA Listen Technologies server is broadcasting clean cinema audio."
      ],
      "02 // Screening Operations & Shutdown": [
        "Monitor Marshall rack video previews and booth SPL levels during festival screenings.",
        "Follow sequential amplifier-first power-down protocol after final screening."
      ]
    }
  }
};