/**
 * Terms of Service — Funding Clarity
 * Covers: FCA disclaimer, limitation of liability, acceptable use, IP, governing law
 */

import { useSEO } from "@/hooks/useSEO";
import { SEO_META } from "@/lib/seoConfig";
import SectionReveal from "@/components/SectionReveal";

export default function TermsOfService() {
  useSEO(SEO_META.terms);

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
              Terms of <span className="text-gold">Service</span>
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

            {/* 1. Agreement */}
            <h2 className="text-2xl font-bold text-dark mb-4" style={{ fontFamily: "var(--font-display)" }}>
              1. Agreement to Terms
            </h2>
            <p className="mb-4">
              By accessing or using the Funding Clarity website at fundingclarity.co.uk (the "Site") and any services provided through it (the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you must not use our Site or Services.
            </p>
            <p className="mb-8">
              These Terms constitute a legally binding agreement between you and THEGREENAGENTS.COM LTD, trading as Funding Clarity ("we", "us", "our"). We reserve the right to update these Terms at any time. Continued use of the Site after changes constitutes acceptance of the revised Terms.
            </p>

            {/* 2. Important Regulatory Notice */}
            <h2 className="text-2xl font-bold text-dark mb-4" style={{ fontFamily: "var(--font-display)" }}>
              2. Important Regulatory Notice — We Are Not a Lender
            </h2>
            <div className="bg-gold/10 border-l-4 border-gold p-6 mb-8 rounded-r-lg">
              <p className="mb-4 font-semibold text-dark">
                Funding Clarity is NOT a lender, bank, financial institution, or regulated financial adviser.
              </p>
              <p className="mb-4">
                We are an information and guidance service that helps UK business owners understand their funding options. We do not:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Provide regulated financial advice within the meaning of the Financial Services and Markets Act 2000 (FSMA)</li>
                <li>Arrange, broker, or intermediate credit agreements regulated by the Financial Conduct Authority (FCA)</li>
                <li>Make lending decisions or guarantee approval of any funding application</li>
                <li>Hold client funds or act as an escrow service</li>
                <li>Provide tax, legal, or accounting advice</li>
              </ul>
              <p className="mb-4">
                Our service is limited to <strong>educational guidance and signposting</strong>. Any information we provide about funding options, lenders, or application strategies is for general informational purposes only and should not be relied upon as financial advice.
              </p>
              <p className="mb-0">
                If you require regulated financial advice, we recommend consulting an FCA-authorised financial adviser. You can find one at <a href="https://www.fca.org.uk/consumers/finding-adviser" className="text-gold hover:underline font-semibold" target="_blank" rel="noopener noreferrer">fca.org.uk</a>.
              </p>
            </div>

            {/* 3. Services Description */}
            <h2 className="text-2xl font-bold text-dark mb-4" style={{ fontFamily: "var(--font-display)" }}>
              3. Description of Services
            </h2>
            <p className="mb-4">Funding Clarity provides the following services:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Funding Readiness Quiz:</strong> A self-assessment tool that provides a general indication of your business's readiness for funding. Results are indicative only and do not constitute a guarantee of funding eligibility.</li>
              <li><strong>Educational Content:</strong> Guides, articles, and resources about UK business finance options. This content is for general information only.</li>
              <li><strong>Clarity Calls:</strong> Informal conversations with our team to discuss your situation. These are not regulated advice sessions.</li>
              <li><strong>Signposting:</strong> We may suggest types of funding or categories of lender that may be suitable. This is general guidance, not a personal recommendation.</li>
            </ul>
            <p className="mb-8">
              All services are provided on an "as is" basis. We make no warranties or representations regarding the accuracy, completeness, or suitability of any information provided.
            </p>

            {/* 4. Eligibility */}
            <h2 className="text-2xl font-bold text-dark mb-4" style={{ fontFamily: "var(--font-display)" }}>
              4. Eligibility
            </h2>
            <p className="mb-8">
              Our Services are intended for UK-based business owners, directors, and entrepreneurs aged 18 or over. By using our Services, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into these Terms.
            </p>

            {/* 5. User Obligations */}
            <h2 className="text-2xl font-bold text-dark mb-4" style={{ fontFamily: "var(--font-display)" }}>
              5. Your Obligations
            </h2>
            <p className="mb-4">When using our Site and Services, you agree to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Provide accurate and truthful information in all forms, quizzes, and communications</li>
              <li>Not use the Site for any unlawful purpose or in violation of any applicable laws</li>
              <li>Not attempt to gain unauthorised access to any part of the Site or its systems</li>
              <li>Not use automated systems (bots, scrapers) to access the Site without our written permission</li>
              <li>Not submit false, misleading, or fraudulent information</li>
              <li>Not impersonate any person or entity</li>
              <li>Not interfere with or disrupt the Site's infrastructure</li>
            </ul>
            <p className="mb-8">
              We reserve the right to suspend or terminate your access to the Site if you breach these obligations.
            </p>

            {/* 6. Intellectual Property */}
            <h2 className="text-2xl font-bold text-dark mb-4" style={{ fontFamily: "var(--font-display)" }}>
              6. Intellectual Property
            </h2>
            <p className="mb-4">
              All content on this Site — including but not limited to text, graphics, logos, images, videos, the Funding Clarity Framework, quiz methodology, guides, and software — is the property of THEGREENAGENTS.COM LTD or its licensors and is protected by UK and international copyright, trademark, and intellectual property laws.
            </p>
            <p className="mb-8">
              You may not reproduce, distribute, modify, create derivative works from, publicly display, or commercially exploit any content from this Site without our prior written consent. Limited personal, non-commercial use (such as printing a guide for your own reference) is permitted.
            </p>

            {/* 7. Limitation of Liability */}
            <h2 className="text-2xl font-bold text-dark mb-4" style={{ fontFamily: "var(--font-display)" }}>
              7. Limitation of Liability
            </h2>
            <p className="mb-4">To the maximum extent permitted by law:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>We shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our Site or Services</li>
              <li>We shall not be liable for any loss of profit, revenue, business, data, or anticipated savings</li>
              <li>We shall not be liable for any decisions you make based on information provided through our Services</li>
              <li>We shall not be liable for the actions, products, or services of any third-party lender, broker, or financial institution we may mention or signpost</li>
              <li>Our total aggregate liability to you for any claims arising from these Terms shall not exceed £100</li>
            </ul>
            <p className="mb-8">
              Nothing in these Terms excludes or limits our liability for death or personal injury caused by our negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be excluded by law.
            </p>

            {/* 8. Disclaimers */}
            <h2 className="text-2xl font-bold text-dark mb-4" style={{ fontFamily: "var(--font-display)" }}>
              8. Disclaimers
            </h2>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li><strong>No guarantee of funding:</strong> We cannot and do not guarantee that you will be approved for any form of funding. Lending decisions are made solely by lenders based on their own criteria.</li>
              <li><strong>No guarantee of accuracy:</strong> While we strive to provide accurate and up-to-date information, the UK funding landscape changes frequently. We make no warranties regarding the accuracy, completeness, or timeliness of any information on this Site.</li>
              <li><strong>Third-party links:</strong> Our Site may contain links to third-party websites. We are not responsible for the content, privacy practices, or availability of those sites.</li>
              <li><strong>Quiz results:</strong> Results from our Funding Readiness Quiz are indicative only and based on the limited information you provide. They do not constitute a credit check, affordability assessment, or lending decision.</li>
              <li><strong>Service availability:</strong> We do not guarantee that the Site will be available at all times or free from errors, viruses, or interruptions.</li>
            </ul>

            {/* 9. Indemnification */}
            <h2 className="text-2xl font-bold text-dark mb-4" style={{ fontFamily: "var(--font-display)" }}>
              9. Indemnification
            </h2>
            <p className="mb-8">
              You agree to indemnify, defend, and hold harmless THEGREENAGENTS.COM LTD, its directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising from: (a) your use of the Site or Services; (b) your breach of these Terms; (c) your violation of any third-party rights; or (d) any information you provide to us that is inaccurate, misleading, or fraudulent.
            </p>

            {/* 10. Data Protection */}
            <h2 className="text-2xl font-bold text-dark mb-4" style={{ fontFamily: "var(--font-display)" }}>
              10. Data Protection and Privacy
            </h2>
            <p className="mb-8">
              Your use of our Site is also governed by our <a href="/privacy" className="text-gold hover:underline font-semibold">Privacy Policy</a>, which explains how we collect, use, and protect your personal data in compliance with UK GDPR and the Data Protection Act 2018. By using our Services, you acknowledge that you have read and understood our Privacy Policy.
            </p>

            {/* 11. Advertising and Tracking */}
            <h2 className="text-2xl font-bold text-dark mb-4" style={{ fontFamily: "var(--font-display)" }}>
              11. Advertising, Tracking, and Cookies
            </h2>
            <p className="mb-4">
              We use advertising technologies including the Meta Pixel and Meta Conversions API to measure the effectiveness of our advertising campaigns on Facebook and Instagram. By consenting to non-essential cookies on our Site, you acknowledge that:
            </p>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>Your browsing activity on our Site may be tracked and shared with Meta Platforms, Inc. for advertising purposes</li>
              <li>Meta may use this data to show you targeted advertisements on their platforms</li>
              <li>We may use your hashed email address (not readable by Meta) to match you with your Meta account for conversion measurement</li>
              <li>You can opt out of this tracking at any time (see our Privacy Policy, Section 7.5)</li>
            </ul>

            {/* 12. Email Communications */}
            <h2 className="text-2xl font-bold text-dark mb-4" style={{ fontFamily: "var(--font-display)" }}>
              12. Email Communications
            </h2>
            <p className="mb-4">
              By submitting your email address through any form on our Site (quiz, guide download, contact form, or booking form), you consent to receive:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Transactional emails:</strong> Confirmations, quiz results, guide delivery, booking confirmations</li>
              <li><strong>Marketing emails:</strong> Educational content, funding tips, and service updates (you can unsubscribe at any time)</li>
            </ul>
            <p className="mb-8">
              We comply with PECR requirements for electronic marketing. Every marketing email includes an unsubscribe link. We will never sell your email address to third parties.
            </p>

            {/* 13. Termination */}
            <h2 className="text-2xl font-bold text-dark mb-4" style={{ fontFamily: "var(--font-display)" }}>
              13. Termination
            </h2>
            <p className="mb-8">
              We may terminate or suspend your access to our Site and Services at any time, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the Site ceases immediately. Sections that by their nature should survive termination (including Limitation of Liability, Disclaimers, Indemnification, and Governing Law) shall survive.
            </p>

            {/* 14. Governing Law */}
            <h2 className="text-2xl font-bold text-dark mb-4" style={{ fontFamily: "var(--font-display)" }}>
              14. Governing Law and Jurisdiction
            </h2>
            <p className="mb-8">
              These Terms shall be governed by and construed in accordance with the laws of England and Wales. Any disputes arising from these Terms or your use of the Site shall be subject to the exclusive jurisdiction of the courts of England and Wales. Nothing in these Terms affects your statutory rights as a consumer under UK law.
            </p>

            {/* 15. Severability */}
            <h2 className="text-2xl font-bold text-dark mb-4" style={{ fontFamily: "var(--font-display)" }}>
              15. Severability
            </h2>
            <p className="mb-8">
              If any provision of these Terms is found to be unenforceable or invalid by a court of competent jurisdiction, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
            </p>

            {/* 16. Entire Agreement */}
            <h2 className="text-2xl font-bold text-dark mb-4" style={{ fontFamily: "var(--font-display)" }}>
              16. Entire Agreement
            </h2>
            <p className="mb-8">
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and Funding Clarity regarding your use of the Site and Services, and supersede any prior agreements or communications.
            </p>

            {/* 17. Contact */}
            <h2 className="text-2xl font-bold text-dark mb-4" style={{ fontFamily: "var(--font-display)" }}>
              17. Contact Us
            </h2>
            <p className="mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <ul className="list-none mb-8 space-y-1">
              <li><strong>Email:</strong> hello@fundingclarity.co.uk</li>
              <li><strong>Company:</strong> THEGREENAGENTS.COM LTD</li>
              <li><strong>Trading as:</strong> Funding Clarity</li>
              <li><strong>Website:</strong> fundingclarity.co.uk</li>
            </ul>

          </div>
        </div>
      </section>
    </div>
  );
}
