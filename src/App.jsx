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
    image: "new-years.webp",
    alt: "Création graphique pour le Nouvel An",
    title: "New Year's",
    description: "Création visuelle événementielle.",
  },
  {
    image: "porshe-design.webp",
    alt: "Projet de design Porsche",
    title: "Porsche Design",
    description: "Projet de design graphique.",
  },
  {
    image: "social-design-burger.webp",
    alt: "Création pour la communication d'un burger",
    title: "Social Design — Burger",
    description: "Visuel promotionnel pour la restauration.",
  },
  {
    image: "tacos.webp",
    alt: "Création graphique autour des tacos",
    title: "Tacos",
    description: "Visuel promotionnel pour la restauration.",
  },
  {
    image: "poster-movies.webp",
    alt: "Affiche sur le thème du cinéma",
    title: "Poster Movies",
    description: "Création d'affiche inspirée du cinéma.",
  },
  {
    image: "show-poster.webp",
    alt: "Affiche de spectacle",
    title: "Show Poster",
    description: "Création d'affiche événementielle.",
  },
  {
    image: "social-design.webp",
    alt: "Création graphique pour les réseaux sociaux",
    title: "Social Design",
    description: "Communication visuelle digitale.",
  },
];

const skills = [
  {
    number: "01",
    title: "Création graphique",
    description:
      "Identité visuelle, mise en page et déclinaisons adaptées à chaque support.",
    tools: "Illustrator · InDesign · Canva",
  },
  {
    number: "02",
    title: "Photographie & retouche",
    description:
      "Photographie événementielle, retouche colorimétrique et traitement d’images.",
    tools: "Photoshop · Lightroom",
  },
  {
    number: "03",
    title: "Communication digitale",
    description:
      "Création de contenus numériques et animation des réseaux sociaux au service des marques.",
    tools: "Contenu · Réseaux sociaux · Marque",
  },
  {
    number: "04",
    title: "Montage vidéo",
    description:
      "Montage vidéo et création de contenus animés pour raconter une idée en mouvement.",
    tools: "Notions : Premiere Pro · After Effects",
  },
];

const technologies = [
  { name: "Illustrator", mark: "Ai", style: "illustrator" },
  { name: "InDesign", mark: "Id", style: "indesign" },
  { name: "Canva", mark: "C", style: "canva" },
  { name: "Photoshop", mark: "Ps", style: "photoshop" },
  { name: "Lightroom", mark: "Lr", style: "lightroom" },
  { name: "Premiere Pro", mark: "Pr", style: "premiere" },
  { name: "After Effects", mark: "Ae", style: "after-effects" },
  // { name: "Notion", mark: "N", style: "notion" },
  { name: "Microsoft Office", mark: "▦", style: "office" },
  { name: "Sage 100", mark: "sage", style: "sage" },
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
  const projectDialogRef = useRef(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const dialog = projectDialogRef.current;
    if (!dialog) return;

    if (activeProject && !dialog.open) {
      dialog.showModal();
    } else if (!activeProject && dialog.open) {
      dialog.close();
    }
  }, [activeProject]);

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
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.get("from_name"),
          reply_to: form.get("reply_to"),
          subject: form.get("subject"),
          message: form.get("message"),
        },
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
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          id="main-navigation"
          className={`navigation${menuOpen ? " is-open" : ""}`}
          aria-label="Navigation principale"
          onClick={(event) => {
            if (event.target.closest("a")) setMenuOpen(false);
          }}
        >
          <a href="#accueil">Accueil</a>
          <a href="#services">Services</a>
          <a href="#competences">Compétences</a>
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

      <section className="skills-section" id="competences">
        <div className="section-wrap">
          <Reveal>
            <div className="section-heading">
              <div>
                <p className="eyebrow">SAVOIR-FAIRE</p>
                <h2>Des idées, de la création et du savoir-faire.</h2>
              </div>
              <p className="section-intro">
                Graphiste et photographe indépendant depuis 2022, nous donnons
                forme aux idées avec une approche créative et soignée.
              </p>
            </div>
          </Reveal>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <Reveal key={skill.number} delay={index * 70}>
                <article className="skill-card">
                  <span className="skill-number">{skill.number}</span>
                  <h3>{skill.title}</h3>
                  <p>{skill.description}</p>
                  <span className="skill-tools">{skill.tools}</span>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="technology-carousel">
            <p className="technology-caption">LES OUTILS QUE NOUS UTILISONS</p>
            <div className="technology-marquee">
              <div className="technology-track">
                {[0, 1].map((copy) => (
                  <div
                    className="technology-group"
                    key={copy}
                    aria-hidden={copy === 1 ? "true" : undefined}
                  >
                    {technologies.map((technology) => (
                      <div className="technology-item" key={technology.name}>
                        <span
                          className={`technology-mark ${technology.style}`}
                          aria-hidden="true"
                        >
                          {technology.mark}
                        </span>
                        <span className="technology-name">
                          {technology.name}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="portfolio-section section-wrap" id="realisations">
        <Reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">NOTRE UNIVERS CRÉATIF</p>
              <h2>Nos réalisations</h2>
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
                  <button
                    type="button"
                    className="portfolio-image-trigger"
                    aria-label={`Ouvrir ${project.title} en grand format`}
                    onClick={() => setActiveProject(project)}
                  >
                    <img
                      src={`/realisations/${project.image}`}
                      alt=""
                      loading="lazy"
                    />
                  </button>
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
        <dialog
          ref={projectDialogRef}
          className="portfolio-lightbox"
          aria-labelledby="portfolio-lightbox-title"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setActiveProject(null);
            }
          }}
          onClose={() => setActiveProject(null)}
        >
          {activeProject && (
            <>
              <button
                type="button"
                className="portfolio-lightbox-close"
                aria-label="Fermer l’aperçu"
                onClick={() => setActiveProject(null)}
              >
                <span aria-hidden="true">×</span>
              </button>
              <img
                className="portfolio-lightbox-image"
                src={`/realisations/${activeProject.image}`}
                alt={activeProject.alt}
              />
              <div className="portfolio-lightbox-caption">
                <h2 id="portfolio-lightbox-title">{activeProject.title}</h2>
                <p>{activeProject.description}</p>
              </div>
            </>
          )}
        </dialog>
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
