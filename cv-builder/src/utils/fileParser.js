import mammoth from 'mammoth'
import * as pdfjsLib from 'pdfjs-dist'

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).toString()

export async function parsePDF(file) {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
  let fullText = ''

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const textContent = await page.getTextContent()
    const pageText = textContent.items.map((item) => item.str).join(' ')
    fullText += pageText + '\n'
  }

  return fullText
}

export async function parseWord(file) {
  const arrayBuffer = await file.arrayBuffer()
  const result = await mammoth.extractRawText({ arrayBuffer })
  return result.value
}

export function textToCvData(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0)
  const cvData = {
    personalInfo: {
      fullName: '',
      title: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      website: '',
      summary: '',
    },
    experience: [],
    education: [],
    skills: [],
    languages: [],
    certifications: [],
    volunteer: '',
    military: '',
  }

  const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/)
  if (emailMatch) cvData.personalInfo.email = emailMatch[0]

  const phoneMatch = text.match(/(?:0\d{1,2}[-.]?\d{7,8}|\+972[-.]?\d{1,2}[-.]?\d{7}|\d{3}[-.]?\d{3}[-.]?\d{4})/)
  if (phoneMatch) cvData.personalInfo.phone = phoneMatch[0]

  const linkedinMatch = text.match(/linkedin\.com\/in\/[\w-]+/)
  if (linkedinMatch) cvData.personalInfo.linkedin = linkedinMatch[0]

  if (lines.length > 0) {
    const nameCandidate = lines[0]
    if (nameCandidate.length < 50 && !nameCandidate.includes('@') && !nameCandidate.match(/\d{5}/)) {
      cvData.personalInfo.fullName = nameCandidate
    }
  }

  const summaryKeywords = ['תקציר', 'אודות', 'על עצמי', 'פרופיל', 'summary', 'about', 'profile', 'objective']
  const experienceKeywords = ['ניסיון', 'ניסיון תעסוקתי', 'ניסיון מקצועי', 'experience', 'work history', 'employment']
  const educationKeywords = ['השכלה', 'לימודים', 'education', 'academic']
  const skillsKeywords = ['כישורים', 'מיומנויות', 'יכולות', 'skills', 'technologies', 'טכנולוגיות']
  const languageKeywords = ['שפות', 'languages']

  let currentSection = 'general'
  let summaryLines = []
  let experienceLines = []
  let educationLines = []
  let skillsText = ''

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].toLowerCase()

    if (summaryKeywords.some(k => line.includes(k))) {
      currentSection = 'summary'
      continue
    }
    if (experienceKeywords.some(k => line.includes(k))) {
      currentSection = 'experience'
      continue
    }
    if (educationKeywords.some(k => line.includes(k))) {
      currentSection = 'education'
      continue
    }
    if (skillsKeywords.some(k => line.includes(k))) {
      currentSection = 'skills'
      continue
    }
    if (languageKeywords.some(k => line.includes(k))) {
      currentSection = 'languages'
      continue
    }

    switch (currentSection) {
      case 'summary':
        summaryLines.push(lines[i])
        break
      case 'experience':
        experienceLines.push(lines[i])
        break
      case 'education':
        educationLines.push(lines[i])
        break
      case 'skills':
        skillsText += lines[i] + ' '
        break
      case 'languages':
        if (lines[i].trim().length > 0) {
          cvData.languages.push({
            id: crypto.randomUUID(),
            language: lines[i].trim(),
            level: '',
          })
        }
        break
      default:
        break
    }
  }

  if (summaryLines.length > 0) {
    cvData.personalInfo.summary = summaryLines.join(' ')
  }

  if (experienceLines.length > 0) {
    let currentExp = null
    for (const line of experienceLines) {
      const dateMatch = line.match(/\d{4}/)
      if (dateMatch && line.length < 80 && !currentExp?.description) {
        if (currentExp) cvData.experience.push(currentExp)
        currentExp = {
          id: crypto.randomUUID(),
          company: '',
          position: line,
          startDate: '',
          endDate: '',
          current: false,
          description: '',
        }
      } else if (currentExp) {
        currentExp.description += (currentExp.description ? '. ' : '') + line
      } else {
        currentExp = {
          id: crypto.randomUUID(),
          company: '',
          position: line,
          startDate: '',
          endDate: '',
          current: false,
          description: '',
        }
      }
    }
    if (currentExp) cvData.experience.push(currentExp)
  }

  if (educationLines.length > 0) {
    cvData.education.push({
      id: crypto.randomUUID(),
      institution: '',
      degree: educationLines[0] || '',
      field: educationLines[1] || '',
      startDate: '',
      endDate: '',
      description: educationLines.slice(2).join('. '),
    })
  }

  if (skillsText.trim().length > 0) {
    cvData.skills = skillsText.split(/[,;|•·\-]/)
      .map(s => s.trim())
      .filter(s => s.length > 0 && s.length < 50)
  }

  if (cvData.experience.length === 0) {
    cvData.experience.push({
      id: crypto.randomUUID(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    })
  }

  if (cvData.education.length === 0) {
    cvData.education.push({
      id: crypto.randomUUID(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: '',
    })
  }

  if (cvData.skills.length === 0) {
    cvData.skills.push('')
  }

  if (cvData.languages.length === 0) {
    cvData.languages.push({ id: crypto.randomUUID(), language: '', level: '' })
  }

  if (cvData.certifications.length === 0) {
    cvData.certifications.push('')
  }

  return cvData
}
