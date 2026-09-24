import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  MapPin, 
  Send, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar, 
  Building2, 
  Copy, 
  Check, 
  UploadCloud, 
  Sparkles, 
  FileText, 
  ArrowRight,
  ArrowLeft,
  Headphones,
  Compass,
  AlertCircle
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { AinSigamLogo } from './AinSigamLogo';

interface ContactUsPageProps {
  onNavigate: (pageId: string) => void;
}

export const ContactUsPage: React.FC<ContactUsPageProps> = ({ onNavigate }) => {
  const { isAr, t } = useLanguage();

  // Selected Inquiry Category
  const [inquiryType, setInquiryType] = useState<string>('land-audit');

  // Form State
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [city, setCity] = useState<string>('الرياض');
  const [deedNumber, setDeedNumber] = useState<string>('');
  const [urgency, setUrgency] = useState<'normal' | 'urgent' | 'critical'>('normal');
  const [message, setMessage] = useState<string>('');
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);

  // Form Submit Feedback
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedTicket, setSubmittedTicket] = useState<{ id: string; time: string } | null>(null);

  // Copy Feedback
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Interactive Hub Explorer
  const [selectedHub, setSelectedHub] = useState<'riyadh' | 'jeddah' | 'khobar'>('riyadh');

  // Demo Booking State
  const [demoDate, setDemoDate] = useState<string>('2026-09-25');
  const [demoTime, setDemoTime] = useState<string>('11:00 AM');
  const [demoBooked, setDemoBooked] = useState<boolean>(false);

  // Copy helper
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const ticketId = `SIGAM-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedTicket({
        id: ticketId,
        time: new Date().toLocaleTimeString(isAr ? 'ar-SA' : 'en-US')
      });
    }, 800);
  };

  // Branch Hubs
  const branches = {
    riyadh: {
      nameAr: 'المقر الرئيسي العام - الرياض',
      nameEn: 'Headquarters - Riyadh KAFD',
      addressAr: 'مركز الملك عبدالله المالي (كافد)، برج عين سيجام التقني، الدور 28',
      addressEn: 'King Abdullah Financial District (KAFD), Ain Sijam Tower, 28th Floor',
      phone: '+966 11 456 7890',
      hoursAr: 'الأحد - الخميس: 8:00 ص - 6:00 م',
      hoursEn: 'Sun - Thu: 8:00 AM - 6:00 PM',
      managerAr: 'م. راشد القحطاني (مدير العمليات الجيوماتكس)',
      managerEn: 'Eng. Rashed Al-Qahtani (Geomatics Lead)',
      coords: '24.7645° N, 46.6385° E'
    },
    jeddah: {
      nameAr: 'مركز العمليات الغربية - جدة',
      nameEn: 'Western Regional Hub - Jeddah',
      addressAr: 'طريق الملك عبدالعزيز، حي الشاطئ، برج الأعمال البحرية',
      addressEn: 'King Abdulaziz Road, Ash Shati, Maritime Business Tower',
      phone: '+966 12 345 6789',
      hoursAr: 'الأحد - الخميس: 8:30 ص - 5:30 م',
      hoursEn: 'Sun - Thu: 8:30 AM - 5:30 PM',
      managerAr: 'م. سارة الغامدي (مستشارة كود البناء والتخطيط)',
      managerEn: 'Eng. Sara Al-Ghamdi (Urban Zoning Advisor)',
      coords: '21.5892° N, 39.1245° E'
    },
    khobar: {
      nameAr: 'مركز المنطقة الشرقية - الخبر',
      nameEn: 'Eastern Hub - Al Khobar',
      addressAr: 'طريق الأمير فيصل بن فهد، حي الحزام الذهبي',
      addressEn: 'Prince Faisal Bin Fahd Road, Golden Belt District',
      phone: '+966 13 890 1234',
      hoursAr: 'الأحد - الخميس: 8:00 ص - 5:00 م',
      hoursEn: 'Sun - Thu: 8:00 AM - 5:00 PM',
      managerAr: 'م. فيصل الدوسري (مدير البنية التحتية)',
      managerEn: 'Eng. Faisal Al-Dossary (Infrastructure Lead)',
      coords: '26.2871° N, 50.2104° E'
    }
  };

  return (
    <div className="w-full space-y-12 pb-16" dir={isAr ? 'rtl' : 'ltr'}>

      {/* 1. HERO SPOTLIGHT: Support & Consultation Hub */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-800 text-white p-8 sm:p-12 lg:p-16 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#0A3254_1px,transparent_1px)] [background-size:28px_28px] opacity-30 pointer-events-none" />
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-emerald-600/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{isAr ? 'مستشارونا متاحون للرد الآن • متوسط الرد < ساعتين' : 'Advisors Live • Average SLA < 2 Hours'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight font-['Cairo']">
            {isAr ? (
              <>
                تواصل مع مستشاري ومهندسي <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-emerald-300 to-teal-400">
                  منظومة عين سيجام
                </span>
              </>
            ) : (
              <>
                Connect with Ain Sijam <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-emerald-300 to-teal-400">
                  Geospatial & Engineering Advisors
                </span>
              </>
            )}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {isAr 
              ? 'سواءً كنت ترغب في فحص قطعة أرض، مطابقة صك عقاري، ترخيص مكتبك الهندسي، أو طلب الربط البرمجي المؤسسي (API)؛ خبراؤنا جاهزون لخدمتك في جميع مدن المملكة.'
              : 'Whether you require deed audits, borehole inspections, engineering office licensing, or enterprise API access, our experts are at your service.'}
          </p>

          {/* Quick Access Badges Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 max-w-3xl mx-auto text-xs">
            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center gap-2 text-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? 'سرية تامة لبيانات الصكوك والمخططات' : '100% Confidential Deed Audits'}</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center gap-2 text-slate-200">
              <Headphones className="w-4 h-4 text-sky-400" />
              <span>{isAr ? 'دعم فني هندسي 7 أيام بالأسبوع' : '7 Days / Week Engineering Support'}</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center gap-2 text-slate-200">
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>{isAr ? 'معتمدون لكود البناء السعودي SBC' : 'Certified SBC Code Engineers'}</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. DIRECT CONTACT CHANNELS (قنوات التواصل المباشر) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Official Hotline */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:border-blue-500 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center font-bold">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500">{isAr ? 'الرقم الموحد المجاني' : 'Toll-Free Hotline'}</div>
              <div className="text-lg font-black text-slate-900 dark:text-white font-mono mt-0.5">800 124 0000</div>
              <div className="text-[11px] text-slate-500 mt-1">{isAr ? 'من داخل المملكة العربية السعودية' : 'Within Saudi Arabia'}</div>
            </div>
            <button
              onClick={() => handleCopy('8001240000', 'phone')}
              className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedKey === 'phone' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>{copiedKey === 'phone' ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'نسخ الرقم' : 'Copy Number')}</span>
            </button>
          </div>

          {/* Card 2: Email */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:border-emerald-500 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center font-bold">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500">{isAr ? 'البريد الإلكتروني المعتمد' : 'Verified Email'}</div>
              <div className="text-sm font-black text-slate-900 dark:text-white font-mono mt-0.5 truncate" title="ahmed.tamam.cairo48@gmail.com">
                ahmed.tamam.cairo48@gmail.com
              </div>
              <div className="text-[11px] text-slate-500 mt-1">{isAr ? 'للاستشارات الهندسية والشراكات' : 'Advisory & Partnerships'}</div>
            </div>
            <button
              onClick={() => handleCopy('ahmed.tamam.cairo48@gmail.com', 'email')}
              className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedKey === 'email' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>{copiedKey === 'email' ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'نسخ البريد' : 'Copy Email')}</span>
            </button>
          </div>

          {/* Card 3: Instant WhatsApp */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:border-emerald-500 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 flex items-center justify-center font-bold">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500">{isAr ? 'واتساب الأعمال الفوري' : 'Direct WhatsApp'}</div>
              <div className="text-lg font-black text-slate-900 dark:text-white font-mono mt-0.5">+966 50 123 4567</div>
              <div className="text-[11px] text-slate-500 mt-1">{isAr ? 'متاح للمحادثة الفورية المباشرة' : 'Available for quick chat'}</div>
            </div>
            <button
              onClick={() => handleCopy('+966501234567', 'whatsapp')}
              className="w-full py-2 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-700 dark:text-teal-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedKey === 'whatsapp' ? <Check className="w-4 h-4 text-teal-600" /> : <Copy className="w-4 h-4" />}
              <span>{copiedKey === 'whatsapp' ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'نسخ رقم الواتساب' : 'Copy WhatsApp')}</span>
            </button>
          </div>

          {/* Card 4: Headquarters */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:border-amber-500 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center font-bold">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500">{isAr ? 'المقر الرئيسي للمنظومة' : 'Headquarters'}</div>
              <div className="text-base font-black text-slate-900 dark:text-white font-['Cairo'] mt-0.5">الرياض - كافد</div>
              <div className="text-[11px] text-slate-500 mt-1">{isAr ? 'مركز الملك عبدالله المالي، الدور 28' : 'KAFD, 28th Floor'}</div>
            </div>
            <button
              onClick={() => setSelectedHub('riyadh')}
              className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-amber-500" />
              <span>{isAr ? 'عرض بيانات المقر' : 'View Hub Info'}</span>
            </button>
          </div>

        </div>
      </section>

      {/* 3. DUAL COLUMN: SMART INQUIRY FORM + LIVE DEMO BOOKING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT/RIGHT: Main Interactive Contact & Dispatch Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
            
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <AinSigamLogo size="sm" variant="mark-only" />
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-['Cairo']">
                  {isAr ? 'نموذج طلب الاستشارة والربط الفني' : 'Dispatch & Technical Consultation Form'}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {isAr ? 'اختر الغرض من التواصل وسيتم توجيه طلبك فورياً للمهندس المختص.' : 'Select inquiry type to route your ticket immediately to the dedicated engineer.'}
              </p>
            </div>

            {/* Inquiry Type Selector Tabs */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                {isAr ? 'نوع الطلب أو الاستشارة:' : 'Inquiry Category:'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold">
                {[
                  { id: 'land-audit', label: isAr ? 'فحص أرض أو تقرير جسات' : 'Plot Audit / Boreholes' },
                  { id: 'enterprise-license', label: isAr ? 'ترخيص شركات ومكاتب هندسية' : 'Enterprise Office License' },
                  { id: 'deed-audit', label: isAr ? 'استفسار عن صفقة أو صك' : 'Deed / Pricing Verification' },
                  { id: 'api-integration', label: isAr ? 'الربط البرمجي المؤسسي (API)' : 'Enterprise Spatial API' }
                ].map((type) => (
                  <button
                    type="button"
                    key={type.id}
                    onClick={() => setInquiryType(type.id)}
                    className={`p-3 rounded-xl border text-start transition-all cursor-pointer flex items-center justify-between ${
                      inquiryType === type.id
                        ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-600 text-blue-700 dark:text-blue-300'
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    <span>{type.label}</span>
                    {inquiryType === type.id && <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Fields */}
            {submittedTicket ? (
              <div className="p-6 sm:p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-500/40 text-center space-y-4 animate-in fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white font-['Cairo']">
                    {isAr ? 'تم استلام طلبك بنجاح!' : 'Your Request Has Been Dispatched!'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    {isAr 
                      ? 'رقم التذكرة المرجعي للمتابعة المباشرة مع فريق عين سيجام:' 
                      : 'Reference ticket ID for direct tracking with Ain Sijam team:'}
                  </p>
                </div>
                <div className="inline-block px-5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-500 font-mono text-lg font-black text-emerald-600 dark:text-emerald-400 shadow-xs">
                  {submittedTicket.id}
                </div>
                <div className="text-xs text-slate-500">
                  {isAr ? `تم التوثيق في تمام الساعة ${submittedTicket.time} • سيتصل بك المهندس المختص قريباً` : `Logged at ${submittedTicket.time} • Our lead engineer will contact you shortly`}
                </div>
                <button
                  onClick={() => setSubmittedTicket(null)}
                  className="px-6 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer"
                >
                  {isAr ? 'إرسال طلب استشارة آخر' : 'Send Another Request'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {isAr ? 'الاسم الكامل أو اسم المنشأة *' : 'Full Name / Company Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={isAr ? 'مثال: م. فهد الشمري' : 'e.g. Fahad Al-Shammari'}
                      className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {isAr ? 'رقم الجوال السعودي *' : 'Saudi Mobile Number *'}
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="05X XXX XXXX"
                        className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-blue-600 text-start"
                      />
                      <span className="absolute top-3 left-3 rtl:left-auto rtl:right-3 text-xs font-bold text-slate-400 pointer-events-none">
                        +966
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {isAr ? 'البريد الإلكتروني' : 'Email Address'}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  {/* City */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {isAr ? 'المدينة / المنطقة' : 'City / Region'}
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 cursor-pointer"
                    >
                      <option value="الرياض">الرياض (Riyadh)</option>
                      <option value="جدة">جدة (Jeddah)</option>
                      <option value="مكة المكرمة">مكة المكرمة (Makkah)</option>
                      <option value="المدينة المنورة">المدينة المنورة (Madinah)</option>
                      <option value="الدمام والخبر">الدمام والخبر (Eastern Hub)</option>
                      <option value="نيوم وتبوك">نيوم وتبوك (NEOM & Tabuk)</option>
                      <option value="أبها وعسير">أبها وعسير (Asir Region)</option>
                    </select>
                  </div>
                </div>

                {/* Optional Deed / Plot Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {isAr ? 'رقم الصك أو رقم المخطط والقطعة (اختياري)' : 'Deed / Plot Number (Optional)'}
                    </label>
                    <input
                      type="text"
                      value={deedNumber}
                      onChange={(e) => setDeedNumber(e.target.value)}
                      placeholder={isAr ? 'مثال: صك 3101240098' : 'e.g. Deed 3101240098'}
                      className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  {/* Urgency */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {isAr ? 'درجة الأولوية الزمنية:' : 'Urgency Priority:'}
                    </label>
                    <div className="flex items-center gap-1.5 pt-0.5">
                      {[
                        { id: 'normal', label: isAr ? 'عادي (48 س)' : 'Standard' },
                        { id: 'urgent', label: isAr ? 'عاجل (24 س)' : 'Urgent' },
                        { id: 'critical', label: isAr ? 'فوري لموقع' : 'Critical' }
                      ].map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setUrgency(p.id as any)}
                          className={`flex-1 py-2 px-1 text-[11px] font-bold rounded-lg border transition-all cursor-pointer ${
                            urgency === p.id 
                              ? 'bg-blue-600 text-white border-blue-600' 
                              : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isAr ? 'تفاصيل الاستفسار أو متطلبات الموقع الهندسية:' : 'Inquiry Details or Requirements:'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={isAr ? 'اكتب تفاصيل طلبك، نوع الأرض، الارتدادات المستفسر عنها، أو نوع رخصة البناء المطلوبة...' : 'Describe your inquiry or site requirements...'}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                  />
                </div>

                {/* Simulated File Upload */}
                <div className="p-3.5 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/60 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <UploadCloud className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {attachedFileName || (isAr ? 'إرفاق كروكي مساحي أو تقرير جسات أو صك (اختياري)' : 'Attach Cadastral Plan / Borehole Log')}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        PDF, DWG, DXF, PNG, GeoJSON (حتى 25 ميجابايت)
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAttachedFileName(attachedFileName ? null : 'krooki-riyadh-plot-482.pdf')}
                    className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    {attachedFileName ? (isAr ? 'إزالة' : 'Remove') : (isAr ? 'اختيار ملف' : 'Browse')}
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>{isAr ? 'جاري توجيه التذكرة للمهندس المختص...' : 'Dispatching Ticket...'}</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 rtl:rotate-180" />
                      <span>{isAr ? 'إرسال طلب الاستشارة للمهندس المختص' : 'Dispatch Consultation Ticket'}</span>
                    </>
                  )}
                </button>

              </form>
            )}

          </div>

          {/* RIGHT/LEFT: Interactive Live Technical Demo Booking & SLA (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live Demo Booking Card */}
            <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-lg space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-500/40 text-sky-400 flex items-center justify-center font-bold">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base font-['Cairo']">
                      {isAr ? 'حجز جلسة استعراض حي (15 دقيقة)' : 'Book Live 15-Min System Demo'}
                    </h3>
                    <div className="text-[11px] text-slate-400">{isAr ? 'مع أحد كبار مهندسي الجيوماتكس' : 'With a Senior Spatial Engineer'}</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {isAr ? 'متاح اليوم' : 'Open Slots'}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {isAr 
                  ? 'جلسة مرئية تفاعلية مباشرة تشاهد فيها فحص أراضيك وصكوكك على الهواء مباشرة عبر التوأمة الرقمية ورادار الأقمار الصناعية.'
                  : 'Interactive live video screen-share demonstrating real-time parcel audits on your target plots using satellite radar.'}
              </p>

              {demoBooked ? (
                <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <div className="text-sm font-bold text-white">
                    {isAr ? 'تم تأكيد موعد جلستك التقنية!' : 'Live Demo Scheduled!'}
                  </div>
                  <div className="text-xs text-emerald-300 font-mono">
                    {demoDate} • {demoTime} (توقيت مكة المكرمة)
                  </div>
                  <button
                    onClick={() => setDemoBooked(false)}
                    className="text-xs text-slate-400 hover:text-white underline pt-1 cursor-pointer"
                  >
                    {isAr ? 'تعديل الموعد' : 'Change Slot'}
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400 font-medium">
                      {isAr ? 'اختر تاريخ الجلسة:' : 'Select Date:'}
                    </label>
                    <input
                      type="date"
                      value={demoDate}
                      onChange={(e) => setDemoDate(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-400 font-medium">
                      {isAr ? 'الوقت المناسب (توقيت السعودية):' : 'Available Time Slot (AST):'}
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {['10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'].map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setDemoTime(slot)}
                          className={`p-2 rounded-lg border text-center font-mono font-bold transition-all cursor-pointer ${
                            demoTime === slot
                              ? 'bg-blue-600 border-blue-500 text-white'
                              : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setDemoBooked(true)}
                    className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    {isAr ? 'تأكيد حجز جلسة العرض الحي' : 'Confirm Live Walkthrough'}
                  </button>
                </div>
              )}
            </div>

            {/* SLA Guarantee Box */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {isAr ? 'ميثاق سرعة الاستجابة لعين سيجام' : 'Ain Sijam Response SLA'}
                </h4>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{isAr ? 'الاستفسارات العاجلة: رد خلال أقل من ساعتين عمل.' : 'Urgent tickets: Responded within 2 hours.'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{isAr ? 'تراخيص المكاتب والـ API: تفعيل فوري مع مفاتيح الربط.' : 'Enterprise API: Instant provisioning with staging keys.'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{isAr ? 'فحص التربة والجسات: تقرير معتمد طبقاً لكود SBC.' : 'Geotechnical audits: Certified SBC compliant output.'}</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* 4. INTERACTIVE HEADQUARTERS & HUBS EXPLORER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            <MapPin className="w-3.5 h-3.5" />
            <span>{isAr ? 'المقرات ومراكز العمليات الميدانية' : 'REGIONAL HUBS & OFFICES'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-['Cairo']">
            {isAr ? 'مقرات ومراكز عمليات منظومة عين سيجام بالمملكة' : 'Ain Sijam Regional Hubs & Field Headquarters'}
          </h2>
        </div>

        {/* Hub Tabs */}
        <div className="flex items-center justify-center gap-2">
          {[
            { id: 'riyadh', label: isAr ? 'الرياض (كافد KAFD)' : 'Riyadh HQ' },
            { id: 'jeddah', label: isAr ? 'جدة (الغربية)' : 'Jeddah Hub' },
            { id: 'khobar', label: isAr ? 'الخبر (الشرقية)' : 'Khobar Hub' }
          ].map((hub) => (
            <button
              key={hub.id}
              onClick={() => setSelectedHub(hub.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedHub === hub.id
                  ? 'bg-blue-600 text-white shadow-md scale-105'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {hub.label}
            </button>
          ))}
        </div>

        {/* Active Hub Card */}
        {(() => {
          const hub = branches[selectedHub];
          return (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                
                {/* Details */}
                <div className="space-y-4">
                  <div className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 text-xs font-bold">
                    {isAr ? hub.nameAr : hub.nameEn}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-['Cairo']">
                    {isAr ? hub.addressAr : hub.addressEn}
                  </h3>

                  <div className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 pt-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>{isAr ? hub.hoursAr : hub.hoursEn}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-blue-600" />
                      <span className="font-mono">{hub.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-blue-600" />
                      <span className="font-mono text-slate-500">{hub.coords}</span>
                    </div>
                    <div className="flex items-center gap-2 pt-1 font-bold text-slate-800 dark:text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>{isAr ? hub.managerAr : hub.managerEn}</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Geodetic Radar Screen / Map Graphic */}
                <div className="relative rounded-2xl overflow-hidden bg-slate-950 p-6 border border-slate-800 text-white min-h-[220px] flex flex-col justify-between">
                  <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
                  
                  {/* Radar Pulse in center */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full border border-sky-500/30 animate-ping" />
                    <div className="w-12 h-12 rounded-full border border-emerald-500/50 absolute" />
                    <div className="w-4 h-4 rounded-full bg-emerald-400 absolute shadow-lg shadow-emerald-400/50" />
                  </div>

                  <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>GEODETIC RADAR: ACTIVE</span>
                    <span className="text-emerald-400 font-bold">KSA-GRF FIXED</span>
                  </div>

                  <div className="relative z-10 flex items-center justify-between text-xs pt-16">
                    <div className="font-bold text-white font-['Cairo']">
                      {isAr ? hub.nameAr : hub.nameEn}
                    </div>
                    <span className="font-mono text-sky-400 text-[11px] bg-slate-900/80 px-2 py-1 rounded-lg border border-slate-700">
                      {hub.coords}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          );
        })()}

      </section>

    </div>
  );
};

export default ContactUsPage;
