import { useEffect, useRef, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  Hammer,
  Home,
  Mail,
  MapPin,
  Menu,
  PaintRoller,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from 'lucide-react'
import heroImage from './assets/wess-hero-painters.png'
import kitchenImage from './assets/wess-kitchen-renovation.png'
import kitchenBeforeAfterImage from './assets/wess-kitchen-before-after.png'
import exteriorImage from './assets/wess-exterior-before-after.png'
import basementBeforeAfterImage from './assets/wess-basement-before-after.png'
import toolsImage from './assets/wess-paint-tools.png'
import livingImage from './assets/wess-living-room.png'
import livingBeforeAfterImage from './assets/wess-living-before-after.png'
import wessLogo from './assets/wess-logo.png'
import './App.css'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
]

const trustItems = [
  { icon: PaintRoller, title: 'Quality', text: 'Craftsmanship' },
  { icon: ShieldCheck, title: 'Reliable &', text: 'Insured' },
  { icon: CalendarCheck, title: 'On Time &', text: 'On Budget' },
  { icon: Star, title: '100% Customer', text: 'Satisfaction' },
]

const stats = [
  { icon: Award, value: '10+', label: 'Years Experience' },
  { icon: CheckCircle2, value: '500+', label: 'Projects Completed' },
  { icon: ShieldCheck, value: 'Fully', label: 'Licensed & Insured' },
]

const services = [
  {
    icon: PaintRoller,
    title: 'Painting',
    image: heroImage,
    text: 'Interior and exterior painting with careful prep, crisp lines, and durable finishes.',
  },
  {
    icon: Hammer,
    title: 'Renovation',
    image: kitchenImage,
    text: 'Full home upgrades from planning through finish work, built around your budget.',
  },
  {
    icon: Sparkles,
    title: 'Interior Upgrades',
    image: livingImage,
    text: 'Trim, feature walls, cabinetry refreshes, flooring, and detail-driven improvements.',
  },
  {
    icon: Home,
    title: 'Exterior Improvements',
    image: exteriorImage,
    text: 'Curb appeal, exterior paint, repairs, and weather-ready home improvements.',
  },
]

const projects = [
  { title: 'Kitchen Renovation', image: kitchenBeforeAfterImage },
  { title: 'Exterior Makeover', image: exteriorImage },
  { title: 'Basement Finishing', image: basementBeforeAfterImage },
  { title: 'Living Room Refresh', image: livingBeforeAfterImage },
]

const reviews = [
  {
    name: 'Sarah M.',
    initials: 'SM',
    location: 'Toronto',
    quote:
      'Wess and his team did an amazing job on our home. They were professional, reliable, and the attention to detail was outstanding.',
  },
  {
    name: 'David R.',
    initials: 'DR',
    location: 'North York',
    quote:
      'From start to finish, the experience was excellent. Clear communication, on-time work, and a top-notch result.',
  },
]

function Logo() {
  return (
    <a className="brand" href="#home" aria-label="Wess Painting & Renovation Team home">
      <img className="brand-logo" src={wessLogo} alt="Wess Painting & Renovation Team" />
    </a>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches,
  )
  const serviceRailRef = useRef(null)
  const projectRailRef = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = (event) => setIsDesktop(event.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = navItems.map((item) => item.href.slice(1))
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length) return

    const visibility = new Map()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => visibility.set(entry.target.id, entry.isIntersecting))
        const current = ids.find((id) => visibility.get(id))
        if (current) setActiveSection(current)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const revealTargets = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.14, rootMargin: '0px 0px -60px' },
    )

    revealTargets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)
  const scrollRail = (railRef, direction) => {
    const rail = railRef.current
    if (!rail) return
    const firstCard = rail.querySelector('.snap-card')
    const distance = firstCard
      ? firstCard.getBoundingClientRect().width + 18
      : rail.clientWidth * 0.85
    rail.scrollBy({ left: direction * distance, behavior: 'smooth' })
  }

  return (
    <>
      <header className={`site-header ${scrolled || menuOpen ? 'is-scrolled' : ''}`}>
        <div className="header-inner">
          <Logo />

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1)
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={isActive ? 'is-active' : ''}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                  {item.label === 'Services' && (
                    <ChevronDown size={14} aria-hidden="true" />
                  )}
                </a>
              )
            })}
          </nav>

          <div className="header-actions">
            <a className="phone-link" href="tel:+14165550198">
              <Phone size={20} aria-hidden="true" />
              <span>(416) 555-0198</span>
            </a>
            <a className="button button-primary header-cta" href="#estimate">
              Free Estimate
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <button
              className="menu-toggle"
              type="button"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={25} /> : <Menu size={25} />}
            </button>
          </div>
        </div>

        <nav className={`mobile-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Mobile navigation">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1)
            return (
              <a
                key={item.href}
                href={item.href}
                className={isActive ? 'is-active' : ''}
                aria-current={isActive ? 'page' : undefined}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            )
          })}
          <a className="button button-primary" href="#estimate" onClick={closeMenu}>
            Get a Free Estimate
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </nav>
      </header>

      <main>
        <section className="hero-section section-anchor" id="home">
          <video
            key={isDesktop ? 'desktop' : 'mobile'}
            className="hero-photo hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={isDesktop ? '/hero-desktop-poster.jpg' : '/hero-poster.jpg'}
            aria-hidden="true"
          >
            <source
              src={isDesktop ? '/hero-desktop.mp4' : '/hero-mobile.mp4'}
              type="video/mp4"
            />
          </video>
          <img
            className="hero-photo hero-fallback"
            src={isDesktop ? '/hero-desktop-poster.jpg' : '/hero-poster.jpg'}
            alt=""
          />
          <div className="hero-overlay" aria-hidden="true" />
          <div className="container hero-content" data-reveal>
            <p className="eyebrow">Painting & Renovation Team</p>
            <h1>
              Bringing New Life
              <span>
                To Your <em>Home</em>
              </span>
            </h1>
            <p className="hero-copy">
              Expert painting and renovation services that transform spaces,
              protect your investment, and exceed expectations.
            </p>
            <div className="hero-buttons">
              <a className="button button-primary" href="#estimate">
                Get a Free Estimate
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a className="button button-outline" href="#projects">
                View Our Projects
              </a>
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Why homeowners trust Wess Painting">
          <div className="container trust-grid">
            {trustItems.map(({ icon: Icon, title, text }) => (
              <div className="trust-item" key={`${title}-${text}`} data-reveal>
                <span className="trust-icon">
                  <Icon size={28} aria-hidden="true" />
                </span>
                <p>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="paint-zone">
        <section className="about-section section-anchor" id="about">
          <div className="container split-layout">
            <div className="section-copy" data-reveal>
              <p className="eyebrow">About Wess</p>
              <h2>Your Vision. Our Expertise. Beautiful Results.</h2>              <p>
                At Wess Painting & Renovation, we combine skilled craftsmanship,
                premium materials, and careful communication to deliver spaces
                you will love for years to come.
              </p>

              <div className="stats-grid" aria-label="Company highlights">
                {stats.map(({ icon: Icon, value, label }) => (
                  <div className="stat" key={label}>
                    <Icon size={28} aria-hidden="true" />
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              <a className="button button-primary" href="#contact">
                Learn More About Us
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>

            <figure className="brush-image" data-reveal>
              <img src={kitchenImage} alt="Finished kitchen renovation with a dark island and white cabinetry" />
            </figure>
          </div>
        </section>

        <section className="services-section section-anchor" id="services">
          <div className="container">
            <div className="section-heading" data-reveal>
              <p className="eyebrow">Our Services</p>
              <h2>Complete Solutions for Every Space</h2>
            </div>

            <div className="carousel-shell">
              <button
                className="carousel-button prev"
                type="button"
                aria-label="Scroll services left"
                onClick={() => scrollRail(serviceRailRef, -1)}
              >
                <ArrowLeft size={22} />
              </button>
              <div className="card-rail service-rail" ref={serviceRailRef} aria-label="Services carousel">
                {services.map(({ icon: Icon, title, image, text }) => (
                  <article className="service-card snap-card" key={title} data-reveal>
                    <div className="service-title">
                      <Icon size={34} aria-hidden="true" />
                      <h3>{title}</h3>
                    </div>
                    <img src={image} alt="" />
                    <p>{text}</p>
                    <a href="#estimate">
                      Learn More
                      <ArrowRight size={16} aria-hidden="true" />
                    </a>
                  </article>
                ))}
              </div>
              <button
                className="carousel-button next"
                type="button"
                aria-label="Scroll services right"
                onClick={() => scrollRail(serviceRailRef, 1)}
              >
                <ArrowRight size={22} />
              </button>
            </div>
          </div>
        </section>
        </div>

        <section className="projects-section section-anchor" id="projects">
          <div className="container">
            <div className="project-heading" data-reveal>
              <div>
                <p className="eyebrow">Featured Projects</p>
                <h2>Before & After Transformations</h2>
              </div>
              <div className="project-controls" aria-label="Project carousel controls">
                <button
                  className="icon-button"
                  type="button"
                  aria-label="Scroll projects left"
                  onClick={() => scrollRail(projectRailRef, -1)}
                >
                  <ArrowLeft size={22} />
                </button>
                <button
                  className="icon-button"
                  type="button"
                  aria-label="Scroll projects right"
                  onClick={() => scrollRail(projectRailRef, 1)}
                >
                  <ArrowRight size={22} />
                </button>
              </div>
            </div>

            <div className="card-rail project-rail" ref={projectRailRef} aria-label="Featured projects carousel">
              {projects.map((project) => (
                <article className="project-card snap-card" key={project.title} data-reveal>
                  <div className="project-media">
                    <img src={project.image} alt="" />
                    <span className="tag tag-before">Before</span>
                    <span className="tag tag-after">After</span>
                  </div>
                  <h3>{project.title}</h3>
                </article>
              ))}
            </div>

            <div className="center-action" data-reveal>
              <a className="button button-primary" href="#estimate">
                View All Projects
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="reviews-section section-anchor" id="reviews">
          <div className="container">
            <div className="section-heading left" data-reveal>
              <p className="eyebrow">What Our Clients Say</p>
              <h2>Trusted by Homeowners Across Toronto</h2>            </div>
            <div className="review-grid">
              {reviews.map((review) => (
                <article className="review-card" key={review.name} data-reveal>
                  <span className="review-avatar" aria-hidden="true">
                    {review.initials}
                  </span>
                  <div>
                    <div className="stars" aria-label="Five star review">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={19} fill="currentColor" aria-hidden="true" />
                      ))}
                    </div>
                    <blockquote>{review.quote}</blockquote>
                    <cite>
                      {review.name}, {review.location}
                    </cite>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-band section-anchor" id="estimate">
          <img src={toolsImage} alt="" />
          <div className="cta-content" data-reveal>
            <h2>Ready to Transform Your Home?</h2>
            <p>Let’s bring your vision to life. Get your free estimate today.</p>
            <a className="button button-primary" href="#contact">
              Get a Free Estimate
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer section-anchor" id="contact">
        <div className="container footer-grid">
          <div className="footer-brand" data-reveal>
            <h2>Wess Painting & Renovation Team</h2>
            <p>
              Proudly serving Toronto and surrounding areas with expert painting
              and renovation services.
            </p>
            <div className="social-links" aria-label="Social links">
              <a
                href="https://www.facebook.com/profile.php?id=61589994356667&sk=photos"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.9 3.78-3.9 1.09 0 2.23.2 2.23.2v2.46H15.2c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33V22c4.78-.79 8.43-4.94 8.43-9.94Z" />
                </svg>
              </a>
            </div>
          </div>

          <address className="contact-list" data-reveal>
            <h3>Contact Info</h3>
            <a href="tel:+14165550198">
              <Phone size={20} aria-hidden="true" />
              (416) 555-0198
            </a>
            <a href="mailto:info@wesspainting.com">
              <Mail size={20} aria-hidden="true" />
              info@wesspainting.com
            </a>
            <span>
              <MapPin size={20} aria-hidden="true" />
              Toronto, ON & Surrounding Areas
            </span>
            <span>
              <ShieldCheck size={20} aria-hidden="true" />
              Fully Licensed & Insured
            </span>
          </address>

          <form className="estimate-form" aria-label="Free estimate request form" data-reveal>
            <h3>Get a Free Estimate</h3>
            <p className="form-intro">
              Tell us about your project and we’ll get back to you with a free, no-obligation quote.
            </p>
            <div className="form-row">
              <label>
                <span>Full Name</span>
                <input type="text" name="name" placeholder="Full Name" autoComplete="name" />
              </label>
              <label>
                <span>Phone Number</span>
                <input type="tel" name="phone" placeholder="Phone Number" autoComplete="tel" />
              </label>
            </div>
            <label>
              <span>Email Address</span>
              <input type="email" name="email" placeholder="Email Address" autoComplete="email" />
            </label>
            <label>
              <span>Project Details</span>
              <textarea name="message" placeholder="Tell us about your project..." rows="3" />
            </label>
            <button className="button button-primary form-button" type="submit">
              Send Request
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </form>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Wess Painting & Renovation Team. All Rights Reserved.</p>
          <nav aria-label="Legal links">
            <a href="#home">Privacy Policy</a>
            <a href="#home">Terms & Conditions</a>
          </nav>
        </div>
      </footer>
    </>
  )
}

export default App
