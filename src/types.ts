export type ViewId = 'landing' | 'diagrams' | 'runbooks' | 'database' | 'wiki';

export type ShowKey =
  | 'spring-musical'
  | 'black-box'
  | 'haunted-house'
  | 'sundance-cinema';

export type PanelMotif =
  | 'furman-ae-m8dx'
  | 'shure-ua844'
  | 'blx4r-pair'
  | 'blx4r-single-blank'
  | 'marshall-dual-lcd'
  | 'crestron-touch'
  | 'crestron-cp4n'
  | 'qsys-core-110f'
  | 'vented-shelf'
  | 'blank-panel'
  | 'listen-server'
  | 'furman-m8x2'
  | 'crown-xti-4002'
  | 'x32-preamp-eq'
  | 'x32-display-mon'
  | 'x32-faders-left'
  | 'x32-faders-dca'
  | 'x32-scenes-assign'
  | 'genelec-monitor'
  | 'atmos-staged-boxes'
  | 'bhs-atmos-rack-unit'
  | 'bhs-conduit-trunk'
  | 'servoreeler-src'
  | 'clearcom-ms702'
  | 'clearcom-dx210'
  | 'crown-xls1000'
  | 'behringer-inuke'
  | 'behringer-s16'
  | 'etc-quicktouch'
  | 'si-faders-bank'
  | 'si-strip-dsp'
  | 'radial-proav1';

export interface CadUnit {
  id: string;
  assetId: string;
  slotLabel: string;
  title: string;
  model: string;
  summary: string;
  motif: PanelMotif;
  /** Layout inside SVG coordinate space (viewBox width 560) */
  x: number;
  y: number;
  width: number;
  height: number;
  /** Optional unit height in Rack Units (U) */
  rackUnits?: number;
  /** Optional channel/tag annotations rendered directly in CAD line art */
  tags?: string[];
  signalPath: {
    input: string;
    processing: string;
    output: string;
  };
  powerAndClock: string;
  specs: string[];
  photoPath: string;
}

export interface CadBlueprint {
  id: string;
  tabLabel: string;
  title: string;
  subtitle: string;
  location: string;
  referencePhoto: string;
  referencePhotoAlt: string;
  svgWidth: number;
  svgHeight: number;
  layoutType: 'single-rack' | 'dual-rack' | 'console-desk' | 'atmos-rack';
  rackFrame?: {
    x: number;
    y: number;
    width: number;
    height: number;
    totalU: number;
    label: string;
  };
  secondaryRackFrame?: {
    x: number;
    y: number;
    width: number;
    height: number;
    totalU: number;
    label: string;
  };
  units: CadUnit[];
}

export interface CrewAssignment {
  role: string;
  task: string;
}

export interface RunbookPhase {
  title: string;
  steps: string[];
}

export interface ShowConfig {
  key: ShowKey;
  name: string;
  tag: string;
  description: string;
  timeline: string;
  overrides: {
    console: string;
    primaryInput: string;
    controlMode: string;
    outputZones: string[];
  };
  crewSplit: CrewAssignment[];
  phases: RunbookPhase[];
}

export interface SystemAsset {
  id: string;
  name: string;
  type: string;
  location: string;
  rackPosition: string;
  signalPath: {
    input: string;
    output: string;
  };
  terminalRouting: string;
  metadata: {
    status: 'Active' | 'In Installation' | 'Seasonal';
    category: 'FOH Booth' | 'Stage Right Rack' | 'Mobile Inventory' | 'Dolby Atmos Upgrade' | 'Black Box Rig';
    managedBy: string;
    notes: string;
  };
}

export interface WikiWalkthrough {
  heading: string;
  steps: string[];
}

export interface WikiTroubleshooting {
  symptom: string;
  cause: string;
  resolution: string;
}

export interface WikiChapter {
  id: string;
  category: string;
  title: string;
  summary: string;
  manualRef: string;
  paragraphs: string[];
  walkthroughs: WikiWalkthrough[];
  whyItMatters: {
    title: string;
    body: string;
  };
  specsTable?: Array<{ label: string; value: string }>;
  troubleshooting: WikiTroubleshooting[];
}

export interface TeamNote {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  pinned?: boolean;
}
