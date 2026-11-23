/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo, useState } from 'react';
import { DatabaseView } from './components/DatabaseView';
import { DiagramsView } from './components/DiagramsView';
import { LandingView } from './components/LandingView';
import { RunbooksView } from './components/RunbooksView';
import { TopNav } from './components/TopNav';
import { WikiView } from './components/WikiView';
import { SHOW_CONFIGS } from './data/showConfigs';
import { DEFAULT_TEAM_NOTES } from './data/wikiChapters';
import { ShowKey, TeamNote, ViewId } from './types';

const STORAGE_KEYS = {
  activeShow: 'boulder_audio_active_show_v1',
  checkedSteps: 'boulder_audio_checked_steps_v1',
  teamNotes: 'boulder_audio_team_notes_v1'
};

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [activeView, setActiveView] = useState<ViewId>('landing');
  const [activeShow, setActiveShow] = useState<ShowKey>(() => {
    const saved = readStorage<string>(STORAGE_KEYS.activeShow, 'spring-musical');
    return saved in SHOW_CONFIGS ? (saved as ShowKey) : 'spring-musical';
  });
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>(() =>
    readStorage<Record<string, boolean>>(STORAGE_KEYS.checkedSteps, {})
  );
  const [notes, setNotes] = useState<TeamNote[]>(() =>
    readStorage<TeamNote[]>(STORAGE_KEYS.teamNotes, DEFAULT_TEAM_NOTES)
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.activeShow, JSON.stringify(activeShow));
    } catch {
      // Ignore storage quota errors in restricted frames
    }
  }, [activeShow]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEYS.checkedSteps,
        JSON.stringify(checkedSteps)
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [checkedSteps]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.teamNotes, JSON.stringify(notes));
    } catch {
      // Ignore storage quota errors
    }
  }, [notes]);

  const handleToggleStep = (stepKey: string) => {
    setCheckedSteps((prev) => ({
      ...prev,
      [stepKey]: !prev[stepKey]
    }));
  };

  const handleResetShowChecks = (showKey: ShowKey) => {
    setCheckedSteps((prev) => {
      const next = { ...prev };
      for (const k of Object.keys(next)) {
        if (k.startsWith(`${showKey}:`)) {
          delete next[k];
        }
      }
      return next;
    });
  };

  const handleAddNote = (title: string, body: string) => {
    const nowLabel = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
    const newNote: TeamNote = {
      id: `note-${Date.now()}`,
      title,
      body,
      createdAt: nowLabel,
      pinned: false
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const { completedStepCount, totalStepCount } = useMemo(() => {
    const show = SHOW_CONFIGS[activeShow];
    let total = 0;
    let done = 0;
    show.phases.forEach((phase, pIdx) => {
      phase.steps.forEach((_, sIdx) => {
        total += 1;
        if (checkedSteps[`${show.key}:${pIdx}:${sIdx}`]) {
          done += 1;
        }
      });
    });
    return { completedStepCount: done, totalStepCount: total };
  }, [activeShow, checkedSteps]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 selection:bg-[#9d7cd8]/30 selection:text-zinc-50">
      <TopNav
        activeView={activeView}
        activeShow={activeShow}
        onSelectView={setActiveView}
        onSelectShow={setActiveShow}
      />

      <main>
        {activeView === 'landing' && (
          <LandingView
            activeShow={activeShow}
            onNavigate={setActiveView}
            onSelectShow={setActiveShow}
            completedStepCount={completedStepCount}
            totalStepCount={totalStepCount}
          />
        )}

        {activeView === 'diagrams' && <DiagramsView />}

        {activeView === 'runbooks' && (
          <RunbooksView
            activeShow={activeShow}
            checkedSteps={checkedSteps}
            onSelectShow={setActiveShow}
            onToggleStep={handleToggleStep}
            onResetShowChecks={handleResetShowChecks}
          />
        )}

        {activeView === 'database' && <DatabaseView />}

        {activeView === 'wiki' && (
          <WikiView
            notes={notes}
            onAddNote={handleAddNote}
            onDeleteNote={handleDeleteNote}
          />
        )}
      </main>
    </div>
  );
}
