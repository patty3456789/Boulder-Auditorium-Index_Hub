import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  BookOpen,
  FileText,
  Pin,
  Plus,
  Search,
  StickyNote,
  Trash2,
  Upload
} from 'lucide-react';
import { WIKI_CHAPTERS } from '../data/wikiChapters';
import { TeamNote } from '../types';
import { GlossaryText } from './GlossaryText';

interface WikiViewProps {
  notes: TeamNote[];
  onAddNote: (title: string, body: string) => void;
  onDeleteNote: (id: string) => void;
}

type WikiTab = 'chapters' | 'pdf' | 'notes';

export const WikiView: React.FC<WikiViewProps> = ({
  notes,
  onAddNote,
  onDeleteNote
}) => {
  const [activeTab, setActiveTab] = useState<WikiTab>('chapters');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChapterId, setSelectedChapterId] = useState<string>(
    WIKI_CHAPTERS[0]?.id ?? ''
  );
  const [customPdfUrl, setCustomPdfUrl] = useState<string | null>(null);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteBody, setNoteBody] = useState('');

  // Full-text filter across chapter titles, summaries, paragraphs, walkthroughs, whyItMatters, and troubleshooting
  const filteredChapters = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return WIKI_CHAPTERS;
    return WIKI_CHAPTERS.filter((ch) => {
      const haystack = [
        ch.title,
        ch.category,
        ch.summary,
        ch.manualRef,
        ...ch.paragraphs,
        ch.whyItMatters.title,
        ch.whyItMatters.body,
        ...ch.walkthroughs.flatMap((w) => [w.heading, ...w.steps]),
        ...ch.troubleshooting.flatMap((t) => [t.symptom, t.cause, t.resolution])
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [searchQuery]);

  const activeChapter = useMemo(
    () =>
      filteredChapters.find((c) => c.id === selectedChapterId) ??
      filteredChapters[0] ??
      null,
    [filteredChapters, selectedChapterId]
  );

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (customPdfUrl) URL.revokeObjectURL(customPdfUrl);
    setCustomPdfUrl(URL.createObjectURL(file));
  };

  const handleSubmitNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim() || !noteBody.trim()) return;
    onAddNote(noteTitle.trim(), noteBody.trim());
    setNoteTitle('');
    setNoteBody('');
  };

  const pdfSrc =
    customPdfUrl ?? './assets/aistudio/Behringer-X32_Manual_5d1c25ad.pdf';

  return (
    <div className="mx-auto max-w-[1440px] space-y-5 px-4 py-6 sm:px-6">
      {/* Header & Mode Tabs */}
      <div className="flex flex-col justify-between gap-4 border border-zinc-800 bg-[#121212] p-5 md:flex-row md:items-center">
        <div>
          <h1 className="font-mono text-xl font-semibold text-zinc-100">
            x32 manual & wiki
          </h1>
          <p className="mt-1 font-mono text-xs text-zinc-400">
            {WIKI_CHAPTERS.length}-chapter operational textbook · embedded behringer x32 manual · local booth notes
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab('chapters')}
            className={`inline-flex items-center gap-1.5 border px-3 py-1.5 font-mono text-xs transition-colors ${
              activeTab === 'chapters'
                ? 'border-[#9d7cd8] bg-[#9d7cd8]/15 text-[#9d7cd8]'
                : 'border-zinc-800 bg-[#0a0a0a] text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            technical wiki
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pdf')}
            className={`inline-flex items-center gap-1.5 border px-3 py-1.5 font-mono text-xs transition-colors ${
              activeTab === 'pdf'
                ? 'border-[#9d7cd8] bg-[#9d7cd8]/15 text-[#9d7cd8]'
                : 'border-zinc-800 bg-[#0a0a0a] text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            x32 manual pdf
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('notes')}
            className={`inline-flex items-center gap-1.5 border px-3 py-1.5 font-mono text-xs transition-colors ${
              activeTab === 'notes'
                ? 'border-[#9d7cd8] bg-[#9d7cd8]/15 text-[#9d7cd8]'
                : 'border-zinc-800 bg-[#0a0a0a] text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
            }`}
          >
            <StickyNote className="h-3.5 w-3.5" />
            booth field notes ({notes.length})
          </button>
        </div>
      </div>

      {/* TAB 1: 30/70 Educational Textbook Wiki */}
      {activeTab === 'chapters' && (
        <div className="grid gap-6 lg:grid-cols-[0.42fr_1fr]">
          {/* Left 30% Full-Text Search Sidebar */}
          <aside className="flex flex-col border border-zinc-800 bg-[#121212] p-4 lg:sticky lg:top-20 lg:max-h-[calc(100vh-110px)]">
            <div className="relative mb-3">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="search all chapters & x32 terms..."
                className="w-full border border-zinc-800 bg-[#0a0a0a] py-2 pl-8 pr-3 font-mono text-xs text-zinc-100 placeholder:text-zinc-600 focus:border-[#9d7cd8] focus:outline-none"
              />
            </div>

            <div className="mb-2 font-mono text-[11px] text-zinc-500 tabular-nums">
              showing {filteredChapters.length} of {WIKI_CHAPTERS.length} chapters
            </div>

            <div className="flex-1 space-y-1.5 overflow-y-auto pr-1">
              {filteredChapters.length === 0 ? (
                <div className="p-4 text-center font-mono text-xs text-zinc-500">
                  No chapters matched "{searchQuery}".
                </div>
              ) : (
                filteredChapters.map((ch) => {
                  const selected = activeChapter?.id === ch.id;
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => setSelectedChapterId(ch.id)}
                      className={`w-full border p-3 text-left transition-colors ${
                        selected
                          ? 'border-[#9d7cd8] bg-[#9d7cd8]/15'
                          : 'border-zinc-800/80 bg-[#0a0a0a] hover:border-zinc-700'
                      }`}
                    >
                      <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                        {ch.category}
                      </div>
                      <div
                        className={`mt-1 font-mono text-xs font-semibold ${
                          selected ? 'text-[#9d7cd8]' : 'text-zinc-200'
                        }`}
                      >
                        {ch.title}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </aside>

          {/* Right 70% Deep-Dive Textbook Reader */}
          <article className="border border-zinc-800 bg-[#121212] p-6 sm:p-8">
            {activeChapter ? (
              <div className="space-y-6">
                <header className="space-y-2 border-b border-zinc-800 pb-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[#9d7cd8]">
                    <span>{activeChapter.category}</span>
                    <span className="text-zinc-500">{activeChapter.manualRef}</span>
                  </div>
                  <h2 className="font-mono text-xl font-semibold text-zinc-100 sm:text-2xl">
                    {activeChapter.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    <GlossaryText text={activeChapter.summary} />
                  </p>
                </header>

                {/* Core Educational Prose */}
                <div className="space-y-4">
                  {activeChapter.paragraphs.map((para, idx) => (
                    <p
                      key={idx}
                      className="text-sm leading-7 text-zinc-200"
                    >
                      <GlossaryText text={para} />
                    </p>
                  ))}
                </div>

                {/* Hardware Button Walkthroughs */}
                <div className="space-y-4">
                  {activeChapter.walkthroughs.map((wt) => (
                    <section
                      key={wt.heading}
                      className="border border-zinc-800 bg-[#0a0a0a] p-5"
                    >
                      <h3 className="font-mono text-sm font-semibold text-[#9d7cd8]">
                        {wt.heading}
                      </h3>
                      <ol className="mt-3 space-y-2.5 text-xs leading-relaxed text-zinc-300">
                        {wt.steps.map((step, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-3">
                            <span className="mt-0.5 font-mono text-[11px] font-semibold text-[#9d7cd8] tabular-nums">
                              {sIdx + 1}.
                            </span>
                            <GlossaryText text={step} />
                          </li>
                        ))}
                      </ol>
                    </section>
                  ))}
                </div>

                {/* Why It Matters Engineering Callout (Full hairline border, no border-l-4) */}
                <section className="border border-[#9d7cd8]/40 bg-[#9d7cd8]/10 p-5">
                  <div className="font-mono text-xs font-semibold uppercase tracking-wider text-[#9d7cd8]">
                    why it matters · {activeChapter.whyItMatters.title}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-200">
                    <GlossaryText text={activeChapter.whyItMatters.body} />
                  </p>
                </section>

                {/* Technical Specs Table */}
                {activeChapter.specsTable && (
                  <section className="border border-zinc-800 bg-[#0a0a0a]">
                    <div className="border-b border-zinc-800 px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                      reference benchmarks & specifications
                    </div>
                    <div className="divide-y divide-zinc-800/80">
                      {activeChapter.specsTable.map((row) => (
                        <div
                          key={row.label}
                          className="grid gap-2 px-4 py-2.5 font-mono text-xs sm:grid-cols-2"
                        >
                          <span className="text-zinc-400">
                            <GlossaryText text={row.label} />
                          </span>
                          <span className="text-zinc-100">
                            <GlossaryText text={row.value} />
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Troubleshooting Scenarios */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#9d7cd8]">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    live show troubleshooting
                  </div>
                  <div className="space-y-3">
                    {activeChapter.troubleshooting.map((item, idx) => (
                      <div
                        key={idx}
                        className="space-y-2 border border-zinc-800 bg-[#0a0a0a] p-4 text-xs"
                      >
                        <div>
                          <span className="font-mono font-semibold text-zinc-100">
                            symptom:{' '}
                          </span>
                          <span className="text-zinc-300">
                            <GlossaryText text={item.symptom} />
                          </span>
                        </div>
                        <div>
                          <span className="font-mono font-semibold text-zinc-400">
                            root cause:{' '}
                          </span>
                          <span className="text-zinc-400">
                            <GlossaryText text={item.cause} />
                          </span>
                        </div>
                        <div>
                          <span className="font-mono font-semibold text-[#9d7cd8]">
                            fix:{' '}
                          </span>
                          <span className="text-zinc-100">
                            <GlossaryText text={item.resolution} />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            ) : (
              <div className="py-12 text-center font-mono text-xs text-zinc-500">
                Select a chapter from the sidebar to read.
              </div>
            )}
          </article>
        </div>
      )}

      {/* TAB 2: Embedded Behringer X32 Official Manual PDF */}
      {activeTab === 'pdf' && (
        <div className="space-y-4 border border-zinc-800 bg-[#121212] p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4">
            <div>
              <h2 className="font-mono text-base font-semibold text-zinc-100">
                Behringer X32 Reference Manual (75 Pages)
              </h2>
              <p className="mt-0.5 font-mono text-xs text-zinc-400">
                Embedded official PDF manual · works completely offline inside standalone bundle
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <label className="inline-flex cursor-pointer items-center gap-1.5 border border-zinc-800 bg-[#0a0a0a] px-3 py-1.5 font-mono text-xs text-zinc-300 transition-colors hover:border-zinc-700 hover:text-zinc-100">
                <Upload className="h-3.5 w-3.5 text-[#9d7cd8]" />
                load custom pdf
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handlePdfUpload}
                  className="hidden"
                />
              </label>
              <a
                href={pdfSrc}
                download="Behringer-X32_Manual.pdf"
                className="border border-[#9d7cd8]/60 bg-[#9d7cd8]/15 px-3 py-1.5 font-mono text-xs text-[#9d7cd8] transition-colors hover:bg-[#9d7cd8]/25"
              >
                download pdf
              </a>
            </div>
          </div>

          <div className="border border-zinc-800 bg-[#0a0a0a]">
            <iframe
              title="Behringer X32 Official Manual PDF"
              src={pdfSrc}
              className="h-[780px] w-full"
            />
          </div>
        </div>
      )}

      {/* TAB 3: LocalStorage Booth Field Notes */}
      {activeTab === 'notes' && (
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <form
            onSubmit={handleSubmitNote}
            className="h-fit space-y-4 border border-zinc-800 bg-[#121212] p-5"
          >
            <div className="font-mono text-sm font-semibold text-zinc-100">
              add booth field note
            </div>
            <p className="font-mono text-xs text-zinc-500">
              Saved locally in this booth browser for instant offline recall across shows.
            </p>
            <div className="space-y-1.5">
              <label
                htmlFor="note-title"
                className="font-mono text-[11px] uppercase tracking-wider text-zinc-400"
              >
                title / channel / cue tag
              </label>
              <input
                id="note-title"
                type="text"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                placeholder="e.g. Ch 14 Pack #14 antenna bent"
                className="w-full border border-zinc-800 bg-[#0a0a0a] px-3 py-2 font-mono text-xs text-zinc-100 placeholder:text-zinc-600 focus:border-[#9d7cd8] focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="note-body"
                className="font-mono text-[11px] uppercase tracking-wider text-zinc-400"
              >
                details & action required
              </label>
              <textarea
                id="note-body"
                rows={4}
                value={noteBody}
                onChange={(e) => setNoteBody(e.target.value)}
                placeholder="Write show note, replacement mic battery condition, or EQ offset..."
                className="w-full border border-zinc-800 bg-[#0a0a0a] px-3 py-2 font-mono text-xs text-zinc-100 placeholder:text-zinc-600 focus:border-[#9d7cd8] focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 border border-[#9d7cd8] bg-[#9d7cd8]/15 px-4 py-2 font-mono text-xs font-medium text-[#9d7cd8] transition-colors hover:bg-[#9d7cd8]/25"
            >
              <Plus className="h-3.5 w-3.5" />
              save note locally
            </button>
          </form>

          <div className="space-y-3">
            {notes.map((note) => (
              <div
                key={note.id}
                className="border border-zinc-800 bg-[#121212] p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {note.pinned && <Pin className="h-3.5 w-3.5 text-[#9d7cd8]" />}
                    <h3 className="font-mono text-sm font-semibold text-zinc-100">
                      {note.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] text-zinc-500">
                      {note.createdAt}
                    </span>
                    {!note.pinned && (
                      <button
                        type="button"
                        onClick={() => onDeleteNote(note.id)}
                        aria-label="Delete note"
                        className="text-zinc-500 transition-colors hover:text-[#9d7cd8]"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-zinc-300">
                  <GlossaryText text={note.body} />
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
