import { 
  FishingInput, 
  FishingEvaluationResult, 
  EvaluationFactor, 
  TackleSpecification, 
  FishSpecies,
  RigDefinition
} from '../types/fishing';
import { FISH_SPECIES_LIST } from '../data/fishSpecies';
import { RIG_DATABASE } from '../data/rigs';

export function evaluateFishingConditions(input: FishingInput): FishingEvaluationResult {
  // 1. Identify Target Fish Species
  let targetSpecies = FISH_SPECIES_LIST.find(f => f.id === input.targetedFishId);
  if (!targetSpecies) {
    // Custom fish fallback
    targetSpecies = {
      id: 'custom_fish',
      commonName: input.customFishName || 'Custom Game Fish',
      scientificName: 'Piscis generis',
      environmentType: input.customFishType || 'saltwater',
      typicalHabitat: 'Shallow coastal waters, reefs, estuaries, or freshwater structure.',
      habitatTags: ['Coastal', 'Reef', 'Estuary'],
      region: 'Worldwide / Local Waters',
      averageSize: 'Varies by species',
      optimalTempMinC: 15,
      optimalTempMaxC: 24,
      lethalColdC: 4,
      lethalWarmC: 32,
      pressurePreference: 'prefers_falling',
      preferredTideStage: ['rising', 'falling'],
      defaultPrimaryRigId: 'fish_finder_sliding',
      defaultAlternativeRigId: 'carolina_rig',
      description: 'Custom targeted sport fish.',
      feedingHabits: 'Opportunistic predator stalking forage along structure lines.',
      naturalBaits: ['Live baitfish', 'Fresh cut bait', 'Live shrimp or crawfish'],
      artificialLures: ['Paddletail swimbait', 'Bucktail jig', 'Suspending twitchbait'],
      regulations: {
        sizeLimit: 'Check local state/provincial guidelines',
        bagLimit: 'Check local daily limits',
        season: 'Check regional open dates',
        regulatoryNotes: 'Adhere to state or national fisheries regulations.'
      }
    };
  }

  // Convert inputs to standard metrics if needed
  const pressureHpa = input.barometerUnit === 'inHg' 
    ? Math.round(input.barometerValue * 33.8639) 
    : input.barometerValue;

  const windKnots = input.windSpeedUnit === 'mph' 
    ? Math.round(input.windSpeed * 0.868976)
    : input.windSpeedUnit === 'kmh'
      ? Math.round(input.windSpeed * 0.539957)
      : input.windSpeed;

  const waterTempC = input.tempUnit === 'F'
    ? Math.round((input.waterTemperature - 32) * (5 / 9))
    : input.waterTemperature;

  const airTempC = input.tempUnit === 'F'
    ? Math.round((input.airTemperature - 32) * (5 / 9))
    : input.airTemperature;

  // -------------------------------------------------------------
  // FACTOR 1: BAROMETER & PRESSURE TENDENCY
  // -------------------------------------------------------------
  let baroScore = 65;
  let baroRating: EvaluationFactor['ratingText'] = 'Moderate';
  let baroHeadline = '';
  let baroDetail = '';
  let baroInsight = '';

  if (input.barometerTendency === 'falling') {
    if (pressureHpa >= 995 && pressureHpa <= 1012) {
      baroScore = 96;
      baroRating = 'Prime';
      baroHeadline = 'Aggressive Pre-Front Feeding Surge';
      baroDetail = `Barometer is dropping (${pressureHpa} hPa). Falling pressure signals oncoming weather, triggering high predatory urgency across fish swim bladders.`;
      baroInsight = 'Decreased hydrostatic pressure relieves the gas bladder, stimulating the alimentary canal and prompting fish to gorge on forage before heavy turbulence.';
    } else if (pressureHpa < 995) {
      baroScore = 60;
      baroRating = 'Moderate';
      baroHeadline = 'Severe Low Pressure Storm Cell';
      baroDetail = `Pressure is deeply depressed (${pressureHpa} hPa). Storm conditions or gale winds may disturb water clarity and safety.`;
      baroInsight = 'While the initial drop sparks feeding, extremely low barometric readings force fish into deep safety holes until the gale passes.';
    } else {
      baroScore = 88;
      baroRating = 'Prime';
      baroHeadline = 'Active Feeding Drop';
      baroDetail = `Gentle downward pressure drift from high ambient level (${pressureHpa} hPa). Outstanding bite window.`;
      baroInsight = 'Any downward trend from a high plateau relieves air bladder tension and activates schooling bait hunts.';
    }
  } else if (input.barometerTendency === 'rising') {
    if (pressureHpa > 1022) {
      baroScore = 42;
      baroRating = 'Challenging';
      baroHeadline = 'Post-Frontal Lockjaw / High Pressure';
      baroDetail = `Steep rising pressure (${pressureHpa} hPa) under bright skies. Fish will hug deep cover and exhibit minimal chasing response.`;
      baroInsight = 'High atmospheric weight compresses swim bladders and stomachs. Predatory fish hold tight to submerged timber, pilings, or deep drop-offs and refuse fast presentations.';
    } else {
      baroScore = 55;
      baroRating = 'Moderate';
      baroHeadline = 'Rising Barometric Transition';
      baroDetail = `Pressure climbing (${pressureHpa} hPa). Fish are readjusting buoyancy. Slow, finesse presentations advised.`;
      baroInsight = 'Fish require 12 to 24 hours of stabilization under rising pressure before aggressive feeding resumes.';
    }
  } else {
    // Stable
    if (pressureHpa >= 1010 && pressureHpa <= 1018) {
      baroScore = 84;
      baroRating = 'Favourable';
      baroHeadline = 'Stable Normal Pressure Equilibrium';
      baroDetail = `Steady barometer at ${pressureHpa} hPa. Neutral buoyancy allows predictable circadian and tidal feeding routines.`;
      baroInsight = 'Fish swim bladders are in full equilibrium. Bite events align closely with tidal currents, solunar peaks, and light changes.';
    } else if (pressureHpa > 1018) {
      baroScore = 68;
      baroRating = 'Moderate';
      baroHeadline = 'Stable High Barometer';
      baroDetail = `Consistently high pressure (${pressureHpa} hPa). Clear water and sun caution require downsized stealth leaders.`;
      baroInsight = 'Fish will feed, but are wary of shadows and line visibility. Target shadowed structure and deeper current troughs.';
    } else {
      baroScore = 72;
      baroRating = 'Favourable';
      baroHeadline = 'Stable Low Pressure Trough';
      baroDetail = `Overcast low ambient pressure (${pressureHpa} hPa). Consistent cloud cover extends feeding hours into midday.`;
      baroInsight = 'Diffused light levels keep gamefish cruising outside of shade without retreating to bottom cover.';
    }
  }

  // -------------------------------------------------------------
  // FACTOR 2: TIDAL MOVEMENT & CURRENT FLOW
  // -------------------------------------------------------------
  const isFreshwater = targetSpecies.environmentType === 'freshwater' || 
    input.environment === 'freshwater_lake' || 
    input.environment === 'freshwater_river';

  let tideScore = 70;
  let tideRating: EvaluationFactor['ratingText'] = 'Moderate';
  let tideHeadline = '';
  let tideDetail = '';
  let tideInsight = '';

  if (isFreshwater) {
    const flow = input.freshwaterFlowRate || 'moderate';
    if (flow === 'moderate') {
      tideScore = 88;
      tideRating = 'Prime';
      tideHeadline = 'Ideal River Seam / Lake Current Flow';
      tideDetail = 'Steady water circulation delivers drifting forage right past waiting ambush points and weed edges.';
      tideInsight = 'Current sets up distinct velocity breaks and foam lines where predatory fish expend minimal energy waiting for food.';
    } else if (flow === 'swift') {
      tideScore = 74;
      tideRating = 'Favourable';
      tideHeadline = 'Fast Current Flow';
      tideDetail = 'Rapid water volume. Target slack pockets behind boulders, logjams, and inside river bends.';
      tideInsight = 'Fish cannot hold in main torrent; concentrate 100% of casts on eddy boundaries and deep scour holes.';
    } else {
      tideScore = 58;
      tideRating = 'Moderate';
      tideHeadline = 'Slack / Still Water Basin';
      tideDetail = 'Minimal natural water movement. Requires angler-imparted lure cadence or scent trail dispersion.';
      tideInsight = 'Without current pushing forage, fish patrol larger radii. Cover water with searchbaits or popping rigs.';
    }
  } else {
    // Saltwater Tides
    const phaseMultiplier = input.tidePhase === 'spring' ? 1.1 : input.tidePhase === 'neap' ? 0.9 : 1.0;
    
    if (input.tideMovement === 'rising') {
      tideScore = Math.min(96, Math.round(92 * phaseMultiplier));
      tideRating = 'Prime';
      tideHeadline = 'Incoming Flood Tide — Primary Feeding Window';
      tideDetail = 'Rising tide floods intertidal flats, marsh drains, and outer beaches with fresh, cool, oxygenated ocean water.';
      tideInsight = 'Crabs, shrimp, and baitfish are pushed up into shallows. Gamefish move up onto sandbars and weed beds in hunter packs.';
    } else if (input.tideMovement === 'falling') {
      tideScore = Math.min(94, Math.round(90 * phaseMultiplier));
      tideRating = 'Prime';
      tideHeadline = 'Outgoing Ebb Tide — Bottleneck Ambush Window';
      tideDetail = 'Falling tide funnels baitfish out of backwaters, creeks, and estuaries into main channel bottlenecks.';
      tideInsight = 'Apex species stack up along outer sandbar drop-offs and inlet choke points, waiting to intercept fleeing forage.';
    } else if (input.tideMovement === 'high_slack') {
      tideScore = 60;
      tideRating = 'Moderate';
      tideHeadline = 'High Water Slack Period';
      tideDetail = 'Tidal surge has peaked and water velocity has stalled. Fish scatter widely across maximum water depth.';
      tideInsight = 'Current ceases for 45-60 minutes. Without current to pin bait, hookup rates slow until outgoing flow starts.';
    } else {
      // Low slack
      tideScore = 52;
      tideRating = 'Challenging';
      tideHeadline = 'Low Tide Slack Period';
      tideDetail = 'Water depth is at minimum and current has halted. Fish concentrate into deepest channels and outer holes.';
      tideInsight = 'Fish feel exposed in skinny water. They hold motionless in bottom depressions until the incoming flood begins.';
    }
  }

  // -------------------------------------------------------------
  // FACTOR 3: WIND & SURFACE CONDITIONS
  // -------------------------------------------------------------
  let windScore = 70;
  let windRating: EvaluationFactor['ratingText'] = 'Moderate';
  let windHeadline = '';
  let windDetail = '';
  let windInsight = '';

  if (windKnots <= 3) {
    windScore = 60;
    windRating = 'Moderate';
    windHeadline = 'Glass Calm Surface — High Fish Caution';
    windDetail = `Ultra-light air (${windKnots} kts). Mirror-calm surface permits fish to clearly inspect fishing line and boat shadows.`;
    windInsight = 'Without surface chop breaking sunlight refraction, fish become line-shy. Downsize to 100% fluorocarbon leaders and make long casts.';
  } else if (windKnots >= 4 && windKnots <= 15) {
    windScore = 94;
    windRating = 'Prime';
    windHeadline = 'Optimal Angling Breeze & Surface Chop';
    windDetail = `Brisk ${windKnots} knots from the ${input.windDirection}. Creates perfect surface distortion that masks line and angler presence.`;
    windInsight = 'Surface riffles diffuse harsh sunlight and stimulate baitfish schools, giving predatory gamefish the tactical advantage to strike boldly.';
  } else if (windKnots >= 16 && windKnots <= 22) {
    windScore = 78;
    windRating = 'Favourable';
    windHeadline = 'Strong Surface Chop & Drift Current';
    windDetail = `Stiff ${windKnots} knots wind. Demands heavier sinkers (2-4 oz) to pin bottom and hold casting distance.`;
    windInsight = 'Windward shorelines stack with plankton and baitfish. Focus casts directly on wind-beaten points and breaking whitewash.';
  } else {
    // 23+ knots
    windScore = 44;
    windRating = 'Challenging';
    windHeadline = 'Gale Force Winds / Heavy Turbidity';
    windDetail = `Heavy wind at ${windKnots} knots. Casting accuracy and bite detection severely degraded. Seek sheltered leeward pockets.`;
    windInsight = 'Violent wave action kicks up silt and debris, clogging fish gills and forcing them toward deeper or protected lee coves.';
  }

  // Wind-direction and shore relation nuance
  if (input.windShoreRelation === 'onshore' && windKnots >= 8 && windKnots <= 20) {
    windScore = Math.min(98, windScore + 6);
    windDetail += ' Onshore push drives baitfish directly into the surf trough and shoreline breakers.';
  } else if (input.windShoreRelation === 'offshore') {
    windDetail += ' Offshore breeze lays down surf swell and creates glassy nearshore casting lanes.';
  }

  // -------------------------------------------------------------
  // FACTOR 4: WATER & AIR TEMPERATURE
  // -------------------------------------------------------------
  let tempScore = 70;
  let tempRating: EvaluationFactor['ratingText'] = 'Moderate';
  let tempHeadline = '';
  let tempDetail = '';
  let tempInsight = '';

  const { optimalTempMinC, optimalTempMaxC, lethalColdC, lethalWarmC } = targetSpecies;

  if (waterTempC >= optimalTempMinC && waterTempC <= optimalTempMaxC) {
    tempScore = 95;
    tempRating = 'Prime';
    tempHeadline = `Ideal Thermal Zone for ${targetSpecies.commonName}`;
    tempDetail = `Water temperature (${waterTempC}°C / ${Math.round(waterTempC * 1.8 + 32)}°F) matches the species optimal metabolic peak (${optimalTempMinC}°C - ${optimalTempMaxC}°C).`;
    tempInsight = 'Fish digestive enzymes operate at maximum efficiency; calorie demand is elevated and strike aggression is high.';
  } else if (waterTempC < optimalTempMinC) {
    const delta = optimalTempMinC - waterTempC;
    if (waterTempC <= lethalColdC + 2) {
      tempScore = 32;
      tempRating = 'Challenging';
      tempHeadline = 'Near Torpor Cold Water';
      tempDetail = `Water temp is very cold (${waterTempC}°C / ${Math.round(waterTempC * 1.8 + 32)}°F). Metabolism has slowed to near dormancy.`;
      tempInsight = 'Cold-blooded fish cannot digest food quickly in cold water. You must place bait directly in front of their snout with zero retrieve.';
    } else {
      tempScore = Math.max(45, 80 - delta * 6);
      tempRating = tempScore > 65 ? 'Favourable' : 'Moderate';
      tempHeadline = 'Chilly / Sub-Optimal Water Temp';
      tempDetail = `Water is ${delta}°C below preferred range. Fish will seek sun-warmed dark mud bottom or deeper thermal basins.`;
      tempInsight = 'Slow down your lure retrieve by 50%. Allow natural scent from live bait or salted chunk to work.';
    }
  } else {
    // Above optimal
    const delta = waterTempC - optimalTempMaxC;
    if (waterTempC >= lethalWarmC - 2) {
      tempScore = 35;
      tempRating = 'Challenging';
      tempHeadline = 'Thermal Heat Stress';
      tempDetail = `Water temp (${waterTempC}°C / ${Math.round(waterTempC * 1.8 + 32)}°F) is stressing dissolved oxygen levels.`;
      tempInsight = 'Hot water carries low dissolved oxygen. Fish suspend near heavy current, aeration spillways, or deep springs.';
    } else {
      tempScore = Math.max(50, 82 - delta * 5);
      tempRating = tempScore > 65 ? 'Favourable' : 'Moderate';
      tempHeadline = 'Warm Water Conditions';
      tempDetail = `Water is warm (${waterTempC}°C). Target early dawn, dusk, or night tides when surface temps drop.`;
      tempInsight = 'Predators rest in deep thermal sanctuaries during direct midday sun and hunt during low-light hours.';
    }
  }

  // -------------------------------------------------------------
  // OVERALL WEIGHTED CALCULATION
  // -------------------------------------------------------------
  // Weights: Barometer (30%), Tide (30%), Temp (25%), Wind (15%)
  const overallScore = Math.round(
    (baroScore * 0.30) + 
    (tideScore * 0.30) + 
    (tempScore * 0.25) + 
    (windScore * 0.15)
  );

  let verdict: FishingEvaluationResult['verdict'] = 'FAVOURABLE CONDITIONS';
  let verdictDescription = '';

  if (overallScore >= 85) {
    verdict = 'PRIME / PEAK BITE';
    verdictDescription = `Conditions for targeting ${targetSpecies.commonName} at ${input.areaName || 'the grounds'} are exceptional. Active water movement and aligned barometric pressure create a golden window for trophy hookups.`;
  } else if (overallScore >= 70) {
    verdict = 'FAVOURABLE CONDITIONS';
    verdictDescription = `Solid fishing conditions. Feeding signals are active, with favourable environmental factors outnumbering minor obstacles. Solid action expected with the right rig presentation.`;
  } else if (overallScore >= 55) {
    verdict = 'MODERATE / FAIR';
    verdictDescription = `Fair conditions requiring strategic tactical adjustments. Success will hinge on targeting specific current breaks, fishing the tide turn, and using precise finesse tackle.`;
  } else {
    verdict = 'TOUGH / SLOW BITE';
    verdictDescription = `Challenging conditions due to environmental headwinds (e.g. extreme pressure shifts or stagnant slack). Downsize leaders, use high-scent natural baits, and target deep structure relief.`;
  }

  // -------------------------------------------------------------
  // RIG SELECTION LOGIC
  // -------------------------------------------------------------
  let primaryRigId = targetSpecies.defaultPrimaryRigId;
  let alternativeRigId = targetSpecies.defaultAlternativeRigId;

  // Adaptive overrides based on environment & conditions
  if (input.environment === 'surf_beach') {
    if (windKnots > 14 || input.tideMovement === 'rising') {
      primaryRigId = 'fish_finder_sliding';
      alternativeRigId = 'paternoster_high_low';
    } else {
      primaryRigId = 'paternoster_high_low';
      alternativeRigId = 'carolina_rig';
    }
  } else if (input.environment === 'inshore_flats') {
    if (input.waterClarity === 'murky_dirty') {
      primaryRigId = 'popping_cork_rig';
      alternativeRigId = 'carolina_rig';
    } else if (windKnots <= 8) {
      primaryRigId = 'freeline_live_bait';
      alternativeRigId = 'carolina_rig';
    }
  } else if (input.barometerTendency === 'rising' && pressureHpa > 1020) {
    // Post-frontal high pressure lockjaw: finesse rigs dominate
    if (targetSpecies.environmentType === 'freshwater') {
      primaryRigId = 'drop_shot_rig';
      alternativeRigId = 'ned_finesse_rig';
    } else {
      primaryRigId = 'carolina_rig';
      alternativeRigId = 'drop_shot_rig';
    }
  }

  // Tooth check (Pike, Bluefish, King Mackerel)
  if (targetSpecies.id === 'bluefish_tailor' || targetSpecies.id === 'northern_pike') {
    primaryRigId = 'wire_leader_surf_rig';
  }

  // Specialized Port Phillip Bay species overrides
  if (targetSpecies.id === 'snapper_pink') {
    primaryRigId = 'snapper_snell_rig';
    alternativeRigId = 'whiting_paternoster_rig';
  } else if (targetSpecies.id === 'king_george_whiting') {
    primaryRigId = 'whiting_paternoster_rig';
    alternativeRigId = 'carolina_rig';
  } else if (targetSpecies.id === 'southern_calamari') {
    primaryRigId = 'calamari_egi_rig';
    alternativeRigId = 'float_slip_bobber';
  } else if (targetSpecies.id === 'gummy_shark') {
    primaryRigId = 'gummy_shark_ledger';
    alternativeRigId = 'fish_finder_sliding';
  } else if (targetSpecies.id === 'southern_garfish') {
    primaryRigId = 'float_slip_bobber';
    alternativeRigId = 'carolina_rig';
  }

  const recommendedRig: RigDefinition = RIG_DATABASE[primaryRigId] || RIG_DATABASE.fish_finder_sliding;
  const alternativeRig: RigDefinition = RIG_DATABASE[alternativeRigId] || RIG_DATABASE.carolina_rig;

  // -------------------------------------------------------------
  // DETAILED TACKLE CALCULATION
  // -------------------------------------------------------------
  const tackle = generateTackleSpecs(input, targetSpecies, recommendedRig, windKnots, waterTempC);

  // -------------------------------------------------------------
  // TACTICAL PLAN
  // -------------------------------------------------------------
  const tacticalPlan = generateTacticalPlan(input, targetSpecies, recommendedRig, windKnots);

  return {
    overallScore,
    verdict,
    verdictDescription,
    confidenceScore: 92,
    factors: {
      barometer: {
        name: 'Barometric Pressure',
        score: baroScore,
        weight: 30,
        ratingText: baroRating,
        headline: baroHeadline,
        detail: baroDetail,
        biologicalInsight: baroInsight
      },
      tideAndCurrent: {
        name: isFreshwater ? 'Water Current & Flow' : 'Tidal Movement & Stage',
        score: tideScore,
        weight: 30,
        ratingText: tideRating,
        headline: tideHeadline,
        detail: tideDetail,
        biologicalInsight: tideInsight
      },
      windAndSurface: {
        name: 'Wind Speed & Wave Action',
        score: windScore,
        weight: 15,
        ratingText: windRating,
        headline: windHeadline,
        detail: windDetail,
        biologicalInsight: windInsight
      },
      temperature: {
        name: 'Thermal Comfort & Activity',
        score: tempScore,
        weight: 25,
        ratingText: tempRating,
        headline: tempHeadline,
        detail: tempDetail,
        biologicalInsight: tempInsight
      }
    },
    recommendedRig,
    alternativeRig,
    tackle,
    tacticalPlan
  };
}

function generateTackleSpecs(
  input: FishingInput, 
  species: FishSpecies, 
  rig: RigDefinition, 
  windKnots: number,
  _waterTempC: number
): TackleSpecification {
  // Sinker calculation: heavier for surf and strong wind
  let sinkerOz = 1;
  let sinkerStyle = 'Pyramid Sinker';
  let sinkerReason = 'Holds bottom in current.';

  if (input.environment === 'surf_beach') {
    sinkerOz = windKnots > 15 ? 4 : 3;
    sinkerStyle = 'Pyramid or Hatteras Storm Sinker';
    sinkerReason = `${sinkerOz} oz pyramid digs into rolling sand to prevent waves rolling the rig down-beach.`;
  } else if (rig.id === 'carolina_rig') {
    sinkerOz = windKnots > 12 ? 0.75 : 0.5;
    sinkerStyle = 'Egg Sinker';
    sinkerReason = `${sinkerOz} oz egg weight maintains bottom contact while letting bait float naturally behind.`;
  } else if (rig.id === 'drop_shot_rig') {
    sinkerOz = windKnots > 10 ? 0.375 : 0.25;
    sinkerStyle = 'Tungsten Teardrop Drop Shot Weight';
    sinkerReason = 'Compact tungsten telegraphs every pebble tap directly through the braided line.';
  } else if (rig.id === 'freeline_live_bait') {
    sinkerOz = 0;
    sinkerStyle = 'No Sinker (Unweighted Free-Line)';
    sinkerReason = 'Zero lead weight allows live bait to swim with zero artificial drag in the current.';
  } else if (rig.id === 'texas_weedless_rig') {
    sinkerOz = 0.375;
    sinkerStyle = 'Bullet Sinker (Pegged)';
    sinkerReason = 'Streamlined bullet nose punches through thick hydrilla and wood without snagging.';
  } else if (rig.id === 'paternoster_high_low') {
    sinkerOz = windKnots > 12 ? 3 : 2;
    sinkerStyle = 'Pyramid or Bank Sinker';
    sinkerReason = 'Terminal bottom weight anchors the rig while keeping two dropper baits hovering above bottom crabs.';
  } else if (rig.id === 'snapper_snell_rig') {
    sinkerOz = windKnots > 14 ? 2 : 1;
    sinkerStyle = 'Size 1-3 Running Ball Sinker';
    sinkerReason = 'Free running ball sinker allows Port Phillip Bay big reds to mouth and run with whole WA pilchard without detecting resistance.';
  } else if (rig.id === 'whiting_paternoster_rig') {
    sinkerOz = windKnots > 10 ? 1.5 : 1;
    sinkerStyle = 'Bomb or Snapper Lead';
    sinkerReason = 'Puffs sand on bottom to trigger schooling whiting to inspect pipi baits.';
  } else if (rig.id === 'calamari_egi_rig') {
    sinkerOz = 0.7;
    sinkerStyle = 'Integrated EGI Keel Sinker (Size 3.0 / 3.5)';
    sinkerReason = 'Low center of gravity keel creates a 45-degree angle descent at 3.0-3.5 sec/meter over shallow kelp.';
  } else if (rig.id === 'gummy_shark_ledger') {
    sinkerOz = windKnots > 12 ? 6 : 4;
    sinkerStyle = 'Heavy Star or Grip Sinker';
    sinkerReason = 'Holds bottom against ferocious 4-knot tidal currents in the South Channel and The Rip.';
  }

  // Main line calculation
  let mainLineType: 'Braid' | 'Monofilament' | 'Fluorocarbon' = 'Braid';
  let mainLineLb = 20;
  let mainLineReason = 'Braided line delivers zero stretch for instant hooksets and deep sensitivity.';

  if (input.environment === 'surf_beach') {
    mainLineLb = 30;
    mainLineReason = '30 lb 8-carrier braid cuts through crashing surf wash and delivers maximum casting distance.';
  } else if (species.environmentType === 'freshwater' && rig.id === 'drop_shot_rig') {
    mainLineLb = 10;
    mainLineReason = '10 lb thin braid casts micro-baits effortlessly and signals subtle nibbles.';
  } else if (species.id === 'snook' || species.id === 'tarpon') {
    mainLineLb = 30;
    mainLineReason = 'Heavy braid provides muscle to turn fish before they reach bridge pilings or mangrove roots.';
  }

  // Leader calculation
  let leaderType: 'Fluorocarbon' | 'Monofilament' | 'Wire / Titanium' = 'Fluorocarbon';
  let leaderLb = 20;
  let leaderLengthInches = 30;
  let leaderReason = 'Fluorocarbon matches water refractive index for near-invisibility and high abrasion resistance.';

  if (species.id === 'bluefish_tailor' || species.id === 'northern_pike') {
    leaderType = 'Wire / Titanium';
    leaderLb = 30;
    leaderLengthInches = 14;
    leaderReason = 'Armored wire prevents sharp predator teeth from slicing through the leader on headshakes.';
  } else if (species.id === 'tarpon' || species.id === 'snook') {
    leaderLb = 40;
    leaderLengthInches = 36;
    leaderReason = 'Heavy 40 lb fluorocarbon defends against sandpaper jaws and razor-sharp gill plates.';
  } else if (rig.id === 'drop_shot_rig' || species.id === 'smallmouth_bass' || species.id === 'rainbow_brown_trout') {
    leaderLb = 6;
    leaderLengthInches = 72;
    leaderReason = 'Ultra-stealth 6 lb fluorocarbon allows finicky, clear-water gamefish to bite without suspicion.';
  }

  // Hook calculation
  let hookStyle = 'Inline Circle Hook';
  let hookSize = '3/0';
  let hookReason = 'Circles self-set in the corner of the jaw, ensuring 95%+ fish survival and zero gut-hooking.';

  if (rig.id === 'texas_weedless_rig') {
    hookStyle = 'Offset Extra Wide Gap (EWG) Worm Hook';
    hookSize = '4/0';
    hookReason = 'Wide bite gap allows soft plastic to collapse on strike, driving the point through the fish roof of mouth.';
  } else if (rig.id === 'drop_shot_rig') {
    hookStyle = 'Finesse Drop Shot Hook';
    hookSize = '#1';
    hookReason = 'Light wire needlepoint penetrates with light rod lift on delicate finesse spinning tackle.';
  } else if (species.id === 'flounder_fluke' || species.id === 'sand_flathead') {
    hookStyle = 'Kahle Hook or Long Shank Flattie Hook';
    hookSize = '1/0 - 2/0';
    hookReason = 'Wide bend accommodates live minnow, whitebait, or squid strip without shielding the hook point.';
  }

  // Rod & Reel specs base defaults
  let rodLength = "7'6\"";
  let rodPower = 'Medium-Heavy';
  let rodAction = 'Fast';
  let rodDesc = 'Versatile casting backbone with sensitive tip for detecting structure changes.';
  let reelType = 'Saltwater Spinning Reel';
  let reelSize = '3500 - 4000';
  let gearRatio = '6.2:1';
  let dragSetting = '12 - 15 lb';

  if (species.id === 'snapper_pink' || rig.id === 'snapper_snell_rig') {
    hookStyle = 'Twin Snelled 4/0–5/0 Circle / Suicide Hooks';
    hookSize = '4/0 & 5/0 Snelled';
    hookReason = 'Twin snelled hooks hold whole WA pilchard or calamari strip straight and hook automatically in jaw hinge on pickup.';
    leaderLb = 30;
    leaderLengthInches = 42;
    leaderReason = '30-40 lb abrasion-resistant fluorocarbon trace withstands crushing teeth and rough mud shell grit.';
    mainLineLb = 20;
    rodLength = "7'2\"";
    rodPower = 'Medium-Heavy';
    rodAction = 'Fast';
    rodDesc = 'Dedicated 5-8kg bay snapper rod with soft tip to absorb headshakes and muscular mid-section to lift fish off bottom.';
    reelSize = '4000 - 5000 Baitrunner';
    dragSetting = '8 - 12 lb';
  } else if (species.id === 'king_george_whiting' || rig.id === 'whiting_paternoster_rig') {
    hookStyle = '#6 Long Shank Whiting Hooks (Red Attractor Beads)';
    hookSize = '#6';
    hookReason = 'Long shank prevents gut hooking and holds soft pipi baits securely; red lumo beads stimulate feeding.';
    leaderLb = 14;
    leaderLengthInches = 32;
    leaderReason = 'Crisp 14 lb fluorocarbon droppers stand clear of backbone in tidal drift.';
    mainLineLb = 12;
    rodLength = "7'0\"";
    rodPower = 'Light';
    rodAction = 'Fast';
    rodDesc = 'Sensitive 2-4kg whiting rod with flexible tip for detecting subtle nibbles over weed.';
    reelSize = '2500';
    dragSetting = '4 - 6 lb';
  } else if (species.id === 'southern_calamari' || rig.id === 'calamari_egi_rig') {
    hookStyle = 'Dual Stainless Umbrella Crown Barbs';
    hookSize = 'Size 3.0 EGI';
    hookReason = 'Double crown barbs pin tentacles cleanly on strike with zero barbs to damage squid mantle.';
    leaderLb = 12;
    leaderLengthInches = 84;
    leaderReason = 'Long 7-foot fluorocarbon leader provides invisible presentation in crystal clear bay waters.';
    mainLineLb = 12;
    mainLineReason = 'PE 0.8 thin 8-strand braid ensures crisp transfer of rod snaps to jig and cuts water resistance.';
    rodLength = "8'3\"";
    rodPower = 'Medium-Light';
    rodAction = 'Regular-Fast';
    rodDesc = 'Specialized parabolic Japanese EGI rod designed to dart jigs without tearing fragile tentacles.';
    reelSize = '2500 Shallow Spool';
    dragSetting = '3 - 5 lb';
  } else if (species.id === 'gummy_shark' || rig.id === 'gummy_shark_ledger') {
    hookStyle = '7/0 Heavy Inline Circle Hook';
    hookSize = '7/0';
    hookReason = 'Circle hook lodges automatically in the corner jaw crease of running sharks.';
    leaderLb = 70;
    leaderLengthInches = 48;
    leaderReason = 'Heavy 60-80 lb tough monofilament trace resists abrasive dermal denticles on shark skin.';
    mainLineLb = 40;
    mainLineReason = 'Heavy 40 lb braid provides strength to turn heavy fish in deep tidal current.';
    rodLength = "6'8\"";
    rodPower = 'Heavy';
    rodAction = 'Moderate-Fast';
    rodDesc = 'Stout 8-15kg channel boat rod with heavy backbone to lift big gummies off bottom.';
    reelSize = '6000 - 8000 Spin or Overhead';
    dragSetting = '15 - 20 lb';
  }

  if (input.environment === 'surf_beach') {
    rodLength = "10'0\" - 11'0\"";
    rodPower = 'Heavy';
    rodAction = 'Moderate-Fast';
    rodDesc = 'Long two-handed surf rod built to launch heavy pyramids beyond outer breaking waves.';
    reelSize = '5000 - 6000 Long-Cast Spool';
    dragSetting = '18 - 22 lb';
  } else if (species.environmentType === 'freshwater' && rig.id !== 'texas_weedless_rig') {
    rodLength = "6'10\" - 7'2\"";
    rodPower = 'Medium-Light';
    rodAction = 'Fast';
    rodDesc = 'Lightweight graphite blank engineered for micro-vibrations and featherweight lures.';
    reelType = 'Finesse Spinning Reel';
    reelSize = '2500';
    dragSetting = '6 - 8 lb';
  }

  return {
    rod: {
      length: rodLength,
      power: rodPower,
      action: rodAction,
      description: rodDesc
    },
    reel: {
      type: reelType,
      size: reelSize,
      gearRatio,
      dragSetting
    },
    mainLine: {
      type: mainLineType,
      strengthLb: mainLineLb,
      strengthKg: Math.round(mainLineLb * 0.453592),
      color: 'Moss Green or High-Vis Yellow with leader',
      reasoning: mainLineReason
    },
    leader: {
      type: leaderType,
      strengthLb: leaderLb,
      strengthKg: Math.round(leaderLb * 0.453592),
      lengthInches: leaderLengthInches,
      lengthCm: Math.round(leaderLengthInches * 2.54),
      reasoning: leaderReason
    },
    hook: {
      style: hookStyle,
      size: hookSize,
      reasoning: hookReason
    },
    sinker: {
      style: sinkerStyle,
      weightOz: sinkerOz,
      weightGrams: Math.round(sinkerOz * 28.3495),
      reasoning: sinkerReason
    },
    terminalAccessories: [
      'Quality Brass Barrel Swivel (#4 to #6)',
      '6mm Rubber Shock Bead (cushions knot against sinker)',
      'Quick-Change Sinker Slide (prevents line chafe)',
      'Dual-Snap Swivel for rapid weight adjustments'
    ],
    liveBaits: species.naturalBaits,
    artificialLures: species.artificialLures
  };
}

function generateTacticalPlan(
  input: FishingInput, 
  species: FishSpecies, 
  _rig: RigDefinition, 
  windKnots: number
) {
  const structure: string[] = [];
  
  if (input.areaName.toLowerCase().includes('port phillip') || species.id === 'snapper_pink') {
    structure.push('16m–19m deep mud contours (Mornington, Carrum, Black Rock, P2P grounds) where spring snapper aggregate');
    structure.push('Broken rubble reefs and foul ground off Altona, St Kilda, and Ricketts Point');
    structure.push('Tidal drop-offs along the South Channel and The Rip where incoming water sweeps bait');
  } else if (input.environment === 'surf_beach') {
    structure.push('Outer sandbar break: cast into the deep slough (trough) between bars where fish cruise');
    structure.push('Rip currents and cusps: white-water seams that carve deep channels out to sea');
    structure.push('Points and sand spits where moving tidal currents deflect and concentrate bait');
  } else if (input.environment === 'inshore_flats' || input.environment === 'estuary_inlet') {
    structure.push('Oyster bar drop-offs where marsh drains dump out during falling tide');
    structure.push('Mangrove root overhangs and shade lines during high slack tides');
    structure.push('Tidal bottlenecks, bridge pilings, and jetty eddies where current accelerates');
  } else if (input.environment === 'freshwater_lake') {
    structure.push('Submerged hydrilla / milfoil weedlines transitioning into deep water ledges');
    structure.push('Secondary points and creek channel bends leading out of shallow spawning bays');
    structure.push('Sunken timber, rip-rap causeways, and boulder clusters');
  } else {
    structure.push('Current seams: boundary between fast water and slow slack eddy pockets');
    structure.push('Undercut riverbanks and overhanging tree roots');
    structure.push('Deep tail-outs of gravel riffles where fish rest out of heavy current');
  }

  let retrieve = 'Slow, deliberate crawling retrieve with 3-5 second pauses along bottom contour.';
  if (species.id === 'snapper_pink') {
    retrieve = 'Anchor up-current and dead-stick whole pilchards on snelled circle hooks with zero retrieve; maintain a steady cube berley trail.';
  } else if (input.barometerTendency === 'falling') {
    retrieve = 'Aggressive erratic cadence: brisk rod twitching with rapid bursts to imitate fleeing, panicked bait.';
  } else if (input.barometerTendency === 'rising') {
    retrieve = 'Dead-stick finesse: allow bait to sit completely stationary; shake rod tip gently on slack line.';
  } else if (windKnots > 14) {
    retrieve = 'Keep rod tip low to water to minimize wind bow in line; slow steady wind maintaining contact with weight.';
  }

  let depthZone = 'Target the bottom third of the water column within 1-2 feet of substrate.';
  if (input.areaName.toLowerCase().includes('port phillip')) {
    depthZone = 'Deep mud grounds (16m - 20m depth) during daytime; shallow reefs (5m - 9m) at dawn/dusk.';
  } else if (input.tideMovement === 'rising') {
    depthZone = 'Shallow to mid-depths (2 - 6 ft): fish are pushing upward into newly submerged flats.';
  } else if (input.tideMovement === 'falling') {
    depthZone = 'Drop-offs and channel gutters (6 - 15 ft): fish stage below the edge waiting for bait to drop.';
  }

  let peakActivity = 'Next 90 minutes surrounding the middle of the tidal surge.';
  if (input.tideMovement === 'rising') {
    peakActivity = '1.5 hours before high slack tide when flood current reaches peak velocity through The Rip.';
  } else if (input.tideMovement === 'falling') {
    peakActivity = 'First 2 hours of outgoing tide as bait is flushed from shallow nurseries.';
  }

  const keyProTip = input.areaName.toLowerCase().includes('port phillip')
    ? 'Port Phillip Bay Rule: "A bit of chop brings the big reds on the chew." In 14 knots South-Westerly, sound along the 16m–18m line looking for arches hard to the bottom. Anchor up-current and establish a light, steady cube berley trail of diced WA pilchards.'
    : input.barometerTendency === 'rising'
      ? 'Post-frontal conditions: fish will not chase. Do not move the bait too far from structure; soak natural baits or use scented plastics.'
      : input.windShoreRelation === 'onshore'
        ? 'Onshore winds create a "dirty water line" 20-40 yards out. Cast right on that edge—predators cruise inside the clean water stalking the turbid margin.'
        : 'Maintain constant fingertip contact with the braided line: circle hook hooksets require smooth winding rather than a violent overhead jerk.';

  return {
    structureToTarget: structure,
    retrieveTechnique: retrieve,
    depthZone,
    peakActivityWindow: peakActivity,
    keyProTip
  };
}
