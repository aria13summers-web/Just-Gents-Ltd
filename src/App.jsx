import { useEffect, useState } from 'react'
import './App.css'
import gents1 from './assets/images/gents-1.jpg'
import gents2 from './assets/images/gents-2.jpg'
import gents3 from './assets/images/gents-3.jpg'
import gents4 from './assets/images/gents-4.jpg'
import gents5 from './assets/images/gents-5.jpg'
import shopInterior from './assets/images/Just-gents-2.webp'
import barberTools from './assets/images/just-gents-3.webp'
import beardCareImage from './assets/services/beard-care.jpg'
import classicHaircutsImage from './assets/services/haircut.jpg'
import mensHaircutsImage from './assets/services/mens-cut.jpg'
import skinFadeImage from './assets/services/skin-fade.jpg'
import justGentsLogo from './assets/images/logo/just-gents-logo1.png'

const navItems = [
  ['Our Story', 'story'],
  ['Gallery', 'gallery'],
  ['Services', 'services'],
  ['Reviews', 'reviews'],
  ['Contact', 'contact'],
]

const galleryImages = [
  {
    src: gents1,
    alt: 'Barber working with a customer inside Just Gents',
  },
  {
    src: shopInterior,
    alt: 'The interior of Just Gents barbershop',
  },
  {
    src: gents2,
    alt: 'Classic haircut styles at Just Gents',
  },
  {
    src: gents3,
    alt: 'Short cuts and beard styles',
  },
  {
    src: gents4,
    alt: 'Long and layered haircut styles',
  },
  {
    src: gents5,
    alt: 'Curly haircut styles at Just Gents',
  },
  {
    src: barberTools,
    alt: 'Barber scissors, combs and grooming tools',
  },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const sections = navItems.map(([, id]) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length) setActiveSection(visible[0].target.id)
      },
      { rootMargin: '-35% 0px -55%', threshold: 0 },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <button className="brand" type="button" onClick={() => scrollTo('home')} aria-label="Back to homepage">
          <img className="brand-logo" src={justGentsLogo} alt="Just Gents Ltd" />
        </button>
        <button
          className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
          type="button"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          {navItems.map(([label, id]) => (
            <button
              key={id}
              type="button"
              className={activeSection === id ? 'active' : ''}
              onClick={() => scrollTo(id)}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  return (
    <section className="hero" id="home" aria-label="Just Gents Ltd">
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="eyebrow">Established in 1983</p>
        <h1>JUST GENTS LTD</h1>
        <p className="hero-subtitle">Milton Keynes' Traditional Barber Shop</p>
        <p className="hero-tagline">Quality, Professional Service Since 1983.</p>
        <div className="hero-actions">
          <button type="button" className="button button-gold" onClick={() => scrollTo('services')}>View Our Services</button>
          <button type="button" className="button button-outline" onClick={() => scrollTo('contact')}>Get In Touch</button>
        </div>
      </div>
      <a className="scroll-cue" href="#story" aria-label="Scroll to our story"><span /></a>
    </section>
  )
}

function Reveal({ children, className = '' }) {
  const [node, setNode] = useState(null)

  useEffect(() => {
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.classList.add('revealed')
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('revealed')
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [node])

  return <div ref={setNode} className={`reveal ${className}`}>{children}</div>
}

function About() {
  return (
    <section className="section story-section" id="story">
      <div className="container story-grid">
        <Reveal>
          <p className="section-kicker">Our Story</p>
          <h2>A Tradition of Quality Since 1983</h2>
          <div className="gold-rule" />
          <p>Established in 1983, Just Gents was the first barber shop in Milton Keynes. For over four decades, we have been proud to offer quality, professional barbering services to our customers.</p>
          <p>Our focus is simple: traditional barbering, attention to detail and a professional service. Whether you're looking for a classic haircut, a fresh skin fade or expert beard care, we are here to help you look your best.</p>
        </Reveal>
        <Reveal className="story-image-wrap">
          <img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=88" alt="Traditional barber at work" />
          <div className="experience-badge"><strong>40+</strong><span>Years of experience</span></div>
        </Reveal>
      </div>
    </section>
  )
}

const services = [
  {
    name: 'Beard Care',
    description: 'Professional beard grooming and maintenance.',
    image: beardCareImage,
  },
  {
    name: "Classic Men's Haircuts",
    description: 'Timeless cuts with professional attention to detail.',
    image: classicHaircutsImage,
  },
  {
    name: "Men's Haircuts",
    description: 'Quality haircuts tailored to your style.',
    image: mensHaircutsImage,
  },
  {
    name: 'Skin Fade',
    description: 'Clean, precise fades with a sharp professional finish.',
    image: skinFadeImage,
  },
]

function Services() {
  return (
    <section className="section services-section" id="services">
      <div className="container">
        <Reveal className="section-heading light">
          <p className="section-kicker">What We Do</p>
          <h2>Our Services</h2>
          <p>Professional barbering, tailored to you.</p>
        </Reveal>
        <div className="service-grid">
          {services.map((service, index) => (
            <Reveal key={service.name} className="service-card-wrap">
              <article className="service-card">
                <div className="service-image">
                  <img src={service.image} alt="" />
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="service-copy">
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null)

  useEffect(() => {
    if (activeIndex === null) return
    const handleKey = (event) => {
      if (event.key === 'Escape') setActiveIndex(null)
      if (event.key === 'ArrowLeft') setActiveIndex((activeIndex - 1 + galleryImages.length) % galleryImages.length)
      if (event.key === 'ArrowRight') setActiveIndex((activeIndex + 1) % galleryImages.length)
    }
    document.addEventListener('keydown', handleKey)
    document.body.classList.add('lightbox-open')
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.classList.remove('lightbox-open')
    }
  }, [activeIndex])

  const move = (direction) => setActiveIndex((activeIndex + direction + galleryImages.length) % galleryImages.length)

  return (
    <section className="section gallery-section" id="gallery">
      <div className="container">
        <Reveal className="section-heading">
          <p className="section-kicker">Inside Just Gents</p>
          <h2>The Just Gents Experience</h2>
        </Reveal>
        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <Reveal key={image.src} className={`gallery-item item-${index + 1}`}>
              <button type="button" onClick={() => setActiveIndex(index)} aria-label={`Open image: ${image.alt}`}>
                <img src={image.src} alt={image.alt} />
                <span>View</span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
      {activeIndex !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Image gallery">
          <button className="lightbox-close" type="button" onClick={() => setActiveIndex(null)} aria-label="Close gallery">×</button>
          <button className="lightbox-arrow lightbox-prev" type="button" onClick={() => move(-1)} aria-label="Previous image">‹</button>
          <img src={galleryImages[activeIndex].src} alt={galleryImages[activeIndex].alt} />
          <button className="lightbox-arrow lightbox-next" type="button" onClick={() => move(1)} aria-label="Next image">›</button>
          <p>{activeIndex + 1} / {galleryImages.length}</p>
        </div>
      )}
    </section>
  )
}

function Reviews() {
  const reviews = [
    {
      quote: 'Example customer feedback will appear here. Add an authentic review once received.',
      name: 'Customer Name',
      label: 'Example review',
    },
    {
      quote: 'Example customer feedback will appear here. This clearly marked placeholder is not a genuine review.',
      name: 'Customer Name',
      label: 'Example review',
    },
    {
      quote: 'Example customer feedback will appear here. Replace this with verified feedback for your website.',
      name: 'Customer Name',
      label: 'Example review',
    },
  ]

  return (
    <section className="section reviews-section" id="reviews">
      <div className="container">
        <Reveal className="section-heading">
          <p className="section-kicker">Google Reviews</p>
          <h2>What Our Customers Say</h2>
        </Reveal>
        <div className="review-grid">
          {reviews.map((review, index) => (
            <Reveal key={index} className="review-card">
              <div className="stars" aria-label="5 out of 5 stars">★★★★★</div>
              <blockquote>“{review.quote}”</blockquote>
              <div className="review-person">
                <span>{review.name.charAt(0)}</span>
                <div><strong>{review.name}</strong><small>{review.label}</small></div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="reviews-action">
          <a
            className="button button-evergreen"
            href="https://www.google.com/search?q=Just+Gents+Milton+Keynes+reviews"
            target="_blank"
            rel="noreferrer"
          >
            View Our Google Reviews
          </a>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const mapQuery = 'https://www.google.com/maps/search/?api=1&query=Just+Gents+702+Deer+Walk+Milton+Keynes+MK9+3AU'
  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <Reveal className="section-heading light">
          <p className="section-kicker">Find Us</p>
          <h2>Visit Just Gents</h2>
        </Reveal>
        <div className="contact-grid">
          <Reveal className="contact-details">
            <div className="contact-address">
              <p className="contact-label">Our Address</p>
              <address>
                <strong>Just Gents Ltd</strong>
                <span>702, Deer Walk</span>
                <span>Milton Keynes</span>
                <span>MK9 3AU</span>
                <span>United Kingdom</span>
              </address>
              <a href={mapQuery} target="_blank" rel="noreferrer">Open in Google Maps ↗</a>
            </div>
            <div className="contact-methods">
              <a className="contact-button" href="tel:+441908034177">
                <span>01</span><div><small>Call Us</small><strong>+44 1908 034177</strong></div>
              </a>
              <a className="contact-button" href="mailto:tony@justgents.ltd">
                <span>02</span><div><small>Email Us</small><strong>tony@justgents.ltd</strong></div>
              </a>
              <a className="contact-button" href="https://wa.me/441908034177" target="_blank" rel="noreferrer">
                <span>03</span><div><small>WhatsApp</small><strong>Message Us</strong></div>
              </a>
            </div>
          </Reveal>
          <Reveal className="map-wrap">
            <iframe
              title="Just Gents location map"
              src="https://www.google.com/maps?q=702%20Deer%20Walk%2C%20Milton%20Keynes%20MK9%203AU&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function CustomCursor() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const cursor = document.querySelector('.custom-cursor')
    if (!cursor) return
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let targetX = x
    let targetY = y

    const move = (event) => {
      targetX = event.clientX
      targetY = event.clientY
    }
    const animate = () => {
      x += (targetX - x) * 0.18
      y += (targetY - y) * 0.18
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`
      requestAnimationFrame(animate)
    }
    const enter = () => cursor.classList.add('cursor-hover')
    const leave = () => cursor.classList.remove('cursor-hover')
    const interactives = document.querySelectorAll('a, button, [role="button"]')
    interactives.forEach((element) => {
      element.addEventListener('mouseenter', enter)
      element.addEventListener('mouseleave', leave)
    })
    document.addEventListener('mousemove', move)
    const frame = requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('mousemove', move)
      interactives.forEach((element) => {
        element.removeEventListener('mouseenter', enter)
        element.removeEventListener('mouseleave', leave)
      })
    }
  }, [])

  return (
    <div className="custom-cursor" aria-hidden="true">
      <svg viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="15" fill="none" />
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="23" r="3" />
          <circle cx="24" cy="23" r="3" />
          <path d="M10.2 20.8 16 16l5.8 4.8M16 16l-2.5-7M16 16l2.5-7" />
        </g>
      </svg>
    </div>
  )
}

function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <div className="footer-logo">JUST GENTS LTD</div>
          <p>Quality, Professional Service Since 1983.</p>
        </div>
        <nav aria-label="Footer navigation">
          {navItems.map(([label, id]) => (
            <button key={id} type="button" onClick={() => scrollTo(id)}>{label}</button>
          ))}
        </nav>
        <div className="footer-contact">
          <a href="tel:+441908034177">+44 1908 034177</a>
          <a href="mailto:tony@justgents.ltd">tony@justgents.ltd</a>
          <address>702, Deer Walk, Milton Keynes, MK9 3AU</address>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} Just Gents Ltd. All rights reserved.</p>
        <button type="button" onClick={() => scrollTo('home')} aria-label="Back to top">Back to top <span>↑</span></button>
      </div>
    </footer>
  )
}

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Gallery />
        <Services />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <CustomCursor />
    </>
  )
}

export default App
