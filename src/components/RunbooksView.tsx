import React from 'react';
import { CheckSquare, RotateCcw, Square, Users } from 'lucide-react';
import { SHOW_CONFIGS } from '../data/showConfigs';
import { ShowKey } from '../types';

interface RunbooksViewProps {
  activeShow: ShowKey;
  checkedSteps: Record<string, boolean>;
  onSelectShow: (show: ShowKey) => void;
  onToggleStep: (stepKey: string) => void;
  onResetShowChecks: (showKey: ShowKey) => void;
}

export const RunbooksView: React.FC<RunbooksViewProps> = ({
  activeShow,
  checkedSteps,
  onSelectShow,
  onToggleStep,
  onResetShowChecks
}) => {
  const show = SHOW_CONFIGS[activeShow];

  const totalSteps = show.phases.reduce((sum, phase) => sum + phase.steps.length, 0);
  const completedSteps = show.phases.reduce((sum, phase, phaseIdx) => {
    return (
      sum +
      phase.steps.filter((_, stepIdx) => checkedSteps[`${show.key}:${phaseIdx}:${stepIdx}`]).length
    );
  }, 0);
  const pct = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  return (
    <div className="mx-auto max-w-[1440px] space-y-6 px-4 py-6 sm:px-6">
      {/* Show Profile Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border border-zinc-800 bg-[#121212] p-5">
        <div>
          <h1 className="font-mono text-xl font-semibold text-zinc-100">
            runbooks
          </h1>
          <p className="mt-1 font-mono text-xs text-zinc-400">
            {show.timeline}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {Object.values(SHOW_CONFIGS).map((item) => {
            const isActive = item.key === activeShow;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => onSelectShow(item.key)}
                className={`border px-3 py-1.5 font-mono text-xs transition-colors ${
                  isActive
                    ? 'border-[#9d7cd8] bg-[#9d7cd8]/15 text-[#9d7cd8]'
                    : 'border-zinc-800 bg-[#0a0a0a] text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Show Overview & Readiness Meter */}
      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-4 border border-zinc-800 bg-[#121212] p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-xs font-semibold text-[#9d7cd8]">
              {show.tag}
            </span>
            <button
              type="button"
              onClick={() => onResetShowChecks(show.key)}
              className="inline-flex items-center gap-1.5 border border-zinc-800 bg-[#0a0a0a] px-2.5 py-1 font-mono text-[11px] text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-100"
            >
              <RotateCcw className="h-3 w-3" />
              reset checklist
            </button>
          </div>
          <p className="text-sm leading-relaxed text-zinc-300">{show.description}</p>

          <div className="grid gap-3 pt-1 sm:grid-cols-2">
            <div className="border border-zinc-800 bg-[#0a0a0a] p-3 font-mono text-xs">
              <div className="text-[11px] uppercase tracking-wider text-zinc-500">
                primary console
              </div>
              <div className="mt-1 text-zinc-200">{show.overrides.console}</div>
            </div>
            <div className="border border-zinc-800 bg-[#0a0a0a] p-3 font-mono text-xs">
              <div className="text-[11px] uppercase tracking-wider text-zinc-500">
                control mode
              </div>
              <div className="mt-1 text-zinc-200">{show.overrides.controlMode}</div>
            </div>
            <div className="border border-zinc-800 bg-[#0a0a0a] p-3 font-mono text-xs sm:col-span-2">
              <div className="text-[11px] uppercase tracking-wider text-zinc-500">
                input & output zone patch
              </div>
              <div className="mt-1 text-zinc-200">{show.overrides.primaryInput}</div>
              <div className="mt-1 text-[#38bdf8]">
                {show.overrides.outputZones.join(' · ')}
              </div>
            </div>
          </div>
        </div>

        {/* Crew Division & Readiness Bar */}
        <div className="flex flex-col justify-between space-y-4 border border-zinc-800 bg-[#121212] p-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="uppercase tracking-wider text-zinc-500">
                checklist readiness
              </span>
              <span className="font-semibold text-[#9d7cd8] tabular-nums">
                {completedSteps} / {totalSteps} ({pct}%)
              </span>
            </div>
            <div className="h-2 w-full bg-[#0a0a0a] border border-zinc-800">
              <div
                className="h-full bg-[#9d7cd8] transition-all duration-200"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          <div className="space-y-2.5 border-t border-zinc-800 pt-4">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-zinc-200">
              <Users className="h-3.5 w-3.5 text-[#9d7cd8]" />
              crew division
            </div>
            <div className="space-y-2">
              {show.crewSplit.map((member) => (
                <div
                  key={member.role}
                  className="border border-zinc-800 bg-[#0a0a0a] p-2.5"
                >
                  <div className="font-mono text-xs font-semibold text-[#9d7cd8]">
                    {member.role}
                  </div>
                  <p className="mt-0.5 text-xs leading-relaxed text-zinc-400">
                    {member.task}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Phase Checklists (Clean labels, no // prefixes) */}
      <div className="grid gap-4 md:grid-cols-2">
        {show.phases.map((phase, phaseIdx) => {
          const phaseDone = phase.steps.filter(
            (_, stepIdx) => checkedSteps[`${show.key}:${phaseIdx}:${stepIdx}`]
          ).length;

          return (
            <section
              key={phase.title}
              className="flex flex-col border border-zinc-800 bg-[#121212] p-5"
            >
              <div className="mb-3 flex items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                <h2 className="font-mono text-sm font-semibold text-zinc-100">
                  {phase.title}
                </h2>
                <span className="font-mono text-xs text-zinc-500 tabular-nums">
                  {phaseDone}/{phase.steps.length}
                </span>
              </div>

              <div className="space-y-2">
                {phase.steps.map((step, stepIdx) => {
                  const key = `${show.key}:${phaseIdx}:${stepIdx}`;
                  const checked = Boolean(checkedSteps[key]);
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => onToggleStep(key)}
                      className={`flex w-full items-start gap-3 border p-3 text-left transition-colors ${
                        checked
                          ? 'border-[#9d7cd8]/40 bg-[#9d7cd8]/10 text-zinc-400'
                          : 'border-zinc-800/80 bg-[#0a0a0a] text-zinc-200 hover:border-zinc-700'
                      }`}
                    >
                      {checked ? (
                        <CheckSquare className="mt-0.5 h-4 w-4 shrink-0 text-[#9d7cd8]" />
                      ) : (
                        <Square className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" />
                      )}
                      <span
                        className={`text-xs leading-relaxed ${
                          checked ? 'line-through decoration-zinc-600' : ''
                        }`}
                      >
                        {step}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
