# Aim website

The public site is served from [theaim.app](https://theaim.app). The Pages build prerenders English, Kazakh, and Russian landing pages and the Aim Feedback information pages.

```sh
bun install --frozen-lockfile
bun run build:pages
python3 -m http.server 8080 --bind 127.0.0.1 --directory dist/client
```

The **Deploy website to GitHub Pages** workflow checks the build on pull requests and deploys from `main`.

The waitlist and investor forms use the Google Apps Script endpoint in `src/lib/waitlist.ts`. Intercept that request during local testing to avoid adding test submissions to the production list.
