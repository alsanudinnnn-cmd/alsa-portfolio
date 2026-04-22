import { useEffect, useRef, useState } from 'react'
import heroImage from './assets/hero.png'
import reactLogo from './assets/react.svg'
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

const idBadgeLanyardImage = projectImageMap.idbadgeslanyard ?? null

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
    appUrl: 'https://ebik.vercel.app/',
  },
  {
    title: 'SmartWarm. IoT-based Warm-up Game System',
    category: 'project',
    type: 'IoT Game System',
    description:
      'A Final Year Project focused on Iot-based Warm up game system, a interactive LED displays, and a user-friendly interface for an engaging gaming experience.',
    preview: 'IoT based Interactive LED Challenge ',
    visualTitle: 'SmartWarm',
    image: projectImageMap.smartwarm,
    appUrl: 'https://smartwarm.site/',
  },
  {
    title: 'Piex Jury Management Platform',
    category: 'project',
    type: 'Jury Management Platform',
    description:
      'A jury management platform. Focused on participant flow, scoring workflows, and transparent result display for streamlined event management.',
    preview: 'Jury management dashboard and scoring.',
    visualTitle: 'Piex Jury',
    image: projectImageMap.piex,
    appUrl: 'https://spexpmj.infinityfreeapp.com/index.php',
  },
  {
    title: 'IDS + IPS Monitoring Project',
    category: 'project',
    type: 'Pending Project',
    description:
      'A network security monitoring solution in progress, focused on integrating IDS and IPS workflows for real-time threat visibility and response.',
    preview: 'Security dashboard and alert pipeline currently in development',
    visualTitle: 'IDS + IPS',
    appUrl: '#',
    pending: true,
  },
  {
    title: 'Donexa Streamer Donation Platform',
    category: 'project',
    type: 'Pending Project',
    description:
      'A streamer donation platform concept where supporters can send donations with videos or images to create more interactive livestream moments.',
    preview: 'Donation flow with supporter media attachments currently in development',
    visualTitle: 'Donexa',
    appUrl: '#',
    pending: true,
  },
]

const certificateFiles = import.meta.glob('../pdf/*.pdf', {
  eager: true,
  query: '?url',
  import: 'default',
})

const formatCertificateTitle = (rawName) =>
  rawName
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+\(\d+\)$/, '')
    .replace(/\s+/g, ' ')
    .trim()

const getCertificateBackground = (fileName) => {
  const lowerFileName = fileName.toLowerCase()

  if (lowerFileName.includes('comptia')) {
    return projectImageMap.bg_comptia ?? null
  }

  if (lowerFileName.includes('transcript') || lowerFileName.includes('transkrip')) {
    return projectImageMap.bg_transkripkk ?? null
  }

  if (lowerFileName.includes('resume') || lowerFileName.includes('cv')) {
    return projectImageMap.bg_resume ?? null
  }

  return null
}

const certificates = Object.entries(certificateFiles).map(([path, url]) => {
    const fileName = path.split('/').pop()?.replace(/\.pdf$/i, '') ?? 'Certificate'
    const label = formatCertificateTitle(fileName)
    const image = getCertificateBackground(fileName)
    const year = fileName.match(/\b(20\d{2})\b/)?.[1] ?? '2026'
    const lowerLabel = label.toLowerCase()
    const isTranscript = lowerLabel.includes('transcript') || lowerLabel.includes('transkrip')
    const isResume = lowerLabel.includes('resume') || lowerLabel.includes('cv')
    const issuer = lowerLabel.includes('comptia')
      ? 'CompTIA'
      : isTranscript
        ? 'Kolej Komuniti'
        : isResume
          ? 'Personal Profile'
        : 'Verified Certificate'

    return {
      title: label,
      href: url,
      type: isTranscript ? 'Academic Record' : isResume ? 'Professional Resume' : 'Verified Credential',
      issuer,
      year,
      category: isTranscript ? 'Transcript' : isResume ? 'Resume' : 'Certificate',
      description: isTranscript
        ? 'Academic transcript available as a PDF.'
        : isResume
          ? 'Updated resume document available as a PDF.'
        : 'Validated learning achievement available as a PDF.',
      preview: isTranscript
        ? 'Official academic record and course results'
        : isResume
          ? 'Professional profile, skills, and experience overview'
        : 'Certified learning and validated achievement',
      visualTitle: isTranscript ? 'RECORD' : isResume ? 'CV' : 'CERT',
      image,
    }
  })

const aboutStats = [
  {
    label: 'Total Projects',
    value: String(projects.length),
    description: 'Web, design, and editing work delivered',
  },
  {
    label: 'Certificates',
    value: String(certificates.length),
    description: 'Professional skills validated',
  },
  {
    label: 'Years of Experience',
    value: '2',
    description: 'Continuous learning journey',
  },
]

const techItems = [
  { name: 'HTML', kind: 'html' },
  { name: 'CSS', kind: 'css' },
  { name: 'JavaScript', kind: 'js' },
  { name: 'ReactJS', kind: 'react', image: reactLogo },
  { name: 'Bootstrap', kind: 'bootstrap' },
  { name: 'Firebase', kind: 'firebase' },
  { name: 'Material UI', kind: 'mui' },
  { name: 'Canva', kind: 'canva' },
]

const experienceItems = [
  {
    role: 'IT Technician',
    company: 'AJ Technology',
    period: '01/2024 - 01/2026',
    location: 'Johor Bahru',
    category: 'IT Support',
    highlights: [
      'Provided technical support by troubleshooting hardware, software, and network issues to ensure minimal system downtime.',
      'Installed, configured, and maintained computer systems, printers, and related IT equipment.',
      'Performed routine system updates, diagnostics, and preventive maintenance to maintain optimal performance.',
    ],
  },
  {
    role: 'Software Engineer Junior',
    company: 'Kyocera',
    period: '04/2022 - 03/2023',
    location: 'Johor Bahru',
    category: 'Engineering',
    highlights: [
      'Supported engineering operations by troubleshooting technical systems and resolving production-related issues.',
      'Assisted in process optimization initiatives to improve workflow efficiency and system reliability.',
      'Collaborated with cross-functional teams to ensure compliance with technical standards and operational requirements.',
    ],
  },
  {
    role: 'Store Management Trainee',
    company: 'Original Classic.',
    period: '05/2021 - 04/2022',
    location: 'Johor Bahru',
    category: 'Retail',
    highlights: [
      'Delivered customer service by assisting with product selection and responding to inquiries.',
      'Managed inventory restocking and ensured accurate stock organization.',
      'Processed sales transactions and maintained accurate daily sales records.',
    ],
  },
  {
    role: 'Store Management Trainee',
    company: 'Gatti (M) Sdn. Bhd.',
    period: '06/2020 - 05/2021',
    location: 'Johor Bahru',
    category: 'Retail',
    highlights: [
      'Delivered customer service by assisting with product selection and responding to inquiries.',
      'Managed inventory restocking and ensured accurate stock organization.',
      'Processed sales transactions and maintained accurate daily sales records.',
    ],
  },
]

const keyAchievements = [
  {
    title: 'Spex 2026',
    detail:
      'Gold Best Project in Faculty Information Technology; Best Overall Project in Politeknik Mersing, Johor.',
    tag: 'Project Award',
  },
  {
    title: 'Piex 2026',
    detail:
      'Best Project Software and Development; Best Overall Project in Faculty Information Technology.',
    tag: 'Project Award',
  },
  {
    title: 'Top 9 Finalist at CPROM 2025',
    detail: 'Top 9 Finalist, CPROM 2025 International Level Competition.',
    tag: 'International',
  },
  {
    title: 'Silver Award Recipient at Data Hackathon 2025',
    detail: 'Silver Award Recipient, Data Hackathon 2025 - National Level.',
    tag: 'National',
  },
  {
    title: 'Gold Award Recipient at Innotech 2022',
    detail: 'Gold Award Recipient, Innotech 2022 - National Level.',
    tag: 'National',
  },
  {
    title: 'Chairperson of PPJTMK',
    detail:
      'Chairperson (Pengerusi), Persatuan Pelajar Jabatan Teknologi Maklumat & Komunikasi (PPJTMK), Politeknik.',
    tag: 'Leadership',
  },
  {
    title: 'Secretary of JPP',
    detail:
      'Secretary (Setiausaha), Jawatankuasa Perwakilan Pelajar (JPP), Kolej Komuniti.',
    tag: 'Leadership',
  },
]

const achievementGallery = [
  {
    title: 'Data Hackathon 2025',
    caption: 'National-level silver award recognition.',
    image: projectImageMap.datahackthon ?? heroImage,
  },
  {
    title: 'Innotech 2022',
    caption: 'National-level gold award achievement.',
    image: projectImageMap.innotech ?? heroImage,
  },
  {
    title: 'Spex 2026',
    caption: 'Best overall project recognition milestone.',
    image: projectImageMap.spex2026 ?? heroImage,
  },
]

const CONTACT_EMAIL = 'alsanudinnnn@gmail.com'

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

function IconHome() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 10.5 12 4l8 6.5M6.5 9.5V20h11V9.5M10 20v-5h4v5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function IconUser() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM5 20a7 7 0 0 1 14 0"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function IconTrophy() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M8 4h8v3a4 4 0 1 1-8 0V4ZM7 5H4v2a4 4 0 0 0 4 4M17 5h3v2a4 4 0 0 1-4 4M12 11v4M9 20h6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function IconBriefcase() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 8h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8ZM9 8V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M4 13h16"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function IconGitHub() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2.6a9.4 9.4 0 0 0-3 18.3c.5.1.7-.2.7-.5v-1.8c-2.9.6-3.5-1.2-3.5-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 0 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.4-2.3-.3-4.8-1.2-4.8-5.2 0-1.1.4-2.1 1.1-2.8-.1-.3-.5-1.4.1-2.8 0 0 .9-.3 3 1.1A10.2 10.2 0 0 1 12 4.6c.9 0 1.8.1 2.6.4 2.1-1.4 3-1.1 3-1.1.6 1.4.2 2.5.1 2.8.7.7 1.1 1.7 1.1 2.8 0 4-2.4 4.9-4.8 5.2.4.3.7 1 .7 2v3.1c0 .3.2.6.7.5A9.4 9.4 0 0 0 12 2.6Z"
        fill="currentColor"
      />
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M8 3.5h8A4.5 4.5 0 0 1 20.5 8v8a4.5 4.5 0 0 1-4.5 4.5H8A4.5 4.5 0 0 1 3.5 16V8A4.5 4.5 0 0 1 8 3.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 8.2a3.8 3.8 0 1 1 0 7.6 3.8 3.8 0 0 1 0-7.6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M17 7.1h.01" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.6" />
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
            {idBadgeLanyardImage ? (
              <img
                className="lanyard-card-image"
                src={idBadgeLanyardImage}
                alt="Alsa ID badge lanyard"
                draggable="false"
              />
            ) : (
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
            )}
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
  const [activeCertificate, setActiveCertificate] = useState(null)
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [contactFormNotice, setContactFormNotice] = useState('')

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
  }, [portfolioSection])

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('main section[id]'))
    if (sections.length === 0) {
      return undefined
    }

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 120
      let currentSectionId = sections[0].id

      sections.forEach((section) => {
        if (scrollPosition >= section.offsetTop) {
          currentSectionId = section.id
        }
      })

      setActiveSection(currentSectionId)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
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

  const portfolioItems = projects

  const handleContactChange = (event) => {
    const { name, value } = event.target
    setContactForm((current) => ({ ...current, [name]: value }))
    if (contactFormNotice) {
      setContactFormNotice('')
    }
  }

  const handleContactSubmit = (event) => {
    event.preventDefault()

    const name = contactForm.name.trim()
    const email = contactForm.email.trim()
    const message = contactForm.message.trim()

    if (!name || !email || !message) {
      setContactFormNotice('Please fill in your name, email, and message first.')
      return
    }

    const subject = encodeURIComponent(`Portfolio Contact from ${name}`)
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        '',
        'Message:',
        message,
      ].join('\n'),
    )

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    setContactFormNotice('Opening your email app to send the message.')
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

      <nav
        className={`bottom-nav ${isOverlayVisible ? 'is-hidden' : 'is-visible'}`}
        aria-label="Section navigation"
      >
        <a className={`nav-icon-link ${activeSection === 'home' ? 'is-active' : ''}`} href="#home" aria-label="Home" title="Home">
          <IconHome />
          <span className="nav-label">Home</span>
        </a>
        <a className={`nav-icon-link ${activeSection === 'about' ? 'is-active' : ''}`} href="#about" aria-label="About" title="About">
          <IconUser />
          <span className="nav-label">About</span>
        </a>
        <a className={`nav-icon-link ${activeSection === 'portfolio' ? 'is-active' : ''}`} href="#portfolio" aria-label="Portfolio" title="Portfolio">
          <IconCode />
          <span className="nav-label">Work</span>
        </a>
        <a className={`nav-icon-link ${activeSection === 'achievements' ? 'is-active' : ''}`} href="#achievements" aria-label="Achievements" title="Achievements">
          <IconTrophy />
          <span className="nav-label">Awards</span>
        </a>
        <a className={`nav-icon-link ${activeSection === 'experience' ? 'is-active' : ''}`} href="#experience" aria-label="Experience" title="Experience">
          <IconBriefcase />
          <span className="nav-label">Journey</span>
        </a>
        <a className={`nav-icon-link ${activeSection === 'contact' ? 'is-active' : ''}`} href="#contact" aria-label="Contact" title="Contact">
          <IconMail />
          <span className="nav-label">Contact</span>
        </a>
      </nav>

      <main className={`portfolio-page ${isOverlayVisible ? 'is-hidden' : 'is-visible'}`}>

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
              <a href="https://github.com/alsanudinnnn-cmd/" aria-label="GitHub">
                <IconGitHub />
              </a>
              <a href="https://www.instagram.com/ih8alsasm?igsh=MXc1eDF4NXdlYWh2bw==/" aria-label="Instagram">
                <IconInstagram />
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
              I am a detail-oriented IT professional with 2.5 years of experience in
              software development and technical projects. Proficient in languages
              like C++, Java, and Python, I possess extensive experience in PHPbased development and database management. My leadership roles in
              multiple clubs demonstrate my strong teamwork and organizational
              skills, which complement my technical abilities

            </p>

            <blockquote>
              "Leveraging AI as a professional tool, not a replacement."
            </blockquote>

            <div className="about-actions">
              <a className="about-primary-button" href="pdf/resumealsa.pdf" download>
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

        <section className="about-stats-outer section-frame reveal reveal-up" data-reveal>
          <div className="about-stats">
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
                        <a
                          href={project.appUrl}
                          target={project.pending ? undefined : '_blank'}
                          rel={project.pending ? undefined : 'noreferrer'}
                          onClick={project.pending ? (event) => event.preventDefault() : undefined}
                          className={project.pending ? 'is-disabled' : undefined}
                          aria-disabled={project.pending ? 'true' : undefined}
                        >
                          {project.pending ? 'Pending' : 'View App'}
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
                    <div
                      className={`showcase-preview certificate-preview ${certificate.image ? 'has-image' : ''}`}
                    >
                      {certificate.image ? (
                        <img src={certificate.image} alt={`${certificate.title} background`} />
                      ) : null}
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

        <section
          className="portfolio-section achievements-section section-frame reveal reveal-up"
          id="achievements"
          data-reveal
        >
          <div className="achievements-header reveal reveal-down" data-reveal>
            <p className="eyebrow">Recognition</p>
            <h2>KEY ACHIEVEMENTS</h2>
            <p className="portfolio-intro">
              Milestones from competitions, awards, and leadership roles that
              shaped my personal and professional growth.
            </p>
          </div>

          <div className="achievement-gallery reveal reveal-up" data-reveal>
            {achievementGallery.map((item) => (
              <article key={item.title} className="achievement-gallery-card">
                <div className="achievement-gallery-media">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="achievement-gallery-copy">
                  <strong>{item.title}</strong>
                  <p>{item.caption}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="achievement-list reveal reveal-up" data-reveal>
            {keyAchievements.map((item) => (
              <article key={item.title} className="achievement-item">
                <div className="achievement-item-top">
                  <span>{item.tag}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="portfolio-section experience-section section-frame reveal reveal-up" id="experience" data-reveal>
          <div className="experience-header reveal reveal-down" data-reveal>
            <p className="eyebrow">Experience</p>
            <h2>Industry Journey</h2>
            <p className="portfolio-intro">
              A timeline of roles that shaped my technical foundation, teamwork,
              and real-world problem-solving approach.
            </p>
          </div>

          <div className="roadmap-grid">
            {experienceItems.map((item, index) => {
              const sideClass = index % 2 === 0 ? 'is-left' : 'is-right'

              return (
                <article
                  key={`${item.company}-${item.period}`}
                  className={`roadmap-item ${sideClass} reveal reveal-up`}
                  data-reveal
                >
                  <div className="roadmap-point" aria-hidden="true">
                    <span>{index + 1}</span>
                  </div>
                  <span className="roadmap-connector" aria-hidden="true" />

                  <div className="roadmap-card">
                    <div className="roadmap-card-top">
                      <span className="roadmap-step">Step {index + 1}</span>
                      <span className="experience-role-tag">{item.category}</span>
                    </div>

                    <h3>{item.role}</h3>
                    <p className="experience-company">{item.company}</p>
                    <p className="experience-period">{item.period}</p>
                    <p className="experience-location">{item.location}</p>

                    <ul className="experience-points">
                      {item.highlights.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="contact-section section-frame reveal reveal-up" id="contact" data-reveal>
          <div className="contact-shell">
            <div className="contact-panel contact-panel-left reveal reveal-left" data-reveal>
              <div className="contact-panel-header">
                <p className="eyebrow">Contact</p>
                <h2>Contact Me!</h2>
                <p className="contact-intro">
                  Anything you'd like to discuss? Send me a message and let's talk.
                </p>
              </div>

              <form className="contact-form" onSubmit={handleContactSubmit}>
                <label className="field">
                  <span>Name</span>
                  <input
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    value={contactForm.name}
                    onChange={handleContactChange}
                    required
                  />
                </label>

                <label className="field">
                  <span>Email</span>
                  <input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    required
                  />
                </label>

                <label className="field">
                  <span>Message</span>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={contactForm.message}
                    onChange={handleContactChange}
                    rows="6"
                    required
                  />
                </label>

                <button className="contact-submit" type="submit">
                  <IconMail />
                  Send Message
                </button>

                {contactFormNotice ? (
                  <p className="contact-form-note" aria-live="polite">
                    {contactFormNotice}
                  </p>
                ) : null}
              </form>

              <div className="contact-footer-note">Alsa - 2026</div>
            </div>
          </div>
        </section>

        <footer className="site-footer reveal reveal-up" data-reveal>
          <p>Copyright © 2026 Alsa. All rights reserved.</p>
        </footer>

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
