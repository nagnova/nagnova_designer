import { useState } from "react";
import "./App.css";

const services = [
  {
    number: "01",
    title: "Identité visuelle",
    description:
      "Construisons une identité visuelle cohérente pour aider votre petite entreprise ou votre commerce à affirmer sa personnalité.",
    tag: "BRANDING",
  },
  {
    number: "02",
    title: "Design graphique",
    description:
      "Des créations graphiques adaptées à votre activité pour présenter vos produits, vos services et vos messages avec clarté.",
    tag: "DESIGN",
  },
  {
    number: "03",
    title: "Création de logo",
    description:
      "Un logo pensé pour représenter votre activité et donner une identité reconnaissable à votre marque.",
    tag: "LOGO",
  },
  {
    number: "04",
    title: "Community management",
    description:
      "Une communication organisée sur les réseaux sociaux pour mieux présenter votre entreprise et garder le lien avec votre public.",
    tag: "RÉSEAUX SOCIAUX",
  },
];

function App() {
  const [showAllProjects, setShowAllProjects] = useState(false);
  return (
    <main>
      <header className="site-header">
        <a
          className="brand"
          href="#accueil"
          aria-label="NAGNOVA DESIGNER, accueil"
        >
          <img
            className="brand-logo"
            src="/logo-nagnova.png"
            alt="NAGNOVA DESIGNER — logo officiel"
          />
        </a>

        <nav className="navigation" aria-label="Navigation principale">
          <a href="#accueil">Accueil</a>
          <a href="#services">Services</a>
          <a href="#apropos">À propos</a>
          <a href="#contact" className="nav-contact">
            Parlons de votre projet <span>↗</span>
          </a>
        </nav>
      </header>

      <section className="hero" id="accueil">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="red-dot" />
            STUDIO CRÉATIF · DESIGN · STRATÉGIE
          </p>

          <h1>
            Donnons à votre marque
            <span className="headline-accent"> une identité forte.</span>
          </h1>

          <p className="hero-description">
            Nous transformons vos idées en identités visuelles et expériences
            digitales qui attirent l’attention, racontent votre histoire et
            valorisent votre activité.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#services">
              Découvrir nos services <span>↗</span>
            </a>
            <a className="button button-secondary" href="#apropos">
              Découvrir le studio
            </a>
          </div>

          <div className="hero-note">
            <span className="note-line" />
            CRÉER AVEC SENS. MARQUER LES ESPRITS.
          </div>
        </div>

        <div
          className="hero-visual"
          aria-label="Composition graphique abstraite"
        >
          <div className="visual-grid" />
          <div className="visual-label visual-label-top">
            N° 01 — DESIGN STUDIO
          </div>
          <div className="visual-shape">
            <span className="shape-letter">N</span>
            <span className="shape-slash" />
          </div>
          <div className="visual-circle">N</div>
          <div className="visual-label visual-label-bottom">
            <span>STRATÉGIE</span>
            <span className="label-divider" />
            <span>CRÉATIVITÉ</span>
          </div>
        </div>
      </section>

      <section className="services section-wrap" id="services">
        <div className="section-heading">
          <div>
            <p className="eyebrow">CE QUE NOUS FAISONS</p>
            <h2>Le design au service de vos ambitions.</h2>
          </div>
          <p className="section-intro">
            Des solutions créatives pensées pour construire une marque cohérente
            et mémorable.
          </p>
        </div>

        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <div className="service-top">
                <span className="service-number">{service.number}</span>
                <span className="service-arrow">↗</span>
              </div>
              <p className="service-tag">{service.tag}</p>
              <h3>{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-section section-wrap" id="realisations">
        <div className="section-heading">
          <p className="eyebrow">MON UNIVERS CRÉATIF</p>
          <h2>Mes réalisations</h2>
          <p>
            Découvrez une sélection de créations graphiques imaginées pour
            donner vie aux idées et valoriser les marques.
          </p>
        </div>

        <div className="portfolio-grid">
          <article className="portfolio-card">
            <img
              src="/realisations/article-journal.jpg"
              alt="Création graphique pour un article de journal"
            />
            <h3>Article de journal</h3>
            <p>Création éditoriale et mise en page.</p>
          </article>

          <article className="portfolio-card">
            <img
              src="/realisations/brochure-esaf-verso.png"
              alt="Brochure ESAF, face verso"
            />
            <h3>Brochure ESAF — Recto</h3>
            <p>Conception graphique de brochure.</p>
          </article>

          <article className="portfolio-card">
            <img
              src="/realisations/brochure-esaf-recto.png"
              alt="Brochure ESAF, face recto"
            />
            <h3>Brochure ESAF — Verso</h3>
            <p>Mise en page et continuité visuelle.</p>
          </article>

          <article className="portfolio-card">
            <img
              src="/realisations/new-years.jpg"
              alt="Création graphique pour le Nouvel An"
            />
            <h3>New Year's</h3>
            <p>Création visuelle événementielle.</p>
          </article>

          <article className="portfolio-card">
            <img
              src="/realisations/porshe-design.jpg"
              alt="Projet de design Porsche"
            />
            <h3>Porsche Design</h3>
            <p>Projet de design graphique.</p>
          </article>

          <article className="portfolio-card">
            <img
              src="/realisations/poster-movies.jpg"
              alt="Affiche sur le thème du cinéma"
            />
            <h3>Poster Movies</h3>
            <p>Création d'affiche inspirée du cinéma.</p>
          </article>

          <article className="portfolio-card">
            <img
              src="/realisations/show-poster.jpg"
              alt="Affiche de spectacle"
            />
            <h3>Show Poster</h3>
            <p>Création d'affiche événementielle.</p>
          </article>

          <article className="portfolio-card">
            <img
              src="/realisations/social-design.png"
              alt="Création graphique pour les réseaux sociaux"
            />
            <h3>Social Design</h3>
            <p>Communication visuelle digitale.</p>
          </article>

          <article className="portfolio-card">
            <img
              src="/realisations/social-design-burger.jpg"
              alt="Création pour la communication d'un burger"
            />
            <h3>Social Design — Burger</h3>
            <p>Visuel promotionnel pour la restauration.</p>
          </article>

          <article className="portfolio-card">
            <img
              src="/realisations/tacos.jpg"
              alt="Création graphique autour des tacos"
            />
            <h3>Tacos</h3>
            <p>Visuel promotionnel pour la restauration.</p>
          </article>
        </div>
      </section>

      <section className="about-section" id="apropos">
        <div className="section-wrap about-inner">
          <p className="eyebrow">
            <span className="red-dot" />
            L'ESPRIT NAGNOVA
          </p>
          <h2>
            Le beau attire.
            <span> Le sens convainc.</span>
          </h2>
          <p>
            Chaque projet commence par une idée. Notre rôle est de lui donner
            une forme claire, une personnalité distinctive et une direction
            visuelle cohérente.
          </p>
        </div>
      </section>

      <section className="contact-section section-wrap" id="contact">
        <div>
          <p className="eyebrow">VOTRE PROCHAIN CHAPITRE</p>
          <h2>Un projet en tête ?</h2>
          <p>
            Vous dirigez une petite entreprise ou un commerce ? Parlons de vos
            idées et imaginons ensemble une communication visuelle adaptée à
            votre activité.
          </p>
        </div>

        <div className="contact-actions">
          <a
            className="button button-primary"
            href="https://mail.google.com/mail/?view=cm&fs=1&to=contact.nagnova@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            Envoyer un e-mail <span>↗</span>
          </a>

          <a
            className="button button-primary"
            href="https://wa.me/261383963224"
            target="_blank"
            rel="noreferrer"
          >
            Contacter sur WhatsApp <span>↗</span>
          </a>

          <a
            className="button button-primary"
            href="https://www.facebook.com/nagnova.design"
            target="_blank"
            rel="noreferrer"
          >
            Visiter Facebook <span>↗</span>
          </a>
        </div>
      </section>

      <footer className="site-footer">
        <a
          className="footer-brand"
          href="#accueil"
          aria-label="Retour à l’accueil NAGNOVA DESIGNER"
        >
          <img
            className="footer-logo"
            src="/logo-nagnova.png"
            alt="NAGNOVA DESIGNER"
          />
        </a>

        <p>© {new Date().getFullYear()} NAGNOVA. Tous droits réservés.</p>
        <a href="#accueil">Retour en haut ↑</a>
      </footer>
    </main>
  );
}

export default App;
