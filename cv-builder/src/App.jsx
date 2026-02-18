import React, { useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import BuilderPage from './pages/BuilderPage'
import UploadPage from './pages/UploadPage'
import PreviewPage from './pages/PreviewPage'

function App() {
  const [cvData, setCvData] = useState(null)
  const [selectedTemplate, setSelectedTemplate] = useState('modern')

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-violet-50/20">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/builder"
              element={
                <BuilderPage
                  cvData={cvData}
                  setCvData={setCvData}
                  selectedTemplate={selectedTemplate}
                  setSelectedTemplate={setSelectedTemplate}
                />
              }
            />
            <Route
              path="/upload"
              element={
                <UploadPage
                  setCvData={setCvData}
                  setSelectedTemplate={setSelectedTemplate}
                />
              }
            />
            <Route
              path="/preview"
              element={
                <PreviewPage
                  cvData={cvData}
                  setCvData={setCvData}
                  selectedTemplate={selectedTemplate}
                  setSelectedTemplate={setSelectedTemplate}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
