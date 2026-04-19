import { useEffect, useRef, useState } from 'react'
import heroImage from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

const profileVideoFiles = import.meta.glob('../vid/meprofile.mp4', {
  eager: true,
  query: '?url',
  import: 'default',
})

const profileVideoUrl = Object.values(profileVideoFiles)[0] ?? null

const projectImageFiles = import.meta.glob('../pic/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const projectImageMap = Object.fromEntries(
  Object.entries(projectImageFiles).map(([path, url]) => {
    const name = path.split('/').pop()?.replace(/\.[^.]+$/, '').toLowerCase() ?? ''
    return [name, url]
  }),
)

const techStack = ['HTML', 'SQL', 'Node.js', 'Tailwind']

const projects = [
  {
    title: 'Website Laptop & Phone Repair',
    category: 'project',
    type: 'Services WebsiteS',
    description:
      'A web-based services Laptop & Phone Repair for students, featuring a clean interface, intuitive navigation, and responsive design.',
    preview: 'Student portal and dashboard UI system',
    visualTitle: 'Ebik.',
    image: projectImageMap.ebik,
    appUrl: 'https://alsanudinnnn-cmd.github.io/Ebik./',
  },
  {
    title: 'SmartWarm. IoT-based Warm-up Game System',
    category: 'design',
    type: 'IoT Game System',
    description:
      'A Final Year Project focused on Iot-based Warm up game system, a interactive LED displays, and a user-friendly interface for an engaging gaming experience.',
    preview: 'IoT based Interactive LED Challenge ',
    visualTitle: 'SmartWarm',
    image: projectImageMap.smartwarm,
    appUrl: 'https://smartwarm.site/',
  },
  {
    title: 'Portfolio System Concept',
    category: 'editing',
    type: 'Personal Project',
    description:
      'An interactive portfolio experience with intro states, motion design, and modular content blocks.',
    preview: 'Motion-led portfolio presentation concept',
    visualTitle: 'EDIT',
    appUrl: '#contact',
  },
]

const aboutStats = [
  {
    label: 'Total Projects',
    value: '13',
    description: 'Web, design, and editing work delivered',
  },
  {
    label: 'Certificates',
    value: '2',
    description: 'Professional skills validated',
  },
  {
    label: 'Years of Experience',
    value: '2',
    description: 'Continuous learning journey',
  },
]

const certificateFiles = import.meta.glob('../pdf/*.pdf', {
  eager: true,
  query: '?url',
  import: 'default',
})

const certificates = Object.entries(certificateFiles).map(([path, url]) => {
  const fileName = path.split('/').pop()?.replace(/\.pdf$/i, '') ?? 'Certificate'
  const label = fileName
    .replace(/[_-]+/g, ' ')
    .replace(/\s+\(\d+\)$/, '')
    .replace(/\s+/g, ' ')
    .trim()
  const year = fileName.match(/\b(20\d{2})\b/)?.[1] ?? '2026'
  const issuer = label.split(/\s+-\s+|\s+\|\s+/)[0] || 'Verified Certificate'

  return {
    title: label,
    href: url,
    type: 'Verified Credential',
    issuer,
    year,
    category: 'Certificate',
    description: 'Validated learning achievement available as a PDF.',
    preview: 'Certified learning and validated achievement',
    visualTitle: 'CERT',
  }
})

const techItems = [
  { name: 'HTML', kind: 'html' },
  { name: 'CSS', kind: 'css' },
  { name: 'JavaScript', kind: 'js' },
  { name: 'Tailwind CSS', kind: 'tailwind' },
  { name: 'ReactJS', kind: 'react', image: reactLogo },
  { name: 'Vite', kind: 'vite', image: viteLogo },
  { name: 'Node JS', kind: 'node' },
  { name: 'Bootstrap', kind: 'bootstrap' },
  { name: 'Firebase', kind: 'firebase' },
  { name: 'Material UI', kind: 'mui' },
  { name: 'Figma', kind: 'figma' },
  { name: 'Canva', kind: 'canva' },
]

function IconArrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 9.5 12 15.5 18 9.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function IconExternal() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M14 5h5v5M10 14 19 5M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 7.5 12 13l8-5.5M5.5 6h13A1.5 1.5 0 0 1 20 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 16.5v-9A1.5 1.5 0 0 1 5.5 6Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function IconCode() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M8 8 4 12l4 4M16 8l4 4-4 4M13 6l-2 12"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function IconBadge() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 14.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM7 20l2.2-3.2h5.6L17 20M12 3l1.5 2.1 2.6.4-1.7 1.9.4 2.6L12 8.9 9.2 10l.4-2.6-1.7-1.9 2.6-.4L12 3Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function IconGlobe() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 0c2.2 2.3 3.4 5.5 3.4 9S14.2 18.7 12 21c-2.2-2.3-3.4-5.5-3.4-9S9.8 5.3 12 3ZM4 12h16"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function IconDownload() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 4v10M8 10.5 12 14.5l4-4M5 19h14"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function IconArrowLine() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6 6 18"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function TechLogo({ item }) {
  if (item.image) {
    return <img src={item.image} alt="" />
  }

  return (
    <div className={`tech-logo-mark tech-logo-${item.kind}`}>
      {item.kind === 'html' ? '5' : null}
      {item.kind === 'css' ? '3' : null}
      {item.kind === 'js' ? 'JS' : null}
      {item.kind === 'tailwind' ? '~' : null}
      {item.kind === 'node' ? 'N' : null}
      {item.kind === 'bootstrap' ? 'B' : null}
      {item.kind === 'firebase' ? 'F' : null}
      {item.kind === 'mui' ? 'M' : null}
      {item.kind === 'figma' ? 'Fi' : null}
      {item.kind === 'canva' ? 'C' : null}
    </div>
  )
}

function CountUpNumber({ value }) {
  const [count, setCount] = useState(0)
  const numberValue = Number(value)
  const countRef = useRef(null)

  useEffect(() => {
    const element = countRef.current

    if (!element || Number.isNaN(numberValue)) {
      return undefined
    }

    let frameId = 0
    let startTime = 0

    const animateValue = (timestamp) => {
      if (!startTime) {
        startTime = timestamp
      }

      const progress = Math.min((timestamp - startTime) / 1100, 1)
      const easedProgress = 1 - (1 - progress) ** 3

      setCount(Math.round(numberValue * easedProgress))

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animateValue)
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          frameId = window.requestAnimationFrame(animateValue)
          observer.disconnect()
        }
      },
      { threshold: 0.55 },
    )

    observer.observe(element)

    return () => {
      window.cancelAnimationFrame(frameId)
      observer.disconnect()
    }
  }, [numberValue])

  return <strong ref={countRef}>{Number.isNaN(numberValue) ? value : count}</strong>
}

function LanyardBadge() {
  const [isDragging, setIsDragging] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  const [lanyardStyle, setLanyardStyle] = useState({
    x: 0,
    y: 0,
    rotation: 0,
    stretch: 0,
    tiltX: 0,
    tiltY: 0,
    cardRotateY: 0,
  })
  const dragStateRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    pointerId: null,
    moved: false,
  })
  const flippedRef = useRef(false)
  const currentRef = useRef({
    x: 0,
    y: 0,
    rotation: 0,
    stretch: 0,
    tiltX: 0,
    tiltY: 0,
    cardRotateY: 0,
  })
  const targetRef = useRef({
    x: 0,
    y: 0,
    rotation: 0,
    stretch: 0,
    tiltX: 0,
    tiltY: 0,
    cardRotateY: 0,
  })

  useEffect(() => {
    flippedRef.current = isFlipped
  }, [isFlipped])

  useEffect(() => {
    let frameId = 0

    const animate = () => {
      const current = currentRef.current
      const target = targetRef.current

      current.x += (target.x - current.x) * 0.12
      current.y += (target.y - current.y) * 0.14
      current.rotation += (target.rotation - current.rotation) * 0.09
      current.stretch += (target.stretch - current.stretch) * 0.14
      current.tiltX += (target.tiltX - current.tiltX) * 0.1
      current.tiltY += (target.tiltY - current.tiltY) * 0.12
      current.cardRotateY += (target.cardRotateY - current.cardRotateY) * 0.12

      setLanyardStyle({
        x: current.x,
        y: current.y,
        rotation: current.rotation,
        stretch: current.stretch,
        tiltX: current.tiltX,
        tiltY: current.tiltY,
        cardRotateY: current.cardRotateY,
      })

      frameId = window.requestAnimationFrame(animate)
    }

    frameId = window.requestAnimationFrame(animate)

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [])

  useEffect(() => {
    const handlePointerMove = (event) => {
      if (!dragStateRef.current.isDragging) {
        return
      }

      const deltaX = event.clientX - dragStateRef.current.startX
      const deltaY = event.clientY - dragStateRef.current.startY
      const clampedX = Math.max(-140, Math.min(140, deltaX))
      const clampedY = Math.max(-18, Math.min(220, deltaY))

      if (Math.abs(clampedX) > 8 || Math.abs(clampedY) > 8) {
        dragStateRef.current.moved = true
      }

      targetRef.current = {
        x: clampedX,
        y: clampedY,
        rotation: clampedX * 0.22,
        stretch: Math.max(0, clampedY * 0.52),
        tiltX: Math.max(-18, Math.min(18, clampedY * -0.08)),
        tiltY: flippedRef.current ? 180 + clampedX * 0.08 : clampedX * 0.08,
        cardRotateY: flippedRef.current
          ? 180 + clampedX * 0.12
          : clampedX * 0.12,
      }
    }

    const releaseDrag = () => {
      if (!dragStateRef.current.isDragging) {
        return
      }

      if (!dragStateRef.current.moved) {
        setIsFlipped((current) => {
          const next = !current
          targetRef.current = {
            x: 0,
            y: 0,
            rotation: 0,
            stretch: 0,
            tiltX: 0,
            tiltY: next ? 180 : 0,
            cardRotateY: next ? 180 : 0,
          }
          return next
        })
      } else {
        targetRef.current = {
          x: 0,
          y: 0,
          rotation: 0,
          stretch: 0,
          tiltX: 0,
          tiltY: flippedRef.current ? 180 : 0,
          cardRotateY: flippedRef.current ? 180 : 0,
        }
      }

      dragStateRef.current.isDragging = false
      dragStateRef.current.pointerId = null
      dragStateRef.current.moved = false
      setIsDragging(false)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', releaseDrag)
    window.addEventListener('pointercancel', releaseDrag)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', releaseDrag)
      window.removeEventListener('pointercancel', releaseDrag)
    }
  }, [])

  const handlePointerDown = (event) => {
    setIsDragging(true)
    dragStateRef.current = {
      isDragging: true,
      startX: event.clientX - currentRef.current.x,
      startY: event.clientY - currentRef.current.y,
      pointerId: event.pointerId,
      moved: false,
    }
  }

  return (
    <div
      className={`lanyard ${isDragging ? 'is-dragging' : ''}`}
      style={{
        '--lanyard-x': `${lanyardStyle.x}px`,
        '--lanyard-y': `${lanyardStyle.y}px`,
        '--lanyard-rotation': `${lanyardStyle.rotation}deg`,
        '--lanyard-stretch': `${lanyardStyle.stretch}px`,
        '--lanyard-tilt-x': `${lanyardStyle.tiltX}deg`,
        '--lanyard-tilt-y': `${lanyardStyle.tiltY}deg`,
        '--lanyard-card-rotate-y': `${lanyardStyle.cardRotateY}deg`,
      }}
    >
      <div className="lanyard-swing">
        <div className="lanyard-strap">
          <span />
          <span />
          <span />
        </div>
        <div className="lanyard-clip" />
        <div className="lanyard-hook" />
        <div
          className="lanyard-card"
          onPointerDown={handlePointerDown}
          role="presentation"
        >
          <div className="lanyard-card-face lanyard-card-front">
            <svg viewBox="0 0 120 120" aria-hidden="true">
              <path
                d="M60 58m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
              />
              <path
                d="M60 58c-18-23-38-30-44-20-6 10 7 28 28 40"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="5"
              />
              <path
                d="M60 58c28-8 49-5 51 7 2 12-19 21-48 21"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="5"
              />
              <path
                d="M60 58c-10 28-8 49 4 52 12 3 23-18 24-47"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="5"
              />
              <path
                d="M60 58c23-17 33-36 24-45-9-9-28 1-43 23"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="5"
              />
            </svg>
          </div>
          <div className="lanyard-card-face lanyard-card-back">
            <span className="lanyard-card-label">ALSA</span>
            <strong>Full Stack Developer</strong>
            <small>Tap badge to flip</small>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [isOverlayVisible, setIsOverlayVisible] = useState(true)
  const [isOverlayFading, setIsOverlayFading] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [portfolioSection, setPortfolioSection] = useState('projects')
  const [portfolioFilter, setPortfolioFilter] = useState('project')
  const [activeCertificate, setActiveCertificate] = useState(null)
  const [comments, setComments] = useState([])
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [commentForm, setCommentForm] = useState({
    name: '',
    message: '',
  })

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => {
      setIsOverlayFading(true)
    }, 3000)

    const hideTimer = window.setTimeout(() => {
      setIsOverlayVisible(false)
    }, 3800)

    return () => {
      window.clearTimeout(fadeTimer)
      window.clearTimeout(hideTimer)
    }
  }, [])

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll('[data-reveal]'))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px',
      },
    )

    revealItems.forEach((item) => observer.observe(item))

    return () => {
      observer.disconnect()
    }
  }, [portfolioSection, portfolioFilter, comments.length])

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('main section[id]'))

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0]

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id)
        }
      },
      {
        threshold: [0.28, 0.42, 0.6],
        rootMargin: '-18% 0px -52% 0px',
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!activeCertificate) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveCertificate(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeCertificate])

  const portfolioItems =
    portfolioFilter === 'project'
      ? projects
      : projects.filter((project) => project.category === portfolioFilter)

  const handleContactChange = (event) => {
    const { name, value } = event.target
    setContactForm((current) => ({ ...current, [name]: value }))
  }

  const handleCommentChange = (event) => {
    const { name, value } = event.target
    setCommentForm((current) => ({ ...current, [name]: value }))
  }

  const handleCommentSubmit = (event) => {
    event.preventDefault()

    if (!commentForm.name.trim() || !commentForm.message.trim()) {
      return
    }

    setComments((current) => [
      {
        id: window.crypto?.randomUUID?.() ?? `${Date.now()}`,
        name: commentForm.name.trim(),
        message: commentForm.message.trim(),
      },
      ...current,
    ])

    setCommentForm({
      name: '',
      message: '',
    })
  }

  const openCertificateModal = (event, certificate) => {
    event.preventDefault()
    setActiveCertificate(certificate)
  }

  return (
    <div className="page-shell">
      {isOverlayVisible ? (
        <div className={`intro-overlay ${isOverlayFading ? 'is-fading' : ''}`}>
          <div className="intro-card">
            <div className="chip-row">
              <span className="chip">System Ready</span>
              <span className="chip">Portfolio 2026</span>
              <span className="chip">UI Loading</span>
            </div>

            <div className="intro-layout">
              <div className="intro-copy">
                <p className="section-kicker">Live Status</p>
                <h1>Welcome to my Portfolio Website</h1>
                <p className="intro-text">
                  Building modern, reliable, and fast digital experiences with a
                  focus on clean UI and solid engineering.
                </p>

                <div className="intro-line" />

                <div className="chip-row chip-row-secondary">
                  <span className="chip chip-dark">Code</span>
                  <span className="chip chip-dark">Profile</span>
                  <span className="chip chip-dark">Source</span>
                </div>

                <a className="intro-link" href="#home">
                  www.alsa-cmd.it.com
                </a>
              </div>

              <div className="intro-panel">
                <div className="panel-head">
                  <span>Core UI</span>
                  <span>Online</span>
                </div>

                <div className="orbital-core">
                  <div className="orbit orbit-large" />
                  <div className="orbit orbit-small" />
                  <div className="core-button">Welcome</div>
                  <span className="orbit-point orbit-point-a" />
                  <span className="orbit-point orbit-point-b" />
                  <span className="orbit-point orbit-point-c" />
                </div>

                <div className="panel-stats">
                  <div>
                    <span>Modules</span>
                    <strong>06</strong>
                    <small>Loaded</small>
                  </div>
                  <div>
                    <span>Latency</span>
                    <strong>12ms</strong>
                    <small>Stable</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <main className={`portfolio-page ${isOverlayVisible ? 'is-hidden' : 'is-visible'}`}>
        <header className="topbar reveal reveal-down is-revealed" data-reveal>
          <a className="brand" href="#home">
            Alsa
          </a>

          <nav className="nav">
            <a className={activeSection === 'home' ? 'is-active' : ''} href="#home">Home</a>
            <a className={activeSection === 'about' ? 'is-active' : ''} href="#about">About</a>
            <a className={activeSection === 'portfolio' ? 'is-active' : ''} href="#portfolio">Portfolio</a>
            <a className={activeSection === 'contact' ? 'is-active' : ''} href="#contact">Contact</a>
          </nav>
        </header>

        <section className="hero-section section-frame reveal reveal-up" id="home" data-reveal>
          <div className="hero-copy reveal reveal-left" data-reveal>
            <p className="eyebrow">Transforming ideas into digital experiences</p>
            <h2>
              Full Stack
              <span> Developer</span>
            </h2>
            <p className="typing-line">Web Developer</p>
            <p className="hero-description">
              A creative and multidisciplinary digital professional with a passion
              for turning ideas into functional, engaging, and future-ready web
              experiences.
            </p>

            <div className="tag-list">
              {techStack.map((item) => (
                <span key={item} className="tag">
                  {item}
                </span>
              ))}
            </div>

            <div className="action-row">
              <a className="primary-button" href="#portfolio">
                Projects
                <IconExternal />
              </a>
              <a className="secondary-button" href="#contact">
                Contact
                <IconMail />
              </a>
            </div>

            <div className="social-row">
              <a href="https://github.com/" aria-label="GitHub">
                GH
              </a>
              <a href="https://www.linkedin.com/" aria-label="LinkedIn">
                IN
              </a>
              <a href="https://instagram.com/" aria-label="Instagram">
                IG
              </a>
            </div>
          </div>

          <div className="hero-visual reveal reveal-right" data-reveal>
            <LanyardBadge />
            <div className="hero-orb" />
          </div>
        </section>

        <section className="about-section section-frame reveal reveal-up" id="about" data-reveal>
          <div className="about-copy reveal reveal-left" data-reveal>
            <p className="eyebrow">About Me</p>
            <h2>
              Hello, I&apos;m
              <span> Alsa</span>
            </h2>
            <p>
              A highly motivated informatics student specializing in robust and
              user-centric digital experiences. My background in networking and
              communication engineering, combined with a strong passion for front-end
              development, drives me to build interfaces that feel modern, clear,
              and high-performing.
            </p>

            <blockquote>
              "Leveraging AI as a professional tool, not a replacement."
            </blockquote>

            <div className="about-actions">
              <a className="about-primary-button" href="/alsa-cv.pdf" download>
                <IconDownload />
                Download CV
              </a>
              <a className="about-secondary-button" href="#portfolio">
                <IconCode />
                View Projects
              </a>
            </div>
          </div>

          <div className="about-portrait reveal reveal-right" data-reveal>
            <div className="portrait-ring">
              {profileVideoUrl ? (
                <video
                  className="profile-video"
                  src={profileVideoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-label="Alsa profile video"
                />
              ) : (
                <img src={heroImage} alt="Alsa portrait" />
              )}
            </div>
          </div>
        </section>

        <section className="about-stats section-frame reveal reveal-up" data-reveal>
          <div className="about-stats-grid">
            {aboutStats.map((stat) => {
              const icon =
                stat.label === 'Total Projects' ? (
                  <IconCode />
                ) : stat.label === 'Certificates' ? (
                  <IconBadge />
                ) : (
                  <IconGlobe />
                )

              return (
                <article
                  key={stat.label}
                  className="about-stat-card reveal reveal-up"
                  data-reveal
                >
                  <div className="about-stat-icon">{icon}</div>
                  <div className="about-stat-copy">
                    <p>{stat.label}</p>
                    <CountUpNumber value={stat.value} />
                    <span>{stat.description}</span>
                  </div>
                  <small>live</small>
                </article>
              )
            })}
          </div>
        </section>

        <section className="portfolio-section section-frame reveal reveal-up" id="portfolio" data-reveal>
          <div className="portfolio-header reveal reveal-down" data-reveal>
            <p className="eyebrow">Selected Work</p>
            <h2>Portfolio Showcase</h2>
            <p className="portfolio-intro">
              Explore my journey through projects, certifications, and technical
              expertise. Each section represents a milestone in my continuous
              learning path.
            </p>
          </div>

          <div className="portfolio-main-tabs reveal reveal-up" data-reveal>
            {[
              ['projects', 'Projects', <IconCode key="projects-icon" />],
              ['certificates', 'Certificates', <IconBadge key="certificates-icon" />],
              ['tech', 'Tech Stack', <IconGlobe key="tech-icon" />],
            ].map(([value, label, icon]) => (
              <button
                key={value}
                type="button"
                className={portfolioSection === value ? 'is-active' : ''}
                onClick={() => setPortfolioSection(value)}
              >
                <span className="portfolio-tab-icon">{icon}</span>
                {label}
              </button>
            ))}
          </div>

          {portfolioSection === 'projects' ? (
            <>
              <div className="portfolio-sub-tabs reveal reveal-up" data-reveal>
                {[
                  ['project', 'Project'],
                  ['design', 'Design'],
                  ['editing', 'Editing'],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    className={portfolioFilter === value ? 'is-active' : ''}
                    onClick={() => setPortfolioFilter(value)}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="showcase-grid">
                {portfolioItems.map((project) => (
                  <article
                    key={project.title}
                    className="showcase-card reveal reveal-up"
                    data-reveal
                  >
                    <div className={`showcase-preview ${project.image ? 'has-image' : ''}`}>
                      {project.image ? <img src={project.image} alt={`${project.title} preview`} /> : null}
                      <div className="showcase-overlay">
                        <span className="showcase-domain">{project.type}</span>
                        <h3>{project.visualTitle}</h3>
                        <p>{project.preview}</p>
                      </div>
                    </div>

                    <div className="showcase-copy">
                      <h4>{project.title}</h4>
                      <p>{project.description}</p>
                      <div className="showcase-actions">
                        <a href={project.appUrl} target="_blank" rel="noreferrer">
                          View App
                          <IconExternal />
                        </a>
                        <a className="showcase-secondary-action" href="#contact">
                          Details
                          <IconArrowLine />
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : portfolioSection === 'certificates' ? (
            certificates.length > 0 ? (
              <div className="showcase-grid certificate-grid">
                {certificates.map((certificate) => (
                  <article
                    key={certificate.href}
                    className="showcase-card reveal reveal-up certificate-card"
                    data-reveal
                  >
                    <div className="showcase-preview certificate-preview">
                      <div className="showcase-overlay">
                        <span className="showcase-domain">{certificate.category}</span>
                        <h3>{certificate.visualTitle}</h3>
                        <p>{certificate.preview}</p>
                        <div className="certificate-meta">
                          <span>{certificate.issuer}</span>
                          <span>{certificate.year}</span>
                        </div>
                      </div>
                    </div>

                    <div className="showcase-copy">
                      <h4>{certificate.title}</h4>
                      <p>{certificate.description}</p>
                      <div className="certificate-detail-row">
                        <span>{certificate.type}</span>
                        <span>{certificate.year}</span>
                      </div>
                      <div className="showcase-actions">
                        <a href={certificate.href} onClick={(event) => openCertificateModal(event, certificate)}>
                          View PDF
                          <IconExternal />
                        </a>
                        <a
                          className="showcase-secondary-action"
                          href={certificate.href}
                          onClick={(event) => openCertificateModal(event, certificate)}
                        >
                          Details
                          <IconArrowLine />
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="portfolio-placeholder reveal reveal-up" data-reveal>
                <strong>No certificates found yet.</strong>
                <p>Add PDF files to the `pdf` folder and they will appear here.</p>
              </div>
            )
          ) : (
            <div className="tech-grid reveal reveal-up" data-reveal>
              {techItems.map((item) => (
                <article key={item.name} className="tech-card reveal reveal-up" data-reveal>
                  <div className="tech-logo">
                    <TechLogo item={item} />
                  </div>
                  <strong>{item.name}</strong>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="contact-section section-frame reveal reveal-up" id="contact" data-reveal>
          <div className="contact-shell">
            <div className="contact-panel contact-panel-left reveal reveal-left" data-reveal>
              <div className="contact-panel-header">
                <p className="eyebrow">Contact</p>
                <h2>Hubungi</h2>
                <p className="contact-intro">
                  Ada yang ingin didiskusikan? Kirim saya pesan dan mari kita
                  bicara.
                </p>
              </div>

              <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
                <label className="field">
                  <span>Name</span>
                  <input
                    name="name"
                    type="text"
                    placeholder="Nama Anda"
                    value={contactForm.name}
                    onChange={handleContactChange}
                  />
                </label>

                <label className="field">
                  <span>Email</span>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email Anda"
                    value={contactForm.email}
                    onChange={handleContactChange}
                  />
                </label>

                <label className="field">
                  <span>Message</span>
                  <textarea
                    name="message"
                    placeholder="Pesan Anda"
                    value={contactForm.message}
                    onChange={handleContactChange}
                    rows="6"
                  />
                </label>
              </form>

              <div className="contact-footer-note">Alsa - 2026</div>
            </div>

            <div className="contact-panel contact-panel-right reveal reveal-right" data-reveal>
              <div className="comment-header">
                <h3>Comments ({comments.length})</h3>
              </div>

              <form className="comment-form" onSubmit={handleCommentSubmit}>
                <label className="field">
                  <span>Name *</span>
                  <input
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={commentForm.name}
                    onChange={handleCommentChange}
                  />
                </label>

                <label className="field">
                  <span>Message *</span>
                  <textarea
                    name="message"
                    placeholder="Write your message here..."
                    value={commentForm.message}
                    onChange={handleCommentChange}
                    rows="5"
                  />
                </label>

                <button className="comment-submit" type="submit">
                  Post Comment
                </button>
              </form>

              <div className="comment-list">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <article
                      key={comment.id}
                      className="comment-card reveal reveal-up"
                      data-reveal
                    >
                      <strong>{comment.name}</strong>
                      <p>{comment.message}</p>
                    </article>
                  ))
                ) : (
                  <div className="comment-empty">
                    Be the first person to leave a comment here.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <a className="scroll-indicator" href="#about" aria-label="Scroll down">
          <IconArrow />
        </a>
      </main>

      {activeCertificate ? (
        <div
          className="pdf-modal"
          role="dialog"
          aria-modal="true"
          aria-label={activeCertificate.title}
          onClick={() => setActiveCertificate(null)}
        >
          <div className="pdf-modal-shell" onClick={(event) => event.stopPropagation()}>
            <div className="pdf-modal-header">
              <strong>{activeCertificate.title}</strong>
              <button
                type="button"
                className="pdf-modal-close"
                aria-label="Close certificate"
                onClick={() => setActiveCertificate(null)}
              >
                <IconClose />
              </button>
            </div>
            <iframe
              className="pdf-modal-frame"
              title={activeCertificate.title}
              src={activeCertificate.href}
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default App
