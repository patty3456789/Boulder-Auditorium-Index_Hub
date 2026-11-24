import React, { useEffect, useState } from 'react';
import {
  CheckSquare,
  FileText,
  FolderPlus,
  Image as ImageIcon,
  RotateCcw,
  Square,
  Trash2,
  Upload,
  Users,
  X
} from 'lucide-react';
import { SHOW_CONFIGS } from '../data/showConfigs';
import { ShowKey } from '../types';
import {
  AnnualMediaItem,
  AnnualShowMeta,
  clearAnnualMediaForShow,
  clearAnnualShowMeta,
  deleteAnnualMediaItem,
  fileToDataUrl,
  listAnnualMedia,
  readAnnualShowMeta,
  saveAnnualMediaItems,
  saveAnnualShowMeta
} from '../utils/runbookMediaDb';
import { GlossaryText } from './GlossaryText';

interface RunbooksViewProps {
  activeShow: ShowKey;
  checkedSteps: Record<string, boolean>;
  onSelectShow: (show: ShowKey) => void;
  onToggleStep: (stepKey: string) => void;
  onResetShowChecks: (showKey: ShowKey) => void;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const RunbooksView: React.FC<RunbooksViewProps> = ({
  activeShow,
  checkedSteps,
  onSelectShow,
  onToggleStep,
  onResetShowChecks
}) => {
  const show = SHOW_CONFIGS[activeShow];

  const [annualMeta, setAnnualMeta] = useState<AnnualShowMeta>(() =>
    readAnnualShowMeta(activeShow)
  );
  const [mediaItems, setMediaItems] = useState<AnnualMediaItem[]>([]);
  const [previewMedia, setPreviewMedia] = useState<AnnualMediaItem | null>(null);
  const [confirmWipe, setConfirmWipe] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setAnnualMeta(readAnnualShowMeta(activeShow));
    setConfirmWipe(false);
    setPreviewMedia(null);
    let cancelled = false;
    void listAnnualMedia(activeShow).then((items) => {
      if (!cancelled) setMediaItems(items);
    });
    return () => {
      cancelled = true;
    };
  }, [activeShow]);

  const updateAnnualField = (field: 'seasonLabel' | 'customNotes', value: string) => {
    const next: AnnualShowMeta = {
      ...annualMeta,
      [field]: value,
      updatedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    };
    setAnnualMeta(next);
    saveAnnualShowMeta(activeShow, next);
  };

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setIsUploading(true);
    try {
      const added: AnnualMediaItem[] = [];
      for (const file of Array.from(files)) {
        const dataUrl = await fileToDataUrl(file);
        added.push({
          id: `${activeShow}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          showKey: activeShow,
          name: file.name,
          mimeType: file.type || 'application/octet-stream',
          sizeBytes: file.size,
          addedAt: new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          }),
          dataUrl
        });
      }
      await saveAnnualMediaItems(added);
      const refreshed = await listAnnualMedia(activeShow);
      setMediaItems(refreshed);
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleDeleteMedia = async (id: string) => {
    await deleteAnnualMediaItem(id);
    setMediaItems((prev) => prev.filter((item) => item.id !== id));
    if (previewMedia?.id === id) setPreviewMedia(null);
  };

  const handleWipeAnnualPack = async () => {
    if (!confirmWipe) {
      setConfirmWipe(true);
      return;
    }
    clearAnnualShowMeta(activeShow);
    await clearAnnualMediaForShow(activeShow);
    setAnnualMeta({ seasonLabel: '', customNotes: '', updatedAt: '' });
    setMediaItems([]);
    setPreviewMedia(null);
    setConfirmWipe(false);
  };

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
              {annualMeta.seasonLabel.trim()
                ? ` · ${annualMeta.seasonLabel.trim()}`
                : ''}
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
          <p className="text-sm leading-relaxed text-zinc-300">
            <GlossaryText text={show.description} />
          </p>

          <div className="grid gap-3 pt-1 sm:grid-cols-2">
            <div className="border border-zinc-800 bg-[#0a0a0a] p-3 font-mono text-xs">
              <div className="text-[11px] uppercase tracking-wider text-zinc-500">
                primary console
              </div>
              <div className="mt-1 text-zinc-200">
                <GlossaryText text={show.overrides.console} />
              </div>
            </div>
            <div className="border border-zinc-800 bg-[#0a0a0a] p-3 font-mono text-xs">
              <div className="text-[11px] uppercase tracking-wider text-zinc-500">
                control mode
              </div>
              <div className="mt-1 text-zinc-200">
                <GlossaryText text={show.overrides.controlMode} />
              </div>
            </div>
            <div className="border border-zinc-800 bg-[#0a0a0a] p-3 font-mono text-xs sm:col-span-2">
              <div className="text-[11px] uppercase tracking-wider text-zinc-500">
                input & output zone patch
              </div>
              <div className="mt-1 text-zinc-200">
                <GlossaryText text={show.overrides.primaryInput} />
              </div>
              <div className="mt-1 text-[#9d7cd8]">
                <GlossaryText text={show.overrides.outputZones.join(' · ')} />
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
            <div className="h-2 w-full border border-zinc-800 bg-[#0a0a0a]">
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
                    <GlossaryText text={member.task} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Customizable Annual Show Pack & Offline Media Slot */}
      <section className="space-y-4 border border-zinc-800 bg-[#121212] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2.5">
            <FolderPlus className="h-4 w-4 text-[#9d7cd8]" />
            <div>
              <h2 className="font-mono text-sm font-semibold text-zinc-100">
                annual production pack · {show.name.toLowerCase()}
              </h2>
              <p className="font-mono text-[11px] text-zinc-500">
                customize this year&apos;s subtitle, cast mic roster, layout maps & sound spreadsheet screenshots (stored offline)
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label className="inline-flex cursor-pointer items-center gap-1.5 border border-[#9d7cd8]/70 bg-[#9d7cd8]/15 px-3 py-1.5 font-mono text-xs text-[#9d7cd8] transition-colors hover:bg-[#9d7cd8]/25">
              <Upload className="h-3.5 w-3.5" />
              {isUploading ? 'saving files...' : 'upload diagram / list'}
              <input
                type="file"
                multiple
                accept="image/*,application/pdf"
                onChange={handleMediaUpload}
                className="hidden"
              />
            </label>

            <button
              type="button"
              onClick={handleWipeAnnualPack}
              onMouseLeave={() => setConfirmWipe(false)}
              className={`inline-flex items-center gap-1.5 border px-3 py-1.5 font-mono text-xs transition-colors ${
                confirmWipe
                  ? 'border-[#9d7cd8] bg-[#9d7cd8] font-semibold text-[#0a0a0a]'
                  : 'border-zinc-800 bg-[#0a0a0a] text-zinc-400 hover:border-zinc-600 hover:text-zinc-100'
              }`}
            >
              <Trash2 className="h-3.5 w-3.5" />
              {confirmWipe ? 'click again to confirm wipe' : 'wipe annual show data'}
            </button>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Editable Yearly Metadata */}
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label
                htmlFor={`annual-title-${show.key}`}
                className="font-mono text-[11px] uppercase tracking-wider text-zinc-500"
              >
                this year&apos;s production subtitle / theme
              </label>
              <input
                id={`annual-title-${show.key}`}
                type="text"
                value={annualMeta.seasonLabel}
                onChange={(e) => updateAnnualField('seasonLabel', e.target.value)}
                placeholder="e.g. 2026 Show Title, Room Map Rev 2, Festival Week..."
                className="w-full border border-zinc-800 bg-[#0a0a0a] px-3 py-2 font-mono text-xs text-zinc-100 placeholder:text-zinc-600 focus:border-[#9d7cd8] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor={`annual-notes-${show.key}`}
                className="font-mono text-[11px] uppercase tracking-wider text-zinc-500"
              >
                annual cast-to-mic notes & patch overrides
              </label>
              <textarea
                id={`annual-notes-${show.key}`}
                rows={4}
                value={annualMeta.customNotes}
                onChange={(e) => updateAnnualField('customNotes', e.target.value)}
                placeholder="Enter this year's mic assignments, room loop placements, or special cue notes..."
                className="w-full border border-zinc-800 bg-[#0a0a0a] px-3 py-2 font-mono text-xs text-zinc-100 placeholder:text-zinc-600 focus:border-[#9d7cd8] focus:outline-none"
              />
            </div>
          </div>

          {/* Offline Uploaded Diagrams, Screenshots & PDFs */}
          <div className="space-y-2">
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-zinc-500">
              <span>uploaded layouts, spreadsheets & cast lists ({mediaItems.length})</span>
              {annualMeta.updatedAt && (
                <span className="normal-case text-zinc-600">
                  updated {annualMeta.updatedAt}
                </span>
              )}
            </div>

            {mediaItems.length === 0 ? (
              <div className="flex min-h-[144px] flex-col items-center justify-center border border-dashed border-zinc-800 bg-[#0a0a0a] p-5 text-center font-mono text-xs text-zinc-500">
                <span>No yearly diagrams or mic lists uploaded yet for {show.name}.</span>
                <span className="mt-1 text-[11px] text-zinc-600">
                  Upload haunted house maps, cast-to-mic screenshots, or PDF cue sheets above.
                </span>
              </div>
            ) : (
              <div className="grid max-h-[260px] gap-2.5 overflow-y-auto pr-1 sm:grid-cols-2">
                {mediaItems.map((item) => {
                  const isImage = item.mimeType.startsWith('image/');
                  return (
                    <div
                      key={item.id}
                      className="flex flex-col justify-between border border-zinc-800 bg-[#0a0a0a] p-2.5"
                    >
                      <button
                        type="button"
                        onClick={() => setPreviewMedia(item)}
                        className="group block text-left focus:outline-none"
                      >
                        {isImage ? (
                          <img
                            src={item.dataUrl}
                            alt={item.name}
                            className="h-28 w-full border border-zinc-800/80 object-cover opacity-90 transition-opacity group-hover:opacity-100"
                          />
                        ) : (
                          <div className="flex h-28 w-full flex-col items-center justify-center gap-1.5 border border-zinc-800/80 bg-[#121216] text-zinc-400 group-hover:text-[#9d7cd8]">
                            <FileText className="h-6 w-6" />
                            <span className="font-mono text-[11px]">click to open pdf</span>
                          </div>
                        )}
                      </button>

                      <div className="mt-2 flex items-center justify-between gap-2 font-mono text-[11px]">
                        <div className="flex min-w-0 items-center gap-1.5">
                          {isImage ? (
                            <ImageIcon className="h-3 w-3 shrink-0 text-[#9d7cd8]" />
                          ) : (
                            <FileText className="h-3 w-3 shrink-0 text-[#9d7cd8]" />
                          )}
                          <span className="truncate text-zinc-200">{item.name}</span>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          <span className="text-[10px] text-zinc-500">
                            {formatBytes(item.sizeBytes)}
                          </span>
                          <button
                            type="button"
                            onClick={() => void handleDeleteMedia(item.id)}
                            aria-label={`Remove ${item.name}`}
                            className="text-zinc-500 transition-colors hover:text-[#9d7cd8]"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Media Fullscreen Lightbox Preview Modal */}
      {previewMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={previewMedia.name}
        >
          <div className="flex max-h-[90vh] w-full max-w-4xl flex-col border border-zinc-700 bg-[#121212]">
            <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3 font-mono text-xs">
              <span className="truncate text-zinc-100">
                {previewMedia.name} · {formatBytes(previewMedia.sizeBytes)}
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={previewMedia.dataUrl}
                  download={previewMedia.name}
                  className="border border-[#9d7cd8]/60 bg-[#9d7cd8]/15 px-2.5 py-1 text-[#9d7cd8] hover:bg-[#9d7cd8]/25"
                >
                  download
                </a>
                <button
                  type="button"
                  onClick={() => setPreviewMedia(null)}
                  aria-label="Close media preview"
                  className="border border-zinc-800 bg-[#0a0a0a] p-1 text-zinc-400 hover:text-zinc-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="overflow-auto bg-[#09090b] p-4">
              {previewMedia.mimeType.startsWith('image/') ? (
                <img
                  src={previewMedia.dataUrl}
                  alt={previewMedia.name}
                  className="mx-auto max-h-[75vh] w-auto object-contain"
                />
              ) : (
                <iframe
                  title={previewMedia.name}
                  src={previewMedia.dataUrl}
                  className="h-[75vh] w-full border border-zinc-800"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Phase Checklists */}
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
                        <GlossaryText text={step} />
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
