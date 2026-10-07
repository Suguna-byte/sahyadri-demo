/**
 * Central image registry. Components never hard-code URLs — they ask for
 * a semantic key. Swapping stock photography for real site photos means
 * editing this one file (or pointing keys at /public/images/*).
 *
 * All photos: Unsplash License (free for commercial use).
 */
const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=2000`;

export const img = {
  crew: u("photo-1504307651254-35680f356dfd"),
  crane: u("photo-1599707254554-027aeb4deacd"),
  excavator: u("photo-1575281923032-f40d94ef6160"),
  siteTeam: u("photo-1694521787162-5373b598945c"),
  steelFrame: u("photo-1527335988388-b40ee248d80c"),
  concreteWork: u("photo-1694522362256-6c907336af43"),
  steelYard: u("photo-1694521787673-28cbd8830ea5"),
  interiorWood: u("photo-1610459716431-e07abcf74230"),
  scaffolding: u("photo-1713593930871-e21d7f9ef4a1"),
  concreteFacade: u("photo-1602757115429-b4190ae087be"),
  rebar: u("photo-1623489254637-a2dd8375243d"),
  structure: u("photo-1621511075938-f03482369feb"),
  craneSkyline: u("photo-1644221150167-fb4fafa7f411"),
  ladder: u("photo-1664662568348-24b1482b6354"),
  carpentry: u("photo-1646324554833-f0b6a479fa5d"),
  towerLowAngle: u("photo-1515263487990-61b07816b324"),
  highrise: u("photo-1545324418-cc1a3fa10c00"),
  glassBalconies: u("photo-1624204386084-dd8c05e32226"),
  warmFacade: u("photo-1579632652768-6cb9dcf85912"),
  monoFacade: u("photo-1516501312919-d0cb0b7b60b8"),
  whiteResidence: u("photo-1619994121345-b61cd610c5a6"),
  brickTower: u("photo-1570675894641-8860d49afece"),
  whiteBlock: u("photo-1595039357995-905cad2933e3"),
  glassTower: u("photo-1567684014761-b65e2e59b9eb"),
  twinTowers: u("photo-1568295123886-8d09a5986b4e"),
  bedroom: u("photo-1662454419716-c4c504728811"),
  living: u("photo-1662454419736-de132ff75638"),
  balconies: u("photo-1692681272972-ad7ae5a8a7fd"),
  greenFacade: u("photo-1592276040264-e10344a6a10e"),
  studio: u("photo-1664892798972-079f15663b16"),
} as const;

export type ImageKey = keyof typeof img;
