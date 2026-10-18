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

const translations = {
  fr: {
    nav: ["Accueil", "Services", "Compétences", "Réalisations", "À propos"],
    contact: "Parlons de votre projet",
    heroEyebrow: "STUDIO CRÉATIF · DESIGN · STRATÉGIE",
    heroTitle: "Donnons à votre marque",
    heroAccent: "une identité forte.",
    heroDescription:
      "Nous transformons vos idées en identités visuelles et expériences digitales qui attirent l’attention, racontent votre histoire et valorisent votre activité.",
    discover: "Découvrir nos services",
    studio: "Découvrir le studio",
    heroNote: "CRÉER AVEC SENS. MARQUER LES ESPRITS.",
    strategy: "STRATÉGIE",
    creativity: "CRÉATIVITÉ",
    sectionServices: "CE QUE NOUS FAISONS",
    servicesTitle: "Le design au service de vos ambitions.",
    servicesIntro:
      "Des solutions créatives pensées pour construire une marque cohérente et mémorable.",
    skillsEyebrow: "SAVOIR-FAIRE",
    skillsTitle: "Des idées, de la création et du savoir-faire.",
    skillsIntro:
      "Graphiste et photographe indépendant depuis 2022, nous donnons forme aux idées avec une approche créative et soignée.",
    tools: "LES OUTILS QUE NOUS UTILISONS",
    portfolioEyebrow: "NOTRE UNIVERS CRÉATIF",
    portfolioTitle: "Nos réalisations",
    portfolioIntro:
      "Découvrez une sélection de créations graphiques imaginées pour donner vie aux idées et valoriser les marques.",
    more: "Voir plus de réalisations",
    less: "Voir moins",
    open: "Ouvrir le projet en grand format",
    close: "Fermer l’aperçu",
    aboutEyebrow: "L’ESPRIT NAGNOVA",
    aboutFirst: "Le beau attire.",
    aboutSecond: "Le sens convainc.",
    aboutText:
      "Chaque projet commence par une idée. Notre rôle est de lui donner une forme claire, une personnalité distinctive et une direction visuelle cohérente.",
    contactEyebrow: "VOTRE PROCHAIN CHAPITRE",
    contactTitle: "Un projet en tête ?",
    contactText:
      "Vous dirigez une entreprise ou possédez un commerce ? Parlons de vos idées et donnons-leur vie à travers une communication visuelle créative, professionnelle et adaptée à votre activité.",
    name: "Votre nom",
    namePlaceholder: "Nom et prénom",
    email: "Votre adresse e-mail",
    subject: "Sujet",
    subjectPlaceholder: "Votre projet",
    message: "Votre message",
    messagePlaceholder: "Parlez-nous de votre projet…",
    sending: "Envoi en cours…",
    send: "Envoyer le message",
    fallback: "Ouvrir l’e-mail prérempli ↗",
    footer: "Tous droits réservés.",
    top: "Retour en haut ↑",
    backHome: "Retour à l'accueil NAGNOVA DESIGNER",
    success:
      "Votre message a bien été envoyé. Merci, nous vous répondrons bientôt !",
    failed:
      "L'envoi automatique a échoué. Vous pouvez ouvrir un e-mail prérempli ou réessayer.",
    config: "EmailJS n'est pas correctement configuré.",
    tags: ["BRANDING", "DESIGN", "LOGO", "RÉSEAUX SOCIAUX"],
    skillTools: [
      "Illustrator · InDesign · Canva",
      "Photoshop · Lightroom",
      "Contenu · Réseaux sociaux · Marque",
      "Notions : Premiere Pro · After Effects",
    ],
    emailPlaceholder: "vous@exemple.com",
    mainNav: "Navigation principale",
    menuClose: "Fermer le menu",
    menuOpen: "Ouvrir le menu",
    services: [
      [
        "Identité visuelle",
        "Construisons une identité visuelle cohérente pour aider votre entreprise à affirmer sa personnalité.",
      ],
      [
        "Design graphique",
        "Des créations graphiques adaptées à votre activité pour présenter vos produits et vos messages avec clarté.",
      ],
      [
        "Création de logo",
        "Un logo pensé pour représenter votre activité et rendre votre marque reconnaissable.",
      ],
      [
        "Community management",
        "Une communication organisée sur les réseaux sociaux pour présenter votre entreprise et garder le lien avec votre public.",
      ],
    ],
    skills: [
      [
        "Création graphique",
        "Identité visuelle, mise en page et déclinaisons adaptées à chaque support.",
      ],
      [
        "Photographie & retouche",
        "Photographie événementielle, retouche colorimétrique et traitement d’images.",
      ],
      [
        "Communication digitale",
        "Création de contenus numériques et animation des réseaux sociaux au service des marques.",
      ],
      [
        "Montage vidéo",
        "Montage vidéo et création de contenus animés pour raconter une idée en mouvement.",
      ],
    ],
    projects: [
      "Création graphique pour le Nouvel An",
      "Projet de design Porsche",
      "Création pour la communication d'un burger",
      "Création graphique autour des tacos",
      "Affiche sur le thème du cinéma",
      "Affiche de spectacle",
      "Création graphique pour les réseaux sociaux",
    ],
    descriptions: [
      "Création visuelle événementielle.",
      "Projet de design graphique.",
      "Visuel promotionnel pour la restauration.",
      "Visuel promotionnel pour la restauration.",
      "Création d'affiche inspirée du cinéma.",
      "Création d'affiche événementielle.",
      "Communication visuelle digitale.",
    ],
  },
  en: {
    nav: ["Home", "Services", "Skills", "Portfolio", "About"],
    contact: "Let’s talk about your project",
    heroEyebrow: "CREATIVE STUDIO · DESIGN · STRATEGY",
    heroTitle: "Let’s give your brand",
    heroAccent: "a bold identity.",
    heroDescription:
      "We turn your ideas into visual identities and digital experiences that capture attention, tell your story, and showcase your business.",
    discover: "Explore our services",
    studio: "Discover the studio",
    heroNote: "CREATE WITH PURPOSE. MAKE AN IMPACT.",
    strategy: "STRATEGY",
    creativity: "CREATIVITY",
    sectionServices: "WHAT WE DO",
    servicesTitle: "Design that brings your ambitions to life.",
    servicesIntro:
      "Creative solutions designed to build a consistent, memorable brand.",
    skillsEyebrow: "OUR EXPERTISE",
    skillsTitle: "Ideas, creativity, and expertise.",
    skillsIntro:
      "Independent graphic designer and photographer since 2022, shaping ideas with a thoughtful, creative approach.",
    tools: "TOOLS WE USE",
    portfolioEyebrow: "OUR CREATIVE WORLD",
    portfolioTitle: "Selected work",
    portfolioIntro:
      "Explore a selection of graphic design projects created to bring ideas to life and elevate brands.",
    more: "See more projects",
    less: "See less",
    open: "View project full size",
    close: "Close preview",
    aboutEyebrow: "THE NAGNOVA SPIRIT",
    aboutFirst: "Beauty attracts.",
    aboutSecond: "Meaning persuades.",
    aboutText:
      "Every project starts with an idea. Our role is to give it a clear form, a distinctive personality, and a consistent visual direction.",
    contactEyebrow: "YOUR NEXT CHAPTER",
    contactTitle: "Have a project in mind?",
    contactText:
      "Run a business or own a shop? Let’s talk about your ideas and bring them to life with creative, professional visual communication tailored to your needs.",
    name: "Your name",
    namePlaceholder: "First and last name",
    email: "Your email address",
    subject: "Subject",
    subjectPlaceholder: "Your project",
    message: "Your message",
    messagePlaceholder: "Tell us about your project…",
    sending: "Sending…",
    send: "Send message",
    fallback: "Open prefilled email ↗",
    footer: "All rights reserved.",
    top: "Back to top ↑",
    backHome: "Back to NAGNOVA DESIGNER home",
    success: "Your message has been sent. Thank you—we’ll be in touch soon!",
    failed:
      "Automatic sending failed. You can open a prefilled email or try again.",
    config: "EmailJS is not configured correctly.",
    tags: ["BRANDING", "DESIGN", "LOGO", "SOCIAL MEDIA"],
    skillTools: [
      "Illustrator · InDesign · Canva",
      "Photoshop · Lightroom",
      "Content · Social media · Branding",
      "Basics: Premiere Pro · After Effects",
    ],
    emailPlaceholder: "you@example.com",
    mainNav: "Main navigation",
    menuClose: "Close menu",
    menuOpen: "Open menu",
    services: [
      [
        "Visual identity",
        "Let’s build a consistent visual identity that helps your business express its personality.",
      ],
      [
        "Graphic design",
        "Graphic design tailored to your business, presenting your products and messages clearly.",
      ],
      [
        "Logo design",
        "A logo designed to represent your business and make your brand recognizable.",
      ],
      [
        "Social media management",
        "A thoughtful social media presence to showcase your business and stay connected with your audience.",
      ],
    ],
    skills: [
      [
        "Graphic design",
        "Visual identity, layout, and adaptations for every medium.",
      ],
      [
        "Photography & retouching",
        "Event photography, color correction, and image editing.",
      ],
      [
        "Digital communication",
        "Digital content creation and social media management for brands.",
      ],
      [
        "Video editing",
        "Video editing and motion content that bring ideas to life.",
      ],
    ],
    projects: [
      "New Year graphic design",
      "Porsche design project",
      "Burger promotional design",
      "Taco promotional design",
      "Movie-themed poster",
      "Event poster",
      "Social media graphic design",
    ],
    descriptions: [
      "Event visual design.",
      "Graphic design project.",
      "Promotional food and beverage design.",
      "Promotional food and beverage design.",
      "Movie-inspired poster design.",
      "Event poster design.",
      "Digital visual communication.",
    ],
  },
};

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
  const [closingProject, setClosingProject] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });
  const [sending, setSending] = useState(false);
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem("nagnova-language");
    return saved === "en" ? "en" : "fr";
  });
  const t = translations[language];

  function closeProjectPreview() {
    if (!activeProject || closingProject) return;
    setClosingProject(true);
    window.setTimeout(() => {
      setActiveProject(null);
      setClosingProject(false);
    }, 180);
  }

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem("nagnova-language", language);
  }, [language]);

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
        message: t.config,
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
        message: t.success,
      });
    } catch (error) {
      console.error("EmailJS status :", error.status);
      console.error("EmailJS details :", error.text);
      console.error("EmailJS error :", error);

      setFormStatus({
        type: "error",
        message: t.failed,
        fallbackHref,
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <main lang={language}>
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
        <div className="header-controls">
          <button
            type="button"
            className="language-toggle language-toggle-mobile"
            aria-label={
              language === "fr" ? "Switch to English" : "Passer en français"
            }
            onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
          >
            {language === "fr" ? "EN" : "FR"}
          </button>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? t.menuClose : t.menuOpen}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <nav
          id="main-navigation"
          className={`navigation${menuOpen ? " is-open" : ""}`}
          aria-label={t.mainNav}
          onClick={(event) => {
            if (event.target.closest("a")) setMenuOpen(false);
          }}
        >
          <a href="#accueil">{t.nav[0]}</a>
          <a href="#services">{t.nav[1]}</a>
          <a href="#competences">{t.nav[2]}</a>
          <a href="#realisations">{t.nav[3]}</a>
          <a href="#apropos">{t.nav[4]}</a>
          <a href="#contact" className="nav-contact">
            {t.contact} <span>↗</span>
          </a>
          <button
            type="button"
            className="language-toggle"
            aria-label={
              language === "fr" ? "Switch to English" : "Passer en français"
            }
            onClick={() => {
              setLanguage(language === "fr" ? "en" : "fr");
              setMenuOpen(false);
            }}
          >
            {language === "fr" ? "EN" : "FR"}
          </button>
        </nav>
      </header>

      <section className="hero" id="accueil">
        <Reveal className="hero-copy">
          <p className="eyebrow">
            <span className="red-dot" />
            {t.heroEyebrow}
          </p>
          <h1>
            {t.heroTitle}
            <span className="headline-accent"> {t.heroAccent}</span>
          </h1>
          <p className="hero-description">{t.heroDescription}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#services">
              {t.discover} <span>↗</span>
            </a>
            <a className="button button-secondary" href="#apropos">
              {t.studio}
            </a>
          </div>
          <div className="hero-note">
            <span className="note-line" />
            {t.heroNote}
          </div>
        </Reveal>
        <Reveal
          className="hero-visual"
          delay={120}
          role="img"
          aria-label="Composition graphique animée avec le N de NAGNOVA"
        >
          <div className="visual-grid" />
          <div className="visual-label visual-label-top">
            N° 01 — DESIGN STUDIO
          </div>
          <div className="visual-logo-wrap" aria-hidden="true">
            <img className="visual-logo" src="/LG-n-noir-03.png" alt="" />
            <span className="visual-logo-grid" />
          </div>
          <div className="visual-label visual-label-bottom">
            <span>{t.strategy}</span>
            <span className="label-divider" />
            <span>{t.creativity}</span>
          </div>
        </Reveal>
      </section>

      <section className="services section-wrap" id="services">
        <Reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">{t.sectionServices}</p>
              <h2>{t.servicesTitle}</h2>
            </div>
            <p className="section-intro">{t.servicesIntro}</p>
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
                <p className="service-tag">{t.tags[index]}</p>
                <h3>{t.services[index][0]}</h3>
                <p className="service-description">{t.services[index][1]}</p>
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
                <p className="eyebrow">{t.skillsEyebrow}</p>
                <h2>{t.skillsTitle}</h2>
              </div>
              <p className="section-intro">{t.skillsIntro}</p>
            </div>
          </Reveal>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <Reveal key={skill.number} delay={index * 70}>
                <article className="skill-card">
                  <span className="skill-number">{skill.number}</span>
                  <h3>{t.skills[index][0]}</h3>
                  <p>{t.skills[index][1]}</p>
                  <span className="skill-tools">{t.skillTools[index]}</span>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="technology-carousel">
            <p className="technology-caption">{t.tools}</p>
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
              <p className="eyebrow">{t.portfolioEyebrow}</p>
              <h2>{t.portfolioTitle}</h2>
            </div>
            <p className="section-intro">{t.portfolioIntro}</p>
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
                    aria-label={t.open}
                    onClick={() =>
                      setActiveProject({
                        ...project,
                        title: t.projects[index],
                        alt: t.projects[index],
                        description: t.descriptions[index],
                      })
                    }
                  >
                    <img
                      src={`/realisations/${project.image}`}
                      alt=""
                      loading="lazy"
                    />
                  </button>
                  <h3>{t.projects[index]}</h3>
                  <p>{t.descriptions[index]}</p>
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
              {showAllProjects ? t.less : t.more}
            </button>
          </div>
        )}
        <dialog
          ref={projectDialogRef}
          className={`portfolio-lightbox${closingProject ? " is-closing" : ""}`}
          aria-labelledby="portfolio-lightbox-title"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeProjectPreview();
            }
          }}
          onClose={() => {
            setActiveProject(null);
            setClosingProject(false);
          }}
        >
          {activeProject && (
            <>
              <button
                type="button"
                className="portfolio-lightbox-close"
                aria-label={t.close}
                onClick={closeProjectPreview}
              >
                <span aria-hidden="true">×</span>
              </button>
              <div className="portfolio-lightbox-stage">
                <img
                  className="portfolio-lightbox-image"
                  src={`/realisations/${activeProject.image}`}
                  alt={activeProject.alt}
                />
              </div>
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
            {t.aboutEyebrow}
          </p>
          <h2>
            {t.aboutFirst}
            <span> {t.aboutSecond}</span>
          </h2>
          <p>{t.aboutText}</p>
        </Reveal>
      </section>

      <section className="contact-section section-wrap" id="contact">
        <Reveal className="contact-copy">
          <p className="eyebrow">{t.contactEyebrow}</p>
          <h2>{t.contactTitle}</h2>
          <p>{t.contactText}</p>
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
            <label htmlFor="contact-name">{t.name}</label>
            <input
              id="contact-name"
              name="from_name"
              type="text"
              autoComplete="name"
              placeholder={t.namePlaceholder}
              required
            />
            <label htmlFor="contact-email">{t.email}</label>
            <input
              id="contact-email"
              name="reply_to"
              type="email"
              autoComplete="email"
              placeholder={t.emailPlaceholder}
              required
            />
            <label htmlFor="contact-subject">{t.subject}</label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              placeholder={t.subjectPlaceholder}
              required
            />
            <label htmlFor="contact-message">{t.message}</label>
            <textarea
              id="contact-message"
              name="message"
              rows="5"
              placeholder={t.messagePlaceholder}
              required
            />
            <button
              className="button button-primary"
              type="submit"
              disabled={sending}
            >
              {sending ? t.sending : t.send}
              <span>↗</span>
            </button>
            {formStatus.message && (
              <p className={`form-feedback ${formStatus.type}`} role="status">
                {formStatus.message}
                {formStatus.fallbackHref && (
                  <a className="form-fallback" href={formStatus.fallbackHref}>
                    {t.fallback}
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
        <p>
          © {new Date().getFullYear()} NAGNOVA. {t.footer}
        </p>
        <a href="#accueil">{t.top}</a>
      </footer>
    </main>
  );
}

export default App;
