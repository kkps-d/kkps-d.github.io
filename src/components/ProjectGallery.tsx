import { useEffect, useRef, useState } from 'react'
import type { Resume } from '../types/resume'
import { Chevron } from './Chevron'

function getSlidePositions(track: HTMLDivElement) {
  const inset = parseFloat(getComputedStyle(track).paddingLeft)
  const origin = track.getBoundingClientRect().left + inset
  return Array.from(track.children, (slide) =>
    Math.max(0, slide.getBoundingClientRect().left - origin + track.scrollLeft),
  )
}

export function ProjectGallery({
  project,
}: {
  project: Resume['projects'][number]
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const targetPositionRef = useRef<number | null>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    function updateControls() {
      if (!track) return
      const lastPosition = getSlidePositions(track).at(-1) ?? 0
      const target = targetPositionRef.current
      if (target !== null && Math.abs(track.scrollLeft - target) <= 1) {
        targetPositionRef.current = null
      }
      const position = targetPositionRef.current ?? track.scrollLeft
      setAtStart(position <= 1)
      setAtEnd(position >= lastPosition - 1)
    }
    function clearTarget() {
      targetPositionRef.current = null
      updateControls()
    }
    const observer = new ResizeObserver(clearTarget)
    observer.observe(track)
    track.addEventListener('scroll', updateControls, { passive: true })
    track.addEventListener('pointerdown', clearTarget)
    track.addEventListener('wheel', clearTarget, { passive: true })
    track.addEventListener('keydown', clearTarget)
    updateControls()
    return () => {
      observer.disconnect()
      track.removeEventListener('scroll', updateControls)
      track.removeEventListener('pointerdown', clearTarget)
      track.removeEventListener('wheel', clearTarget)
      track.removeEventListener('keydown', clearTarget)
    }
  }, [])

  function scroll(direction: number) {
    const track = trackRef.current
    if (!track) return
    const positions = getSlidePositions(track)
    // Advance from the requested destination while smooth scrolling is in flight.
    const position = targetPositionRef.current ?? track.scrollLeft
    const target =
      direction > 0
        ? positions.find((offset) => offset > position + 1)
        : [...positions].reverse().find((offset) => offset < position - 1)
    if (target === undefined) return
    targetPositionRef.current = target
    setAtStart(target <= 1)
    setAtEnd(target >= (positions.at(-1) ?? 0) - 1)
    track.scrollTo({
      left: target,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    })
  }

  return (
    <div className="project-gallery">
      <div className="gallery-toolbar">
        <div className="project-links">
          {project.githubUrl && (
            <a
              className="link-chip"
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              GitHub <span aria-hidden="true">↗</span>
              <span className="sr-only">: {project.name}</span>
            </a>
          )}
          {!project.githubUrl && project.demoUrl && (
            <a
              className="link-chip"
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
            >
              Figma <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
        <div
          className="gallery-controls"
          role="group"
          aria-label={`${project.name} screenshots`}
        >
          <button
            type="button"
            disabled={atStart}
            onClick={() => scroll(-1)}
            aria-label={`${project.name}: previous screenshots`}
            aria-controls={`${project.id}-screenshots`}
          >
            <Chevron className="chevron-left" />
          </button>
          <button
            type="button"
            disabled={atEnd}
            onClick={() => scroll(1)}
            aria-label={`${project.name}: next screenshots`}
            aria-controls={`${project.id}-screenshots`}
          >
            <Chevron className="chevron-right" />
          </button>
        </div>
      </div>
      <div
        className="gallery-track"
        id={`${project.id}-screenshots`}
        ref={trackRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={`${project.name} screenshots`}
        tabIndex={0}
      >
        {project.screenshots.map((image) => (
          <figure className="gallery-slide" key={image.src}>
            <a href={image.src} target="_blank" rel="noreferrer">
              <img
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="lazy"
                decoding="async"
              />
            </a>
          </figure>
        ))}
      </div>
    </div>
  )
}
