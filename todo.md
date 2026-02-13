# Funding Clarity — Project TODO

## Phase 1 — Core Website
- [x] Basic homepage layout with cinematic dark design
- [x] Navigation menu with all page links
- [x] Hero section with parallax background and gold accents
- [x] Founder story section
- [x] What We Do section with 4-question framework
- [x] Why Applications Fail section
- [x] Who Is This For section
- [x] How It Works section (3 steps)
- [x] Primary CTA section
- [x] Footer with site links
- [x] About (Our Story) page
- [x] What We Do page
- [x] Why Applications Fail page
- [x] Who Is This For page
- [x] How It Works page
- [x] Contact page with form
- [x] Stats bar with animated counters
- [x] Scroll-triggered entrance animations
- [x] Glass-morphism card effects
- [x] Mobile responsive design

## Phase 2 — Video + Sales Funnel
- [x] 30-second animated explainer video with British male voiceover
- [x] Video embedded on homepage
- [x] Upgrade to full-stack (database, server, user auth)
- [x] Database schema for leads and bookings
- [x] Interactive Funding Readiness Quiz (5 steps, email capture, personalised result)
- [x] Lead magnet PDF guide (8 pages, dark-themed)
- [x] Lead magnet download page with email capture
- [x] Booking form page (sends to fundingclarity.co.uk email)
- [x] Sendy API integration (proxy route, subscribe on lead capture)
- [x] Owner notification on new leads and bookings
- [x] Updated navigation with funnel entry points
- [x] Updated CTA section with quiz, contact, guide, and booking links
- [x] Vitest tests (11 passing — lead submit, booking submit, auth logout)

## Pending — User Configuration
- [ ] Add Sendy API URL, API Key, and List ID via Secrets panel
- [ ] Add contact email (CONTACT_EMAIL) via Secrets panel
- [ ] Add LinkedIn and X/Twitter profile URLs
- [ ] Connect fundingclarity.co.uk domain

## Phase 3 — Render Deployment + GitHub
- [x] Adjust build output for Render (dist/public for static, dist for server)
- [x] Verify npm install && npm run build works
- [x] Verify npm run start works
- [x] Push code to GitHub repo (fundingclarity.co.uk)

## Phase 4 — Video Fixes
- [x] Regenerate voiceover with proper British English (England) accent — NOT American
- [x] Fix spelling mistakes in clip 3 (garbled text)
- [x] Add subtle background music to final video
- [x] Stitch all clips with new voiceover + music
- [x] Deliver final video for YouTube upload

## Phase 5 — Background Color Alternation
- [x] Alternate section backgrounds: dark, white, gold to break up all-black monotony
- [x] Match gold to the "Funding" logo color (#E8B931)
- [x] Ensure text contrast is correct on all backgrounds (dark text on light, light text on dark)
- [x] Apply same pattern to all subpages
- [x] Push updated code to GitHub

## Phase 6 — Render Deployment Fix
- [x] Fix TypeError: Invalid URL on Render (missing Manus env vars causing tRPC/OAuth URL construction to fail)
- [x] Push fix to GitHub

## Phase 7 — Favicon
- [x] Create custom favicon with gold (#E8B931) and black (#09090B) brand colours
- [x] Install in Manus project and Render repo
- [x] Push to GitHub

## Phase 8 — Marketing & Brand Growth Features

### SEO + Trust Infrastructure
- [x] Add meta titles + descriptions for every route
- [x] Add OpenGraph and Twitter card metadata for every route
- [x] Add XML sitemap and robots.txt
- [x] Add "How we get paid" transparency section (reusable component)
- [x] Add "We are not a lender" disclaimer block on relevant pages

### Conversion Tracking + Attribution
- [x] Add UTM capture (utm_source, utm_medium, utm_campaign, utm_term, utm_content)
- [x] Persist UTM parameters in localStorage for 30 days
- [x] Store UTM fields on every lead and booking submission in DB
- [x] Add referrer tracking
- [x] Add lead timeline field (page path → quiz start → quiz completion → lead capture)

### Lead Segmentation + Tagging
- [x] Create segmentation system with tags (startup, low_revenue, high_revenue, urgent, previously_declined, first_time_applicant)
- [x] Store tags as JSON array in leads table
- [x] Add lead quality score (0–100) based on quiz + urgency

### Admin Dashboard
- [x] Add protected /admin route (Manus OAuth admin role)
- [x] Show Leads table with filters (date range, source, tags, score)
- [x] Show Bookings table with filters
- [x] Lead detail view (quiz answers, UTM, result text, created date)
- [x] CSV export of leads

### Social Proof + Authority
- [x] Add testimonials component with placeholder data (3–6 entries)
- [x] Add "Featured In" logo strip (placeholders)
- [x] Add "Funding Clarity Framework" badge component

### Final
- [x] Update tests and ensure all pass (23 tests, 3 test files)
- [x] Update README documentation
- [x] Save checkpoint
