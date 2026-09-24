const fs = require('fs');
const path = require('path');

function generateExactSvg() {
  const width = 1920;
  const height = 1080;

  // Let's generate the network paths geometry that accurately reflects the road map in the screenshot:
  // The map has major concentric curving ring boulevards and criss-crossing avenue grids.
  
  let networkLinesSvg = '';

  // Ring Boulevards (Center around (800, 350))
  const rings = [
    { cx: 780, cy: 360, rx: 620, ry: 460 },
    { cx: 780, cy: 360, rx: 480, ry: 360 },
    { cx: 780, cy: 360, rx: 340, ry: 260 },
    { cx: 780, cy: 360, rx: 200, ry: 160 },
  ];

  // Base roads (dark gray background lanes)
  rings.forEach((r, i) => {
    networkLinesSvg += `<ellipse cx="${r.cx}" cy="${r.cy}" rx="${r.rx}" ry="${r.ry}" fill="none" stroke="#1f2838" stroke-width="12" stroke-linejoin="round" />\n`;
    networkLinesSvg += `<ellipse cx="${r.cx}" cy="${r.cy}" rx="${r.rx}" ry="${r.ry}" fill="none" stroke="#253247" stroke-width="8" stroke-linejoin="round" />\n`;
  });

  // Radial avenues
  for (let angle = 0; angle < 360; angle += 18) {
    const rad = (angle * Math.PI) / 180;
    const x1 = 780 + Math.cos(rad) * 120;
    const y1 = 360 + Math.sin(rad) * 90;
    const x2 = 780 + Math.cos(rad) * 660;
    const y2 = 360 + Math.sin(rad) * 500;
    networkLinesSvg += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#1f2838" stroke-width="10" />\n`;
    networkLinesSvg += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#253247" stroke-width="6" />\n`;
  }

  // Cross street grids
  for (let x = 60; x <= 1400; x += 55) {
    networkLinesSvg += `<line x1="${x}" y1="60" x2="${x + 40}" y2="650" stroke="#18202d" stroke-width="4" stroke-dasharray="8 4" opacity="0.6"/>\n`;
  }
  for (let y = 70; y <= 650; y += 45) {
    networkLinesSvg += `<line x1="20" y1="${y}" x2="1400" y2="${y + 20}" stroke="#18202d" stroke-width="4" stroke-dasharray="8 4" opacity="0.6"/>\n`;
  }

  // Now the colorful utility network lines:
  // Colors:
  // Orange: Electricity (#ff9800)
  // Red: Gas (#f44336)
  // Blue: Water (#2196f3)
  // Purple: Sewage (#ab47bc)
  // Green: Telecom (#4caf50)
  // Cyan: Irrigation (#00e5ff)

  // 1. Electricity Network (Orange)
  rings.forEach((r, idx) => {
    const offset = -4;
    networkLinesSvg += `<ellipse cx="${r.cx + offset}" cy="${r.cy + offset}" rx="${r.rx}" ry="${r.ry}" fill="none" stroke="#ff9800" stroke-width="2.2" stroke-opacity="0.95" />\n`;
  });
  for (let angle = 0; angle < 360; angle += 36) {
    const rad = (angle * Math.PI) / 180;
    const x1 = 780 + Math.cos(rad) * 110;
    const y1 = 360 + Math.sin(rad) * 85;
    const x2 = 780 + Math.cos(rad) * 650;
    const y2 = 360 + Math.sin(rad) * 490;
    networkLinesSvg += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#ff9800" stroke-width="2.4" stroke-opacity="0.95" />\n`;
  }

  // 2. Water Network (Blue)
  rings.forEach((r, idx) => {
    const offset = 2;
    networkLinesSvg += `<ellipse cx="${r.cx + offset}" cy="${r.cy + offset}" rx="${r.rx + 6}" ry="${r.ry + 5}" fill="none" stroke="#2196f3" stroke-width="2.0" stroke-opacity="0.9" />\n`;
  });
  for (let angle = 18; angle < 360; angle += 36) {
    const rad = (angle * Math.PI) / 180;
    const x1 = 780 + Math.cos(rad) * 130;
    const y1 = 360 + Math.sin(rad) * 95;
    const x2 = 780 + Math.cos(rad) * 640;
    const y2 = 360 + Math.sin(rad) * 480;
    networkLinesSvg += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#2196f3" stroke-width="2.2" stroke-opacity="0.9" />\n`;
  }

  // 3. Sewage Network (Purple)
  rings.forEach((r, idx) => {
    const offset = 6;
    networkLinesSvg += `<ellipse cx="${r.cx + offset}" cy="${r.cy + offset}" rx="${r.rx - 8}" ry="${r.ry - 7}" fill="none" stroke="#ab47bc" stroke-width="2.2" stroke-opacity="0.92" />\n`;
  });
  for (let angle = 9; angle < 360; angle += 36) {
    const rad = (angle * Math.PI) / 180;
    const x1 = 780 + Math.cos(rad) * 140;
    const y1 = 360 + Math.sin(rad) * 105;
    const x2 = 780 + Math.cos(rad) * 630;
    const y2 = 360 + Math.sin(rad) * 475;
    networkLinesSvg += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#ab47bc" stroke-width="2.0" stroke-opacity="0.92" />\n`;
  }

  // 4. Gas Network (Red)
  for (let angle = 27; angle < 360; angle += 36) {
    const rad = (angle * Math.PI) / 180;
    const x1 = 780 + Math.cos(rad) * 160;
    const y1 = 360 + Math.sin(rad) * 115;
    const x2 = 780 + Math.cos(rad) * 620;
    const y2 = 360 + Math.sin(rad) * 460;
    networkLinesSvg += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#f44336" stroke-width="2.0" stroke-opacity="0.88" />\n`;
  }

  // 5. Telecom Network (Green)
  for (let x = 120; x <= 1380; x += 110) {
    networkLinesSvg += `<line x1="${x}" y1="80" x2="${x + 20}" y2="630" stroke="#4caf50" stroke-width="1.8" stroke-opacity="0.85" />\n`;
  }

  // 6. Irrigation Network (Cyan)
  for (let y = 110; y <= 620; y += 75) {
    networkLinesSvg += `<line x1="40" y1="${y}" x2="1380" y2="${y + 15}" stroke="#00e5ff" stroke-width="1.8" stroke-opacity="0.85" />\n`;
  }

  // Add hundreds of asset nodes/points across the map (dots like in screenshot)
  const nodeColors = ['#ff9800', '#2196f3', '#ab47bc', '#4caf50', '#00e5ff', '#f44336', '#f59e0b'];
  for (let i = 0; i < 450; i++) {
    const rx = (i * 137.5) % 360;
    const rad = (rx * Math.PI) / 180;
    const dist = 120 + ((i * 47) % 520);
    const nx = 780 + Math.cos(rad) * dist + ((i % 17) - 8) * 15;
    const ny = 360 + Math.sin(rad) * (dist * 0.75) + ((i % 13) - 6) * 15;
    if (nx > 30 && nx < 1400 && ny > 65 && ny < 640) {
      const color = nodeColors[i % nodeColors.length];
      const radius = (i % 5 === 0) ? 3.5 : 2.2;
      networkLinesSvg += `<circle cx="${nx.toFixed(1)}" cy="${ny.toFixed(1)}" r="${radius}" fill="${color}" stroke="#0a0d14" stroke-width="0.8" />\n`;
    }
  }

  // Build the complete SVG matching the screenshot exactly
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" style="background:#090d14; font-family:'Cairo', 'Segoe UI', Tahoma, Arial, sans-serif;">
  
  <!-- ================= TOP HEADER BAR ================= -->
  <rect x="0" y="0" width="1920" height="48" fill="#0d1117" stroke="#161b22" stroke-width="1"/>
  
  <!-- Left Side: 79,423 Total Assets Badge -->
  <g transform="translate(14, 9)">
    <rect x="0" y="0" width="135" height="30" rx="4" fill="#161b22" stroke="#30363d" stroke-width="1"/>
    <text x="32" y="20" font-size="12" fill="#8b949e" font-family="'Segoe UI', Tahoma, sans-serif">79,423 عنصر مصنف</text>
    <path d="M 16 11 A 5.5 5.5 0 1 1 11 16" fill="none" stroke="#8b949e" stroke-width="1.5"/>
    <polygon points="11,13 14,16 10,18" fill="#8b949e"/>
  </g>

  <!-- Right Side Controls & Filters -->
  <!-- Search input -->
  <g transform="translate(930, 9)">
    <rect x="0" y="0" width="140" height="30" rx="4" fill="#161b22" stroke="#30363d" stroke-width="1"/>
    <text x="120" y="20" font-size="11" fill="#6e7681" text-anchor="end">...بحث في العناصر</text>
    <circle cx="15" cy="15" r="4.5" fill="none" stroke="#6e7681" stroke-width="1.2"/>
    <line x1="18.5" y1="18.5" x2="23" y2="23" stroke="#6e7681" stroke-width="1.2"/>
  </g>

  <!-- Dropdowns -->
  <!-- كل جهات التنفيذ -->
  <g transform="translate(1085, 9)">
    <rect x="0" y="0" width="115" height="30" rx="4" fill="#161b22" stroke="#30363d" stroke-width="1"/>
    <text x="95" y="20" font-size="11" fill="#c9d1d9" text-anchor="end">كل جهات التنفيذ</text>
    <polyline points="15,13 19,17 23,13" fill="none" stroke="#8b949e" stroke-width="1.5"/>
  </g>

  <!-- كل الأنواع -->
  <g transform="translate(1215, 9)">
    <rect x="0" y="0" width="95" height="30" rx="4" fill="#161b22" stroke="#30363d" stroke-width="1"/>
    <text x="78" y="20" font-size="11" fill="#c9d1d9" text-anchor="end">كل الأنواع</text>
    <polyline points="15,13 19,17 23,13" fill="none" stroke="#8b949e" stroke-width="1.5"/>
  </g>

  <!-- كل القطاعات -->
  <g transform="translate(1325, 9)">
    <rect x="0" y="0" width="105" height="30" rx="4" fill="#161b22" stroke="#30363d" stroke-width="1"/>
    <text x="88" y="20" font-size="11" fill="#c9d1d9" text-anchor="end">كل القطاعات</text>
    <polyline points="15,13 19,17 23,13" fill="none" stroke="#8b949e" stroke-width="1.5"/>
  </g>

  <!-- كل الشبكات -->
  <g transform="translate(1445, 9)">
    <rect x="0" y="0" width="110" height="30" rx="4" fill="#161b22" stroke="#30363d" stroke-width="1"/>
    <text x="92" y="20" font-size="11" fill="#c9d1d9" text-anchor="end">كل الشبكات</text>
    <polyline points="15,13 19,17 23,13" fill="none" stroke="#8b949e" stroke-width="1.5"/>
  </g>

  <!-- Title: فلاتر الخريطة والكروت -->
  <g transform="translate(1760, 26)">
    <text x="0" y="0" font-size="14" font-weight="bold" fill="#f0f6fc" text-anchor="end">فلاتر الخريطة والكروت</text>
    <!-- Funnel Icon -->
    <path d="M 12 -12 L 26 -12 L 20 -4 L 20 2 L 18 4 L 18 -4 Z" fill="none" stroke="#e3b341" stroke-width="1.5"/>
  </g>


  <!-- ================= UPPER LEFT: MAIN MAP VIEW ================= -->
  <g transform="translate(8, 54)">
    <!-- Map Canvas Background -->
    <rect x="0" y="0" width="1410" height="606" fill="#090d14" rx="4" stroke="#21262d" stroke-width="1"/>
    
    <!-- Render all network lines and nodes -->
    <g clip-path="url(#mapClip)">
      <clipPath id="mapClip">
        <rect x="0" y="0" width="1410" height="606" rx="4"/>
      </clipPath>
      ${networkLinesSvg}
    </g>

    <!-- Map Controls: Zoom Buttons (Top-Left) -->
    <g transform="translate(16, 16)">
      <rect x="0" y="0" width="30" height="62" rx="3" fill="#161b22" stroke="#30363d" stroke-width="1"/>
      <!-- Plus -->
      <line x1="15" y1="8" x2="15" y2="24" stroke="#f0f6fc" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="7" y1="16" x2="23" y2="16" stroke="#f0f6fc" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Divider -->
      <line x1="0" y1="31" x2="30" y2="31" stroke="#30363d" stroke-width="1"/>
      <!-- Minus -->
      <line x1="7" y1="46" x2="23" y2="46" stroke="#f0f6fc" stroke-width="2.5" stroke-linecap="round"/>
    </g>

    <!-- Legend Box (مفتاح الشبكات) -->
    <g transform="translate(16, 88)">
      <rect x="0" y="0" width="135" height="155" rx="5" fill="#0d1117" fill-opacity="0.9" stroke="#30363d" stroke-width="1"/>
      <text x="122" y="22" font-size="12" font-weight="bold" fill="#f0f6fc" text-anchor="end">مفتاح الشبكات</text>
      
      <!-- Items -->
      <circle cx="118" cy="42" r="5" fill="#ff9800"/>
      <text x="106" y="46" font-size="11" fill="#c9d1d9" text-anchor="end">شبكة الكهرباء</text>

      <circle cx="118" cy="64" r="5" fill="#f44336"/>
      <text x="106" y="68" font-size="11" fill="#c9d1d9" text-anchor="end">شبكة الغاز</text>

      <circle cx="118" cy="86" r="5" fill="#2196f3"/>
      <text x="106" y="90" font-size="11" fill="#c9d1d9" text-anchor="end">شبكة المياه</text>

      <circle cx="118" cy="108" r="5" fill="#ab47bc"/>
      <text x="106" y="112" font-size="11" fill="#c9d1d9" text-anchor="end">شبكة الصرف الصحي</text>

      <circle cx="118" cy="130" r="5" fill="#4caf50"/>
      <text x="106" y="134" font-size="11" fill="#c9d1d9" text-anchor="end">شبكة الاتصالات</text>

      <circle cx="118" cy="150" r="5" fill="#00e5ff"/>
      <text x="106" y="154" font-size="11" fill="#c9d1d9" text-anchor="end">شبكة الري</text>
    </g>

    <!-- Basemap Switcher (Bottom-Left) -->
    <g transform="translate(16, 560)">
      <rect x="0" y="0" width="145" height="32" rx="4" fill="#0d1117" stroke="#30363d" stroke-width="1"/>
      <!-- داكن (Active) -->
      <rect x="110" y="3" width="32" height="26" rx="3" fill="#d9822b"/>
      <text x="126" y="20" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">داكن</text>
      <!-- فاتح -->
      <text x="92" y="20" font-size="11" fill="#8b949e" text-anchor="middle">فاتح</text>
      <!-- طرق -->
      <text x="56" y="20" font-size="11" fill="#8b949e" text-anchor="middle">طرق</text>
      <!-- صور -->
      <text x="20" y="20" font-size="11" fill="#8b949e" text-anchor="middle">صور</text>
    </g>

    <!-- Top Right Toggle: [ خريطة ] [ جدول ] -->
    <g transform="translate(1270, 16)">
      <rect x="0" y="0" width="124" height="30" rx="4" fill="#161b22" stroke="#30363d" stroke-width="1"/>
      <!-- Active خريطة -->
      <rect x="62" y="2" width="60" height="26" rx="3" fill="#d9822b"/>
      <text x="96" y="19" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">خريطة</text>
      <!-- Inactive جدول -->
      <text x="32" y="19" font-size="11" fill="#8b949e" text-anchor="middle">جدول</text>
    </g>
  </g>


  <!-- ================= UPPER RIGHT: عناصر شبكات المرافق ================= -->
  <g transform="translate(1426, 54)">
    <rect x="0" y="0" width="486" height="606" fill="#0d1117" rx="4" stroke="#21262d" stroke-width="1"/>
    
    <!-- Header -->
    <text x="470" y="28" font-size="14" font-weight="bold" fill="#f0f6fc" text-anchor="end">عناصر شبكات المرافق</text>
    <!-- Filter box -->
    <rect x="16" y="12" width="80" height="24" rx="3" fill="#161b22" stroke="#30363d" stroke-width="1"/>
    <text x="80" y="28" font-size="10" fill="#6e7681" text-anchor="end">...تصفية</text>

    <!-- 2-Column Grid of 21 Asset Metric Cards -->
    <!-- Col 1 (Right): x: 248, Col 2 (Left): x: 16 -->
    <!-- Row 1 (y: 50) -->
    <g transform="translate(248, 50)">
      <text x="18" y="28" font-size="20" font-weight="bold" fill="#e3b341">9,695</text>
      <text x="216" y="20" font-size="11" fill="#8b949e" text-anchor="end">عمود إنارة</text>
      <!-- streetlight icon -->
      <path d="M 216 28 L 220 28 L 218 36 Z" fill="#e3b341"/>
    </g>
    <g transform="translate(16, 50)">
      <text x="18" y="28" font-size="20" font-weight="bold" fill="#e3b341">5,467</text>
      <text x="216" y="20" font-size="11" fill="#8b949e" text-anchor="end">تغذية عمارات</text>
      <polygon points="214,26 218,22 216,28 220,28 213,38 215,31 211,31" fill="#e3b341"/>
    </g>

    <!-- Row 2 (y: 100) -->
    <g transform="translate(248, 100)">
      <text x="18" y="28" font-size="20" font-weight="bold" fill="#d2a8ff">5,898</text>
      <text x="216" y="20" font-size="11" fill="#8b949e" text-anchor="end">مطبق بلاعة صرف صحي</text>
      <circle cx="216" cy="30" r="4" fill="#d2a8ff"/>
    </g>
    <g transform="translate(16, 100)">
      <text x="18" y="28" font-size="20" font-weight="bold" fill="#e3b341">3,098</text>
      <text x="216" y="20" font-size="11" fill="#8b949e" text-anchor="end">كوفرية</text>
      <rect x="212" y="24" width="8" height="10" fill="#e3b341"/>
    </g>

    <!-- Row 3 (y: 150) -->
    <g transform="translate(248, 150)">
      <text x="18" y="28" font-size="20" font-weight="bold" fill="#d2a8ff">4,429</text>
      <text x="216" y="20" font-size="11" fill="#8b949e" text-anchor="end">200 خط صرف</text>
      <line x1="210" y1="28" x2="222" y2="28" stroke="#d2a8ff" stroke-width="3"/>
    </g>
    <g transform="translate(16, 150)">
      <text x="18" y="28" font-size="20" font-weight="bold" fill="#e3b341">2,191</text>
      <text x="216" y="20" font-size="11" fill="#8b949e" text-anchor="end">بيلر</text>
      <rect x="213" y="24" width="6" height="12" fill="#e3b341"/>
    </g>

    <!-- Row 4 (y: 200) -->
    <g transform="translate(248, 200)">
      <text x="18" y="28" font-size="20" font-weight="bold" fill="#e3b341">3,176</text>
      <text x="216" y="20" font-size="11" fill="#8b949e" text-anchor="end">كابلات جهد منخفض</text>
      <path d="M 210 28 Q 216 22 222 28" fill="none" stroke="#e3b341" stroke-width="2"/>
    </g>
    <g transform="translate(16, 200)">
      <text x="18" y="28" font-size="20" font-weight="bold" fill="#79c0ff">1,324</text>
      <text x="216" y="20" font-size="11" fill="#8b949e" text-anchor="end">100 خط مياه</text>
      <circle cx="216" cy="28" r="4" fill="#79c0ff"/>
    </g>

    <!-- Row 5 (y: 250) -->
    <g transform="translate(248, 250)">
      <text x="18" y="28" font-size="20" font-weight="bold" fill="#7ee787">2,436</text>
      <text x="216" y="20" font-size="11" fill="#8b949e" text-anchor="end">بوكس</text>
      <rect x="211" y="24" width="10" height="8" fill="#7ee787"/>
    </g>
    <g transform="translate(16, 250)">
      <text x="18" y="28" font-size="20" font-weight="bold" fill="#79c0ff">1,053</text>
      <text x="216" y="20" font-size="11" fill="#8b949e" text-anchor="end">مطبق بلاعة مطر</text>
      <circle cx="216" cy="28" r="4" fill="#79c0ff"/>
    </g>

    <!-- Row 6 (y: 300) -->
    <g transform="translate(248, 300)">
      <text x="18" y="28" font-size="20" font-weight="bold" fill="#79c0ff">2,635</text>
      <text x="216" y="20" font-size="11" fill="#8b949e" text-anchor="end">63 خط مياه</text>
      <circle cx="216" cy="28" r="4" fill="#79c0ff"/>
    </g>
    <g transform="translate(16, 300)">
      <text x="18" y="28" font-size="20" font-weight="bold" fill="#79c0ff">797</text>
      <text x="216" y="20" font-size="11" fill="#8b949e" text-anchor="end">صنبور حريق</text>
      <circle cx="216" cy="28" r="4" fill="#f85149"/>
    </g>

    <!-- Row 7 (y: 350) -->
    <g transform="translate(248, 350)">
      <text x="18" y="28" font-size="20" font-weight="bold" fill="#d2a8ff">1,868</text>
      <text x="216" y="20" font-size="11" fill="#8b949e" text-anchor="end">80 خط صرف</text>
      <line x1="210" y1="28" x2="222" y2="28" stroke="#d2a8ff" stroke-width="2.5"/>
    </g>
    <g transform="translate(16, 350)">
      <text x="18" y="28" font-size="20" font-weight="bold" fill="#f85149">607</text>
      <text x="216" y="20" font-size="11" fill="#8b949e" text-anchor="end">كابلات جهد متوسط</text>
      <path d="M 210 28 Q 216 22 222 28" fill="none" stroke="#f85149" stroke-width="2"/>
    </g>

    <!-- Row 8 (y: 400) -->
    <g transform="translate(248, 400)">
      <text x="18" y="28" font-size="20" font-weight="bold" fill="#79c0ff">1,564</text>
      <text x="216" y="20" font-size="11" fill="#8b949e" text-anchor="end">110 خط مياه</text>
      <circle cx="216" cy="28" r="4" fill="#79c0ff"/>
    </g>
    <g transform="translate(16, 400)">
      <text x="18" y="28" font-size="20" font-weight="bold" fill="#56d364">1,279</text>
      <text x="216" y="20" font-size="11" fill="#8b949e" text-anchor="end">50 خط ري</text>
      <circle cx="216" cy="28" r="4" fill="#56d364"/>
    </g>

    <!-- Row 9 (y: 450) -->
    <g transform="translate(248, 450)">
      <text x="18" y="28" font-size="20" font-weight="bold" fill="#79c0ff">1,225</text>
      <text x="216" y="20" font-size="11" fill="#8b949e" text-anchor="end">150 خط مياه</text>
      <circle cx="216" cy="28" r="4" fill="#79c0ff"/>
    </g>
    <g transform="translate(16, 450)">
      <text x="18" y="28" font-size="20" font-weight="bold" fill="#79c0ff">1,049</text>
      <text x="216" y="20" font-size="11" fill="#8b949e" text-anchor="end">كونتكتور</text>
      <circle cx="216" cy="28" r="4" fill="#79c0ff"/>
    </g>

    <!-- Row 10 (y: 500) -->
    <g transform="translate(248, 500)">
      <text x="18" y="28" font-size="20" font-weight="bold" fill="#56d364">992</text>
      <text x="216" y="20" font-size="11" fill="#8b949e" text-anchor="end">100 خط ري</text>
      <circle cx="216" cy="28" r="4" fill="#56d364"/>
    </g>
    <g transform="translate(16, 500)">
      <text x="18" y="28" font-size="20" font-weight="bold" fill="#79c0ff">733</text>
      <text x="216" y="20" font-size="11" fill="#8b949e" text-anchor="end">160 خط مياه</text>
      <circle cx="216" cy="28" r="4" fill="#79c0ff"/>
    </g>

    <!-- Row 11 (y: 550) -->
    <g transform="translate(248, 550)">
      <text x="18" y="28" font-size="20" font-weight="bold" fill="#f85149">660</text>
      <text x="216" y="20" font-size="11" fill="#8b949e" text-anchor="end">محبس</text>
      <circle cx="216" cy="28" r="4" fill="#f85149"/>
    </g>
  </g>


  <!-- ================= BOTTOM LEFT: أطوال أقطار خطوط شبكة المياه بالمتر ================= -->
  <g transform="translate(8, 668)">
    <rect x="0" y="0" width="1410" height="402" fill="#0d1117" rx="4" stroke="#21262d" stroke-width="1"/>
    
    <!-- Title -->
    <text x="1390" y="28" font-size="14" font-weight="bold" fill="#f0f6fc" text-anchor="end">أطوال أقطار خطوط شبكة المياه بالمتر</text>

    <!-- Chart Canvas Area (width: 1350, height: 320) -->
    <!-- Grid horizontal dashed lines -->
    <!-- 80,000 (y: 60) -->
    <text x="50" y="65" font-size="11" fill="#6e7681" text-anchor="end">80000</text>
    <line x1="56" y1="60" x2="1390" y2="60" stroke="#21262d" stroke-width="1" stroke-dasharray="4 4"/>

    <!-- 60,000 (y: 130) -->
    <text x="50" y="135" font-size="11" fill="#6e7681" text-anchor="end">60000</text>
    <line x1="56" y1="130" x2="1390" y2="130" stroke="#21262d" stroke-width="1" stroke-dasharray="4 4"/>

    <!-- 40,000 (y: 200) -->
    <text x="50" y="205" font-size="11" fill="#6e7681" text-anchor="end">40000</text>
    <line x1="56" y1="200" x2="1390" y2="200" stroke="#21262d" stroke-width="1" stroke-dasharray="4 4"/>

    <!-- 20,000 (y: 270) -->
    <text x="50" y="275" font-size="11" fill="#6e7681" text-anchor="end">20000</text>
    <line x1="56" y1="270" x2="1390" y2="270" stroke="#21262d" stroke-width="1" stroke-dasharray="4 4"/>

    <!-- 0 (y: 340) Base Line -->
    <text x="50" y="345" font-size="11" fill="#6e7681" text-anchor="end">0</text>
    <line x1="56" y1="340" x2="1390" y2="340" stroke="#30363d" stroke-width="1.5"/>

    <!-- 19 BARS WITH EXACT VALUES AND COLORS -->
    <!-- 1. 50 مم (55 م) -->
    <g transform="translate(68, 0)">
      <rect x="0" y="338" width="48" height="2" fill="#29b6f6" rx="2"/>
      <text x="24" y="332" font-size="10" font-weight="bold" fill="#f0f6fc" text-anchor="middle">55م</text>
      <text x="24" y="360" font-size="10" fill="#8b949e" text-anchor="middle">50 مم</text>
    </g>

    <!-- 2. 63 مم (23,236 م) -->
    <g transform="translate(136, 0)">
      <rect x="0" y="259" width="48" height="81" fill="#00bcd4" rx="2"/>
      <text x="24" y="252" font-size="10" font-weight="bold" fill="#f0f6fc" text-anchor="middle">23,236م</text>
      <text x="24" y="360" font-size="10" fill="#8b949e" text-anchor="middle">63 مم</text>
    </g>

    <!-- 3. 100 مم (54,662 م) -->
    <g transform="translate(204, 0)">
      <rect x="0" y="149" width="48" height="191" fill="#9ccc65" rx="2"/>
      <text x="24" y="142" font-size="10" font-weight="bold" fill="#f0f6fc" text-anchor="middle">54,662م</text>
      <text x="24" y="360" font-size="10" fill="#8b949e" text-anchor="middle">100 مم</text>
    </g>

    <!-- 4. 110 مم (67,029 م) HIGHEST -->
    <g transform="translate(272, 0)">
      <rect x="0" y="105" width="48" height="235" fill="#ab47bc" rx="2"/>
      <text x="24" y="98" font-size="10" font-weight="bold" fill="#f0f6fc" text-anchor="middle">67,029م</text>
      <text x="24" y="360" font-size="10" fill="#8b949e" text-anchor="middle">110 مم</text>
    </g>

    <!-- 5. 150 مم (43,233 م) -->
    <g transform="translate(340, 0)">
      <rect x="0" y="189" width="48" height="151" fill="#ff9800" rx="2"/>
      <text x="24" y="182" font-size="10" font-weight="bold" fill="#f0f6fc" text-anchor="middle">43,233م</text>
      <text x="24" y="360" font-size="10" fill="#8b949e" text-anchor="middle">150 مم</text>
    </g>

    <!-- 6. 160 مم (27,819 م) -->
    <g transform="translate(408, 0)">
      <rect x="0" y="243" width="48" height="97" fill="#fbc02d" rx="2"/>
      <text x="24" y="236" font-size="10" font-weight="bold" fill="#f0f6fc" text-anchor="middle">27,819م</text>
      <text x="24" y="360" font-size="10" fill="#8b949e" text-anchor="middle">160 مم</text>
    </g>

    <!-- 7. 200 مم (14,094 م) -->
    <g transform="translate(476, 0)">
      <rect x="0" y="291" width="48" height="49" fill="#4caf50" rx="2"/>
      <text x="24" y="284" font-size="10" font-weight="bold" fill="#f0f6fc" text-anchor="middle">14,094م</text>
      <text x="24" y="360" font-size="10" fill="#8b949e" text-anchor="middle">200 مم</text>
    </g>

    <!-- 8. 225 مم (6,634 م) -->
    <g transform="translate(544, 0)">
      <rect x="0" y="317" width="48" height="23" fill="#8d6e63" rx="2"/>
      <text x="24" y="310" font-size="10" font-weight="bold" fill="#f0f6fc" text-anchor="middle">6,634م</text>
      <text x="24" y="360" font-size="10" fill="#8b949e" text-anchor="middle">225 مم</text>
    </g>

    <!-- 9. 250 مم (3,095 م) -->
    <g transform="translate(612, 0)">
      <rect x="0" y="329" width="48" height="11" fill="#009688" rx="2"/>
      <text x="24" y="322" font-size="10" font-weight="bold" fill="#f0f6fc" text-anchor="middle">3,095م</text>
      <text x="24" y="360" font-size="10" fill="#8b949e" text-anchor="middle">250 مم</text>
    </g>

    <!-- 10. 280 مم (905 م) -->
    <g transform="translate(680, 0)">
      <rect x="0" y="336" width="48" height="4" fill="#03a9f4" rx="2"/>
      <text x="24" y="330" font-size="10" font-weight="bold" fill="#f0f6fc" text-anchor="middle">905م</text>
      <text x="24" y="360" font-size="10" fill="#8b949e" text-anchor="middle">280 مم</text>
    </g>

    <!-- 11. 300 مم (9,047 م) -->
    <g transform="translate(748, 0)">
      <rect x="0" y="308" width="48" height="32" fill="#e91e63" rx="2"/>
      <text x="24" y="302" font-size="10" font-weight="bold" fill="#f0f6fc" text-anchor="middle">9,047م</text>
      <text x="24" y="360" font-size="10" fill="#8b949e" text-anchor="middle">300 مم</text>
    </g>

    <!-- 12. 315 مم (3,613 م) -->
    <g transform="translate(816, 0)">
      <rect x="0" y="327" width="48" height="13" fill="#3f51b5" rx="2"/>
      <text x="24" y="320" font-size="10" font-weight="bold" fill="#f0f6fc" text-anchor="middle">3,613م</text>
      <text x="24" y="360" font-size="10" fill="#8b949e" text-anchor="middle">315 مم</text>
    </g>

    <!-- 13. 400 مم (7,915 م) -->
    <g transform="translate(884, 0)">
      <rect x="0" y="312" width="48" height="28" fill="#00e5ff" rx="2"/>
      <text x="24" y="306" font-size="10" font-weight="bold" fill="#f0f6fc" text-anchor="middle">7,915م</text>
      <text x="24" y="360" font-size="10" fill="#8b949e" text-anchor="middle">400 مم</text>
    </g>

    <!-- 14. 450 مم (716 م) -->
    <g transform="translate(952, 0)">
      <rect x="0" y="337" width="48" height="3" fill="#00796b" rx="2"/>
      <text x="24" y="330" font-size="10" font-weight="bold" fill="#f0f6fc" text-anchor="middle">716م</text>
      <text x="24" y="360" font-size="10" fill="#8b949e" text-anchor="middle">450 مم</text>
    </g>

    <!-- 15. 500 مم (739 م) -->
    <g transform="translate(1020, 0)">
      <rect x="0" y="337" width="48" height="3" fill="#388e3c" rx="2"/>
      <text x="24" y="330" font-size="10" font-weight="bold" fill="#f0f6fc" text-anchor="middle">739م</text>
      <text x="24" y="360" font-size="10" fill="#8b949e" text-anchor="middle">500 مم</text>
    </g>

    <!-- 16. 560 مم (539 م) -->
    <g transform="translate(1088, 0)">
      <rect x="0" y="338" width="48" height="2" fill="#ffa000" rx="2"/>
      <text x="24" y="331" font-size="10" font-weight="bold" fill="#f0f6fc" text-anchor="middle">539م</text>
      <text x="24" y="360" font-size="10" fill="#8b949e" text-anchor="middle">560 مم</text>
    </g>

    <!-- 17. 600 مم (2,512 م) -->
    <g transform="translate(1156, 0)">
      <rect x="0" y="331" width="48" height="9" fill="#f4511e" rx="2"/>
      <text x="24" y="324" font-size="10" font-weight="bold" fill="#f0f6fc" text-anchor="middle">2,512م</text>
      <text x="24" y="360" font-size="10" fill="#8b949e" text-anchor="middle">600 مم</text>
    </g>

    <!-- 18. 750 مم (8,022 م) -->
    <g transform="translate(1224, 0)">
      <rect x="0" y="312" width="48" height="28" fill="#7b1fa2" rx="2"/>
      <text x="24" y="306" font-size="10" font-weight="bold" fill="#f0f6fc" text-anchor="middle">8,022م</text>
      <text x="24" y="360" font-size="10" fill="#8b949e" text-anchor="middle">750 مم</text>
    </g>

    <!-- 19. 800 مم (1,913 م) -->
    <g transform="translate(1292, 0)">
      <rect x="0" y="333" width="48" height="7" fill="#1e88e5" rx="2"/>
      <text x="24" y="326" font-size="10" font-weight="bold" fill="#f0f6fc" text-anchor="middle">1,913م</text>
      <text x="24" y="360" font-size="10" fill="#8b949e" text-anchor="middle">800 مم</text>
    </g>
  </g>


  <!-- ================= BOTTOM RIGHT: الأكثر تنفيذاً (الجهات) ================= -->
  <g transform="translate(1426, 668)">
    <rect x="0" y="0" width="486" height="402" fill="#0d1117" rx="4" stroke="#21262d" stroke-width="1"/>
    
    <!-- Title -->
    <text x="470" y="28" font-size="14" font-weight="bold" fill="#f0f6fc" text-anchor="end">الأكثر تنفيذاً (الجهات)</text>

    <!-- Contractor 1: شركة الإلكتروهاني (25,484) -->
    <g transform="translate(16, 45)">
      <text x="454" y="16" font-size="12" fill="#c9d1d9" text-anchor="end">شركة الإلكتروهاني</text>
      <text x="4" y="16" font-size="12" font-family="'Segoe UI', Tahoma, sans-serif" fill="#7ee787">25,484</text>
      <!-- Progress Bar -->
      <rect x="4" y="26" width="450" height="8" rx="4" fill="#161b22"/>
      <rect x="4" y="26" width="420" height="8" rx="4" fill="#39d353"/>
    </g>

    <!-- Contractor 2: غاز مصر (10,885) -->
    <g transform="translate(16, 100)">
      <text x="454" y="16" font-size="12" fill="#c9d1d9" text-anchor="end">غاز مصر</text>
      <text x="4" y="16" font-size="12" font-family="'Segoe UI', Tahoma, sans-serif" fill="#7ee787">10,885</text>
      <rect x="4" y="26" width="450" height="8" rx="4" fill="#161b22"/>
      <rect x="4" y="26" width="220" height="8" rx="4" fill="#39d353"/>
    </g>

    <!-- Contractor 3: شركة المقاولات المصرية مختار إبراهيم (6,847) -->
    <g transform="translate(16, 155)">
      <text x="454" y="16" font-size="12" fill="#c9d1d9" text-anchor="end">شركة المقاولات المصرية مختار إبراهيم</text>
      <text x="4" y="16" font-size="12" font-family="'Segoe UI', Tahoma, sans-serif" fill="#7ee787">6,847</text>
      <rect x="4" y="26" width="450" height="8" rx="4" fill="#161b22"/>
      <rect x="4" y="26" width="140" height="8" rx="4" fill="#39d353"/>
    </g>

    <!-- Contractor 4: المصرية للأتصالات (6,445) -->
    <g transform="translate(16, 210)">
      <text x="454" y="16" font-size="12" fill="#c9d1d9" text-anchor="end">المصرية للأتصالات</text>
      <text x="4" y="16" font-size="12" font-family="'Segoe UI', Tahoma, sans-serif" fill="#7ee787">6,445</text>
      <rect x="4" y="26" width="450" height="8" rx="4" fill="#161b22"/>
      <rect x="4" y="26" width="130" height="8" rx="4" fill="#39d353"/>
    </g>

    <!-- Contractor 5: أولاد حجازي (4,834) -->
    <g transform="translate(16, 265)">
      <text x="454" y="16" font-size="12" fill="#c9d1d9" text-anchor="end">أولاد حجازي</text>
      <text x="4" y="16" font-size="12" font-family="'Segoe UI', Tahoma, sans-serif" fill="#7ee787">4,834</text>
      <rect x="4" y="26" width="450" height="8" rx="4" fill="#161b22"/>
      <rect x="4" y="26" width="100" height="8" rx="4" fill="#39d353"/>
    </g>

    <!-- Activate Windows Watermark (as seen in user screenshot) -->
    <g transform="translate(330, 340)">
      <text x="0" y="0" font-size="15" fill="#484f58" font-family="'Segoe UI', sans-serif">Activate Windows</text>
      <text x="0" y="18" font-size="12" fill="#30363d" font-family="'Segoe UI', sans-serif">Go to Settings to activate Windows.</text>
    </g>
  </g>

</svg>`;

  return svg;
}

const svg = generateExactSvg();
const svgPath = path.join(process.cwd(), 'public/images/infrastructure-network-dashboard.svg');
fs.writeFileSync(svgPath, svg, 'utf8');
console.log('Saved exact SVG to:', svgPath);

// Copy to png files so both formats resolve
const targets = [
  'public/images/infrastructure-network-dashboard.png',
  'public/infrastructure-network-dashboard.png',
  'dist/images/infrastructure-network-dashboard.svg',
  'dist/images/infrastructure-network-dashboard.png',
  'dist/infrastructure-network-dashboard.png',
];

targets.forEach(t => {
  const full = path.join(process.cwd(), t);
  const dir = path.dirname(full);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(full, svg, 'utf8');
  console.log('Written to:', full);
});
