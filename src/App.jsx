import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";

const services = [
  {
    number: "01",
    title: "Identité visuelle",
    description:
      "Construisons une identité visuelle cohérente pour aider votre entreprise à affirmer sa personnalité.",
    tag: "BRANDING",
  },
  {
    number: "02",
    title: "Design graphique",
    description:
      "Des créations graphiques adaptées à votre activité pour présenter vos produits et vos messages avec clarté.",
    tag: "DESIGN",
  },
  {
    number: "03",
    title: "Création de logo",
    description:
      "Un logo pensé pour représenter votre activité et rendre votre marque reconnaissable.",
    tag: "LOGO",
  },
  {
    number: "04",
    title: "Community management",
    description:
      "Une communication organisée sur les réseaux sociaux pour présenter votre entreprise et garder le lien avec votre public.",
    tag: "RÉSEAUX SOCIAUX",
  },
];

const projects = [
  {
    image: "article-journal.jpg",
    alt: "Création graphique pour un article de journal",
    title: "Article de journal",
    description: "Création éditoriale et mise en page.",
  },
  {
    image: "brochure-esaf-recto.png",
    alt: "Brochure ESAF, face recto",
    title: "Brochure ESAF — Recto",
    description: "Conception graphique de brochure.",
  },
  {
    image: "new-years.jpg",
    alt: "Création graphique pour le Nouvel An",
    title: "New Year's",
    description: "Création visuelle événementielle.",
  },
  {
    image: "porshe-design.jpg",
    alt: "Projet de design Porsche",
    title: "Porsche Design",
    description: "Projet de design graphique.",
  },
  {
    image: "social-design-burger.jpg",
    alt: "Création pour la communication d'un burger",
    title: "Social Design — Burger",
    description: "Visuel promotionnel pour la restauration.",
  },
  {
    image: "tacos.jpg",
    alt: "Création graphique autour des tacos",
    title: "Tacos",
    description: "Visuel promotionnel pour la restauration.",
  },
  {
    image: "brochure-esaf-verso.png",
    alt: "Brochure ESAF, face verso",
    title: "Brochure ESAF — Verso",
    description: "Mise en page et continuité visuelle.",
  },
  {
    image: "poster-movies.jpg",
    alt: "Affiche sur le thème du cinéma",
    title: "Poster Movies",
    description: "Création d'affiche inspirée du cinéma.",
  },
  {
    image: "show-poster.jpg",
    alt: "Affiche de spectacle",
    title: "Show Poster",
    description: "Création d'affiche événementielle.",
  },
  {
    image: "social-design.png",
    alt: "Création graphique pour les réseaux sociaux",
    title: "Social Design",
    description: "Communication visuelle digitale.",
  },
];

function Reveal({ children, className = "", delay = 0, ...props }) {
  const [visible, setVisible] = useState(false);
  const elementRef = useRef(null);
  useEffect(() => {
    const element = elementRef.current;
    if (!element || !("IntersectionObserver" in window)) {
      setVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` }}
      {...props}
    >
      {children}
    </div>
  );
}

function App() {
  const formRef = useRef(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });
  const [sending, setSending] = useState(false);

  async function handleContactSubmit(event) {
    event.preventDefault();

    if (sending) return;

    const formElement = event.currentTarget;

    const {
      VITE_EMAILJS_SERVICE_ID,
      VITE_EMAILJS_TEMPLATE_ID,
      VITE_EMAILJS_PUBLIC_KEY,
    } = import.meta.env;

    const form = new FormData(formElement);

    const mailBody = [
      `Nom : ${form.get("from_name")}`,
      `E-mail : ${form.get("reply_to")}`,
      `Sujet : ${form.get("subject")}`,
      "",
      String(form.get("message") ?? ""),
    ].join("\n");

    const fallbackHref = `mailto:contact.nagnova@gmail.com?${new URLSearchParams(
      {
        subject: `Demande de contact — ${form.get("subject")}`,
        body: mailBody,
      },
    ).toString()}`;

    setFormStatus({ type: "", message: "" });

    if (
      !VITE_EMAILJS_SERVICE_ID ||
      !VITE_EMAILJS_TEMPLATE_ID ||
      !VITE_EMAILJS_PUBLIC_KEY
    ) {
      setFormStatus({
        type: "error",
        message: "EmailJS n'est pas correctement configuré.",
        fallbackHref,
      });
      return;
    }

    setSending(true);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      formElement.reset();

      setFormStatus({
        type: "success",
        message:
          "Votre message a bien été envoyé. Merci, nous vous répondrons bientôt !",
      });
    } catch (error) {
      console.error("EmailJS status :", error.status);
      console.error("EmailJS details :", error.text);
      console.error("EmailJS error :", error);

      setFormStatus({
        type: "error",
        message:
          "L'envoi automatique a échoué. Vous pouvez ouvrir un e-mail prérempli ou réessayer.",
        fallbackHref,
      });
    } finally {
      setSending(false);
    }
  }

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
          <a href="#realisations">Réalisations</a>
          <a href="#apropos">À propos</a>
          <a href="#contact" className="nav-contact">
            Parlons de votre projet <span>↗</span>
          </a>
        </nav>
      </header>

      <section className="hero" id="accueil">
        <Reveal className="hero-copy">
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
        </Reveal>
        <Reveal
          className="hero-visual"
          delay={120}
          role="img"
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
        </Reveal>
      </section>

      <section className="services section-wrap" id="services">
        <Reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">CE QUE NOUS FAISONS</p>
              <h2>Le design au service de vos ambitions.</h2>
            </div>
            <p className="section-intro">
              Des solutions créatives pensées pour construire une marque
              cohérente et mémorable.
            </p>
          </div>
        </Reveal>
        <div className="service-grid">
          {services.map((service, index) => (
            <Reveal key={service.number} delay={index * 90}>
              <article className="service-card">
                <div className="service-top">
                  <span className="service-number">{service.number}</span>
                  <span className="service-arrow">↗</span>
                </div>
                <p className="service-tag">{service.tag}</p>
                <h3>{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="portfolio-section section-wrap" id="realisations">
        <Reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">MON UNIVERS CRÉATIF</p>
              <h2>Mes réalisations</h2>
            </div>
            <p className="section-intro">
              Découvrez une sélection de créations graphiques imaginées pour
              donner vie aux idées et valoriser les marques.
            </p>
          </div>
        </Reveal>
        <div className="portfolio-grid">
          {projects
            .slice(0, showAllProjects ? projects.length : 6)
            .map((project, index) => (
              <Reveal key={project.image} delay={(index % 3) * 80}>
                <article className="portfolio-card">
                  <img
                    src={`/realisations/${project.image}`}
                    alt={project.alt}
                    loading="lazy"
                  />
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </article>
              </Reveal>
            ))}
        </div>
        {projects.length > 6 && (
          <div className="portfolio-more">
            <button
              type="button"
              className="btn btn-primary"
              aria-expanded={showAllProjects}
              onClick={() => setShowAllProjects((value) => !value)}
            >
              {showAllProjects ? "Voir moins" : "Voir plus de réalisations"}
            </button>
          </div>
        )}
      </section>

      <section className="about-section" id="apropos">
        <Reveal className="section-wrap about-inner">
          <p className="eyebrow">
            <span className="red-dot" />
            L’ESPRIT NAGNOVA
          </p>
          <h2>
            Le beau attire.<span> Le sens convainc.</span>
          </h2>
          <p>
            Chaque projet commence par une idée. Notre rôle est de lui donner
            une forme claire, une personnalité distinctive et une direction
            visuelle cohérente.
          </p>
        </Reveal>
      </section>

      <section className="contact-section section-wrap" id="contact">
        <Reveal className="contact-copy">
          <p className="eyebrow">VOTRE PROCHAIN CHAPITRE</p>
          <h2>Un projet en tête ?</h2>
          <p>
            Vous dirigez une entreprise ou possédez un commerce ? Parlons de vos
            idées et donnons-leur vie à travers une communication visuelle
            créative, professionnelle et adaptée à votre activité.
          </p>
          <div className="contact-actions">
            <a
              className="button button-secondary"
              href="https://wa.me/261383963224"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp <span>↗</span>
            </a>
            <a
              className="button button-secondary"
              href="https://www.facebook.com/nagnova.design"
              target="_blank"
              rel="noreferrer"
            >
              Facebook <span>↗</span>
            </a>
          </div>
        </Reveal>
        <Reveal className="contact-form-wrap" delay={100}>
          <form
            ref={formRef}
            className="contact-form"
            onSubmit={handleContactSubmit}
          >
            <label htmlFor="contact-name">Votre nom</label>
            <input
              id="contact-name"
              name="from_name"
              type="text"
              autoComplete="name"
              placeholder="Nom et prénom"
              required
            />
            <label htmlFor="contact-email">Votre adresse e-mail</label>
            <input
              id="contact-email"
              name="reply_to"
              type="email"
              autoComplete="email"
              placeholder="vous@exemple.com"
              required
            />
            <label htmlFor="contact-subject">Sujet</label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              placeholder="Votre projet"
              required
            />
            <label htmlFor="contact-message">Votre message</label>
            <textarea
              id="contact-message"
              name="message"
              rows="5"
              placeholder="Parlez-nous de votre projet…"
              required
            />
            <button
              className="button button-primary"
              type="submit"
              disabled={sending}
            >
              {sending ? "Envoi en cours…" : "Envoyer le message"}
              <span>↗</span>
            </button>
            {formStatus.message && (
              <p className={`form-feedback ${formStatus.type}`} role="status">
                {formStatus.message}
                {formStatus.fallbackHref && (
                  <a className="form-fallback" href={formStatus.fallbackHref}>
                    Ouvrir l’e-mail prérempli ↗
                  </a>
                )}
              </p>
            )}
          </form>
        </Reveal>
      </section>

      <footer className="site-footer">
        <a
          className="footer-brand"
          href="#accueil"
          aria-label="Retour à l'accueil NAGNOVA DESIGNER"
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
