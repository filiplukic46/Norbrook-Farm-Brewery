// All visible copy and data for norbrookfarm.com (homepage v2, "The Flight").
// Source: the client's content brief and the old site (address, hours, beers, reviews).
// Assumptions / placeholders the owner must confirm (also listed in the handoff message):
//   - placeholder: social profile URLs (handles guessed from the brewery name).
//   - placeholder: store locator and bike rental links point to the current site's home page.
//   - placeholder: table requests and newsletter sign-ups open an email to beer@norbrookfarm.com
//     until a booking tool / newsletter service is chosen.
//   - Style notes on beer pages describe the beer STYLE in general, not tasting notes of the beer.

import { url } from '../lib/url';
import flightPizza from '../assets/photos/flight-pizza.jpg';
import patio from '../assets/photos/patio.jpg';
import interior from '../assets/photos/interior.jpg';
import bikeTrail from '../assets/photos/bike-trail.jpg';
import discGolf from '../assets/photos/disc-golf.jpg';
import farmTrail from '../assets/photos/farm-trail.jpg';
import venueFire from '../assets/photos/venue-fire.jpg';
import spread from '../assets/photos/spread.jpg';
import chef from '../assets/photos/chef.jpg';
import pizzaOven from '../assets/photos/pizza-oven.jpg';
import staff from '../assets/photos/staff.jpg';
import canSaison from '../assets/cans/dennis-hill-estate-saison.png';
import canCog from '../assets/cans/cog-ale-kolsch-style.png';
import canBday from '../assets/cans/birth-day-ipa.png';
import canTight from '../assets/cans/tight-lines-pilsner.png';
import canSend from '../assets/cans/send-it-neipa.png';
import canContractors from '../assets/cans/contractors-beer-american-lager.png';
import canCrickets from '../assets/cans/crickets-sour-ale.png';
import canHamlet from '../assets/cans/this-is-a-hamlet-of-heathens-american-ipa.png';
import canPisgah from '../assets/cans/mount-pisgah-ale-ipa.png';
import canBeckley from '../assets/cans/beckley-furnace-brown-ale.png';
import canPorter from '../assets/cans/ol-man-mcmullens-porter.png';
import canCircus from '../assets/cans/the-circus-neipa.png';
import canDoldrums from '../assets/cans/doldrums-winter-imperial-stout.png';
import canTapBack from '../assets/cans/tap-back-scottish-ale.png';
import canDoc from '../assets/cans/doc-murphys-irish-style-ale.png';
import canQuinn from '../assets/cans/biker-quinn-neipa.png';
import canFordson from '../assets/cans/fordson-cork.png';
import canOnTheHill from '../assets/cans/on-the-hill-new-england-ipa.png';
import canGoulet from '../assets/cans/goulets-grade-a-red-ale.png';

export const site = {
  name: 'Norbrook Farm Brewery',
  short: 'Norbrook',
  url: 'https://www.norbrookfarm.com',
  description:
    'A farm brewery in Colebrook, CT with a copper bar, a wood-fired pizza oven, 450 acres of trails and an 18-hole disc golf course.',
  address: { street: '204 Stillman Hill Rd.', city: 'Colebrook', region: 'CT', zip: '06021' },
  phone: '860.909.1016',
  phoneHref: 'tel:+18609091016',
  email: 'beer@norbrookfarm.com',
  hours: [
    { days: 'Wed to Sat', time: '12 to 8 pm', spec: ['We', 'Th', 'Fr', 'Sa'], opens: '12:00', closes: '20:00' },
    { days: 'Sun', time: '12 to 6 pm', spec: ['Su'], opens: '12:00', closes: '18:00' },
    { days: 'Mon to Tue', time: 'Closed', spec: [], opens: '', closes: '' },
  ],
  links: {
    order: 'https://www.clover.com/online-ordering/norbrook-farm-brewery-colebrook',
    merch: 'https://norbrookfarm.square.site',
    directions: 'https://www.google.com/maps/dir/?api=1&destination=204+Stillman+Hill+Rd+Colebrook+CT+06021',
    reviews: 'https://www.google.com/maps/search/?api=1&query=Norbrook+Farm+Brewery+Colebrook+CT',
    storeLocator: 'https://www.norbrookfarm.com/', // placeholder
    bikeRentals: 'https://www.norbrookfarm.com/', // placeholder
    jobs: 'mailto:beer@norbrookfarm.com?subject=Job%20application',
    party: 'mailto:beer@norbrookfarm.com?subject=Private%20party',
    catering: 'mailto:beer@norbrookfarm.com?subject=Catering',
    newsletter: 'mailto:beer@norbrookfarm.com?subject=Add%20me%20to%20brew%20news', // placeholder
  },
  socials: [
    { label: 'Facebook', href: 'https://www.facebook.com/norbrookfarmbrewery' }, // placeholder
    { label: 'Instagram', href: 'https://www.instagram.com/norbrookfarmbrewery' }, // placeholder
    { label: 'Untappd', href: 'https://untappd.com/NorbrookFarmBrewery' }, // placeholder
  ],
};

export const hero = {
  h1: 'Norbrook Farm Brewery in Colebrook, CT',
  lede: 'A farm brewery on Stillman Hill with woods to ride, a disc golf course, a copper bar and a pizza oven. Order a flight and taste your way down the paddle.',
  photo: { src: flightPizza, alt: 'An arugula pizza next to a wooden flight paddle holding five NFB tasting glasses, from pale gold to dark porter' },
  sheetTitle: 'five glasses, five ways in',
};

export const about = {
  h2: 'The woods are calling, and so is the taproom',
  aside: '(and the trails, and the animals)',
  h3: 'A working homestead with a serious beer habit',
  paragraphs: [
    "This brewery in Colebrook isn't exactly somewhere you end up by accident. Head far enough into Connecticut's northwest hills, and you'll find an estate where two brothers decided that great pour and a whole lot of outdoor space belonged together.",
    "John and Randy Auclair started Norbrook Farm Brewery in 2018, creating something bigger than a taproom. There's mountain biking through the woods, animals to say hello to, 18-hole disc golf, and a copper bar waiting when you're ready to call it a day. Best part? The trails and course are open for adventure even when the brewery isn't!",
    "Farmhouse-style brews share the lineup with ales, lagers, and IPAs. Add a full kitchen and a pizza oven, and you've got a place that's well worth the drive. Start your visit with dirt on your shoes and end with a darn good beer in your hand.",
  ],
  photo: { src: patio, alt: 'Friends in jackets around the stone fire pit behind the taproom, a white dog resting at their feet' },
  caption: 'the fire pit out back',
  facts: [
    { n: '2018', label: 'Founded by the Auclair brothers' },
    { n: '450', label: 'Acres of woods, fields and trails' },
    { n: '18', label: 'Holes of disc golf, par 55' },
  ],
};

export const trail = {
  h2: ['Adventure', 'starts', 'out here'],
  h3: 'Grab your gear, check out the trail maps',
  body: 'At Norbrook Farm, 450 acres of outdoor adventure are yours to explore. Take the easy Tower Walk for views of the northern hills, or hit the mountain bike trails: fast singletrack over rocky New England ground, wooden bridges, and technical drops. The 18-hole, par-55 disc golf course stretches across three miles, with plenty of fresh air along the way.',
  stamp: 'Brewery closed? The trails & disc golf course are still open.',
  photos: [
    { src: bikeTrail, alt: 'A mountain biker leaning into a dusty turn on a wooded singletrack trail', caption: 'Mountain biking: flowy singletrack, wooden bridges, technical drops. No bike? Rent one on site.' },
    { src: discGolf, alt: 'A blue disc resting in the chains of a disc golf basket', caption: '18 holes, par 55, about three miles of fields and forest' },
    { src: farmTrail, alt: 'A dog trotting down a farm road between autumn trees and tall grass', caption: 'the Tower Walk: an easy climb, big views of the northern hills' },
  ],
};

export type Pour = 'straw' | 'gold' | 'amber' | 'ruby' | 'stout';
export type Glass = {
  id: string;
  n: number;
  pour: Pour;
  dark: boolean;
  short: string; // name on the tasting sheet
  h2: string[];
  lead: string;
  body: string;
  tags: string[];
  note?: string;
  cta: { label: string; href: string };
};

export const glasses: Glass[] = [
  {
    id: 'celebrate', n: 1, pour: 'straw', dark: false, short: 'Celebrate With Us',
    h2: ['Celebrate', 'with us'],
    lead: 'Ditch the ballroom. Party brewery-style!',
    body: "Our outdoor Sunroom and private event space come with country air, beer flights and live music when it's on. Tell us what you're planning.",
    tags: ['Weddings', 'Reunions', 'Business meetings'],
    note: "tasting notes: country air, string lights, live music when it's on",
    cta: { label: 'Book a party', href: site.links.party },
  },
  {
    id: 'catering', n: 2, pour: 'gold', dark: false, short: 'Catering',
    h2: ['Catered', 'by the farm'],
    lead: 'Your Colebrook crew will eat well',
    body: 'Casual eats and a selection of crafts for birthdays, office parties and laid-back get-togethers. Get in touch and we will plan the spread with you.',
    tags: ['Birthdays', 'Corporate functions', 'Get-togethers'],
    note: 'casual eats + a selection of crafts',
    cta: { label: 'Plan your catering', href: site.links.catering },
  },
  {
    id: 'book', n: 3, pour: 'amber', dark: true, short: 'Book a Table',
    h2: ['Book your table', 'in seconds'],
    lead: 'Pull up a chair in the taproom',
    body: 'An IPA, something seasonal or a cocktail, with something from the kitchen on the side. Save a spot and we will have it ready.',
    tags: [],
    note: 'room for everyone',
    cta: { label: 'Book a table', href: `mailto:${site.email}?subject=Table%20request` },
  },
  {
    id: 'to-go', n: 4, pour: 'ruby', dark: true, short: 'Order to Go',
    h2: ['Order your', 'pub fix to go'],
    lead: 'Colebrook favorites with a crafty twist',
    body: 'Wood-fired pizza, a Reuben on marble rye and cans of what is pouring, packed up and ready when you are.',
    tags: [],
    note: 'pick up at the farm',
    cta: { label: 'Order now', href: site.links.order },
  },
  {
    id: 'jobs', n: 5, pour: 'stout', dark: true, short: 'Work With Us',
    h2: ['Work with us'],
    lead: 'Get behind the buzz, join our crew',
    body: 'Know your way around a busy shift? Norbrook is hiring. Send us an application.',
    tags: [],
    note: 'the Norbrook crew',
    cta: { label: 'Send an application', href: site.links.jobs },
  },
];

export const glassMedia = {
  celebrate: { src: venueFire, alt: 'The stone fireplace room of the event space, with string lights and wooden chairs' },
  catering: { src: spread, alt: 'A wood-fired arugula pizza drizzled with balsamic on a party table' },
  cateringKitchen: { src: chef, alt: 'A cook in an apron at work in the Norbrook kitchen' },
  book: { src: interior, alt: 'The taproom dining room: guests at wooden tables, a stone fireplace on the left and a loft above' },
  toGo: { src: pizzaOven, alt: 'A pizza baking in the wood-fired oven, flames curling overhead' },
  jobs: { src: staff, alt: 'Two smiling Norbrook crew members in front of the draft beer menu' },
};

export const toGoMenu = [
  { group: 'from the kitchen', items: [['Buffalo Chicken Pizza', 'wood-fired'], ['Reuben on Marble Rye', 'sandwich'], ['Arugula Pizza', 'wood-fired']] },
  { group: 'crafts to go', items: [['Birth Day IPA', 'Double IPA, 8%'], ["Contractors' Beer", 'Lager, 4%'], ["Ol' Man McMullen's Porter", 'Porter, 5.8%']] },
];

export const jobsStatement = "We're after people with initiative, a sense of humor, and the willingness to pitch in.";

export type Beer = {
  slug: string; name: string; style: string; abv: string; ibu: number; pour: Pour; dark: boolean;
  can: ImageMetadata; group: 'year-round' | 'seasonal';
  /** The brewer's own words, from the brewery's BeerMenus listing. Missing for seasonals not on the menu now. */
  description?: string;
  /** What the style is, in general terms. Shown when there is no brewer's description. */
  styleNote: string;
  hops?: string; malt?: string;
  /** Tasting sheet. placeholder: look, nose, taste, serve and pairing are written from the style and the
   *  brewer's description, not from Norbrook's own tasting notes. The owner should check them. */
  sheet: { look: string; nose: string; taste: string; serve: string; pair: string };
};

export const beers: Beer[] = [
  { slug: "dennis-hill-estate-saison", name: "Dennis Hill Estate Saison", style: "Saison / Farmhouse Ale", abv: "5.4%", ibu: 17, pour: "gold", dark: false, can: canSaison, group: "year-round",
    description: "Dennis Hill State Park, in Norfolk, CT, was once the sprawling 240 acre estate of Dr. Frederick Shepard Dennis. The panoramic sights from the summit are what inspired this brew, a wheat beer that is lightly spiced with coriander and orange peel. A special yeast was employed to add depth and dimension.",
    styleNote: "Saisons began as the beers Belgian farms brewed for summer field hands: dry, lively and a little spicy from the yeast. Ours is about as local as beer gets.",
    malt: "Wheat, with coriander and orange peel",
    sheet: { look: "Hazy gold under a big, rocky white head", nose: "Coriander, orange peel and a spicy yeast", taste: "Dry and spritzy: light fruit up front, a peppery finish", serve: "Tulip glass, 45 to 50°F", pair: "Arugula Pizza: the spice in the beer meets the greens" } },
  { slug: "cog-ale", name: "Cog Ale", style: "Kölsch", abv: "4.7%", ibu: 17, pour: "straw", dark: false, can: canCog, group: "year-round",
    description: "A beer brewed in honor of the cogs of the world; the people who make the world go round. A light, crisp, and refreshing beer brewed with the highest quality malts and balanced with Tettnanger and Crystal hops. Look for a subdued malt flavor.",
    styleNote: "Kölsch is Cologne's own style: a pale ale fermented warm and finished cold, so it drinks clean and crisp like a lager.",
    hops: "Tettnanger and Crystal",
    sheet: { look: "Pale straw, bright and clear, a thin white head", nose: "Soft bready malt and a faint fruity note from the yeast", taste: "Clean and crisp, a subdued malt and a quick, dry finish", serve: "Tall narrow glass, 40 to 45°F", pair: "Reuben on Marble Rye: crisp enough to cut the richness" } },
  { slug: "birth-day-ipa", name: "Birth Day IPA", style: "Double IPA", abv: "8%", ibu: 60, pour: "amber", dark: true, can: canBday, group: "year-round",
    description: "Flaked oats along with pale & wheat malts create a smooth cake-like texture. Tropical, citrus and piney notes come from the special “Birthday” hops we’ve used throughout the brewing process. We hope you enjoy this celebratory brew!",
    styleNote: "A double IPA leans on more malt and more hops than a regular IPA, which brings a bigger body and a stronger pour.",
    hops: "The special “Birthday” hops",
    malt: "Pale and wheat malts, flaked oats",
    sheet: { look: "Deep gold to light amber, a sturdy off-white head", nose: "Tropical fruit, citrus and pine", taste: "Smooth, almost cake-like body under a firm bitterness. It is 8%, so sip", serve: "Tulip or snifter, around 50°F", pair: "Buffalo Chicken Pizza: the hops stand up to the heat" } },
  { slug: "tight-lines", name: "Tight Lines", style: "Pilsner", abv: "5.6%", ibu: 25, pour: "straw", dark: false, can: canTight, group: "year-round",
    description: "This Bohemian style Pilsner pours a golden straw color and carries a sophisticated but uncomplicated malt profile. This fine brew was created to pay homage to the man pictured on the can, Thomas Maxwell. Tom was a Master bamboo fly rod builder, an intellectual, and a kind-hearted man who many adored, including our Head Brewer, Colin Coan.",
    styleNote: "Pilsner is the pale, crisp lager that the rest of the lager world grew from, with a clean, bitter snap at the finish.",
    sheet: { look: "Golden straw with a tight white head", nose: "Bready malt and floral, spicy hops", taste: "Light body, crisp, with a clean bitter snap at the finish", serve: "Pilsner glass, 40 to 45°F", pair: "Arugula Pizza: crisp against the char and the greens" } },
  { slug: "mount-pisgah-ale", name: "Mount Pisgah Ale", style: "American IPA", abv: "6.8%", ibu: 55, pour: "gold", dark: false, can: canPisgah, group: "year-round",
    description: "Aggressively hopped with Citra, Mosaic, Amarillo, & El Dorado then balanced with pale, wheat, & caramel malts, which help create a smooth balanced ale.",
    styleNote: "An American IPA with a firmer bite: at 55 IBU the hops lead, over a clean malt base that keeps it smooth.",
    hops: "Citra, Mosaic, Amarillo and El Dorado",
    malt: "Pale, wheat and caramel malts",
    sheet: { look: "Gold to light amber, a lasting white head", nose: "Citrus and tropical fruit", taste: "Bold and bitter, smoothed out by the caramel malt", serve: "Shaker or IPA glass, 45 to 50°F", pair: "Buffalo Chicken Pizza: the bitterness cuts the heat and the cheese" } },
  { slug: "beckley-furnace-ale", name: "Beckley Furnace Ale", style: "Brown Ale", abv: "6%", ibu: 20, pour: "ruby", dark: true, can: canBeckley, group: "year-round",
    description: "Our offering of an American-style Brown Ale. Pale malt along with multiple specialty malts lend this brew smooth, nutty and warm toasty notes. Chinook and Cascade hops help keep this brew true to style.",
    styleNote: "Brown ales trade hop bite for malt: toasted bread, nuts and a little caramel, smooth and easy going.",
    hops: "Chinook and Cascade",
    malt: "Pale malt and several specialty malts",
    sheet: { look: "Chestnut brown with a tan head", nose: "Toasted bread, nuts and a little caramel", taste: "Smooth and malty, warm and toasty, a gentle finish", serve: "Pint glass, 50 to 55°F", pair: "Reuben on Marble Rye: malt and rye, made for each other" } },
  { slug: "ol-man-mcmullens-porter", name: "Ol' Man McMullen's Porter", style: "American Porter", abv: "5.8%", ibu: 30, pour: "stout", dark: true, can: canPorter, group: "year-round",
    description: "This rich, roasted brew with hints of chocolate, coffee & toffee is packed full of American hops. Dark as night and ink black like Ol’ Man McMullen Pond from the steady Hemlock runoff. Ol’ Man McMullen was a porter by trade and we’ve brewed this to pay homage to him.",
    styleNote: "Porter is the dark ale London's porters drank: roasted malt, chocolate and coffee, lighter on its feet than a stout.",
    hops: "American hops",
    sheet: { look: "Ink black, a creamy tan head", nose: "Chocolate, coffee and toffee", taste: "Rich and roasted, with a dry, hoppy finish", serve: "Pint glass, 50 to 55°F", pair: "Reuben on Marble Rye: the roast meets the rye" } },
  { slug: "the-circus", name: "The Circus", style: "New England Session IPA", abv: "5%", ibu: 25, pour: "straw", dark: false, can: canCircus, group: "year-round",
    description: "Welcome to “The Circus”! Our fun easy-drinking Session IPA brewed with pale malt, oats and stuffed full of Galaxy hops. Along with Galaxy we juggle in more rotating citrus forward, tropical and fruity hops for a new performance in every batch. Grab a pint and enjoy the show!",
    styleNote: "A session take on the New England IPA: all the haze and juicy hops, at 5% so a second one is easy.",
    hops: "Galaxy, plus a rotating cast in every batch",
    malt: "Pale malt and oats",
    sheet: { look: "Hazy pale gold", nose: "Citrus and tropical fruit", taste: "Light and soft, juicy, with a gentle bitterness", serve: "Tulip or shaker glass, around 45°F", pair: "Arugula Pizza: light enough to let the greens through" } },
  { slug: "this-is-a-hamlet-of-heathens", name: "This Is A Hamlet of Heathens", style: "American IPA", abv: "5.7%", ibu: 40, pour: "amber", dark: true, can: canHamlet, group: "year-round",
    description: "Meekertown was a community of colliers working the charcoal industry in an area of South Norfolk / Falls Village, now part of Great Mountain Forest. In 1820 a local deacon visited the camp to persuade them to accept religion and renounce their way of life. The deacon deemed the community “a hamlet of heathens, living in intellectual, moral and spiritual darkness.” We’ve brewed this easy-drinking IPA with wild hops harvested from Meekertown.",
    styleNote: "The American IPA puts American hops up front: bitter, bright and resinous, with enough malt to hold it together.",
    hops: "Wild hops harvested from Meekertown",
    sheet: { look: "Gold to light amber, a lasting white head", nose: "Bright, floral and resinous", taste: "Easy drinking, bright bitterness and a resinous finish", serve: "Shaker or IPA glass, 45 to 50°F", pair: "Buffalo Chicken Pizza: bitter and bright against the heat" } },
  { slug: "crickets", name: "Crickets", style: "Sour Ale", abv: "5%", ibu: 12, pour: "ruby", dark: true, can: canCrickets, group: "year-round",
    description: "Crickets have always been known as a symbol of wisdom and prosperity. They’re also known to open your eyes to opportunities that lie ahead. This sour ale has notes of citrus with a light malt complexity accompanied by a balanced acidity.",
    styleNote: "Sour ales trade bitterness for a bright, tart acidity, which makes them one of the most refreshing styles on a hot day.",
    sheet: { look: "Bright and lively, with a light, quick head", nose: "Citrus and a light malt", taste: "Balanced acidity over a light malt complexity, barely bitter", serve: "Tulip or wine glass, 40 to 45°F", pair: "Arugula Pizza: the acidity cuts through the cheese" } },
  { slug: "send-it", name: "Send It!", style: "New England IPA", abv: "6.5%", ibu: 25, pour: "gold", dark: false, can: canSend, group: "year-round",
    description: "This NEIPA, stuffed full of pale malts and flaked oats along with five different juicy, tropical, and citrus-forward hops, will be your new favorite post-ride beer.",
    styleNote: "New England IPAs are hazy and soft, built for juicy hop character with a gentler bitterness than a classic IPA.",
    hops: "Five juicy, tropical, citrus-forward hops",
    malt: "Pale malts and flaked oats",
    sheet: { look: "Opaque, hazy orange gold", nose: "Juicy tropical fruit and citrus", taste: "Soft, round body, juicy hops and a gentle bitterness", serve: "Tulip glass, around 45°F, and as fresh as you can get it", pair: "Buffalo Chicken Pizza: the juice cools the heat" } },
  { slug: "contractors-beer", name: "Contractors' Beer", style: "American Lager", abv: "4%", ibu: 8, pour: "straw", dark: false, can: canContractors, group: "year-round",
    description: "This light, crisp, and carbonated lager was specifically brewed for the contractors that helped build NFB. Pale straw in color with a dry thirst quenching finish. A true American Lager from Colebrook, CT!",
    styleNote: "An American lager is light, clean and easy going, the one you reach for when the work is done.",
    sheet: { look: "Pale straw and crystal clear", nose: "Light grain and a whisper of hops", taste: "Light, crisp and lively, with a dry finish", serve: "A shaker glass or straight from the can, ice cold", pair: "Reuben on Marble Rye after a long day" } },
  { slug: "doldrums-of-winter", name: "Doldrums of Winter", style: "Imperial Stout", abv: "9%", ibu: 50, pour: "stout", dark: true, can: canDoldrums, group: "seasonal",
    styleNote: "An imperial stout is a stout pushed further: more malt, more roast and more warmth. At 9%, it is made for the dark end of winter.",
    sheet: { look: "Black and opaque, a dense mocha head", nose: "Dark chocolate, espresso and dark fruit", taste: "Rich and full, roasted and warming. At 9%, take your time", serve: "Snifter, 50 to 55°F, and let it warm as you go", pair: "Reuben on Marble Rye: big flavors on both sides" } },
  { slug: "tap-back", name: "Tap Back", style: "Scottish Ale", abv: "4.5%", ibu: 17, pour: "amber", dark: true, can: canTapBack, group: "seasonal",
    styleNote: "Scottish ales put malt first: caramel and toffee, a soft body and barely any hop bitterness.",
    sheet: { look: "Copper to deep amber, an off-white head", nose: "Caramel, toffee and toasted malt", taste: "Soft, malty and smooth, barely any bitterness", serve: "Pint glass, 50 to 55°F", pair: "Reuben on Marble Rye: the toffee malt loves the rye" } },
  { slug: "doc-murphys-ale", name: "Doc Murphy's Ale", style: "Irish Style Ale", abv: "5.8%", ibu: 17, pour: "ruby", dark: true, can: canDoc, group: "seasonal",
    description: "Owen L. Murphy, MD, affectionately known as “Doc”, was a physician who served in the Farmington Valley for over 50 years. Doc was well known for his skills, keen sense of humor, and generosity among his community. Throughout the Great Depression Doc was often paid for his services with chickens, bushels of apples, and occasional libations.",
    styleNote: "Irish-style red ales are malty and smooth, with a light caramel sweetness, a touch of roast and a clean, dry finish.",
    sheet: { look: "Deep copper red, a creamy off-white head", nose: "Caramel, toasted malt and a hint of roast", taste: "Smooth and malty with a clean, dry finish", serve: "Pint glass, 45 to 50°F", pair: "Reuben on Marble Rye: an Irish ale and corned beef, as it should be" } },
  { slug: "biker-quinn", name: "Biker Quinn", style: "New England IPA", abv: "6%", ibu: 35, pour: "gold", dark: false, can: canQuinn, group: "seasonal",
    description: "Our hearts hang heavy with this beer. We brewed this IPA in memorial of Steve Quinn. Steve was a husband, father, athlete, and a true supporter of NFB from day one. This brew was made with the finest malt and stuffed full of Galaxy, Vic Secret, & Ekuanot hops.",
    styleNote: "New England IPAs are hazy and soft, with the hops pushed toward fruit instead of bitterness.",
    hops: "Galaxy, Vic Secret and Ekuanot",
    sheet: { look: "Hazy orange gold", nose: "Ripe tropical fruit and citrus", taste: "Soft, round and juicy, with a light bitterness", serve: "Tulip glass, around 45°F, and fresh", pair: "Arugula Pizza: fruit against the pepper of the greens" } },
  { slug: "fordson-cork", name: "Fordson Cork", style: "Irish Dry Stout", abv: "6%", ibu: 35, pour: "stout", dark: true, can: canFordson, group: "seasonal",
    styleNote: "The Irish dry stout is black but light bodied: roasted barley, a coffee-like bitterness and a dry finish.",
    sheet: { look: "Black with a tight, creamy tan head", nose: "Roasted barley and coffee", taste: "Light bodied and dry, a roasty, coffee-like bitterness", serve: "Pint glass, 45 to 50°F", pair: "Reuben on Marble Rye: dry roast against rich corned beef" } },
  { slug: "on-the-hill", name: "On The Hill", style: "New England IPA", abv: "6%", ibu: 25, pour: "gold", dark: false, can: canOnTheHill, group: "seasonal",
    styleNote: "A hazy New England IPA, soft and round, where the hops come through as fruit rather than bite.",
    sheet: { look: "Hazy gold", nose: "Citrus, stone fruit and a little pine", taste: "Soft and juicy, a medium body and a gentle finish", serve: "Tulip glass, around 45°F", pair: "Buffalo Chicken Pizza: the juicy hops cool the heat" } },
  { slug: "goulets-grade-a", name: "Goulet's Grade A", style: "Red Ale", abv: "6%", ibu: 17, pour: "ruby", dark: true, can: canGoulet, group: "seasonal",
    styleNote: "Red ales sit between pale and brown: caramel malt, a reddish glow and a balanced, gentle bitterness.",
    sheet: { look: "Clear ruby red, an off-white head", nose: "Caramel malt and a touch of toast", taste: "Balanced and smooth: caramel sweetness, a gentle bitterness", serve: "Pint glass, 45 to 50°F", pair: "Arugula Pizza: caramel malt against the balsamic" } },
];

export const beersIntro = {
  h2: ['On tap', 'at the farm'],
  h3: 'Farmhouse ales, crisp lagers & a few hazy IPAs',
  body: "Our lineup leans farmhouse, starting with a Dennis Hill Estate Saison that's about as local as beer gets. There's room for everyone, though: a clean Kölsch and Pilsner, juicy New England IPAs, a tart sour and a rotating cast of seasonals.",
  count: 'Seasonals come and go. Ask the bar what is pouring today.',
};

export const reviews = {
  h2: ['Worth the drive,', 'say the regulars'],
  sub: 'Straight from our Google reviews',
  featured: { text: 'This place is great! Friendly staff, tons of space, hiking trails, disc golf, farm animals, great food, and of course... fantastic BEER! I stop here about once a week on a country motorcycle ride. Never disappointed.', name: 'Geoff B' },
  more: [
    { text: 'Amazing brewpub in a magically rural location. Good food, good service, good beer. Totally worth the trip.', name: 'Frank C' },
    { text: '1st time here, and we will definitely be back. The staff is super friendly, and everything that came out of the kitchen was excellent.', name: 'Frank B' },
    { text: 'Great selection of brews, I am an IPA gal, but the Saison was awesome! BEST BLT I have had in ages... HIGH FIVE!', name: 'Kyle H' },
    { text: 'Different areas to sit indoors and outdoors, a full kitchen along with food trucks, live music, and plenty of space for kids to roam.', name: 'Kasey K' },
  ],
};

export const nav = [
  { label: 'Beers', href: url('/#beers') },
  { label: 'Eat & Drink', href: url('/#to-go') },
  { label: 'Farm Trail', href: url('/#farm-trail') },
  { label: 'Events', href: url('/#celebrate') },
  { label: 'Visit', href: url('/#visit') },
];
