import mammoth from 'mammoth'
import * as pdfjsLib from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker

export async function parsePDF(file) {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
    let fullText = ''

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const textContent = await page.getTextContent()

      if (textContent.items.length === 0) continue

      const items = textContent.items
        .filter(item => item.str && item.str.trim().length > 0)
        .map(item => ({
          text: item.str,
          x: item.transform[4],
          y: Math.round(item.transform[5]),
        }))

      items.sort((a, b) => b.y - a.y || a.x - b.x)

      const rowMap = new Map()
      for (const item of items) {
        let foundRow = false
        for (const [key, arr] of rowMap) {
          if (Math.abs(item.y - key) <= 3) {
            arr.push(item)
            foundRow = true
            break
          }
        }
        if (!foundRow) rowMap.set(item.y, [item])
      }

      const xValues = items.map(it => it.x).sort((a, b) => a - b)
      let maxGap = 0, splitX = 0
      if (xValues.length > 5) {
        const gaps = []
        for (let g = 1; g < xValues.length; g++) {
          gaps.push({ gap: xValues[g] - xValues[g - 1], x: (xValues[g] + xValues[g - 1]) / 2 })
        }
        gaps.sort((a, b) => b.gap - a.gap)
        if (gaps[0] && gaps[0].gap > 80) {
          splitX = gaps[0].x
          maxGap = gaps[0].gap
        }
      }

      const hasColumns = maxGap > 80

      function processLine(lineItems) {
        lineItems.sort((a, b) => a.x - b.x)
        const rawLine = lineItems.map(g => g.text).join(' ').trim()
        if (!rawLine) return ''
        const hebrewChars = (rawLine.match(/[\u0590-\u05FF]/g) || []).length
        const isRTL = hebrewChars > rawLine.length * 0.3
        if (isRTL) {
          const words = rawLine.split(/\s+/)
          words.reverse()
          return words.join(' ')
        }
        return rawLine
      }

      if (hasColumns) {
        const mainLines = []
        const sideLines = []

        const sortedRows = [...rowMap.entries()].sort((a, b) => b[0] - a[0])

        for (const [, rowItems] of sortedRows) {
          const mainItems = rowItems.filter(it => it.x >= splitX)
          const sideItems = rowItems.filter(it => it.x < splitX)

          if (mainItems.length > 0) {
            const line = processLine(mainItems)
            if (line) mainLines.push(line)
          }
          if (sideItems.length > 0) {
            const line = processLine(sideItems)
            if (line) sideLines.push(line)
          }
        }

        for (const line of mainLines) fullText += line + '\n'
        for (const line of sideLines) fullText += line + '\n'
      } else {
        const sortedRows = [...rowMap.entries()].sort((a, b) => b[0] - a[0])
        for (const [, rowItems] of sortedRows) {
          const line = processLine(rowItems)
          if (line) fullText += line + '\n'
        }
      }
    }

    return fullText
  } catch (err) {
    console.error('PDF parse error:', err)
    throw new Error('לא ניתן לקרוא את קובץ ה-PDF. ייתכן שהקובץ מוגן או פגום.')
  }
}

export async function parseWord(file) {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const result = await mammoth.extractRawText({ arrayBuffer })
    return result.value
  } catch (err) {
    console.error('Word parse error:', err)
    throw new Error('לא ניתן לקרוא את קובץ ה-Word. ייתכן שהקובץ פגום.')
  }
}

function reverseHebrewWords(text) {
  if (!text) return text
  const hasHebrew = /[\u0590-\u05FF]/.test(text)
  if (!hasHebrew) return text
  return text
}

function cleanText(text) {
  return text
    .replace(/--\s*\d+\s*of\s*\d+\s*--/gi, '')
    .replace(/\t+/g, ' ')
    .replace(/  +/g, ' ')
    .trim()
}

function isDateLike(str) {
  return /\d{4}\s*[-–]\s*\d{4}/.test(str) ||
    /\d{4}\s*[-–]\s*(הווה|היום|נוכחי|present|current)/i.test(str) ||
    /(הווה|היום|נוכחי|present|current)\s*[-–]\s*\d{4}/i.test(str)
}

function extractDates(str) {
  let match = str.match(/(הווה|היום|נוכחי|present|current)\s*[-–]\s*(\d{4})/i)
  if (match) return { startDate: match[2], endDate: '', current: true }

  match = str.match(/(\d{4})\s*[-–]\s*(הווה|היום|נוכחי|present|current)/i)
  if (match) return { startDate: match[1], endDate: '', current: true }

  match = str.match(/(\d{4})\s*[-–]\s*(\d{4})/)
  if (match) {
    const y1 = parseInt(match[1]), y2 = parseInt(match[2])
    return { startDate: String(Math.min(y1, y2)), endDate: String(Math.max(y1, y2)), current: false }
  }

  match = str.match(/(\d{4})/)
  if (match) return { startDate: match[1], endDate: '', current: false }

  return { startDate: '', endDate: '', current: false }
}

const SECTION_PATTERNS = {
  summary: /^(תקציר מקצועי|תקציר|אודות|על עצמי|פרופיל|summary|about me|profile|objective)$/i,
  experience: /^(תעסוקה|ניסיון|ניסיון תעסוקתי|ניסיון מקצועי|ניסיון עבודה|experience|work|employment|work history)$/i,
  education: /^(השכלה|לימודים|education|academic|הכשרה אקדמית)$/i,
  skills: /^(כישורים|מיומנויות|יכולות|skills|technologies|טכנולוגיות|כלים|תוכנות|מיומנויות טכניות)$/i,
  languages: /^(שפות|languages)$/i,
  certifications: /^(הסמכות|תעודות|certifications|certificates|קורסים|הכשרות|courses)$/i,
  military: /^(שירות צבאי|צבא|military|שירות לאומי|שירות סדיר)$/i,
  volunteer: /^(התנדבות|volunteer|פעילות חברתית)$/i,
}

function detectSection(line) {
  const trimmed = line.trim()

  for (const [section, pattern] of Object.entries(SECTION_PATTERNS)) {
    if (pattern.test(trimmed)) return section
  }

  if (trimmed.length > 40) return null

  const words = trimmed.split(/\s+/)
  if (words.length > 5) return null

  for (const word of words) {
    for (const [section, pattern] of Object.entries(SECTION_PATTERNS)) {
      if (pattern.test(word)) return section
    }
  }
  return null
}

const KNOWN_SKILL_WORDS = new Set([
  'windows', 'word', 'excel', 'power point', 'powerpoint', 'adobe', 'editor',
  'sap', 'rpe', 'python', 'javascript', 'react', 'node.js', 'typescript',
  'java', 'c++', 'c#', 'html', 'css', 'sql', 'mongodb', 'postgresql',
  'docker', 'aws', 'git', 'linux', 'photoshop', 'illustrator', 'figma',
  'autocad', 'solidworks', 'matlab', 'office', 'outlook', 'teams',
  'ai', 'thermal', 'breakage',
])

const KNOWN_LANGUAGES = {
  'עברית': 'שפת אם',
  'אנגלית': '',
  'ערבית': '',
  'רוסית': '',
  'צרפתית': '',
  'ספרדית': '',
  'אמהרית': '',
  'english': '',
  'hebrew': 'שפת אם',
  'arabic': '',
  'russian': '',
  'french': '',
}

const MILITARY_KEYWORDS = ['חיל', 'האוויר', 'צבא', 'צה"ל', 'סדיר', 'מילואים', 'קצין', 'מפקד', 'לוחם', 'מנוען', 'מסוקים', 'טייס', 'חיל הים', 'יחידה', 'גדוד', 'חטיבה']

function isKnownSkillWord(word) {
  const lower = word.trim().toLowerCase()
  if (KNOWN_SKILL_WORDS.has(lower)) return true
  if (lower.length < 20 && /^[a-zA-Z\s.+#]+$/.test(lower) && lower.length > 1) return true
  return false
}

function isLanguageWord(word) {
  return word.trim() in KNOWN_LANGUAGES
}

function fixReversedPhone(phone) {
  if (!phone) return phone
  const match = phone.match(/^(\d{7})-(\d{2,3})$/)
  if (match) {
    return match[2] + '-' + match[1]
  }
  const match2 = phone.match(/^(\d{7})(\d{3})$/)
  if (match2) {
    return match2[2] + '-' + match2[1]
  }
  return phone
}

export function textToCvData(text) {
  const cleaned = cleanText(text)
  let rawLines = cleaned.split('\n').map(l => l.trim()).filter(l => l.length > 0)

  const extractedSkills = []
  const extractedLanguages = []
  const filteredLines = []

  for (const line of rawLines) {
    const words = line.split(/\s+/)
    const cleanWords = []
    for (const word of words) {
      if (isLanguageWord(word)) {
        extractedLanguages.push(word.trim())
      } else if (isKnownSkillWord(word)) {
        extractedSkills.push(word)
      } else {
        cleanWords.push(word)
      }
    }
    const newLine = cleanWords.join(' ').trim()
    if (newLine.length > 0 && newLine !== '.' && newLine !== ',') filteredLines.push(newLine)
  }

  const lines = filteredLines

  const cvData = {
    personalInfo: { fullName: '', title: '', email: '', phone: '', address: '', linkedin: '', website: '', summary: '' },
    experience: [],
    education: [],
    skills: [],
    languages: [],
    certifications: [],
    volunteer: '',
    military: '',
  }

  const emailMatch = cleaned.match(/[\w.-]+@[\w.-]+\.\w+/)
  if (emailMatch) cvData.personalInfo.email = emailMatch[0]

  const phoneMatch = cleaned.match(/(?:0\d{1,2}[-.]?\d{7,8}|\+972[-.]?\d{1,2}[-.]?\d{7}|\d{7,10}[-.]?\d{2,3})/)
  if (phoneMatch) cvData.personalInfo.phone = fixReversedPhone(phoneMatch[0])

  const linkedinMatch = cleaned.match(/linkedin\.com\/in\/[\w-]+/)
  if (linkedinMatch) cvData.personalInfo.linkedin = linkedinMatch[0]

  const allTokens = cleaned.split(/[\s,]+/)
  const allText = lines.join(' ')

  if (lines.length > 0) {
    let nameLine = lines[0]
    nameLine = nameLine.replace(/[\w.-]+@[\w.-]+\.\w+/g, '')
      .replace(/\d{2,3}[-.]?\d{7,8}/g, '')
      .replace(/\+972[-.]?\d+/g, '')
      .trim()
    const nameParts = nameLine.split(/\s+/).filter(p => /[\u0590-\u05FF]/.test(p) && p.length > 1)
    if (nameParts.length >= 2 && nameParts.length <= 4) {
      cvData.personalInfo.fullName = nameParts.join(' ')
    } else if (nameParts.length === 1 && lines.length > 1) {
      const secondParts = lines[1].split(/\s+/).filter(p => /[\u0590-\u05FF]/.test(p) && p.length > 1)
      if (secondParts.length >= 1 && secondParts.length <= 3) {
        cvData.personalInfo.fullName = nameParts[0] + ' ' + secondParts[0]
      }
    }
  }

  let currentSection = 'header'
  let currentExpBlock = []
  let currentEduBlock = []

  function flushExpBlock() {
    if (currentExpBlock.length === 0) return
    const block = currentExpBlock.join(' ')
    currentExpBlock = []

    const dates = extractDates(block)
    let blockWithoutDate = block.replace(/(הווה|היום|נוכחי|present|current)\s*[-–]\s*\d{4}/gi, '')
      .replace(/\d{4}\s*[-–]\s*(הווה|היום|נוכחי|present|current)/gi, '')
      .replace(/\d{4}\s*[-–]\s*\d{4}/g, '')
      .trim()

    const sentences = blockWithoutDate.split(/[.]/).map(s => s.trim()).filter(s => s.length > 2)
    let position = sentences[0] || blockWithoutDate.substring(0, 60)
    let company = ''
    let description = ''

    if (sentences.length >= 2) {
      position = sentences[0]
      const knownCompanies = ['קוטלב', 'אמרל', 'סורג', 'דור', 'פילם', 'חיל', 'האוויר', 'ג.א.ת']
      for (let i = 1; i < sentences.length; i++) {
        if (knownCompanies.some(c => sentences[i].includes(c)) || sentences[i].length < 30) {
          if (!company) company = sentences[i]
          else description += sentences[i] + '. '
        } else {
          description += sentences[i] + '. '
        }
      }
    }

    cvData.experience.push({
      id: crypto.randomUUID(),
      position: position.substring(0, 100),
      company,
      startDate: dates.startDate,
      endDate: dates.endDate,
      current: dates.current,
      description: description.trim(),
    })
  }

  function flushEduBlock() {
    if (currentEduBlock.length === 0) return
    const block = currentEduBlock.join(' ')
    currentEduBlock = []

    const dates = extractDates(block)
    let blockClean = block.replace(/\d{4}\s*[-–]\s*\d{4}/g, '').replace(/\d{4}/g, '').trim()

    const parts = blockClean.split(/[,.]/).map(s => s.trim()).filter(s => s.length > 1)

    cvData.education.push({
      id: crypto.randomUUID(),
      degree: parts[0] || blockClean.substring(0, 60),
      institution: parts[1] || '',
      field: parts[2] || '',
      startDate: dates.startDate,
      endDate: dates.endDate,
      description: parts.slice(3).join('. '),
    })
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.match(/--\s*\d+\s*of\s*\d+\s*--/)) continue

    const section = detectSection(line)
    if (section) {
      const isSidebarSection = (section === 'languages' || section === 'skills')
      const isMainSection = (currentSection === 'experience' || currentSection === 'education')

      if (isSidebarSection && isMainSection) {
        const nextLines = lines.slice(i + 1, i + 4)
        const nextLooksLikeContent = nextLines.some(l => l.length > 50 || isDateLike(l))
        if (nextLooksLikeContent) {
          continue
        }
      }

      if (currentSection === 'experience') flushExpBlock()
      if (currentSection === 'education') flushEduBlock()
      currentSection = section
      continue
    }

    const lineWords = line.split(/\s+/)

    switch (currentSection) {
      case 'header': {
        const hasAddr = line.match(/[\u0590-\u05FF]/) && !line.includes('@') && !line.match(/\d{7}/)
        if (hasAddr && i > 0 && i < 3) {
          const addrParts = line.replace(/[\w.-]+@[\w.-]+\.\w+/g, '')
            .replace(/\d{2,3}[-.]?\d{7,8}/g, '')
            .replace(/\+972[-.]?\d+/g, '')
            .trim()
          if (addrParts.length > 0 && addrParts.length < 50) {
            const words = addrParts.split(/\s+/).filter(w => /[\u0590-\u05FF]/.test(w))
            if (words.length > 0) cvData.personalInfo.address = words.join(' ')
          }
        }
        break
      }

      case 'summary':
        cvData.personalInfo.summary += (cvData.personalInfo.summary ? ' ' : '') + line
        break

      case 'experience': {
        if (isDateLike(line) || (line.length < 80 && /\d{4}/.test(line))) {
          flushExpBlock()
          currentExpBlock.push(line)
        } else if (currentExpBlock.length === 0 && line.length < 80) {
          currentExpBlock.push(line)
        } else {
          currentExpBlock.push(line)
        }
        break
      }

      case 'education': {
        if (isDateLike(line) || (line.length < 80 && /\d{4}/.test(line))) {
          flushEduBlock()
          currentEduBlock.push(line)
        } else if (currentEduBlock.length === 0 && line.length < 60) {
          currentEduBlock.push(line)
        } else {
          currentEduBlock.push(line)
        }
        break
      }

      case 'skills': {
        const skillItems = line.split(/[,;|•·]/).map(s => s.trim()).filter(s => s.length > 0 && s.length < 60)
        if (skillItems.length > 1) {
          cvData.skills.push(...skillItems)
        } else {
          const trimmed = line.trim()
          if (trimmed.length > 0 && trimmed.length < 60) {
            cvData.skills.push(trimmed)
          }
        }
        break
      }

      case 'languages': {
        if (line.trim().length > 0 && line.trim().length < 40) {
          const parts = line.split(/[-–:]/).map(s => s.trim())
          cvData.languages.push({
            id: crypto.randomUUID(),
            language: parts[0] || line.trim(),
            level: parts[1] || '',
          })
        }
        break
      }

      case 'certifications': {
        if (line.trim().length > 0) {
          const cleanLine = line.trim().replace(/^[•\-*]\s*/, '')
          if (/\d{4}/.test(cleanLine)) {
            const dates = extractDates(cleanLine)
            const certText = cleanLine.replace(/\d{4}/g, '').trim()
            cvData.certifications.push(certText + (dates.startDate ? ` (${dates.startDate})` : ''))
          } else {
            cvData.certifications.push(cleanLine)
          }
        }
        break
      }

      case 'military':
        cvData.military += (cvData.military ? ' ' : '') + line
        break

      case 'volunteer':
        cvData.volunteer += (cvData.volunteer ? ' ' : '') + line
        break

      default:
        break
    }
  }

  if (currentSection === 'experience') flushExpBlock()
  if (currentSection === 'education') flushEduBlock()

  const militaryExp = []
  const civilExp = []
  for (const exp of cvData.experience) {
    const allText = `${exp.position} ${exp.company} ${exp.description}`.toLowerCase()
    const isMilitary = MILITARY_KEYWORDS.some(kw => allText.includes(kw))
    if (isMilitary) {
      militaryExp.push(exp)
    } else {
      civilExp.push(exp)
    }
  }

  if (militaryExp.length > 0) {
    const milParts = militaryExp.map(m => {
      const parts = [m.position, m.company, m.description].filter(Boolean)
      const dates = [m.startDate, m.endDate].filter(Boolean).join('-')
      return parts.join(' ') + (dates ? ` (${dates})` : '')
    })
    cvData.military = (cvData.military ? cvData.military + '. ' : '') + milParts.join('. ')
    cvData.experience = civilExp
  }

  if (extractedSkills.length > 0) {
    const existingSkills = new Set(cvData.skills.map(s => s.toLowerCase()))
    for (const skill of extractedSkills) {
      if (!existingSkills.has(skill.toLowerCase())) {
        cvData.skills.push(skill)
        existingSkills.add(skill.toLowerCase())
      }
    }
  }

  cvData.skills = cvData.skills.filter(s => s && s.trim().length > 0)

  if (extractedLanguages.length > 0) {
    const existingLangs = new Set(cvData.languages.map(l => l.language))
    for (const lang of extractedLanguages) {
      if (!existingLangs.has(lang)) {
        cvData.languages.push({
          id: crypto.randomUUID(),
          language: lang,
          level: KNOWN_LANGUAGES[lang] || '',
        })
        existingLangs.add(lang)
      }
    }
  }

  if (cvData.experience.length === 0) {
    cvData.experience.push({ id: crypto.randomUUID(), company: '', position: '', startDate: '', endDate: '', current: false, description: '' })
  }
  if (cvData.education.length === 0) {
    cvData.education.push({ id: crypto.randomUUID(), institution: '', degree: '', field: '', startDate: '', endDate: '', description: '' })
  }
  if (cvData.skills.length === 0) cvData.skills.push('')
  if (cvData.languages.length === 0) cvData.languages.push({ id: crypto.randomUUID(), language: '', level: '' })
  if (cvData.certifications.length === 0) cvData.certifications.push('')

  return cvData
}
