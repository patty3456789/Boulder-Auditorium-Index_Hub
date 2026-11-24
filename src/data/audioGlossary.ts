export interface GlossaryEntry {
  term: string;
  aliases?: string[];
  category: string;
  definition: string;
  boothContext?: string;
}

export const AUDIO_GLOSSARY: GlossaryEntry[] = [
  {
    term: 'patch',
    aliases: ['patched', 'patching', 'patchbay', 'crosspatch'],
    category: 'Signal Routing',
    definition:
      'Connecting an audio source (physical cable or digital channel) to a specific input, bus, or output destination.',
    boothContext:
      'At Boulder, Shure BLX4R receivers 1–27 patch to X32 Local XLR Inputs 1–27; soft-patching happens under [ROUTING].'
  },
  {
    term: 'terminate',
    aliases: ['terminated', 'terminates', 'termination'],
    category: 'Cabling & Patching',
    definition:
      'Finishing the physical end of a cable or signal trunk inside a connector, jack, keystone panel, or stagebox port.',
    boothContext:
      'FOH wireless XLR snakes terminate at the rear of the X32, while Rack 02 blue Cat6 trunks terminate in Patch Panels #1/#2.'
  },
  {
    term: 'gain staging',
    aliases: ['gain stage', 'gain-staged'],
    category: 'Signal Flow',
    definition:
      'Setting amplification levels at every point in the audio chain so signals stay strong and clean above noise without clipping.',
    boothContext:
      'Target -18 dBFS to -12 dBFS average on X32 vocal preamps before touching faders.'
  },
  {
    term: 'preamp',
    aliases: ['preamps', 'headamp', 'headamps', 'ha'],
    category: 'Hardware',
    definition:
      'The first analog amplifier stage that boosts tiny microphone-level voltages up to standard line level before digital conversion.',
    boothContext:
      'X32 uses 32 recallable MIDAS preamps (-12 dB to +60 dB).'
  },
  {
    term: 'phantom power',
    aliases: ['+48v', '48v'],
    category: 'Power & Safety',
    definition:
      '48-volt DC power sent backward down balanced XLR lines to power active condenser microphones and active DI boxes.',
    boothContext:
      'PROHIBITED on unbalanced 3.5mm laptop adapters; always mute channels before toggling +48V.'
  },
  {
    term: 'dBFS',
    category: 'Metering',
    definition:
      'Decibels Full Scale—digital audio metering where 0 dBFS is the absolute digital clipping ceiling and all valid signals read negative.',
    boothContext:
      'Keep normal dialog between -18 dBFS and -12 dBFS to preserve 12–18 dB of singing headroom.'
  },
  {
    term: 'dBu',
    category: 'Metering',
    definition:
      'Analog voltage reference scale used for professional line-level audio connections (+4 dBu is nominal pro line level).',
    boothContext:
      'X32 XLR inputs tolerate up to +23 dBu before clipping.'
  },
  {
    term: 'DCA',
    aliases: ['DCAs', 'DCA Spill'],
    category: 'Console Control',
    definition:
      'Digitally Controlled Amplifier—a master fader that scales the volume of multiple assigned channels proportionally without summing their audio together.',
    boothContext:
      'TheatreMix dynamically repopulates right-bank DCAs 1–8 per scene during the Spring Musical.'
  },
  {
    term: 'Mute Group',
    aliases: ['Mute Groups'],
    category: 'Console Control',
    definition:
      'A single programmable button that simultaneously mutes or unmutes an entire collection of channels (such as all wireless cast mics).',
    boothContext:
      'X32 provides 6 Mute Groups on the bottom-right surface corner for instant intermission cutoffs.'
  },
  {
    term: 'Snippet',
    aliases: ['Snippets'],
    category: 'Automation',
    definition:
      'A lightweight surgical console snapshot that recalls only selected parameters (like mutes or faders) without overwriting preamps or room EQ.',
    boothContext:
      'Use Snippets inside X32 Cue lists for clean scene-to-scene mic mutes.'
  },
  {
    term: 'Scene',
    aliases: ['Scenes'],
    category: 'Automation',
    definition:
      'A full-console memory snapshot storing faders, EQs, dynamics, bus sends, and (unless protected by Safes) routing and preamp gains.',
    boothContext:
      'Always lock Parameter Safes before recalling scenes live.'
  },
  {
    term: 'Safes',
    aliases: ['Parameter Safe', 'Channel Safe', 'Recall Safe'],
    category: 'Automation',
    definition:
      'Console protection locks that prevent specific channels or settings (like Routing, Preamp Gain, or Main LR) from changing during a scene recall.',
    boothContext:
      'Check [Routing] and [HA Config] under [SCENES > SAFES] before tech week.'
  },
  {
    term: 'AES50',
    aliases: ['SuperMAC'],
    category: 'Digital Networking',
    definition:
      'High-speed deterministic 48-channel bidirectional digital audio and clock protocol running over shielded Ethernet cable.',
    boothContext:
      'Connects FOH X32 to Stage Right Behringer S32/S16 stagebox.'
  },
  {
    term: 'EtherCON',
    category: 'Cabling & Patching',
    definition:
      'Ruggedized locking Neutrik XLR-style metal housing around an RJ45 Ethernet connector that prevents stage cables from unplugging.',
    boothContext:
      'Mandatory with shielded Cat-5e/6 on AES50 runs to prevent static dropouts.'
  },
  {
    term: 'HA Gain Split',
    aliases: ['HA Split', 'HA Remote'],
    category: 'Digital Networking',
    definition:
      'Separates the shared physical preamp gain from independent +/-18 dB digital trim so two consoles sharing a stagebox don’t clip each other.',
    boothContext:
      'Enabled under [SETUP > PREAMPS] whenever running FOH + Stage Monitor consoles together.'
  },
  {
    term: 'PFL',
    category: 'Monitoring',
    definition:
      'Pre-Fader Listen—monitoring a channel’s raw signal in headphones or booth speakers before its fader, even while the channel is muted in the house.',
    boothContext:
      'Essential for soloing swapped BLX1 bodypacks on Genelecs before unmuting to the 980-seat house.'
  },
  {
    term: 'AFL',
    category: 'Monitoring',
    definition:
      'After-Fader Listen—monitoring a channel or bus after its fader and pan controls so you hear its true relative level.',
    boothContext:
      'Useful when checking stereo reverb returns or Bus Masters.'
  },
  {
    term: 'RTA',
    category: 'Analysis & EQ',
    definition:
      'Real-Time Analyzer—a live frequency spectrum graph showing which audio frequencies are loudest or starting to ring into feedback.',
    boothContext:
      'X32’s 100-band RTA overlays directly behind Channel PEQ and 31-band TruEQ curves.'
  },
  {
    term: 'TruEQ',
    aliases: ['GEQ'],
    category: 'Analysis & EQ',
    definition:
      'Behringer’s phase-compensated 31-band graphic equalizer that prevents adjacent sliders from exaggerating boosts or cuts.',
    boothContext:
      'Inserted into FX Slots 5–8 to ring out stage wedges and main house clusters.'
  },
  {
    term: 'PEQ',
    aliases: ['Parametric EQ'],
    category: 'Analysis & EQ',
    definition:
      'Parametric Equalizer—allows independent adjustment of center frequency, cut/boost gain, and bandwidth (Q) to surgically notch problem frequencies.',
    boothContext:
      'Each X32 input has a 4-band PEQ plus Low-Cut; buses/matrices get 6 bands.'
  },
  {
    term: 'Matrix',
    aliases: ['Matrices'],
    category: 'Signal Routing',
    definition:
      'An output bus fed exclusively by Main LR, Mono/Center, and Mix Buses—used to feed independent speaker zones or recording lines.',
    boothContext:
      'Drives Balcony Delays, Understage Cue Monitors, and Listen ADA without altering main PA balance.'
  },
  {
    term: 'Subgroup',
    aliases: ['Subgroups', 'Sub-Group'],
    category: 'Signal Routing',
    definition:
      'A Mix Bus configured at fixed unity (0 dB) send levels so multiple channels can be compressed or EQ’d together as one audio stem.',
    boothContext:
      'Unlike DCAs, Subgroups actually sum audio together for shared bus processing.'
  },
  {
    term: 'Pre-Fader',
    category: 'Signal Routing',
    definition:
      'A signal tap taken before the channel fader, meaning FOH volume moves do not change the monitor or recording send level.',
    boothContext:
      'Required for Stage Right foldback wedges so performers hear steady mixes.'
  },
  {
    term: 'Post-Fader',
    category: 'Signal Routing',
    definition:
      'A signal tap taken after the channel fader so pulling down the channel fader also pulls down the send proportionally.',
    boothContext:
      'Mandatory for Reverb/Delay FX sends and House PA outputs.'
  },
  {
    term: 'Tap Point',
    aliases: ['Tap Points'],
    category: 'Signal Routing',
    definition:
      'The exact point inside a channel’s processing chain (Input, Pre-EQ, Post-EQ, Pre-Fader, Post-Fader) where audio splits to a bus or output.',
    boothContext:
      'Set on [ROUTING > OUT 1–16] or per Mix Bus send.'
  },
  {
    term: 'Balanced',
    aliases: ['Unbalanced'],
    category: 'Audio Physics',
    definition:
      'A 3-conductor cable scheme (Hot, Cold, Ground) that cancels electromagnetic hum across long theatre runs; unbalanced lines (RCA/3.5mm) pick up noise over distance.',
    boothContext:
      'Use the Radial ProAV1 DI to convert unbalanced laptop feeds to balanced XLR.'
  },
  {
    term: 'Ground Lift',
    aliases: ['Pin-1 Lift'],
    category: 'Power & Safety',
    definition:
      'A switch on a DI box that disconnects pin-1 shield ground between stage and booth AC circuits to break 60 Hz hum loops.',
    boothContext:
      'Flip on the Radial ProAV1 whenever a plugged-in laptop charger buzzes.'
  },
  {
    term: 'DI',
    aliases: ['DI Box', 'Direct Box'],
    category: 'Hardware',
    definition:
      'Direct Injection box—transforms high-impedance unbalanced consumer/instrument outputs into hum-resistant low-impedance balanced microphone XLR.',
    boothContext:
      'Green Radial ProAV1 Multi-Media DI handles Black Box playback laptops.'
  },
  {
    term: 'Pad',
    category: 'Signal Flow',
    definition:
      'A passive attenuation switch (commonly -15 dB or -20 dB) that lowers hot line-level outputs so they don’t overload microphone preamps.',
    boothContext:
      'Engage the -15 dB Pad on Radial ProAV1 if laptop headphone output clips the mixer.'
  },
  {
    term: 'UHF',
    category: 'RF Wireless',
    definition:
      'Ultra High Frequency radio spectrum (470–608 MHz in current US wireless allocations) used for reliable wireless bodypack transmission.',
    boothContext:
      'Our 27 Shure BLX4R receivers run across staggered H10, H8, and J10 UHF bands.'
  },
  {
    term: 'RF',
    category: 'RF Wireless',
    definition:
      'Radio Frequency—the invisible wireless carrier signal linking an actor’s beltpack transmitter to the booth receiver rack.',
    boothContext:
      'Check green RF signal bars on BLX4R LCDs during 5:30 PM line check.'
  },
  {
    term: 'Squelch',
    category: 'RF Wireless',
    definition:
      'A receiver gate circuit that mutes static white noise whenever the wireless transmitter is powered off or drops out.',
    boothContext:
      'BLX4R uses Pilot-Tone squelch to stop pop noise when actors power off packs.'
  },
  {
    term: 'Antenna Diversity',
    aliases: ['Diversity'],
    category: 'RF Wireless',
    definition:
      'Using two spaced antennas (A & B) so the receiver instantly selects whichever antenna has the stronger signal as actors move onstage.',
    boothContext:
      'Distributed across all 27 BLX4R units by 8 Shure UA844+SWB / UA844 chassis.'
  },
  {
    term: 'Lavalier',
    aliases: ['Lavaliers', 'Lav', 'Lavs'],
    category: 'Microphones',
    definition:
      'Tiny clip-on or cheek-taped omnidirectional miniature microphone worn by theatrical performers and plugged into a beltpack transmitter.',
    boothContext:
      'Taped over ear onto actor’s cheekbone at 4:45 PM call with collar strain relief.'
  },
  {
    term: 'Bodypack',
    aliases: ['Bodypacks'],
    category: 'RF Wireless',
    definition:
      'Compact battery-powered wireless belt transmitter (Shure BLX1) worn hidden in costumes that sends lavalier audio back to FOH.',
    boothContext:
      'Every AA NiMH battery must be pulled after curtain to return to the 70-cell charger.'
  },
  {
    term: 'Foldback',
    aliases: ['Wedges', 'Wedge'],
    category: 'Monitoring',
    definition:
      'Stage floor speaker monitors facing performers so singers and actors hear cues and pitch clearly onstage.',
    boothContext:
      'Driven by Stage Right Behringer iNUKE NU1000 amplifiers.'
  },
  {
    term: 'Nearfield',
    category: 'Monitoring',
    definition:
      'Compact studio reference speakers positioned close to the engineer’s ears to minimize booth room reflections during PFL checks.',
    boothContext:
      'Stereo Genelec monitors flank the X32 roadcase in the FOH booth.'
  },
  {
    term: 'DSP',
    category: 'Processing',
    definition:
      'Digital Signal Processing—high-speed mathematical audio manipulation powering EQ, compression, crossovers, room delays, and virtual FX.',
    boothContext:
      'Handled locally inside X32 SHARC chips and downstream in QSC Q-SYS Core 110f.'
  },
  {
    term: 'Crossover',
    aliases: ['Crossovers'],
    category: 'Loudspeaker Systems',
    definition:
      'Filter network splitting audio into separate low (subwoofer) and mid/high speaker frequency bands so each driver only handles its safe range.',
    boothContext:
      'Crown XTi 4002 Preset 6 enforces protective house speaker crossovers—never bypass.'
  },
  {
    term: 'Limiter',
    aliases: ['Limiting'],
    category: 'Dynamics',
    definition:
      'An extreme compressor (ratio >= 10:1) acting as a protective ceiling so sudden spikes cannot damage amplifiers or loudspeakers.',
    boothContext:
      'Active inside Q-SYS Core 110f, Crown XTi amps, and X32 Precision Limiter.'
  },
  {
    term: 'RMS',
    category: 'Dynamics & Metering',
    definition:
      'Root-Mean-Square—measures average perceived loudness rather than split-second transient spikes, producing smoother vocal compression.',
    boothContext:
      'Preferred Dynamics mode on X32 singing vocals paired with Log envelope.'
  },
  {
    term: 'Sidechain',
    aliases: ['Key Filter', 'Key Source'],
    category: 'Dynamics',
    definition:
      'A separate control signal (or filtered frequency slice) that triggers a gate, ducker, or compressor without being heard directly.',
    boothContext:
      'Use a 4–7 kHz Key Filter on X32 Dynamics to turn the channel comp into a vocal de-esser.'
  },
  {
    term: 'Ducker',
    aliases: ['Ducking'],
    category: 'Automation',
    definition:
      'A dynamics mode that automatically lowers background music whenever a voice speaks into a designated priority mic.',
    boothContext:
      'Available inside X32 [HOME > GATE > Mode = DUCKER] keyed to the God Mic.'
  },
  {
    term: 'Talkback',
    category: 'Comms',
    definition:
      'A dedicated booth microphone routed strictly to stage wedges or intercom buses—never to the audience—for talking to performers during rehearsal.',
    boothContext:
      'X32 Talkback A/B includes Auto-Dim to silence booth Genelecs while speaking.'
  },
  {
    term: 'OSC',
    category: 'Automation',
    definition:
      'Open Sound Control—high-speed network messaging protocol over Ethernet used for console automation and remote control.',
    boothContext:
      'Drives TheatreMix dynamic DCA mapping, X32-Edit, and iPad X32-Mix.'
  },
  {
    term: 'MIDI',
    category: 'Automation',
    definition:
      'Musical Instrument Digital Interface—standardized control commands (Program Change, CC, Notes) used to sync scenes between audio, lighting, and playback.',
    boothContext:
      'X32 can fire MIDI commands on Scene Go or load Scenes 1–100 from incoming QLab triggers.'
  },
  {
    term: 'Word Clock',
    aliases: ['Clock Sync', 'Clock Master', 'Clock Slave'],
    category: 'Digital Networking',
    definition:
      'The master digital heartbeat (48,000 ticks per second) keeping connected digital audio gear synchronized; mismatched clocks cause loud clicks.',
    boothContext:
      'Keep FOH X32 set to Internal 48 kHz ("L" green square) when driving slave stageboxes.'
  },
  {
    term: 'Dante',
    aliases: ['AES67', 'X-DANTE'],
    category: 'Digital Networking',
    definition:
      'Industry-standard Audio-over-IP networking transporting dozens of uncompressed low-latency channels across standard Gigabit Ethernet switches.',
    boothContext:
      'Bridges Q-SYS Core 110f, Netgear AV switches, and optional X32 X-DANTE expansion card.'
  },
  {
    term: 'ADAT',
    aliases: ['X-ADAT'],
    category: 'Digital Networking',
    definition:
      'Optical fiber digital audio standard carrying 8 channels per Toslink cable (up to 32×32 on the X-ADAT expansion card).',
    boothContext:
      'Useful when interfacing legacy studio converters or broadcast recorders.'
  },
  {
    term: 'MADI',
    aliases: ['X-MADI'],
    category: 'Digital Networking',
    definition:
      'Multichannel Audio Digital Interface—carries up to 64 channels over coaxial BNC or fiber optic lines for touring trucks and broadcast feeds.',
    boothContext:
      'Supported via Behringer X-MADI expansion slot card.'
  },
  {
    term: 'Atmos',
    aliases: ['Dolby Atmos'],
    category: 'Cinema & Spatial',
    definition:
      'Object-based 3D surround sound format placing discrete audio elements across floor walls and overhead ceiling speaker arrays.',
    boothContext:
      'Boulder’s Sundance Rack 02 ("BHS") powers 45 surrounds + 4 ceiling subs.'
  },
  {
    term: 'LFE',
    category: 'Cinema & Spatial',
    definition:
      'Low-Frequency Effects—the dedicated deep bass channel (.1) feeding flown or floor subwoofers.',
    boothContext:
      'Handled by the 4× 18-inch flown ceiling subwoofers in Atmos Cinema mode.'
  },
  {
    term: 'Conduit',
    category: 'Infrastructure',
    definition:
      'Protective metal raceway tubing routing power or shielded AV data trunks neatly through booth walls and ceilings.',
    boothContext:
      'Overhead conduit delivers blue Cat6 Atmos trunks directly into Rack 02.'
  },
  {
    term: 'Strain Relief',
    category: 'Cabling & Patching',
    definition:
      'A small slack loop or mechanical clamp preventing cable tugs from snapping fragile microphone capsules or AC power plugs.',
    boothContext:
      'Always tape a 2-inch slack loop on actor collars and lock the Si Expression AC clamp.'
  },
  {
    term: 'Haas Effect',
    aliases: ['Time-Aligned', 'Time-Alignment'],
    category: 'Acoustics',
    definition:
      'Psychoacoustic law where listeners perceive sound as coming from whichever speaker reaches their ears first—delaying balcony speakers restores natural stage imaging.',
    boothContext:
      'Apply millisecond delay on Balcony Matrix outputs so sound aligns with proscenium clusters.'
  },
  {
    term: 'Low-Cut',
    aliases: ['High-Pass', 'HPF'],
    category: 'Analysis & EQ',
    definition:
      'Filter that removes unwanted low rumble (footsteps, HVAC, wind) below a cutoff frequency while passing voice frequencies cleanly.',
    boothContext:
      'Set X32 Low-Cut around 95–110 Hz on all theatrical wireless lavaliers.'
  },
  {
    term: 'Sibilance',
    category: 'Acoustics',
    definition:
      'Harsh, piercing "S" and "T" consonant energy typically concentrated between 5 kHz and 8 kHz.',
    boothContext:
      'Tamed gently with X32 Dual DeEsser or a key-filtered dynamics band.'
  },
  {
    term: 'Headroom',
    category: 'Signal Flow',
    definition:
      'The safety margin in decibels between normal average operating level and the point where digital or analog distortion occurs.',
    boothContext:
      '-18 dBFS nominal staging gives 18 dB of clean headroom before clipping.'
  },
  {
    term: 'Polarity',
    aliases: ['Phase'],
    category: 'Audio Physics',
    definition:
      'Flips the positive/negative electrical polarity (Ø) of a signal by 180 degrees to fix hollow cancellation between adjacent mics or subs.',
    boothContext:
      'Available on X32 [CONFIG/PREAMP] right next to +48V.'
  },
  {
    term: 'Unity',
    aliases: ['Unity Gain'],
    category: 'Signal Flow',
    definition:
      '0 dB fader position where a channel neither boosts nor cuts the signal level passing through it.',
    boothContext:
      'FX returns and Subgroup sends typically sit at 0.0 dB unity.'
  },
  {
    term: 'Sends on Faders',
    category: 'Console Control',
    definition:
      'X32 workflow mode flipping the motorized 100mm channel faders into instant Bus Send level controls for rapid monitor or FX mixing.',
    boothContext:
      'Hold [SENDS ON FADER] > 1 second to latch it solid while dialing stage wedges.'
  },
  {
    term: 'Scribble Strip',
    aliases: ['Scribble Strips'],
    category: 'Console Control',
    definition:
      'Built-in backlit LCD screen above every channel fader showing custom name, color, icon, and source instead of masking tape.',
    boothContext:
      'TheatreMix updates right-bank DCA scribble strips live per character entrance.'
  },
  {
    term: 'Line Check',
    category: 'Production Ops',
    definition:
      'Quick pre-show verification where every mic and playback line is tested individually for RF signal, clean gain, and battery health.',
    boothContext:
      'Scheduled 5:30–5:45 PM before house doors open.'
  },
  {
    term: 'Sitzprobe',
    category: 'Production Ops',
    definition:
      'Seated rehearsal where musical cast sings with the full orchestra pit for the first time without blocking or staging.',
    boothContext:
      'Prime session to lock vocal gain staging and pit acoustic balance.'
  },
  {
    term: 'XLR',
    category: 'Cabling & Patching',
    definition:
      '3-pin locking balanced audio connector (Pin 1 Ground, Pin 2 Hot +, Pin 3 Cold -) standard for mics and line outputs.',
    boothContext:
      'Carries all 27 BLX4R receiver lines and main rack outputs.'
  },
  {
    term: 'TRS',
    category: 'Cabling & Patching',
    definition:
      'Tip-Ring-Sleeve 1/4-inch or 3.5mm 3-conductor plug used for balanced mono line signals or unbalanced stereo headphones.',
    boothContext:
      'Used on X32 Aux In/Out 1–6 and side-panel headphone jacks.'
  },
  {
    term: 'X-USB',
    aliases: ['X-LIVE', 'X-UF'],
    category: 'Expansion Cards',
    definition:
      'Rear expansion slot interface card adding 32-channel bidirectional multitrack USB or dual-SD recording directly inside the X32.',
    boothContext:
      'Enables QLab multitrack routing and actor-free Virtual Soundcheck.'
  },
  {
    term: 'Virtual Soundcheck',
    category: 'Automation',
    definition:
      'Playing back multitrack rehearsal recordings through console channels so engineers can refine EQ and cues without actors onstage.',
    boothContext:
      'Remember to revert [ROUTING > HOME] from Card 1–32 back to Local 1–32 afterward!'
  },
  {
    term: 'Automixer',
    aliases: ['Dugan'],
    category: 'Automation',
    definition:
      'Automatic gain-sharing algorithm that keeps total system gain constant across multiple open panel mics so feedback never builds up.',
    boothContext:
      'Ideal for multi-mic podium assemblies, debates, and award ceremonies.'
  },
  {
    term: 'Bypass',
    aliases: ['Stereo Bypass'],
    category: 'Processing',
    definition:
      'Passes signal straight through an amplifier or processor while disabling its internal DSP crossovers/limiters.',
    boothContext:
      'Stage Right Crown XLS1000 runs in STEREO BYPASS for clean wedge amplification.'
  },
  {
    term: 'Daisy-Chained',
    aliases: ['Daisy-Chain'],
    category: 'Loudspeaker Systems',
    definition:
      'Wiring multiple passive speakers sequentially in parallel from one amplifier output channel via link jacks.',
    boothContext:
      'Used for Fall Black Box under-seating speaker arrays—watch total speaker impedance.'
  }
];
