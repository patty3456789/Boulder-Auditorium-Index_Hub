import { useCallback, useEffect, useRef, useState } from 'react';

export type GeneratorWaveform = 'pink' | 'sine-1k';
export type GeneratorPan = 'left' | 'center' | 'right';

export interface SignalGeneratorState {
  isPlaying: boolean;
  waveform: GeneratorWaveform;
  pan: GeneratorPan;
  /** Gain in dBFS, clamped -48 dB to -6 dB, defaulting to safe -30 dB */
  gainDb: number;
  start: () => void;
  stop: () => void;
  togglePlay: () => void;
  setWaveform: (w: GeneratorWaveform) => void;
  setPan: (p: GeneratorPan) => void;
  setGainDb: (db: number) => void;
}

function dbToLinear(db: number): number {
  if (db <= -60) return 0;
  return Math.pow(10, db / 20);
}

function panToValue(pan: GeneratorPan): number {
  if (pan === 'left') return -1;
  if (pan === 'right') return 1;
  return 0;
}

/**
 * Generates a 4-second seamless pink noise buffer using Paul Kellet's refined 7-stage filter.
 */
function createPinkNoiseBuffer(ctx: AudioContext): AudioBuffer {
  const sampleRate = ctx.sampleRate;
  const length = sampleRate * 4;
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);

  let b0 = 0;
  let b1 = 0;
  let b2 = 0;
  let b3 = 0;
  let b4 = 0;
  let b5 = 0;
  let b6 = 0;

  for (let i = 0; i < length; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    b3 = 0.86650 * b3 + white * 0.3104856;
    b4 = 0.55000 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.0168980;
    const pink = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
    b6 = white * 0.115926;
    data[i] = Math.max(-0.98, Math.min(0.98, pink));
  }

  return buffer;
}

export function useSignalGenerator(): SignalGeneratorState {
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveform, setWaveformState] = useState<GeneratorWaveform>('pink');
  const [pan, setPanState] = useState<GeneratorPan>('center');
  const [gainDb, setGainDbState] = useState<number>(-30); // Safe low default

  const ctxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const panNodeRef = useRef<StereoPannerNode | null>(null);
  const activeSourceRef = useRef<AudioNode | null>(null);
  const pinkBufferRef = useRef<AudioBuffer | null>(null);

  const cleanupSource = useCallback(() => {
    const src = activeSourceRef.current;
    if (src) {
      try {
        if ('stop' in src && typeof (src as OscillatorNode).stop === 'function') {
          (src as OscillatorNode).stop();
        }
        src.disconnect();
      } catch {
        // Already stopped
      }
      activeSourceRef.current = null;
    }
  }, []);

  const ensureContext = useCallback((): AudioContext | null => {
    if (typeof window === 'undefined') return null;
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return null;

    if (!ctxRef.current) {
      const ctx = new AudioCtx();
      const gain = ctx.createGain();
      const panner = ctx.createStereoPanner();
      gain.gain.setValueAtTime(0, ctx.currentTime);
      panner.pan.setValueAtTime(panToValue(pan), ctx.currentTime);
      panner.connect(gain);
      gain.connect(ctx.destination);

      ctxRef.current = ctx;
      gainNodeRef.current = gain;
      panNodeRef.current = panner;
    }

    if (ctxRef.current.state === 'suspended') {
      void ctxRef.current.resume();
    }
    return ctxRef.current;
  }, [pan]);

  const mountSource = useCallback(
    (targetWave: GeneratorWaveform) => {
      const ctx = ensureContext();
      const panner = panNodeRef.current;
      const gain = gainNodeRef.current;
      if (!ctx || !panner || !gain) return;

      cleanupSource();

      if (targetWave === 'sine-1k') {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1000, ctx.currentTime);
        osc.connect(panner);
        osc.start();
        activeSourceRef.current = osc;
      } else {
        if (!pinkBufferRef.current) {
          pinkBufferRef.current = createPinkNoiseBuffer(ctx);
        }
        const bufSrc = ctx.createBufferSource();
        bufSrc.buffer = pinkBufferRef.current;
        bufSrc.loop = true;
        bufSrc.connect(panner);
        bufSrc.start();
        activeSourceRef.current = bufSrc;
      }

      gain.gain.setTargetAtTime(dbToLinear(gainDb), ctx.currentTime, 0.02);
    },
    [cleanupSource, ensureContext, gainDb]
  );

  const start = useCallback(() => {
    mountSource(waveform);
    setIsPlaying(true);
  }, [mountSource, waveform]);

  const stop = useCallback(() => {
    const ctx = ctxRef.current;
    const gain = gainNodeRef.current;
    if (ctx && gain) {
      gain.gain.setTargetAtTime(0, ctx.currentTime, 0.015);
      window.setTimeout(() => {
        cleanupSource();
      }, 65);
    } else {
      cleanupSource();
    }
    setIsPlaying(false);
  }, [cleanupSource]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      stop();
    } else {
      start();
    }
  }, [isPlaying, start, stop]);

  const setWaveform = useCallback(
    (nextWave: GeneratorWaveform) => {
      setWaveformState(nextWave);
      if (isPlaying) {
        mountSource(nextWave);
      }
    },
    [isPlaying, mountSource]
  );

  const setPan = useCallback((nextPan: GeneratorPan) => {
    setPanState(nextPan);
    const ctx = ctxRef.current;
    const panner = panNodeRef.current;
    if (ctx && panner) {
      panner.pan.setTargetAtTime(panToValue(nextPan), ctx.currentTime, 0.02);
    }
  }, []);

  const setGainDb = useCallback(
    (nextDb: number) => {
      const clamped = Math.max(-48, Math.min(-6, nextDb));
      setGainDbState(clamped);
      const ctx = ctxRef.current;
      const gain = gainNodeRef.current;
      if (ctx && gain && isPlaying) {
        gain.gain.setTargetAtTime(dbToLinear(clamped), ctx.currentTime, 0.02);
      }
    },
    [isPlaying]
  );

  useEffect(() => {
    return () => {
      cleanupSource();
      if (ctxRef.current) {
        void ctxRef.current.close().catch(() => undefined);
      }
    };
  }, [cleanupSource]);

  return {
    isPlaying,
    waveform,
    pan,
    gainDb,
    start,
    stop,
    togglePlay,
    setWaveform,
    setPan,
    setGainDb
  };
}
