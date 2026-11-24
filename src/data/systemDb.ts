import { SystemAsset } from '../types';

export const SYSTEM_DB: SystemAsset[] = [
  {
    id: 'FOH-CON-01',
    name: 'Behringer X32 Digital Mixing Console',
    type: 'Digital Console',
    location: 'FOH Booth',
    rackPosition: 'Custom Purple Roadcase (Center Balcony Overhang)',
    signalPath: {
      input: '32 Local MIDAS XLR Rear Inputs (Ch 1–27 Wireless + Aux Playback)',
      output: 'Main L/C/R & XLR 15–16 -> QSC Q-SYS Core 110f / Crown XTi 4002 Amps'
    },
    terminalRouting: 'Rear XLR Loom -> FOH Rack 01 Patch + Cat-5e Ethernet / X-USB',
    metadata: {
      status: 'Active',
      category: 'FOH Booth',
      managedBy: 'Audio Team (3 Co-Heads)',
      notes: 'Runs TheatreMix dynamic DCA scene automation on right fader bank (channels mapped per scene). Target vocal peak -18dBFS to -12dBFS.'
    }
  },
  {
    id: 'FOH-WIR-01',
    name: 'Shure BLX4R Wireless Receiver Bank (Ch 1–16)',
    type: 'Wireless Receivers',
    location: 'FOH Rack 01',
    rackPosition: 'U30–U37 (Yellow Numeric Tags 1–16)',
    signalPath: {
      input: 'UHF RF via Upper 4x Shure UA844+SWB Antenna Distros (H10 / H8 / J10 Bands)',
      output: 'Balanced XLR Outs -> Behringer X32 Local Rear Inputs 1–16'
    },
    terminalRouting: 'Labeled XLR Snake Loom to X32 Rear Panel',
    metadata: {
      status: 'Active',
      category: 'FOH Booth',
      managedBy: 'Audio Team',
      notes: 'Receivers remain permanently racked in FOH Rack 01. Lead cast BLX1 bodypacks deploy understage at 4:45 PM.'
    }
  },
  {
    id: 'FOH-WIR-02',
    name: 'Shure BLX4R Wireless Bank (Ch 17–25 + HH1/HH2)',
    type: 'Wireless Receivers',
    location: 'FOH Rack 01',
    rackPosition: 'U18–U23 (Yellow Tags 17–25, Right Half Blank in Ch 25 Bay, HH1/HH2 Bottom Row)',
    signalPath: {
      input: 'UHF RF via Lower 4x Shure UA844 / UA844+SWB Antenna Distros',
      output: 'Balanced XLR Outs -> Behringer X32 Local Rear Inputs 17–27'
    },
    terminalRouting: 'Labeled XLR Snake Loom to X32 Rear Panel',
    metadata: {
      status: 'Active',
      category: 'FOH Booth',
      managedBy: 'Audio Team',
      notes: 'Bay 25 occupies left half-rack with blank right slot; bottom row pairs Handheld Receivers HH1 and HH2 for emcee/announcers.'
    }
  },
  {
    id: 'FOH-DIST-01',
    name: 'Furman M-8Dx & 8x Shure UA844+SWB / UA844 RF Distros',
    type: 'RF & Power Distribution',
    location: 'FOH Rack 01',
    rackPosition: 'Upper U38–U42 & Mid-Lower U14–U17',
    signalPath: {
      input: 'Remote House/Stage UHF Diversity Paddles + 120V AC Mains (117V Metered)',
      output: 'Split UHF RF & 15V DC Power to 27 Shure BLX4R Receivers'
    },
    terminalRouting: 'Coax BNC RF Trunk + DC Barrel Daisy Looms',
    metadata: {
      status: 'Active',
      category: 'FOH Booth',
      managedBy: 'Audio Team',
      notes: 'AE Design / Ford AV custom install header. Bottom Furman M-8x2 labeled "Master Power (Leave On)" feeds DSP and amplification stack.'
    }
  },
  {
    id: 'FOH-VID-01',
    name: 'Marshall Dual Rackmount LCD & Crestron Touchpanel',
    type: 'Video Preview & Room Control',
    location: 'FOH Rack 01',
    rackPosition: 'U24–U29 (Between Upper & Lower Wireless Banks)',
    signalPath: {
      input: 'Stage Proscenium Camera Feed & Auditorium AV Control Matrix',
      output: 'Dual 7" Stage Sightline Displays + Crestron CP4N Ethernet Control'
    },
    terminalRouting: 'SDI/HDMI Video Trunk + Shielded Cat6 Control VLAN',
    metadata: {
      status: 'Active',
      category: 'FOH Booth',
      managedBy: 'Audio Team / Tech Director',
      notes: 'Provides visual stage cue verification when sliding booth glass windows are shut; touchpanel boots to Boulder Panthers crest.'
    }
  },
  {
    id: 'FOH-DSP-01',
    name: 'Crestron CP4N, QSC Q-SYS Core 110f & Listen Wi-Fi Server',
    type: 'DSP & ADA Broadcast',
    location: 'FOH Rack 01',
    rackPosition: 'U9–U13 (Above Lower Furman M-8x2)',
    signalPath: {
      input: 'X32 Analog/AES/EBU Outputs & Booth AV Network Switch',
      output: 'Room-Tuned Speaker Crossover/Delays -> Crown XTi 4002 Amps & ADA Listen Wi-Fi'
    },
    terminalRouting: 'Analog Terminal Block + AV Network Patch',
    metadata: {
      status: 'Active',
      category: 'FOH Booth',
      managedBy: 'Audio Team / Tech Director',
      notes: 'Q-SYS Core 110f holds permanent 980-seat room calibration. Never boost high-mid graphic EQ heavily on X32 against house tuning.'
    }
  },
  {
    id: 'FOH-AMP-01',
    name: 'Crown XTi 4002 Power Amplifier Bank (x4)',
    type: 'Main PA Amplification',
    location: 'FOH Rack 01',
    rackPosition: 'Bottom 8U (U1–U8, Tagged 1, 2, 3 Blue Tape & RIGHT Yellow Tag)',
    signalPath: {
      input: 'Q-SYS Core 110f Balanced Line Feeds (PRESET 6 Active Calibration)',
      output: 'House Left, Center, Right Main Clusters & Balcony Delay Fills'
    },
    terminalRouting: 'Heavy-Gauge Speaker Conduit to Ceiling Clusters',
    metadata: {
      status: 'Active',
      category: 'FOH Booth',
      managedBy: 'Audio Team',
      notes: 'Powered via dedicated lower Furman M-8x2 ("Master Power Leave On"). Power amps are always switched on last, off first.'
    }
  },
  {
    id: 'FOH-MON-01',
    name: 'Genelec Studio Nearfield Monitors (Stereo Pair)',
    type: 'Nearfield Reference',
    location: 'FOH Booth',
    rackPosition: 'Flanking Behringer X32 Inside Custom Roadcase',
    signalPath: {
      input: 'Behringer X32 Rear Monitor L/R XLR Outputs',
      output: 'Booth Nearfield Acoustic Reference for PFL / Solo Checks'
    },
    terminalRouting: 'Short Balanced XLR Monitor Patch',
    metadata: {
      status: 'Active',
      category: 'FOH Booth',
      managedBy: 'Audio Team',
      notes: 'Used for 5:30 PM line check soloing and mid-show troubleshooting before unmuting repaired bodypacks into house PA.'
    }
  },
  {
    id: 'FOH-BAT-01',
    name: '70-Cell AA Charger Bay & Walkie-Talkie Toolbox Station',
    type: 'Power & Crew Comms',
    location: 'FOH Booth',
    rackPosition: 'Wire Shelving Under Whiteboard & Red Metal Toolbox Desk',
    signalPath: {
      input: '120V AC Surge Strips',
      output: 'Recharged NiMH AA Cells for 27 BLX Transmitters + ~15 Department Radios'
    },
    terminalRouting: 'Local Booth AC Receptacles',
    metadata: {
      status: 'Active',
      category: 'Mobile Inventory',
      managedBy: 'Audio Team',
      notes: 'Mandatory post-show protocol: pull every AA battery from understage packs and dock every department walkie nightly.'
    }
  },
  {
    id: 'SR-COM-01',
    name: 'Stage Right Audio & Intercom Bay (Clear-Com, XLS, iNUKE, S16/S32)',
    type: 'Stage Infrastructure',
    location: 'Stage Right Wing',
    rackPosition: 'Unified 34U Stage Right Rack · Lower Bay U1–U15 (SR-L Bottom 3U Patches)',
    signalPath: {
      input: 'FOH Aux/Matrix Feeds + Behringer S16/S32 Digital Stagebox AES50',
      output: 'Clear-Com Partyline/Wireless DX210, On-Stage Foldback & Dressing Room Cue Feeds'
    },
    terminalRouting: 'SR-L Bottom 3U XLR Patches + Shielded Cat-5e Ethercon to FOH',
    metadata: {
      status: 'Active',
      category: 'Stage Right Rack',
      managedBy: 'Audio Team / Stage Crew',
      notes: 'Lower half (U1–U15) of the unified 34U Stage Right rack: Servoreeler SRC, Clear-Com MS-702 Encore, HME DX210 wireless comms, Crown XLS1000 (STEREO BYPASS), 3x Behringer iNUKE NU1000, and bottom 3U Behringer S16/S32 patches.'
    }
  },
  {
    id: 'SR-RIG-01',
    name: 'Stage Right Rigging & Video Bay (ETC QuickTouch, Marshall, Crestron)',
    type: 'Rigging & Control',
    location: 'Stage Right Wing',
    rackPosition: 'Unified 34U Stage Right Rack · Upper Bay U16–U34 (ETC QuickTouch on Top)',
    signalPath: {
      input: 'Building Rigging Control Bus + Stage Camera / AV Network',
      output: 'Automated Fly-System Controller + Stage Wing Preview & Touch Interface'
    },
    terminalRouting: 'Dedicated Stage Right Wall Conduit',
    metadata: {
      status: 'Active',
      category: 'Stage Right Rack',
      managedBy: 'Technical Director / Stage Crew',
      notes: 'Upper half (U16–U34) of the unified 34U Stage Right rack: top Furman conditioner, locked 7U ETC QuickTouch Rigging Controller, upper touchpanel, Marshall Dual LCD monitor, and lower Crestron screen.'
    }
  },
  {
    id: 'BB-CON-01',
    name: 'Soundcraft Si Expression 3 & Radial ProAV1 DI',
    type: 'Black Box Mix & DI',
    location: 'Stage / Black Box Seating Deck',
    rackPosition: 'Portable Production Table (Fall One-Act Mode)',
    signalPath: {
      input: 'Playback Laptop 3.5mm/RCA -> Radial ProAV1 DI -> XLR Local Inputs (or X32 Ch 14–15)',
      output: 'Mix Outputs -> Stage Right Amps -> Daisy-Chained Under-Seating Speaker Array'
    },
    terminalRouting: 'Local XLR Runs Across Stage Floor',
    metadata: {
      status: 'Seasonal',
      category: 'Black Box Rig',
      managedBy: 'Audio Team',
      notes: '30-fader Soundcraft digital surface paired with green Radial ProAV1 passive stereo-to-mono multimedia DI box.'
    }
  },
  {
    id: 'MOB-PLAY-01',
    name: 'Antimi Standalone MP3 Units & Wing JBL Powered Monitors',
    type: 'Decentralized Playback',
    location: 'FOH Storage / Attraction Rooms',
    rackPosition: 'Portable Multi-Room Deployment (Fall Haunted House)',
    signalPath: {
      input: 'Pre-loaded 4-Hour Continuous Loop MicroSD Cards + Wing Sub-Mixer',
      output: 'Local Room Ambient Speakers + Wing JBL Powered Wedges'
    },
    terminalRouting: '3.5mm Aux & Balanced XLR Links (Leave XLRs Patched Nightly)',
    metadata: {
      status: 'Seasonal',
      category: 'Mobile Inventory',
      managedBy: 'Audio Team',
      notes: 'Collect all Antimi units nightly after doors close and plug into booth charging strips while keeping spare charged units ready.'
    }
  },
  {
    id: 'ATMOS-UPG-01',
    name: 'Sundance Dolby Atmos Array (FOH Rack 02 "BHS" + 45 Speakers / 4 Subs)',
    type: 'Cinema Immersive Array',
    location: 'FOH Rack 02 ("BHS" Mesh Rack) & Ceiling Grid',
    rackPosition: 'Enclosed 42U Server Cabinet Adjacent to Rack 01 + Desk Under-Staging',
    signalPath: {
      input: 'DCP Cinema Server -> Dual Netgear AV Switches -> Dolby Processor / QSC DSP',
      output: '45x Surround Channels + 4x 18-inch Flown Ceiling Subwoofers via 9x QSC Amps'
    },
    terminalRouting: 'Blue Cat6 Overhead Conduit Trunk to Wall Junction',
    metadata: {
      status: 'In Installation',
      category: 'Dolby Atmos Upgrade',
      managedBy: 'External AV Integrator / Technical Director',
      notes: 'Right rail labeled with white tape strip from Switch #1/#2, Core, Patch Panels #1/#2, down through Amps 1–9 and Tripp Lite UPS.'
    }
  }
];
