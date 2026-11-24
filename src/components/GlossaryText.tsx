import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AUDIO_GLOSSARY, GlossaryEntry } from '../data/audioGlossary';

interface GlossaryMatch {
  entry: GlossaryEntry;
  keyLower: string;
}

// Build fast longest-first lookup map and compiled word-boundary regex once
const { TERM_MAP, GLOSSARY_REGEX } = (() => {
  const map = new Map<string, GlossaryEntry>();
  const forms: string[] = [];

  for (const entry of AUDIO_GLOSSARY) {
    const allForms = [entry.term, ...(entry.aliases ?? [])];
    for (const raw of allForms) {
      const lower = raw.toLowerCase();
      if (!map.has(lower)) {
        map.set(lower, entry);
        forms.push(raw);
      }
    }
  }

  // Longest phrases first so "HA Gain Split" matches before "HA", "Post-Fader" before "Fader", etc.
  forms.sort((a, b) => b.length - a.length);
  const escaped = forms.map((f) => f.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  // Match whole terms (allowing +48V or -15dB prefixes cleanly)
  const pattern = new RegExp(`(?<![A-Za-z0-9])(${escaped.join('|')})(?![A-Za-z0-9])`, 'gi');

  return { TERM_MAP: map, GLOSSARY_REGEX: pattern };
})();

interface PopoverState {
  entry: GlossaryEntry;
  matchedText: string;
  rect: DOMRect;
}

interface GlossaryTermChipProps {
  text: string;
  entry: GlossaryEntry;
}

const GlossaryTermSpan: React.FC<GlossaryTermChipProps> = ({ text, entry }) => {
  const [popover, setPopover] = useState<PopoverState | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const openPopover = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (!spanRef.current) return;
    setPopover({
      entry,
      matchedText: text,
      rect: spanRef.current.getBoundingClientRect()
    });
  };

  const scheduleClose = () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      setPopover(null);
    }, 90);
  };

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  const popoverStyle = useMemo((): React.CSSProperties | undefined => {
    if (!popover) return undefined;
    const width = 308;
    const margin = 12;
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1280;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 800;

    let left = popover.rect.left + popover.rect.width / 2 - width / 2;
    left = Math.max(margin, Math.min(vw - width - margin, left));

    const preferBelow = popover.rect.top < 200;
    const top = preferBelow
      ? Math.min(vh - 180, popover.rect.bottom + 8)
      : Math.max(margin, popover.rect.top - 10);

    return {
      position: 'fixed',
      left: `${left}px`,
      top: `${top}px`,
      width: `${width}px`,
      transform: preferBelow ? 'translateY(0)' : 'translateY(-100%)',
      zIndex: 9999
    };
  }, [popover]);

  return (
    <>
      <span
        ref={spanRef}
        tabIndex={0}
        role="button"
        aria-label={`Definition for ${entry.term}`}
        onMouseEnter={openPopover}
        onMouseLeave={scheduleClose}
        onFocus={openPopover}
        onBlur={scheduleClose}
        className="cursor-help underline decoration-dotted decoration-[#9d7cd8]/75 underline-offset-4 transition-colors hover:text-[#9d7cd8] hover:decoration-[#9d7cd8] focus:text-[#9d7cd8] focus:outline-none"
      >
        {text}
      </span>

      {popover &&
        popoverStyle &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            role="tooltip"
            onMouseEnter={() => {
              if (closeTimerRef.current) {
                window.clearTimeout(closeTimerRef.current);
                closeTimerRef.current = null;
              }
            }}
            onMouseLeave={scheduleClose}
            style={popoverStyle}
            className="pointer-events-auto border border-[#9d7cd8]/70 bg-[#121216] p-3.5 shadow-2xl"
          >
            <div className="flex items-center justify-between gap-2 border-b border-zinc-800 pb-2 font-mono text-[11px]">
              <span className="font-semibold text-[#9d7cd8]">
                {popover.entry.term}
              </span>
              <span className="text-zinc-500">
                {popover.entry.category.toLowerCase()}
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-zinc-100">
              {popover.entry.definition}
            </p>
            {popover.entry.boothContext && (
              <p className="mt-2 border-t border-zinc-800/80 pt-2 font-mono text-[11px] leading-relaxed text-zinc-400">
                booth: {popover.entry.boothContext}
              </p>
            )}
          </div>,
          document.body
        )}
    </>
  );
};

interface GlossaryTextProps {
  text: string;
  className?: string;
}

export const GlossaryText: React.FC<GlossaryTextProps> = ({ text, className }) => {
  const parts = useMemo(() => {
    const tokens: Array<{ value: string; match?: GlossaryMatch }> = [];
    let lastIndex = 0;

    GLOSSARY_REGEX.lastIndex = 0;
    let exec: RegExpExecArray | null;
    while ((exec = GLOSSARY_REGEX.exec(text)) !== null) {
      const matchedStr = exec[0];
      const idx = exec.index;
      if (idx > lastIndex) {
        tokens.push({ value: text.slice(lastIndex, idx) });
      }
      const lower = matchedStr.toLowerCase();
      const entry = TERM_MAP.get(lower);
      if (entry) {
        tokens.push({ value: matchedStr, match: { entry, keyLower: lower } });
      } else {
        tokens.push({ value: matchedStr });
      }
      lastIndex = idx + matchedStr.length;
    }

    if (lastIndex < text.length) {
      tokens.push({ value: text.slice(lastIndex) });
    }

    return tokens;
  }, [text]);

  return (
    <span className={className}>
      {parts.map((part, idx) =>
        part.match ? (
          <GlossaryTermSpan
            key={`${idx}-${part.match.keyLower}`}
            text={part.value}
            entry={part.match.entry}
          />
        ) : (
          <React.Fragment key={idx}>{part.value}</React.Fragment>
        )
      )}
    </span>
  );
};
