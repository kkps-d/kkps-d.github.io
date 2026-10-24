export interface Resume {
  schemaVersion: string
  footer: string
  sources: {
    id: string
    type: string
    path: string
    priority: number
    editablePath?: string
  }[]
  person: {
    id: string
    sourceId: string
    name: string
    title: string
    location: string
    relocation: string
    summary: string
    cvUrl: string
    contacts: { id: string; label: string; url: string; sourceId: string }[]
  }
  experience: {
    id: string
    sourceId: string
    title: string
    company: string
    location: string
    startDate: string
    endDate: string | null
    current: boolean
    dateLabel: string
    summary: string
    highlights: string[]
  }[]
  projects: {
    id: string
    name: string
    year: number | null
    sourceId: string
    summary: string
    summarySourceId: string
    description: { text: string; sourceId: string }[]
    githubUrl: string | null
    demoUrl: string | null
    technologies: string[]
    screenshots: {
      src: string
      alt: string
      sourceId: string
      width: number
      height: number
    }[]
  }[]
  education: {
    id: string
    sourceId: string
    institution: string
    location: string
    startDate: string
    endDate: string
    degree: string
    gpa: string
    honors: string
    highlights: string[]
  }[]
  skills: { sourceId: string; items: string[] }
}
