# منصة الامتحانات (GitHub Pages + Firebase)
1. **Firebase:** console.firebase.google.com ← مشروع جديد ← Add web app ← انسخ الإعدادات في `js/config.js`.
2. **Firestore Database:** Create database (production mode).
3. **Authentication:** فعّل Email/Password وأضف حسابك (Users ← Add user).
4. **Rules:** الصق `firestore.rules` في Firestore ← Rules وغيّر الإيميل لإيميلك ← Publish.
5. **GitHub:** ارفع محتوى المجلد في مستودع عام ← Settings ← Pages ← Deploy from branch (main).
6. **Firebase ← Authentication ← Settings ← Authorized domains:** أضف `USERNAME.github.io`.
7. افتح `/admin.html` ← ادخل ← ارفع `exams/sample-exam.json` ← «فتح» ← ابعت رابط `index.html` للطلاب.
