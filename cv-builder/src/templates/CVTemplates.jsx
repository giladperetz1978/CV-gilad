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

export function ExecutiveTemplate({ data }) {
  if (!data) return null
  const { personalInfo, experience, education, skills, languages, certifications, volunteer, military } = data

  const navy = '#1e293b'
  const gold = '#b45309'
  const goldLight = '#fef3c7'
  const sideW = '35%'

  const sectionStyle = { fontSize: '12px', fontWeight: 700, color: gold, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px', marginTop: '18px' }
  const textStyle = { fontSize: '11px', color: '#e2e8f0', lineHeight: '1.6', margin: 0 }
  const mainText = { fontSize: '12px', color: colors.slate600, lineHeight: '1.6', margin: 0 }
  const mainTitle = { fontSize: '13px', fontWeight: 700, color: colors.slate800, margin: 0 }
  const mainSection = { fontSize: '13px', fontWeight: 700, color: navy, borderBottom: `2px solid ${gold}`, paddingBottom: '5px', marginTop: '18px', marginBottom: '10px' }

  return (
    <div style={{ fontFamily: 'Heebo, Arial, sans-serif', direction: 'rtl', display: 'flex', minHeight: '100%', backgroundColor: colors.white }}>
      {/* Sidebar */}
      <div style={{ width: sideW, backgroundColor: navy, color: '#e2e8f0', padding: '32px 20px', flexShrink: 0 }}>
        {personalInfo.fullName && <h1 style={{ fontSize: '22px', fontWeight: 800, color: colors.white, margin: '0 0 4px', lineHeight: 1.3 }}>{personalInfo.fullName}</h1>}
        {personalInfo.title && <p style={{ fontSize: '12px', color: gold, fontWeight: 600, margin: '0 0 20px' }}>{personalInfo.title}</p>}

        <div style={{ borderTop: `1px solid ${gold}40`, paddingTop: '16px', marginBottom: '16px' }}>
          <h2 style={{ ...sectionStyle, marginTop: 0 }}>פרטי קשר</h2>
          {personalInfo.email && <p style={{ ...textStyle, marginBottom: '4px' }} dir="ltr">{personalInfo.email}</p>}
          {personalInfo.phone && <p style={{ ...textStyle, marginBottom: '4px' }} dir="ltr">{personalInfo.phone}</p>}
          {personalInfo.address && <p style={{ ...textStyle, marginBottom: '4px' }}>{personalInfo.address}</p>}
          {personalInfo.linkedin && <p style={{ ...textStyle, marginBottom: '4px' }} dir="ltr">{personalInfo.linkedin}</p>}
        </div>

        {skills?.length > 0 && skills.some(s => s?.trim()) && (
          <div style={{ borderTop: `1px solid ${gold}40`, paddingTop: '16px', marginBottom: '16px' }}>
            <h2 style={{ ...sectionStyle, marginTop: 0 }}>כישורים</h2>
            {skills.filter(s => s?.trim()).map((skill, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '5px' }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: gold, flexShrink: 0 }}></span>
                <span style={{ fontSize: '11px', color: '#cbd5e1' }}>{skill}</span>
              </div>
            ))}
          </div>
        )}

        {languages?.length > 0 && languages.some(l => l.language) && (
          <div style={{ borderTop: `1px solid ${gold}40`, paddingTop: '16px', marginBottom: '16px' }}>
            <h2 style={{ ...sectionStyle, marginTop: 0 }}>שפות</h2>
            {languages.filter(l => l.language).map((lang, idx) => (
              <p key={idx} style={{ ...textStyle, marginBottom: '4px' }}>
                <strong style={{ color: colors.white }}>{lang.language}</strong>{lang.level && ` — ${lang.level}`}
              </p>
            ))}
          </div>
        )}

        {certifications?.length > 0 && certifications.some(c => c?.trim()) && (
          <div style={{ borderTop: `1px solid ${gold}40`, paddingTop: '16px' }}>
            <h2 style={{ ...sectionStyle, marginTop: 0 }}>הסמכות</h2>
            {certifications.filter(c => c?.trim()).map((c, i) => (
              <p key={i} style={{ ...textStyle, marginBottom: '3px' }}>• {c}</p>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '32px 28px' }}>
        {personalInfo.summary && (<><h2 style={mainSection}>תקציר מקצועי</h2><p style={mainText}>{personalInfo.summary}</p></>)}

        {experience?.length > 0 && experience.some(e => e.position || e.company) && (
          <><h2 style={mainSection}>ניסיון תעסוקתי</h2>
          {experience.map((exp, idx) => {
            if (!exp.position && !exp.company) return null
            return (
              <div key={idx} style={{ marginBottom: '14px', paddingRight: '12px', borderRight: `3px solid ${gold}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={mainTitle}>{exp.position}</p>
                    {exp.company && <p style={{ fontSize: '11px', color: gold, fontWeight: 600, margin: 0 }}>{exp.company}</p>}
                  </div>
                  <span style={{ fontSize: '11px', color: colors.slate400, backgroundColor: goldLight, padding: '2px 8px', borderRadius: '4px', whiteSpace: 'nowrap' }} dir="ltr">
                    {exp.startDate}{(exp.startDate && (exp.endDate || exp.current)) && ' - '}{exp.current ? 'היום' : exp.endDate}
                  </span>
                </div>
                {exp.description && <p style={{ ...mainText, marginTop: '4px' }}>{exp.description}</p>}
              </div>
            )
          })}</>
        )}

        {education?.length > 0 && education.some(e => e.degree || e.institution) && (
          <><h2 style={mainSection}>השכלה</h2>
          {education.map((edu, idx) => {
            if (!edu.degree && !edu.institution) return null
            return (
              <div key={idx} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p style={mainTitle}>{edu.degree}{edu.field ? ` - ${edu.field}` : ''}</p>
                  <span style={{ fontSize: '11px', color: colors.slate400 }} dir="ltr">{edu.startDate}{(edu.startDate && edu.endDate) && ' - '}{edu.endDate}</span>
                </div>
                {edu.institution && <p style={{ fontSize: '11px', color: gold, fontWeight: 500, margin: 0 }}>{edu.institution}</p>}
              </div>
            )
          })}</>
        )}

        {military && (<><h2 style={mainSection}>שירות צבאי</h2><p style={mainText}>{military}</p></>)}
        {volunteer && (<><h2 style={mainSection}>התנדבות</h2><p style={mainText}>{volunteer}</p></>)}
      </div>
    </div>
  )
}

export function MinimalTemplate({ data }) {
  if (!data) return null
  const { personalInfo, experience, education, skills, languages, certifications, volunteer, military } = data

  const accent = '#6366f1'
  const light = '#eef2ff'
  const line = '#e2e8f0'

  const sectionStyle = { fontSize: '10px', fontWeight: 600, color: accent, textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '24px', marginBottom: '12px', paddingBottom: '6px', borderBottom: `1px solid ${line}` }
  const textStyle = { fontSize: '11.5px', color: '#475569', lineHeight: '1.7', margin: 0 }
  const titleStyle = { fontSize: '12.5px', fontWeight: 600, color: '#1e293b', margin: 0 }

  return (
    <div style={{ padding: '40px 36px', fontFamily: 'Heebo, Arial, sans-serif', color: '#1e293b', direction: 'rtl', backgroundColor: colors.white }}>
      <div style={{ textAlign: 'center', marginBottom: '8px' }}>
        {personalInfo.fullName && <h1 style={{ fontSize: '26px', fontWeight: 300, letterSpacing: '0.05em', color: '#0f172a', margin: '0 0 6px' }}>{personalInfo.fullName}</h1>}
        {personalInfo.title && <p style={{ fontSize: '13px', fontWeight: 400, color: accent, margin: '0 0 12px', letterSpacing: '0.03em' }}>{personalInfo.title}</p>}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '11px', color: '#94a3b8' }}>
          {personalInfo.email && <span dir="ltr">{personalInfo.email}</span>}
          {personalInfo.phone && <span dir="ltr">{personalInfo.phone}</span>}
          {personalInfo.address && <span>{personalInfo.address}</span>}
        </div>
      </div>

      {personalInfo.summary && (<><h2 style={sectionStyle}>תקציר</h2><p style={textStyle}>{personalInfo.summary}</p></>)}

      {experience?.length > 0 && experience.some(e => e.position || e.company) && (
        <><h2 style={sectionStyle}>ניסיון</h2>
        {experience.map((exp, idx) => {
          if (!exp.position && !exp.company) return null
          return (
            <div key={idx} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <p style={titleStyle}>{exp.position}{exp.company ? ` · ${exp.company}` : ''}</p>
                <span style={{ fontSize: '10px', color: '#94a3b8', letterSpacing: '0.05em' }} dir="ltr">
                  {exp.startDate}{(exp.startDate && (exp.endDate || exp.current)) && '–'}{exp.current ? 'היום' : exp.endDate}
                </span>
              </div>
              {exp.description && <p style={{ ...textStyle, marginTop: '3px' }}>{exp.description}</p>}
            </div>
          )
        })}</>
      )}

      {education?.length > 0 && education.some(e => e.degree || e.institution) && (
        <><h2 style={sectionStyle}>השכלה</h2>
        {education.map((edu, idx) => {
          if (!edu.degree && !edu.institution) return null
          return (
            <div key={idx} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div>
                <p style={titleStyle}>{edu.degree}{edu.field ? ` — ${edu.field}` : ''}</p>
                {edu.institution && <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>{edu.institution}</p>}
              </div>
              <span style={{ fontSize: '10px', color: '#94a3b8' }} dir="ltr">{edu.startDate}{(edu.startDate && edu.endDate) && '–'}{edu.endDate}</span>
            </div>
          )
        })}</>
      )}

      <div style={{ display: 'flex', gap: '32px', marginTop: '8px' }}>
        <div style={{ flex: 1 }}>
          {skills?.length > 0 && skills.some(s => s?.trim()) && (
            <><h2 style={sectionStyle}>כישורים</h2>
            <p style={{ ...textStyle, fontSize: '11px' }}>{skills.filter(s => s?.trim()).join(' · ')}</p></>
          )}
        </div>
        <div style={{ flex: 1 }}>
          {languages?.length > 0 && languages.some(l => l.language) && (
            <><h2 style={sectionStyle}>שפות</h2>
            {languages.filter(l => l.language).map((lang, idx) => (
              <p key={idx} style={{ fontSize: '11px', color: '#475569', margin: '0 0 2px' }}>{lang.language}{lang.level && ` — ${lang.level}`}</p>
            ))}</>
          )}
        </div>
      </div>

      {certifications?.length > 0 && certifications.some(c => c?.trim()) && (
        <><h2 style={sectionStyle}>הסמכות</h2>
        <p style={{ ...textStyle, fontSize: '11px' }}>{certifications.filter(c => c?.trim()).join(' · ')}</p></>
      )}

      {military && (<><h2 style={sectionStyle}>שירות צבאי</h2><p style={textStyle}>{military}</p></>)}
      {volunteer && (<><h2 style={sectionStyle}>התנדבות</h2><p style={textStyle}>{volunteer}</p></>)}
    </div>
  )
}

export function BoldTemplate({ data }) {
  if (!data) return null
  const { personalInfo, experience, education, skills, languages, certifications, volunteer, military } = data

  const red = '#dc2626'
  const redDark = '#991b1b'
  const redLight = '#fef2f2'
  const dark = '#18181b'

  const sectionStyle = { fontSize: '16px', fontWeight: 800, color: dark, margin: '0 0 12px', paddingTop: '20px', display: 'flex', alignItems: 'center', gap: '8px' }
  const bar = <span style={{ width: '28px', height: '4px', backgroundColor: red, borderRadius: '2px', display: 'inline-block', flexShrink: 0 }}></span>
  const textStyle = { fontSize: '12px', color: '#52525b', lineHeight: '1.65', margin: 0 }
  const titleStyle = { fontSize: '13px', fontWeight: 700, color: dark, margin: 0 }

  return (
    <div style={{ fontFamily: 'Heebo, Arial, sans-serif', color: dark, direction: 'rtl', backgroundColor: colors.white }}>
      {/* Header */}
      <div style={{ backgroundColor: dark, padding: '28px 32px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '120px', height: '100%', backgroundColor: red }}></div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          {personalInfo.fullName && <h1 style={{ fontSize: '28px', fontWeight: 900, color: colors.white, margin: '0 0 2px' }}>{personalInfo.fullName}</h1>}
          {personalInfo.title && <p style={{ fontSize: '14px', fontWeight: 500, color: '#a1a1aa', margin: '0 0 12px' }}>{personalInfo.title}</p>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '11px', color: '#a1a1aa' }}>
            {personalInfo.email && <span dir="ltr">✉ {personalInfo.email}</span>}
            {personalInfo.phone && <span dir="ltr">📞 {personalInfo.phone}</span>}
            {personalInfo.address && <span>📍 {personalInfo.address}</span>}
          </div>
        </div>
      </div>

      <div style={{ padding: '24px 32px' }}>
        {personalInfo.summary && (
          <div style={{ backgroundColor: redLight, borderRight: `4px solid ${red}`, padding: '14px 16px', marginBottom: '8px', borderRadius: '0 8px 8px 0' }}>
            <p style={{ ...textStyle, color: '#3f3f46' }}>{personalInfo.summary}</p>
          </div>
        )}

        {experience?.length > 0 && experience.some(e => e.position || e.company) && (
          <><h2 style={sectionStyle}>{bar} ניסיון תעסוקתי</h2>
          {experience.map((exp, idx) => {
            if (!exp.position && !exp.company) return null
            return (
              <div key={idx} style={{ marginBottom: '14px', paddingRight: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={titleStyle}>{exp.position}</p>
                    {exp.company && <p style={{ fontSize: '12px', color: red, fontWeight: 600, margin: 0 }}>{exp.company}</p>}
                  </div>
                  <span style={{ fontSize: '11px', color: colors.white, backgroundColor: dark, padding: '2px 10px', borderRadius: '12px', whiteSpace: 'nowrap' }} dir="ltr">
                    {exp.startDate}{(exp.startDate && (exp.endDate || exp.current)) && ' - '}{exp.current ? 'היום' : exp.endDate}
                  </span>
                </div>
                {exp.description && <p style={{ ...textStyle, marginTop: '4px' }}>{exp.description}</p>}
              </div>
            )
          })}</>
        )}

        {education?.length > 0 && education.some(e => e.degree || e.institution) && (
          <><h2 style={sectionStyle}>{bar} השכלה</h2>
          {education.map((edu, idx) => {
            if (!edu.degree && !edu.institution) return null
            return (
              <div key={idx} style={{ marginBottom: '10px', paddingRight: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p style={titleStyle}>{edu.degree}{edu.field ? ` - ${edu.field}` : ''}</p>
                  <span style={{ fontSize: '11px', color: '#71717a' }} dir="ltr">{edu.startDate}{(edu.startDate && edu.endDate) && '-'}{edu.endDate}</span>
                </div>
                {edu.institution && <p style={{ fontSize: '11px', color: red, fontWeight: 500, margin: 0 }}>{edu.institution}</p>}
              </div>
            )
          })}</>
        )}

        <div style={{ display: 'flex', gap: '24px' }}>
          <div style={{ flex: 2 }}>
            {skills?.length > 0 && skills.some(s => s?.trim()) && (
              <><h2 style={{ ...sectionStyle, fontSize: '14px' }}>{bar} כישורים</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', paddingRight: '16px' }}>
                {skills.filter(s => s?.trim()).map((skill, idx) => (
                  <span key={idx} style={{ padding: '4px 12px', backgroundColor: dark, color: colors.white, borderRadius: '16px', fontSize: '10px', fontWeight: 600 }}>{skill}</span>
                ))}
              </div></>
            )}
          </div>
          <div style={{ flex: 1 }}>
            {languages?.length > 0 && languages.some(l => l.language) && (
              <><h2 style={{ ...sectionStyle, fontSize: '14px' }}>{bar} שפות</h2>
              {languages.filter(l => l.language).map((lang, idx) => (
                <p key={idx} style={{ fontSize: '12px', color: '#3f3f46', margin: '0 0 3px', paddingRight: '16px' }}>
                  <strong>{lang.language}</strong>{lang.level && ` — ${lang.level}`}
                </p>
              ))}</>
            )}
          </div>
        </div>

        {certifications?.length > 0 && certifications.some(c => c?.trim()) && (
          <><h2 style={{ ...sectionStyle, fontSize: '14px' }}>{bar} הסמכות</h2>
          <div style={{ paddingRight: '16px' }}>
            {certifications.filter(c => c?.trim()).map((c, i) => (
              <span key={i} style={{ display: 'inline-block', padding: '3px 10px', backgroundColor: redLight, color: redDark, borderRadius: '4px', fontSize: '11px', fontWeight: 500, marginLeft: '6px', marginBottom: '4px' }}>{c}</span>
            ))}
          </div></>
        )}

        {military && (<><h2 style={{ ...sectionStyle, fontSize: '14px' }}>{bar} שירות צבאי</h2><p style={{ ...textStyle, paddingRight: '16px' }}>{military}</p></>)}
        {volunteer && (<><h2 style={{ ...sectionStyle, fontSize: '14px' }}>{bar} התנדבות</h2><p style={{ ...textStyle, paddingRight: '16px' }}>{volunteer}</p></>)}
      </div>
    </div>
  )
}

export const templates = {
  modern: { name: 'מודרני', component: ModernTemplate, color: 'blue' },
  classic: { name: 'קלאסי', component: ClassicTemplate, color: 'slate' },
  creative: { name: 'יצירתי', component: CreativeTemplate, color: 'violet' },
  elegant: { name: 'אלגנטי', component: ElegantTemplate, color: 'emerald' },
  executive: { name: 'מנהלים', component: ExecutiveTemplate, color: 'amber' },
  minimal: { name: 'מינימלי', component: MinimalTemplate, color: 'indigo' },
  bold: { name: 'נועז', component: BoldTemplate, color: 'red' },
}
