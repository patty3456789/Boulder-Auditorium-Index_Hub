import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  Camera,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { CAD_BLUEPRINTS } from '../data/cadBlueprints';
import { SIGNAL_TRACE_ROUTES } from '../data/signalTraces';
import { CadSvgRenderer } from './CadSvgRenderer';
import { GlossaryText } from './GlossaryText';

interface DiagramsViewProps {
  externalTarget?: { blueprintId: string; unitId: string; nonce: number } | null;
}

export const DiagramsView: React.FC<DiagramsViewProps> = ({ externalTarget }) => {
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string>(
    CAD_BLUEPRINTS[0]?.id ?? ''
  );
  const [selectedUnitByBlueprint, setSelectedUnitByBlueprint] = useState<
    Record<string, string>
  >(() => {
    const map: Record<string, string> = {};
    for (const bp of CAD_BLUEPRINTS) {
      if (bp.units[0]) map[bp.id] = bp.units[0].id;
    }
    return map;
  });
  const [zoom, setZoom] = useState<number>(1);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [photoError, setPhotoError] = useState(false);

  // Signal Flow Tracer State
  const [activeTraceId, setActiveTraceId] = useState<string | null>(null);
  const [activeTraceStep, setActiveTraceStep] = useState<number>(1);

  useEffect(() => {
    if (!externalTarget) return;
    setSelectedBlueprintId(externalTarget.blueprintId);
    setSelectedUnitByBlueprint((prev) => ({
      ...prev,
      [externalTarget.blueprintId]: externalTarget.unitId
    }));
    setPhotoError(false);
    setShowPhotoModal(false);
  }, [externalTarget]);

  const blueprint = useMemo(
    () =>
      CAD_BLUEPRINTS.find((b) => b.id === selectedBlueprintId) ??
      CAD_BLUEPRINTS[0],
    [selectedBlueprintId]
  );

  const selectedUnitId =
    selectedUnitByBlueprint[blueprint.id] ?? blueprint.units[0]?.id ?? '';
  const unitIndex = blueprint.units.findIndex((u) => u.id === selectedUnitId);
  const activeUnit =
    blueprint.units[unitIndex >= 0 ? unitIndex : 0] ?? blueprint.units[0];

  const activeTrace = useMemo(
    () => SIGNAL_TRACE_ROUTES.find((r) => r.id === activeTraceId) ?? null,
    [activeTraceId]
  );

  const activeStage = useMemo(
    () =>
      activeTrace?.stages.find((s) => s.step === activeTraceStep) ??
      activeTrace?.stages[0] ??
      null,
    [activeTrace, activeTraceStep]
  );

  const selectUnit = (unitId: string) => {
    setSelectedUnitByBlueprint((prev) => ({ ...prev, [blueprint.id]: unitId }));
    setPhotoError(false);
  };

  const stepUnit = (delta: number) => {
    if (blueprint.units.length === 0) return;
    const nextIdx =
      (Math.max(0, unitIndex) + delta + blueprint.units.length) %
      blueprint.units.length;
    selectUnit(blueprint.units[nextIdx].id);
  };

  const activateTraceStage = (traceId: string, stepNum: number) => {
    const route = SIGNAL_TRACE_ROUTES.find((r) => r.id === traceId);
    if (!route) return;
    const stage =
      route.stages.find((s) => s.step === stepNum) ?? route.stages[0];
    if (!stage) return;

    setActiveTraceId(traceId);
    setActiveTraceStep(stage.step);
    setSelectedBlueprintId(stage.blueprintId);
    setSelectedUnitByBlueprint((prev) => ({
      ...prev,
      [stage.blueprintId]: stage.unitId
    }));
    setShowPhotoModal(false);
    setPhotoError(false);
  };

  const stepTraceStage = (delta: number) => {
    if (!activeTrace || activeTrace.stages.length === 0) return;
    const idx = activeTrace.stages.findIndex((s) => s.step === activeTraceStep);
    const nextIdx =
      (Math.max(0, idx) + delta + activeTrace.stages.length) %
      activeTrace.stages.length;
    activateTraceStage(activeTrace.id, activeTrace.stages[nextIdx].step);
  };

  return (
    <div className="mx-auto max-w-[1440px] space-y-5 px-4 py-6 sm:px-6">
      {/* Station Blueprint Switcher Header */}
      <div className="flex flex-col justify-between gap-4 border border-zinc-800 bg-[#121212] p-5 lg:flex-row lg:items-center">
        <div>
          <h1 className="font-mono text-xl font-semibold text-zinc-100">
            diagrams
          </h1>
          <p className="mt-1 font-mono text-xs text-zinc-400">
            {blueprint.title} · {blueprint.location}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {CAD_BLUEPRINTS.map((bp) => {
            const active = bp.id === blueprint.id;
            return (
              <button
                key={bp.id}
                type="button"
                onClick={() => {
                  setSelectedBlueprintId(bp.id);
                  setShowPhotoModal(false);
                  setPhotoError(false);
                }}
                className={`border px-3 py-1.5 font-mono text-xs transition-colors ${
                  active
                    ? 'border-[#9d7cd8] bg-[#9d7cd8]/15 text-[#9d7cd8]'
                    : 'border-zinc-800 bg-[#0a0a0a] text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                {bp.tabLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Verified Signal Flow Tracer + Stage Jumper Bar */}
      <div className="space-y-3 border border-zinc-800 bg-[#121212] p-4">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div className="flex items-center gap-2 font-mono text-xs">
            <Activity className="h-3.5 w-3.5 text-[#9d7cd8]" />
            <span className="font-semibold text-zinc-100">trace signal chain</span>
            <span className="hidden text-zinc-500 sm:inline">
              · verify auditorium loop across racks & console
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTraceId(null)}
              className={`border px-2.5 py-1 font-mono text-[11px] transition-colors ${
                activeTraceId === null
                  ? 'border-zinc-500 bg-zinc-800/70 text-zinc-100'
                  : 'border-zinc-800 bg-[#0a0a0a] text-zinc-500 hover:border-zinc-700 hover:text-zinc-200'
              }`}
            >
              trace off
            </button>
            {SIGNAL_TRACE_ROUTES.map((route) => {
              const active = activeTraceId === route.id;
              return (
                <button
                  key={route.id}
                  type="button"
                  onClick={() => activateTraceStage(route.id, 1)}
                  className={`border px-2.5 py-1 font-mono text-[11px] transition-colors ${
                    active
                      ? 'border-[#9d7cd8] bg-[#9d7cd8]/20 text-[#9d7cd8]'
                      : 'border-zinc-800 bg-[#0a0a0a] text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                  }`}
                >
                  {route.label}
                </button>
              );
            })}
          </div>
        </div>

        {activeTrace && activeStage && (
          <div className="space-y-2.5 border-t border-zinc-800 pt-3">
            {/* Horizontal Sequential Stage Jumper Strip */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => stepTraceStage(-1)}
                aria-label="Previous signal trace stage"
                className="border border-zinc-800 bg-[#0a0a0a] p-1.5 text-zinc-400 hover:border-zinc-700 hover:text-zinc-100"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>

              {activeTrace.stages.map((st, idx) => {
                const isCurrent = st.step === activeStage.step;
                const onCurrentBlueprint = st.blueprintId === blueprint.id;
                return (
                  <React.Fragment key={`${activeTrace.id}-${st.step}`}>
                    {idx > 0 && (
                      <span className="font-mono text-[11px] text-zinc-600">→</span>
                    )}
                    <button
                      type="button"
                      onClick={() => activateTraceStage(activeTrace.id, st.step)}
                      className={`border px-2.5 py-1 font-mono text-[11px] transition-colors ${
                        isCurrent
                          ? 'border-[#9d7cd8] bg-[#9d7cd8] font-semibold text-[#0a0a0a]'
                          : onCurrentBlueprint
                          ? 'border-[#9d7cd8]/60 bg-[#9d7cd8]/15 text-zinc-100 hover:border-[#9d7cd8]'
                          : 'border-zinc-800 bg-[#0a0a0a] text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                      }`}
                    >
                      {st.step}. {st.shortLabel}
                    </button>
                  </React.Fragment>
                );
              })}

              <button
                type="button"
                onClick={() => stepTraceStage(1)}
                aria-label="Next signal trace stage"
                className="border border-zinc-800 bg-[#0a0a0a] p-1.5 text-zinc-400 hover:border-zinc-700 hover:text-zinc-100"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Active Stage Spec Bar */}
            <div className="flex flex-col justify-between gap-2 border border-zinc-800 bg-[#0a0a0a] px-3.5 py-2.5 font-mono text-xs md:flex-row md:items-center">
              <div className="space-y-0.5">
                <span className="text-[#9d7cd8] font-semibold">
                  stage {activeStage.step}/{activeTrace.stages.length} · {activeStage.stationLabel}
                </span>
                <p className="text-zinc-200">
                  <GlossaryText text={activeStage.signalNote} />
                </p>
              </div>
              <div className="shrink-0 text-[11px] text-zinc-400">
                <GlossaryText text={activeStage.connectorSpec} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 60% CAD Schematic / 40% Inspector Callout Split */}
      <div className="grid gap-0 border border-zinc-800 bg-[#121212] lg:grid-cols-[1.5fr_1fr]">
        {/* Left 60%: Interactive Photo-Traced SVG CAD Schematic */}
        <div className="flex flex-col border-b border-zinc-800 lg:border-b-0 lg:border-r">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 bg-[#0e0e11] px-4 py-2.5">
            <span className="font-mono text-[11px] text-zinc-400">
              click any hardware chassis to lock elbow callout · {blueprint.units.length} units
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(0.75, +(z - 0.15).toFixed(2)))}
                title="Zoom out CAD schematic"
                className="border border-zinc-800 bg-[#0a0a0a] p-1 text-zinc-400 hover:border-zinc-700 hover:text-zinc-100"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>
              <span className="w-11 text-center font-mono text-[11px] text-zinc-400 tabular-nums">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(1.6, +(z + 0.15).toFixed(2)))}
                title="Zoom in CAD schematic"
                className="border border-zinc-800 bg-[#0a0a0a] p-1 text-zinc-400 hover:border-zinc-700 hover:text-zinc-100"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setZoom(1)}
                className="border border-zinc-800 bg-[#0a0a0a] px-2 py-1 font-mono text-[11px] text-zinc-400 hover:border-zinc-700 hover:text-zinc-100"
              >
                fit
              </button>
            </div>
          </div>

          <div className="max-h-[760px] overflow-auto bg-[#09090b] p-3 sm:p-5">
            <div
              style={{ width: `${zoom * 100}%`, minWidth: '100%' }}
              className="mx-auto transition-[width] duration-150"
            >
              <CadSvgRenderer
                blueprint={blueprint}
                selectedUnitId={activeUnit?.id ?? ''}
                onSelectUnit={selectUnit}
                traceStages={activeTrace?.stages ?? []}
                activeTraceStep={activeStage?.step ?? null}
              />
            </div>
          </div>
        </div>

        {/* Right 40%: Technical Callout Notes Panel */}
        <aside className="flex flex-col justify-between bg-[#121212] p-5">
          {activeUnit ? (
            <div className="space-y-5">
              {/* Header + Prev/Next */}
              <div className="flex items-start justify-between gap-3 border-b border-zinc-800 pb-4">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-[#9d7cd8]">
                    {activeUnit.slotLabel} · {activeUnit.assetId}
                  </div>
                  <h2 className="mt-1 font-mono text-base font-semibold text-zinc-100">
                    {activeUnit.title}
                  </h2>
                  <div className="mt-0.5 font-mono text-xs text-zinc-400">
                    {activeUnit.model}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() => stepUnit(-1)}
                    aria-label="Previous unit"
                    className="border border-zinc-800 bg-[#0a0a0a] p-1.5 text-zinc-400 hover:border-zinc-700 hover:text-zinc-100"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => stepUnit(1)}
                    aria-label="Next unit"
                    className="border border-zinc-800 bg-[#0a0a0a] p-1.5 text-zinc-400 hover:border-zinc-700 hover:text-zinc-100"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-zinc-300">
                <GlossaryText text={activeUnit.summary} />
              </p>

              {/* Signal Flow Path */}
              <div className="space-y-2 border border-zinc-800 bg-[#0a0a0a] p-3.5 font-mono text-xs">
                <div className="text-[11px] uppercase tracking-wider text-zinc-500">
                  signal flow path
                </div>
                <div>
                  <span className="text-zinc-500">in: </span>
                  <span className="text-zinc-200">
                    <GlossaryText text={activeUnit.signalPath.input} />
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500">dsp: </span>
                  <span className="text-[#9d7cd8]">
                    <GlossaryText text={activeUnit.signalPath.processing} />
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500">out: </span>
                  <span className="text-zinc-100">
                    <GlossaryText text={activeUnit.signalPath.output} />
                  </span>
                </div>
              </div>

              {/* Power & Clock */}
              <div className="border border-zinc-800 bg-[#0a0a0a] p-3.5 font-mono text-xs">
                <div className="text-[11px] uppercase tracking-wider text-zinc-500">
                  power & clock notes
                </div>
                <p className="mt-1 text-zinc-200">
                  <GlossaryText text={activeUnit.powerAndClock} />
                </p>
              </div>

              {/* Field Checklist Bullets */}
              <div className="space-y-2">
                <div className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                  booth operational checks
                </div>
                <ul className="space-y-1.5 text-xs text-zinc-300">
                  {activeUnit.specs.map((spec) => (
                    <li key={spec} className="flex items-start gap-2">
                      <span className="font-mono text-[#9d7cd8]">›</span>
                      <GlossaryText text={spec} />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Unit Index Strip + Photo Inspect */}
              <div className="space-y-3 border-t border-zinc-800 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setPhotoError(false);
                    setShowPhotoModal((prev) => !prev);
                  }}
                  className="inline-flex w-full items-center justify-center gap-2 border border-[#9d7cd8]/60 bg-[#9d7cd8]/15 px-3 py-2 font-mono text-xs text-[#9d7cd8] transition-colors hover:bg-[#9d7cd8]/25"
                >
                  <Camera className="h-3.5 w-3.5" />
                  {showPhotoModal ? 'hide reference photo' : 'inspect real booth photo'}
                </button>

                {showPhotoModal && (
                  <div className="relative border border-zinc-800 bg-[#0a0a0a] p-2">
                    <div className="mb-1.5 flex items-center justify-between font-mono text-[11px] text-zinc-500">
                      <span>photo reference · {activeUnit.slotLabel}</span>
                      <button
                        type="button"
                        onClick={() => setShowPhotoModal(false)}
                        className="text-zinc-400 hover:text-zinc-100"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    {!photoError ? (
                      <img
                        src={activeUnit.photoPath}
                        alt={activeUnit.title}
                        referrerPolicy="no-referrer"
                        onError={() => setPhotoError(true)}
                        className="max-h-64 w-full object-contain"
                      />
                    ) : (
                      <div className="py-8 text-center font-mono text-xs text-zinc-500">
                        Reference photo unavailable offline.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : null}

          {/* Quick Jump Index */}
          <div className="mt-6 border-t border-zinc-800 pt-4">
            <div className="mb-2 font-mono text-[11px] uppercase tracking-wider text-zinc-500">
              station units ({blueprint.units.length})
            </div>
            <div className="grid max-h-40 gap-1 overflow-y-auto pr-1">
              {blueprint.units.map((u) => {
                const selected = u.id === activeUnit?.id;
                return (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => selectUnit(u.id)}
                    className={`flex items-center justify-between border px-2.5 py-1.5 text-left font-mono text-[11px] transition-colors ${
                      selected
                        ? 'border-[#9d7cd8] bg-[#9d7cd8]/15 text-[#9d7cd8]'
                        : 'border-zinc-800/70 bg-[#0a0a0a] text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                    }`}
                  >
                    <span className="truncate pr-2">{u.title}</span>
                    <span className="shrink-0 text-zinc-500">{u.slotLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
