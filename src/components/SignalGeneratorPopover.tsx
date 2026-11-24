import React from 'react';
import { Volume2, VolumeX, X } from 'lucide-react';
import {
  GeneratorPan,
  GeneratorWaveform,
  SignalGeneratorState
} from '../utils/useSignalGenerator';

interface SignalGeneratorPopoverProps {
  generator: SignalGeneratorState;
  onClose: () => void;
}

const WAVEFORMS: Array<{ id: GeneratorWaveform; label: string; detail: string }> = [
  { id: 'pink', label: 'pink noise', detail: 'room zones & amps' },
  { id: 'sine-1k', label: '1kHz sine', detail: 'line checks' }
];

const PANS: Array<{ id: GeneratorPan; label: string }> = [
  { id: 'left', label: 'left' },
  { id: 'center', label: 'center stereo' },
  { id: 'right', label: 'right' }
];

export const SignalGeneratorPopover: React.FC<SignalGeneratorPopoverProps> = ({
  generator,
  onClose
}) => {
  return (
    <div
      role="dialog"
      aria-label="Booth Signal Generator"
      className="fixed right-4 top-16 z-50 w-[330px] border border-zinc-700 bg-[#121212] p-4 shadow-2xl sm:right-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
        <div>
          <div className="font-mono text-xs font-semibold text-zinc-100">
            booth signal generator
          </div>
          <div className="font-mono text-[10px] text-zinc-500">
            web audio api · 100% offline
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close signal generator"
          className="border border-zinc-800 bg-[#0a0a0a] p-1 text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-100"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Waveform Selector */}
      <div className="mt-3.5 space-y-1.5">
        <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
          test signal
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {WAVEFORMS.map((wf) => {
            const active = generator.waveform === wf.id;
            return (
              <button
                key={wf.id}
                type="button"
                onClick={() => generator.setWaveform(wf.id)}
                className={`border p-2 text-left font-mono transition-colors ${
                  active
                    ? 'border-[#9d7cd8] bg-[#9d7cd8]/15 text-[#9d7cd8]'
                    : 'border-zinc-800 bg-[#0a0a0a] text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                <div className="text-xs font-semibold">{wf.label}</div>
                <div className="mt-0.5 text-[10px] text-zinc-500">{wf.detail}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Channel Panning */}
      <div className="mt-3.5 space-y-1.5">
        <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
          output routing / pan
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {PANS.map((p) => {
            const active = generator.pan === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => generator.setPan(p.id)}
                className={`border px-2 py-1.5 font-mono text-[11px] transition-colors ${
                  active
                    ? 'border-[#9d7cd8] bg-[#9d7cd8]/15 text-[#9d7cd8]'
                    : 'border-zinc-800 bg-[#0a0a0a] text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Safe Output Gain Slider */}
      <div className="mt-4 space-y-2 border border-zinc-800 bg-[#0a0a0a] p-3">
        <div className="flex items-center justify-between font-mono text-xs">
          <span className="text-zinc-400">output level</span>
          <span className="font-semibold text-[#9d7cd8] tabular-nums">
            {generator.gainDb} dB
          </span>
        </div>
        <input
          type="range"
          min={-48}
          max={-6}
          step={1}
          aria-label="Signal generator output gain in dB"
          value={generator.gainDb}
          onChange={(e) => generator.setGainDb(Number(e.target.value))}
          className="h-1.5 w-full cursor-pointer accent-[#9d7cd8]"
        />
        <div className="flex justify-between font-mono text-[10px] text-zinc-500 tabular-nums">
          <span>-48 dB (safe)</span>
          <span>-30 dB default</span>
          <span>-6 dB max</span>
        </div>
      </div>

      {/* Start / Prominent Master Mute & Stop Controls */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={generator.start}
          disabled={generator.isPlaying}
          className={`inline-flex items-center justify-center gap-1.5 border px-3 py-2 font-mono text-xs font-medium transition-colors ${
            generator.isPlaying
              ? 'border-[#9d7cd8] bg-[#9d7cd8]/20 text-[#9d7cd8]'
              : 'border-[#9d7cd8]/70 bg-[#9d7cd8]/15 text-[#9d7cd8] hover:bg-[#9d7cd8]/25'
          }`}
        >
          <Volume2 className="h-3.5 w-3.5" />
          {generator.isPlaying ? 'active' : 'send tone'}
        </button>

        <button
          type="button"
          onClick={generator.stop}
          className={`inline-flex items-center justify-center gap-1.5 border px-3 py-2 font-mono text-xs font-semibold transition-colors ${
            generator.isPlaying
              ? 'border-zinc-200 bg-zinc-100 text-[#0a0a0a] hover:bg-white'
              : 'border-zinc-800 bg-[#0a0a0a] text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
          }`}
        >
          <VolumeX className="h-3.5 w-3.5" />
          master mute
        </button>
      </div>
    </div>
  );
};
