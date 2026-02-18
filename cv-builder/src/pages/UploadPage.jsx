import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, FileCheck, AlertCircle, Loader2, Sparkles, ArrowLeft, Brain, Key, Eye, EyeOff } from 'lucide-react'
import { parsePDF, parseWord, textToCvData } from '../utils/fileParser'
import { parseWithAI } from '../utils/aiParser'
import { professionalRewriteCV } from '../utils/professionalRewrite'

export default function UploadPage({ setCvData, setSelectedTemplate }) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [error, setError] = useState(null)
  const [fileName, setFileName] = useState(null)
  const [rawText, setRawText] = useState(null)
  const [parsed, setParsed] = useState(false)
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('openai_key') || '')
  const [showKey, setShowKey] = useState(false)
  const [showAiPanel, setShowAiPanel] = useState(false)

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return

    const file = acceptedFiles[0]
    setFileName(file.name)
    setError(null)
    setLoading(true)
    setParsed(false)
    setRawText(null)

    try {
      let text = ''

      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        text = await parsePDF(file)
      } else if (
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.type === 'application/msword' ||
        file.name.endsWith('.docx') ||
        file.name.endsWith('.doc')
      ) {
        text = await parseWord(file)
      } else {
        throw new Error('פורמט קובץ לא נתמך. אנא העלה קובץ PDF או Word.')
      }

      if (!text || text.trim().length === 0) {
        throw new Error('לא ניתן לחלץ טקסט מהקובץ. אנא נסה קובץ אחר.')
      }

      setRawText(text)
      const cvData = textToCvData(text)
      setCvData(cvData)
      setParsed(true)
    } catch (err) {
      console.error('Error parsing file:', err)
      setError(err.message || 'שגיאה בקריאת הקובץ. אנא נסה שנית.')
    } finally {
      setLoading(false)
    }
  }, [setCvData])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
  })

  const handleAIParse = async () => {
    if (!rawText || !apiKey.trim()) return

    setAiLoading(true)
    setError(null)

    try {
      localStorage.setItem('openai_key', apiKey.trim())
      const cvData = await parseWithAI(rawText, apiKey.trim())
      setCvData(cvData)
    } catch (err) {
      console.error('AI parse error:', err)
      setError(err.message || 'שגיאה בניתוח AI. נסה שנית.')
    } finally {
      setAiLoading(false)
    }
  }

  const handleRewriteAndEdit = () => {
    setCvData(prev => professionalRewriteCV(prev))
    navigate('/builder')
  }

  const handleGoToPreview = () => {
    navigate('/preview')
  }

  const handleGoToEdit = () => {
    navigate('/builder')
  }

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">העלאת מסמך קיים</h1>
        <p className="text-slate-500 text-sm mt-1">העלה קובץ PDF או Word ואנחנו נעצב אותו מחדש</p>
      </div>

      {/* Upload Dropzone */}
      <div
        {...getRootProps()}
        className={`relative bg-white rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer transition-all duration-300 ${
          isDragActive
            ? 'border-blue-400 bg-blue-50/50 scale-[1.01]'
            : 'border-slate-200 hover:border-blue-300 hover:bg-blue-50/30'
        }`}
      >
        <input {...getInputProps()} />

        {loading ? (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
            <div>
              <p className="text-lg font-semibold text-slate-700">מנתח את המסמך...</p>
              <p className="text-sm text-slate-500 mt-1">אנא המתן, זה יכול לקחת כמה שניות</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${
              isDragActive ? 'bg-blue-100' : 'bg-slate-100'
            }`}>
              <Upload className={`w-8 h-8 ${isDragActive ? 'text-blue-500' : 'text-slate-400'}`} />
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-700">
                {isDragActive ? 'שחרר את הקובץ כאן' : 'גרור קובץ לכאן או לחץ לבחירה'}
              </p>
              <p className="text-sm text-slate-500 mt-1">תומך בקבצי PDF ו-Word (עד 10MB)</p>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5 text-sm text-slate-400">
                <FileText className="w-4 h-4" />
                PDF
              </div>
              <div className="flex items-center gap-1.5 text-sm text-slate-400">
                <FileText className="w-4 h-4" />
                DOCX
              </div>
              <div className="flex items-center gap-1.5 text-sm text-slate-400">
                <FileText className="w-4 h-4" />
                DOC
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 animate-fade-in">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-red-700">שגיאה</p>
            <p className="text-sm text-red-600 mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* Success */}
      {parsed && !loading && (
        <div className="mt-6 animate-slide-up space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
            <FileCheck className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-green-700">הקובץ נקרא בהצלחה!</p>
              <p className="text-sm text-green-600 mt-0.5">
                <span className="font-medium">{fileName}</span> - המסמך נותח ומוכן לעיצוב מחדש
              </p>
            </div>
          </div>

          {/* AI Enhancement Panel */}
          <div className="bg-gradient-to-l from-violet-50 to-purple-50 border border-violet-200 rounded-xl p-4">
            <button
              onClick={() => setShowAiPanel(!showAiPanel)}
              className="w-full flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-violet-600" />
                <span className="font-semibold text-violet-800">ניתוח חכם עם AI</span>
                <span className="text-xs bg-violet-200 text-violet-700 px-2 py-0.5 rounded-full">מומלץ</span>
              </div>
              <span className="text-violet-400 text-sm">{showAiPanel ? '▲' : '▼'}</span>
            </button>

            {showAiPanel && (
              <div className="mt-4 space-y-3">
                <p className="text-sm text-violet-600">
                  ניתוח AI מבוסס GPT יזהה בצורה מדויקת הרבה יותר את כל הסקשנים, ישפר את הניסוח, ויפריד נכון בין ניסיון לשירות צבאי.
                </p>
                <div>
                  <label className="block text-sm font-medium text-violet-700 mb-1">
                    <Key className="w-3.5 h-3.5 inline ml-1" />
                    מפתח OpenAI API
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type={showKey ? 'text' : 'password'}
                        value={apiKey}
                        onChange={e => setApiKey(e.target.value)}
                        placeholder="sk-..."
                        dir="ltr"
                        className="w-full px-3 py-2 rounded-lg border border-violet-200 bg-white text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 pl-9"
                      />
                      <button
                        type="button"
                        onClick={() => setShowKey(!showKey)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 text-violet-400 hover:text-violet-600"
                      >
                        {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <button
                      onClick={handleAIParse}
                      disabled={aiLoading || !apiKey.trim()}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-violet-600 text-white hover:bg-violet-700 shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Brain className="w-4 h-4" />}
                      {aiLoading ? 'מנתח...' : 'נתח עם AI'}
                    </button>
                  </div>
                  <p className="text-xs text-violet-400 mt-1.5">
                    המפתח נשמר בדפדפן שלך בלבד ולא נשלח לשום מקום מלבד OpenAI.
                    <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline mr-1 text-violet-500">קבל מפתח כאן</a>
                  </p>
                </div>
              </div>
            )}
          </div>

          {rawText && (
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <p className="text-sm font-medium text-slate-600 mb-2">טקסט שחולץ מהמסמך:</p>
              <div className="bg-slate-50 rounded-lg p-3 max-h-48 overflow-auto text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                {rawText.substring(0, 1500)}{rawText.length > 1500 ? '...' : ''}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleRewriteAndEdit}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-base font-semibold bg-gradient-to-l from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-[1.02] transition-all"
            >
              <Sparkles className="w-5 h-5" />
              שכתוב מקצועי + עריכה
            </button>
            <button
              onClick={handleGoToEdit}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-base font-semibold bg-white border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600 shadow-sm hover:shadow-md transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              ערוך ידנית
            </button>
            <button
              onClick={handleGoToPreview}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-base font-semibold bg-gradient-to-l from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] transition-all"
            >
              <FileText className="w-5 h-5" />
              תצוגה מקדימה
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
