import React from 'react';
import { CadBlueprint, CadUnit } from '../types';

interface CadSvgRendererProps {
  blueprint: CadBlueprint;
  selectedUnitId: string;
  onSelectUnit: (unitId: string) => void;
}

const STROKE_BASE = '#52525b';
const STROKE_MUTED = '#2e2e36';
const STROKE_HOVER = '#9d7cd8';
const STROKE_ACTIVE = '#38bdf8';

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

function renderMotifArt(unit: CadUnit, stroke: string, accent: string) {
  const { x, y, width, height, motif } = unit;

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
          <text x={x + 84} y={y + height * 0.75} textAnchor="middle" fill={accent} fontSize="7" fontFamily="JetBrains Mono, monospace">
            117V
          </text>
          <circle cx={x + width * 0.56} cy={y + height * 0.72} r={2} fill="#22c55e" />
          <rect x={x + width - 38} y={y + height * 0.56} width={16} height={11} fill="none" stroke="#ef4444" strokeWidth={0.9} />
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
                <text x={x + 76} y={ry + rowH / 2 + 2.5} textAnchor="middle" fill={stroke} fontSize="6" fontFamily="JetBrains Mono, monospace">
                  SHURE UA844+SWB
                </text>
                <circle cx={x + width - 38} cy={ry + rowH / 2} r={1.8} fill="#22c55e" />
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
                      {/* Yellow number tag */}
                      <rect x={cx + 8} y={ry + 5} width={11} height={rowH - 10} fill="none" stroke="#eab308" strokeWidth={0.8} />
                      {/* LCD screen */}
                      <rect x={cx + 26} y={ry + 4} width={44} height={rowH - 8} fill="#09090c" stroke={accent} strokeWidth={0.7} />
                      {/* Group/Channel buttons + RF bars */}
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
                <text x={sx + scrW / 2} y={y + height / 2 - 1} textAnchor="middle" fill={stroke} fontSize="7" fontFamily="JetBrains Mono, monospace">
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
          <text x={x + width / 2} y={y + height / 2 - 2} textAnchor="middle" fill={accent} fontSize="8" fontFamily="JetBrains Mono, monospace">
            CRESTRON TOUCHPANEL
          </text>
          <text x={x + width / 2} y={y + height / 2 + 10} textAnchor="middle" fill={stroke} fontSize="6.5" fontFamily="JetBrains Mono, monospace">
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
          {/* CP4N 1U */}
          <rect x={x + 12} y={y + 6} width={110} height={h1 - 8} fill="none" stroke={stroke} strokeWidth={0.8} />
          <text x={x + width - 14} y={y + h1 * 0.68} textAnchor="end" fill={accent} fontSize="6.5" fontFamily="JetBrains Mono, monospace">
            CRESTRON CP4N
          </text>
          <line x1={x} y1={y + h1} x2={x + width} y2={y + h1} stroke={STROKE_MUTED} strokeWidth={0.8} />
          {/* Q-SYS Core 110f 1U */}
          <rect x={x + 12} y={y + h1 + 6} width={44} height={h1 - 10} fill="#09090c" stroke={accent} strokeWidth={0.9} />
          <text x={x + 68} y={y + h1 + h1 * 0.65} fill={accent} fontSize="7" fontFamily="JetBrains Mono, monospace">
            QSC Q-SYS CORE 110f
          </text>
          <circle cx={x + width - 18} cy={y + h1 + h1 * 0.5} r={3} fill="#22c55e" />
          <line x1={x} y1={y + h2} x2={x + width} y2={y + h2} stroke={STROKE_MUTED} strokeWidth={0.8} />
          {/* Vented NVX shelf */}
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
          <text x={x + 98} y={y + h1 * 0.58} fill={stroke} fontSize="6.5" fontFamily="JetBrains Mono, monospace">
            LISTEN ADA WI-FI SERVER
          </text>
          <line x1={x} y1={y + h1} x2={x + width} y2={y + h1} stroke={STROKE_MUTED} strokeWidth={0.8} />
          {/* Lower Furman M-8x2 */}
          <rect x={x + 14} y={y + h1 + 8} width={28} height={height - h1 - 16} fill="none" stroke={stroke} strokeWidth={0.9} />
          <text x={x + width / 2} y={y + h1 + (height - h1) / 2 + 2} textAnchor="middle" fill="#eab308" fontSize="6.5" fontFamily="JetBrains Mono, monospace">
            MASTER POWER (LEAVE ON)
          </text>
          <rect x={x + width - 32} y={y + h1 + 10} width={16} height={10} fill="none" stroke="#ef4444" strokeWidth={0.9} />
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
                {/* Left & Right Vent Grilles */}
                <rect x={x + 10} y={ay + 6} width={66} height={ampH - 12} fill="#08080a" stroke={STROKE_MUTED} strokeWidth={0.8} />
                <rect x={x + width - 76} y={ay + 6} width={66} height={ampH - 12} fill="#08080a" stroke={STROKE_MUTED} strokeWidth={0.8} />
                {/* Center LCD + 2 Gain Knobs */}
                <circle cx={x + width / 2 - 44} cy={ay + ampH / 2} r={6} fill="none" stroke={stroke} strokeWidth={1} />
                <rect x={x + width / 2 - 28} y={ay + 7} width={56} height={ampH - 14} fill="#09090d" stroke={accent} strokeWidth={0.8} />
                <text x={x + width / 2} y={ay + ampH / 2 + 2} textAnchor="middle" fill={accent} fontSize="6" fontFamily="JetBrains Mono, monospace">
                  PRESET 6
                </text>
                <circle cx={x + width / 2 + 44} cy={ay + ampH / 2} r={6} fill="none" stroke={stroke} strokeWidth={1} />
                <text x={x + 43} y={ay + ampH / 2 + 2.5} textAnchor="middle" fill={i === 3 ? '#eab308' : '#38bdf8'} fontSize="6.5" fontFamily="JetBrains Mono, monospace">
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
          {/* Left & Right Genelec Monitors angled inward */}
          {[
            { cx: x + 28, dir: 1 },
            { cx: x + width - 28, dir: -1 }
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
          {/* 4 rows of Channel Strip Encoders */}
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
          <text x={x + 8} y={y + height - 6} fill={accent} fontSize="6.5" fontFamily="JetBrains Mono, monospace">
            CONFIG / GATE / DYN / PEQ / BUS SENDS
          </text>
        </g>
      );
    }

    case 'x32-display-mon': {
      return (
        <g>
          {/* 7-inch TFT screen */}
          <rect x={x + 10} y={y + 8} width={92} height={58} fill="#07070a" stroke={accent} strokeWidth={1.1} />
          <path d={`M ${x + 16} ${y + 44} Q ${x + 56} ${y + 22} ${x + 96} ${y + 48}`} fill="none" stroke="#9d7cd8" strokeWidth={1.2} />
          {/* 6 Push Encoders below TFT */}
          {Array.from({ length: 6 }, (_, i) => (
            <circle key={`tft-enc-${i}`} cx={x + 18 + i * 15} cy={y + 78} r={3.5} fill="none" stroke={stroke} strokeWidth={0.8} />
          ))}
          {/* Talkback & Monitor knobs on right */}
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
                {/* Scribble Strip LCD */}
                <rect
                  x={fx - step * 0.38}
                  y={y + 10}
                  width={step * 0.76}
                  height={11}
                  fill="#09090d"
                  stroke={isMain ? '#ef4444' : i % 2 === 0 ? accent : '#9d7cd8'}
                  strokeWidth={0.7}
                />
                {/* Fader track */}
                <line x1={fx} y1={y + 30} x2={fx} y2={y + height - 12} stroke={STROKE_MUTED} strokeWidth={1.2} />
                {/* Fader cap */}
                <rect
                  x={fx - 4.5}
                  y={y + capOffset}
                  width={9}
                  height={13}
                  fill="#18181b"
                  stroke={isMain ? '#ef4444' : stroke}
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
          <text x={x + 8} y={y + 16} fill={accent} fontSize="6.5" fontFamily="JetBrains Mono, monospace">
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
                stroke={r === 3 ? '#ef4444' : stroke}
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
              <text x={x + 68 + b * 124} y={y + height / 2 + 4} textAnchor="middle" fill={stroke} fontSize="6.5" fontFamily="JetBrains Mono, monospace">
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
          {/* Wall conduit boxes and bundled blue Cat6 cables dropping into rack */}
          <rect x={x + 18} y={y + 6} width={64} height={24} fill="#111116" stroke={stroke} strokeWidth={1} />
          <text x={x + 50} y={y + 21} textAnchor="middle" fill={stroke} fontSize="6.5" fontFamily="JetBrains Mono, monospace">
            MDBA PANEL
          </text>
          {Array.from({ length: 6 }, (_, i) => (
            <path
              key={`cat6-${i}`}
              d={`M ${x + 130 + i * 16} ${y + 6} C ${x + 130 + i * 16} ${y + 30}, ${x + 140 + i * 10} ${y + 34}, ${x + 140 + i * 10} ${y + height}`}
              fill="none"
              stroke="#38bdf8"
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
          {/* Perforated mesh door overlay lines */}
          {Array.from({ length: slices }, (_, i) => {
            const sy = y + i * sliceH;
            return (
              <g key={`bhs-u-${i}`}>
                {i > 0 && <line x1={x} y1={sy} x2={x + width} y2={sy} stroke={STROKE_MUTED} strokeWidth={0.8} />}
                <rect x={x + 10} y={sy + 7} width={width - 60} height={sliceH - 14} fill="none" stroke={STROKE_MUTED} strokeDasharray="2 2" strokeWidth={0.7} />
                <circle cx={x + width - 32} cy={sy + sliceH / 2} r={2} fill="#22c55e" />
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
          <rect x={x + 12} y={y + 16} width={16} height={18} fill="none" stroke="#f59e0b" strokeWidth={1} />
          <text x={x + width / 2} y={y + height / 2 + 2} textAnchor="middle" fill={stroke} fontSize="7" fontFamily="JetBrains Mono, monospace">
            SERVOREELER SRC
          </text>
          <circle cx={x + width - 34} cy={y + height / 2} r={6} fill="none" stroke="#22c55e" strokeWidth={1} />
          <circle cx={x + width - 16} cy={y + height / 2} r={6} fill="none" stroke="#ef4444" strokeWidth={1} />
        </g>
      );
    }

    case 'clearcom-ms702': {
      return (
        <g>
          <rect x={x + 10} y={y + 10} width={34} height={height - 20} fill="none" stroke={stroke} strokeWidth={0.8} />
          <circle cx={x + 64} cy={y + height / 2} r={7} fill="none" stroke={accent} strokeWidth={1} />
          <circle cx={x + 92} cy={y + height / 2} r={7} fill="none" stroke={accent} strokeWidth={1} />
          <text x={x + width - 12} y={y + height / 2 + 2} textAnchor="end" fill={stroke} fontSize="6.5" fontFamily="JetBrains Mono, monospace">
            CH A / CH B
          </text>
        </g>
      );
    }

    case 'clearcom-dx210': {
      return (
        <g>
          <line x1={x + 14} y1={y + height - 8} x2={x + 14} y2={y + 4} stroke={accent} strokeWidth={1.3} />
          <line x1={x + width - 14} y1={y + height - 8} x2={x + width - 14} y2={y + 4} stroke={accent} strokeWidth={1.3} />
          <rect x={x + 36} y={y + 12} width={width - 72} height={height - 24} fill="#09090d" stroke={stroke} strokeWidth={0.8} />
          <text x={x + width / 2} y={y + height / 2 + 2} textAnchor="middle" fill={accent} fontSize="7" fontFamily="JetBrains Mono, monospace">
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
          <text x={x + width / 2} y={y + height / 2 + 2} textAnchor="middle" fill={accent} fontSize="6.5" fontFamily="JetBrains Mono, monospace">
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
                <rect x={x + 12} y={uy + 6} width={38} height={uh - 12} fill="#08080a" stroke={STROKE_MUTED} strokeWidth={0.8} />
                <circle cx={x + width / 2 - 20} cy={uy + uh / 2} r={6} fill="none" stroke={accent} strokeWidth={1} />
                <circle cx={x + width / 2 + 20} cy={uy + uh / 2} r={6} fill="none" stroke={accent} strokeWidth={1} />
                <rect x={x + width - 50} y={uy + 6} width={38} height={uh - 12} fill="#08080a" stroke={STROKE_MUTED} strokeWidth={0.8} />
              </g>
            );
          })}
        </g>
      );
    }

    case 'behringer-s16': {
      return (
        <g>
          {Array.from({ length: 8 }, (_, col) =>
            [0, 1].map((row) => (
              <circle
                key={`xlr-${col}-${row}`}
                cx={x + 20 + col * 22}
                cy={y + 20 + row * 24}
                r={6.5}
                fill="#070709"
                stroke={stroke}
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
          <rect x={x + 12} y={y + 12} width={width - 24} height={height - 24} fill="#09090d" stroke={stroke} strokeWidth={1} />
          <rect x={x + 28} y={y + 24} width={width - 56} height={54} fill="#050507" stroke={accent} strokeWidth={1} />
          <text x={x + width / 2} y={y + 54} textAnchor="middle" fill={accent} fontSize="7" fontFamily="JetBrains Mono, monospace">
            ETC QUICKTOUCH RIGGING
          </text>
          <circle cx={x + 44} cy={y + height - 36} r={11} fill="none" stroke="#22c55e" strokeWidth={1.1} />
          <circle cx={x + width - 44} cy={y + height - 36} r={12} fill="none" stroke="#ef4444" strokeWidth={1.3} />
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
                <rect x={fx - 3} y={y + 34} width={6} height={24} fill="none" stroke="#22c55e" strokeWidth={0.7} />
                <line x1={fx} y1={y + 68} x2={fx} y2={y + height - 16} stroke={STROKE_MUTED} strokeWidth={1.1} />
                <rect x={fx - 4.5} y={y + pos} width={9} height={14} fill="#18181b" stroke={i >= faders - 2 ? '#ef4444' : accent} strokeWidth={0.9} />
              </g>
            );
          })}
        </g>
      );
    }

    case 'si-strip-dsp': {
      const cols = ['#38bdf8', '#22c55e', '#ef4444', '#eab308'];
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
          <rect x={x + 12} y={y + 12} width={width - 24} height={height - 24} fill="#0a1612" stroke="#10b981" strokeWidth={1.2} />
          <text x={x + width / 2} y={y + 36} textAnchor="middle" fill="#10b981" fontSize="8" fontFamily="JetBrains Mono, monospace">
            RADIAL PROAV1
          </text>
          <circle cx={x + 40} cy={y + 72} r={8} fill="none" stroke={stroke} strokeWidth={1} />
          <circle cx={x + 74} cy={y + 72} r={8} fill="none" stroke={stroke} strokeWidth={1} />
          <rect x={x + width - 56} y={y + 62} width={28} height={18} fill="none" stroke={accent} strokeWidth={0.9} />
          <text x={x + width / 2} y={y + height - 24} textAnchor="middle" fill={stroke} fontSize="6.5" fontFamily="JetBrains Mono, monospace">
            GND LIFT · -15dB PAD
          </text>
        </g>
      );
    }

    default:
      return (
        <text x={x + 12} y={y + height / 2 + 3} fill={stroke} fontSize="8" fontFamily="JetBrains Mono, monospace">
          {unit.title}
        </text>
      );
  }
}

export const CadSvgRenderer: React.FC<CadSvgRendererProps> = ({
  blueprint,
  selectedUnitId,
  onSelectUnit
}) => {
  const selectedUnit =
    blueprint.units.find((u) => u.id === selectedUnitId) ?? blueprint.units[0];

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
        <filter id="cad-cyan-glow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#38bdf8" floodOpacity="0.45" />
        </filter>
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

      {/* Primary & Secondary 19" Rack Frames */}
      {blueprint.rackFrame && renderRackFrame(blueprint.rackFrame, 'primary')}
      {blueprint.secondaryRackFrame &&
        renderRackFrame(blueprint.secondaryRackFrame, 'secondary')}

      {/* Interactive Hardware Units */}
      {blueprint.units.map((unit) => {
        const isSelected = unit.id === selectedUnit?.id;
        const stroke = isSelected ? STROKE_ACTIVE : STROKE_BASE;
        const accent = isSelected ? STROKE_ACTIVE : STROKE_HOVER;

        return (
          <g
            key={unit.id}
            onClick={() => onSelectUnit(unit.id)}
            className="cursor-pointer group"
            filter={isSelected ? 'url(#cad-cyan-glow)' : undefined}
          >
            <rect
              x={unit.x}
              y={unit.y}
              width={unit.width}
              height={unit.height}
              fill={isSelected ? '#0f1722' : '#121216'}
              stroke={stroke}
              strokeWidth={isSelected ? 1.6 : 1}
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
            {renderMotifArt(unit, stroke, accent)}

            {/* Slot index badge inside left corner */}
            <text
              x={unit.x + 12}
              y={unit.y + 10}
              fill={isSelected ? STROKE_ACTIVE : '#71717a'}
              fontSize="6.5"
              fontFamily="JetBrains Mono, monospace"
            >
              {unit.slotLabel}
            </text>
          </g>
        );
      })}

      {/* Horizontal Elbow Leader Line Connecting Selected Hardware Unit to Inspector Panel */}
      {selectedUnit && leaderPoints && (
        <g pointerEvents="none">
          <polyline
            points={leaderPoints}
            fill="none"
            stroke="#38bdf8"
            strokeWidth={1.6}
            strokeDasharray="4 2"
          />
          <circle
            cx={selectedUnit.x + selectedUnit.width}
            cy={selectedUnit.y + selectedUnit.height / 2}
            r={3.5}
            fill="#38bdf8"
          />
          <circle
            cx={blueprint.svgWidth - 3}
            cy={selectedUnit.y + selectedUnit.height / 2}
            r={3}
            fill="#38bdf8"
          />
        </g>
      )}
    </svg>
  );
};
