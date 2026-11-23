/**
 * system-db.js - Master Asset & Visual Hotspot Database
 * Source of truth for Boulder Auditorium hardware infrastructure,
 * image paths, and interactive coordinate mappings.
 */

const VenueConfig = {
  name: "BOULDER AUDITORIUM",
  subtitle: "AUDIO OPERATIONS & SYSTEM RUNBOOK",
  capacity: 980,
  bannerImage: "assets/house-front.jpg", // Map to image_68dc2b.jpg
  accentColor: "#9d7cd8"
};

const InteractiveDiagrams = [
  {
    id: "foh-rack-1",
    title: "FOH Rack 01 // Wireless & Main Amplification",
    subtitle: "Shure BLX4R Receiver Bank (Ch 1–25 + HH1/HH2), QSC/Crestron DSP & Crown XTi 4002 Amps",
    image: "assets/rack-full.jpg", // Map to image_81002e.jpg or image_7b6b67.jpg
    fallbackNote: "Place rack overview photo at assets/rack-full.jpg",
    hotspots: [
      {
        id: "hs-furman-top",
        x: 48,
        y: 9,
        label: "01 // Top Power & Antenna Distros",
        assetId: "FOH-DIST-01",
        title: "Furman Power & 4x Shure UA844+SWB",
        summary: "Main rack power conditioning (AE Design / Ford AV install) feeding four active UHF antenna & DC power distribution units.",
        specs: [
          "Power: Furman Rackmount Conditioner (Master Switched)",
          "RF Distro: 4x Shure UA844+SWB (470–952 MHz)",
          "Function: Splits dual antenna feeds across 27 wireless receivers"
        ]
      },
      {
        id: "hs-blx-upper",
        x: 48,
        y: 26,
        label: "02 // Wireless Bank A (Ch 1–16)",
        assetId: "FOH-WIR-01",
        title: "Shure BLX4R Receivers (Channels 1–16)",
        summary: "Upper dual-mounted receiver bank for lead and principal cast bodypacks. Labeled with yellow numeric tags.",
        specs: [
          "Model: Shure BLX4R Half-Rack UHF Receivers (H10 / H8 Bands)",
          "Patching: Direct XLR outs to FOH Behringer X32 local inputs 1–16",
          "SOP: Verify RF & Audio bars during 5:30 PM understage mic check"
        ]
      },
      {
        id: "hs-video-ctrl",
        x: 48,
        y: 44,
        label: "03 // Stage Video & BHS Touch Control",
        assetId: "FOH-VID-01",
        title: "Marshall Dual Monitors & Crestron Touchpanel",
        summary: "Live stage/house camera feeds for visual cueing plus the main BHS system touch interface.",
        specs: [
          "Monitors: Marshall Dual Rackmount LCD Preview Unit",
          "Control: Crestron Touchpanel (BHS Panthers Splash) + CP4N Processor",
          "Use: Visual line-of-sight verification when booth windows are closed"
        ]
      },
      {
        id: "hs-blx-lower",
        x: 48,
        y: 59,
        label: "04 // Wireless Bank B (Ch 17–25 + HH1/HH2)",
        assetId: "FOH-WIR-02",
        title: "Shure BLX4R Receivers (Ch 17–25 & Handhelds)",
        summary: "Lower receiver bank for ensemble mics plus dedicated Handheld Wireless Channels HH1 and HH2.",
        specs: [
          "Model: Shure BLX4R (J10 / H8 Bands) + Lower UA844+SWB Distros",
          "Handhelds: HH1 & HH2 (Yellow-tagged) for announcements & solos",
          "Note: Keep spare packs tuned to backup frequencies for rapid swaps"
        ]
      },
      {
        id: "hs-dsp-listen",
        x: 48,
        y: 74,
        label: "05 // QSC Q-SYS Core & Assistive Listening",
        assetId: "FOH-DSP-01",
        title: "Q-SYS Core 110f & Listen Technologies Server",
        summary: "House DSP matrix routing and ADA assistive listening RF/Wi-Fi broadcast transmitter.",
        specs: [
          "DSP: QSC Q-SYS Core 110f Unified Processor",
          "ADA Audio: Listen Technologies Assistive Listening Server",
          "Control: Crestron 4-Series Control Processor"
        ]
      },
      {
        id: "hs-crown-amps",
        x: 48,
        y: 89,
        label: "06 // Main House Power Amplification",
        assetId: "FOH-AMP-01",
        title: "4x Crown XTi 4002 Power Amplifiers",
        summary: "Primary house speaker amplification labeled 1, 2, 3 (blue tape) and RIGHT (yellow tag).",
        specs: [
          "Models: 4x Crown XTi 4002 Stereo Power Amplifiers",
          "Power: Dedicated bottom Furman conditioner (Leave Master Power ON)",
          "Zones: Main Left, Center, Right clusters & Balcony delay fills"
        ]
      }
    ]
  },
  {
    id: "foh-x32-console",
    title: "FOH Console // Behringer X32 & Nearfield Monitoring",
    subtitle: "32-Channel Surface, TheatreMix Custom DCA Layers, Genelec Monitors & Rear XLR Patch",
    image: "assets/x32-top.jpg", // Map to image_3cec8a.jpg or image_6c5d4d.jpg
    fallbackNote: "Place X32 console photo at assets/x32-top.jpg",
    hotspots: [
      {
        id: "hs-x32-left",
        x: 28,
        y: 52,
        label: "01 // Input Channels 1–16 (Wireless 1–16)",
        assetId: "FOH-CON-01",
        title: "Input Bank 1–16 (Shure BLX4R 1–16)",
        summary: "Direct local XLR inputs patched from FOH Rack 01. Gain-staged during Sitzprobe and Tech Week.",
        specs: [
          "Routing: Local XLR In 1–16 -> Shure BLX4R Ch 1–16",
          "Black Box Mode: Laptop Aux into Ch 14/15, routed to Ch 1 fader",
          "Rule: Never alter preamp trim mid-show without alerting lead mixer"
        ]
      },
      {
        id: "hs-x32-right",
        x: 53,
        y: 52,
        label: "02 // TheatreMix DCA / Bus Faders",
        assetId: "FOH-CON-01",
        title: "Right Fader Bank (TheatreMix Dynamic Scenes)",
        summary: "Software-assigned character faders. TheatreMix populates active scene actors here automatically.",
        specs: [
          "Workflow: Active speakers map to right-bank faders per scene",
          "Operation: Manual fader riding by ear based on actor projection",
          "Advantage: Eliminates menu-diving across 25+ channels live"
        ]
      },
      {
        id: "hs-x32-assign",
        x: 64,
        y: 62,
        label: "03 // Assignable Scene 'Go' & 'Back' Controls",
        assetId: "FOH-CON-01",
        title: "User Assignable Section & Mute Groups",
        summary: "Tactile green/red assignable buttons linked to TheatreMix / QLab cue triggers.",
        specs: [
          "Trigger: 'Go' advances TheatreMix scene & updates right fader bank",
          "Fallback: 'Back' reverts previous DCA assignment if cue fires early",
          "Emergency: Direct Mute Groups accessible on lower-left matrix"
        ]
      },
      {
        id: "hs-genelec-mon",
        x: 80,
        y: 26,
        label: "04 // Genelec Booth Reference Monitors",
        assetId: "FOH-MON-01",
        title: "Stereo Genelec Nearfield Booth Monitors",
        summary: "Nearfield reference speakers flanking the X32 road case for isolated PFL/Solo checks.",
        specs: [
          "Use: Offline mic check & PFL soloing before sending to house",
          "Note: Open sliding booth windows during show to hear true house SPL"
        ]
      }
    ]
  },
  {
    id: "foh-booth-staging",
    title: "FOH Booth // Comms Hub & Atmos Upgrade Staging",
    subtitle: "Walkie Charging Bay, Enclosed BHS Atmos Server Rack & Battery Station",
    image: "assets/booth-wide.jpg", // Map to image_cdaa1a.jpg
    fallbackNote: "Place wide FOH booth photo at assets/booth-wide.jpg",
    hotspots: [
      {
        id: "hs-walkie-bay",
        x: 70,
        y: 66,
        label: "01 // Department Walkie-Talkie Bank",
        assetId: "FOH-COM-01",
        title: "Multi-Unit Walkie Charger (Red Toolbox)",
        summary: "Central charging station for ~15 department head handheld radios.",
        specs: [
          "Protocol: Shared channel — always address recipient ('Booth to Understage')",
          "Backup: Text / Discord thread for silent mid-show troubleshooting",
          "Post-Show: Dock all radios immediately after strike"
        ]
      },
      {
        id: "hs-booth-windows",
        x: 50,
        y: 45,
        label: "02 // FOH Acoustic Sightline Windows",
        assetId: "FOH-LOC-01",
        title: "Center Balcony-Overhang Mixing Position",
        summary: "Direct line of sight to the 980-seat auditorium stage.",
        specs: [
          "Pre-Show: Slide center windows open prior to curtain",
          "Coverage: Monitors floor seating and balcony acoustic balance"
        ]
      },
      {
        id: "hs-script-desk",
        x: 52,
        y: 72,
        label: "03 // Script Tracking & Cueing Station",
        assetId: "FOH-OPS-01",
        title: "Secondary Co-Head Desk & Cue Binder",
        summary: "Workstation for the second FOH co-head tracking script cues and comms.",
        specs: [
          "Role: Follows annotated script, calls visual cues, handles comms",
          "Self-Cueing: Audio team self-calls cues from script to relieve SM load"
        ]
      }
    ]
  }
];

const SystemDB = [
  {
    id: "FOH-CON-01",
    name: "Behringer X32 Digital Mixing Console",
    type: "Console",
    location: "FOH Booth",
    rackPosition: "Custom Road Case (Center Desk)",
    signalPath: {
      input: "32 Local XLR Rear Patch Inputs (Ch 1–27 Wireless, Aux Playback)",
      output: "Main L/C/R & Matrix Outs -> Q-SYS Core / Crown XTi 4002 Amps"
    },
    terminalRouting: "Rear XLR Loom -> FOH Rack 01 Patch",
    metadata: {
      status: "Active",
      category: "FOH Booth",
      managedBy: "Audio Team (3 Co-Heads)",
      notes: "Controlled via TheatreMix / QLab for dynamic DCA character fader mapping."
    }
  },
  {
    id: "FOH-WIR-01",
    name: "Shure BLX4R Wireless Receiver Bank (Ch 1–16)",
    type: "Wireless System",
    location: "FOH Rack 01",
    rackPosition: "Upper Bays (Yellow Tags 1–16)",
    signalPath: {
      input: "UHF RF from Shure UA844+SWB Antenna Distros (H10 / H8 Bands)",
      output: "Balanced XLR Outs -> Behringer X32 Local Inputs 1–16"
    },
    terminalRouting: "XLR Snake Loom to X32 Rear Panel",
    metadata: {
      status: "Active",
      category: "FOH Booth",
      managedBy: "Audio Team",
      notes: "Receivers live permanently in FOH Rack 01; bodypacks & mic cors deploy understage."
    }
  },
  {
    id: "FOH-WIR-02",
    name: "Shure BLX4R Wireless Bank (Ch 17–25 + HH1/HH2)",
    type: "Wireless System",
    location: "FOH Rack 01",
    rackPosition: "Lower Bays (Yellow Tags 17–25, HH1, HH2)",
    signalPath: {
      input: "UHF RF from Lower Shure UA844+SWB Antenna Distros (J10 / H8 Bands)",
      output: "Balanced XLR Outs -> Behringer X32 Local Inputs 17–27"
    },
    terminalRouting: "XLR Snake Loom to X32 Rear Panel",
    metadata: {
      status: "Active",
      category: "FOH Booth",
      managedBy: "Audio Team",
      notes: "Includes dedicated wireless handheld channels HH1 and HH2."
    }
  },
  {
    id: "FOH-DIST-01",
    name: "Shure UA844+SWB Antenna/Power Distros (x4) & Furman",
    type: "RF / Power",
    location: "FOH Rack 01",
    rackPosition: "Top & Mid-Lower Rack Units",
    signalPath: {
      input: "Remote House/Stage UHF Antennas + 120V AC Mains",
      output: "Distributed RF & DC Power to 27 Shure BLX4R Receivers"
    },
    terminalRouting: "Coax BNC RF Trunk",
    metadata: {
      status: "Active",
      category: "FOH Booth",
      managedBy: "Audio Team",
      notes: "Installed by Ford AV / AE Design. Master Furman conditioner powers upper rack."
    }
  },
  {
    id: "FOH-AMP-01",
    name: "Crown XTi 4002 Power Amplifier Bank (x4)",
    type: "Amplifier",
    location: "FOH Rack 01",
    rackPosition: "Bottom 8U (Tagged 1, 2, 3, RIGHT)",
    signalPath: {
      input: "Q-SYS Core 110f / X32 Main & Matrix Outputs",
      output: "House Left, Center, Right & Balcony Speaker Arrays"
    },
    terminalRouting: "Speaker Conduit to House Clusters",
    metadata: {
      status: "Active",
      category: "FOH Booth",
      managedBy: "Audio Team",
      notes: "Dedicated bottom Furman power switch labeled 'Master Power Leave On'."
    }
  },
  {
    id: "FOH-DSP-01",
    name: "QSC Q-SYS Core 110f, Crestron CP4N & Listen Server",
    type: "DSP / Control",
    location: "FOH Rack 01",
    rackPosition: "Above Lower Furman Conditioner",
    signalPath: {
      input: "X32 Analog/Network Feeds & Facility Control Bus",
      output: "Processed Speaker Feeds & ADA Assistive Listening RF"
    },
    terminalRouting: "Booth Network Switch & House Conduit",
    metadata: {
      status: "Active",
      category: "FOH Booth",
      managedBy: "Audio Team / Tech Director",
      notes: "Includes Marshall dual preview monitors and BHS Crestron touch interface."
    }
  },
  {
    id: "FOH-MON-01",
    name: "Genelec Studio Nearfield Monitors (Pair)",
    type: "Monitors",
    location: "FOH Booth",
    rackPosition: "Flanking X32 Console in Road Case",
    signalPath: {
      input: "Behringer X32 Monitor L/R Outputs",
      output: "Nearfield Booth Acoustic Reference"
    },
    terminalRouting: "XLR Monitor Patch",
    metadata: {
      status: "Active",
      category: "FOH Booth",
      managedBy: "Audio Team",
      notes: "Used for PFL soloing and isolated mic troubleshooting."
    }
  },
  {
    id: "FOH-BAT-01",
    name: "70-Cell Rechargeable AA Battery & Charger Station",
    type: "Power / Battery",
    location: "FOH Booth Storage Shelving",
    rackPosition: "Wire Rack Bay (Under Whiteboard)",
    signalPath: {
      input: "120V AC Power Strip",
      output: "Charged AA Cells for 25+ Shure BLX1 Bodypacks"
    },
    terminalRouting: "Local Booth AC",
    metadata: {
      status: "Active",
      category: "Mobile Inventory",
      managedBy: "Audio Team",
      notes: "Mandatory post-show battery pull and recharge cycle after every run."
    }
  },
  {
    id: "SR-COM-01",
    name: "Stage Right Rack (Clear-Com DX210, iNUKEs & ETC Rigging)",
    type: "Stage Infrastructure",
    location: "Stage Right Wing",
    rackPosition: "Wall & Floor Rack Enclosures",
    signalPath: {
      input: "FOH Aux Feeds / Local Stage Sub-Mixer",
      output: "Stage Foldback Wedges & Understage Dressing Room Monitors"
    },
    terminalRouting: "Stage Right Patch Panel",
    metadata: {
      status: "Active",
      category: "Stage Right Rack",
      managedBy: "Audio Team / Stage Crew",
      notes: "Behringer iNUKE amps drive on-stage wedges and understage cue monitors."
    }
  },
  {
    id: "MOB-PLAY-01",
    name: "Antimi Standalone MP3 Units & Wing JBL Monitors",
    type: "Playback Device",
    location: "Booth Storage / Haunted House Rooms",
    rackPosition: "Portable Deployment",
    signalPath: {
      input: "MicroSD Cards (4-Hour Continuous Loops)",
      output: "Local Room Speakers / Wing JBL Powered Wedges"
    },
    terminalRouting: "3.5mm Aux / XLR Adapters",
    metadata: {
      status: "Active",
      category: "Mobile Inventory",
      managedBy: "Audio Team",
      notes: "Collected post-show nightly and plugged into booth charging bay."
    }
  },
  {
    id: "ATMOS-UPG-01",
    name: "Sundance Dolby Atmos Array (45 Speakers + 4 Flown Subs)",
    type: "Atmos Infrastructure",
    location: "FOH Rack 02 ('BHS' Mesh Rack) & House Grid",
    rackPosition: "Enclosed Server Rack + Ceiling Quadrants",
    signalPath: {
      input: "Dolby Cinema Processor / Netgear AV Switches / QSC Amps",
      output: "45 Surround Channels + 4x 18-inch Flown Subwoofers"
    },
    terminalRouting: "Blue Cat6 Conduit Bundle to Wall Patch",
    metadata: {
      status: "In Installation",
      category: "Dolby Atmos Upgrade",
      managedBy: "External Audio Integration Team / Tech Director",
      notes: "Hardware staged under X32 desk (Tripp Lite UPS, Netgear switches, QSC boxes)."
    }
  }
];