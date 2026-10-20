import { RigDefinition } from '../types/fishing';

export const RIG_DATABASE: Record<string, RigDefinition> = {
  snapper_snell_rig: {
    id: 'snapper_snell_rig',
    name: 'Port Phillip Bay Twin-Hook Snell Rig',
    category: 'bottom_ledger',
    summary: 'The iconic Melbourne rig for targeting Port Phillip Bay "Big Reds". Two snelled 4/0–5/0 circle or suicide hooks pinned in a whole WA pilchard or calamari strip over the 16m–21m mud.',
    whyIdeal: 'Running ball sinker allows big snapper to pick up and run with whole pilchard without feeling weight, while twin snelled hooks ensure high hookup rate on bait runners.',
    mainLineRecommendation: '20 - 30 lb Braided line with 5m of 20 lb mono wind-on leader',
    leaderRecommendation: '36 - 48 inches of 30 - 40 lb premium Fluorocarbon (abrasion protection against snapper teeth and shell grit)',
    hookRecommendation: 'Twin 4/0 or 5/0 Snelled Suicide or Circle Hooks spaced 7-10 cm apart',
    sinkerRecommendation: 'Size 1 to 3 Running Ball Sinker (just enough to reach bottom mud in current)',
    knots: [
      { name: 'Twin Snell Knot', description: 'Snell top hook sliding or fixed 8cm above bottom terminal hook.' },
      { name: 'Uni Knot or Centauri Knot', description: 'Connects leader to heavy crane barrel swivel.' }
    ],
    schematicNodes: [
      { id: 'n1', label: 'Main Line', description: '20-30 lb Braid', specification: 'Thin diameter cuts PPB tidal sweep', x: 8, y: 35 },
      { id: 'n2', label: 'Running Ball Sinker', description: 'Size 1-3 Ball Sinker', specification: 'Slides freely on mainline above bead', x: 28, y: 35 },
      { id: 'n3', label: 'Rubber Buffer Bead', description: '5mm Lumo / Soft Bead', specification: 'Protects knot from sinker abrasion', x: 42, y: 35 },
      { id: 'n4', label: 'Barrel Swivel', description: 'Size #4 Rolling Swivel', specification: 'Eliminates line twist in bay current', x: 55, y: 35 },
      { id: 'n5', label: 'Fluorocarbon Trace', description: '30-40 lb (1.2m)', specification: 'Tough trace withstands crushing pharyngeal teeth', x: 72, y: 35 },
      { id: 'n6', label: 'Top Snelled Hook', description: '4/0 Snelled Hook', specification: 'Pinned through WA pilchard shoulder', x: 84, y: 25 },
      { id: 'n7', label: 'Bottom Snelled Hook', description: '5/0 Snelled Hook', specification: 'Pinned near pilchard tail; two half-hitches', x: 94, y: 45 }
    ],
    bestEnvironments: ['coastal_bay', 'offshore_reef', 'rocky_point']
  },

  whiting_paternoster_rig: {
    id: 'whiting_paternoster_rig',
    name: 'King George Whiting Paternoster Rig',
    category: 'bottom_ledger',
    summary: 'The classic Victorian King George Whiting rig with twin dropper loops, red lumo attractor beads, and fine long-shank or circle hooks for pipis and calamari strips in Port Phillip Bay.',
    whyIdeal: 'Presents delicate pipi or squid baits slightly above sand holes and eelgrass beds (St Leonards, Queenscliff, Sorrento), keeping bait visible to schooling whiting while bomb sinker anchors bottom.',
    mainLineRecommendation: '10 - 15 lb Braid or 8 - 12 lb Monofilament',
    leaderRecommendation: '30 - 36 inches of 12 - 16 lb Fluorocarbon backbone with 15cm droppers',
    hookRecommendation: 'Size #4 or #6 Long Shank Whiting Hooks or #6 Light-Wire Circle Hooks',
    sinkerRecommendation: '1 to 2 oz Bomb or Snapper Sinker clipped to bottom loop',
    knots: [
      { name: 'Dropper Loop', description: 'Tied 25cm and 50cm above sinker with 12cm standoffs.' },
      { name: 'Loop Knot / Bottom Clip', description: 'Allows rapid sinker weight changes as tide picks up.' }
    ],
    schematicNodes: [
      { id: 'n1', label: 'Main Line', description: '10-15 lb Braid', specification: 'Connected from light whiting rod tip', x: 8, y: 20 },
      { id: 'n2', label: 'Top Crane Swivel', description: 'Size #8 Swivel', specification: 'Prevents spin when retrieving', x: 26, y: 20 },
      { id: 'n3', label: 'Top Dropper & Red Bead', description: '#6 Hook + Red Bead', specification: 'Red tube or bead attracts curious whiting to pipi bait', x: 48, y: 15 },
      { id: 'n4', label: 'Rig Backbone', description: '14 lb Fluoro Stem', specification: 'Stiff line holds droppers away from main stem', x: 40, y: 50 },
      { id: 'n5', label: 'Lower Dropper & Pipi', description: '#6 Long Shank Hook', specification: 'Hovers 10cm above sand hole floor', x: 62, y: 55 },
      { id: 'n6', label: 'Bottom Snap & Bomb Sinker', description: '1-2 oz Bomb Sinker', specification: 'Puffs sand on bottom to trigger whiting feeding', x: 86, y: 85 }
    ],
    bestEnvironments: ['coastal_bay', 'inshore_flats', 'estuary_inlet']
  },

  calamari_egi_rig: {
    id: 'calamari_egi_rig',
    name: 'Port Phillip Bay EGI Squid Jig Rig',
    category: 'finesse_subsurface',
    summary: 'Precision Japanese EGI setup for Southern Calamari over seagrass meadows and rocky reefs from Portsea, Queenscliff, Mornington, and Point Cook.',
    whyIdeal: 'Thin braided line imparts sharp vertical darting action to cloth-covered squid jigs, followed by slow tantalizing horizontal sink rate that triggers squid tentacles.',
    mainLineRecommendation: '10 - 16 lb 8-strand PE Braided line (high visibility pink or chartreuse for watching line ticks)',
    leaderRecommendation: '6 - 9 feet of 10 - 14 lb supple Fluorocarbon (invisible, allows natural jig descent)',
    hookRecommendation: 'Size 2.5 to 3.5 Japanese EGI Squid Jig with dual umbrella barbs (Yamashita / Yo-Zuri)',
    sinkerRecommendation: 'Integrated keel weight on EGI jig (3.0–3.5 sec/meter sink rate for shallow weed flats)',
    knots: [
      { name: 'FG Knot or Double Uni', description: 'Ultra-smooth line-to-leader connection that passes through micro guides.' },
      { name: 'EGI Snap Clip', description: 'Fast snap allows changing jig colors (pink, white, gold foil, keimura UV).' }
    ],
    schematicNodes: [
      { id: 'n1', label: 'Main Line', description: 'PE 0.8 Braid (12 lb)', specification: 'Direct braid from EGI rod tip', x: 8, y: 40 },
      { id: 'n2', label: 'FG Knot Join', description: 'Ultra-thin line join', specification: 'Smooth transit through guides', x: 32, y: 40 },
      { id: 'n3', label: 'Stealth Fluoro Trace', description: '7 ft (10-12 lb)', specification: 'Zero visibility in clear bay shallows', x: 55, y: 40 },
      { id: 'n4', label: 'Micro EGI Snap', description: 'Egg Snap Clip', specification: 'Allows free jig pitch and darting', x: 74, y: 40 },
      { id: 'n5', label: 'Keel Weighted Jig Body', description: 'Size 3.0 Cloth EGI Jig', specification: 'Nose down 45-degree slow sink angle', x: 86, y: 40 },
      { id: 'n6', label: 'Dual Umbrella Barbs', description: 'Stainless Crown Barbs', specification: 'Ensures immediate snag-free hookup on squid tentacles', x: 96, y: 40 }
    ],
    bestEnvironments: ['coastal_bay', 'rocky_point', 'inshore_flats']
  },

  gummy_shark_ledger: {
    id: 'gummy_shark_ledger',
    name: 'South Channel Gummy Shark Running Ledger',
    category: 'surf_heavy',
    summary: 'Heavy-duty current rig for targeting Gummy Sharks (Flake) in Port Phillip Bay\'s deep tidal channels (South Channel, Symonds Channel, Mud Islands).',
    whyIdeal: 'Heavy slider holds 4-8 oz sinker on bottom against fierce 4-knot channel current while gummy feeds along fresh salmon or squid chunks without resistance.',
    mainLineRecommendation: '30 - 50 lb Braided line or 25 - 30 lb Monofilament',
    leaderRecommendation: '36 - 48 inches of 60 - 80 lb Hard Monofilament or Fluorocarbon (resists abrasive shark skin)',
    hookRecommendation: 'Size 6/0 to 8/0 Heavy Duty Inline Circle Hook (corner jaw hookup)',
    sinkerRecommendation: '4 to 8 oz Star, Wire Grip, or Ezy-Grip Sinker clipped to slider',
    knots: [
      { name: 'Snell Knot or Uni Knot', description: 'High-strength connection to heavy circle hook.' },
      { name: 'Palomar Knot', description: 'Tied to heavy 100 lb barrel swivel.' }
    ],
    schematicNodes: [
      { id: 'n1', label: 'Main Line', description: '30-50 lb Braid', specification: 'Cuts heavy channel tide flow', x: 8, y: 35 },
      { id: 'n2', label: 'Heavy Sinker Slider', description: 'Ezy-Slider Clip', specification: 'Line moves freely without dragging sinker', x: 28, y: 35 },
      { id: 'n3', label: 'Channel Star Sinker', description: '4-8 oz Grip Weight', specification: 'Locks rig into shifting channel sand', x: 28, y: 72 },
      { id: 'n4', label: 'Heavy Rubber Bead', description: '8mm Rubber Stopper', specification: 'Buffers swivel from heavy lead', x: 44, y: 35 },
      { id: 'n5', label: '100 lb Crane Swivel', description: 'Heavy Swivel', specification: 'Tackles rolling sharks in current', x: 58, y: 35 },
      { id: 'n6', label: 'Abrasive-Proof Leader', description: '60-80 lb Tough Mono', specification: 'Resists rough dermal denticles', x: 75, y: 35 },
      { id: 'n7', label: '7/0 Circle Hook & Fresh Bait', description: '7/0 Circle Hook', specification: 'Chunk of fresh Australian salmon, eel, or squid', x: 92, y: 35 }
    ],
    bestEnvironments: ['coastal_bay', 'surf_beach', 'offshore_reef']
  },

  fish_finder_sliding: {
    id: 'fish_finder_sliding',
    name: 'Fish-Finder (Sliding Sinker) Rig',
    category: 'bottom_ledger',
    summary: 'The gold standard for surf and bottom fishing. Allows cautious fish to ingest bait and run without feeling sinker weight.',
    whyIdeal: 'When current or wind requires a heavy sinker (2-4 oz), the plastic sinker slide allows the line to pass freely through the weight so fish feel no resistance upon pickup.',
    mainLineRecommendation: '20 - 40 lb Braided line (high sensitivity, cuts through surf current)',
    leaderRecommendation: '24 - 36 inches of 20 - 30 lb Fluorocarbon (invisible, abrasion-resistant against shell beds)',
    hookRecommendation: '3/0 to 6/0 Inline Circle Hook (corner-of-mouth hooksets, fish-friendly)',
    sinkerRecommendation: '2 - 4 oz Pyramid Sinker (holds sandy bottom in surf) or Bank Sinker for rocky bottom',
    knots: [
      { name: 'Palomar Knot', description: 'Used to connect mainline to the top eye of the barrel swivel (95%+ knot strength).' },
      { name: 'Snell or Uni Knot', description: 'Used to tie fluorocarbon leader onto the shank or eye of the circle hook.' }
    ],
    schematicNodes: [
      { id: 'n1', label: 'Main Line', description: 'Braid (20-40 lb)', specification: 'Braided superline connected from rod tip', x: 8, y: 35 },
      { id: 'n2', label: 'Sinker Slide', description: 'Plastic clip sleeve', specification: 'Slides freely on mainline', x: 28, y: 35 },
      { id: 'n3', label: 'Pyramid / Bank Sinker', description: 'Weight (2-4 oz)', specification: 'Clips to sinker slide; anchors rig to bottom', x: 28, y: 70 },
      { id: 'n4', label: 'Rubber Shock Bead', description: 'Buffer (6-8mm)', specification: 'Protects swivel knot from heavy sinker battering', x: 44, y: 35 },
      { id: 'n5', label: 'Barrel Swivel', description: 'Brass Swivel (#4-#2)', specification: 'Prevents line twist during tidal drift', x: 58, y: 35 },
      { id: 'n6', label: 'Fluorocarbon Leader', description: '24" - 36" length', specification: '20-30 lb fluorocarbon line', x: 74, y: 35 },
      { id: 'n7', label: 'Inline Circle Hook', description: 'Size 3/0 - 6/0', specification: 'Natural bait presentation; automatic corner lip hook', x: 92, y: 35 }
    ],
    bestEnvironments: ['surf_beach', 'rocky_point', 'coastal_bay', 'estuary_inlet']
  },

  carolina_rig: {
    id: 'carolina_rig',
    name: 'Carolina / Running Sinker Rig',
    category: 'bottom_ledger',
    summary: 'Supreme versatility for dragging along sand flats, channel edges, and drop-offs for Flathead, Bream, and Estuary Perch.',
    whyIdeal: 'Keeps heavy egg sinker crawling bottom structure while leader allows natural bait or soft plastic to waft enticingly above sediment.',
    mainLineRecommendation: '15 - 30 lb Braided line or 12-17 lb Monofilament',
    leaderRecommendation: '18 - 30 inches of 15 - 25 lb Fluorocarbon',
    hookRecommendation: '2/0 - 4/0 Wide Gap or Offset EWG hook',
    sinkerRecommendation: '1/2 to 1 oz Egg Sinker or Brass bullet weight',
    knots: [
      { name: 'Uni Knot', description: 'Reliable connection to swivel and hook.' },
      { name: 'Palomar Knot', description: 'Direct connection from mainline to swivel.' }
    ],
    schematicNodes: [
      { id: 'n1', label: 'Main Line', description: 'Braid / Mono', specification: 'Tied from reel through sinker', x: 8, y: 40 },
      { id: 'n2', label: 'Sliding Egg Sinker', description: '1/2 - 1 oz Lead/Tungsten', specification: 'Free-sliding egg shape rolls across gravel & mud', x: 30, y: 40 },
      { id: 'n3', label: 'Glass / Plastic Bead', description: '8mm faceted bead', specification: 'Creates feeding click against weight; protects knot', x: 46, y: 40 },
      { id: 'n4', label: 'Barrel Swivel', description: 'Size #6 or #4', specification: 'Acts as stop for weight; eliminates twist', x: 58, y: 40 },
      { id: 'n5', label: 'Fluorocarbon Leader', description: '18" - 30" (15-20 lb)', specification: 'Supple fluorocarbon gives lifelike swimming action', x: 76, y: 40 },
      { id: 'n6', label: 'Offset Hook & Bait', description: 'EWG / Live Bait Hook', specification: 'Live shrimp, mud minnow, or soft plastic craw', x: 92, y: 40 }
    ],
    bestEnvironments: ['inshore_flats', 'estuary_inlet', 'coastal_bay', 'freshwater_lake']
  },

  paternoster_high_low: {
    id: 'paternoster_high_low',
    name: 'Paternoster / High-Low Flapper Rig',
    category: 'surf_heavy',
    summary: 'Double-dropper rig that presents two baits at differing depths above the sea floor, eliminating tangles in heavy wash.',
    whyIdeal: 'Keeps baits elevated away from crabs and kelp on the sea floor while heavy bottom sinker locks the rig in place.',
    mainLineRecommendation: '25 - 50 lb Braid or Mono',
    leaderRecommendation: '30 - 40 lb Mono or Fluorocarbon rig backbone',
    hookRecommendation: 'Two 1/0 - 4/0 Baitholder or Circle Hooks on 6-inch dropper loops',
    sinkerRecommendation: '3 - 5 oz Pyramid or Breakaway / Wire Sinker attached at terminal bottom snap',
    knots: [
      { name: 'Dropper Loop', description: 'Forms 4-6 inch branching loops extending 90 degrees from backbone.' },
      { name: 'Overhand Loop / Snap Swivel', description: 'At bottom to quickly exchange sinker weight as current shifts.' }
    ],
    schematicNodes: [
      { id: 'n1', label: 'Top Swivel', description: 'Connected to mainline', specification: 'Prevents rig twist in heavy surf swells', x: 10, y: 20 },
      { id: 'n2', label: 'Rig Backbone', description: '30-40 lb heavy mono', specification: 'Stiff monofilament holds droppers away from main stem', x: 35, y: 20 },
      { id: 'n3', label: 'Top Dropper Loop & Hook', description: 'Upper Bait (1/0-3/0)', specification: 'Presents high in water column for cruising fish', x: 55, y: 15 },
      { id: 'n4', label: 'Lower Dropper Loop & Hook', description: 'Lower Bait (1/0-3/0)', specification: 'Presents 10 inches off bottom for Australian flathead & salmon', x: 65, y: 50 },
      { id: 'n5', label: 'Bottom Snap Clip', description: 'Fast snap', specification: 'Permits swapping sinker sizes in 5 seconds', x: 80, y: 80 },
      { id: 'n6', label: 'Terminal Sinker', description: '3 - 5 oz Pyramid', specification: 'Anchors the rig at the very sea floor', x: 92, y: 85 }
    ],
    bestEnvironments: ['surf_beach', 'rocky_point', 'offshore_reef', 'coastal_bay']
  },

  texas_weedless_rig: {
    id: 'texas_weedless_rig',
    name: 'Weedless Texas / Snag-Proof Rig',
    category: 'finesse_subsurface',
    summary: 'The ultimate snag-proof setup for penetrating heavy timber snags, drowned river gums, and weed mats for Murray Cod, Golden Perch, and Australian Bass.',
    whyIdeal: 'Bullet sinker slides over obstacles without hanging up, while the hook point is skin-hooked flush inside soft plastic.',
    mainLineRecommendation: '30 - 50 lb Braided line (for sawing through weeds) or 15 lb Fluorocarbon',
    leaderRecommendation: 'Direct to braid or 15 - 20 lb Fluorocarbon leader',
    hookRecommendation: '3/0 to 5/0 Offset Extra Wide Gap (EWG) Worm Hook',
    sinkerRecommendation: '1/4 to 3/4 oz Tungsten Bullet Weight (pegged with rubber stopper for heavy cover)',
    knots: [
      { name: 'Palomar Knot', description: 'Maximum strength direct to EWG hook eye.' }
    ],
    schematicNodes: [
      { id: 'n1', label: 'Main Line', description: 'Heavy Braid / Fluoro', specification: 'Abrasion resistant for cover extraction', x: 10, y: 50 },
      { id: 'n2', label: 'Bobber Stopper (Peg)', description: 'Rubber sinker peg', specification: 'Keeps weight snug to hook for punching mat vegetation', x: 30, y: 50 },
      { id: 'n3', label: 'Tungsten Bullet Weight', description: '1/4 - 1/2 oz Bullet', specification: 'Streamlined nose slithers through reeds and grass', x: 45, y: 50 },
      { id: 'n4', label: 'EWG Offset Hook', description: '3/0 - 4/0 EWG', specification: 'Wide gap ensures solid hook penetration on the strike', x: 65, y: 50 },
      { id: 'n5', label: 'Soft Plastic Bait', description: 'Senko, Craw, or Creature', specification: 'Hook point tucked flush into plastic body', x: 88, y: 50 }
    ],
    bestEnvironments: ['freshwater_lake', 'freshwater_river', 'inshore_flats']
  },

  drop_shot_rig: {
    id: 'drop_shot_rig',
    name: 'Finesse Drop Shot Rig',
    category: 'finesse_subsurface',
    summary: 'Supreme post-frontal cold-front and high-pressure weapon. Suspends bait precisely in fish strike zone without moving sinker.',
    whyIdeal: 'When barometric pressure is rising or high and fish are tight-lipped, subtle shivering of bait at exact target depth triggers reflexive bites.',
    mainLineRecommendation: '10 - 15 lb Braided mainline to 6 - 8 lb Fluorocarbon leader',
    leaderRecommendation: '6 - 8 ft of 6 - 10 lb Fluorocarbon connected via FG or Double Uni knot',
    hookRecommendation: '#1 or #2 Drop Shot Hook or Light Wire Octopus Hook',
    sinkerRecommendation: '3/16 to 3/8 oz Teardrop or Cylinder Drop Shot Weight with pinch-clip',
    knots: [
      { name: 'Palomar Knot with Tag Dropped Down', description: 'Crucial: pass tag end back down through eye so hook stands 90 degrees outward.' }
    ],
    schematicNodes: [
      { id: 'n1', label: 'Main Line', description: 'Thin Braid (10 lb)', specification: 'Zero stretch for detecting micro-taps', x: 10, y: 20 },
      { id: 'n2', label: 'Fluoro Leader', description: '6-8 lb Clear Fluorocarbon', specification: 'Totally stealth in clear water', x: 35, y: 30 },
      { id: 'n3', label: 'Horizontally Standing Hook', description: '#1 Drop Shot Hook', specification: 'Tied 12-24" above weight with hook pointing UP', x: 55, y: 40 },
      { id: 'n4', label: 'Finesse Bait', description: '3" Minnow / Worm', specification: 'Nose-hooked to quiver with subtle rod tip shakes', x: 72, y: 36 },
      { id: 'n5', label: 'Dropper Line', description: '12-20" Tag End', specification: 'Sets exact distance bait floats above bottom sediment', x: 55, y: 65 },
      { id: 'n6', label: 'Pinch-Clip Weight', description: '1/4 oz Tungsten', specification: 'Pinches onto line; pulls off harmlessly if snagged in rocks', x: 55, y: 88 }
    ],
    bestEnvironments: ['freshwater_lake', 'freshwater_river', 'rocky_point', 'coastal_bay']
  },

  popping_cork_rig: {
    id: 'popping_cork_rig',
    name: 'Acoustic Popping Cork Rig',
    category: 'float_surface',
    summary: 'Deadly in shallow Australian flats, weed edges, and murky estuary mouths. Emulates the surface splash and clicking sound of fleeing prawns and schooling whitebait for Bream, Flathead, and Barramundi.',
    whyIdeal: 'Surface chugging draws predator attention from dozens of yards away, while bait hangs in natural suspended strike zone.',
    mainLineRecommendation: '20 - 30 lb Braided line (floats, high hook-setting speed)',
    leaderRecommendation: '20 - 30 lb Fluorocarbon leader (24-36 inches under cork)',
    hookRecommendation: '1/0 Kahle Hook, 1/0 Circle Hook, or 1/16 oz Jighead',
    sinkerRecommendation: 'Integrated brass/glass beads on cork wire + 1/8 oz split shot or light jig',
    knots: [
      { name: 'Loop Knot (Non-Slip Mono Loop)', description: 'Tied at hook to give live shrimp or paddletail maximum natural kick.' }
    ],
    schematicNodes: [
      { id: 'n1', label: 'Mainline Braid', description: '20-30 lb High-Vis Braid', specification: 'Direct to top cork eye', x: 10, y: 35 },
      { id: 'n2', label: 'Popping Cork Body', description: 'Concave cupped face', specification: 'Produces deep "chug" and surface water eruption on sharp twitch', x: 35, y: 35 },
      { id: 'n3', label: 'Brass / Ceramic Beads', description: 'Sound Chambers', specification: 'Click and clack against wire stem to emulate snapping shrimp', x: 48, y: 42 },
      { id: 'n4', label: 'Lower Swivel', description: 'Under-cork attachment', specification: 'Connects leader below cork', x: 56, y: 50 },
      { id: 'n5', label: 'Fluorocarbon Drop', description: '24" - 36" (20 lb)', specification: 'Positions bait above bottom grass and oyster tops', x: 70, y: 65 },
      { id: 'n6', label: 'Live Shrimp / Jig', description: 'Hooked via Non-slip Loop', specification: 'Kicks and dances every time cork pops', x: 88, y: 80 }
    ],
    bestEnvironments: ['inshore_flats', 'estuary_inlet', 'coastal_bay']
  },

  freeline_live_bait: {
    id: 'freeline_live_bait',
    name: 'Stealth Free-Line Rig',
    category: 'finesse_subsurface',
    summary: 'Pure stealth natural presentation. Zero sinker or hardware — bait swims freely with tidal drift right into predator mouths.',
    whyIdeal: 'Crucial for wary Australian species like Kingfish, Barramundi, or clear-water Bream around bridge lights, channel edges, or shallow seagrass flats where any sinker looks unnatural.',
    mainLineRecommendation: '15 - 30 lb Braid connected directly to fluorocarbon leader',
    leaderRecommendation: '36 - 48 inches of 25 - 40 lb Fluorocarbon (abrasive protection against gill plates)',
    hookRecommendation: '1/0 to 4/0 Light Wire Circle Hook nose-hooked or collar-hooked',
    sinkerRecommendation: 'None (or tiny #4 split shot 12" above hook if strong current requires slight depth)',
    knots: [
      { name: 'FG Knot or Double Uni', description: 'Ultra-slim line-to-leader connection that glides seamlessly through rod guides.' },
      { name: 'Non-Slip Mono Loop Knot', description: 'Allows live bait 360-degree freedom to swim naturally.' }
    ],
    schematicNodes: [
      { id: 'n1', label: 'Main Line', description: 'Braided Line', specification: 'Direct spool to guide', x: 10, y: 45 },
      { id: 'n2', label: 'FG / Double Uni Knot', description: 'Slim Line Join', specification: 'Zero bulk, 100% strength', x: 38, y: 45 },
      { id: 'n3', label: 'Long Fluoro Leader', description: '3 - 4 ft Fluorocarbon', specification: 'Invisible in water column', x: 62, y: 45 },
      { id: 'n4', label: 'Optional Split Shot', description: 'Removable #4 shot', specification: 'Only used if tide sweep holds bait too high', x: 74, y: 45 },
      { id: 'n5', label: 'Circle Hook & Live Bait', description: 'Light wire circle hook', specification: 'Bait swims freely in current without dragging heavy lead', x: 92, y: 45 }
    ],
    bestEnvironments: ['inshore_flats', 'estuary_inlet', 'rocky_point', 'coastal_bay']
  },

  wire_leader_surf_rig: {
    id: 'wire_leader_surf_rig',
    name: 'Armored Wire Bite-Leader Rig',
    category: 'surf_heavy',
    summary: 'Heavy-duty tooth-proof rig engineered for sharp-toothed Australian predators (Tailor, Spanish Mackerel, Barracouta, Queenfish).',
    whyIdeal: 'Razor-sharp teeth sever monofilament and fluorocarbon in a fraction of a second. Titanium/Nylon wire ensures clean landing in surf and open wash.',
    mainLineRecommendation: '30 - 50 lb Braid',
    leaderRecommendation: '12 - 18 inches of 30 - 45 lb Nylon-Coated Multi-Strand Wire or Single-Strand Titanium',
    hookRecommendation: '4/0 - 6/0 Heavy Duty Long-Shank J-Hook or Heavy Circle Hook',
    sinkerRecommendation: '2 - 4 oz Pyramid sinker on fish-finder slide above swivel',
    knots: [
      { name: 'Haywire Twist or Figure-8 crimp', description: 'Secures wire to heavy barrel swivel and hook eye without slipping.' }
    ],
    schematicNodes: [
      { id: 'n1', label: 'Main Line', description: '30-50 lb Braid', specification: 'Backbone from reel', x: 10, y: 40 },
      { id: 'n2', label: 'Sinker Slider & Sinker', description: '3 oz Pyramid', specification: 'Holds bottom in current', x: 30, y: 70 },
      { id: 'n3', label: 'Heavy Duty Swivel', description: '80 lb Crane Swivel', specification: 'Buffer between braid and wire', x: 45, y: 40 },
      { id: 'n4', label: 'Nylon / Titanium Wire', description: '30-45 lb Tooth-Proof Wire', specification: 'Withstands razor-sharp teeth shear', x: 70, y: 40 },
      { id: 'n5', label: 'Long Shank Hook & Bait', description: '4/0-6/0 Bait Hook', specification: 'Chunk bait or live fish hooked securely', x: 92, y: 40 }
    ],
    bestEnvironments: ['surf_beach', 'rocky_point', 'offshore_reef', 'freshwater_river']
  },

  float_slip_bobber: {
    id: 'float_slip_bobber',
    name: 'Precision Slip Bobber Rig',
    category: 'float_surface',
    summary: 'Adjustable depth float presentation allowing an angler to fish at any depth (5 ft to 30 ft) while still casting easily.',
    whyIdeal: 'Line slides freely through bobber until bobber stop knot hits top of float, holding bait dead in the strike zone.',
    mainLineRecommendation: '6 - 12 lb Monofilament or Fluorocarbon (smooth through bobber tube)',
    leaderRecommendation: '4 - 8 lb Fluorocarbon (18 - 24 inches below swivel)',
    hookRecommendation: '#4 - #8 Baitholder or Fine-wire Aberdeen Hook',
    sinkerRecommendation: '1/8 oz Egg Sinker or stacked split shots 12 inches above hook to balance float buoyancy',
    knots: [
      { name: 'Stop Knot (Dacron string)', description: 'Tied around mainline at desired depth; reels right onto spool without jamming.' }
    ],
    schematicNodes: [
      { id: 'n1', label: 'Bobber Stop Knot', description: 'Thread knot on mainline', specification: 'Adjustable: slide up or down to change depth', x: 12, y: 25 },
      { id: 'n2', label: 'Small Glass Bead', description: 'Bead', specification: 'Prevents knot from pulling into bobber tube', x: 26, y: 28 },
      { id: 'n3', label: 'Balsa Slip Float', description: 'Sensitive Slip Bobber', specification: 'Slides freely during casting; stands upright at depth', x: 42, y: 35 },
      { id: 'n4', label: 'Balancing Split Shot', description: 'Weight to ballast float', specification: 'Pulls line through float until stop bead hits', x: 62, y: 55 },
      { id: 'n5', label: 'Micro Swivel', description: 'Size #10-#12', specification: 'Separates leader', x: 74, y: 65 },
      { id: 'n6', label: 'Fine Hook & Bait', description: '#6 Aberdeen / Baitholder', specification: 'Suspends live minnow, worm, or roe naturally', x: 90, y: 78 }
    ],
    bestEnvironments: ['freshwater_lake', 'freshwater_river', 'estuary_inlet']
  },

  ned_finesse_rig: {
    id: 'ned_finesse_rig',
    name: 'Ned Finesse Rig',
    category: 'finesse_subsurface',
    summary: 'Ultra-finesse presentation. Flat mushroom jighead paired with buoyant plastic stands straight up on bottom.',
    whyIdeal: 'When Australian estuary fish (Bream, Estuary Perch, Golden Perch) are shut down after cold front high pressure, this subtle, small-profile bait shivering on bottom catches wary fish.',
    mainLineRecommendation: '10 lb Braid to 4 - 8 lb Fluorocarbon leader',
    leaderRecommendation: '6 - 8 ft of 4 - 8 lb Fluorocarbon',
    hookRecommendation: 'Integrated light wire hook on 1/16 oz to 1/6 oz Mushroom Head',
    sinkerRecommendation: 'Integrated mushroom jighead (no separate weight)',
    knots: [
      { name: 'Loop Knot or Clinch Knot', description: 'Tight connection or loop allowing slight pivot.' }
    ],
    schematicNodes: [
      { id: 'n1', label: 'Braided Mainline', description: '6-10 lb PE Braid', specification: 'High sensitivity for bite detection', x: 12, y: 45 },
      { id: 'n2', label: 'Double Uni Line Join', description: 'Leader Knot', specification: 'Braid to Fluorocarbon transition', x: 35, y: 45 },
      { id: 'n3', label: 'Fluorocarbon Leader', description: '4-8 lb Stealth Fluoro', specification: 'Zero visibility in clear water', x: 58, y: 45 },
      { id: 'n4', label: 'Mushroom Head Jig', description: '1/10 oz Mushroom Head', specification: 'Flat face lands on lake bottom and stays upright', x: 78, y: 65 },
      { id: 'n5', label: 'Buoyant TRD Plastic', description: '2.5" Floating Plastic', specification: 'Stands 90 degrees vertical off bottom, waving like a defensive yabby', x: 92, y: 35 }
    ],
    bestEnvironments: ['freshwater_lake', 'freshwater_river', 'rocky_point']
  }
};
