import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Bean Brew Digest",
  description: "Terms of service for beanbrewdigest.com.",
};

export default function TermsOfServicePage() {
  return (
    <div className="static-page">
      <div className="static-page-inner">
        <h1>Terms of Service</h1>
        <p className="last-updated">Last updated: June 2026</p>
        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using beanbrewdigest.com (&quot;the Site&quot;), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Site.</p>
        </section>
        <section>
          <h2>2. Use of Content</h2>
          <p>All content on this Site — including articles, guides, and images — is provided for informational and educational purposes. You may reference and share our content with proper attribution. Reproducing substantial portions without permission is prohibited.</p>
        </section>
        <section>
          <h2>3. No Professional Advice</h2>
          <p>The information provided on this Site is for general informational purposes only. While we strive for accuracy, we make no warranties about the completeness or reliability of the content.</p>
        </section>
        <section>
          <h2>4. User Conduct</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Site for any unlawful purpose</li>
            <li>Attempt to gain unauthorized access to any part of the Site</li>
            <li>Interfere with the proper functioning of the Site</li>
            <li>Scrape, crawl, or use automated tools without permission</li>
          </ul>
        </section>
        <section>
          <h2>5. Intellectual Property</h2>
          <p>All intellectual property on this Site, including text, graphics, logos, and images, is owned by or licensed to Bean Brew Digest. Unauthorized use is prohibited.</p>
        </section>
        <section>
          <h2>6. Limitation of Liability</h2>
          <p>To the fullest extent permitted by law, Bean Brew Digest shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Site.</p>
        </section>
        <section>
          <h2>7. External Links</h2>
          <p>Our Site may contain links to third-party websites. We do not endorse and are not responsible for the content or practices of these external sites.</p>
        </section>
        <section>
          <h2>8. Changes to Terms</h2>
          <p>We reserve the right to update these Terms at any time. Changes will be posted on this page with an updated revision date. Continued use of the Site constitutes acceptance of the revised Terms.</p>
        </section>
        <section>
          <h2>9. Contact</h2>
          <p>For questions regarding these Terms, please visit our <a href="/contact">Contact page</a>.</p>
        </section>
      </div>
    </div>
  );
}
