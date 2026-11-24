export interface SignalTraceStage {
  step: number;
  shortLabel: string;
  stationLabel: string;
  blueprintId: string;
  unitId: string;
  signalNote: string;
  connectorSpec: string;
  /** Optional inter-rack transition label drawn in CAD margin */
  linkInLabel?: string;
  linkOutLabel?: string;
  isSpeakerExit?: boolean;
}

export interface SignalTraceRoute {
  id: string;
  label: string;
  summary: string;
  stages: SignalTraceStage[];
}

/**
 * Verified physical signal flow traces mapped 1:1 to CAD blueprint IDs and unit IDs.
 * Main Auditorium & Playback loops strictly trace:
 * Source -> Board (X32) -> Back to FOH Rack 01 DSP (Q-SYS) -> Snake/Amps -> Speakers.
 */
export const SIGNAL_TRACE_ROUTES: SignalTraceRoute[] = [
  {
    id: 'main-auditorium',
    label: 'main auditorium',
    summary:
      'FOH Rack 01 Wireless Receivers -> Behringer X32 Console -> Return to FOH Rack 01 Q-SYS DSP -> Crown XTi 4002 House Amps & Stage Right S16 / iNUKE Monitors -> Auditorium & Dressing Speakers.',
    stages: [
      {
        step: 1,
        shortLabel: 'rf antennas',
        stationLabel: 'FOH Rack 01 (U37–U40)',
        blueprintId: 'foh-rack-1',
        unitId: 'r1-ua844-upper',
        signalNote: 'UHF diversity paddles feed Shure UA844+SWB RF/DC distribution.',
        connectorSpec: 'Coax BNC RF Trunk + 15V DC Loom',
        linkInLabel: 'FROM STAGE UHF PADDLES'
      },
      {
        step: 2,
        shortLabel: 'blx4r receivers',
        stationLabel: 'FOH Rack 01 (U16–U36)',
        blueprintId: 'foh-rack-1',
        unitId: 'r1-blx-upper',
        signalNote: '27x Shure BLX4R demodulate cast bodypacks & HH1/HH2 handhelds.',
        connectorSpec: '27x Balanced XLR Snake -> X32 Local Rear 1–27',
        linkOutLabel: 'XLR LOOM TO X32 DESK'
      },
      {
        step: 3,
        shortLabel: 'x32 inputs',
        stationLabel: 'FOH X32 Desk (Ch 1–27)',
        blueprintId: 'foh-x32-console',
        unitId: 'x32-inputs',
        signalNote: 'Board receives local XLR 1–27 preamps; set -18dBFS to -12dBFS peaks.',
        connectorSpec: 'Local XLR 1–27 -> Input Faders',
        linkInLabel: 'FROM RACK 01 XLR SNAKE'
      },
      {
        step: 4,
        shortLabel: 'x32 strip dsp',
        stationLabel: 'FOH X32 Desk (Channel Strip)',
        blueprintId: 'foh-x32-console',
        unitId: 'x32-strip',
        signalNote: 'MIDAS Preamp -> Lo Cut (90 Hz) -> Gate -> 4-Band PEQ -> Compressor.',
        connectorSpec: '40-Bit Floating Point SHARC DSP'
      },
      {
        step: 5,
        shortLabel: 'x32 dca & main lr',
        stationLabel: 'FOH X32 Desk (Right Bank)',
        blueprintId: 'foh-x32-console',
        unitId: 'x32-dca-bus',
        signalNote: 'TheatreMix DCA 1–8 sum into Main L/C/R & XLR 15–16 back to FOH Rack 01.',
        connectorSpec: 'Rear Balanced XLR 15–16 + Matrix',
        linkOutLabel: 'RETURN TO RACK 01 Q-SYS'
      },
      {
        step: 6,
        shortLabel: 'q-sys core 110f',
        stationLabel: 'FOH Rack 01 (U9–U11)',
        blueprintId: 'foh-rack-1',
        unitId: 'r1-cp4n-qsys',
        signalNote: 'Q-SYS Core 110f applies 980-seat room tuning, crossovers & protection limiting.',
        connectorSpec: 'Crestron Room Mode Matrix -> Amp Feeds',
        linkInLabel: 'RETURN FROM X32 MAIN OUT'
      },
      {
        step: 7,
        shortLabel: 'crown xti amps',
        stationLabel: 'FOH Rack 01 (U1–U8)',
        blueprintId: 'foh-rack-1',
        unitId: 'r1-crown-amps',
        signalNote: '4x Crown XTi 4002 (PRESET 6) power House L/C/R Clusters & Balcony Delays.',
        connectorSpec: 'Speakon Conduits -> House Clusters',
        linkOutLabel: 'TO HOUSE L/C/R & DELAYS',
        isSpeakerExit: true
      },
      {
        step: 8,
        shortLabel: 'aes50 stage snake',
        stationLabel: 'Stage Right Rack (Bottom 3U)',
        blueprintId: 'stage-right-racks',
        unitId: 'sr-s16-stagebox',
        signalNote: 'Simultaneous AES50 digital snake sends foldback & cue mixes to Stage Right S16/S32.',
        connectorSpec: 'Shielded EtherCON Cat-5e AES50-A',
        linkInLabel: 'FROM X32 AES50-A TRUNK'
      },
      {
        step: 9,
        shortLabel: 'stage & dressing amps',
        stationLabel: 'Stage Right Rack (U4–U9)',
        blueprintId: 'stage-right-racks',
        unitId: 'sr-inuke-trio',
        signalNote: '3x Behringer iNUKE NU1000 drive on-stage wedges & understage dressing speakers.',
        connectorSpec: 'Speakon Runs -> Wedges & Dressing Rooms',
        linkOutLabel: 'TO STAGE & DRESSING SPEAKERS',
        isSpeakerExit: true
      }
    ]
  },
  {
    id: 'playback-qlab',
    label: 'playback (mac / qlab)',
    summary:
      'Booth Mac mini (QLab / X-USB) -> Behringer X32 Console -> Return to FOH Rack 01 Q-SYS DSP -> Crown XTi 4002 & Stage Right Monitors -> House & Stage Speakers.',
    stages: [
      {
        step: 1,
        shortLabel: 'mac mini / qlab in',
        stationLabel: 'FOH X32 Desk (Aux / Card)',
        blueprintId: 'foh-x32-console',
        unitId: 'x32-inputs',
        signalNote: 'Booth Mac mini QLab feeds X32 via 32x32 X-USB card or Aux In 1–4 stereo faders.',
        connectorSpec: 'USB Type-B (X-USB) or Balanced TRS Aux',
        linkInLabel: 'FROM BOOTH MAC MINI (QLAB)'
      },
      {
        step: 2,
        shortLabel: 'playback dsp & duck',
        stationLabel: 'FOH X32 Desk (Channel Strip)',
        blueprintId: 'foh-x32-console',
        unitId: 'x32-strip',
        signalNote: 'Stereo Trim, HPF & optional Gate Ducker keyed to God Mic for auto-announcement dip.',
        connectorSpec: 'Stereo Linked Channel Strip'
      },
      {
        step: 3,
        shortLabel: 'master & matrix out',
        stationLabel: 'FOH X32 Desk (Right Bank)',
        blueprintId: 'foh-x32-console',
        unitId: 'x32-dca-bus',
        signalNote: 'Routed to Stereo Main L/R + Matrix sends feeding house PA and dressing cues.',
        connectorSpec: 'Rear Balanced XLR 15–16 -> Rack 01',
        linkOutLabel: 'TO FOH RACK 01 Q-SYS'
      },
      {
        step: 4,
        shortLabel: 'q-sys room dsp',
        stationLabel: 'FOH Rack 01 (U9–U11)',
        blueprintId: 'foh-rack-1',
        unitId: 'r1-cp4n-qsys',
        signalNote: 'QSC Q-SYS Core 110f enforces house safety limiters and Crestron auditorium routing.',
        connectorSpec: 'Balanced Analog / Q-SYS Matrix',
        linkInLabel: 'FROM X32 MAIN L/R OUT'
      },
      {
        step: 5,
        shortLabel: 'crown xti house amps',
        stationLabel: 'FOH Rack 01 (U1–U8)',
        blueprintId: 'foh-rack-1',
        unitId: 'r1-crown-amps',
        signalNote: '4x Crown XTi 4002 amplify playback cleanly across L/C/R and Balcony clusters.',
        connectorSpec: 'Speakon Conduits -> House Clusters',
        linkOutLabel: 'TO HOUSE SPEAKERS',
        isSpeakerExit: true
      },
      {
        step: 6,
        shortLabel: 'aes50 stage snake',
        stationLabel: 'Stage Right Rack (Bottom 3U)',
        blueprintId: 'stage-right-racks',
        unitId: 'sr-s16-stagebox',
        signalNote: 'Stage SFX cues travel over AES50-A to S16/S32 outputs feeding foldback amps.',
        connectorSpec: 'Shielded EtherCON Cat-5e -> S16 XLR Out',
        linkInLabel: 'FROM X32 AES50-A SNAKE'
      },
      {
        step: 7,
        shortLabel: 'inuke / xls monitors',
        stationLabel: 'Stage Right Rack (U4–U11)',
        blueprintId: 'stage-right-racks',
        unitId: 'sr-inuke-trio',
        signalNote: 'iNUKE NU1000 & Crown XLS1000 amplify stage cue wedges and actor dressing monitors.',
        connectorSpec: 'Speakon -> On-Stage Cue Wedges',
        linkOutLabel: 'TO STAGE CUE SPEAKERS',
        isSpeakerExit: true
      }
    ]
  },
  {
    id: 'black-box-path',
    label: 'black box rig',
    summary:
      'Computer & Mic Sources -> Radial ProAV1 Passive DI -> Soundcraft Si Expression 3 -> Under-Riser Active / Daisy-Chained Seating Monitors.',
    stages: [
      {
        step: 1,
        shortLabel: 'radial proav1 di',
        stationLabel: 'Portable Table (Playback DI)',
        blueprintId: 'black-box-si',
        unitId: 'si-radial-proav1',
        signalNote: 'Playback laptop 3.5mm/RCA enters Radial ProAV1 with -15dB Pad & Ground Lift active.',
        connectorSpec: 'Unbalanced 3.5mm/RCA -> Balanced XLR Out',
        linkInLabel: 'FROM SHOW LAPTOP / SOURCES'
      },
      {
        step: 2,
        shortLabel: 'si inputs 1–16',
        stationLabel: 'Soundcraft Si (Left Bank)',
        blueprintId: 'black-box-si',
        unitId: 'si-faders-1-16',
        signalNote: 'Wired stage mics & Laptop Aux (Ch 14–15) land on FaderGlow input strips.',
        connectorSpec: 'Local Rear XLR Inputs -> Faders'
      },
      {
        step: 3,
        shortLabel: 'si strip & lexicon',
        stationLabel: 'Soundcraft Si (Totem Strip)',
        blueprintId: 'black-box-si',
        unitId: 'si-strip-dsp',
        signalNote: 'Preamp trim, HPF, Dynamics, 4-Band EQ & Lexicon FX processing per cue.',
        connectorSpec: '40-Bit Color-Coded Strip DSP'
      },
      {
        step: 4,
        shortLabel: 'master -> riser speakers',
        stationLabel: 'Soundcraft Si (Right Bank)',
        blueprintId: 'black-box-si',
        unitId: 'si-faders-17-30',
        signalNote: 'Master L/R & Submixes exit rear XLRs 15–16 into under-riser daisy-chained monitors.',
        connectorSpec: 'Rear XLR Outs 15–16 -> Under-Riser Array',
        linkOutLabel: 'TO UNDER-RISER SPEAKERS',
        isSpeakerExit: true
      }
    ]
  },
  {
    id: 'atmos-cinema',
    label: 'dolby atmos cinema',
    summary:
      'Overhead Blue Cat6 Trunk -> Netgear M4300 AV Switches & Atmos Core -> Patch Panels #1/#2 -> 9x QSC Cinema Amps -> 45 Surrounds & 4 Flown 18" Subs.',
    stages: [
      {
        step: 1,
        shortLabel: 'cat6 conduit trunk',
        stationLabel: 'FOH Rack 02 (Ceiling Trunk)',
        blueprintId: 'foh-rack-2-atmos',
        unitId: 'bhs-conduit',
        signalNote: 'DCP cinema streams and speaker trunks enter top of enclosed "BHS" rack.',
        connectorSpec: 'Shielded Cat6 AV Bundle (MDBA Wall Plate)',
        linkInLabel: 'FROM DCP & CEILING GRID'
      },
      {
        step: 2,
        shortLabel: 'switches & atmos core',
        stationLabel: 'FOH Rack 02 (Upper Bays)',
        blueprintId: 'foh-rack-2-atmos',
        unitId: 'bhs-switches-core',
        signalNote: 'Dual Netgear AV Switches clock AES67/Q-LAN audio to Dolby Atmos Core & QSC DSP.',
        connectorSpec: 'Managed AV VLAN + PTP Word Clock'
      },
      {
        step: 3,
        shortLabel: 'patch panels #1/#2',
        stationLabel: 'FOH Rack 02 (Mid Bays)',
        blueprintId: 'foh-rack-2-atmos',
        unitId: 'bhs-patch-panels',
        signalNote: 'Structured cross-connect routes surround quadrants to QSC amplifier channels.',
        connectorSpec: 'TIA-568B Keystone Patch Bays'
      },
      {
        step: 4,
        shortLabel: '9x qsc atmos amps',
        stationLabel: 'FOH Rack 02 (Lower Bays)',
        blueprintId: 'foh-rack-2-atmos',
        unitId: 'bhs-amps-1-9',
        signalNote: 'Amps 1–9 drive 45 discrete surround channels and 4x 18-inch flown ceiling subs.',
        connectorSpec: '45 Surrounds + 4 Flown 18" Ceiling Subs',
        linkOutLabel: 'TO 45 SURROUNDS + 4 SUBS',
        isSpeakerExit: true
      }
    ]
  }
];
