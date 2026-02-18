import React from 'react'
import { Link } from 'react-router-dom'
import { PenTool, Upload, FileCheck, Download, Sparkles, LayoutTemplate } from 'lucide-react'

export default function HomePage() {
  const features = [
    {
      icon: PenTool,
      title: 'יצירה מאפס',
      description: 'הזן את הפרטים שלך וצור קורות חיים מקצועיים בדקות',
      color: 'from-blue-500 to-blue-600',
      shadow: 'shadow-blue-500/25',
    },
    {
      icon: Upload,
      title: 'העלאת מסמך',
      description: 'העלה קובץ PDF או Word קיים ועצב אותו מחדש',
      color: 'from-violet-500 to-violet-600',
      shadow: 'shadow-violet-500/25',
    },
    {
      icon: Sparkles,
      title: 'שכתוב מקצועי',
      description: 'המערכת תשכתב את הטקסט שלך בצורה מקצועית ומרשימה',
      color: 'from-amber-500 to-orange-500',
      shadow: 'shadow-amber-500/25',
    },
    {
      icon: LayoutTemplate,
      title: 'תבניות מעוצבות',
      description: 'בחר מתוך מגוון תבניות מקצועיות ומודרניות',
      color: 'from-emerald-500 to-teal-500',
      shadow: 'shadow-emerald-500/25',
    },
    {
      icon: FileCheck,
      title: 'עריכה בזמן אמת',
      description: 'ערוך את קורות החיים שלך עם תצוגה מקדימה חיה',
      color: 'from-pink-500 to-rose-500',
      shadow: 'shadow-pink-500/25',
    },
    {
      icon: Download,
      title: 'הורדה בכל פורמט',
      description: 'הורד את קורות החיים כקובץ PDF או Word',
      color: 'from-cyan-500 to-blue-500',
      shadow: 'shadow-cyan-500/25',
    },
  ]

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="text-center py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>הכלי החינמי ליצירת קורות חיים מקצועיים</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            צור קורות חיים
            <span className="bg-gradient-to-l from-blue-600 to-violet-600 bg-clip-text text-transparent"> מרשימים </span>
            בדקות
          </h1>
          <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            הזן את הפרטים שלך או העלה מסמך קיים, בחר תבנית מעוצבת, והורד קורות חיים מקצועיים מוכנים לשליחה
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/builder"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-l from-blue-600 to-violet-600 text-white px-8 py-3.5 rounded-xl text-base font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] transition-all duration-200"
            >
              <PenTool className="w-5 h-5" />
              יצירת קורות חיים חדשים
            </Link>
            <Link
              to="/upload"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-700 px-8 py-3.5 rounded-xl text-base font-semibold border border-slate-200 shadow-sm hover:border-violet-300 hover:text-violet-600 hover:shadow-md transition-all duration-200"
            >
              <Upload className="w-5 h-5" />
              העלאת מסמך קיים
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">כל מה שאתה צריך במקום אחד</h2>
          <p className="text-slate-500 max-w-xl mx-auto">כלים מתקדמים ליצירת קורות חיים מנצחים</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:border-slate-200 transition-all duration-300 group animate-slide-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg ${feature.shadow} group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="bg-gradient-to-l from-blue-600 to-violet-600 rounded-3xl p-10 md:p-14 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">מוכן להתחיל?</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
              צור קורות חיים מקצועיים שיבלטו מהמתחרים ויעזרו לך להשיג את העבודה הבאה
            </p>
            <Link
              to="/builder"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3.5 rounded-xl font-bold shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-200"
            >
              <PenTool className="w-5 h-5" />
              התחל עכשיו - חינם!
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
