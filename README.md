# Aparecium Portus

An enchanted-map trip companion for a small group of friends. Open it, pick the day, and see where you're going, when, and what you're doing there on a live parchment map. Restaurants are kept separate and appear on the map with one tap.

The whole app is one file, `index.html`. The other files make "Add to Home Screen" work:

| File | Purpose |
| --- | --- |
| `index.html` | The app: HTML, CSS, JS and all trip data |
| `manifest.webmanifest` | Home-screen install (full screen, theme colour, icons) |
| `icon.svg`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png` | Gold quill on parchment |
| `sw.js` | Optional offline support (keeps the app and visited map tiles available with patchy signal) |

## Editing the trip

Everything about the trip lives in the `TRIP_DATA` object at the very top of `index.html`, with comments explaining each field. **The current data is placeholder London data.** Replace it with the real plan.

- Times are `"HH:MM"` in the trip's time zone (`trip.timeZone`, `Europe/London` by default). The phone's own time zone is ignored.
- `duration` is in minutes.
- To get `lat`/`lng`, long-press a spot in Google Maps and copy the two numbers.
- `wiki` is the place's English Wikipedia article name (the part after `/wiki/` in its address). The app then fetches a real photo, and a short description if you leave `description` empty.
- `photo` is your own image URL and takes priority over `wiki`. With neither, an illuminated initial is shown instead.
- `trip.marauders` is the group. Each person's `alias` is inked on the folded map's cover, Marauder-style ("Messrs Nimbus, Mandrake, Elderwand, Lumos & Snitch… are proud to present"). Their real `name` walks around the map on footprints.
- A stop's optional `travel` field overrides the travel note shown before it. Walks under 2.5 km are worked out along real streets, so the route on the map and the "14 min walk" note are both real.
- A restaurant's `days` lists the day numbers it belongs to. `type` is `coffee`, `sweet` or `food` and sets its icon. `area` groups the list along the day's route.
- `trip.travelThere` and `trip.travelHome` become the vintage train tickets on the first and last days.

## Hosting

Location, compass and offline mode need HTTPS, so host it anywhere that serves static files over HTTPS. GitHub Pages works: Settings → Pages → deploy from this branch, root folder. Then open the URL on each phone:

- **iPhone (Safari):** Share → Add to Home Screen
- **Android (Chrome):** ⋮ → Add to Home screen / Install app

## Handy URL options

- `?now=2026-10-31T11:50`: preview the app as if it were that moment, in trip time. The clock keeps running from there.
- `?intro=full` · `?intro=quick` · `?intro=skip`: force a particular opening animation.

## The group: seeing each other on the map

After the opening, the app asks **"Who goes there?"**. Picking your name turns location sharing on, and it switches itself back on every time the app opens until you tap "Stop sharing" in the group list. While sharing, the screen is kept on (toggle in the group list), location restarts by itself if the phone drops it, and a heartbeat every minute keeps "last seen" fresh. Everyone who shares appears on the map as named footprints, with "seen 4 min ago". The footprints button opens the group list, where you can jump to anyone or stop sharing.

- To see each other, each phone must open the group's private **invite link** once (`…/Aparecium-Portus/#join=<code>`). The code is deliberately not stored in this repository.
- Positions are encrypted on the phone (AES-GCM, with a key derived from the invite code) before being relayed through [ntfy.sh](https://ntfy.sh), a free public message relay. The relay only ever sees scrambled data.
- Locations are only sent while the app is open on that phone. Websites can't track in the background, so a friend's footprints show the last time they had the app open.
- **iPhone:** a Home Screen app has its own storage, separate from Safari. If the group list says the phone needs the invite link, paste the whole link from the group chat into the box there. Open the invite link in Safari *before* tapping Share → Add to Home Screen, so the saved app keeps it.

## Live extras (no accounts or keys needed)

- **Walking routes:** routing.openstreetmap.de (OpenStreetMap). Walks under 2.5 km are drawn along the real streets, with real walk times.
- **Photos and descriptions:** Wikipedia, for any place with a `wiki` article name.
- **Weather:** Open-Meteo. Each day shows its forecast once it's within 16 days.
- **Running late:** a button on each day's timeline shifts the rest of that day's stops by 10–60 minutes. The countdown and highlights follow the new times.
- **Sound:** synthesised in the browser: a celesta-style bell melody (original, in E minor) and low strings when the wand touches the parchment, quill scratches as the ink writes, parchment rustling as the map unfolds, a sparkle for spells, a page turn between days, a Portkey pull with an apparition crack, and a falling phrase for "Mischief Managed". The speaker icon in the header mutes it, and the choice is remembered.

Everything above is cached on the phone after the first load, and the app still works if any of these services is unreachable.

## Notes

- The layers button opens a **Map style** picker: **Street map** (CARTO, every street name), **Satellite** (Esri World Imagery with road and place names on top), or the inked **Parchment** look. The choice is remembered on each phone.
- The full wand-and-unfolding opening plays every time the app opens. Tap **Skip** in the top corner to go straight to the map.
- "Portus" opens Apple Maps on iPhone and Google Maps on Android. It picks walking directions when the previous stop is close by and public transport otherwise.
- "Mischief Managed" plays by itself when the day's last stop ends. The day's map turns to ink, the ink draws back into the parchment until it's blank, then the map folds shut and opens on the next day. You can also trigger it with the seal at the end of each day's timeline.
- The app always uses the light parchment look, whatever the phone's dark-mode setting. Samsung Internet's own dark mode can still recolour websites; if it does, turn on Samsung Internet → Settings → Labs → "Use website dark theme".
- The manifest uses `"display": "fullscreen"`, which hides the Android status bar. Change it to `"standalone"` if you'd rather keep the phone's clock visible.
- With "Reduce motion" turned on in the phone's settings, every animation becomes a simple fade.
- **iPhone sound:** the ring/silent switch mutes web sounds, so flip it to ring to hear them. For the compass-facing footprints, tap the locate button and allow "Motion & Orientation" when asked.
