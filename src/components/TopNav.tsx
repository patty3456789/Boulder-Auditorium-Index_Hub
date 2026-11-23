import React from 'react';
import { SHOW_CONFIGS } from '../data/showConfigs';
import { ShowKey, ViewId } from '../types';

interface TopNavProps {
  activeView: ViewId;
  activeShow: ShowKey;
  onSelectView: (view: ViewId) => void;
  onSelectShow: (show: ShowKey) => void;
}

const NAV_ITEMS: Array<{ id: ViewId; label: string }> = [
  { id: 'diagrams', label: 'diagrams' },
  { id: 'runbooks', label: 'runbooks' },
  { id: 'database', label: 'asset db' },
  { id: 'wiki', label: 'x32 manual & wiki' }
];

export const TopNav: React.FC<TopNavProps> = ({
  activeView,
  activeShow,
  onSelectView,
  onSelectShow
}) => {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-[#0a0a0a]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Left Zone: Brand Wordmark */}
        <button
          type="button"
          onClick={() => onSelectView('landing')}
          className="group flex items-center gap-3 text-left transition-colors focus:outline-none"
        >
          <span className="flex h-7 w-7 items-center justify-center border border-[#9d7cd8]/40 bg-[#9d7cd8]/10 font-mono text-xs font-semibold text-[#9d7cd8] transition-colors group-hover:border-[#9d7cd8] group-hover:bg-[#9d7cd8]/20">
            BA
          </span>
          <div className="flex flex-col">
            <span className="font-mono text-sm font-semibold tracking-tight text-zinc-100 transition-colors group-hover:text-[#9d7cd8]">
              boulder auditorium
            </span>
            <span className="font-mono text-[11px] text-zinc-500">
              audio operations console
            </span>
          </div>
        </button>

        {/* Center Zone: Clean Lowercase Monospace Navigation */}
        <nav
          aria-label="Primary sections"
          className="flex flex-wrap items-center gap-1 sm:gap-2"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectView(item.id)}
                className={`border px-3 py-1.5 font-mono text-xs transition-colors ${
                  isActive
                    ? 'border-[#9d7cd8] bg-[#9d7cd8]/15 text-[#9d7cd8]'
                    : 'border-transparent text-zinc-400 hover:border-zinc-800 hover:bg-zinc-900 hover:text-zinc-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Zone: Active Show Profile Switcher */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="top-show-switcher"
            className="hidden font-mono text-[11px] uppercase tracking-wider text-zinc-500 md:inline"
          >
            profile
          </label>
          <select
            id="top-show-switcher"
            value={activeShow}
            onChange={(e) => onSelectShow(e.target.value as ShowKey)}
            className="border border-zinc-800 bg-[#121212] px-2.5 py-1.5 font-mono text-xs text-zinc-200 transition-colors hover:border-zinc-700 focus:border-[#9d7cd8] focus:outline-none"
          >
            {Object.values(SHOW_CONFIGS).map((show) => (
              <option key={show.key} value={show.key}>
                {show.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};
