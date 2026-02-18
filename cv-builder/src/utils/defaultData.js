export const emptyCV = {
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
  experience: [
    {
      id: crypto.randomUUID(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    },
  ],
  education: [
    {
      id: crypto.randomUUID(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  ],
  skills: [''],
  languages: [
    {
      id: crypto.randomUUID(),
      language: '',
      level: '',
    },
  ],
  certifications: [''],
  volunteer: '',
  military: '',
}

export const sampleCV = {
  personalInfo: {
    fullName: 'ישראל ישראלי',
    title: 'מפתח Full Stack',
    email: 'israel@example.com',
    phone: '050-1234567',
    address: 'תל אביב, ישראל',
    linkedin: 'linkedin.com/in/israel',
    website: '',
    summary: 'מפתח Full Stack עם 5 שנות ניסיון בפיתוח אפליקציות ווב. מתמחה ב-React, Node.js ו-Python. בעל יכולת עבודה בצוות ופתרון בעיות מורכבות.',
  },
  experience: [
    {
      id: '1',
      company: 'חברת הייטק בע"מ',
      position: 'מפתח Full Stack בכיר',
      startDate: '2021-01',
      endDate: '',
      current: true,
      description: 'פיתוח ותחזוקה של מערכות ווב מורכבות. הובלת צוות של 3 מפתחים. שיפור ביצועי המערכת ב-40%.',
    },
    {
      id: '2',
      company: 'סטארטאפ חדשני',
      position: 'מפתח Frontend',
      startDate: '2019-03',
      endDate: '2021-01',
      current: false,
      description: 'פיתוח ממשקי משתמש ב-React. עבודה עם REST APIs. כתיבת בדיקות יחידה.',
    },
  ],
  education: [
    {
      id: '1',
      institution: 'אוניברסיטת תל אביב',
      degree: 'תואר ראשון',
      field: 'מדעי המחשב',
      startDate: '2015',
      endDate: '2019',
      description: 'סיום בהצטיינות. פרויקט גמר בתחום בינה מלאכותית.',
    },
  ],
  skills: ['React', 'Node.js', 'Python', 'TypeScript', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS'],
  languages: [
    { id: '1', language: 'עברית', level: 'שפת אם' },
    { id: '2', language: 'אנגלית', level: 'רמה גבוהה' },
  ],
  certifications: ['AWS Certified Developer', 'Google Cloud Professional'],
  volunteer: '',
  military: 'שירות צבאי מלא - יחידה טכנולוגית',
}
