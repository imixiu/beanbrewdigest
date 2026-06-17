import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Bean Brew Digest",
  description: "Privacy policy for beanbrewdigest.com.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="static-page">
      <div className="static-page-inner">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last updated: June 2026</p>
        <section>
          <h2>1. Information We Collect</h2>
          <p>We collect information you provide directly, such as your email address when you subscribe to our newsletter. We also automatically collect certain information about your visit, including your IP address, browser type, pages viewed, and referring URLs.</p>
        </section>
        <section>
          <h2>2. How We Use Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our content and services</li>
            <li>Send newsletters and updates (with your consent)</li>
            <li>Analyze site usage to improve user experience</li>
            <li>Respond to your comments and questions</li>
          </ul>
        </section>
        <section>
          <h2>3. Cookies and Analytics</h2>
          <p>We use cookies and similar technologies to enhance your experience. We use Google Analytics to understand how visitors interact with our site. You can control cookies through your browser settings.</p>
        </section>
        <section>
          <h2>4. Third-Party Services</h2>
          <p>Our site may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to read their privacy policies.</p>
        </section>
        <section>
          <h2>5. Data Security</h2>
          <p>We implement reasonable security measures to protect your personal information. However, no method of transmission over the Internet is completely secure.</p>
        </section>
        <section>
          <h2>6. Children&apos;s Privacy</h2>
          <p>Our site is not directed to children under 13. We do not knowingly collect personal information from children under 13.</p>
        </section>
        <section>
          <h2>7. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated revision date.</p>
        </section>
        <section>
          <h2>8. Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please visit our <a href="/contact">Contact page</a>.</p>
        </section>
      </div>
    </div>
  );
}
