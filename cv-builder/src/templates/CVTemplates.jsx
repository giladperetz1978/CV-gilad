import React from 'react'

const colors = {
  blue600: '#2563eb',
  blue700: '#1d4ed8',
  blue100: '#dbeafe',
  blue50: '#eff6ff',
  violet600: '#7c3aed',
  violet700: '#6d28d9',
  violet100: '#ede9fe',
  violet50: '#f5f3ff',
  violet200: '#ddd6fe',
  emerald500: '#10b981',
  emerald600: '#059669',
  emerald700: '#047857',
  emerald50: '#ecfdf5',
  emerald100: '#d1fae5',
  slate900: '#0f172a',
  slate800: '#1e293b',
  slate700: '#334155',
  slate600: '#475569',
  slate500: '#64748b',
  slate400: '#94a3b8',
  slate300: '#cbd5e1',
  slate200: '#e2e8f0',
  slate100: '#f1f5f9',
  slate50: '#f8fafc',
  white: '#ffffff',
}

function ContactItem({ icon, text, dir }) {
  if (!text) return null
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: colors.slate500, direction: dir || 'inherit' }}>
      {icon && <span style={{ fontSize: '10px' }}>{icon}</span>}
      <span>{text}</span>
    </span>
  )
}

export function ModernTemplate({ data }) {
  if (!data) return null
  const { personalInfo, experience, education, skills, languages, certifications, volunteer, military } = data

  const sectionStyle = { fontSize: '13px', fontWeight: 700, color: colors.blue600, borderBottom: `2px solid ${colors.blue600}`, paddingBottom: '5px', marginTop: '18px', marginBottom: '10px' }
  const textStyle = { fontSize: '12px', color: colors.slate600, lineHeight: '1.6', margin: 0 }
  const titleStyle = { fontSize: '13px', fontWeight: 700, color: colors.slate800, margin: 0 }
  const subStyle = { fontSize: '11px', color: colors.slate500, margin: 0 }
  const dateStyle = { fontSize: '11px', color: colors.slate400, whiteSpace: 'nowrap' }

  return (
    <div style={{ padding: '32px', fontFamily: 'Heebo, Arial, sans-serif', color: colors.slate800, lineHeight: 1.6, direction: 'rtl', backgroundColor: colors.white }}>
      <div style={{ textAlign: 'center', marginBottom: '16px', paddingBottom: '16px', borderBottom: `1px solid ${colors.slate200}` }}>
        {personalInfo.fullName && <h1 style={{ fontSize: '24px', fontWeight: 800, color: colors.slate900, marginBottom: '4px', margin: 0 }}>{personalInfo.fullName}</h1>}
        {personalInfo.title && <p style={{ fontSize: '14px', fontWeight: 500, color: colors.blue600, marginBottom: '10px', margin: '4px 0 10px' }}>{personalInfo.title}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}>
          <ContactItem icon="✉" text={personalInfo.email} dir="ltr" />
          <ContactItem icon="📞" text={personalInfo.phone} dir="ltr" />
          <ContactItem icon="📍" text={personalInfo.address} />
          <ContactItem icon="🔗" text={personalInfo.linkedin} dir="ltr" />
          {personalInfo.website && <ContactItem icon="🌐" text={personalInfo.website} dir="ltr" />}
        </div>
      </div>

      {personalInfo.summary && (<><h2 style={sectionStyle}>תקציר מקצועי</h2><p style={textStyle}>{personalInfo.summary}</p></>)}

      {experience?.length > 0 && experience.some(e => e.position || e.company) && (
        <><h2 style={sectionStyle}>ניסיון תעסוקתי</h2>
        {experience.map((exp, idx) => {
          if (!exp.position && !exp.company) return null
          return (
            <div key={idx} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                <div>
                  <p style={titleStyle}>{exp.position}</p>
                  {exp.company && <p style={subStyle}>{exp.company}</p>}
                </div>
                <span style={dateStyle} dir="ltr">{exp.startDate}{(exp.startDate && (exp.endDate || exp.current)) && ' - '}{exp.current ? 'היום' : exp.endDate}</span>
              </div>
              {exp.description && <p style={{ ...textStyle, marginTop: '4px' }}>{exp.description}</p>}
            </div>
          )
        })}</>
      )}

      {education?.length > 0 && education.some(e => e.degree || e.institution) && (
        <><h2 style={sectionStyle}>השכלה</h2>
        {education.map((edu, idx) => {
          if (!edu.degree && !edu.institution) return null
          return (
            <div key={idx} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                <div>
                  <p style={titleStyle}>{edu.degree}{edu.field ? ` - ${edu.field}` : ''}</p>
                  {edu.institution && <p style={subStyle}>{edu.institution}</p>}
                </div>
                <span style={dateStyle} dir="ltr">{edu.startDate}{(edu.startDate && edu.endDate) && ' - '}{edu.endDate}</span>
              </div>
              {edu.description && <p style={{ ...textStyle, marginTop: '4px' }}>{edu.description}</p>}
            </div>
          )
        })}</>
      )}

      {skills?.length > 0 && skills.some(s => s?.trim()) && (
        <><h2 style={sectionStyle}>כישורים וטכנולוגיות</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {skills.filter(s => s?.trim()).map((skill, idx) => (
            <span key={idx} style={{ padding: '3px 10px', backgroundColor: colors.blue50, color: colors.blue700, borderRadius: '6px', fontSize: '11px', fontWeight: 500 }}>{skill}</span>
          ))}
        </div></>
      )}

      {languages?.length > 0 && languages.some(l => l.language) && (
        <><h2 style={sectionStyle}>שפות</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {languages.filter(l => l.language).map((lang, idx) => (
            <span key={idx} style={{ fontSize: '12px', color: colors.slate600 }}>
              <strong>{lang.language}</strong>{lang.level && ` - ${lang.level}`}
            </span>
          ))}
        </div></>
      )}

      {certifications?.length > 0 && certifications.some(c => c?.trim()) && (
        <><h2 style={sectionStyle}>הסמכות</h2>
        <ul style={{ paddingRight: '16px', margin: 0 }}>
          {certifications.filter(c => c?.trim()).map((cert, idx) => (
            <li key={idx} style={{ fontSize: '12px', color: colors.slate600, marginBottom: '2px' }}>{cert}</li>
          ))}
        </ul></>
      )}

      {military && (<><h2 style={sectionStyle}>שירות צבאי / לאומי</h2><p style={textStyle}>{military}</p></>)}
      {volunteer && (<><h2 style={sectionStyle}>התנדבות</h2><p style={textStyle}>{volunteer}</p></>)}
    </div>
  )
}

export function ClassicTemplate({ data }) {
  if (!data) return null
  const { personalInfo, experience, education, skills, languages, certifications, volunteer, military } = data

  const sectionStyle = { fontSize: '11px', fontWeight: 700, color: colors.slate900, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: `1px solid ${colors.slate300}`, paddingBottom: '4px', marginBottom: '8px', marginTop: '16px' }
  const textStyle = { fontSize: '12px', color: colors.slate600, lineHeight: '1.6', margin: 0 }
  const titleStyle = { fontSize: '13px', fontWeight: 700, color: colors.slate800, margin: 0 }

  return (
    <div style={{ padding: '32px', fontFamily: 'Heebo, Arial, sans-serif', color: colors.slate800, direction: 'rtl', backgroundColor: colors.white }}>
      <div style={{ marginBottom: '20px', paddingBottom: '16px', borderBottom: `2px solid ${colors.slate800}` }}>
        {personalInfo.fullName && <h1 style={{ fontSize: '24px', fontWeight: 800, color: colors.slate900, margin: '0 0 2px' }}>{personalInfo.fullName}</h1>}
        {personalInfo.title && <p style={{ fontSize: '14px', fontWeight: 600, color: colors.slate600, margin: '0 0 8px' }}>{personalInfo.title}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', fontSize: '11px', color: colors.slate500 }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>| {personalInfo.phone}</span>}
          {personalInfo.address && <span>| {personalInfo.address}</span>}
          {personalInfo.linkedin && <span>| {personalInfo.linkedin}</span>}
        </div>
      </div>

      {personalInfo.summary && (<><h2 style={sectionStyle}>תקציר מקצועי</h2><p style={textStyle}>{personalInfo.summary}</p></>)}

      {experience?.length > 0 && experience.some(e => e.position || e.company) && (
        <><h2 style={sectionStyle}>ניסיון תעסוקתי</h2>
        {experience.map((exp, idx) => {
          if (!exp.position && !exp.company) return null
          return (
            <div key={idx} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={titleStyle}>{exp.position}</p>
                <span style={{ fontSize: '11px', color: colors.slate400 }} dir="ltr">{exp.startDate}{(exp.startDate && (exp.endDate || exp.current)) && ' - '}{exp.current ? 'היום' : exp.endDate}</span>
              </div>
              {exp.company && <p style={{ fontSize: '11px', color: colors.slate500, fontStyle: 'italic', margin: 0 }}>{exp.company}</p>}
              {exp.description && <p style={{ ...textStyle, marginTop: '4px' }}>{exp.description}</p>}
            </div>
          )
        })}</>
      )}

      {education?.length > 0 && education.some(e => e.degree || e.institution) && (
        <><h2 style={sectionStyle}>השכלה</h2>
        {education.map((edu, idx) => {
          if (!edu.degree && !edu.institution) return null
          return (
            <div key={idx} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={titleStyle}>{edu.degree}{edu.field ? ` - ${edu.field}` : ''}</p>
                <span style={{ fontSize: '11px', color: colors.slate400 }} dir="ltr">{edu.startDate}{(edu.startDate && edu.endDate) && ' - '}{edu.endDate}</span>
              </div>
              {edu.institution && <p style={{ fontSize: '11px', color: colors.slate500, fontStyle: 'italic', margin: 0 }}>{edu.institution}</p>}
              {edu.description && <p style={{ ...textStyle, marginTop: '4px' }}>{edu.description}</p>}
            </div>
          )
        })}</>
      )}

      {skills?.length > 0 && skills.some(s => s?.trim()) && (<><h2 style={sectionStyle}>כישורים</h2><p style={textStyle}>{skills.filter(s => s?.trim()).join(' • ')}</p></>)}
      {languages?.length > 0 && languages.some(l => l.language) && (<><h2 style={sectionStyle}>שפות</h2><p style={textStyle}>{languages.filter(l => l.language).map(l => `${l.language}${l.level ? ` (${l.level})` : ''}`).join(' • ')}</p></>)}
      {certifications?.length > 0 && certifications.some(c => c?.trim()) && (<><h2 style={sectionStyle}>הסמכות</h2><p style={textStyle}>{certifications.filter(c => c?.trim()).join(' • ')}</p></>)}
      {military && (<><h2 style={sectionStyle}>שירות צבאי</h2><p style={textStyle}>{military}</p></>)}
      {volunteer && (<><h2 style={sectionStyle}>התנדבות</h2><p style={textStyle}>{volunteer}</p></>)}
    </div>
  )
}

export function CreativeTemplate({ data }) {
  if (!data) return null
  const { personalInfo, experience, education, skills, languages, certifications, volunteer, military } = data

  const sectionStyle = { fontSize: '13px', fontWeight: 700, color: colors.violet700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }
  const textStyle = { fontSize: '12px', color: colors.slate600, lineHeight: '1.6', margin: 0 }
  const titleStyle = { fontSize: '13px', fontWeight: 700, color: colors.slate800, margin: 0 }
  const dot = <span style={{ width: '8px', height: '8px', borderRadius: '4px', backgroundColor: colors.violet600, display: 'inline-block', flexShrink: 0 }}></span>

  return (
    <div style={{ fontFamily: 'Heebo, Arial, sans-serif', color: colors.slate800, direction: 'rtl', backgroundColor: colors.white }}>
      <div style={{ background: `linear-gradient(to left, ${colors.blue600}, ${colors.violet600})`, color: colors.white, padding: '32px', borderRadius: '8px 8px 0 0' }}>
        {personalInfo.fullName && <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 4px', color: colors.white }}>{personalInfo.fullName}</h1>}
        {personalInfo.title && <p style={{ fontSize: '14px', fontWeight: 500, color: colors.blue100, margin: '0 0 12px' }}>{personalInfo.title}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '11px', color: colors.blue100 }}>
          {personalInfo.email && <span>✉ {personalInfo.email}</span>}
          {personalInfo.phone && <span>📞 {personalInfo.phone}</span>}
          {personalInfo.address && <span>📍 {personalInfo.address}</span>}
        </div>
      </div>

      <div style={{ padding: '32px' }}>
        {personalInfo.summary && (
          <div style={{ marginBottom: '20px', backgroundColor: colors.violet50, borderRadius: '12px', padding: '16px' }}>
            <p style={textStyle}>{personalInfo.summary}</p>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          <div>
            {experience?.length > 0 && experience.some(e => e.position || e.company) && (
              <div style={{ marginBottom: '20px' }}>
                <h2 style={sectionStyle}>{dot} ניסיון תעסוקתי</h2>
                {experience.map((exp, idx) => {
                  if (!exp.position && !exp.company) return null
                  return (
                    <div key={idx} style={{ marginBottom: '12px', paddingRight: '12px', borderRight: `2px solid ${colors.violet200}` }}>
                      <p style={titleStyle}>{exp.position}</p>
                      <div style={{ display: 'flex', gap: '8px', fontSize: '11px', color: colors.slate400 }}>
                        {exp.company && <span>{exp.company}</span>}
                        <span dir="ltr">{exp.startDate}{(exp.startDate && (exp.endDate || exp.current)) && ' - '}{exp.current ? 'היום' : exp.endDate}</span>
                      </div>
                      {exp.description && <p style={{ ...textStyle, marginTop: '4px' }}>{exp.description}</p>}
                    </div>
                  )
                })}
              </div>
            )}

            {education?.length > 0 && education.some(e => e.degree || e.institution) && (
              <div style={{ marginBottom: '20px' }}>
                <h2 style={sectionStyle}>{dot} השכלה</h2>
                {education.map((edu, idx) => {
                  if (!edu.degree && !edu.institution) return null
                  return (
                    <div key={idx} style={{ marginBottom: '8px', paddingRight: '12px', borderRight: `2px solid ${colors.violet200}` }}>
                      <p style={titleStyle}>{edu.degree}{edu.field ? ` - ${edu.field}` : ''}</p>
                      <p style={{ fontSize: '11px', color: colors.slate400, margin: 0 }}>{edu.institution} {edu.startDate && `(${edu.startDate} - ${edu.endDate || ''})`}</p>
                      {edu.description && <p style={{ ...textStyle, marginTop: '4px' }}>{edu.description}</p>}
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <div>
            {skills?.length > 0 && skills.some(s => s?.trim()) && (
              <div style={{ marginBottom: '20px' }}>
                <h2 style={{ ...sectionStyle, fontSize: '12px' }}>כישורים</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {skills.filter(s => s?.trim()).map((skill, idx) => (
                    <span key={idx} style={{ padding: '2px 8px', backgroundColor: colors.violet50, color: colors.violet700, borderRadius: '4px', fontSize: '11px', fontWeight: 500 }}>{skill}</span>
                  ))}
                </div>
              </div>
            )}

            {languages?.length > 0 && languages.some(l => l.language) && (
              <div style={{ marginBottom: '20px' }}>
                <h2 style={{ ...sectionStyle, fontSize: '12px' }}>שפות</h2>
                {languages.filter(l => l.language).map((lang, idx) => (
                  <div key={idx} style={{ fontSize: '11px', color: colors.slate600, marginBottom: '4px' }}>
                    <strong>{lang.language}</strong>{lang.level && <span style={{ color: colors.slate400 }}> - {lang.level}</span>}
                  </div>
                ))}
              </div>
            )}

            {certifications?.length > 0 && certifications.some(c => c?.trim()) && (
              <div style={{ marginBottom: '20px' }}>
                <h2 style={{ ...sectionStyle, fontSize: '12px' }}>הסמכות</h2>
                {certifications.filter(c => c?.trim()).map((cert, idx) => (
                  <div key={idx} style={{ fontSize: '11px', color: colors.slate600, marginBottom: '2px' }}>• {cert}</div>
                ))}
              </div>
            )}

            {military && (<div style={{ marginBottom: '20px' }}><h2 style={{ ...sectionStyle, fontSize: '12px' }}>שירות צבאי</h2><p style={textStyle}>{military}</p></div>)}
            {volunteer && (<div style={{ marginBottom: '20px' }}><h2 style={{ ...sectionStyle, fontSize: '12px' }}>התנדבות</h2><p style={textStyle}>{volunteer}</p></div>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export function ElegantTemplate({ data }) {
  if (!data) return null
  const { personalInfo, experience, education, skills, languages, certifications, volunteer, military } = data

  const sectionStyle = { fontSize: '13px', fontWeight: 700, color: colors.emerald700, marginBottom: '8px', marginTop: '18px', display: 'flex', alignItems: 'center', gap: '8px' }
  const textStyle = { fontSize: '12px', color: colors.slate600, lineHeight: '1.6', margin: 0 }
  const titleStyle = { fontSize: '13px', fontWeight: 700, color: colors.slate800, margin: 0 }
  const dot = <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: colors.emerald500, display: 'inline-block', flexShrink: 0 }}></span>

  return (
    <div style={{ fontFamily: 'Heebo, Arial, sans-serif', color: colors.slate800, direction: 'rtl', backgroundColor: colors.white }}>
      <div style={{ padding: '32px', borderBottom: `4px solid ${colors.emerald500}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            {personalInfo.fullName && <h1 style={{ fontSize: '24px', fontWeight: 800, color: colors.slate900, margin: 0 }}>{personalInfo.fullName}</h1>}
            {personalInfo.title && <p style={{ fontSize: '14px', fontWeight: 600, color: colors.emerald600, margin: '4px 0 0' }}>{personalInfo.title}</p>}
          </div>
          <div style={{ textAlign: 'left', fontSize: '11px', color: colors.slate500 }}>
            {personalInfo.email && <p style={{ margin: '0 0 2px' }} dir="ltr">{personalInfo.email}</p>}
            {personalInfo.phone && <p style={{ margin: '0 0 2px' }} dir="ltr">{personalInfo.phone}</p>}
            {personalInfo.address && <p style={{ margin: 0 }}>{personalInfo.address}</p>}
          </div>
        </div>
      </div>

      <div style={{ padding: '32px' }}>
        {personalInfo.summary && (<><h2 style={sectionStyle}>{dot} תקציר מקצועי</h2><p style={{ ...textStyle, paddingRight: '16px' }}>{personalInfo.summary}</p></>)}

        {experience?.length > 0 && experience.some(e => e.position || e.company) && (
          <><h2 style={sectionStyle}>{dot} ניסיון תעסוקתי</h2>
          {experience.map((exp, idx) => {
            if (!exp.position && !exp.company) return null
            return (
              <div key={idx} style={{ marginBottom: '12px', paddingRight: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={titleStyle}>{exp.position}</p>
                    {exp.company && <p style={{ fontSize: '11px', color: colors.emerald600, fontWeight: 500, margin: 0 }}>{exp.company}</p>}
                  </div>
                  <span style={{ fontSize: '11px', color: colors.slate400, backgroundColor: colors.slate50, padding: '2px 8px', borderRadius: '4px' }} dir="ltr">
                    {exp.startDate}{(exp.startDate && (exp.endDate || exp.current)) && ' - '}{exp.current ? 'היום' : exp.endDate}
                  </span>
                </div>
                {exp.description && <p style={{ ...textStyle, marginTop: '4px' }}>{exp.description}</p>}
              </div>
            )
          })}</>
        )}

        {education?.length > 0 && education.some(e => e.degree || e.institution) && (
          <><h2 style={sectionStyle}>{dot} השכלה</h2>
          {education.map((edu, idx) => {
            if (!edu.degree && !edu.institution) return null
            return (
              <div key={idx} style={{ marginBottom: '8px', paddingRight: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p style={titleStyle}>{edu.degree}{edu.field ? ` - ${edu.field}` : ''}</p>
                  <span style={{ fontSize: '11px', color: colors.slate400 }} dir="ltr">{edu.startDate}{(edu.startDate && edu.endDate) && ' - '}{edu.endDate}</span>
                </div>
                {edu.institution && <p style={{ fontSize: '11px', color: colors.emerald600, fontWeight: 500, margin: 0 }}>{edu.institution}</p>}
                {edu.description && <p style={{ ...textStyle, marginTop: '4px' }}>{edu.description}</p>}
              </div>
            )
          })}</>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '16px' }}>
          {skills?.length > 0 && skills.some(s => s?.trim()) && (
            <div>
              <h2 style={{ ...sectionStyle, marginTop: 0 }}>{dot} כישורים</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', paddingRight: '16px' }}>
                {skills.filter(s => s?.trim()).map((skill, idx) => (
                  <span key={idx} style={{ padding: '2px 8px', backgroundColor: colors.emerald50, color: colors.emerald700, borderRadius: '4px', fontSize: '11px', fontWeight: 500, border: `1px solid ${colors.emerald100}` }}>{skill}</span>
                ))}
              </div>
            </div>
          )}
          <div>
            {languages?.length > 0 && languages.some(l => l.language) && (
              <div style={{ marginBottom: '16px' }}>
                <h2 style={{ ...sectionStyle, marginTop: 0 }}>{dot} שפות</h2>
                {languages.filter(l => l.language).map((lang, idx) => (
                  <p key={idx} style={{ fontSize: '12px', color: colors.slate600, margin: '0 0 2px', paddingRight: '16px' }}>
                    <strong>{lang.language}</strong>{lang.level && ` - ${lang.level}`}
                  </p>
                ))}
              </div>
            )}
            {certifications?.length > 0 && certifications.some(c => c?.trim()) && (
              <div>
                <h2 style={{ ...sectionStyle, marginTop: 0 }}>{dot} הסמכות</h2>
                {certifications.filter(c => c?.trim()).map((c, i) => (
                  <div key={i} style={{ fontSize: '11px', color: colors.slate600, paddingRight: '16px', marginBottom: '2px' }}>• {c}</div>
                ))}
              </div>
            )}
          </div>
        </div>

        {military && (<><h2 style={sectionStyle}>{dot} שירות צבאי</h2><p style={{ ...textStyle, paddingRight: '16px' }}>{military}</p></>)}
        {volunteer && (<><h2 style={sectionStyle}>{dot} התנדבות</h2><p style={{ ...textStyle, paddingRight: '16px' }}>{volunteer}</p></>)}
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
