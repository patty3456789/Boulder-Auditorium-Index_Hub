import React from 'react';
import { SignalTraceStage } from '../data/signalTraces';
import { CadBlueprint, CadUnit } from '../types';

interface CadSvgRendererProps {
  blueprint: CadBlueprint;
  selectedUnitId: string;
  onSelectUnit: (unitId: string) => void;
  traceStages?: SignalTraceStage[];
  activeTraceStep?: number | null;
}

const STROKE_BASE = '#52525b';
const STROKE_MUTED = '#2e2e36';
const STROKE_INACTIVE_ACCENT = '#a1a1aa';
const STROKE_ACTIVE = '#9d7cd8';
const FILL_SELECTED = '#161221';
const WHITE = '#e4e4e7';
const GRAY_MID = '#71717a';

function renderRackFrame(
  frame: NonNullable<CadBlueprint['rackFrame']>,
  keyPrefix: string
) {
  const railW = 14;
  const ticks = Array.from({ length: Math.min(frame.totalU, 42) }, (_, i) => i);
  const uH = (frame.height - 24) / frame.totalU;

  return (
    <g key={keyPrefix}>
      {/* Outer Steel Cabinet */}
      <rect
        x={frame.x}
        y={frame.y}
        width={frame.width}
        height={frame.height}
        fill="#0d0d10"
        stroke="#3f3f46"
        strokeWidth={1.4}
      />
      {/* Top Header Bar */}
      <rect
        x={frame.x}
        y={frame.y - 14}
        width={frame.width}
        height={14}
        fill="#16161b"
        stroke="#3f3f46"
        strokeWidth={1}
      />
      <text
        x={frame.x + 8}
        y={frame.y - 4}
        fill="#a1a1aa"
        fontSize="8"
        fontFamily="JetBrains Mono, monospace"
        letterSpacing="0.06em"
      >
        {frame.label}
      </text>

      {/* Left & Right 19" Rack Rails */}
      <rect
        x={frame.x + 4}
        y={frame.y + 8}
        width={railW}
        height={frame.height - 16}
        fill="#121216"
        stroke="#27272a"
        strokeWidth={0.9}
      />
      <rect
        x={frame.x + frame.width - railW - 4}
        y={frame.y + 8}
        width={railW}
        height={frame.height - 16}
        fill="#121216"
        stroke="#27272a"
        strokeWidth={0.9}
      />

      {/* U Ruler Ticks & Rail Mounting Holes */}
      {ticks.map((idx) => {
        const ty = frame.y + 12 + idx * uH;
        const showLabel = idx % 4 === 0 || idx === frame.totalU - 1;
        return (
          <g key={`${keyPrefix}-u-${idx}`}>
            <circle cx={frame.x + 11} cy={ty + uH * 0.5} r={1.1} fill="#3f3f46" />
            <circle
              cx={frame.x + frame.width - 11}
              cy={ty + uH * 0.5}
              r={1.1}
              fill="#3f3f46"
            />
            {showLabel && (
              <text
                x={frame.x - 6}
                y={ty + uH * 0.65}
                textAnchor="end"
                fill="#52525b"
                fontSize="6.5"
                fontFamily="JetBrains Mono, monospace"
              >
                U{frame.totalU - idx}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}

function renderMotifArt(
  unit: CadUnit,
  stroke: string,
  accent: string,
  isSelected: boolean
) {
  const { x, y, width, height, motif } = unit;
  const hi = isSelected ? STROKE_ACTIVE : WHITE;
  const sub = isSelected ? WHITE : GRAY_MID;

  switch (motif) {
    case 'furman-ae-m8dx': {
      return (
        <g>
          {/* Upper AE Design / Ford AV Panel */}
          <line x1={x} y1={y + height * 0.45} x2={x + width} y2={y + height * 0.45} stroke={STROKE_MUTED} strokeWidth={0.8} />
          <text x={x + 10} y={y + 13} fill={accent} fontSize="7" fontFamily="JetBrains Mono, monospace">
            AE DESIGN / FORD AV
          </text>
          <rect x={x + width - 18} y={y + 4} width={10} height={10} fill="none" stroke={stroke} strokeWidth={0.8} />
          {/* Lower Furman M-8Dx */}
          <rect x={x + 14} y={y + height * 0.54} width={14} height={12} fill="none" stroke={stroke} strokeWidth={0.8} />
          <circle cx={x + 42} cy={y + height * 0.72} r={4} fill="none" stroke={stroke} strokeWidth={0.8} />
          <rect x={x + 62} y={y + height * 0.55} width={44} height={12} fill="#09090b" stroke={stroke} strokeWidth={0.8} />
          <text x={x + 84} y={y + height * 0.75} textAnchor="middle" fill={hi} fontSize="7" fontFamily="JetBrains Mono, monospace">
            117V
          </text>
          <circle cx={x + width * 0.56} cy={y + height * 0.72} r={2} fill={hi} />
          <rect x={x + width - 38} y={y + height * 0.56} width={16} height={11} fill="none" stroke={hi} strokeWidth={0.9} />
        </g>
      );
    }

    case 'furman-m8x2': {
      if (height <= 36) {
        return (
          <g>
            <rect x={x + 12} y={y + 6} width={14} height={height - 12} fill="none" stroke={stroke} strokeWidth={0.8} />
            <circle cx={x + 38} cy={y + height / 2} r={3.5} fill="none" stroke={stroke} strokeWidth={0.8} />
            <circle cx={x + 52} cy={y + height / 2} r={3.5} fill="none" stroke={stroke} strokeWidth={0.8} />
            <text x={x + width / 2} y={y + height / 2 + 2.5} textAnchor="middle" fill={sub} fontSize="6.5" fontFamily="JetBrains Mono, monospace">
              FURMAN POWER CONDITIONER
            </text>
            <circle cx={x + width - 42} cy={y + height / 2} r={2} fill={hi} />
            <rect x={x + width - 30} y={y + 7} width={16} height={height - 14} fill="none" stroke={hi} strokeWidth={0.9} />
          </g>
        );
      }
      return (
        <g>
          <rect x={x + 14} y={y + 12} width={width - 28} height={height - 24} fill="#09090d" stroke={STROKE_MUTED} strokeWidth={0.8} />
          <rect x={x + 26} y={y + 20} width={68} height={height - 40} fill="#060608" stroke={accent} strokeWidth={0.9} />
          <text x={x + 60} y={y + height / 2 + 2} textAnchor="middle" fill={hi} fontSize="6.5" fontFamily="JetBrains Mono, monospace">
            UPS OK
          </text>
          <text x={x + width - 26} y={y + height / 2 + 2} textAnchor="end" fill={sub} fontSize="7" fontFamily="JetBrains Mono, monospace">
            TRIPP LITE BATTERY BACKUP
          </text>
        </g>
      );
    }

    case 'shure-ua844': {
      const rows = Math.max(1, Math.min(4, Math.round(height / 21)));
      const rowH = height / rows;
      return (
        <g>
          {Array.from({ length: rows }, (_, i) => {
            const ry = y + i * rowH;
            return (
              <g key={`ua-${i}`}>
                {i > 0 && <line x1={x} y1={ry} x2={x + width} y2={ry} stroke={STROKE_MUTED} strokeWidth={0.8} />}
                <circle cx={x + 16} cy={ry + rowH / 2} r={2.4} fill="none" stroke={stroke} strokeWidth={0.8} />
                <circle cx={x + 28} cy={ry + rowH / 2} r={2.4} fill="none" stroke={stroke} strokeWidth={0.8} />
                <rect x={x + 44} y={ry + 4} width={64} height={rowH - 8} fill="none" stroke={STROKE_MUTED} strokeWidth={0.7} />
                <text x={x + 76} y={ry + rowH / 2 + 2.5} textAnchor="middle" fill={sub} fontSize="6" fontFamily="JetBrains Mono, monospace">
                  SHURE UA844+SWB
                </text>
                <circle cx={x + width - 38} cy={ry + rowH / 2} r={1.8} fill={hi} />
                <circle cx={x + width - 22} cy={ry + rowH / 2} r={2.4} fill="none" stroke={stroke} strokeWidth={0.8} />
                <circle cx={x + width - 11} cy={ry + rowH / 2} r={2.4} fill="none" stroke={stroke} strokeWidth={0.8} />
              </g>
            );
          })}
        </g>
      );
    }

    case 'blx4r-pair':
    case 'blx4r-single-blank': {
      const rows = Math.max(1, Math.round(height / 21));
      const rowH = height / rows;
      const halfW = width / 2;
      return (
        <g>
          {Array.from({ length: rows }, (_, r) => {
            const ry = y + r * rowH;
            const isSingleBlank = motif === 'blx4r-single-blank' && r === rows - 2;
            return (
              <g key={`blx-${r}`}>
                {r > 0 && <line x1={x} y1={ry} x2={x + width} y2={ry} stroke={STROKE_MUTED} strokeWidth={0.8} />}
                <line x1={x + halfW} y1={ry} x2={x + halfW} y2={ry + rowH} stroke={STROKE_MUTED} strokeWidth={0.8} />
                {[0, 1].map((col) => {
                  const cx = x + col * halfW;
                  if (isSingleBlank && col === 1) {
                    return (
                      <g key={`blank-${r}-${col}`}>
                        <rect x={cx + 6} y={ry + 4} width={halfW - 12} height={rowH - 8} fill="#0b0b0e" stroke={STROKE_MUTED} strokeDasharray="3 2" strokeWidth={0.7} />
                        <text x={cx + halfW / 2} y={ry + rowH / 2 + 2} textAnchor="middle" fill="#52525b" fontSize="6" fontFamily="JetBrains Mono, monospace">
                          HALF-RACK BLANK
                        </text>
                      </g>
                    );
                  }
                  return (
                    <g key={`rx-${r}-${col}`}>
                      <rect x={cx + 8} y={ry + 5} width={11} height={rowH - 10} fill="none" stroke={sub} strokeWidth={0.8} />
                      <rect x={cx + 26} y={ry + 4} width={44} height={rowH - 8} fill="#09090c" stroke={accent} strokeWidth={0.7} />
                      <circle cx={cx + 82} cy={ry + rowH / 2} r={2.2} fill="none" stroke={stroke} strokeWidth={0.8} />
                      <circle cx={cx + 94} cy={ry + rowH / 2} r={2.2} fill="none" stroke={stroke} strokeWidth={0.8} />
                      <rect x={cx + halfW - 34} y={ry + 6} width={16} height={rowH - 12} fill="none" stroke={STROKE_MUTED} strokeWidth={0.7} />
                    </g>
                  );
                })}
              </g>
            );
          })}
        </g>
      );
    }

    case 'marshall-dual-lcd': {
      const scrW = (width - 36) / 2;
      return (
        <g>
          {[0, 1].map((idx) => {
            const sx = x + 12 + idx * (scrW + 12);
            return (
              <g key={`lcd-${idx}`}>
                <rect x={sx} y={y + 8} width={scrW} height={height - 16} fill="#070709" stroke={accent} strokeWidth={1} />
                <line x1={sx + 4} y1={y + height - 20} x2={sx + scrW - 4} y2={y + height - 20} stroke={STROKE_MUTED} strokeWidth={0.6} />
                <text x={sx + scrW / 2} y={y + height / 2 - 1} textAnchor="middle" fill={sub} fontSize="7" fontFamily="JetBrains Mono, monospace">
                  PREVIEW {idx === 0 ? 'A' : 'B'}
                </text>
              </g>
            );
          })}
        </g>
      );
    }

    case 'crestron-touch': {
      return (
        <g>
          <rect x={x + 28} y={y + 8} width={width - 56} height={height - 16} fill="#09090d" stroke={accent} strokeWidth={1.1} />
          <rect x={x + 36} y={y + 15} width={width - 72} height={height - 30} fill="none" stroke={STROKE_MUTED} strokeWidth={0.8} />
          <text x={x + width / 2} y={y + height / 2 - 2} textAnchor="middle" fill={hi} fontSize="8" fontFamily="JetBrains Mono, monospace">
            CRESTRON TOUCHPANEL
          </text>
          <text x={x + width / 2} y={y + height / 2 + 10} textAnchor="middle" fill={sub} fontSize="6.5" fontFamily="JetBrains Mono, monospace">
            BOULDER PANTHERS EST. 1875
          </text>
        </g>
      );
    }

    case 'crestron-cp4n': {
      const h1 = height * 0.25;
      const h2 = height * 0.5;
      return (
        <g>
          <rect x={x + 12} y={y + 6} width={110} height={h1 - 8} fill="none" stroke={stroke} strokeWidth={0.8} />
          <text x={x + width - 14} y={y + h1 * 0.68} textAnchor="end" fill={hi} fontSize="6.5" fontFamily="JetBrains Mono, monospace">
            CRESTRON CP4N
          </text>
          <line x1={x} y1={y + h1} x2={x + width} y2={y + h1} stroke={STROKE_MUTED} strokeWidth={0.8} />
          <rect x={x + 12} y={y + h1 + 6} width={44} height={h1 - 10} fill="#09090c" stroke={accent} strokeWidth={0.9} />
          <text x={x + 68} y={y + h1 + h1 * 0.65} fill={hi} fontSize="7" fontFamily="JetBrains Mono, monospace">
            QSC Q-SYS CORE 110f
          </text>
          <circle cx={x + width - 18} cy={y + h1 + h1 * 0.5} r={3} fill={hi} />
          <line x1={x} y1={y + h2} x2={x + width} y2={y + h2} stroke={STROKE_MUTED} strokeWidth={0.8} />
          {Array.from({ length: 12 }, (_, v) => (
            <line key={`nvx-${v}`} x1={x + 20 + v * 21} y1={y + h2 + 8} x2={x + 20 + v * 21} y2={y + height - 8} stroke={STROKE_MUTED} strokeWidth={1.2} />
          ))}
        </g>
      );
    }

    case 'listen-server': {
      const h1 = height * 0.45;
      return (
        <g>
          <rect x={x + 16} y={y + 6} width={70} height={h1 - 12} fill="none" stroke={accent} strokeWidth={0.8} />
          <text x={x + 98} y={y + h1 * 0.58} fill={sub} fontSize="6.5" fontFamily="JetBrains Mono, monospace">
            LISTEN ADA WI-FI SERVER
          </text>
          <line x1={x} y1={y + h1} x2={x + width} y2={y + h1} stroke={STROKE_MUTED} strokeWidth={0.8} />
          <rect x={x + 14} y={y + h1 + 8} width={28} height={height - h1 - 16} fill="none" stroke={stroke} strokeWidth={0.9} />
          <text x={x + width / 2} y={y + h1 + (height - h1) / 2 + 2} textAnchor="middle" fill={hi} fontSize="6.5" fontFamily="JetBrains Mono, monospace">
            MASTER POWER (LEAVE ON)
          </text>
          <rect x={x + width - 32} y={y + h1 + 10} width={16} height={10} fill="none" stroke={hi} strokeWidth={0.9} />
        </g>
      );
    }

    case 'crown-xti-4002': {
      const amps = 4;
      const ampH = height / amps;
      const tags = ['AMP 1', 'AMP 2', 'AMP 3', 'RIGHT'];
      return (
        <g>
          {Array.from({ length: amps }, (_, i) => {
            const ay = y + i * ampH;
            return (
              <g key={`xti-${i}`}>
                {i > 0 && <line x1={x} y1={ay} x2={x + width} y2={ay} stroke={STROKE_MUTED} strokeWidth={0.9} />}
                <rect x={x + 10} y={ay + 6} width={66} height={ampH - 12} fill="#08080a" stroke={STROKE_MUTED} strokeWidth={0.8} />
                <rect x={x + width - 76} y={ay + 6} width={66} height={ampH - 12} fill="#08080a" stroke={STROKE_MUTED} strokeWidth={0.8} />
                <circle cx={x + width / 2 - 44} cy={ay + ampH / 2} r={6} fill="none" stroke={stroke} strokeWidth={1} />
                <rect x={x + width / 2 - 28} y={ay + 7} width={56} height={ampH - 14} fill="#09090d" stroke={accent} strokeWidth={0.8} />
                <text x={x + width / 2} y={ay + ampH / 2 + 2} textAnchor="middle" fill={hi} fontSize="6" fontFamily="JetBrains Mono, monospace">
                  PRESET 6
                </text>
                <circle cx={x + width / 2 + 44} cy={ay + ampH / 2} r={6} fill="none" stroke={stroke} strokeWidth={1} />
                <text x={x + 43} y={ay + ampH / 2 + 2.5} textAnchor="middle" fill={i === 3 ? hi : sub} fontSize="6.5" fontFamily="JetBrains Mono, monospace">
                  {tags[i]}
                </text>
              </g>
            );
          })}
        </g>
      );
    }

    case 'genelec-monitor': {
      return (
        <g>
          {[
            { cx: x + 28 },
            { cx: x + width - 28 }
          ].map((mon, idx) => (
            <g key={`gen-${idx}`}>
              <rect
                x={mon.cx - 22}
                y={y + 8}
                width={44}
                height={76}
                rx={8}
                fill="#111116"
                stroke={accent}
                strokeWidth={1.2}
              />
              <circle cx={mon.cx} cy={y + 30} r={8} fill="none" stroke={stroke} strokeWidth={1} />
              <circle cx={mon.cx} cy={y + 60} r={14} fill="none" stroke={stroke} strokeWidth={1} />
              <circle cx={mon.cx} cy={y + 60} r={4} fill="none" stroke={accent} strokeWidth={0.8} />
            </g>
          ))}
        </g>
      );
    }

    case 'x32-preamp-eq': {
      return (
        <g>
          {Array.from({ length: 4 }, (_, r) =>
            Array.from({ length: 5 }, (_, c) => (
              <circle
                key={`x32enc-${r}-${c}`}
                cx={x + 22 + c * 40}
                cy={y + 18 + r * 20}
                r={5.5}
                fill="none"
                stroke={r === 0 && c === 0 ? accent : stroke}
                strokeWidth={0.9}
              />
            ))
          )}
          <text x={x + 8} y={y + height - 6} fill={hi} fontSize="6.5" fontFamily="JetBrains Mono, monospace">
            CONFIG / GATE / DYN / PEQ / BUS SENDS
          </text>
        </g>
      );
    }

    case 'x32-display-mon': {
      return (
        <g>
          <rect x={x + 10} y={y + 8} width={92} height={58} fill="#07070a" stroke={accent} strokeWidth={1.1} />
          <path d={`M ${x + 16} ${y + 44} Q ${x + 56} ${y + 22} ${x + 96} ${y + 48}`} fill="none" stroke="#9d7cd8" strokeWidth={1.2} />
          {Array.from({ length: 6 }, (_, i) => (
            <circle key={`tft-enc-${i}`} cx={x + 18 + i * 15} cy={y + 78} r={3.5} fill="none" stroke={stroke} strokeWidth={0.8} />
          ))}
          <circle cx={x + width - 22} cy={y + 24} r={6} fill="none" stroke={stroke} strokeWidth={0.9} />
          <circle cx={x + width - 22} cy={y + 48} r={6} fill="none" stroke={stroke} strokeWidth={0.9} />
          <line x1={x + width - 10} y1={y + 16} x2={x + width - 4} y2={y + 62} stroke={accent} strokeWidth={1.2} />
        </g>
      );
    }

    case 'x32-faders-left':
    case 'x32-faders-dca': {
      const faderCount = motif === 'x32-faders-left' ? 16 : 9;
      const step = (width - 16) / faderCount;
      return (
        <g>
          {Array.from({ length: faderCount }, (_, i) => {
            const fx = x + 8 + i * step + step / 2;
            const capOffset = ((i * 19) % 48) + 46;
            const isMain = motif === 'x32-faders-dca' && i === faderCount - 1;
            return (
              <g key={`fad-${i}`}>
                <rect
                  x={fx - step * 0.38}
                  y={y + 10}
                  width={step * 0.76}
                  height={11}
                  fill="#09090d"
                  stroke={isMain ? WHITE : i % 2 === 0 ? accent : '#9d7cd8'}
                  strokeWidth={0.7}
                />
                <line x1={fx} y1={y + 30} x2={fx} y2={y + height - 12} stroke={STROKE_MUTED} strokeWidth={1.2} />
                <rect
                  x={fx - 4.5}
                  y={y + capOffset}
                  width={9}
                  height={13}
                  fill="#18181b"
                  stroke={isMain ? '#9d7cd8' : stroke}
                  strokeWidth={0.9}
                />
              </g>
            );
          })}
        </g>
      );
    }

    case 'x32-scenes-assign': {
      return (
        <g>
          <text x={x + 8} y={y + 16} fill={hi} fontSize="6.5" fontFamily="JetBrains Mono, monospace">
            SCENES / ASSIGN / MUTE GRP
          </text>
          {Array.from({ length: 4 }, (_, r) =>
            Array.from({ length: 4 }, (_, c) => (
              <rect
                key={`ass-${r}-${c}`}
                x={x + 12 + c * 32}
                y={y + 28 + r * 26}
                width={22}
                height={14}
                fill="#09090d"
                stroke={r === 3 ? accent : stroke}
                strokeWidth={0.8}
              />
            ))
          )}
        </g>
      );
    }

    case 'atmos-staged-boxes': {
      return (
        <g>
          {[0, 1, 2].map((b) => (
            <g key={`box-${b}`}>
              <rect
                x={x + 14 + b * 124}
                y={y + 16}
                width={108}
                height={height - 26}
                fill="#111114"
                stroke={stroke}
                strokeDasharray="4 2"
                strokeWidth={0.9}
              />
              <text x={x + 68 + b * 124} y={y + height / 2 + 4} textAnchor="middle" fill={sub} fontSize="6.5" fontFamily="JetBrains Mono, monospace">
                ATMOS STAGE #{b + 1}
              </text>
            </g>
          ))}
        </g>
      );
    }

    case 'bhs-conduit-trunk': {
      return (
        <g>
          <rect x={x + 18} y={y + 6} width={64} height={24} fill="#111116" stroke={stroke} strokeWidth={1} />
          <text x={x + 50} y={y + 21} textAnchor="middle" fill={sub} fontSize="6.5" fontFamily="JetBrains Mono, monospace">
            MDBA PANEL
          </text>
          {Array.from({ length: 6 }, (_, i) => (
            <path
              key={`cat6-${i}`}
              d={`M ${x + 130 + i * 16} ${y + 6} C ${x + 130 + i * 16} ${y + 30}, ${x + 140 + i * 10} ${y + 34}, ${x + 140 + i * 10} ${y + height}`}
              fill="none"
              stroke="#9d7cd8"
              strokeWidth={1.3}
              opacity={0.75}
            />
          ))}
        </g>
      );
    }

    case 'bhs-atmos-rack-unit': {
      const slices = Math.max(2, Math.round(height / 36));
      const sliceH = height / slices;
      return (
        <g>
          {Array.from({ length: slices }, (_, i) => {
            const sy = y + i * sliceH;
            return (
              <g key={`bhs-u-${i}`}>
                {i > 0 && <line x1={x} y1={sy} x2={x + width} y2={sy} stroke={STROKE_MUTED} strokeWidth={0.8} />}
                <rect x={x + 10} y={sy + 7} width={width - 60} height={sliceH - 14} fill="none" stroke={STROKE_MUTED} strokeDasharray="2 2" strokeWidth={0.7} />
                <circle cx={x + width - 32} cy={sy + sliceH / 2} r={2} fill={hi} />
                <rect x={x + width - 20} y={sy + 6} width={14} height={sliceH - 12} fill="#18181b" stroke={accent} strokeWidth={0.7} />
              </g>
            );
          })}
        </g>
      );
    }

    case 'servoreeler-src': {
      return (
        <g>
          <rect x={x + 12} y={y + 15} width={16} height={height - 30} fill="none" stroke={hi} strokeWidth={1} />
          <text x={x + width / 2} y={y + height / 2 + 2.5} textAnchor="middle" fill={sub} fontSize="7" fontFamily="JetBrains Mono, monospace">
            SERVOREELER SRC
          </text>
          <circle cx={x + width - 36} cy={y + height / 2} r={6} fill="none" stroke={hi} strokeWidth={1} />
          <circle cx={x + width - 16} cy={y + height / 2} r={6} fill="none" stroke={accent} strokeWidth={1} />
        </g>
      );
    }

    case 'clearcom-ms702': {
      return (
        <g>
          <rect x={x + 10} y={y + 6} width={32} height={height - 12} fill="none" stroke={stroke} strokeWidth={0.8} />
          <circle cx={x + 62} cy={y + height / 2} r={5} fill="none" stroke={accent} strokeWidth={1} />
          <circle cx={x + 86} cy={y + height / 2} r={5} fill="none" stroke={accent} strokeWidth={1} />
          <text x={x + width - 12} y={y + height / 2 + 2.5} textAnchor="end" fill={sub} fontSize="6.5" fontFamily="JetBrains Mono, monospace">
            CLEAR-COM MS-702 · CH A / B
          </text>
        </g>
      );
    }

    case 'clearcom-dx210': {
      return (
        <g>
          <line x1={x + 14} y1={y + height - 5} x2={x + 14} y2={y + 4} stroke={accent} strokeWidth={1.3} />
          <line x1={x + width - 14} y1={y + height - 5} x2={x + width - 14} y2={y + 4} stroke={accent} strokeWidth={1.3} />
          <rect x={x + 36} y={y + 6} width={width - 72} height={height - 12} fill="#09090d" stroke={stroke} strokeWidth={0.8} />
          <text x={x + width / 2} y={y + height / 2 + 2.5} textAnchor="middle" fill={hi} fontSize="6.5" fontFamily="JetBrains Mono, monospace">
            HME DX210 · 2.4GHz
          </text>
        </g>
      );
    }

    case 'crown-xls1000': {
      return (
        <g>
          <circle cx={x + 28} cy={y + height / 2} r={7} fill="none" stroke={stroke} strokeWidth={1} />
          <rect x={x + 54} y={y + 10} width={width - 108} height={height - 20} fill="#09090d" stroke={accent} strokeWidth={0.9} />
          <text x={x + width / 2} y={y + height / 2 + 2.5} textAnchor="middle" fill={hi} fontSize="6.5" fontFamily="JetBrains Mono, monospace">
            STEREO BYPASS
          </text>
          <circle cx={x + width - 28} cy={y + height / 2} r={7} fill="none" stroke={stroke} strokeWidth={1} />
        </g>
      );
    }

    case 'behringer-inuke': {
      const units = 3;
      const uh = height / units;
      return (
        <g>
          {Array.from({ length: units }, (_, i) => {
            const uy = y + i * uh;
            return (
              <g key={`inuke-${i}`}>
                {i > 0 && <line x1={x} y1={uy} x2={x + width} y2={uy} stroke={STROKE_MUTED} strokeWidth={0.8} />}
                <rect x={x + 12} y={uy + 6} width={44} height={uh - 12} fill="#08080a" stroke={STROKE_MUTED} strokeWidth={0.8} />
                <circle cx={x + width / 2 - 22} cy={uy + uh / 2} r={6} fill="none" stroke={accent} strokeWidth={1} />
                <circle cx={x + width / 2 + 22} cy={uy + uh / 2} r={6} fill="none" stroke={accent} strokeWidth={1} />
                <rect x={x + width - 56} y={uy + 6} width={44} height={uh - 12} fill="#08080a" stroke={STROKE_MUTED} strokeWidth={0.8} />
              </g>
            );
          })}
        </g>
      );
    }

    case 'behringer-s16': {
      const cols = 10;
      const spacing = (width - 40) / (cols - 1);
      return (
        <g>
          {Array.from({ length: cols }, (_, col) =>
            [0, 1].map((row) => (
              <circle
                key={`xlr-${col}-${row}`}
                cx={x + 20 + col * spacing}
                cy={y + 24 + row * 26}
                r={6.5}
                fill="#070709"
                stroke={row === 1 ? accent : stroke}
                strokeWidth={0.9}
              />
            ))
          )}
        </g>
      );
    }

    case 'etc-quicktouch': {
      return (
        <g>
          <rect x={x + 12} y={y + 14} width={width - 24} height={height - 28} fill="#09090d" stroke={stroke} strokeWidth={1} />
          <rect x={x + 28} y={y + 26} width={width - 56} height={56} fill="#050507" stroke={accent} strokeWidth={1} />
          <text x={x + width / 2} y={y + 57} textAnchor="middle" fill={hi} fontSize="7" fontFamily="JetBrains Mono, monospace">
            ETC QUICKTOUCH RIGGING
          </text>
          <circle cx={x + 44} cy={y + height - 38} r={11} fill="none" stroke={hi} strokeWidth={1.1} />
          <circle cx={x + width - 44} cy={y + height - 38} r={12} fill="none" stroke={accent} strokeWidth={1.3} />
        </g>
      );
    }

    case 'si-faders-bank': {
      const faders = 14;
      const step = (width - 16) / faders;
      return (
        <g>
          {Array.from({ length: faders }, (_, i) => {
            const fx = x + 8 + i * step + step / 2;
            const pos = ((i * 29) % 72) + 74;
            return (
              <g key={`sif-${i}`}>
                <circle cx={fx} cy={y + 22} r={3.5} fill="none" stroke={stroke} strokeWidth={0.8} />
                <rect x={fx - 3} y={y + 34} width={6} height={24} fill="none" stroke={sub} strokeWidth={0.7} />
                <line x1={fx} y1={y + 68} x2={fx} y2={y + height - 16} stroke={STROKE_MUTED} strokeWidth={1.1} />
                <rect x={fx - 4.5} y={y + pos} width={9} height={14} fill="#18181b" stroke={i >= faders - 2 ? hi : accent} strokeWidth={0.9} />
              </g>
            );
          })}
        </g>
      );
    }

    case 'si-strip-dsp': {
      const cols = [WHITE, '#9d7cd8', '#a1a1aa', '#c4b5fd'];
      return (
        <g>
          {cols.map((colColor, cIdx) => {
            const bx = x + 12 + cIdx * 66;
            return (
              <g key={`si-col-${cIdx}`}>
                <rect x={bx} y={y + 12} width={58} height={height - 24} fill="none" stroke={colColor} strokeWidth={0.9} />
                {[0, 1, 2].map((kr) => (
                  <circle key={`k-${cIdx}-${kr}`} cx={bx + 29} cy={y + 36 + kr * 38} r={8} fill="none" stroke={colColor} strokeWidth={0.9} />
                ))}
              </g>
            );
          })}
        </g>
      );
    }

    case 'radial-proav1': {
      return (
        <g>
          <rect x={x + 12} y={y + 12} width={width - 24} height={height - 24} fill="#101015" stroke={hi} strokeWidth={1.2} />
          <text x={x + width / 2} y={y + 36} textAnchor="middle" fill={hi} fontSize="8" fontFamily="JetBrains Mono, monospace">
            RADIAL PROAV1
          </text>
          <circle cx={x + 40} cy={y + 72} r={8} fill="none" stroke={stroke} strokeWidth={1} />
          <circle cx={x + 74} cy={y + 72} r={8} fill="none" stroke={stroke} strokeWidth={1} />
          <rect x={x + width - 56} y={y + 62} width={28} height={18} fill="none" stroke={accent} strokeWidth={0.9} />
          <text x={x + width / 2} y={y + height - 24} textAnchor="middle" fill={sub} fontSize="6.5" fontFamily="JetBrains Mono, monospace">
            GND LIFT · -15dB PAD
          </text>
        </g>
      );
    }

    default:
      return (
        <text x={x + 12} y={y + height / 2 + 3} fill={sub} fontSize="8" fontFamily="JetBrains Mono, monospace">
          {unit.title}
        </text>
      );
  }
}

export const CadSvgRenderer: React.FC<CadSvgRendererProps> = ({
  blueprint,
  selectedUnitId,
  onSelectUnit,
  traceStages = [],
  activeTraceStep = null
}) => {
  const selectedUnit =
    blueprint.units.find((u) => u.id === selectedUnitId) ?? blueprint.units[0];

  const traceByUnitId = new Map<string, SignalTraceStage>();
  const stagesOnBlueprint = traceStages
    .filter((st) => st.blueprintId === blueprint.id)
    .sort((a, b) => a.step - b.step);

  for (const st of stagesOnBlueprint) {
    traceByUnitId.set(st.unitId, st);
  }

  // Build sequential intra-blueprint trace flow vectors strictly in purple/white
  const intraFlowEdges: Array<{
    from: CadUnit;
    to: CadUnit;
    isCurrentSegment: boolean;
  }> = [];

  for (let i = 0; i < stagesOnBlueprint.length - 1; i++) {
    const a = stagesOnBlueprint[i];
    const b = stagesOnBlueprint[i + 1];
    // Only connect consecutive global steps on this blueprint
    if (b.step === a.step + 1) {
      const fromUnit = blueprint.units.find((u) => u.id === a.unitId);
      const toUnit = blueprint.units.find((u) => u.id === b.unitId);
      if (fromUnit && toUnit) {
        intraFlowEdges.push({
          from: fromUnit,
          to: toUnit,
          isCurrentSegment:
            activeTraceStep === a.step || activeTraceStep === b.step
        });
      }
    }
  }

  // Calculate crisp horizontal elbow leader line from active unit to right inspector edge (x = svgWidth)
  const leaderPoints = (() => {
    if (!selectedUnit) return '';
    const startX = selectedUnit.x + selectedUnit.width;
    const startY = selectedUnit.y + selectedUnit.height / 2;
    const elbowX = Math.min(blueprint.svgWidth - 18, startX + 26);
    const endX = blueprint.svgWidth;
    return `${startX},${startY} ${elbowX},${startY} ${endX},${startY}`;
  })();

  return (
    <svg
      viewBox={`0 0 ${blueprint.svgWidth} ${blueprint.svgHeight}`}
      className="h-auto w-full select-none bg-[#09090b]"
      role="img"
      aria-label={blueprint.title}
    >
      <defs>
        <pattern
          id={`cad-grid-${blueprint.id}`}
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 24 0 L 0 0 0 24"
            fill="none"
            stroke="#16161b"
            strokeWidth="0.7"
          />
        </pattern>
        <filter id="cad-purple-glow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="0" stdDeviation="2.6" floodColor="#9d7cd8" floodOpacity="0.45" />
        </filter>
        <marker
          id="trace-arrow-purple"
          markerWidth="7"
          markerHeight="7"
          refX="6"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0.5, 6.5 3.5, 0 6.5" fill="#9d7cd8" />
        </marker>
        <marker
          id="trace-arrow-white"
          markerWidth="7"
          markerHeight="7"
          refX="6"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0.5, 6.5 3.5, 0 6.5" fill="#e4e4e7" />
        </marker>
      </defs>

      {/* Architectural CAD Background Grid */}
      <rect
        x="0"
        y="0"
        width={blueprint.svgWidth}
        height={blueprint.svgHeight}
        fill={`url(#cad-grid-${blueprint.id})`}
      />

      {/* Console Roadcase / Desk Outline for Console Layouts */}
      {blueprint.layoutType === 'console-desk' && (
        <g>
          <polygon
            points={`24,28 ${blueprint.svgWidth - 24},28 ${blueprint.svgWidth - 12},470 12,470`}
            fill="#0d0d11"
            stroke="#3f3f46"
            strokeWidth={1.3}
          />
          <rect
            x="24"
            y="456"
            width={blueprint.svgWidth - 48}
            height="14"
            fill="#15151a"
            stroke="#3f3f46"
            strokeWidth={1}
          />
          <text
            x="34"
            y="466"
            fill="#71717a"
            fontSize="7.5"
            fontFamily="JetBrains Mono, monospace"
          >
            {blueprint.id === 'foh-x32-console'
              ? 'CUSTOM PURPLE FOH ROADCASE BEZEL'
              : 'SOUNDCRAFT SI EXPRESSION 3 + PROAV1 WORK SURFACE'}
          </text>
        </g>
      )}

      {/* Primary & Optional Secondary 19" Rack Frames */}
      {blueprint.rackFrame && renderRackFrame(blueprint.rackFrame, 'primary')}
      {blueprint.secondaryRackFrame &&
        renderRackFrame(blueprint.secondaryRackFrame, 'secondary')}

      {/* Interactive Hardware Units */}
      {blueprint.units.map((unit) => {
        const isSelected = unit.id === selectedUnit?.id;
        const traceStage = traceByUnitId.get(unit.id);
        const isTraced = Boolean(traceStage);
        const isCurrentTraceStep =
          Boolean(traceStage) && traceStage?.step === activeTraceStep;

        const stroke =
          isSelected || isCurrentTraceStep
            ? STROKE_ACTIVE
            : isTraced
            ? '#c4b5fd'
            : STROKE_BASE;
        const accent =
          isSelected || isTraced ? WHITE : STROKE_INACTIVE_ACCENT;

        return (
          <g
            key={unit.id}
            onClick={() => onSelectUnit(unit.id)}
            className="cursor-pointer group"
            filter={
              isSelected || isCurrentTraceStep
                ? 'url(#cad-purple-glow)'
                : undefined
            }
          >
            <rect
              x={unit.x}
              y={unit.y}
              width={unit.width}
              height={unit.height}
              fill={
                isSelected || isCurrentTraceStep
                  ? FILL_SELECTED
                  : isTraced
                  ? '#14111c'
                  : '#121216'
              }
              stroke={stroke}
              strokeWidth={
                isSelected || isCurrentTraceStep ? 1.7 : isTraced ? 1.35 : 1
              }
              strokeDasharray={
                isTraced && !isSelected && !isCurrentTraceStep ? '5 2' : undefined
              }
              className="transition-colors"
            />

            {/* Rack mounting corner screws for rack units */}
            {unit.rackUnits && (
              <g>
                <circle cx={unit.x + 5} cy={unit.y + 6} r={1.3} fill={stroke} />
                <circle cx={unit.x + unit.width - 5} cy={unit.y + 6} r={1.3} fill={stroke} />
                <circle cx={unit.x + 5} cy={unit.y + unit.height - 6} r={1.3} fill={stroke} />
                <circle cx={unit.x + unit.width - 5} cy={unit.y + unit.height - 6} r={1.3} fill={stroke} />
              </g>
            )}

            {/* Photo-traced internal CAD line-art motif */}
            {renderMotifArt(unit, stroke, accent, isSelected || isTraced)}

            {/* Slot index badge inside left corner */}
            <text
              x={unit.x + 12}
              y={unit.y + (unit.height <= 28 ? 8.5 : 10)}
              fill={isSelected || isTraced ? STROKE_ACTIVE : '#71717a'}
              fontSize="6"
              fontFamily="JetBrains Mono, monospace"
            >
              {unit.slotLabel}
            </text>

            {/* Sequential Trace Step Badge (Top-Right Corner of Traced Unit) */}
            {traceStage && (
              <g pointerEvents="none">
                <rect
                  x={unit.x + unit.width - 24}
                  y={unit.y + 3}
                  width={18}
                  height={14}
                  fill={isCurrentTraceStep ? '#9d7cd8' : '#181424'}
                  stroke={isCurrentTraceStep ? WHITE : '#9d7cd8'}
                  strokeWidth={1}
                />
                <text
                  x={unit.x + unit.width - 15}
                  y={unit.y + 12.5}
                  textAnchor="middle"
                  fill={isCurrentTraceStep ? '#0a0a0a' : WHITE}
                  fontSize="8"
                  fontWeight="700"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {traceStage.step}
                </text>
              </g>
            )}
          </g>
        );
      })}

      {/* Signal Flow Trace Directional Connectors (Strictly Purple & White) */}
      {stagesOnBlueprint.length > 0 && (
        <g pointerEvents="none">
          {intraFlowEdges.map((edge, idx) => {
            const laneX =
              blueprint.layoutType === 'console-desk'
                ? (edge.from.x + edge.from.width / 2 + edge.to.x + edge.to.width / 2) / 2
                : Math.min(edge.from.x, edge.to.x) - 14 - (idx % 2) * 8;

            const startX =
              blueprint.layoutType === 'console-desk'
                ? edge.from.x + edge.from.width / 2
                : edge.from.x;
            const startY = edge.from.y + edge.from.height / 2;
            const endX =
              blueprint.layoutType === 'console-desk'
                ? edge.to.x + edge.to.width / 2
                : edge.to.x;
            const endY = edge.to.y + edge.to.height / 2;

            const pathD =
              blueprint.layoutType === 'console-desk'
                ? `M ${startX} ${startY} L ${laneX} ${(startY + endY) / 2} L ${endX} ${endY}`
                : `M ${startX} ${startY} L ${laneX} ${startY} L ${laneX} ${endY} L ${endX - 2} ${endY}`;

            return (
              <path
                key={`trace-edge-${edge.from.id}-${edge.to.id}`}
                d={pathD}
                fill="none"
                stroke={edge.isCurrentSegment ? WHITE : STROKE_ACTIVE}
                strokeWidth={edge.isCurrentSegment ? 2.1 : 1.5}
                strokeDasharray={edge.isCurrentSegment ? undefined : '4 2'}
                markerEnd={
                  edge.isCurrentSegment
                    ? 'url(#trace-arrow-white)'
                    : 'url(#trace-arrow-purple)'
                }
                filter="url(#cad-purple-glow)"
              />
            );
          })}

          {/* Inter-Rack Entry / Exit Flow Annotations */}
          {stagesOnBlueprint.map((st) => {
            const unit = blueprint.units.find((u) => u.id === st.unitId);
            if (!unit) return null;
            const midY = unit.y + unit.height / 2;
            const isActive = st.step === activeTraceStep;
            const lineColor = isActive ? WHITE : STROKE_ACTIVE;

            return (
              <g key={`io-vec-${st.step}`}>
                {st.linkInLabel && (
                  <g>
                    <line
                      x1={Math.max(8, unit.x - 42)}
                      y1={midY}
                      x2={unit.x - 3}
                      y2={midY}
                      stroke={lineColor}
                      strokeWidth={1.6}
                      markerEnd={
                        isActive
                          ? 'url(#trace-arrow-white)'
                          : 'url(#trace-arrow-purple)'
                      }
                    />
                    <rect
                      x={4}
                      y={midY - 14}
                      width={Math.min(130, st.linkInLabel.length * 4.5 + 10)}
                      height={11}
                      fill="#0a0a0a"
                      stroke="#9d7cd8"
                      strokeWidth={0.7}
                    />
                    <text
                      x={8}
                      y={midY - 6}
                      fill={WHITE}
                      fontSize="5.5"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {st.linkInLabel}
                    </text>
                  </g>
                )}

                {st.linkOutLabel && (
                  <g>
                    <line
                      x1={unit.x + unit.width}
                      y1={midY + (st.unitId === selectedUnit?.id ? 10 : 0)}
                      x2={Math.min(blueprint.svgWidth - 8, unit.x + unit.width + 66)}
                      y2={midY + (st.unitId === selectedUnit?.id ? 10 : 0)}
                      stroke={lineColor}
                      strokeWidth={1.6}
                      markerEnd={
                        isActive
                          ? 'url(#trace-arrow-white)'
                          : 'url(#trace-arrow-purple)'
                      }
                    />
                    <rect
                      x={Math.min(
                        blueprint.svgWidth - 134,
                        unit.x + unit.width + 8
                      )}
                      y={midY + (st.unitId === selectedUnit?.id ? 14 : 4)}
                      width={Math.min(126, st.linkOutLabel.length * 4.5 + 10)}
                      height={11}
                      fill="#0a0a0a"
                      stroke={st.isSpeakerExit ? WHITE : '#9d7cd8'}
                      strokeWidth={0.8}
                    />
                    <text
                      x={Math.min(
                        blueprint.svgWidth - 130,
                        unit.x + unit.width + 12
                      )}
                      y={midY + (st.unitId === selectedUnit?.id ? 22 : 12)}
                      fill={st.isSpeakerExit ? WHITE : '#c4b5fd'}
                      fontSize="5.5"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {st.linkOutLabel}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </g>
      )}

      {/* Horizontal Elbow Leader Line Connecting Selected Hardware Unit to Inspector Panel */}
      {selectedUnit && leaderPoints && (
        <g pointerEvents="none">
          <polyline
            points={leaderPoints}
            fill="none"
            stroke={STROKE_ACTIVE}
            strokeWidth={1.6}
            strokeDasharray="4 2"
          />
          <circle
            cx={selectedUnit.x + selectedUnit.width}
            cy={selectedUnit.y + selectedUnit.height / 2}
            r={3.5}
            fill={STROKE_ACTIVE}
          />
          <circle
            cx={blueprint.svgWidth - 3}
            cy={selectedUnit.y + selectedUnit.height / 2}
            r={3}
            fill={STROKE_ACTIVE}
          />
        </g>
      )}
    </svg>
  );
};

