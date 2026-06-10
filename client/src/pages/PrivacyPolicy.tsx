/**
 * Privacy Policy — Funding Clarity
 * Covers: UK GDPR, PECR, Meta Pixel, Facebook Ads, cookies, data collection
 */

import { useSEO } from "@/hooks/useSEO";
import { SEO_META } from "@/lib/seoConfig";
import SectionReveal from "@/components/SectionReveal";

export default function PrivacyPolicy() {
  useSEO(SEO_META.privacy);

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      {/* Hero */}
      <section className="py-16 lg:py-20">
        <div className="container max-w-4xl">
          <SectionReveal>
            <span
              className="text-xs uppercase tracking-[0.3em] text-gold-dim mb-4 block"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Legal
            </span>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Privacy <span className="text-gold">Policy</span>
            </h1>
            <p className="text-warm-white/50 text-sm" style={{ fontFamily: "var(--font-mono)" }}>
              Last updated: 10 June 2025
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Content */}
      <section className="section-light py-16 lg:py-24">
        <div className="container max-w-4xl">
          <div className="prose prose-lg max-w-none text-dark/80" style={{ fontFamily: "var(--font-body)" }}>

            {/* 1. Introduction */}
            <h2 className="text-2xl font-bold text-dark mb-4" style={{ fontFamily: "var(--font-display)" }}>
              1. Introduction
            </h2>
            <p className="mb-4">
              Funding Clarity ("we", "us", "our") is committed to protecting your privacy and ensuring your personal data is handled in accordance with the UK General Data Protection Regulation (UK GDPR), the Data Protection Act 2018, and the Privacy and Electronic Communications Regulations 2003 (PECR).
            </p>
            <p className="mb-4">
              This Privacy Policy explains what personal data we collect, why we collect it, how we use it, who we share it with, and your rights regarding your data. It applies to all visitors and users of our website at fundingclarity.co.uk (the "Site") and any related services we provide.
            </p>
            <p className="mb-8">
              <strong>Data Controller:</strong> Funding Clarity, operated by THEGREENAGENTS.COM LTD. For data protection enquiries, contact us at hello@fundingclarity.co.uk.
            </p>

            {/* 2. Data We Collect */}
            <h2 className="text-2xl font-bold text-dark mb-4" style={{ fontFamily: "var(--font-display)" }}>
              2. Personal Data We Collect
            </h2>
            <p className="mb-4">We collect the following categories of personal data:</p>

            <h3 className="text-lg font-semibold text-dark mb-2">2.1 Data You Provide Directly</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Contact information:</strong> Name, email address, phone number, company name</li>
              <li><strong>Quiz responses:</strong> Answers to our Funding Readiness Quiz (business type, revenue, funding timeline, previous applications)</li>
              <li><strong>Booking details:</strong> Preferred date, time, and message for clarity call bookings</li>
              <li><strong>Correspondence:</strong> Any messages you send us via contact forms or email</li>
            </ul>

            <h3 className="text-lg font-semibold text-dark mb-2">2.2 Data Collected Automatically</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Device and browser information:</strong> IP address, browser type and version, operating system, screen resolution</li>
              <li><strong>Usage data:</strong> Pages visited, time spent on pages, click patterns, scroll depth</li>
              <li><strong>Referral data:</strong> The website or source that referred you to our Site</li>
              <li><strong>UTM parameters:</strong> Campaign tracking data (source, medium, campaign name, term, content) used to measure advertising effectiveness</li>
              <li><strong>Lead timeline:</strong> A record of your journey through our Site (e.g., pages viewed, quiz started, quiz completed, form submitted)</li>
            </ul>

            <h3 className="text-lg font-semibold text-dark mb-2">2.3 Data from Third Parties</h3>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li><strong>Meta (Facebook/Instagram):</strong> If you interact with our ads on Meta platforms, we may receive data about your interaction (see Section 7)</li>
              <li><strong>Authentication providers:</strong> If you log in via our authentication system, we receive your name and email from the identity provider</li>
            </ul>

            {/* 3. Lawful Basis */}
            <h2 className="text-2xl font-bold text-dark mb-4" style={{ fontFamily: "var(--font-display)" }}>
              3. Lawful Basis for Processing
            </h2>
            <p className="mb-4">Under UK GDPR, we process your personal data on the following legal bases:</p>
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse border border-dark/10 text-sm">
                <thead>
                  <tr className="bg-dark/5">
                    <th className="border border-dark/10 p-3 text-left font-semibold">Purpose</th>
                    <th className="border border-dark/10 p-3 text-left font-semibold">Lawful Basis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-dark/10 p-3">Responding to your enquiries and providing our services</td>
                    <td className="border border-dark/10 p-3">Contract performance / Legitimate interest</td>
                  </tr>
                  <tr>
                    <td className="border border-dark/10 p-3">Sending marketing emails (via Sendy/AWS SES)</td>
                    <td className="border border-dark/10 p-3">Consent (you opt in by submitting your email)</td>
                  </tr>
                  <tr>
                    <td className="border border-dark/10 p-3">Analysing website usage and improving our services</td>
                    <td className="border border-dark/10 p-3">Legitimate interest</td>
                  </tr>
                  <tr>
                    <td className="border border-dark/10 p-3">Running targeted advertising via Meta Pixel</td>
                    <td className="border border-dark/10 p-3">Consent (via cookie banner)</td>
                  </tr>
                  <tr>
                    <td className="border border-dark/10 p-3">Measuring advertising effectiveness (UTM tracking)</td>
                    <td className="border border-dark/10 p-3">Legitimate interest</td>
                  </tr>
                  <tr>
                    <td className="border border-dark/10 p-3">Lead segmentation and quality scoring</td>
                    <td className="border border-dark/10 p-3">Legitimate interest</td>
                  </tr>
                  <tr>
                    <td className="border border-dark/10 p-3">Fraud prevention and security</td>
                    <td className="border border-dark/10 p-3">Legitimate interest</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 4. How We Use Your Data */}
            <h2 className="text-2xl font-bold text-dark mb-4" style={{ fontFamily: "var(--font-display)" }}>
              4. How We Use Your Data
            </h2>
            <p className="mb-4">We use your personal data to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Provide personalised funding readiness assessments based on your quiz answers</li>
              <li>Contact you regarding clarity call bookings and follow-up guidance</li>
              <li>Send you our free funding guide and related educational content</li>
              <li>Send marketing communications (only with your consent, and you can unsubscribe at any time)</li>
              <li>Segment leads by business characteristics to provide more relevant advice</li>
              <li>Assign a quality score to understand which leads are most likely to benefit from our service</li>
              <li>Measure and optimise our advertising campaigns across Meta platforms</li>
              <li>Improve our website, content, and user experience</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p className="mb-8">
              We do <strong>not</strong> sell your personal data to third parties. We do <strong>not</strong> make automated decisions that produce legal effects concerning you.
            </p>

            {/* 5. Data Retention */}
            <h2 className="text-2xl font-bold text-dark mb-4" style={{ fontFamily: "var(--font-display)" }}>
              5. Data Retention
            </h2>
            <p className="mb-4">We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected:</p>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li><strong>Lead and booking data:</strong> Retained for 3 years from the date of collection, or until you request deletion</li>
              <li><strong>Email marketing data:</strong> Retained until you unsubscribe or request removal</li>
              <li><strong>Website analytics data:</strong> Aggregated data retained indefinitely; identifiable data retained for 26 months</li>
              <li><strong>UTM and tracking data:</strong> Stored in your browser's localStorage for 30 days, then automatically deleted</li>
              <li><strong>Meta Pixel data:</strong> Retained by Meta according to their data retention policies (typically 180 days for custom audiences)</li>
            </ul>

            {/* 6. Cookies */}
            <h2 className="text-2xl font-bold text-dark mb-4" style={{ fontFamily: "var(--font-display)" }}>
              6. Cookies and Local Storage
            </h2>
            <p className="mb-4">We use the following types of cookies and browser storage:</p>

            <h3 className="text-lg font-semibold text-dark mb-2">6.1 Strictly Necessary</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Session cookie:</strong> Maintains your login state if you authenticate (HttpOnly, Secure)</li>
            </ul>

            <h3 className="text-lg font-semibold text-dark mb-2">6.2 Functional</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>UTM parameters (localStorage):</strong> Stores campaign attribution data for 30 days to track which marketing channels brought you to our Site</li>
              <li><strong>Lead timeline (localStorage):</strong> Records your navigation path through our Site to help us understand user journeys</li>
              <li><strong>Referrer data (localStorage):</strong> Stores the referring website URL</li>
            </ul>

            <h3 className="text-lg font-semibold text-dark mb-2">6.3 Analytics and Advertising (require consent)</h3>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li><strong>Meta Pixel (_fbp, _fbc):</strong> Used by Meta (Facebook/Instagram) to track conversions, build retargeting audiences, and optimise ad delivery. These cookies identify your browser and record actions you take on our Site (see Section 7 for full details)</li>
              <li><strong>Web analytics:</strong> Anonymous usage statistics to help us improve the Site</li>
            </ul>
            <p className="mb-8">
              Under PECR, we will ask for your consent before placing non-essential cookies. You can withdraw consent at any time by clearing your browser cookies or using our cookie preferences (when available).
            </p>

            {/* 7. Meta Pixel and Facebook Ads */}
            <h2 className="text-2xl font-bold text-dark mb-4" style={{ fontFamily: "var(--font-display)" }}>
              7. Meta Pixel, Facebook Ads, and Conversions API
            </h2>
            <p className="mb-4">
              We use the <strong>Meta Pixel</strong> (formerly Facebook Pixel) and the <strong>Meta Conversions API</strong> to measure the effectiveness of our advertising on Facebook and Instagram. This section explains what data is collected and how it is used.
            </p>

            <h3 className="text-lg font-semibold text-dark mb-2">7.1 What the Meta Pixel Does</h3>
            <p className="mb-4">
              The Meta Pixel is a small piece of JavaScript code on our Site that sends data to Meta when you perform certain actions. It allows us to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Measure how many people take action after seeing our Facebook/Instagram ads</li>
              <li>Build custom audiences for retargeting (e.g., showing ads to people who visited our Site but didn't complete the quiz)</li>
              <li>Create Lookalike Audiences to reach new people similar to our existing leads</li>
              <li>Optimise ad delivery to people most likely to take action</li>
            </ul>

            <h3 className="text-lg font-semibold text-dark mb-2">7.2 Data Collected by Meta Pixel</h3>
            <p className="mb-4">When the Meta Pixel fires, the following data may be sent to Meta:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>HTTP headers:</strong> IP address, browser information, page location, referrer, and device information</li>
              <li><strong>Pixel-specific data:</strong> Pixel ID, Facebook cookie (_fbp, _fbc), and a timestamp</li>
              <li><strong>Button click data:</strong> Text on buttons you click and form field labels (but not the content you type)</li>
              <li><strong>Page metadata:</strong> Page title, URL, and domain</li>
              <li><strong>Standard events:</strong> PageView, ViewContent, Lead, Schedule, CompleteRegistration</li>
              <li><strong>Custom parameters:</strong> Lead source, quiz score tier, and UTM campaign data (no personally identifiable information is sent in custom parameters unless you have consented)</li>
            </ul>

            <h3 className="text-lg font-semibold text-dark mb-2">7.3 Meta Conversions API (Server-Side)</h3>
            <p className="mb-4">
              In addition to the browser-based Pixel, we may use the Meta Conversions API to send event data directly from our server to Meta. This improves measurement accuracy, especially when browser-based tracking is limited by ad blockers or privacy settings. Server-side events may include:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Hashed email address (SHA-256 — Meta cannot read your actual email)</li>
              <li>Event name (e.g., "Lead", "Schedule")</li>
              <li>Event time and source URL</li>
              <li>Client IP address and user agent (for deduplication)</li>
            </ul>

            <h3 className="text-lg font-semibold text-dark mb-2">7.4 How Meta Uses This Data</h3>
            <p className="mb-4">
              Meta uses the data collected via the Pixel and Conversions API to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Show you relevant ads on Facebook, Instagram, Messenger, and the Meta Audience Network</li>
              <li>Measure ad performance and provide us with aggregated analytics</li>
              <li>Improve their advertising products and services</li>
            </ul>
            <p className="mb-4">
              Meta processes this data as a joint controller with us for the collection phase, and as an independent controller for their own purposes. For more information, see <a href="https://www.facebook.com/privacy/policy/" className="text-gold hover:underline" target="_blank" rel="noopener noreferrer">Meta's Privacy Policy</a>.
            </p>

            <h3 className="text-lg font-semibold text-dark mb-2">7.5 Your Choices Regarding Meta Tracking</h3>
            <p className="mb-8">You can control Meta's tracking in several ways:</p>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li><strong>Cookie consent:</strong> Decline analytics/advertising cookies when prompted on our Site</li>
              <li><strong>Facebook Ad Preferences:</strong> Visit <a href="https://www.facebook.com/adpreferences" className="text-gold hover:underline" target="_blank" rel="noopener noreferrer">facebook.com/adpreferences</a> to manage your ad settings</li>
              <li><strong>Off-Facebook Activity:</strong> Visit <a href="https://www.facebook.com/off-facebook-activity" className="text-gold hover:underline" target="_blank" rel="noopener noreferrer">Off-Facebook Activity</a> to see and clear data shared with Meta</li>
              <li><strong>Browser settings:</strong> Block third-party cookies in your browser settings</li>
              <li><strong>Opt-out tools:</strong> Use the <a href="https://optout.aboutads.info/" className="text-gold hover:underline" target="_blank" rel="noopener noreferrer">Digital Advertising Alliance opt-out</a> or <a href="https://youronlinechoices.eu/" className="text-gold hover:underline" target="_blank" rel="noopener noreferrer">Your Online Choices (EU/UK)</a></li>
            </ul>

            {/* 8. Data Sharing */}
            <h2 className="text-2xl font-bold text-dark mb-4" style={{ fontFamily: "var(--font-display)" }}>
              8. Who We Share Your Data With
            </h2>
            <p className="mb-4">We may share your personal data with the following categories of recipients:</p>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li><strong>Meta Platforms, Inc.:</strong> Via the Meta Pixel and Conversions API for advertising purposes (see Section 7)</li>
              <li><strong>Amazon Web Services (AWS):</strong> Our email service provider (SES) for sending marketing emails via Sendy</li>
              <li><strong>TiDB Cloud:</strong> Our database hosting provider, where lead and booking data is stored securely</li>
              <li><strong>Manus:</strong> Our application hosting and authentication provider</li>
              <li><strong>Funding partners:</strong> If you proceed with a funding application, we may share relevant information with lenders or brokers — but only with your explicit consent</li>
              <li><strong>Legal authorities:</strong> If required by law, regulation, or legal process</li>
            </ul>

            {/* 9. International Transfers */}
            <h2 className="text-2xl font-bold text-dark mb-4" style={{ fontFamily: "var(--font-display)" }}>
              9. International Data Transfers
            </h2>
            <p className="mb-8">
              Some of our service providers (including Meta and AWS) may process data outside the UK. Where this occurs, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses (SCCs) approved by the UK Information Commissioner's Office (ICO), or the service provider being certified under an adequacy decision. Meta operates under the EU-US Data Privacy Framework and UK Extension.
            </p>

            {/* 10. Your Rights */}
            <h2 className="text-2xl font-bold text-dark mb-4" style={{ fontFamily: "var(--font-display)" }}>
              10. Your Rights Under UK GDPR
            </h2>
            <p className="mb-4">You have the following rights regarding your personal data:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Right of access:</strong> Request a copy of the personal data we hold about you</li>
              <li><strong>Right to rectification:</strong> Request correction of inaccurate or incomplete data</li>
              <li><strong>Right to erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
              <li><strong>Right to restrict processing:</strong> Request that we limit how we use your data</li>
              <li><strong>Right to data portability:</strong> Request your data in a structured, machine-readable format</li>
              <li><strong>Right to object:</strong> Object to processing based on legitimate interest, including direct marketing</li>
              <li><strong>Right to withdraw consent:</strong> Where processing is based on consent, withdraw it at any time</li>
              <li><strong>Rights related to automated decision-making:</strong> We do not make solely automated decisions with legal effects</li>
            </ul>
            <p className="mb-8">
              To exercise any of these rights, contact us at <strong>hello@fundingclarity.co.uk</strong>. We will respond within one month. If you are not satisfied with our response, you have the right to lodge a complaint with the <a href="https://ico.org.uk/make-a-complaint/" className="text-gold hover:underline" target="_blank" rel="noopener noreferrer">Information Commissioner's Office (ICO)</a>.
            </p>

            {/* 11. Data Security */}
            <h2 className="text-2xl font-bold text-dark mb-4" style={{ fontFamily: "var(--font-display)" }}>
              11. Data Security
            </h2>
            <p className="mb-8">
              We implement appropriate technical and organisational measures to protect your personal data, including: encryption in transit (TLS/HTTPS), secure database hosting with access controls, HttpOnly and Secure session cookies, hashing of sensitive data before sharing with third parties (e.g., email hashing for Meta Conversions API), and regular security reviews. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>

            {/* 12. Children */}
            <h2 className="text-2xl font-bold text-dark mb-4" style={{ fontFamily: "var(--font-display)" }}>
              12. Children's Privacy
            </h2>
            <p className="mb-8">
              Our services are intended for business owners and directors aged 18 and over. We do not knowingly collect personal data from anyone under 18. If we become aware that we have collected data from a child, we will delete it promptly.
            </p>

            {/* 13. Changes */}
            <h2 className="text-2xl font-bold text-dark mb-4" style={{ fontFamily: "var(--font-display)" }}>
              13. Changes to This Policy
            </h2>
            <p className="mb-8">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last updated" date. If we make material changes, we will notify you by email or via a prominent notice on our Site.
            </p>

            {/* 14. Contact */}
            <h2 className="text-2xl font-bold text-dark mb-4" style={{ fontFamily: "var(--font-display)" }}>
              14. Contact Us
            </h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy or wish to exercise your data rights, please contact us:
            </p>
            <ul className="list-none mb-8 space-y-1">
              <li><strong>Email:</strong> hello@fundingclarity.co.uk</li>
              <li><strong>Company:</strong> THEGREENAGENTS.COM LTD</li>
              <li><strong>Website:</strong> fundingclarity.co.uk</li>
            </ul>
            <p className="mb-4">
              You also have the right to contact the UK's data protection authority:
            </p>
            <ul className="list-none mb-8 space-y-1">
              <li><strong>Information Commissioner's Office (ICO)</strong></li>
              <li>Wycliffe House, Water Lane, Wilmslow, Cheshire SK9 5AF</li>
              <li>Helpline: 0303 123 1113</li>
              <li>Website: <a href="https://ico.org.uk" className="text-gold hover:underline" target="_blank" rel="noopener noreferrer">ico.org.uk</a></li>
            </ul>

          </div>
        </div>
      </section>
    </div>
  );
}
