import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from 'docx'
import { saveAs } from 'file-saver'

export async function exportToPDF(elementId, fileName = 'cv') {
  const html2pdf = (await import('html2pdf.js')).default
  const element = document.getElementById(elementId)
  if (!element) return

  const opt = {
    margin: [10, 10, 10, 10],
    filename: `${fileName}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
      scrollY: 0,
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
    },
  }

  await html2pdf().set(opt).from(element).save()
}

export async function exportToWord(cvData, fileName = 'cv') {
  if (!cvData) return

  const { personalInfo, experience, education, skills, languages, certifications, volunteer, military } = cvData

  const children = []

  if (personalInfo.fullName) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: personalInfo.fullName, bold: true, size: 36, font: 'David' })],
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
        bidirectional: true,
      })
    )
  }

  if (personalInfo.title) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: personalInfo.title, size: 24, color: '2563EB', font: 'David' })],
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        bidirectional: true,
      })
    )
  }

  const contactParts = [personalInfo.email, personalInfo.phone, personalInfo.address].filter(Boolean)
  if (contactParts.length > 0) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: contactParts.join('  |  '), size: 20, color: '64748B', font: 'David' })],
        alignment: AlignmentType.CENTER,
        spacing: { after: 300 },
        bidirectional: true,
      })
    )
  }

  const addSectionHeader = (title) => {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: title, bold: true, size: 26, color: '2563EB', font: 'David' })],
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 100 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: '2563EB' } },
        bidirectional: true,
      })
    )
  }

  if (personalInfo.summary) {
    addSectionHeader('תקציר מקצועי')
    children.push(
      new Paragraph({
        children: [new TextRun({ text: personalInfo.summary, size: 20, font: 'David' })],
        spacing: { after: 200 },
        bidirectional: true,
      })
    )
  }

  if (experience?.length > 0 && experience.some(e => e.position || e.company)) {
    addSectionHeader('ניסיון תעסוקתי')
    experience.forEach((exp) => {
      if (!exp.position && !exp.company) return
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: exp.position || '', bold: true, size: 22, font: 'David' }),
            new TextRun({ text: exp.company ? ` | ${exp.company}` : '', size: 22, font: 'David' }),
          ],
          spacing: { before: 150, after: 50 },
          bidirectional: true,
        })
      )
      const dates = [exp.startDate, exp.current ? 'עד היום' : exp.endDate].filter(Boolean).join(' - ')
      if (dates) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: dates, size: 18, color: '64748B', italics: true, font: 'David' })],
            spacing: { after: 50 },
            bidirectional: true,
          })
        )
      }
      if (exp.description) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: exp.description, size: 20, font: 'David' })],
            spacing: { after: 150 },
            bidirectional: true,
          })
        )
      }
    })
  }

  if (education?.length > 0 && education.some(e => e.degree || e.institution)) {
    addSectionHeader('השכלה')
    education.forEach((edu) => {
      if (!edu.degree && !edu.institution) return
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: edu.degree || '', bold: true, size: 22, font: 'David' }),
            new TextRun({ text: edu.field ? ` - ${edu.field}` : '', size: 22, font: 'David' }),
          ],
          spacing: { before: 150, after: 50 },
          bidirectional: true,
        })
      )
      if (edu.institution) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: edu.institution, size: 20, color: '475569', font: 'David' })],
            spacing: { after: 50 },
            bidirectional: true,
          })
        )
      }
      const dates = [edu.startDate, edu.endDate].filter(Boolean).join(' - ')
      if (dates) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: dates, size: 18, color: '64748B', italics: true, font: 'David' })],
            spacing: { after: 100 },
            bidirectional: true,
          })
        )
      }
    })
  }

  if (skills?.length > 0 && skills.some(s => s.trim())) {
    addSectionHeader('כישורים וטכנולוגיות')
    children.push(
      new Paragraph({
        children: [new TextRun({ text: skills.filter(s => s.trim()).join('  •  '), size: 20, font: 'David' })],
        spacing: { after: 200 },
        bidirectional: true,
      })
    )
  }

  if (languages?.length > 0 && languages.some(l => l.language)) {
    addSectionHeader('שפות')
    languages.forEach((lang) => {
      if (!lang.language) return
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: lang.language, bold: true, size: 20, font: 'David' }),
            new TextRun({ text: lang.level ? ` - ${lang.level}` : '', size: 20, font: 'David' }),
          ],
          spacing: { after: 50 },
          bidirectional: true,
        })
      )
    })
  }

  if (certifications?.length > 0 && certifications.some(c => c.trim())) {
    addSectionHeader('הסמכות')
    certifications.filter(c => c.trim()).forEach((cert) => {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: `• ${cert}`, size: 20, font: 'David' })],
          spacing: { after: 50 },
          bidirectional: true,
        })
      )
    })
  }

  if (military) {
    addSectionHeader('שירות צבאי')
    children.push(
      new Paragraph({
        children: [new TextRun({ text: military, size: 20, font: 'David' })],
        spacing: { after: 200 },
        bidirectional: true,
      })
    )
  }

  if (volunteer) {
    addSectionHeader('התנדבות')
    children.push(
      new Paragraph({
        children: [new TextRun({ text: volunteer, size: 20, font: 'David' })],
        spacing: { after: 200 },
        bidirectional: true,
      })
    )
  }

  const doc = new Document({
    sections: [{
      properties: {},
      children,
    }],
  })

  const blob = await Packer.toBlob(doc)
  saveAs(blob, `${fileName}.docx`)
}
