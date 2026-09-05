# VisaRunner — standalone landing page

A framework-free, build-free static version of the VisaRunner marketing site.
Plain HTML + CSS + one small vanilla JS file. No Next.js, no npm, no bundler.

```
index.html          landing page
privacy.html        Privacy Policy
terms.html          Terms of Service
assets/
  css/landing.css   landing styles (design tokens, sections, breakpoints)
  css/legal.css     styles for the two legal pages
  css/fonts.css     @font-face for DM Sans + Bricolage Grotesque (data: URIs)
  js/landing.js     hamburger menu, scroll reveal, billing toggle, stat counters
  fonts/*.woff2     the same webfonts as raw files, for HTTP hosting
  brand/            logos and favicons
  og-image.png      social preview image
```

## Running it

Open `index.html` in a browser — that is the whole setup. Everything resolves
through relative paths and there are no network requests at runtime, so it works
straight off the filesystem (`file://`), off a USB stick, or from any static host
(GitHub Pages, Cloudflare Pages, S3, nginx).

## What is different from the production site

* **No accounts.** Register, log in, dashboard and contact-form links are gone.
  Every call to action now opens `mailto:support@visarunner.io`.
* **No analytics.** The Google Analytics tag was removed; nothing is tracked and
  nothing is loaded from a third-party domain.
* **Self-hosted fonts.** DM Sans and Bricolage Grotesque used to come from Google
  Fonts. They are embedded in `assets/css/fonts.css` as `data:` URIs — Chrome
  refuses `@font-face` requests to `file://` URLs, and `data:` URIs are exempt,
  which is what makes the offline case render with the right typefaces.

The visual design is unchanged: same tokens, same sections, same breakpoints and
the same page height as the original at 1440px wide.

## Editing

There is no build step. Edit the HTML or CSS and reload the page.

Swapping the webfonts means regenerating `assets/css/fonts.css`, since the font
binaries are base64-encoded inside it. The raw `.woff2` files in `assets/fonts/`
are the same faces, in case you would rather link them directly when serving
over HTTP.
