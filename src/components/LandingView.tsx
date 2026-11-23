import React, { useEffect, useState } from 'react';
import { ArrowUpRight, BookOpen, Cpu, Database, ListChecks } from 'lucide-react';
import { SHOW_CONFIGS } from '../data/showConfigs';
import { ShowKey, ViewId } from '../types';

interface LandingViewProps {
  activeShow: ShowKey;
  onNavigate: (view: ViewId) => void;
  onSelectShow: (show: ShowKey) => void;
  completedStepCount: number;
  totalStepCount: number;
}

function formatBoothClock(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
}

const HUB_TILES: Array<{
  id: ViewId;
  label: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  {
    id: 'diagrams',
    label: 'diagrams',
    subtitle: 'Photo-traced CAD rack elevations, X32 desk layout & interactive elbow callouts',
    icon: Cpu
  },
  {
    id: 'runbooks',
    label: 'runbooks',
    subtitle: 'Pre-show checks, 4:45 PM understage RF call & persistent booth checklists',
    icon: ListChecks
  },
  {
    id: 'database',
    label: 'asset db',
    subtitle: 'Full FOH, Stage Right, Atmos & Black Box equipment patch inventory',
    icon: Database
  },
  {
    id: 'wiki',
    label: 'x32 manual & wiki',
    subtitle: '14-chapter technical reference, embedded X32 manual PDF & crew field notes',
    icon: BookOpen
  }
];

export const LandingView: React.FC<LandingViewProps> = ({
  activeShow,
  onNavigate,
  onSelectShow,
  completedStepCount,
  totalStepCount
}) => {
  const [now, setNow] = useState<Date>(() => new Date());
  const [heroImgFailed, setHeroImgFailed] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const currentShow = SHOW_CONFIGS[activeShow];

  return (
    <div className="mx-auto flex min-h-[calc(100vh-58px)] max-w-[1200px] flex-col justify-between px-4 py-8 sm:px-6 sm:py-12">
      <div className="space-y-8">
        {/* Hero Header + Live Booth Clock */}
        <section className="grid gap-6 border border-zinc-800 bg-[#121212] p-6 sm:p-8 lg:grid-cols-[1.25fr_0.95fr] lg:items-center">
          <div className="space-y-5">
            <div className="space-y-2">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#9d7cd8]">
                foh booth & stage operations
              </p>
              <h1 className="font-mono text-2xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">
                boulder auditorium audio
              </h1>
              {/* Live Ticking Digital Clock */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1">
                <time
                  dateTime={now.toISOString()}
                  className="font-mono text-xl font-medium tracking-wider text-[#9d7cd8] tabular-nums sm:text-2xl"
                >
                  {formatBoothClock(now)}
                </time>
                <span className="font-mono text-xs text-zinc-500">
                  980-seat house · foh balcony overhang · 27-ch uhf rf
                </span>
              </div>
            </div>

            <p className="max-w-xl text-sm leading-relaxed text-zinc-400">
              Centralized technical hub for the Behringer X32 console, TheatreMix DCA mapping,
              27-channel Shure BLX4R wireless rack, Q-SYS Core 110f DSP, Stage Right Clear-Com,
              Black Box Soundcraft Si Expression 3, and the Sundance 45-channel Dolby Atmos rack.
            </p>

            {/* Active Production Profile Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border border-zinc-800/90 bg-[#0a0a0a] px-4 py-3">
              <div className="space-y-0.5">
                <div className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                  active production profile
                </div>
                <div className="font-mono text-sm font-medium text-zinc-100">
                  {currentShow.name}
                </div>
                <div className="font-mono text-xs text-zinc-500 tabular-nums">
                  {completedStepCount} of {totalStepCount} runbook steps verified
                </div>
              </div>
              <div className="flex items-center gap-2">
                <select
                  aria-label="Select active show profile"
                  value={activeShow}
                  onChange={(e) => onSelectShow(e.target.value as ShowKey)}
                  className="border border-zinc-800 bg-[#141414] px-2.5 py-1.5 font-mono text-xs text-zinc-200 focus:border-[#9d7cd8] focus:outline-none"
                >
                  {Object.values(SHOW_CONFIGS).map((show) => (
                    <option key={show.key} value={show.key}>
                      {show.name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => onNavigate('runbooks')}
                  className="border border-[#9d7cd8]/60 bg-[#9d7cd8]/15 px-3 py-1.5 font-mono text-xs text-[#9d7cd8] transition-colors hover:bg-[#9d7cd8]/25"
                >
                  open checklist
                </button>
              </div>
            </div>
          </div>

          {/* Auditorium Reference Viewport */}
          <div className="relative overflow-hidden border border-zinc-800 bg-[#0a0a0a]">
            {!heroImgFailed ? (
              <div className="relative aspect-[16/10] w-full">
                <img
                  src="./assets/aistudio/IMG_6047_3bee86d5.jpg"
                  alt="Boulder High School 980-seat auditorium house view from balcony FOH booth"
                  referrerPolicy="no-referrer"
                  onError={() => setHeroImgFailed(true)}
                  className="h-full w-full object-cover opacity-80 brightness-90 contrast-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/30" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[11px] text-zinc-300">
                  <span>house view · foh balcony sightline</span>
                  <span className="text-[#9d7cd8]">l/c/r + balcony delays</span>
                </div>
              </div>
            ) : (
              <div className="flex aspect-[16/10] flex-col items-center justify-center gap-2 p-6 text-center font-mono text-xs text-zinc-500">
                <span>boulder auditorium · 980-seat house</span>
                <span className="text-zinc-600">foh booth elevation offline preview</span>
              </div>
            )}
          </div>
        </section>

        {/* 4 Clean Navigation Launch Tiles */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HUB_TILES.map((tile) => {
            const Icon = tile.icon;
            return (
              <button
                key={tile.id}
                type="button"
                onClick={() => onNavigate(tile.id)}
                className="group flex flex-col justify-between border border-zinc-800 bg-[#121212] p-5 text-left transition-colors hover:border-[#9d7cd8]/80 hover:bg-[#16161a] focus:outline-none"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Icon className="h-5 w-5 text-[#9d7cd8]" />
                    <ArrowUpRight className="h-4 w-4 text-zinc-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#9d7cd8]" />
                  </div>
                  <h2 className="font-mono text-base font-semibold text-zinc-100 transition-colors group-hover:text-[#9d7cd8]">
                    {tile.label}
                  </h2>
                  <p className="text-xs leading-relaxed text-zinc-400">
                    {tile.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </section>
      </div>

      {/* Footer Attribution */}
      <footer className="mt-10 flex flex-wrap items-center justify-between gap-2 border-t border-zinc-900 pt-5 font-mono text-xs text-zinc-500">
        <span>boulder high school auditorium · standalone offline bundle</span>
        <span>developed by tiarnan stokes 2026</span>
      </footer>
    </div>
  );
};
