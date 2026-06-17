import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Bean Brew Digest",
  description: "Learn about Bean Brew Digest — our mission, team, and commitment to specialty coffee.",
};

export default function AboutPage() {
  return (
    <div className="static-page">
      <div className="static-page-inner">
        <h1>About Bean Brew Digest</h1>
        <section>
          <h2>Our Mission</h2>
          <p>Bean Brew Digest is dedicated to providing expert content and guides about specialty coffee. We help readers make informed decisions with reliable, well-researched information about brewing methods, bean origins, roasting craft, and café culture.</p>
        </section>
        <section>
          <h2>What We Do</h2>
          <p>We publish in-depth articles, reviews, and guides covering every aspect of specialty coffee. Each piece is written by experienced contributors who are passionate about the craft.</p>
        </section>
        <section>
          <h2>Our Team</h2>
          <p>Our contributors include industry experts, experienced reviewers, and specialists sharing their expertise in coffee sourcing, brewing science, and equipment evaluation.</p>
        </section>
        <section>
          <h2>Contact</h2>
          <p>Have questions? Visit our <a href="/contact">Contact page</a>.</p>
        </section>
      </div>
    </div>
  );
}
