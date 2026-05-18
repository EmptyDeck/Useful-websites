# KoreaGang Agent Handoff

This file is for the next agent touching the KoreaGang site. Treat it as a brand, content, and implementation brief. The goal is not to redesign the project from scratch. The goal is to extend the current world cleanly.

## What This Site Is

KoreaGang is a travel-editorial microsite for a friend trip. It sits somewhere between:

- a magazine issue
- a shared itinerary board
- a scrapbook with comments

The site already speaks in an elegant, lightly cinematic voice. It mixes old traditions, city energy, and friend-group warmth. Keep that balance.

## Live Files

These are the active files in the project root:

- `_index.html` - landing page
- `day.html` - shared day template
- `common.js` - main source of truth for `TRIP`, `DAYS`, `TODO`, and `DAY_DATA`
- `index.js` - homepage rendering
- `day.js` - day-page rendering
- `common.css`, `index.css`, `day.css`, `interactive.css` - visual system

Do not treat `old/` as the live version unless explicitly asked.

## Brand And Tone

The current site language is:

- editorial, not corporate
- warm, not sugary
- stylish, not try-hard
- playful in a dry, confident way
- compact and legible

Good patterns already in the site:

- "Fifteen chapters."
- "Things we'd love to do."
- "Made in Seoul, for friends in Helsinki."
- "Good to know"

What to aim for:

- short elegant titles
- crisp schedule lines
- notes that feel useful and lightly atmospheric
- a sense of heritage plus movement

What to avoid:

- generic tourist brochure copy
- hype words like "amazing," "epic," "must-see," or "super fun"
- overly cute slang
- long explanatory paragraphs
- lifeless machine-translation phrasing

## Visual Direction To Respect

The CSS already defines the visual language clearly:

- warm parchment background
- dark ink text
- dancheong-inspired accents
- serif headlines, clean sans body copy, mono labels

Key palette cues from `common.css`:

- vermilion red: `#c8312b`
- deep blue: `#1d3f8a`
- gold: `#e6b422`
- pine green: `#1e6b5c`

Think:

- editorial travel journal
- Korean heritage meets urban motion
- refined, tactile, slightly print-like

Do not flatten this into generic app language.

## Content Model

If you update itinerary content, the main working file is `common.js`.

- `DAYS` controls calendar card title, city, and tags
- `DAY_DATA[dayNumber]` controls the day page
- `timeline` is the main schedule list
- `notes` is the "Good to know" block
- `logistics` is for practical items like budget, area, reminder
- `links` is optional

Keep calendar titles short enough to look good on the cards.

## Important Editing Note

Some terminal reads of the current files may show encoding noise or mojibake. Do not copy those broken characters into new content. Write clean English copy. If punctuation feels risky, use simple clean punctuation rather than copying corrupted symbols.

## New Schedule To Apply

Use the following as the latest source of truth for:

- Friday, May 22, 2026
- Saturday, May 23, 2026
- Sunday, May 24, 2026
- Monday, May 25, 2026
- Tuesday, May 26, 2026
- Wednesday, May 27, 2026

Write all user-facing schedule copy in English.

If existing placeholders or older plans conflict with the schedule below, prioritize the schedule below.

## Suggested Day Copy

### Day 22 - Friday, May 22, 2026

Suggested title:

`Out by Eleven - Gung and a Spa Night`

Suggested city:

`Seoul / Icheon`

Suggested tags:

- `lunch`
- `cafe`
- `spa`

Suggested timeline:

- `11:00` - Out by eleven
  Start the day and head out.
- `12:00` - Lunch at Gung
  A semi-fine-dining spot focused on royal Korean cuisine. Budget about ₩35,000 (€20.19) per person.
- `Afternoon` - Cafe stop
  Keep the middle of the day loose and easy.
- `Evening` - Thermeden Spa, Icheon
  Spa night. Bring a swimsuit.

Suggested note:

`A softer chapter after the earlier travel rhythm: one good lunch, one cafe, one long soak.`

Suggested logistics:

- `Lunch` / `Gung`
- `Budget` / `About ₩35,000 (€20.19) per person`
- `Evening` / `Icheon Thermeden Spa`
- `Reminder` / `Bring a swimsuit`

### Day 23 - Saturday, May 23, 2026

Suggested title:

`Energy Day - Hongdae and Trivia Night`

Suggested city:

`Seoul`

Suggested tags:

- `escape room`
- `night`

Suggested timeline:

- `Day` - Hongdae wandering
  Street energy, shops, snacks, and whatever looks fun in the moment.
- `Day / Evening` - Escape room
  Budget about ₩30,000 (€17.31) per person.
- `Night` - Trivia night
  Keep the pace up and let the night stay lively.
Suggested note:

`This one should feel playful, fast, and a little noisy. Keep the copy sharp rather than chaotic.`

Suggested logistics:

- `Area` / `Hongdae`
- `Escape room` / `About ₩30,000 (€17.31) each`
- `Night` / `Trivia night`

### Day 24 - Sunday, May 24, 2026

Suggested title:

`Buddha's Birthday - Itaewon After Dark`

Suggested city:

`Seoul`

Suggested tags:

- `holiday`
- `itaewon`
- `evening`

Suggested timeline:

- `Day` - Buddha's Birthday
  Let the daytime plan breathe and feel a little ceremonial.
- `Night` - Itaewon wandering
  An open evening for looking around, walking, and seeing the neighborhood.
- `Late night` - Itaewon club
  If the group goes in, club entry is about ₩30,000 (€17.31) per person.

Suggested note:

`Keep the contrast intact: calm by day, curious by night.`

Suggested logistics:

- `Daytime` / `Buddha's Birthday`
- `Night` / `Itaewon`
- `Club entry` / `About ₩30,000 (€17.31) each`

### Day 25 - Monday, May 25, 2026

Suggested title:

`Palace, Hanok, and Modern Art`

Suggested city:

`Seoul`

Suggested tags:

- `gyeongbokgung`
- `bukchon`
- `museum`

Suggested timeline:

- `Morning` - Gyeongbokgung Palace
  Start with the grand, formal Seoul. Traditional clothing rental is about ₩30,000 (€17.31) per person.
- `Afternoon` - Bukchon Hanok Village
  Move into the older residential texture of the city.
- `Later` - National Museum of Korea
  End with a slower museum chapter rather than modern art.

Suggested note:

`A classic Seoul sequence: royal scale, hanok lanes, then the National Museum of Korea.`

Suggested logistics:

- `Stops` / `Gyeongbokgung, Bukchon, National Museum of Korea`
- `Hanbok rental` / `About ₩30,000 (€17.31) per person`
- `Pace` / `Best as a walking-heavy culture day`

### Day 26 - Tuesday, May 26, 2026

Suggested title:

`DMZ Day`

Suggested city:

`Seoul / DMZ`

Suggested tags:

- `dmz`
- `tour`
- `day trip`

Suggested timeline:

- `09:40-14:40` - Paju DMZ tour
  Keep the day protected for the tour itself. Budget about ₩9,200 (€5.31) per person.

Suggested note:

`Do not overpack this page. The tour is the day.`

Suggested logistics:

- `Plan` / `Paju DMZ Tour`
- `Time` / `09:40-14:40`
- `Budget` / `About ₩9,200 (€5.31) per person`
- `Pace` / `Leave room before and after`

### Day 27 - Wednesday, May 27, 2026

Suggested title:

`One Last Pick`

Suggested city:

`Seoul`

Suggested tags:

- `tbd`
- `group choice`
- `final day`

Suggested timeline:

- `Day` - Still to be chosen
  Ask what everyone most wants to add, then lock the final plan together.

Suggested note:

`Leave this one open on purpose. The point is to choose one more thing the group actually wants, not to fill the page with generic Seoul leftovers.`

Suggested logistics:

- `Status` / `To be decided together`
- `Next step` / `Ask the group for one more pick and choose from there`

## Writing Guidance For These New Days

When turning the schedule above into final site copy:

- keep titles compact
- keep timeline descriptions to one sentence when possible
- use notes for mood plus one practical reminder
- avoid sounding like a tour operator
- preserve the site's "chapter" feeling

The right vibe is:

- thoughtful
- stylish
- slightly playful
- friend-centered

The wrong vibe is:

- salesy
- overexcited
- overdesigned in words
- stuffed with unnecessary detail

## If You Need One Simple Rule

Write like a well-made trip newspaper for close friends, not like an itinerary export from an app.
