import { FishingInput } from '../types/fishing';

export interface ScenarioPreset {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  badge: string;
  input: FishingInput;
}

export const PRESET_SCENARIOS: ScenarioPreset[] = [
  {
    id: 'port_phillip_bay_snapper',
    title: 'PPB Spring Snapper',
    subtitle: 'Classic 14-knot South-Westerly chop over the 18m mud ground on an incoming flood tide',
    location: 'Port Phillip Bay, Victoria, Australia (Carrum to Mornington 18m Mud)',
    badge: 'VIC Snapper Season',
    input: {
      areaName: 'Port Phillip Bay (Carrum to Mornington 18m Mud)',
      environment: 'coastal_bay',
      barometerValue: 1013,
      barometerUnit: 'hPa',
      barometerTendency: 'falling',
      windSpeed: 14,
      windSpeedUnit: 'knots',
      windDirection: 'SW',
      windShoreRelation: 'onshore',
      tideMovement: 'rising',
      tidePhase: 'spring',
      airTemperature: 18,
      waterTemperature: 16.5,
      tempUnit: 'C',
      waterClarity: 'stained',
      targetedFishId: 'snapper_pink'
    }
  },
  {
    id: 'port_phillip_bay_whiting',
    title: 'PPB KG Whiting',
    subtitle: 'Clear drift over sand holes and ribbon weed beds off St Leonards / Queenscliff',
    location: 'Port Phillip Bay, Victoria, Australia (St Leonards & Queenscliff Weed Beds)',
    badge: 'VIC Whiting Drift',
    input: {
      areaName: 'Port Phillip Bay (St Leonards & Queenscliff Weed Beds)',
      environment: 'coastal_bay',
      barometerValue: 1019,
      barometerUnit: 'hPa',
      barometerTendency: 'stable',
      windSpeed: 8,
      windSpeedUnit: 'knots',
      windDirection: 'S',
      windShoreRelation: 'protected',
      tideMovement: 'rising',
      tidePhase: 'normal',
      airTemperature: 20,
      waterTemperature: 17,
      tempUnit: 'C',
      waterClarity: 'crystal_clear',
      targetedFishId: 'king_george_whiting'
    }
  },
  {
    id: 'port_phillip_bay_calamari',
    title: 'PPB Calamari EGI',
    subtitle: 'Slack-water high tide over shallow kelp and eelgrass beds off Portsea & Queenscliff',
    location: 'Port Phillip Bay, Victoria, Australia (Portsea & Sorrento Kelp Flats)',
    badge: 'Southern Calamari',
    input: {
      areaName: 'Port Phillip Bay (Portsea & Sorrento Kelp Flats)',
      environment: 'coastal_bay',
      barometerValue: 1018,
      barometerUnit: 'hPa',
      barometerTendency: 'rising',
      windSpeed: 6,
      windSpeedUnit: 'knots',
      windDirection: 'SE',
      windShoreRelation: 'offshore',
      tideMovement: 'high_slack',
      tidePhase: 'normal',
      airTemperature: 19,
      waterTemperature: 16.5,
      tempUnit: 'C',
      waterClarity: 'crystal_clear',
      targetedFishId: 'southern_calamari'
    }
  },
  {
    id: 'port_phillip_bay_flathead',
    title: 'PPB Sand Flathead',
    subtitle: 'Drifting 8m–12m sand channels with soft plastics along Beaumaris & Corio Bay',
    location: 'Port Phillip Bay, Victoria, Australia (Beaumaris & Corio Bay Sand Flats)',
    badge: 'Bay Flatties',
    input: {
      areaName: 'Port Phillip Bay (Beaumaris & Corio Bay Sand Flats)',
      environment: 'coastal_bay',
      barometerValue: 1015,
      barometerUnit: 'hPa',
      barometerTendency: 'stable',
      windSpeed: 9,
      windSpeedUnit: 'knots',
      windDirection: 'SW',
      windShoreRelation: 'cross_shore',
      tideMovement: 'falling',
      tidePhase: 'normal',
      airTemperature: 21,
      waterTemperature: 18,
      tempUnit: 'C',
      waterClarity: 'stained',
      targetedFishId: 'sand_flathead'
    }
  },
  {
    id: 'port_phillip_bay_gummy',
    title: 'PPB South Channel Gummy',
    subtitle: 'Deep tidal run through the South Channel & Mud Islands on late dusk flood',
    location: 'Port Phillip Bay, Victoria, Australia (South Channel & Mud Islands)',
    badge: 'Channel Gummy Shark',
    input: {
      areaName: 'Port Phillip Bay (South Channel & Mud Islands)',
      environment: 'coastal_bay',
      barometerValue: 1014,
      barometerUnit: 'hPa',
      barometerTendency: 'falling',
      windSpeed: 12,
      windSpeedUnit: 'knots',
      windDirection: 'S',
      windShoreRelation: 'cross_shore',
      tideMovement: 'rising',
      tidePhase: 'spring',
      airTemperature: 19,
      waterTemperature: 17,
      tempUnit: 'C',
      waterClarity: 'stained',
      targetedFishId: 'gummy_shark'
    }
  },
  {
    id: 'port_phillip_bay_salmon',
    title: 'PPB Salmon Blitz',
    subtitle: 'Seabirds diving over ferocious surface schools feeding near The Rip and Mornington',
    location: 'Port Phillip Bay, Victoria, Australia (The Rip & Mornington Pier Whites)',
    badge: 'Surface Blitz',
    input: {
      areaName: 'Port Phillip Bay (The Rip & Mornington Pier Whites)',
      environment: 'coastal_bay',
      barometerValue: 1011,
      barometerUnit: 'hPa',
      barometerTendency: 'falling',
      windSpeed: 16,
      windSpeedUnit: 'knots',
      windDirection: 'SW',
      windShoreRelation: 'onshore',
      tideMovement: 'rising',
      tidePhase: 'spring',
      airTemperature: 16,
      waterTemperature: 15.5,
      tempUnit: 'C',
      waterClarity: 'stained',
      targetedFishId: 'australian_salmon'
    }
  }
];
