import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Bean Brew Digest",
  description: "Get in touch with the Bean Brew Digest team.",
};

export default function ContactPage() {
  return (
    <div className="static-page">
      <div className="static-page-inner">
        <h1>Contact Us</h1>
        <p>We&apos;d love to hear from you. Whether you have a question about an article, a suggestion for a new topic, or feedback about our site, please reach out using the information below.</p>
        <section>
          <h2>General Inquiries</h2>
          <p>For general questions or feedback, email us at <a href="mailto:hello@beanbrewdigest.com">hello@beanbrewdigest.com</a>.</p>
        </section>
        <section>
          <h2>Content Suggestions</h2>
          <p>Have a coffee topic you&apos;d like us to cover? Send your ideas to <a href="mailto:editor@beanbrewdigest.com">editor@beanbrewdigest.com</a>.</p>
        </section>
        <section>
          <h2>Response Time</h2>
          <p>We typically respond within 2–3 business days. Thank you for your patience and for being part of our coffee community.</p>
        </section>
      </div>
    </div>
  );
}
