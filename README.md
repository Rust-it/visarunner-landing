# VisaRunner — standalone landing page

A framework-free, build-free static version of the VisaRunner marketing site.
Plain HTML + CSS + one small vanilla JS file. No Next.js, no npm, no bundler.

```
index.html          landing page              served at /
privacy.html        Privacy Policy            served at /privacy
terms.html          Terms of Service          served at /terms
404.html            not-found page            served for anything else
robots.txt          allows all crawlers, points at the sitemap
sitemap.xml         the three indexable pages
assets/
  css/landing.css   landing styles (design tokens, sections, breakpoints)
  css/legal.css     styles for the two legal pages
  css/404.css       styles for the not-found page
  css/fonts.css     @font-face for DM Sans + Bricolage Grotesque (data: URIs)
  js/landing.js     hamburger menu, scroll reveal, billing toggle, stat counters
  fonts/*.woff2     the same webfonts as raw files, for HTTP hosting
  brand/            logos and favicons
  og-image.png      social preview image
```

## Running it

Deploy the repo root as-is to Cloudflare Pages — there is no build command and no
output directory to configure. Nothing is fetched from a third-party domain at
runtime, so the pages render on a cold cache with no external dependencies.

To work on it locally you need a static server rather than a double-click, because
internal links are root-absolute (`/`, `/privacy`, `/terms`) and resolve to the
filesystem root under `file://`. Any server that maps extensionless URLs to
`.html` will do; `npx serve` and `python -m http.server` both work, the latter
only if you visit the `.html` paths directly.

## What is different from the production site

* **No accounts.** Register, log in, dashboard and contact-form links are gone.
  Every call to action now opens `mailto:support@visarunner.io`.
* **No analytics.** The Google Analytics tag was removed; nothing is tracked and
  nothing is loaded from a third-party domain.
* **Self-hosted fonts.** DM Sans and Bricolage Grotesque used to come from Google
  Fonts. They are embedded in `assets/css/fonts.css` as `data:` URIs, so the pages
  need no third-party request to render with the right typefaces.

The visual design is unchanged: same tokens, same sections, same breakpoints and
the same page height as the original at 1440px wide.

## URLs

Cloudflare Pages serves `privacy.html` at `/privacy` and permanently redirects
`/privacy.html` there, so the extensionless form is the real address of each page.
Everything that names a URL agrees on that form: the `<link rel="canonical">`
tags, the `<loc>` entries in `sitemap.xml`, and the internal links in the nav and
footer. This also matches the production Next.js app, which routes `/privacy` and
`/terms` the same way.

Two consequences worth keeping in mind when editing:

* **Internal links are root-absolute** (`/`, `/privacy`, `/terms`), not relative.
  Linking to `privacy.html` still reaches the page, but through a 301 — prefer the
  clean form so internal navigation costs no redirect.
* **`404.html` references its assets root-absolutely** (`/assets/...`) while the
  other pages use relative paths. It has to: Cloudflare returns it under whatever
  URL was requested, so at `/deep/nested/missing` a relative `assets/…` would
  resolve to `/deep/nested/assets/…` and the page would arrive unstyled.

## Editing

There is no build step. Edit the HTML or CSS and reload the page.

Swapping the webfonts means regenerating `assets/css/fonts.css`, since the font
binaries are base64-encoded inside it. The raw `.woff2` files in `assets/fonts/`
are the same faces, in case you would rather link them directly when serving
over HTTP.
