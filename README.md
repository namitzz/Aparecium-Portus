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
- If a `photo` URL is empty or fails to load, a gold monogram of the place's first letter is shown instead. The placeholder photo links point at Wikimedia Commons and haven't been checked, so expect some monograms until you add your own photos.
- A stop's optional `travel` field overrides the automatic "20 min walk" estimate shown before it.
- A restaurant's `days` lists the day numbers it belongs to.
- `trip.travelThere` and `trip.travelHome` become the vintage train tickets on the first and last days.

## Hosting

Location, compass and offline mode need HTTPS, so host it anywhere that serves static files over HTTPS. GitHub Pages works: Settings → Pages → deploy from this branch, root folder. Then open the URL on each phone:

- **iPhone (Safari):** Share → Add to Home Screen
- **Android (Chrome):** ⋮ → Add to Home screen / Install app

## Handy URL options

- `?now=2026-10-31T11:50`: preview the app as if it were that moment, in trip time. The clock keeps running from there.
- `?intro=full` · `?intro=quick` · `?intro=skip`: force a particular opening animation.

## Notes

- Map tiles come from CARTO (Voyager in light mode, Dark Matter in dark mode) with a sepia filter and parchment texture. They are free for light non-commercial use.
- The full wand-and-unfolding intro plays on the first open each day. Later opens use a 1-second version.
- "Portus" opens Apple Maps on iPhone and Google Maps on Android. It picks walking directions when the previous stop is close by and public transport otherwise.
- "Mischief Managed" plays by itself when the day's last stop ends, then the map opens on the next day. You can also trigger it with the seal at the end of each day's timeline.
- The manifest uses `"display": "fullscreen"`, which hides the Android status bar. Change it to `"standalone"` if you'd rather keep the phone's clock visible.
- With "Reduce motion" turned on in the phone's settings, every animation becomes a simple fade.
