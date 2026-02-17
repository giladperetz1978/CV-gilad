import React from 'react'
import { Mail, Phone, MapPin, Globe, Linkedin, ExternalLink } from 'lucide-react'

function ContactItem({ icon: Icon, text, isLink, href }) {
  if (!text) return null
  if (isLink) {
    return (
      <a href={href || text} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 transition-colors" dir="ltr">
        <Icon className="w-3.5 h-3.5 shrink-0" />
        <span>{text}</span>
      </a>
    )
  }
  return (
    <span className="flex items-center gap-1.5 text-xs text-slate-500" dir={text.match(/[a-zA-Z@]/) ? 'ltr' : 'rtl'}>
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span>{text}</span>
    </span>
  )
}

function SectionHeader({ title, color = '#2563eb' }) {
  return (
    <h2 className="text-sm font-bold mt-5 mb-2 pb-1.5 border-b-2" style={{ color, borderColor: color }}>
      {title}
    </h2>
  )
}

export function ModernTemplate({ data }) {
  if (!data) return null
  const { personalInfo, experience, education, skills, languages, certifications, volunteer, military } = data

  return (
    <div className="p-8 font-[Heebo,sans-serif] text-slate-800 leading-relaxed" dir="rtl">
      {/* Header */}
      <div className="text-center mb-4 pb-4 border-b border-slate-200">
        {personalInfo.fullName && (
          <h1 className="text-2xl font-extrabold text-slate-900 mb-1">{personalInfo.fullName}</h1>
        )}
        {personalInfo.title && (
          <p className="text-sm font-medium text-blue-600 mb-3">{personalInfo.title}</p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <ContactItem icon={Mail} text={personalInfo.email} />
          <ContactItem icon={Phone} text={personalInfo.phone} />
          <ContactItem icon={MapPin} text={personalInfo.address} />
          <ContactItem icon={Linkedin} text={personalInfo.linkedin} isLink href={`https://${personalInfo.linkedin}`} />
          <ContactItem icon={Globe} text={personalInfo.website} isLink />
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <>
          <SectionHeader title="תקציר מקצועי" />
          <p className="text-xs text-slate-600 leading-relaxed">{personalInfo.summary}</p>
        </>
      )}

      {/* Experience */}
      {experience?.length > 0 && experience.some(e => e.position || e.company) && (
        <>
          <SectionHeader title="ניסיון תעסוקתי" />
          {experience.map((exp, idx) => {
            if (!exp.position && !exp.company) return null
            return (
              <div key={idx} className="mb-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">{exp.position}</h3>
                    {exp.company && <p className="text-xs font-medium text-slate-500">{exp.company}</p>}
                  </div>
                  <span className="text-xs text-slate-400 whitespace-nowrap" dir="ltr">
                    {exp.startDate && exp.startDate}
                    {(exp.startDate && (exp.endDate || exp.current)) && ' - '}
                    {exp.current ? 'היום' : exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{exp.description}</p>
                )}
              </div>
            )
          })}
        </>
      )}

      {/* Education */}
      {education?.length > 0 && education.some(e => e.degree || e.institution) && (
        <>
          <SectionHeader title="השכלה" />
          {education.map((edu, idx) => {
            if (!edu.degree && !edu.institution) return null
            return (
              <div key={idx} className="mb-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">
                      {edu.degree}{edu.field ? ` - ${edu.field}` : ''}
                    </h3>
                    {edu.institution && <p className="text-xs font-medium text-slate-500">{edu.institution}</p>}
                  </div>
                  <span className="text-xs text-slate-400 whitespace-nowrap" dir="ltr">
                    {edu.startDate && edu.startDate}
                    {(edu.startDate && edu.endDate) && ' - '}
                    {edu.endDate}
                  </span>
                </div>
                {edu.description && (
                  <p className="text-xs text-slate-600 mt-1">{edu.description}</p>
                )}
              </div>
            )
          })}
        </>
      )}

      {/* Skills */}
      {skills?.length > 0 && skills.some(s => s?.trim()) && (
        <>
          <SectionHeader title="כישורים וטכנולוגיות" />
          <div className="flex flex-wrap gap-1.5">
            {skills.filter(s => s?.trim()).map((skill, idx) => (
              <span key={idx} className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium">
                {skill}
              </span>
            ))}
          </div>
        </>
      )}

      {/* Languages */}
      {languages?.length > 0 && languages.some(l => l.language) && (
        <>
          <SectionHeader title="שפות" />
          <div className="flex flex-wrap gap-3">
            {languages.filter(l => l.language).map((lang, idx) => (
              <span key={idx} className="text-xs text-slate-600">
                <span className="font-semibold">{lang.language}</span>
                {lang.level && ` - ${lang.level}`}
              </span>
            ))}
          </div>
        </>
      )}

      {/* Certifications */}
      {certifications?.length > 0 && certifications.some(c => c?.trim()) && (
        <>
          <SectionHeader title="הסמכות" />
          <ul className="space-y-0.5 pr-4">
            {certifications.filter(c => c?.trim()).map((cert, idx) => (
              <li key={idx} className="text-xs text-slate-600 list-disc">{cert}</li>
            ))}
          </ul>
        </>
      )}

      {/* Military */}
      {military && (
        <>
          <SectionHeader title="שירות צבאי / לאומי" />
          <p className="text-xs text-slate-600">{military}</p>
        </>
      )}

      {/* Volunteer */}
      {volunteer && (
        <>
          <SectionHeader title="התנדבות" />
          <p className="text-xs text-slate-600">{volunteer}</p>
        </>
      )}
    </div>
  )
}

export function ClassicTemplate({ data }) {
  if (!data) return null
  const { personalInfo, experience, education, skills, languages, certifications, volunteer, military } = data

  return (
    <div className="p-8 font-[Heebo,sans-serif] text-slate-800" dir="rtl">
      {/* Header */}
      <div className="mb-5 pb-4 border-b-2 border-slate-800">
        {personalInfo.fullName && (
          <h1 className="text-2xl font-extrabold text-slate-900 mb-0.5">{personalInfo.fullName}</h1>
        )}
        {personalInfo.title && (
          <p className="text-sm font-semibold text-slate-600 mb-2">{personalInfo.title}</p>
        )}
        <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-slate-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>| {personalInfo.phone}</span>}
          {personalInfo.address && <span>| {personalInfo.address}</span>}
          {personalInfo.linkedin && <span>| {personalInfo.linkedin}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-4">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5 border-b border-slate-300 pb-1">
            תקציר מקצועי
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience?.length > 0 && experience.some(e => e.position || e.company) && (
        <div className="mb-4">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5 border-b border-slate-300 pb-1">
            ניסיון תעסוקתי
          </h2>
          {experience.map((exp, idx) => {
            if (!exp.position && !exp.company) return null
            return (
              <div key={idx} className="mb-3">
                <div className="flex justify-between">
                  <h3 className="text-sm font-bold text-slate-800">{exp.position}</h3>
                  <span className="text-xs text-slate-400" dir="ltr">
                    {exp.startDate}{(exp.startDate && (exp.endDate || exp.current)) && ' - '}{exp.current ? 'היום' : exp.endDate}
                  </span>
                </div>
                {exp.company && <p className="text-xs text-slate-500 italic">{exp.company}</p>}
                {exp.description && <p className="text-xs text-slate-600 mt-1">{exp.description}</p>}
              </div>
            )
          })}
        </div>
      )}

      {/* Education */}
      {education?.length > 0 && education.some(e => e.degree || e.institution) && (
        <div className="mb-4">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5 border-b border-slate-300 pb-1">
            השכלה
          </h2>
          {education.map((edu, idx) => {
            if (!edu.degree && !edu.institution) return null
            return (
              <div key={idx} className="mb-2">
                <div className="flex justify-between">
                  <h3 className="text-sm font-bold text-slate-800">{edu.degree}{edu.field ? ` - ${edu.field}` : ''}</h3>
                  <span className="text-xs text-slate-400" dir="ltr">{edu.startDate}{(edu.startDate && edu.endDate) && ' - '}{edu.endDate}</span>
                </div>
                {edu.institution && <p className="text-xs text-slate-500 italic">{edu.institution}</p>}
                {edu.description && <p className="text-xs text-slate-600 mt-1">{edu.description}</p>}
              </div>
            )
          })}
        </div>
      )}

      {/* Skills */}
      {skills?.length > 0 && skills.some(s => s?.trim()) && (
        <div className="mb-4">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5 border-b border-slate-300 pb-1">
            כישורים
          </h2>
          <p className="text-xs text-slate-600">{skills.filter(s => s?.trim()).join(' • ')}</p>
        </div>
      )}

      {/* Languages */}
      {languages?.length > 0 && languages.some(l => l.language) && (
        <div className="mb-4">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5 border-b border-slate-300 pb-1">
            שפות
          </h2>
          <p className="text-xs text-slate-600">
            {languages.filter(l => l.language).map(l => `${l.language}${l.level ? ` (${l.level})` : ''}`).join(' • ')}
          </p>
        </div>
      )}

      {certifications?.length > 0 && certifications.some(c => c?.trim()) && (
        <div className="mb-4">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5 border-b border-slate-300 pb-1">
            הסמכות
          </h2>
          <p className="text-xs text-slate-600">{certifications.filter(c => c?.trim()).join(' • ')}</p>
        </div>
      )}

      {military && (
        <div className="mb-4">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5 border-b border-slate-300 pb-1">שירות צבאי</h2>
          <p className="text-xs text-slate-600">{military}</p>
        </div>
      )}

      {volunteer && (
        <div className="mb-4">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5 border-b border-slate-300 pb-1">התנדבות</h2>
          <p className="text-xs text-slate-600">{volunteer}</p>
        </div>
      )}
    </div>
  )
}

export function CreativeTemplate({ data }) {
  if (!data) return null
  const { personalInfo, experience, education, skills, languages, certifications, volunteer, military } = data

  return (
    <div className="font-[Heebo,sans-serif] text-slate-800" dir="rtl">
      {/* Header with gradient */}
      <div className="bg-gradient-to-l from-blue-600 to-violet-600 text-white p-8 rounded-t-lg">
        {personalInfo.fullName && (
          <h1 className="text-2xl font-extrabold mb-1">{personalInfo.fullName}</h1>
        )}
        {personalInfo.title && (
          <p className="text-sm font-medium text-blue-100 mb-3">{personalInfo.title}</p>
        )}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-blue-100">
          {personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{personalInfo.phone}</span>}
          {personalInfo.address && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{personalInfo.address}</span>}
        </div>
      </div>

      <div className="p-8">
        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-5 bg-violet-50 rounded-xl p-4">
            <p className="text-xs text-slate-600 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {/* Two Column Layout */}
        <div className="grid grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="col-span-2">
            {experience?.length > 0 && experience.some(e => e.position || e.company) && (
              <div className="mb-5">
                <h2 className="text-sm font-bold text-violet-700 mb-3 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-violet-100 flex items-center justify-center">
                    <ExternalLink className="w-3 h-3 text-violet-600" />
                  </div>
                  ניסיון תעסוקתי
                </h2>
                {experience.map((exp, idx) => {
                  if (!exp.position && !exp.company) return null
                  return (
                    <div key={idx} className="mb-3 pr-3 border-r-2 border-violet-200">
                      <h3 className="text-sm font-bold text-slate-800">{exp.position}</h3>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        {exp.company && <span>{exp.company}</span>}
                        <span dir="ltr">{exp.startDate}{(exp.startDate && (exp.endDate || exp.current)) && ' - '}{exp.current ? 'היום' : exp.endDate}</span>
                      </div>
                      {exp.description && <p className="text-xs text-slate-600 mt-1">{exp.description}</p>}
                    </div>
                  )
                })}
              </div>
            )}

            {education?.length > 0 && education.some(e => e.degree || e.institution) && (
              <div className="mb-5">
                <h2 className="text-sm font-bold text-violet-700 mb-3 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-violet-100 flex items-center justify-center">
                    <ExternalLink className="w-3 h-3 text-violet-600" />
                  </div>
                  השכלה
                </h2>
                {education.map((edu, idx) => {
                  if (!edu.degree && !edu.institution) return null
                  return (
                    <div key={idx} className="mb-2 pr-3 border-r-2 border-violet-200">
                      <h3 className="text-sm font-bold text-slate-800">{edu.degree}{edu.field ? ` - ${edu.field}` : ''}</h3>
                      <p className="text-xs text-slate-400">{edu.institution} {edu.startDate && `(${edu.startDate} - ${edu.endDate || ''})`}</p>
                      {edu.description && <p className="text-xs text-slate-600 mt-1">{edu.description}</p>}
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="col-span-1 space-y-5">
            {skills?.length > 0 && skills.some(s => s?.trim()) && (
              <div>
                <h2 className="text-sm font-bold text-violet-700 mb-2">כישורים</h2>
                <div className="flex flex-wrap gap-1.5">
                  {skills.filter(s => s?.trim()).map((skill, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-gradient-to-l from-blue-50 to-violet-50 text-violet-700 rounded text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {languages?.length > 0 && languages.some(l => l.language) && (
              <div>
                <h2 className="text-sm font-bold text-violet-700 mb-2">שפות</h2>
                <div className="space-y-1">
                  {languages.filter(l => l.language).map((lang, idx) => (
                    <div key={idx} className="text-xs text-slate-600">
                      <span className="font-semibold">{lang.language}</span>
                      {lang.level && <span className="text-slate-400"> - {lang.level}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {certifications?.length > 0 && certifications.some(c => c?.trim()) && (
              <div>
                <h2 className="text-sm font-bold text-violet-700 mb-2">הסמכות</h2>
                <ul className="space-y-0.5 text-xs text-slate-600">
                  {certifications.filter(c => c?.trim()).map((cert, idx) => (
                    <li key={idx}>• {cert}</li>
                  ))}
                </ul>
              </div>
            )}

            {military && (
              <div>
                <h2 className="text-sm font-bold text-violet-700 mb-2">שירות צבאי</h2>
                <p className="text-xs text-slate-600">{military}</p>
              </div>
            )}

            {volunteer && (
              <div>
                <h2 className="text-sm font-bold text-violet-700 mb-2">התנדבות</h2>
                <p className="text-xs text-slate-600">{volunteer}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function ElegantTemplate({ data }) {
  if (!data) return null
  const { personalInfo, experience, education, skills, languages, certifications, volunteer, military } = data

  return (
    <div className="font-[Heebo,sans-serif] text-slate-800" dir="rtl">
      {/* Header */}
      <div className="p-8 border-b-4 border-emerald-500">
        <div className="flex items-start justify-between">
          <div>
            {personalInfo.fullName && (
              <h1 className="text-2xl font-extrabold text-slate-900">{personalInfo.fullName}</h1>
            )}
            {personalInfo.title && (
              <p className="text-sm font-semibold text-emerald-600 mt-1">{personalInfo.title}</p>
            )}
          </div>
          <div className="text-left text-xs text-slate-500 space-y-0.5">
            {personalInfo.email && <p dir="ltr">{personalInfo.email}</p>}
            {personalInfo.phone && <p dir="ltr">{personalInfo.phone}</p>}
            {personalInfo.address && <p>{personalInfo.address}</p>}
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-5">
            <h2 className="text-sm font-bold text-emerald-700 mb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              תקציר מקצועי
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed pr-4">{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience?.length > 0 && experience.some(e => e.position || e.company) && (
          <div className="mb-5">
            <h2 className="text-sm font-bold text-emerald-700 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              ניסיון תעסוקתי
            </h2>
            {experience.map((exp, idx) => {
              if (!exp.position && !exp.company) return null
              return (
                <div key={idx} className="mb-3 pr-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">{exp.position}</h3>
                      {exp.company && <p className="text-xs text-emerald-600 font-medium">{exp.company}</p>}
                    </div>
                    <span className="text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded" dir="ltr">
                      {exp.startDate}{(exp.startDate && (exp.endDate || exp.current)) && ' - '}{exp.current ? 'היום' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && <p className="text-xs text-slate-600 mt-1">{exp.description}</p>}
                </div>
              )
            })}
          </div>
        )}

        {/* Education */}
        {education?.length > 0 && education.some(e => e.degree || e.institution) && (
          <div className="mb-5">
            <h2 className="text-sm font-bold text-emerald-700 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              השכלה
            </h2>
            {education.map((edu, idx) => {
              if (!edu.degree && !edu.institution) return null
              return (
                <div key={idx} className="mb-2 pr-4">
                  <div className="flex justify-between">
                    <h3 className="text-sm font-bold text-slate-800">{edu.degree}{edu.field ? ` - ${edu.field}` : ''}</h3>
                    <span className="text-xs text-slate-400" dir="ltr">{edu.startDate}{(edu.startDate && edu.endDate) && ' - '}{edu.endDate}</span>
                  </div>
                  {edu.institution && <p className="text-xs text-emerald-600 font-medium">{edu.institution}</p>}
                  {edu.description && <p className="text-xs text-slate-600 mt-1">{edu.description}</p>}
                </div>
              )
            })}
          </div>
        )}

        {/* Bottom Grid */}
        <div className="grid grid-cols-2 gap-6">
          {skills?.length > 0 && skills.some(s => s?.trim()) && (
            <div>
              <h2 className="text-sm font-bold text-emerald-700 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                כישורים
              </h2>
              <div className="flex flex-wrap gap-1.5 pr-4">
                {skills.filter(s => s?.trim()).map((skill, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-xs font-medium border border-emerald-100">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4">
            {languages?.length > 0 && languages.some(l => l.language) && (
              <div>
                <h2 className="text-sm font-bold text-emerald-700 mb-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  שפות
                </h2>
                <div className="space-y-0.5 pr-4">
                  {languages.filter(l => l.language).map((lang, idx) => (
                    <p key={idx} className="text-xs text-slate-600">
                      <span className="font-semibold">{lang.language}</span>
                      {lang.level && ` - ${lang.level}`}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {certifications?.length > 0 && certifications.some(c => c?.trim()) && (
              <div>
                <h2 className="text-sm font-bold text-emerald-700 mb-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  הסמכות
                </h2>
                <ul className="pr-4 text-xs text-slate-600 space-y-0.5">
                  {certifications.filter(c => c?.trim()).map((c, i) => <li key={i}>• {c}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>

        {military && (
          <div className="mt-4">
            <h2 className="text-sm font-bold text-emerald-700 mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              שירות צבאי
            </h2>
            <p className="text-xs text-slate-600 pr-4">{military}</p>
          </div>
        )}

        {volunteer && (
          <div className="mt-4">
            <h2 className="text-sm font-bold text-emerald-700 mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              התנדבות
            </h2>
            <p className="text-xs text-slate-600 pr-4">{volunteer}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export const templates = {
  modern: { name: 'מודרני', component: ModernTemplate, color: 'blue' },
  classic: { name: 'קלאסי', component: ClassicTemplate, color: 'slate' },
  creative: { name: 'יצירתי', component: CreativeTemplate, color: 'violet' },
  elegant: { name: 'אלגנטי', component: ElegantTemplate, color: 'emerald' },
}
