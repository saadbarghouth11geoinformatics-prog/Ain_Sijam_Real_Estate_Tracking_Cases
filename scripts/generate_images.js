import fs from 'fs';
import path from 'path';

// 1. GENERATE CAD BLUEPRINT SVG
function generateCadSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="1600" height="1000" style="background:#070d1e; font-family:'Cairo', 'Segoe UI', Tahoma, sans-serif;">
  <defs>
    <!-- Background CAD Grid -->
    <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#0e1e38" stroke-width="0.75" />
    </pattern>
    <pattern id="mainGrid" width="100" height="100" patternUnits="userSpaceOnUse">
      <rect width="100" height="100" fill="url(#smallGrid)" />
      <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#183660" stroke-width="1.2" />
    </pattern>
    <!-- Hatch Patterns for Land Use -->
    <pattern id="schoolHatch" width="12" height="12" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="12" stroke="#f59e0b" stroke-width="1" stroke-opacity="0.35" />
    </pattern>
    <pattern id="clubHatch" width="12" height="12" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="12" stroke="#38bdf8" stroke-width="1" stroke-opacity="0.35" />
    </pattern>
    <pattern id="mosqueHatch" width="12" height="12" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="12" stroke="#10b981" stroke-width="1" stroke-opacity="0.35" />
    </pattern>
    <pattern id="commercialHatch" width="12" height="12" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="12" stroke="#f43f5e" stroke-width="1" stroke-opacity="0.35" />
    </pattern>
    <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2" result="blur" />
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Grid Background -->
  <rect width="1600" height="1000" fill="#070d1e" />
  <rect width="1600" height="1000" fill="url(#mainGrid)" />

  <!-- Outer Technical Border & Coordinate Rulers -->
  <rect x="25" y="25" width="1550" height="950" fill="none" stroke="#1e3a5f" stroke-width="2" />
  <rect x="35" y="35" width="1530" height="930" fill="none" stroke="#00f0ff" stroke-width="1" stroke-opacity="0.4" />

  <!-- Coordinate Markings (UTM Coordinates) -->
  <g fill="#475569" font-size="11" font-family="monospace">
    <text x="50" y="20">684,200 m E</text>
    <text x="400" y="20">684,600 m E</text>
    <text x="800" y="20">685,000 m E</text>
    <text x="1200" y="20">685,400 m E</text>
    <text x="1480" y="20">685,800 m E</text>
    <text x="1565" y="100" transform="rotate(90 1565,100)">2,739,600 m N</text>
    <text x="1565" y="500" transform="rotate(90 1565,500)">2,739,000 m N</text>
    <text x="1565" y="900" transform="rotate(90 1565,900)">2,738,400 m N</text>
  </g>

  <!-- CAD LAYER 0: SITE PERIMETER BOUNDARY -->
  <path d="M 220 850 L 220 320 C 220 160, 450 90, 800 90 C 1150 90, 1380 160, 1380 320 L 1380 850 Z" 
        fill="#0a192f" fill-opacity="0.6" stroke="#00f0ff" stroke-width="2.5" stroke-dasharray="8 4" />

  <!-- CAD LAYER 1: MAIN ENTRANCE HIGHWAY (South Access) -->
  <g id="main-highway">
    <!-- Outer highway lanes -->
    <path d="M 100 870 L 1500 870" stroke="#f59e0b" stroke-width="40" stroke-linecap="square" />
    <path d="M 100 870 L 1500 870" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="14 10" />
    <text x="800" y="875" fill="#ffffff" font-size="13" font-weight="bold" text-anchor="middle">محور طريق الملك سلمان السريع (عرض 60 متر)</text>

    <!-- Entrance Boulevard -->
    <path d="M 740 850 L 740 680" stroke="#f59e0b" stroke-width="28" />
    <path d="M 860 850 L 860 680" stroke="#f59e0b" stroke-width="28" />
    <rect x="758" y="680" width="84" height="170" fill="#047857" stroke="#10b981" stroke-width="1" />
    <text x="800" y="770" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle" transform="rotate(-90 800,770)">مدخل المجاورة الرئيسي (عرض 40م)</text>
  </g>

  <!-- CAD LAYER 2: THE HORSESHOE RING ROAD (طريق حلقي حدوة الحصان) -->
  <g id="horseshoe-roads" stroke-linecap="round">
    <!-- Outer road strip -->
    <path d="M 330 840 L 330 380 C 330 230, 520 160, 800 160 C 1080 160, 1270 230, 1270 380 L 1270 840" 
          fill="none" stroke="#f59e0b" stroke-width="24" />
    <!-- Yellow centerline -->
    <path d="M 330 840 L 330 380 C 330 230, 520 160, 800 160 C 1080 160, 1270 230, 1270 380 L 1270 840" 
          fill="none" stroke="#ffffff" stroke-width="1.2" stroke-dasharray="10 8" />
    
    <!-- Inner distribution ring road -->
    <path d="M 450 820 L 450 440 C 450 310, 590 260, 800 260 C 1010 260, 1150 310, 1150 440 L 1150 820" 
          fill="none" stroke="#f59e0b" stroke-width="18" />
    <path d="M 450 820 L 450 440 C 450 310, 590 260, 800 260 C 1010 260, 1150 310, 1150 440 L 1150 820" 
          fill="none" stroke="#ffffff" stroke-width="1" stroke-dasharray="6 6" />

    <!-- Cross connecting streets -->
    <line x1="330" y1="620" x2="450" y2="620" stroke="#f59e0b" stroke-width="16" />
    <line x1="330" y1="460" x2="450" y2="460" stroke="#f59e0b" stroke-width="16" />
    <line x1="1150" y1="620" x2="1270" y2="620" stroke="#f59e0b" stroke-width="16" />
    <line x1="1150" y1="460" x2="1270" y2="460" stroke="#f59e0b" stroke-width="16" />
    <line x1="680" y1="180" x2="710" y2="260" stroke="#f59e0b" stroke-width="16" />
    <line x1="920" y1="180" x2="890" y2="260" stroke="#f59e0b" stroke-width="16" />

    <!-- Roundabouts (ميادين مرورية) -->
    <circle cx="800" cy="680" r="45" fill="#0b1329" stroke="#f59e0b" stroke-width="14" />
    <circle cx="800" cy="680" r="26" fill="#047857" stroke="#10b981" stroke-width="1.5" />
    <text x="800" y="684" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">ميدان 1</text>

    <circle cx="800" cy="160" r="38" fill="#0b1329" stroke="#f59e0b" stroke-width="12" />
    <circle cx="800" cy="160" r="20" fill="#047857" stroke="#10b981" stroke-width="1.5" />
    <text x="800" y="164" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">ميدان 2</text>
  </g>

  <!-- CAD LAYER 3: RESIDENTIAL VILLA PARCELS (تقسيم الفلل السكنية) -->
  <g id="residential-plots" stroke="#00e5ff" stroke-width="1.4" fill="#00e5ff" fill-opacity="0.04">
    <!-- Left Wing Outer Plots (101 to 110) -->
    <g id="left-outer-plots">
      <rect x="235" y="730" width="80" height="95" />
      <text x="275" y="780" fill="#38bdf8" font-size="10" text-anchor="middle">قطعة 101</text>
      <text x="275" y="795" fill="#94a3b8" font-size="8" text-anchor="middle">750 م²</text>

      <rect x="235" y="630" width="80" height="95" />
      <text x="275" y="680" fill="#38bdf8" font-size="10" text-anchor="middle">قطعة 102</text>
      <text x="275" y="695" fill="#94a3b8" font-size="8" text-anchor="middle">750 م²</text>

      <rect x="235" y="530" width="80" height="95" />
      <text x="275" y="580" fill="#38bdf8" font-size="10" text-anchor="middle">قطعة 103</text>
      <text x="275" y="595" fill="#94a3b8" font-size="8" text-anchor="middle">750 م²</text>

      <rect x="235" y="430" width="80" height="95" />
      <text x="275" y="480" fill="#38bdf8" font-size="10" text-anchor="middle">قطعة 104</text>
      <text x="275" y="495" fill="#94a3b8" font-size="8" text-anchor="middle">750 م²</text>

      <rect x="235" y="330" width="80" height="95" />
      <text x="275" y="380" fill="#38bdf8" font-size="10" text-anchor="middle">قطعة 105</text>
      <text x="275" y="395" fill="#94a3b8" font-size="8" text-anchor="middle">750 م²</text>
    </g>

    <!-- Top Horseshoe Curved Plots (106 to 118) -->
    <g id="curved-top-plots">
      <polygon points="320,270 380,210 440,260 380,320" />
      <text x="380" y="270" fill="#38bdf8" font-size="9" text-anchor="middle">قطعة 106</text>

      <polygon points="410,180 480,140 540,200 470,240" />
      <text x="475" y="195" fill="#38bdf8" font-size="9" text-anchor="middle">قطعة 107</text>

      <polygon points="520,130 600,105 640,175 560,200" />
      <text x="580" y="155" fill="#38bdf8" font-size="9" text-anchor="middle">قطعة 108</text>

      <polygon points="630,100 720,85 740,165 650,175" />
      <text x="685" y="135" fill="#38bdf8" font-size="9" text-anchor="middle">قطعة 109</text>

      <polygon points="860,85 950,100 930,175 840,165" />
      <text x="895" y="135" fill="#38bdf8" font-size="9" text-anchor="middle">قطعة 110</text>

      <polygon points="970,105 1050,130 1010,200 930,175" />
      <text x="990" y="155" fill="#38bdf8" font-size="9" text-anchor="middle">قطعة 111</text>

      <polygon points="1070,140 1140,180 1080,240 1010,200" />
      <text x="1075" y="195" fill="#38bdf8" font-size="9" text-anchor="middle">قطعة 112</text>

      <polygon points="1160,210 1220,270 1160,320 1100,260" />
      <text x="1160" y="270" fill="#38bdf8" font-size="9" text-anchor="middle">قطعة 113</text>
    </g>

    <!-- Right Wing Outer Plots (114 to 118) -->
    <g id="right-outer-plots">
      <rect x="1285" y="330" width="80" height="95" />
      <text x="1325" y="380" fill="#38bdf8" font-size="10" text-anchor="middle">قطعة 114</text>
      <text x="1325" y="395" fill="#94a3b8" font-size="8" text-anchor="middle">750 م²</text>

      <rect x="1285" y="430" width="80" height="95" />
      <text x="1325" y="480" fill="#38bdf8" font-size="10" text-anchor="middle">قطعة 115</text>
      <text x="1325" y="495" fill="#94a3b8" font-size="8" text-anchor="middle">750 م²</text>

      <rect x="1285" y="530" width="80" height="95" />
      <text x="1325" y="580" fill="#38bdf8" font-size="10" text-anchor="middle">قطعة 116</text>
      <text x="1325" y="595" fill="#94a3b8" font-size="8" text-anchor="middle">750 م²</text>

      <rect x="1285" y="630" width="80" height="95" />
      <text x="1325" y="680" fill="#38bdf8" font-size="10" text-anchor="middle">قطعة 117</text>
      <text x="1325" y="695" fill="#94a3b8" font-size="8" text-anchor="middle">750 م²</text>

      <rect x="1285" y="730" width="80" height="95" />
      <text x="1325" y="780" fill="#38bdf8" font-size="10" text-anchor="middle">قطعة 118</text>
      <text x="1325" y="795" fill="#94a3b8" font-size="8" text-anchor="middle">750 م²</text>
    </g>

    <!-- Inner Villa Building Footprints (Magenta Setbacks & White Skeletons) -->
    <g stroke="#f43f5e" stroke-width="1" stroke-dasharray="3 3" fill="none">
      <rect x="250" y="745" width="50" height="65" />
      <rect x="250" y="645" width="50" height="65" />
      <rect x="250" y="545" width="50" height="65" />
      <rect x="250" y="445" width="50" height="65" />
      <rect x="250" y="345" width="50" height="65" />
      <rect x="1300" y="345" width="50" height="65" />
      <rect x="1300" y="445" width="50" height="65" />
      <rect x="1300" y="545" width="50" height="65" />
      <rect x="1300" y="645" width="50" height="65" />
      <rect x="1300" y="745" width="50" height="65" />
    </g>
  </g>

  <!-- CAD LAYER 4: CENTRAL PUBLIC SERVICES ZONE (المرافق والخدمات المركزية) -->
  <g id="central-services">
    <!-- 1. Primary School (مدرسة تعليم أساسي) -->
    <rect x="520" y="320" width="240" height="150" fill="url(#schoolHatch)" stroke="#f59e0b" stroke-width="2" />
    <rect x="540" y="340" width="130" height="80" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5" />
    <!-- School sports running track oval -->
    <rect x="685" y="340" width="60" height="100" rx="30" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4 2" />
    <text x="640" y="440" fill="#fef08a" font-size="13" font-weight="bold" text-anchor="middle">مدرسة تعليم أساسي (12,500 م²)</text>
    <text x="640" y="456" fill="#fde68a" font-size="10" text-anchor="middle">كود المرفق: EDU-01</text>

    <!-- 2. Social & Sports Club (نادي اجتماعي ورياضي) -->
    <rect x="840" y="320" width="240" height="150" fill="url(#clubHatch)" stroke="#38bdf8" stroke-width="2" />
    <!-- Tennis courts -->
    <rect x="860" y="340" width="90" height="50" fill="#0f172a" stroke="#38bdf8" stroke-width="1" />
    <line x1="905" y1="340" x2="905" y2="390" stroke="#38bdf8" stroke-width="1" />
    <!-- Swimming pool -->
    <rect x="970" y="340" width="90" height="40" rx="6" fill="#0369a1" stroke="#38bdf8" stroke-width="1.5" />
    <text x="960" y="440" fill="#bae6fd" font-size="13" font-weight="bold" text-anchor="middle">نادي اجتماعي ورياضي (8,400 م²)</text>
    <text x="960" y="456" fill="#7dd3fc" font-size="10" text-anchor="middle">كود المرفق: CLB-02</text>

    <!-- 3. Grand Mosque (مسجد جامع ومصلى) -->
    <rect x="700" y="490" width="200" height="140" fill="url(#mosqueHatch)" stroke="#10b981" stroke-width="2" />
    <!-- Mosque dome octagon and minaret -->
    <polygon points="770,520 830,520 860,550 860,590 830,620 770,620 740,590 740,550" fill="#064e3b" stroke="#34d399" stroke-width="1.5" />
    <circle cx="800" cy="570" r="28" fill="#047857" stroke="#6ee7b7" stroke-width="2" />
    <circle cx="725" cy="515" r="10" fill="#065f46" stroke="#34d399" stroke-width="1.5" />
    <text x="800" y="575" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">قبة المسجد</text>
    <text x="800" y="645" fill="#a7f3d0" font-size="12" font-weight="bold" text-anchor="middle">مسجد جامع (3,500 م²)</text>

    <!-- 4. Health Clinic (مركز صحي) -->
    <rect x="520" y="490" width="160" height="140" fill="#0f172a" stroke="#00f0ff" stroke-width="1.8" />
    <!-- Red Cross Cadastral Emblem -->
    <polygon points="590,525 610,525 610,545 630,545 630,565 610,565 610,585 590,585 590,565 570,565 570,545 590,545" fill="#ef4444" stroke="#ffffff" stroke-width="1" />
    <text x="600" y="605" fill="#e2e8f0" font-size="12" font-weight="bold" text-anchor="middle">مركز صحي ومستوصف</text>
    <text x="600" y="620" fill="#94a3b8" font-size="10" text-anchor="middle">4,800 م²</text>

    <!-- 5. Commercial Strip (مركز تجاري وتسوق) -->
    <rect x="920" y="490" width="160" height="140" fill="url(#commercialHatch)" stroke="#f43f5e" stroke-width="1.8" />
    <rect x="940" y="515" width="120" height="60" fill="#1e1b4b" stroke="#f43f5e" stroke-width="1.2" />
    <text x="1000" y="550" fill="#fda4af" font-size="11" font-weight="bold" text-anchor="middle">MALL BLOCK</text>
    <text x="1000" y="605" fill="#fecdd3" font-size="12" font-weight="bold" text-anchor="middle">مركز تجاري وتسوق</text>
    <text x="1000" y="620" fill="#fda4af" font-size="10" text-anchor="middle">6,200 م²</text>
  </g>

  <!-- CAD DIMENSION LINES & TECHNICAL CALLOUTS -->
  <g stroke="#f43f5e" stroke-width="1" fill="#f43f5e" font-size="10" font-family="monospace">
    <!-- Width Dimension -->
    <line x1="220" y1="910" x2="1380" y2="910" />
    <line x1="220" y1="900" x2="220" y2="920" stroke-width="2" />
    <line x1="1380" y1="900" x2="1380" y2="920" stroke-width="2" />
    <text x="800" y="930" text-anchor="middle" font-size="13" font-weight="bold">العرض الكلي للمخطط = 1,160.00 م</text>

    <!-- Radius Dimension -->
    <path d="M 800 260 L 800 160" stroke="#00f0ff" stroke-width="1.5" stroke-dasharray="2 2" />
    <text x="815" y="210" fill="#00f0ff" font-size="11">R = 280.00 m</text>
  </g>

  <!-- OFFICIAL AUTOCAD TITLE BLOCK (خرطوشة المخطط المعتمد) -->
  <g id="title-block" transform="translate(1120, 770)">
    <rect width="430" height="180" fill="#050b18" stroke="#00f0ff" stroke-width="2" />
    <line x1="0" y1="40" x2="430" y2="40" stroke="#1e3a5f" stroke-width="1" />
    <line x1="0" y1="80" x2="430" y2="80" stroke="#1e3a5f" stroke-width="1" />
    <line x1="0" y1="130" x2="430" y2="130" stroke="#1e3a5f" stroke-width="1" />
    <line x1="260" y1="80" x2="260" y2="180" stroke="#1e3a5f" stroke-width="1" />

    <text x="415" y="26" fill="#00f0ff" font-size="14" font-weight="bold" text-anchor="end">وزارة الشؤون البلدية والقروية والإسكان</text>
    <text x="415" y="62" fill="#ffffff" font-size="13" font-weight="bold" text-anchor="end">مخطط المجاورة السكنية النموذجية (DWG-2026)</text>
    
    <text x="415" y="102" fill="#94a3b8" font-size="10" text-anchor="end">رقم المخطط المعتمد: KSA-CAD-8842</text>
    <text x="415" y="118" fill="#94a3b8" font-size="10" text-anchor="end">مقياس الرسم: 1:1000 | الإسقاط: WGS84 UTM</text>
    
    <text x="415" y="152" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="end">حالة المخطط: معتمد للتنفيذ الميداني</text>
    <text x="415" y="168" fill="#22c55e" font-size="10" text-anchor="end">✓ مطابق لمعايير كود البناء السعودي SBC</text>

    <!-- Engineering Stamp Box -->
    <rect x="20" y="88" width="110" height="80" fill="#022c22" stroke="#10b981" stroke-width="1.5" stroke-dasharray="4 2" />
    <text x="75" y="115" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">ختم الاعتماد</text>
    <text x="75" y="135" fill="#a7f3d0" font-size="9" text-anchor="middle">مكتب استشارات هندسية</text>
    <text x="75" y="152" fill="#6ee7b7" font-size="8" font-family="monospace" text-anchor="middle">LICENSE #49281</text>
  </g>

  <!-- NORTH COMPASS ARROW -->
  <g id="north-arrow" transform="translate(100, 110)">
    <circle cx="0" cy="0" r="38" fill="#0b1329" stroke="#00f0ff" stroke-width="1.5" />
    <!-- Compass points -->
    <polygon points="0,-32 10,0 0,6" fill="#00f0ff" />
    <polygon points="0,-32 -10,0 0,6" fill="#0284c7" />
    <polygon points="0,32 8,0 0,-4" fill="#334155" />
    <polygon points="0,32 -8,0 0,-4" fill="#1e293b" />
    <text x="0" y="-40" fill="#00f0ff" font-size="16" font-weight="bold" text-anchor="middle">N</text>
    <text x="0" y="24" fill="#64748b" font-size="8" text-anchor="middle">WGS 84</text>
  </g>

  <!-- CAD LAYER LEGEND (مفتاح طبقات الكاد) -->
  <g id="cad-legend" transform="translate(50, 750)">
    <rect width="160" height="100" fill="#050b18" stroke="#1e3a5f" stroke-width="1" />
    <text x="145" y="20" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="end">طبقات الأوتوكاد (Layers):</text>
    <rect x="15" y="32" width="16" height="8" fill="#f59e0b" />
    <text x="145" y="40" fill="#94a3b8" font-size="9" text-anchor="end">شبكة الشوارع (Roads)</text>
    <rect x="15" y="48" width="16" height="8" fill="#00e5ff" />
    <text x="145" y="56" fill="#94a3b8" font-size="9" text-anchor="end">قطع الأراضي (Parcels)</text>
    <rect x="15" y="64" width="16" height="8" fill="#f43f5e" />
    <text x="145" y="72" fill="#94a3b8" font-size="9" text-anchor="end">المرافق والتجاري (Services)</text>
    <rect x="15" y="80" width="16" height="8" fill="#10b981" />
    <text x="145" y="88" fill="#94a3b8" font-size="9" text-anchor="end">المسجد والحدائق (Green)</text>
  </g>
</svg>`;
}

// 2. GENERATE SATELLITE AS-BUILT AERIAL SVG
function generateSatelliteSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="1600" height="1000" style="background:#b38c5b; font-family:'Cairo', 'Segoe UI', Tahoma, sans-serif;">
  <defs>
    <!-- Desert Terrain Texture Gradients -->
    <radialGradient id="desertSun" cx="30%" cy="20%" r="90%">
      <stop offset="0%" stop-color="#dfb988" />
      <stop offset="40%" stop-color="#ca9a66" />
      <stop offset="80%" stop-color="#b08351" />
      <stop offset="100%" stop-color="#93693a" />
    </radialGradient>
    <radialGradient id="gradedPad" cx="50%" cy="45%" r="60%">
      <stop offset="0%" stop-color="#eed8b7" />
      <stop offset="60%" stop-color="#dec198" />
      <stop offset="100%" stop-color="#cdae82" />
    </radialGradient>
    <!-- Soil and Aggregate Pattern -->
    <filter id="soilNoise">
      <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="4" result="noise" />
      <feColorMatrix type="matrix" values="0.3 0 0 0 0.6   0 0.3 0 0 0.45   0 0 0.3 0 0.3   0 0 0 0.35 0" in="noise" result="coloredNoise" />
      <feBlend in="SourceGraphic" in2="coloredNoise" mode="multiply" />
    </filter>
    <!-- Shadow Filter for Sun Elevation 48 deg South-East (Casting shadow North-West) -->
    <filter id="buildingShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="-8" dy="-6" stdDeviation="5" flood-color="#3c2612" flood-opacity="0.65" />
    </filter>
    <filter id="heavyCraneShadow">
      <feDropShadow dx="-15" dy="-10" stdDeviation="3" flood-color="#2a1a0d" flood-opacity="0.7" />
    </filter>
  </defs>

  <!-- NATURAL DESERT TERRAIN BASE -->
  <rect width="1600" height="1000" fill="url(#desertSun)" />

  <!-- Desert Dunes and Wadis (Terrain relief contours) -->
  <path d="M 0 150 Q 400 220 800 130 T 1600 200 L 1600 0 L 0 0 Z" fill="#aa7f4e" fill-opacity="0.45" />
  <path d="M 0 750 Q 500 820 1100 710 T 1600 780 L 1600 1000 L 0 1000 Z" fill="#8f6333" fill-opacity="0.35" />

  <!-- EXCAVATED & GRADED SITE PAD (Matching Horseshoe Footprint) -->
  <path d="M 210 860 L 210 310 C 210 140, 440 75, 800 75 C 1160 75, 1390 140, 1390 310 L 1390 860 Z" 
        fill="url(#gradedPad)" stroke="#baa078" stroke-width="4" />

  <!-- Graded Earth Roller/Compactor Tracks -->
  <g stroke="#caa77c" stroke-width="2" stroke-dasharray="12 16" opacity="0.6">
    <line x1="240" y1="360" x2="240" y2="840" />
    <line x1="270" y1="360" x2="270" y2="840" />
    <line x1="1330" y1="360" x2="1330" y2="840" />
    <line x1="1360" y1="360" x2="1360" y2="840" />
    <path d="M 400 240 C 580 180, 1020 180, 1200 240" fill="none" stroke-width="4" />
  </g>

  <!-- REAL HIGHWAY & ASPHALT ROADS (Paved As-Built) -->
  <g id="satellite-roads">
    <!-- Outer Main Highway (King Salman Blvd) -->
    <path d="M 0 870 L 1600 870" stroke="#26282e" stroke-width="42" stroke-linecap="square" />
    <path d="M 0 870 L 1600 870" stroke="#f1f5f9" stroke-width="2" stroke-dasharray="14 12" />
    <!-- Road Curbs (Concrete yellow/black curb stones) -->
    <path d="M 0 848 L 1600 848" stroke="#94a3b8" stroke-width="2" />
    <path d="M 0 892 L 1600 892" stroke="#94a3b8" stroke-width="2" />

    <!-- Entrance Boulevard (Paved Asphalt + Landscaped Center Median) -->
    <path d="M 740 850 L 740 680" stroke="#2c3038" stroke-width="28" />
    <path d="M 860 850 L 860 680" stroke="#2c3038" stroke-width="28" />
    <!-- Real Green Center Median with Date Palms -->
    <rect x="758" y="680" width="84" height="170" fill="#3f6212" stroke="#15803d" stroke-width="2" />
    <!-- Palm trees (seen from satellite) -->
    <g fill="#166534">
      <circle cx="800" cy="710" r="14" />
      <circle cx="800" cy="750" r="14" />
      <circle cx="800" cy="790" r="14" />
      <circle cx="800" cy="830" r="14" />
    </g>

    <!-- HORSESHOE RING ROAD (Paved Dark Grey Asphalt) -->
    <path d="M 330 840 L 330 380 C 330 230, 520 160, 800 160 C 1080 160, 1270 230, 1270 380 L 1270 840" 
          fill="none" stroke="#2b2f38" stroke-width="24" />
    <!-- White center lane dashed paint -->
    <path d="M 330 840 L 330 380 C 330 230, 520 160, 800 160 C 1080 160, 1270 230, 1270 380 L 1270 840" 
          fill="none" stroke="#f8fafc" stroke-width="1.2" stroke-dasharray="10 8" />

    <!-- Inner Distribution Loop (Compacted Aggregate Base Course - Subbase) -->
    <path d="M 450 820 L 450 440 C 450 310, 590 260, 800 260 C 1010 260, 1150 310, 1150 440 L 1150 820" 
          fill="none" stroke="#64748b" stroke-width="18" />
    <path d="M 450 820 L 450 440 C 450 310, 590 260, 800 260 C 1010 260, 1150 310, 1150 440 L 1150 820" 
          fill="none" stroke="#94a3b8" stroke-width="1" stroke-dasharray="8 8" />

    <!-- Cross connectors paved -->
    <line x1="330" y1="620" x2="450" y2="620" stroke="#2b2f38" stroke-width="16" />
    <line x1="330" y1="460" x2="450" y2="460" stroke="#2b2f38" stroke-width="16" />
    <line x1="1150" y1="620" x2="1270" y2="620" stroke="#2b2f38" stroke-width="16" />
    <line x1="1150" y1="460" x2="1270" y2="460" stroke="#2b2f38" stroke-width="16" />
    <line x1="680" y1="180" x2="710" y2="260" stroke="#2b2f38" stroke-width="16" />
    <line x1="920" y1="180" x2="890" y2="260" stroke="#2b2f38" stroke-width="16" />

    <!-- Roundabouts (ميادين مرورية - خضراء ومنفذة) -->
    <circle cx="800" cy="680" r="45" fill="#2b2f38" stroke="#94a3b8" stroke-width="4" />
    <circle cx="800" cy="680" r="26" fill="#15803d" stroke="#86efac" stroke-width="2" />
    <circle cx="800" cy="680" r="10" fill="#047857" />

    <circle cx="800" cy="160" r="38" fill="#2b2f38" stroke="#94a3b8" stroke-width="3" />
    <circle cx="800" cy="160" r="20" fill="#15803d" stroke="#86efac" stroke-width="2" />
  </g>

  <!-- ACTUAL ON-SITE RESIDENTIAL VILLAS (Real As-Built Skeletons & Slabs) -->
  <g id="satellite-villas" filter="url(#buildingShadow)">
    <!-- Left Wing Villas (Real Concrete Slabs and Masonry Walls) -->
    <!-- Plot 101: Villa Under Second Floor Slab -->
    <rect x="245" y="740" width="58" height="74" fill="#cbd5e1" stroke="#475569" stroke-width="2" />
    <rect x="252" y="747" width="22" height="28" fill="#94a3b8" />
    <rect x="278" y="780" width="20" height="26" fill="#64748b" />

    <!-- Plot 102: Villa Structure Completed with Parapet -->
    <rect x="245" y="640" width="58" height="74" fill="#e2e8f0" stroke="#475569" stroke-width="2" />
    <rect x="255" y="650" width="38" height="54" fill="#f8fafc" />

    <!-- Plot 103: Ground Floor Columns and Perimeter Wall -->
    <rect x="238" y="535" width="72" height="85" fill="none" stroke="#94a3b8" stroke-width="3" />
    <rect x="250" y="550" width="48" height="55" fill="#94a3b8" />
    <!-- Yellow excavator on site -->
    <rect x="280" y="540" width="12" height="8" fill="#eab308" filter="url(#heavyCraneShadow)" />

    <!-- Plot 104: Foundation Rebar and Footing Cast -->
    <rect x="245" y="440" width="58" height="74" fill="#64748b" stroke="#334155" stroke-width="2" />

    <!-- Plot 105: Excavated Foundation Pit -->
    <rect x="245" y="340" width="58" height="74" fill="#78491c" stroke="#523112" stroke-width="3" />

    <!-- Top Horseshoe Curved Plots (Under active construction) -->
    <polygon points="330,280 380,225 435,270 380,325" fill="#cbd5e1" stroke="#475569" stroke-width="2" />
    <polygon points="420,190 480,150 535,205 470,245" fill="#e2e8f0" stroke="#475569" stroke-width="2" />
    <polygon points="530,140 600,115 635,180 565,205" fill="#94a3b8" stroke="#475569" stroke-width="2" />

    <!-- Right Wing Villas -->
    <rect x="1295" y="340" width="58" height="74" fill="#cbd5e1" stroke="#475569" stroke-width="2" />
    <rect x="1295" y="440" width="58" height="74" fill="#e2e8f0" stroke="#475569" stroke-width="2" />
    <rect x="1295" y="540" width="58" height="74" fill="#f1f5f9" stroke="#334155" stroke-width="2" />
    <rect x="1295" y="640" width="58" height="74" fill="#94a3b8" stroke="#475569" stroke-width="2" />
    <rect x="1295" y="740" width="58" height="74" fill="#cbd5e1" stroke="#475569" stroke-width="2" />
  </g>

  <!-- CENTRAL SERVICES - ACTUAL CONSTRUCTION REALITY -->
  <g id="satellite-services">
    <!-- 1. Primary School (Structure Frame Topped Out + Athletic Oval) -->
    <g filter="url(#buildingShadow)">
      <rect x="520" y="320" width="240" height="150" fill="#baa280" stroke="#8d7454" stroke-width="2" />
      <rect x="540" y="340" width="130" height="80" fill="#e2e8f0" stroke="#334155" stroke-width="2" />
      <rect x="555" y="355" width="45" height="50" fill="#cbd5e1" />
      <rect x="610" y="355" width="45" height="50" fill="#cbd5e1" />
      <!-- Real sports oval grass seeded -->
      <rect x="685" y="340" width="60" height="100" rx="30" fill="#15803d" stroke="#86efac" stroke-width="2" />
    </g>

    <!-- 2. Social Club (Clubhouse Completed + Pool Dug) -->
    <g filter="url(#buildingShadow)">
      <rect x="840" y="320" width="240" height="150" fill="#baa280" stroke="#8d7454" stroke-width="2" />
      <!-- Clubhouse structure -->
      <rect x="860" y="340" width="90" height="50" fill="#f8fafc" stroke="#334155" stroke-width="2" />
      <!-- Real Blue Water in Swimming Pool -->
      <rect x="970" y="340" width="90" height="40" rx="6" fill="#0284c7" stroke="#38bdf8" stroke-width="2" />
    </g>

    <!-- 3. Grand Mosque (Finished White Marble + Golden Dome + Minaret Casting Shadow) -->
    <g filter="url(#buildingShadow)">
      <rect x="700" y="490" width="200" height="140" fill="#e2e8f0" stroke="#64748b" stroke-width="2" />
      <!-- Mosque white marble prayer hall -->
      <polygon points="770,520 830,520 860,550 860,590 830,620 770,620 740,590 740,550" fill="#ffffff" stroke="#94a3b8" stroke-width="2" />
      <!-- Golden Dome shining under desert sun -->
      <circle cx="800" cy="570" r="28" fill="#eab308" stroke="#fef08a" stroke-width="2" />
      <!-- Minaret Tower with long shadow -->
      <circle cx="725" cy="515" r="10" fill="#f8fafc" stroke="#475569" stroke-width="2" />
    </g>

    <!-- 4. Health Clinic (Concrete Structure under plastering) -->
    <g filter="url(#buildingShadow)">
      <rect x="520" y="490" width="160" height="140" fill="#c4aa87" stroke="#8d7454" stroke-width="2" />
      <rect x="540" y="515" width="120" height="90" fill="#cbd5e1" stroke="#334155" stroke-width="2" />
    </g>

    <!-- 5. Commercial Mall (Deep Foundation Pit + Tower Crane Installed) -->
    <g filter="url(#buildingShadow)">
      <rect x="920" y="490" width="160" height="140" fill="#603813" stroke="#45270c" stroke-width="3" />
      <!-- Excavated pit depth shadow -->
      <rect x="935" y="505" width="130" height="110" fill="#43250a" />
      <!-- Tower Crane Jib and Mast -->
      <g filter="url(#heavyCraneShadow)">
        <circle cx="1000" cy="560" r="6" fill="#dc2626" />
        <line x1="940" y1="560" x2="1070" y2="560" stroke="#dc2626" stroke-width="3" />
        <line x1="1000" y1="560" x2="1000" y2="520" stroke="#dc2626" stroke-width="2" />
      </g>
    </g>
  </g>

  <!-- CONSTRUCTION STAGING AREA, PORTACABINS & HEAVY FLEET -->
  <g id="contractor-camp">
    <!-- White Portacabins (Site Offices with Blue Roofs) -->
    <g fill="#ffffff" stroke="#0284c7" stroke-width="1.5" filter="url(#buildingShadow)">
      <rect x="470" y="660" width="30" height="14" />
      <rect x="505" y="660" width="30" height="14" />
      <rect x="540" y="660" width="30" height="14" />
      <rect x="470" y="680" width="30" height="14" />
      <rect x="505" y="680" width="30" height="14" />
    </g>

    <!-- Heavy Fleet Machines (Excavators & Dump Trucks parked) -->
    <g fill="#eab308" stroke="#a16207" stroke-width="1" filter="url(#heavyCraneShadow)">
      <rect x="610" y="670" width="16" height="9" rx="1" />
      <rect x="632" y="670" width="16" height="9" rx="1" />
      <rect x="610" y="685" width="18" height="10" rx="1" fill="#f97316" />
      <rect x="635" y="685" width="18" height="10" rx="1" fill="#f97316" />
    </g>

    <!-- Aggregate Stockpiles (Sand & Gravel Mounds) -->
    <ellipse cx="680" cy="685" rx="18" ry="14" fill="#e2c092" stroke="#caa270" stroke-width="1.5" />
    <ellipse cx="705" cy="680" rx="14" ry="11" fill="#78716c" stroke="#57534e" stroke-width="1.5" />
  </g>

  <!-- REAL SATELLITE HUD / TELEMETRY OVERLAY -->
  <g id="satellite-hud" transform="translate(40, 40)">
    <!-- Top-Left Telemetry Box -->
    <rect width="360" height="85" fill="#0f172a" fill-opacity="0.88" rx="8" stroke="#334155" stroke-width="1" />
    <circle cx="20" cy="24" r="5" fill="#ef4444" />
    <text x="35" y="28" fill="#f8fafc" font-size="12" font-weight="bold">MAXAR WORLDVIEW-3 HIGH RESOLUTION</text>
    <text x="35" y="48" fill="#94a3b8" font-size="10" font-family="monospace">GSD: 0.30 m/px | SUN AZIMUTH: 162° | ELEV: 48.2°</text>
    <text x="35" y="66" fill="#38bdf8" font-size="10" font-weight="bold">التصوير الجوي الفعلي للموقع (As-Built Satellite)</text>
  </g>

  <!-- SATELLITE SCALE BAR -->
  <g id="satellite-scale" transform="translate(1360, 930)">
    <rect width="180" height="40" fill="#0f172a" fill-opacity="0.85" rx="6" stroke="#334155" stroke-width="1" />
    <line x1="20" y1="20" x2="160" y2="20" stroke="#ffffff" stroke-width="3" />
    <line x1="20" y1="14" x2="20" y2="26" stroke="#ffffff" stroke-width="3" />
    <line x1="90" y1="16" x2="90" y2="24" stroke="#ffffff" stroke-width="2" />
    <line x1="160" y1="14" x2="160" y2="26" stroke="#ffffff" stroke-width="3" />
    <text x="20" y="34" fill="#e2e8f0" font-size="9" font-family="monospace">0</text>
    <text x="85" y="34" fill="#e2e8f0" font-size="9" font-family="monospace">50m</text>
    <text x="145" y="34" fill="#e2e8f0" font-size="9" font-family="monospace">100m</text>
  </g>
</svg>`;
}

// Write the files
const cadSvg = generateCadSvg();
const satSvg = generateSatelliteSvg();

fs.writeFileSync(path.join(process.cwd(), 'public/images/cad-blueprint.svg'), cadSvg);
fs.writeFileSync(path.join(process.cwd(), 'public/images/satellite-aerial.svg'), satSvg);

// Also overwrite cad.png and satellite.png with SVG content or fallback so existing links stay active
fs.writeFileSync(path.join(process.cwd(), 'public/images/cad.svg'), cadSvg);
fs.writeFileSync(path.join(process.cwd(), 'public/images/satellite.svg'), satSvg);

console.log('Generated cad-blueprint.svg and satellite-aerial.svg successfully!');
