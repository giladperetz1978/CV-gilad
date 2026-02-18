import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  User, Briefcase, GraduationCap, Wrench, Globe, Award, Heart, Shield,
  Plus, Trash2, ChevronDown, ChevronUp, Eye, Sparkles, Save
} from 'lucide-react'
import { emptyCV, sampleCV } from '../utils/defaultData'
import { professionalRewriteCV } from '../utils/professionalRewrite'

const Section = ({ title, icon: Icon, color, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-shadow hover:shadow-md">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 bg-slate-50/50 hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
            <Icon className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="font-bold text-slate-800">{title}</span>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
      </button>
      {open && <div className="p-6">{children}</div>}
    </div>
  )
}

const Input = ({ label, value, onChange, type = 'text', placeholder, dir }) => (
  <div>
    <label className="block text-sm font-medium text-slate-600 mb-1.5">{label}</label>
    <input
      type={type}
      value={value || ''}
      onChange={onChange}
      placeholder={placeholder}
      dir={dir}
      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all outline-none text-sm"
    />
  </div>
)

const TextArea = ({ label, value, onChange, placeholder, rows = 3 }) => (
  <div>
    <label className="block text-sm font-medium text-slate-600 mb-1.5">{label}</label>
    <textarea
      value={value || ''}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all outline-none text-sm resize-y"
    />
  </div>
)

export default function BuilderPage({ cvData, setCvData, selectedTemplate, setSelectedTemplate }) {
  const navigate = useNavigate()

  useEffect(() => {
    if (!cvData) {
      setCvData(JSON.parse(JSON.stringify(emptyCV)))
    }
  }, [])

  if (!cvData) return null

  const update = (section, field, value) => {
    setCvData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }))
  }

  const updateArrayItem = (section, index, field, value) => {
    setCvData(prev => {
      const arr = [...prev[section]]
      arr[index] = { ...arr[index], [field]: value }
      return { ...prev, [section]: arr }
    })
  }

  const addArrayItem = (section, template) => {
    setCvData(prev => ({
      ...prev,
      [section]: [...prev[section], { ...template, id: crypto.randomUUID() }],
    }))
  }

  const removeArrayItem = (section, index) => {
    setCvData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }))
  }

  const updateSkill = (index, value) => {
    setCvData(prev => {
      const skills = [...prev.skills]
      skills[index] = value
      return { ...prev, skills }
    })
  }

  const updateCert = (index, value) => {
    setCvData(prev => {
      const certifications = [...prev.certifications]
      certifications[index] = value
      return { ...prev, certifications }
    })
  }

  const handleLoadSample = () => {
    setCvData(JSON.parse(JSON.stringify(sampleCV)))
  }

  const handleRewrite = () => {
    const rewritten = professionalRewriteCV(cvData)
    setCvData(rewritten)
  }

  const handlePreview = () => {
    navigate('/preview')
  }

  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">יצירת קורות חיים</h1>
          <p className="text-slate-500 text-sm mt-1">מלא את הפרטים שלך ליצירת קורות חיים מקצועיים</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleLoadSample}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <Save className="w-4 h-4" />
            טען דוגמה
          </button>
          <button
            onClick={handleRewrite}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            שכתוב מקצועי
          </button>
          <button
            onClick={handlePreview}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/25 transition-colors"
          >
            <Eye className="w-4 h-4" />
            תצוגה מקדימה
          </button>
        </div>
      </div>

      <div className="space-y-5">
        {/* Personal Info */}
        <Section title="פרטים אישיים" icon={User} color="from-blue-500 to-blue-600">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="שם מלא" value={cvData.personalInfo.fullName} onChange={e => update('personalInfo', 'fullName', e.target.value)} placeholder="ישראל ישראלי" />
            <Input label="תפקיד / כותרת" value={cvData.personalInfo.title} onChange={e => update('personalInfo', 'title', e.target.value)} placeholder="מפתח Full Stack" />
            <Input label="אימייל" type="email" value={cvData.personalInfo.email} onChange={e => update('personalInfo', 'email', e.target.value)} placeholder="email@example.com" dir="ltr" />
            <Input label="טלפון" value={cvData.personalInfo.phone} onChange={e => update('personalInfo', 'phone', e.target.value)} placeholder="050-1234567" dir="ltr" />
            <Input label="כתובת" value={cvData.personalInfo.address} onChange={e => update('personalInfo', 'address', e.target.value)} placeholder="תל אביב, ישראל" />
            <Input label="LinkedIn" value={cvData.personalInfo.linkedin} onChange={e => update('personalInfo', 'linkedin', e.target.value)} placeholder="linkedin.com/in/your-name" dir="ltr" />
            <div className="sm:col-span-2">
              <Input label="אתר אישי" value={cvData.personalInfo.website} onChange={e => update('personalInfo', 'website', e.target.value)} placeholder="https://yoursite.com" dir="ltr" />
            </div>
            <div className="sm:col-span-2">
              <TextArea label="תקציר מקצועי" value={cvData.personalInfo.summary} onChange={e => update('personalInfo', 'summary', e.target.value)} placeholder="ספר על עצמך, הניסיון שלך והיעדים המקצועיים..." rows={4} />
            </div>
          </div>
        </Section>

        {/* Experience */}
        <Section title="ניסיון תעסוקתי" icon={Briefcase} color="from-violet-500 to-violet-600">
          <div className="space-y-6">
            {cvData.experience.map((exp, idx) => (
              <div key={exp.id || idx} className="relative bg-slate-50/80 rounded-xl p-5 border border-slate-100">
                {cvData.experience.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('experience', idx)}
                    className="absolute top-3 left-3 p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input label="תפקיד" value={exp.position} onChange={e => updateArrayItem('experience', idx, 'position', e.target.value)} placeholder="מפתח בכיר" />
                  <Input label="חברה" value={exp.company} onChange={e => updateArrayItem('experience', idx, 'company', e.target.value)} placeholder='חברת הייטק בע"מ' />
                  <Input label="תאריך התחלה" type="month" value={exp.startDate} onChange={e => updateArrayItem('experience', idx, 'startDate', e.target.value)} dir="ltr" />
                  <div>
                    <Input label="תאריך סיום" type="month" value={exp.endDate} onChange={e => updateArrayItem('experience', idx, 'endDate', e.target.value)} dir="ltr" />
                    <label className="flex items-center gap-2 mt-2 text-sm text-slate-500">
                      <input
                        type="checkbox"
                        checked={exp.current || false}
                        onChange={e => updateArrayItem('experience', idx, 'current', e.target.checked)}
                        className="rounded border-slate-300"
                      />
                      עד היום
                    </label>
                  </div>
                  <div className="sm:col-span-2">
                    <TextArea label="תיאור התפקיד" value={exp.description} onChange={e => updateArrayItem('experience', idx, 'description', e.target.value)} placeholder="תאר את התפקיד, האחריות והישגים..." rows={3} />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('experience', { company: '', position: '', startDate: '', endDate: '', current: false, description: '' })}
              className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              הוסף ניסיון תעסוקתי
            </button>
          </div>
        </Section>

        {/* Education */}
        <Section title="השכלה" icon={GraduationCap} color="from-emerald-500 to-teal-500">
          <div className="space-y-6">
            {cvData.education.map((edu, idx) => (
              <div key={edu.id || idx} className="relative bg-slate-50/80 rounded-xl p-5 border border-slate-100">
                {cvData.education.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('education', idx)}
                    className="absolute top-3 left-3 p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input label="מוסד לימודים" value={edu.institution} onChange={e => updateArrayItem('education', idx, 'institution', e.target.value)} placeholder="אוניברסיטת תל אביב" />
                  <Input label="תואר" value={edu.degree} onChange={e => updateArrayItem('education', idx, 'degree', e.target.value)} placeholder="תואר ראשון" />
                  <Input label="תחום" value={edu.field} onChange={e => updateArrayItem('education', idx, 'field', e.target.value)} placeholder="מדעי המחשב" />
                  <div className="flex gap-3">
                    <Input label="שנת התחלה" value={edu.startDate} onChange={e => updateArrayItem('education', idx, 'startDate', e.target.value)} placeholder="2015" dir="ltr" />
                    <Input label="שנת סיום" value={edu.endDate} onChange={e => updateArrayItem('education', idx, 'endDate', e.target.value)} placeholder="2019" dir="ltr" />
                  </div>
                  <div className="sm:col-span-2">
                    <TextArea label="פרטים נוספים" value={edu.description} onChange={e => updateArrayItem('education', idx, 'description', e.target.value)} placeholder="הישגים, פרויקטים מיוחדים..." rows={2} />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('education', { institution: '', degree: '', field: '', startDate: '', endDate: '', description: '' })}
              className="flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              הוסף השכלה
            </button>
          </div>
        </Section>

        {/* Skills */}
        <Section title="כישורים וטכנולוגיות" icon={Wrench} color="from-amber-500 to-orange-500">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {cvData.skills.map((skill, idx) => (
                <div key={idx} className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
                  <input
                    type="text"
                    value={skill}
                    onChange={e => updateSkill(idx, e.target.value)}
                    placeholder="כישור..."
                    className="px-3 py-2 bg-transparent text-sm text-slate-700 outline-none w-32"
                  />
                  {cvData.skills.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setCvData(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== idx) }))}
                      className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setCvData(prev => ({ ...prev, skills: [...prev.skills, ''] }))}
              className="flex items-center gap-2 text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              הוסף כישור
            </button>
          </div>
        </Section>

        {/* Languages */}
        <Section title="שפות" icon={Globe} color="from-cyan-500 to-blue-500">
          <div className="space-y-3">
            {cvData.languages.map((lang, idx) => (
              <div key={lang.id || idx} className="flex items-center gap-3">
                <input
                  type="text"
                  value={lang.language || ''}
                  onChange={e => updateArrayItem('languages', idx, 'language', e.target.value)}
                  placeholder="שפה..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
                <select
                  value={lang.level || ''}
                  onChange={e => updateArrayItem('languages', idx, 'level', e.target.value)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">רמה</option>
                  <option value="שפת אם">שפת אם</option>
                  <option value="רמה גבוהה">רמה גבוהה</option>
                  <option value="רמה בינונית">רמה בינונית</option>
                  <option value="רמה בסיסית">רמה בסיסית</option>
                </select>
                {cvData.languages.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('languages', idx)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('languages', { language: '', level: '' })}
              className="flex items-center gap-2 text-sm font-medium text-cyan-600 hover:text-cyan-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              הוסף שפה
            </button>
          </div>
        </Section>

        {/* Certifications */}
        <Section title="הסמכות ותעודות" icon={Award} color="from-pink-500 to-rose-500" defaultOpen={false}>
          <div className="space-y-3">
            {cvData.certifications.map((cert, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <input
                  type="text"
                  value={cert}
                  onChange={e => updateCert(idx, e.target.value)}
                  placeholder="הסמכה..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
                {cvData.certifications.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setCvData(prev => ({ ...prev, certifications: prev.certifications.filter((_, i) => i !== idx) }))}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => setCvData(prev => ({ ...prev, certifications: [...prev.certifications, ''] }))}
              className="flex items-center gap-2 text-sm font-medium text-pink-600 hover:text-pink-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              הוסף הסמכה
            </button>
          </div>
        </Section>

        {/* Military */}
        <Section title="שירות צבאי / לאומי" icon={Shield} color="from-slate-500 to-slate-600" defaultOpen={false}>
          <TextArea
            label="פרטי שירות"
            value={cvData.military}
            onChange={e => setCvData(prev => ({ ...prev, military: e.target.value }))}
            placeholder="סוג השירות, יחידה, תפקיד..."
            rows={2}
          />
        </Section>

        {/* Volunteer */}
        <Section title="התנדבות" icon={Heart} color="from-red-400 to-rose-500" defaultOpen={false}>
          <TextArea
            label="פעילות התנדבותית"
            value={cvData.volunteer}
            onChange={e => setCvData(prev => ({ ...prev, volunteer: e.target.value }))}
            placeholder="פירוט פעילות התנדבותית..."
            rows={2}
          />
        </Section>
      </div>

      {/* Bottom Actions */}
      <div className="flex justify-center gap-4 mt-8 mb-12">
        <button
          onClick={handleRewrite}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold bg-gradient-to-l from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-[1.02] transition-all"
        >
          <Sparkles className="w-5 h-5" />
          שכתוב מקצועי
        </button>
        <button
          onClick={handlePreview}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold bg-gradient-to-l from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] transition-all"
        >
          <Eye className="w-5 h-5" />
          תצוגה מקדימה והורדה
        </button>
      </div>
    </div>
  )
}
