const powerVerbs = [
  'הוביל', 'פיתח', 'ניהל', 'יישם', 'שיפר', 'ייעל', 'הקים', 'תכנן',
  'ביצע', 'הגדיל', 'צמצם', 'אופטם', 'עיצב', 'הטמיע', 'בנה', 'ארגן',
]

const summaryEnhancements = [
  'בעל מוטיבציה גבוהה',
  'ממוקד תוצאות',
  'בעל יכולת למידה עצמית',
  'בעל חשיבה אנליטית',
  'עם יכולת עבודת צוות מעולה',
]

export function rewriteSummary(summary) {
  if (!summary || summary.trim().length === 0) return summary

  let rewritten = summary.trim()

  if (!rewritten.endsWith('.')) {
    rewritten += '.'
  }

  const sentences = rewritten.split(/[.]\s*/).filter(s => s.trim().length > 0)

  const improved = sentences.map((sentence) => {
    let s = sentence.trim()
    s = s.charAt(0).toUpperCase() + s.slice(1)
    return s
  })

  if (improved.length > 0 && !improved[improved.length - 1].includes('ממוקד') && !improved[improved.length - 1].includes('מוטיבציה')) {
    const enhancement = summaryEnhancements[Math.floor(Math.random() * summaryEnhancements.length)]
    if (!rewritten.includes(enhancement)) {
      improved.push(`איש מקצוע ${enhancement} עם גישה פרואקטיבית להשגת יעדים`)
    }
  }

  return improved.join('. ') + '.'
}

export function rewriteExperienceDescription(description) {
  if (!description || description.trim().length === 0) return description

  const lines = description.split(/[.\n]/).filter(l => l.trim().length > 0)

  const improved = lines.map((line) => {
    let l = line.trim()

    const startsWithVerb = powerVerbs.some(v => l.startsWith(v))
    if (!startsWithVerb && l.length > 10) {
      const verb = powerVerbs[Math.floor(Math.random() * powerVerbs.length)]
      if (!l.startsWith(verb)) {
        l = `${l}`
      }
    }

    l = l.replace(/עשיתי/g, 'ביצעתי')
    l = l.replace(/עזרתי/g, 'תמכתי ב')
    l = l.replace(/עבדתי על/g, 'הובלתי את פיתוח')
    l = l.replace(/אחראי על/g, 'ניהלתי את')
    l = l.replace(/התעסקתי ב/g, 'התמחיתי ב')

    return l
  })

  return improved.join('. ') + (improved.length > 0 ? '.' : '')
}

export function professionalRewriteCV(cvData) {
  if (!cvData) return cvData

  const rewritten = JSON.parse(JSON.stringify(cvData))

  if (rewritten.personalInfo?.summary) {
    rewritten.personalInfo.summary = rewriteSummary(rewritten.personalInfo.summary)
  }

  if (rewritten.experience) {
    rewritten.experience = rewritten.experience.map((exp) => ({
      ...exp,
      description: rewriteExperienceDescription(exp.description),
    }))
  }

  if (rewritten.skills) {
    rewritten.skills = [...new Set(rewritten.skills.filter(s => s.trim().length > 0))]
  }

  return rewritten
}
