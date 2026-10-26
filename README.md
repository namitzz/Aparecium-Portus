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
- `trip.presentedBy` is the line written in ink on the folded map ("Messrs Moony, Wormtail, Padfoot & Prongs… are proud to present"). Put your group's names in it.
- A stop's optional `travel` field overrides the travel note shown before it. Walks under 2.5 km are worked out along real streets, so the route on the map and the "14 min walk" note are both real.
- A restaurant's `days` lists the day numbers it belongs to.
- `trip.travelThere` and `trip.travelHome` become the vintage train tickets on the first and last days.

## Hosting

Location, compass and offline mode need HTTPS, so host it anywhere that serves static files over HTTPS. GitHub Pages works: Settings → Pages → deploy from this branch, root folder. Then open the URL on each phone:

- **iPhone (Safari):** Share → Add to Home Screen
- **Android (Chrome):** ⋮ → Add to Home screen / Install app

## Handy URL options

- `?now=2026-10-31T11:50`: preview the app as if it were that moment, in trip time. The clock keeps running from there.
- `?intro=full` · `?intro=quick` · `?intro=skip`: force a particular opening animation.

## Live extras (no accounts or keys needed)

- **Walking routes:** routing.openstreetmap.de (OpenStreetMap). Walks under 2.5 km are drawn along the real streets, with real walk times.
- **Photos and descriptions:** Wikipedia, for any place with a `wiki` article name.
- **Weather:** Open-Meteo. Each day shows its forecast once it's within 16 days.
- **Running late:** a button on each day's timeline shifts the rest of that day's stops by 10–60 minutes. The countdown and highlights follow the new times.
- **Sound:** quiet synthesised sound (quill scratch, parchment rustle, wand chime, Portkey whoosh). The speaker icon in the header mutes it, and the choice is remembered.

Everything above is cached on the phone after the first load, and the app still works if any of these services is unreachable.

## Notes

- Map tiles come from CARTO (Voyager in light mode, Dark Matter in dark mode) with a sepia filter and parchment texture. They are free for light non-commercial use.
- The full wand-and-unfolding intro plays on the first open each day. Later opens use a 1-second version.
- "Portus" opens Apple Maps on iPhone and Google Maps on Android. It picks walking directions when the previous stop is close by and public transport otherwise.
- "Mischief Managed" plays by itself when the day's last stop ends, then the map opens on the next day. You can also trigger it with the seal at the end of each day's timeline.
- The manifest uses `"display": "fullscreen"`, which hides the Android status bar. Change it to `"standalone"` if you'd rather keep the phone's clock visible.
- With "Reduce motion" turned on in the phone's settings, every animation becomes a simple fade.
