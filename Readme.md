# CV Builder - יצירת קורות חיים מקצועיים

אפליקציית ווב מודרנית ליצירת, עיצוב והורדת קורות חיים מקצועיים.

## תכונות

- **יצירת קורות חיים מאפס** - מילוי טופס עם כל הפרטים הנדרשים
- **העלאת מסמך קיים** - תמיכה בקבצי PDF ו-Word (DOCX/DOC)
- **שכתוב מקצועי** - שיפור אוטומטי של הטקסט בשפה מקצועית
- **4 תבניות מעוצבות** - מודרנית, קלאסית, יצירתית ואלגנטית
- **עריכה בזמן אמת** - שינוי הנתונים עם תצוגה מקדימה
- **הורדה כ-PDF או Word** - ייצוא קורות החיים בפורמט הרצוי
- **ממשק בעברית (RTL)** - תמיכה מלאה בשפה העברית

## טכנולוגיות

- React 19 + Vite
- Tailwind CSS v4
- Lucide React Icons
- pdfjs-dist - קריאת קבצי PDF
- mammoth.js - קריאת קבצי Word
- html2pdf.js - ייצוא ל-PDF
- docx + file-saver - ייצוא ל-Word
- react-dropzone - העלאת קבצים
- react-router-dom - ניווט

## התקנה והרצה

```bash
cd cv-builder
npm install
npm run dev
```

## בנייה לפרודקשן

```bash
npm run build
npm run preview
```

## מבנה הפרויקט

```
cv-builder/
├── src/
│   ├── components/     # קומפוננטות משותפות
│   │   └── Header.jsx
│   ├── pages/          # דפי האפליקציה
│   │   ├── HomePage.jsx
│   │   ├── BuilderPage.jsx
│   │   ├── UploadPage.jsx
│   │   └── PreviewPage.jsx
│   ├── templates/      # תבניות קורות חיים
│   │   └── CVTemplates.jsx
│   ├── utils/          # פונקציות עזר
│   │   ├── defaultData.js
│   │   ├── exportUtils.js
│   │   ├── fileParser.js
│   │   └── professionalRewrite.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
└── index.html
```
