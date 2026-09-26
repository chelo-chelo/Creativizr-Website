const fs = require('fs');
const path = require('path');

const software = [
  {
    name: 'photoshop',
    title: 'Adobe Photoshop',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="psBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#001426"/>
      <stop offset="100%" stop-color="#002444"/>
    </linearGradient>
    <filter id="psGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="12" flood-color="#31a8ff" flood-opacity="0.35"/>
    </filter>
  </defs>
  <rect width="512" height="512" rx="100" fill="url(#psBg)"/>
  <rect x="12" y="12" width="488" height="488" rx="90" fill="none" stroke="#31a8ff" stroke-width="16" opacity="0.85"/>
  <!-- P -->
  <path d="M125 150 H240 C280 150 305 175 305 215 C305 255 280 280 240 280 H185 V365 H125 Z M185 200 V232 H235 C250 232 258 226 258 216 C258 206 250 200 235 200 Z" fill="#31a8ff" filter="url(#psGlow)"/>
  <!-- s -->
  <path d="M375 220 C345 220 325 235 325 260 C325 295 385 290 385 320 C385 332 372 338 355 338 C335 338 320 328 315 315 L300 350 C312 365 335 375 360 375 C395 375 418 355 418 322 C418 285 358 290 358 262 C358 252 368 248 380 248 C395 248 408 254 415 265 L430 232 C418 222 398 220 375 220 Z" fill="#31a8ff" filter="url(#psGlow)"/>
</svg>`
  },
  {
    name: 'illustrator',
    title: 'Adobe Illustrator',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="aiBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#261000"/>
      <stop offset="100%" stop-color="#421a00"/>
    </linearGradient>
    <filter id="aiGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="12" flood-color="#ff9a00" flood-opacity="0.35"/>
    </filter>
  </defs>
  <rect width="512" height="512" rx="100" fill="url(#aiBg)"/>
  <rect x="12" y="12" width="488" height="488" rx="90" fill="none" stroke="#ff9a00" stroke-width="16" opacity="0.85"/>
  <!-- A -->
  <path d="M210 150 L130 365 H185 L202 315 H278 L295 365 H350 L270 150 Z M240 205 L264 275 H216 Z" fill="#ff9a00" filter="url(#aiGlow)"/>
  <!-- i -->
  <circle cx="395" cy="180" r="26" fill="#ff9a00" filter="url(#aiGlow)"/>
  <rect x="368" y="225" width="54" height="140" rx="12" fill="#ff9a00" filter="url(#aiGlow)"/>
</svg>`
  },
  {
    name: 'indesign',
    title: 'Adobe InDesign',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="idBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#290216"/>
      <stop offset="100%" stop-color="#4c0226"/>
    </linearGradient>
    <filter id="idGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="12" flood-color="#ff3366" flood-opacity="0.35"/>
    </filter>
  </defs>
  <rect width="512" height="512" rx="100" fill="url(#idBg)"/>
  <rect x="12" y="12" width="488" height="488" rx="90" fill="none" stroke="#ff3366" stroke-width="16" opacity="0.85"/>
  <!-- I -->
  <rect x="120" y="150" width="60" height="215" rx="12" fill="#ff3366" filter="url(#idGlow)"/>
  <!-- d -->
  <path d="M315 150 H365 V365 H315 V335 C300 358 275 372 245 372 C190 372 155 330 155 272 C155 214 190 172 245 172 C275 172 300 186 315 209 Z M260 218 C230 218 210 240 210 272 C210 304 230 326 260 326 C290 326 315 304 315 272 C315 240 290 218 260 218 Z" fill="#ff3366" filter="url(#idGlow)"/>
</svg>`
  },
  {
    name: 'coreldraw',
    title: 'CorelDRAW',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="cdBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a1f10"/>
      <stop offset="100%" stop-color="#11361c"/>
    </linearGradient>
    <linearGradient id="cdBalloon1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#00e676"/>
      <stop offset="100%" stop-color="#008940"/>
    </linearGradient>
    <linearGradient id="cdBalloon2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffd600"/>
      <stop offset="100%" stop-color="#ff9100"/>
    </linearGradient>
    <linearGradient id="cdBalloon3" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#00b0ff"/>
      <stop offset="100%" stop-color="#2979ff"/>
    </linearGradient>
    <filter id="cdGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="12" flood-color="#00e676" flood-opacity="0.35"/>
    </filter>
  </defs>
  <rect width="512" height="512" rx="100" fill="url(#cdBg)"/>
  <rect x="12" y="12" width="488" height="488" rx="90" fill="none" stroke="#00e676" stroke-width="16" opacity="0.85"/>
  <!-- Hot Air Balloon Structure -->
  <!-- Left lobe -->
  <path d="M210 110 C160 135 155 200 175 250 C195 295 230 330 235 340 H250 C240 325 210 270 210 110 Z" fill="url(#cdBalloon3)"/>
  <!-- Center Main lobe -->
  <path d="M256 95 C220 95 210 160 210 250 C210 300 235 340 256 345 C277 340 302 300 302 250 C302 160 292 95 256 95 Z" fill="url(#cdBalloon1)" filter="url(#cdGlow)"/>
  <!-- Right lobe -->
  <path d="M302 110 C352 135 357 200 337 250 C317 295 282 330 277 340 H262 C272 325 302 270 302 110 Z" fill="url(#cdBalloon2)"/>
  <!-- Basket -->
  <rect x="238" y="360" width="36" height="24" rx="6" fill="#ffd600"/>
  <line x1="242" y1="345" x2="242" y2="360" stroke="#00e676" stroke-width="4"/>
  <line x1="270" y1="345" x2="270" y2="360" stroke="#00e676" stroke-width="4"/>
  <!-- Text Label -->
  <text x="256" y="435" text-anchor="middle" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-size="34" font-weight="900" letter-spacing="4">CorelDRAW</text>
</svg>`
  },
  {
    name: 'figma',
    title: 'Figma',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="figmaBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#171221"/>
      <stop offset="100%" stop-color="#241b35"/>
    </linearGradient>
    <filter id="figmaGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="12" flood-color="#a259ff" flood-opacity="0.35"/>
    </filter>
  </defs>
  <rect width="512" height="512" rx="100" fill="url(#figmaBg)"/>
  <rect x="12" y="12" width="488" height="488" rx="90" fill="none" stroke="#a259ff" stroke-width="16" opacity="0.85"/>
  <g transform="translate(146, 96)" filter="url(#figmaGlow)">
    <!-- Top Left (Orange-Red) -->
    <path d="M55 0 H110 V110 H55 C24.6 110 0 85.4 0 55 C0 24.6 24.6 0 55 0 Z" fill="#F24E1E"/>
    <!-- Top Right (Orange) -->
    <path d="M110 0 H165 C195.4 0 220 24.6 220 55 C220 85.4 195.4 110 165 110 H110 Z" fill="#FF7262"/>
    <!-- Mid Left (Purple) -->
    <path d="M55 110 H110 V220 H55 C24.6 220 0 195.4 0 165 C0 134.6 24.6 110 55 110 Z" fill="#A259FF"/>
    <!-- Mid Right (Cyan/Blue) -->
    <circle cx="165" cy="165" r="55" fill="#1ABCFE"/>
    <!-- Bottom Left (Green) -->
    <path d="M55 220 H110 V275 C110 305.4 85.4 330 55 330 C24.6 330 0 305.4 0 275 C0 244.6 24.6 220 55 220 Z" fill="#0ACF83"/>
  </g>
</svg>`
  },
  {
    name: 'flutter',
    title: 'Flutter',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="flutterBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#051726"/>
      <stop offset="100%" stop-color="#0a2a46"/>
    </linearGradient>
    <filter id="flGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="12" flood-color="#54c5f8" flood-opacity="0.35"/>
    </filter>
  </defs>
  <rect width="512" height="512" rx="100" fill="url(#flutterBg)"/>
  <rect x="12" y="12" width="488" height="488" rx="90" fill="none" stroke="#54c5f8" stroke-width="16" opacity="0.85"/>
  <g transform="translate(86, 96)" filter="url(#flGlow)">
    <!-- Top right chevron segment -->
    <polygon points="210,0 120,90 270,240 360,150" fill="#47C5FB"/>
    <!-- Mid-lower chevron segment -->
    <polygon points="120,240 45,315 90,360 210,240" fill="#02569B"/>
    <polygon points="120,240 210,240 270,180 180,180" fill="#0175C2"/>
    <polygon points="210,240 165,285 240,360 330,360" fill="#47C5FB"/>
  </g>
  <text x="256" y="445" text-anchor="middle" fill="#54c5f8" font-family="'Plus Jakarta Sans', sans-serif" font-size="36" font-weight="900" letter-spacing="4">Flutter</text>
</svg>`
  }
];

const targetDir = path.join(__dirname, 'assets', 'logos', 'software');
software.forEach(item => {
  const filePath = path.join(targetDir, `${item.name}.svg`);
  fs.writeFileSync(filePath, item.svg);
  console.log(`Saved ${filePath}`);
});
