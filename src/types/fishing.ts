export type BarometerTendency = 'rising' | 'falling' | 'stable';

export type PressureUnit = 'hPa' | 'inHg';
export type SpeedUnit = 'knots' | 'mph' | 'kmh';
export type TempUnit = 'C' | 'F';

export type WindDirection = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';

export type TideMovement = 'rising' | 'falling' | 'high_slack' | 'low_slack';

export type TidePhase = 'spring' | 'normal' | 'neap';

export type WaterEnvironment = 
  | 'surf_beach'
  | 'rocky_point'
  | 'inshore_flats'
  | 'estuary_inlet'
  | 'coastal_bay'
  | 'offshore_reef'
  | 'freshwater_lake'
  | 'freshwater_river';

export type WaterClarity = 'crystal_clear' | 'stained' | 'murky_dirty';

export interface FishingInput {
  areaName: string;
  environment: WaterEnvironment;
  barometerValue: number; // Stored in hPa internally
  barometerUnit: PressureUnit;
  barometerTendency: BarometerTendency;
  windSpeed: number; // Stored in knots internally
  windSpeedUnit: SpeedUnit;
  windDirection: WindDirection;
  windShoreRelation: 'onshore' | 'offshore' | 'cross_shore' | 'protected';
  tideMovement: TideMovement;
  tidePhase: TidePhase;
  freshwaterFlowRate?: 'slack' | 'moderate' | 'swift';
  airTemperature: number; // Stored in Celsius internally
  waterTemperature: number; // Stored in Celsius internally
  tempUnit: TempUnit;
  waterClarity: WaterClarity;
  targetedFishId: string;
  customFishName?: string;
  customFishType?: 'saltwater' | 'freshwater';
}

export interface FishRegulations {
  sizeLimit: string;
  bagLimit: string;
  season: string;
  gearRestrictions?: string;
  regulatoryNotes: string;
}

export interface FishSpecies {
  id: string;
  commonName: string;
  scientificName: string;
  environmentType: 'saltwater' | 'freshwater' | 'brackish';
  typicalHabitat: string;
  habitatTags: string[];
  region: string;
  averageSize: string;
  optimalTempMinC: number;
  optimalTempMaxC: number;
  lethalColdC: number;
  lethalWarmC: number;
  pressurePreference: 'prefers_falling' | 'tolerant_rising' | 'moderate_stable';
  preferredTideStage: TideMovement[];
  defaultPrimaryRigId: string;
  defaultAlternativeRigId: string;
  description: string;
  feedingHabits: string;
  naturalBaits: string[];
  artificialLures: string[];
  regulations: FishRegulations;
}

export interface RigNode {
  id: string;
  label: string;
  description: string;
  specification: string;
  x: number; // SVG coordinate percent (0-100)
  y: number; // SVG coordinate percent (0-100)
}

export interface RigDefinition {
  id: string;
  name: string;
  category: 'bottom_ledger' | 'finesse_subsurface' | 'float_surface' | 'casting_lure' | 'surf_heavy';
  summary: string;
  whyIdeal: string;
  mainLineRecommendation: string;
  leaderRecommendation: string;
  hookRecommendation: string;
  sinkerRecommendation: string;
  knots: {
    name: string;
    description: string;
  }[];
  schematicNodes: RigNode[];
  bestEnvironments: WaterEnvironment[];
}

export interface TackleSpecification {
  rod: {
    length: string;
    power: string;
    action: string;
    description: string;
  };
  reel: {
    type: string;
    size: string;
    gearRatio: string;
    dragSetting: string;
  };
  mainLine: {
    type: 'Braid' | 'Monofilament' | 'Fluorocarbon';
    strengthLb: number;
    strengthKg: number;
    color: string;
    reasoning: string;
  };
  leader: {
    type: 'Fluorocarbon' | 'Monofilament' | 'Wire / Titanium';
    strengthLb: number;
    strengthKg: number;
    lengthInches: number;
    lengthCm: number;
    reasoning: string;
  };
  hook: {
    style: string;
    size: string;
    reasoning: string;
  };
  sinker: {
    style: string;
    weightOz: number;
    weightGrams: number;
    reasoning: string;
  };
  terminalAccessories: string[];
  liveBaits: string[];
  artificialLures: string[];
}

export interface EvaluationFactor {
  name: string;
  score: number; // 0 to 100
  weight: number;
  ratingText: 'Prime' | 'Favourable' | 'Moderate' | 'Challenging';
  headline: string;
  detail: string;
  biologicalInsight: string;
}

export interface FishingEvaluationResult {
  overallScore: number; // 0 to 100
  verdict: 'PRIME / PEAK BITE' | 'FAVOURABLE CONDITIONS' | 'MODERATE / FAIR' | 'TOUGH / SLOW BITE';
  verdictDescription: string;
  confidenceScore: number;
  factors: {
    barometer: EvaluationFactor;
    tideAndCurrent: EvaluationFactor;
    windAndSurface: EvaluationFactor;
    temperature: EvaluationFactor;
  };
  recommendedRig: RigDefinition;
  alternativeRig: RigDefinition;
  tackle: TackleSpecification;
  tacticalPlan: {
    structureToTarget: string[];
    retrieveTechnique: string;
    depthZone: string;
    peakActivityWindow: string;
    keyProTip: string;
  };
}

export interface SavedTripPlan {
  id: string;
  savedAt: string;
  input: FishingInput;
  evaluation: FishingEvaluationResult;
}
