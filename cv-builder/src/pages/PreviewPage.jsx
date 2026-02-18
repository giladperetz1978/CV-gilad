import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Download, FileText, File, Edit3, Sparkles, LayoutTemplate,
  ChevronRight, Loader2, Check
} from 'lucide-react'
import { templates } from '../templates/CVTemplates'
import { exportToPDF, exportToWord } from '../utils/exportUtils'
import { professionalRewriteCV } from '../utils/professionalRewrite'

export default function PreviewPage({ cvData, setCvData, selectedTemplate, setSelectedTemplate }) {
  const navigate = useNavigate()
  const [exporting, setExporting] = useState(null)
  const [exported, setExported] = useState(null)

  if (!cvData) {
    return (
      <div className="text-center py-20 animate-fade-in">
        <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-6">
          <FileText className="w-10 h-10 text-slate-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-700 mb-3">אין נתונים להצגה</h2>
        <p className="text-slate-500 mb-6">צור קורות חיים חדשים או העלה מסמך קיים</p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => navigate('/builder')}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            יצירה חדשה
          </button>
          <button
            onClick={() => navigate('/upload')}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium hover:border-blue-300 transition-colors"
          >
            העלאת מסמך
          </button>
        </div>
      </div>
    )
  }

  const TemplateComponent = templates[selectedTemplate]?.component

  const handleExportPDF = async () => {
    setExporting('pdf')
    try {
      await exportToPDF('cv-preview', cvData.personalInfo?.fullName || 'cv')
      setExported('pdf')
      setTimeout(() => setExported(null), 3000)
    } catch (err) {
      console.error('PDF export error:', err)
    } finally {
      setExporting(null)
    }
  }

  const handleExportWord = async () => {
    setExporting('word')
    try {
      await exportToWord(cvData, cvData.personalInfo?.fullName || 'cv')
      setExported('word')
      setTimeout(() => setExported(null), 3000)
    } catch (err) {
      console.error('Word export error:', err)
    } finally {
      setExporting(null)
    }
  }

  const handleRewrite = () => {
    const rewritten = professionalRewriteCV(cvData)
    setCvData(rewritten)
  }

  return (
    <div className="animate-fade-in">
      {/* Top Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">תצוגה מקדימה</h1>
          <p className="text-slate-500 text-sm mt-1">בדוק את קורות החיים שלך, בחר תבנית והורד</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => navigate('/builder')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            ערוך
          </button>
          <button
            onClick={handleRewrite}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            שכתוב מקצועי
          </button>
          <button
            onClick={handleExportPDF}
            disabled={exporting === 'pdf'}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-red-50 text-red-700 hover:bg-red-100 transition-colors disabled:opacity-50"
          >
            {exporting === 'pdf' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : exported === 'pdf' ? (
              <Check className="w-4 h-4" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            {exported === 'pdf' ? 'הורד!' : 'הורד PDF'}
          </button>
          <button
            onClick={handleExportWord}
            disabled={exporting === 'word'}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors disabled:opacity-50"
          >
            {exporting === 'word' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : exported === 'word' ? (
              <Check className="w-4 h-4" />
            ) : (
              <File className="w-4 h-4" />
            )}
            {exported === 'word' ? 'הורד!' : 'הורד Word'}
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Template Picker Sidebar */}
        <div className="lg:w-48 shrink-0">
          <div className="sticky top-24 bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
            <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
              <LayoutTemplate className="w-4 h-4" />
              בחר תבנית
            </h3>
            <div className="space-y-2">
              {Object.entries(templates).map(([key, tmpl]) => (
                <button
                  key={key}
                  onClick={() => setSelectedTemplate(key)}
                  className={`w-full text-right px-3 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                    selectedTemplate === key
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                      : 'text-slate-600 hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <span>{tmpl.name}</span>
                  {selectedTemplate === key && <ChevronRight className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CV Preview */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-[210mm]">
            <div
              id="cv-preview"
              className="bg-white shadow-xl rounded-lg border border-slate-200 overflow-hidden cv-print-area"
              style={{ minHeight: '297mm' }}
            >
              {TemplateComponent && <TemplateComponent data={cvData} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
