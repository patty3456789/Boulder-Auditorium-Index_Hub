import React, { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2, ExternalLink, RotateCcw, Wrench, X } from 'lucide-react';
import { GlossaryText } from './GlossaryText';

interface TriageNode {
  id: string;
  stageLabel: string;
  question: string;
  checks: string[];
  yesOption?: {
    label: string;
    nextNodeId: string;
  };
  noOption?: {
    label: string;
    nextNodeId: string;
  };
  /** Present when this node is a terminal diagnosis / fix */
  resolution?: {
    title: string;
    summary: string;
    diagramJump?: {
      label: string;
      blueprintId: string;
      unitId: string;
    };
  };
}

interface SymptomFlow {
  id: string;
  title: string;
  subtitle: string;
  startNodeId: string;
  nodes: Record<string, TriageNode>;
}

const SYMPTOM_FLOWS: SymptomFlow[] = [
  {
    id: 'complete-silence',
    title: 'Complete Silence (No Sound Anywhere)',
    subtitle: 'Nothing coming out of House L/C/R, Balcony, or Stage speakers',
    startNodeId: 'cs-1',
    nodes: {
      'cs-1': {
        id: 'cs-1',
        stageLabel: 'Step 1 · X32 Meter Check',
        question: 'Look at the Behringer X32 Main L/R 24-segment meter right of the 7-inch screen. Do you see green/amber bars bouncing?',
        checks: [
          'Play a track on QLab or speak into a live wireless mic.',
          'Check the Main L/R meter column beside the 7" display and the Main L/R fader level.'
        ],
        yesOption: { label: 'Yes — X32 Main Meters Move', nextNodeId: 'cs-2' },
        noOption: { label: 'No — Main L/R Meters Dark', nextNodeId: 'cs-no-meters' }
      },
      'cs-2': {
        id: 'cs-2',
        stageLabel: 'Step 2 · Console Main Fader & Mute',
        question: 'Is the Main Stereo L/R fader (far right) up near 0 dB with its red MUTE button unlit, and Clear Solo unlit?',
        checks: [
          'Press [MAIN ST] / [L/R] fader up to 0 dB (unity).',
          'Check [SETUP > GLOBAL] Safe Main Levels did not clamp the bus at boot.',
          'Confirm rear X32 XLR 15–16 outputs are feeding FOH Rack 01.'
        ],
        yesOption: { label: 'X32 Out Checked — Still Silent', nextNodeId: 'cs-3' },
        noOption: { label: 'Yes, Fixed — Main Was Muted/Down', nextNodeId: 'cs-fixed-console' }
      },
      'cs-3': {
        id: 'cs-3',
        stageLabel: 'Step 3 · FOH Rack 01 Crestron & Q-SYS DSP',
        question: 'Look at the Crestron Touchpanel (U22–U25) and Q-SYS Core 110f (U10) in FOH Rack 01. Is the auditorium in "Show / FOH Console Mode" and unmuted?',
        checks: [
          'Tap the Crestron touchscreen inside FOH Rack 01 to wake it.',
          'Switch out of "Assembly / Lectern Only" or "System Mute" into "FOH Console Mode".',
          'Verify the Lower Furman ("Master Power Leave On") and Q-SYS Core 110f front indicator are lit.'
        ],
        yesOption: { label: 'Crestron/Q-SYS OK — Still Silent', nextNodeId: 'cs-4' },
        noOption: { label: 'Yes, Fixed — Crestron Was Muted/Wrong Mode', nextNodeId: 'cs-fixed-crestron' }
      },
      'cs-4': {
        id: 'cs-4',
        stageLabel: 'Step 4 · Crown XTi 4002 Amp Stack',
        question: 'Check the bottom 8U of FOH Rack 01. Are all 4 Crown XTi 4002 amplifiers powered ON, displaying PRESET 6, with attenuator knobs up?',
        checks: [
          'Confirm power switches on Amps 1, 2, 3, and RIGHT are illuminated.',
          'Verify displays read PRESET 6 and Ch1/Ch2 knobs are at calibrated detents.',
          'Check Lower Furman M-8x2 breaker switch right above Amp 1.'
        ],
        yesOption: { label: 'Amps Lit — Still No House Output', nextNodeId: 'cs-amp-fault' },
        noOption: { label: 'Yes, Fixed — Amp/Furman Was Off', nextNodeId: 'cs-fixed-amps' }
      },
      'cs-no-meters': {
        id: 'cs-no-meters',
        stageLabel: 'Fault Isolated · Upstream of Main L/R',
        question: 'No audio is reaching the X32 Main Stereo bus.',
        checks: [],
        resolution: {
          title: 'X32 Inputs, DCAs, or Routing Source Blocked',
          summary:
            '1) Check that channels are routed to "ST" (Main Bus VIEW > ST button lit). 2) Check DCA 1–8 faders and bottom-right [MUTE GRP 1–6] LEDs. 3) Open [ROUTING > HOME] and verify Inputs 1–32 are on "Local 1–32" (not left on "Card 1–32").',
          diagramJump: {
            label: 'inspect x32 main & dca bank',
            blueprintId: 'foh-x32-console',
            unitId: 'x32-dca-bus'
          }
        }
      },
      'cs-fixed-console': {
        id: 'cs-fixed-console',
        stageLabel: 'Resolved · X32 Output Stage',
        question: 'Audio restored at console master output.',
        checks: [],
        resolution: {
          title: 'Resolved at Behringer X32 Master Stage',
          summary:
            'Remind operators to save the show offset cleanly and verify Safe Main Levels on [SETUP > GLOBAL] matches normal rehearsal headroom.'
        }
      },
      'cs-fixed-crestron': {
        id: 'cs-fixed-crestron',
        stageLabel: 'Resolved · Q-SYS & Crestron Matrix',
        question: 'Audio restored by switching auditorium control preset.',
        checks: [],
        resolution: {
          title: 'Crestron / Q-SYS Room Mode Restored',
          summary:
            'House DSP was gating FOH console lines under an assembly/lectern macro. Always verify "FOH Console Mode" on the FOH Rack 01 touchpanel during pre-show checks.',
          diagramJump: {
            label: 'view foh rack 01 q-sys core',
            blueprintId: 'foh-rack-1',
            unitId: 'r1-cp4n-qsys'
          }
        }
      },
      'cs-fixed-amps': {
        id: 'cs-fixed-amps',
        stageLabel: 'Resolved · FOH Power Sequencing',
        question: 'Crown XTi 4002 amplification restored.',
        checks: [],
        resolution: {
          title: 'Crown XTi 4002 Amplifier Bank Online',
          summary:
            'Ensure Crown XTi 4002 displays show PRESET 6 (never Bypass) and follow First-Off / Last-On sequence during nightly strike.',
          diagramJump: {
            label: 'view crown xti 4002 stack',
            blueprintId: 'foh-rack-1',
            unitId: 'r1-crown-amps'
          }
        }
      },
      'cs-amp-fault': {
        id: 'cs-amp-fault',
        stageLabel: 'Fault Isolated · Interconnect / Breaker',
        question: 'Both X32 Main L/R meters and Crown Amps appear online, yet no sound exits speakers.',
        checks: [],
        resolution: {
          title: 'Check X32 XLR 15–16 Patch & Q-SYS Input Routing',
          summary:
            'Confirm rear X32 XLR Outs 15 & 16 are firmly latched, verify on [ROUTING > OUT 1–16] that Out 15/16 are patched to Main L / Main R, and check Q-SYS Core 110f fault LEDs.',
          diagramJump: {
            label: 'inspect q-sys & cp4n rack slot',
            blueprintId: 'foh-rack-1',
            unitId: 'r1-cp4n-qsys'
          }
        }
      }
    }
  },
  {
    id: 'single-mic-dead',
    title: 'Single Mic or Input Dead',
    subtitle: 'One cast bodypack, handheld, or stage mic is not heard',
    startNodeId: 'sm-1',
    nodes: {
      'sm-1': {
        id: 'sm-1',
        stageLabel: 'Step 1 · Shure BLX4R Receiver Front LCD',
        question: 'Check the channel’s Shure BLX4R receiver in FOH Rack 01. When the actor speaks, do both the RF and Audio signal bars respond?',
        checks: [
          'Locate the matching receiver number (Yellow Tags 1–25 or HH1/HH2).',
          'Check that Group/Channel letters match the transmitter pack.'
        ],
        yesOption: { label: 'Yes — Receiver Has RF & Audio', nextNodeId: 'sm-2' },
        noOption: { label: 'No — RF or Audio Bar Is Empty', nextNodeId: 'sm-rf-fault' }
      },
      'sm-2': {
        id: 'sm-2',
        stageLabel: 'Step 2 · X32 Channel Strip, Solo & Mutes',
        question: 'Select that channel on the X32 and solo it (PFL) into the Genelec monitors. Do you hear the mic clearly on the Genelecs?',
        checks: [
          'Press [SOLO] on the strip and listen on the flanking Genelec nearfields.',
          'Check channel gain, MUTE button, DCA fader level, and [MUTE GRP 1–6].',
          'Check [HOME > CONFIG] input source reads Local XLR matching that channel.'
        ],
        yesOption: { label: 'Hear It in Genelecs — Still Not in House', nextNodeId: 'sm-3' },
        noOption: { label: 'Silent Even in Solo / Fixed Here', nextNodeId: 'sm-patch-fault' }
      },
      'sm-3': {
        id: 'sm-3',
        stageLabel: 'Step 3 · Bus / DCA Assignment',
        question: 'Press [VIEW] under MAIN BUS while the channel is selected. Is "ST" (Main Stereo) lit and the channel’s DCA / TheatreMix fader raised?',
        checks: [
          'Verify the channel fader is up AND its assigned DCA (1–8) is raised.',
          'Check whether TheatreMix parked or muted the character in the current scene.',
          'Ensure no [MUTE GRP 1–6] is locking the channel.'
        ],
        yesOption: { label: 'ST Lit & DCA Up — Still Missing', nextNodeId: 'sm-patch-fault' },
        noOption: { label: 'Yes, Fixed — Was Unassigned / Parked', nextNodeId: 'sm-fixed' }
      },
      'sm-rf-fault': {
        id: 'sm-rf-fault',
        stageLabel: 'Fault Isolated · Stage Transmitter / Capsule',
        question: 'Signal is stopping before FOH Rack 01 receivers.',
        checks: [],
        resolution: {
          title: 'Radio Understage RF Tech for Pack / Element Swap',
          summary:
            'Mute the channel at FOH immediately. Have Understage RF check BLX1 battery LED (fresh AA from 70-cell charger), transmitter mute/power switch, Group/Channel frequency lock, and mini-XLR lavalier plug—or swap to a hot spare pack and test via PFL on Genelecs before unmuting.',
          diagramJump: {
            label: 'inspect blx4r wireless bank',
            blueprintId: 'foh-rack-1',
            unitId: 'r1-blx-upper'
          }
        }
      },
      'sm-patch-fault': {
        id: 'sm-patch-fault',
        stageLabel: 'Fault Isolated · XLR Snake or Soft-Patch',
        question: 'BLX4R shows audio, or X32 PFL shows zero signal.',
        checks: [],
        resolution: {
          title: 'Verify Rear XLR Snake & X32 [ROUTING > HOME] Source',
          summary:
            'Inspect the labeled XLR jumper from the back of the BLX4R receiver to the X32 rear local XLR input (or Stage Right S16 bottom 3U patches if wired). Confirm on [HOME > CONFIG] that the channel source is not patched to an unused AES50/Card input.',
          diagramJump: {
            label: 'view stagebox / xlr patches',
            blueprintId: 'stage-right-racks',
            unitId: 'sr-s16-stagebox'
          }
        }
      },
      'sm-fixed': {
        id: 'sm-fixed',
        stageLabel: 'Resolved · Channel Routing',
        question: 'Channel restored cleanly to house mix.',
        checks: [],
        resolution: {
          title: 'Channel Bus / DCA Assignment Restored',
          summary:
            'Clear PFL [SOLO] after confirming clean level (-18 dBFS to -12 dBFS vocal peaks) so the Genelec bus returns to normal.'
        }
      }
    }
  },
  {
    id: 'qlab-silent',
    title: 'Mac mini / QLab Playing, No Sound in House',
    subtitle: 'Playback cues fire on screen, but auditorium stays silent',
    startNodeId: 'ql-1',
    nodes: {
      'ql-1': {
        id: 'ql-1',
        stageLabel: 'Step 1 · Mac mini Audio Output & Cue Volume',
        question: 'On the Booth Mac mini, is System Output / QLab Patch pointing to X-USB (or Aux Interface), and is macOS volume up?',
        checks: [
          'Check QLab Settings -> Audio Output matches "X-USB" or wired interface.',
          'Verify the specific QLab cue level isn’t muted or trimmed to -INF.'
        ],
        yesOption: { label: 'Mac Audio Device Valid — Check X32', nextNodeId: 'ql-2' },
        noOption: { label: 'Yes, Fixed — Wrong Output Device', nextNodeId: 'ql-fixed' }
      },
      'ql-2': {
        id: 'ql-2',
        stageLabel: 'Step 2 · X32 Aux In / Card Input Bank',
        question: 'Flip the X32 left bank to [AUX IN / USB] (or check your QLab playback channels). Do the channel meters bounce when QLab plays?',
        checks: [
          'Press [AUX IN / USB] layer button on the left X32 fader bank.',
          'If using 32x32 X-USB card, verify [ROUTING > HOME] Aux/Card block maps Card 1–2.',
          'Check that the playback DCA (DCA 4 QLab) and stereo channels are unmuted.'
        ],
        yesOption: { label: 'Meters Bounce on X32 — Check Downstream', nextNodeId: 'ql-3' },
        noOption: { label: 'No Signal on X32 Aux/Card Strips', nextNodeId: 'ql-routing-fix' }
      },
      'ql-3': {
        id: 'ql-3',
        stageLabel: 'Step 3 · Gate Ducker & Main L/R Assignment',
        question: 'Check that the QLab strip has "ST" Main Bus lit, is not clamped by a Gate Ducker keyed to an open mic, and Q-SYS is in Show Mode.',
        checks: [
          'If Gate Ducker is active, ensure God Mic / Podium isn’t open and holding playback down -15 dB.',
          'Verify Main Stereo L/R fader is up and FOH Rack 01 Crestron is in FOH Console Mode.'
        ],
        yesOption: { label: 'Cleared Ducker / Bus — Fixed', nextNodeId: 'ql-fixed' },
        noOption: { label: 'Check Q-SYS & Amps Next', nextNodeId: 'ql-routing-fix' }
      },
      'ql-routing-fix': {
        id: 'ql-routing-fix',
        stageLabel: 'Fault Isolated · X-USB / Aux Patch',
        question: 'Playback audio is not traversing X32 input routing cleanly.',
        checks: [],
        resolution: {
          title: 'Re-Patch X-USB Card 1–2 or Analog Aux 1–2',
          summary:
            'Under X32 [SETUP > CARD], confirm X-USB is locked at 48 kHz and set to 32/32 or 16/16 mode. Under [ROUTING > HOME], set Aux In Remap to "Card 1–2" (or "Aux 1–2" if running analog TRS from the booth DI).',
          diagramJump: {
            label: 'inspect x32 aux & dca layout',
            blueprintId: 'foh-x32-console',
            unitId: 'x32-inputs'
          }
        }
      },
      'ql-fixed': {
        id: 'ql-fixed',
        stageLabel: 'Resolved · Playback Path',
        question: 'QLab audio restored through house PA.',
        checks: [],
        resolution: {
          title: 'Mac mini / QLab Playback Restored',
          summary:
            'Test one brief cue fade via the Genelec PFL solo bus before opening auditorium doors.'
        }
      }
    }
  },
  {
    id: 'hum-distortion',
    title: 'Hiss, Hum, or Distortion',
    subtitle: '60 Hz buzz, wireless static bursts, or harsh digital clipping',
    startNodeId: 'hd-1',
    nodes: {
      'hd-1': {
        id: 'hd-1',
        stageLabel: 'Step 1 · Identify Noise Signature',
        question: 'Is the problem a steady 60 Hz electrical hum/buzz (often from a laptop or DI), OR digital clipping/RF static?',
        checks: [
          'Listen closely: steady low 60 Hz buzz points to ground loop; crackle/clipping points to preamp gain or RF squelch.'
        ],
        yesOption: { label: 'Steady 60 Hz Electrical Hum / Buzz', nextNodeId: 'hd-hum' },
        noOption: { label: 'Clipping, Harsh Distortion, or RF Hiss', nextNodeId: 'hd-clip' }
      },
      'hd-hum': {
        id: 'hd-hum',
        stageLabel: 'Fault Isolated · Ground Loop',
        question: 'Engaging Ground Lift isolates unbalanced AC ground differentials.',
        checks: [],
        resolution: {
          title: 'Engage Ground Lift & Check -15dB Pad on Radial ProAV1 DI',
          summary:
            'If running a playback laptop or keyboard into the house or Black Box rig, press the GROUND LIFT switch on the Radial ProAV1 DI box and ensure +48V phantom power is OFF on any unbalanced adapter lines. Unplugging the laptop AC brick briefly confirms an AC ground loop.',
          diagramJump: {
            label: 'view radial proav1 di controls',
            blueprintId: 'black-box-si',
            unitId: 'si-radial-proav1'
          }
        }
      },
      'hd-clip': {
        id: 'hd-clip',
        stageLabel: 'Fault Isolated · Gain Staging or RF Squelch',
        question: 'Check red CLIP LEDs on BLX4R receivers, X32 preamps, and Crown/iNUKE amps.',
        checks: [],
        resolution: {
          title: 'Trim Input Preamp (-18 to -12 dBFS) or Swap RF Battery/Freq',
          summary:
            '1) If the X32 red CLIP LED flashes during singing, reduce HA Preamp Gain until average peaks hover at -18 dBFS to -12 dBFS. 2) If static bursts appear on a Shure BLX4R with weak RF bars, replace the BLX1 AA batteries immediately or scan a clean group/channel away from DTV splatter.',
          diagramJump: {
            label: 'inspect x32 preamp & gain strip',
            blueprintId: 'foh-x32-console',
            unitId: 'x32-strip'
          }
        }
      }
    }
  },
  {
    id: 'black-box-silent',
    title: 'Black Box Monitors Silent',
    subtitle: 'Under-seating / under-riser Black Box speakers have no output',
    startNodeId: 'bb-1',
    nodes: {
      'bb-1': {
        id: 'bb-1',
        stageLabel: 'Step 1 · Soundcraft Si Expression 3 Surface',
        question: 'On the Soundcraft Si Expression 3, are channel ON buttons lit, Master L/R fader up, and meters moving?',
        checks: [
          'Verify channel [ON] switches glow above the faders (Ch 14–15 for laptop aux).',
          'Check Master L/R fader at far right and press [CLR] to clear lingering solos.'
        ],
        yesOption: { label: 'Si Console Active — Speakers Still Silent', nextNodeId: 'bb-2' },
        noOption: { label: 'Yes, Fixed — Channel ON / Master Was Down', nextNodeId: 'bb-fixed' }
      },
      'bb-2': {
        id: 'bb-2',
        stageLabel: 'Step 2 · Radial ProAV1 & Rear XLR Outputs',
        question: 'Check the green Radial ProAV1 DI pad/level AND the rear XLR line outputs (15–16) feeding Stage Right / Under-Riser amps.',
        checks: [
          'Verify the Radial ProAV1 -15dB Pad isn’t starving a weak headphone jack.',
          'Verify rear Si Expression XLR Outputs 15–16 are firmly seated toward Stage Right.'
        ],
        yesOption: { label: 'Cables OK — Check Stage Right Amps', nextNodeId: 'bb-3' },
        noOption: { label: 'Yes, Fixed — DI / Patch Corrected', nextNodeId: 'bb-fixed' }
      },
      'bb-3': {
        id: 'bb-3',
        stageLabel: 'Step 3 · Stage Right iNUKE / XLS1000 & Daisy Chain',
        question: 'Inspect the lower half of the Stage Right Unified Rack (U4–U11) and the under-seating speaker chain.',
        checks: [
          'Confirm Crown XLS1000 and Behringer iNUKE NU1000 amplifiers are powered ON with gain knobs raised.',
          'Walk the under-riser perimeter to ensure the first Speakon/XLR jumper in the daisy chain hasn’t been kicked loose.'
        ],
        yesOption: { label: 'Amps Lit — Trace Under-Riser Chain', nextNodeId: 'bb-daisy-fault' },
        noOption: { label: 'Yes, Fixed — Amp / Daisy Link Was Off', nextNodeId: 'bb-fixed' }
      },
      'bb-daisy-fault': {
        id: 'bb-daisy-fault',
        stageLabel: 'Fault Isolated · Riser Jumper / S16 Route',
        question: 'Stage Right amps are online but under-riser speakers remain quiet.',
        checks: [],
        resolution: {
          title: 'Inspect First Under-Seating Speaker & S16 Monitor Bus Patch',
          summary:
            'If one riser speaker fails, every speaker downstream in a passive daisy chain drops out. Re-seat the Speakon/XLR jumper at the first silent riser cabinet and verify Crown XLS1000 / iNUKE output patches in Stage Right Rack U1–U11.',
          diagramJump: {
            label: 'open stage right amplifier bay',
            blueprintId: 'stage-right-racks',
            unitId: 'sr-inuke-trio'
          }
        }
      },
      'bb-fixed': {
        id: 'bb-fixed',
        stageLabel: 'Resolved · Black Box Audio',
        question: 'Under-seating speaker array restored.',
        checks: [],
        resolution: {
          title: 'Black Box Signal Path Operational',
          summary:
            'Walk the audience seating perimeter with gentle test playback or pink noise to verify uniform coverage.'
        }
      }
    }
  }
];

interface TriageWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToDiagram: (blueprintId: string, unitId: string) => void;
}

export const TriageWizardModal: React.FC<TriageWizardModalProps> = ({
  isOpen,
  onClose,
  onJumpToDiagram
}) => {
  const [selectedFlowId, setSelectedFlowId] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const activeFlow = SYMPTOM_FLOWS.find((f) => f.id === selectedFlowId) ?? null;
  const currentNodeId =
    activeFlow && history.length > 0
      ? history[history.length - 1]
      : activeFlow?.startNodeId ?? '';
  const currentNode = activeFlow ? activeFlow.nodes[currentNodeId] : undefined;

  const startFlow = (flowId: string) => {
    const flow = SYMPTOM_FLOWS.find((f) => f.id === flowId);
    if (!flow) return;
    setSelectedFlowId(flowId);
    setHistory([flow.startNodeId]);
  };

  const advance = (nextNodeId: string) => {
    setHistory((prev) => [...prev, nextNodeId]);
  };

  const stepBack = () => {
    if (history.length <= 1) {
      setSelectedFlowId(null);
      setHistory([]);
    } else {
      setHistory((prev) => prev.slice(0, -1));
    }
  };

  const resetAll = () => {
    setSelectedFlowId(null);
    setHistory([]);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="No Sound / Signal Triage Wizard"
    >
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col border border-zinc-700 bg-[#121212]">
        {/* Top Modal Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <Wrench className="h-4 w-4 text-[#9d7cd8]" />
            <div>
              <h2 className="font-mono text-sm font-semibold text-zinc-100">
                no sound / signal triage
              </h2>
              <p className="font-mono text-[11px] text-zinc-500">
                fast booth fault isolation · meters to amps
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {activeFlow && (
              <button
                type="button"
                onClick={resetAll}
                className="inline-flex items-center gap-1 border border-zinc-800 bg-[#0a0a0a] px-2.5 py-1 font-mono text-[11px] text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-100"
              >
                <RotateCcw className="h-3 w-3" />
                symptoms
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close triage wizard"
              className="border border-zinc-800 bg-[#0a0a0a] p-1.5 text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-5 sm:p-6">
          {!activeFlow || !currentNode ? (
            <div className="space-y-4">
              <div className="font-mono text-xs uppercase tracking-wider text-zinc-500">
                select starting symptom
              </div>
              <div className="grid gap-2.5">
                {SYMPTOM_FLOWS.map((flow) => (
                  <button
                    key={flow.id}
                    type="button"
                    onClick={() => startFlow(flow.id)}
                    className="group flex flex-col border border-zinc-800 bg-[#0a0a0a] p-4 text-left transition-colors hover:border-[#9d7cd8] hover:bg-[#16141d]"
                  >
                    <span className="font-mono text-sm font-semibold text-zinc-100 transition-colors group-hover:text-[#9d7cd8]">
                      {flow.title}
                    </span>
                    <span className="mt-1 text-xs text-zinc-400">
                      <GlossaryText text={flow.subtitle} />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Breadcrumb */}
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <button
                  type="button"
                  onClick={stepBack}
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400 transition-colors hover:text-[#9d7cd8]"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  {history.length <= 1 ? 'back to symptoms' : 'previous step'}
                </button>
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#9d7cd8]">
                  {currentNode.stageLabel}
                </span>
              </div>

              {currentNode.resolution ? (
                <div className="space-y-4 border border-[#9d7cd8]/50 bg-[#9d7cd8]/10 p-5">
                  <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#9d7cd8]">
                    <CheckCircle2 className="h-4 w-4" />
                    {currentNode.resolution.title}
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-100">
                    <GlossaryText text={currentNode.resolution.summary} />
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {currentNode.resolution.diagramJump && (
                      <button
                        type="button"
                        onClick={() => {
                          const jump = currentNode.resolution?.diagramJump;
                          if (!jump) return;
                          onJumpToDiagram(jump.blueprintId, jump.unitId);
                          onClose();
                        }}
                        className="inline-flex items-center gap-1.5 border border-[#9d7cd8] bg-[#9d7cd8]/20 px-3 py-2 font-mono text-xs font-medium text-[#9d7cd8] transition-colors hover:bg-[#9d7cd8]/30"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        {currentNode.resolution.diagramJump.label}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={resetAll}
                      className="border border-zinc-700 bg-[#0a0a0a] px-3 py-2 font-mono text-xs text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100"
                    >
                      diagnose another issue
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="font-mono text-base font-semibold leading-snug text-zinc-100">
                    <GlossaryText text={currentNode.question} />
                  </h3>

                  {currentNode.checks.length > 0 && (
                    <div className="space-y-2 border border-zinc-800 bg-[#0a0a0a] p-4">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                        what to check right now
                      </div>
                      <ul className="space-y-2 text-xs leading-relaxed text-zinc-300">
                        {currentNode.checks.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="font-mono text-[#9d7cd8]">›</span>
                            <GlossaryText text={item} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="grid gap-2.5 pt-2 sm:grid-cols-2">
                    {currentNode.yesOption && (
                      <button
                        type="button"
                        onClick={() => advance(currentNode.yesOption!.nextNodeId)}
                        className="border border-[#9d7cd8] bg-[#9d7cd8]/15 px-4 py-3 font-mono text-xs font-medium text-[#9d7cd8] transition-colors hover:bg-[#9d7cd8]/25"
                      >
                        {currentNode.yesOption.label}
                      </button>
                    )}
                    {currentNode.noOption && (
                      <button
                        type="button"
                        onClick={() => advance(currentNode.noOption!.nextNodeId)}
                        className="border border-zinc-700 bg-[#0a0a0a] px-4 py-3 font-mono text-xs font-medium text-zinc-200 transition-colors hover:border-zinc-500 hover:bg-zinc-900"
                      >
                        {currentNode.noOption.label}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
