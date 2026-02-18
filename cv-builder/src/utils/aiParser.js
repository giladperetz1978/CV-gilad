const SYSTEM_PROMPT = `אתה מנתח קורות חיים מקצועי. קיבלת טקסט גולמי שחולץ מקובץ PDF של קורות חיים בעברית.
המשימה שלך: לנתח את הטקסט ולהחזיר JSON מובנה עם כל המידע.

חשוב:
- הטקסט עשוי להגיע בסדר מילים הפוך (RTL מ-PDF)
- ייתכן שיש ערבוב של עמודות (מיומנויות מעורבבות עם ניסיון)
- זהה נכון שירות צבאי מול ניסיון תעסוקתי אזרחי
- שפר את ניסוח הטקסט לשפה מקצועית וברורה

החזר JSON בפורמט הבא בלבד (ללא טקסט נוסף):
{
  "personalInfo": {
    "fullName": "",
    "title": "כותרת מקצועית מתאימה",
    "email": "",
    "phone": "",
    "address": "",
    "linkedin": "",
    "website": "",
    "summary": "תקציר מקצועי של 2-3 משפטים"
  },
  "experience": [
    {
      "company": "שם החברה",
      "position": "שם התפקיד",
      "startDate": "YYYY",
      "endDate": "YYYY או ריק אם נוכחי",
      "current": true/false,
      "description": "תיאור התפקיד בשפה מקצועית"
    }
  ],
  "education": [
    {
      "institution": "שם המוסד",
      "degree": "סוג התואר",
      "field": "תחום הלימודים",
      "startDate": "YYYY",
      "endDate": "YYYY",
      "description": ""
    }
  ],
  "skills": ["מיומנות1", "מיומנות2"],
  "languages": [
    { "language": "עברית", "level": "שפת אם" },
    { "language": "אנגלית", "level": "רמה גבוהה/בינונית/בסיסית" }
  ],
  "certifications": ["הסמכה1 (שנה)"],
  "volunteer": "",
  "military": "תיאור השירות הצבאי"
}`

export async function parseWithAI(rawText, apiKey) {
  if (!apiKey || !apiKey.trim()) {
    throw new Error('נדרש מפתח API של OpenAI')
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey.trim()}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `נתח את קורות החיים הבאים:\n\n${rawText}` },
      ],
      temperature: 0.1,
      max_tokens: 4000,
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    if (response.status === 401) {
      throw new Error('מפתח API לא תקין. בדוק את המפתח ונסה שנית.')
    }
    throw new Error(err.error?.message || `שגיאה מ-OpenAI (${response.status})`)
  }

  const data = await response.json()
  const content = data.choices?.[0]?.message?.content

  if (!content) {
    throw new Error('לא התקבלה תשובה מ-OpenAI')
  }

  const jsonMatch = content.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    throw new Error('לא ניתן לפרסר את התשובה מ-OpenAI')
  }

  const parsed = JSON.parse(jsonMatch[0])

  if (parsed.experience) {
    parsed.experience = parsed.experience.map(exp => ({
      ...exp,
      id: crypto.randomUUID(),
      current: exp.current || false,
    }))
  }
  if (parsed.education) {
    parsed.education = parsed.education.map(edu => ({
      ...edu,
      id: crypto.randomUUID(),
    }))
  }
  if (parsed.languages) {
    parsed.languages = parsed.languages.map(lang => ({
      ...lang,
      id: crypto.randomUUID(),
    }))
  }

  if (!parsed.experience?.length) parsed.experience = [{ id: crypto.randomUUID(), company: '', position: '', startDate: '', endDate: '', current: false, description: '' }]
  if (!parsed.education?.length) parsed.education = [{ id: crypto.randomUUID(), institution: '', degree: '', field: '', startDate: '', endDate: '', description: '' }]
  if (!parsed.skills?.length) parsed.skills = ['']
  if (!parsed.languages?.length) parsed.languages = [{ id: crypto.randomUUID(), language: '', level: '' }]
  if (!parsed.certifications?.length) parsed.certifications = ['']

  return parsed
}
