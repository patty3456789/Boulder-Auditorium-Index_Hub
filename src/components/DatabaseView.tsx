import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { SYSTEM_DB } from '../data/systemDb';
import { SystemAsset } from '../types';

const CATEGORIES: Array<'All' | SystemAsset['metadata']['category']> = [
  'All',
  'FOH Booth',
  'Stage Right Rack',
  'Black Box Rig',
  'Dolby Atmos Upgrade',
  'Mobile Inventory'
];

export const DatabaseView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedAssetId, setSelectedAssetId] = useState<string>(SYSTEM_DB[0]?.id ?? '');

  const filteredAssets = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SYSTEM_DB.filter((asset) => {
      const catMatch =
        selectedCategory === 'All' || asset.metadata.category === selectedCategory;
      if (!catMatch) return false;
      if (!q) return true;
      return (
        asset.id.toLowerCase().includes(q) ||
        asset.name.toLowerCase().includes(q) ||
        asset.type.toLowerCase().includes(q) ||
        asset.location.toLowerCase().includes(q) ||
        asset.rackPosition.toLowerCase().includes(q) ||
        asset.signalPath.input.toLowerCase().includes(q) ||
        asset.signalPath.output.toLowerCase().includes(q) ||
        asset.terminalRouting.toLowerCase().includes(q) ||
        asset.metadata.notes.toLowerCase().includes(q)
      );
    });
  }, [query, selectedCategory]);

  const activeAsset = useMemo(
    () =>
      filteredAssets.find((a) => a.id === selectedAssetId) ??
      filteredAssets[0] ??
      null,
    [filteredAssets, selectedAssetId]
  );

  return (
    <div className="mx-auto max-w-[1440px] space-y-6 px-4 py-6 sm:px-6">
      {/* Header & Search Controls */}
      <div className="flex flex-col justify-between gap-4 border border-zinc-800 bg-[#121212] p-5 md:flex-row md:items-center">
        <div>
          <h1 className="font-mono text-xl font-semibold text-zinc-100">
            asset db
          </h1>
          <p className="mt-1 font-mono text-xs text-zinc-400">
            {SYSTEM_DB.length} inventoried units · foh rack 01, x32 desk, stage right, black box & atmos
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search model, patch, id, location..."
            className="w-full border border-zinc-800 bg-[#0a0a0a] py-2 pl-9 pr-3 font-mono text-xs text-zinc-100 placeholder:text-zinc-600 focus:border-[#9d7cd8] focus:outline-none"
          />
        </div>
      </div>

      {/* Category Filter Strip */}
      <div className="flex flex-wrap gap-1.5">
        {CATEGORIES.map((category) => {
          const active = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`border px-3 py-1.5 font-mono text-xs transition-colors ${
                active
                  ? 'border-[#9d7cd8] bg-[#9d7cd8]/15 text-[#9d7cd8]'
                  : 'border-zinc-800 bg-[#121212] text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
              }`}
            >
              {category.toLowerCase()}
            </button>
          );
        })}
      </div>

      {/* Master-Detail Split */}
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Asset Table / Cards */}
        <div className="border border-zinc-800 bg-[#121212]">
          <div className="grid grid-cols-[110px_1fr_140px] border-b border-zinc-800 bg-[#0f0f0f] px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider text-zinc-500">
            <span>id</span>
            <span>hardware & rack slot</span>
            <span className="text-right">status</span>
          </div>

          {filteredAssets.length === 0 ? (
            <div className="p-8 text-center font-mono text-xs text-zinc-500">
              No hardware units matched "{query}". Clear search or switch category.
            </div>
          ) : (
            <div className="divide-y divide-zinc-800/80">
              {filteredAssets.map((asset) => {
                const isSelected = activeAsset?.id === asset.id;
                return (
                  <button
                    key={asset.id}
                    type="button"
                    onClick={() => setSelectedAssetId(asset.id)}
                    className={`grid w-full grid-cols-[110px_1fr_140px] items-start gap-2 px-4 py-3 text-left transition-colors ${
                      isSelected
                        ? 'bg-[#9d7cd8]/10'
                        : 'hover:bg-zinc-900/70'
                    }`}
                  >
                    <span
                      className={`font-mono text-xs font-medium ${
                        isSelected ? 'text-[#9d7cd8]' : 'text-zinc-400'
                      }`}
                    >
                      {asset.id}
                    </span>
                    <div className="min-w-0 pr-2">
                      <div className="truncate font-mono text-xs font-semibold text-zinc-100">
                        {asset.name}
                      </div>
                      <div className="mt-0.5 truncate font-mono text-[11px] text-zinc-500">
                        {asset.location} · {asset.rackPosition}
                      </div>
                    </div>
                    <div className="text-right font-mono text-[11px] text-zinc-400">
                      <span
                        className={
                          asset.metadata.status === 'Active'
                            ? 'text-emerald-400'
                            : asset.metadata.status === 'Seasonal'
                            ? 'text-amber-400'
                            : 'text-[#38bdf8]'
                        }
                      >
                        {asset.metadata.status.toLowerCase()}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Detail Inspector */}
        <aside className="h-fit border border-zinc-800 bg-[#121212] p-5 lg:sticky lg:top-20">
          {activeAsset ? (
            <div className="space-y-5">
              <div className="border-b border-zinc-800 pb-4">
                <div className="flex items-center justify-between gap-2 font-mono text-[11px] text-[#9d7cd8]">
                  <span>{activeAsset.id}</span>
                  <span>{activeAsset.metadata.category.toLowerCase()}</span>
                </div>
                <h2 className="mt-1 font-mono text-base font-semibold text-zinc-100">
                  {activeAsset.name}
                </h2>
                <p className="mt-1 font-mono text-xs text-zinc-400">
                  {activeAsset.type} · {activeAsset.location}
                </p>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="border border-zinc-800 bg-[#0a0a0a] p-3">
                  <div className="text-[11px] uppercase tracking-wider text-zinc-500">
                    physical rack / bay
                  </div>
                  <div className="mt-1 text-zinc-200">{activeAsset.rackPosition}</div>
                </div>

                <div className="border border-zinc-800 bg-[#0a0a0a] p-3">
                  <div className="text-[11px] uppercase tracking-wider text-zinc-500">
                    signal input
                  </div>
                  <div className="mt-1 text-zinc-200">{activeAsset.signalPath.input}</div>
                </div>

                <div className="border border-zinc-800 bg-[#0a0a0a] p-3">
                  <div className="text-[11px] uppercase tracking-wider text-zinc-500">
                    signal output
                  </div>
                  <div className="mt-1 text-zinc-200">{activeAsset.signalPath.output}</div>
                </div>

                <div className="border border-zinc-800 bg-[#0a0a0a] p-3">
                  <div className="text-[11px] uppercase tracking-wider text-zinc-500">
                    terminal patch / interconnect
                  </div>
                  <div className="mt-1 text-[#38bdf8]">{activeAsset.terminalRouting}</div>
                </div>
              </div>

              <div className="space-y-1.5 border-t border-zinc-800 pt-4">
                <div className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                  operational notes · managed by {activeAsset.metadata.managedBy}
                </div>
                <p className="text-xs leading-relaxed text-zinc-300">
                  {activeAsset.metadata.notes}
                </p>
              </div>
            </div>
          ) : (
            <div className="font-mono text-xs text-zinc-500">
              Select a hardware asset from the list to inspect patch notes.
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
