with open('src/components/InfrastructureNetworksPage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

start_marker = '      {/* SECTION A — HERO: “EVERY NETWORK IS VISIBLE”                              */}\n      {/* ========================================================================= */}\n      <section className="relative w-full pt-8 pb-16'
p1 = content.find(start_marker)
if p1 == -1:
    print("Could not find start_marker!")
    exit(1)

p_end = content.find('</section>', p1) + len('</section>')

replacement = """      {/* SECTION A — HERO: “EVERY NETWORK IS VISIBLE”                              */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden border-b border-slate-800 bg-slate-950 text-white min-h-[580px] flex flex-col justify-center pt-6 pb-14 lg:pt-10 lg:pb-18">
        
        {/* Crystal-Clear Background Images with smooth automatic crossfade transition (Matching other pages) */}
        {HERO_BACKGROUNDS.map((bg, idx) => (
          <div
            key={bg.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentBgIndex && isHeroLoaded ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            style={{
              backgroundImage: `url('${bg.src}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 40%',
              backgroundRepeat: 'no-repeat',
            }}
          />
        ))}

        {/* Gentle ambient gradient (only 25-50% opacity) so the clear background image shines through vividly */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isAr
              ? 'linear-gradient(to left, rgba(7, 14, 30, 0.50) 0%, rgba(7, 14, 30, 0.20) 50%, rgba(7, 14, 30, 0.40) 100%)'
              : 'linear-gradient(to right, rgba(7, 14, 30, 0.50) 0%, rgba(7, 14, 30, 0.20) 50%, rgba(7, 14, 30, 0.40) 100%)',
          }}
        />
        {/* Soft edge blend for smooth integration with navbar and section below */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(7, 14, 30, 0.50) 0%, transparent 15%, transparent 80%, rgba(7, 14, 30, 0.80) 100%)',
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          
          {/* Top Bar: Scene Indicator & Auto-Rotating Tabs (Matching Methodology & Our Work pages) */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-300">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{isAr ? 'مشهد الرصد الميداني والفضائي:' : 'Observation Scene:'}</span>
              <span className="rounded-md bg-slate-950/70 px-2.5 py-0.5 font-mono text-[11px] text-sky-200 border border-sky-500/40 backdrop-blur-md shadow-xs">
                {isAr ? HERO_BACKGROUNDS[currentBgIndex].tagAr : HERO_BACKGROUNDS[currentBgIndex].tagEn}
              </span>
            </div>

            {/* Interactive Rotating Scene Tabs (Click to switch or auto-rotates every 6s) */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-slate-300 text-[11px] font-medium hidden sm:inline">
                {isAr ? 'المشاهد الدوارة:' : 'Rotating Scenes:'}
              </span>
              {HERO_BACKGROUNDS.map((bg, idx) => (
                <button
                  key={bg.id}
                  type="button"
                  onClick={() => setCurrentBgIndex(idx)}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all cursor-pointer ${
                    currentBgIndex === idx
                      ? 'bg-sky-600 text-white shadow-md shadow-sky-500/30 font-bold border border-sky-300'
                      : 'bg-slate-950/50 text-slate-300 hover:bg-slate-900/80 hover:text-white border border-white/15 backdrop-blur-sm'
                  }`}
                  title={isAr ? bg.labelAr : bg.labelEn}
                >
                  {isAr ? bg.labelAr : bg.labelEn}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Right Column: Hero Text with glassmorphic backdrop */}
            <div className="lg:col-span-5 text-start">
              <div className="rounded-3xl border border-white/20 bg-slate-950/45 p-6 sm:p-7 shadow-2xl backdrop-blur-md space-y-6">
                
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-950/80 px-3.5 py-1.5 text-xs font-semibold text-sky-300 shadow-xs backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
                  <span>{isAr ? 'عين سيجام | ذكاء شبكات البنية التحتية' : 'Ain Sijam | Infrastructure Networks Intelligence'}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.25] tracking-tight">
                  {isAr ? 'كل شبكة واضحة. كل أصل قابل للتتبع.' : 'Every network is visible. Every asset is traceable.'}
                </h1>

                <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
                  {isAr 
                    ? 'من المسح الميداني وتوثيق الأصول إلى قراءة طبقات المياه والكهرباء والصرف والاتصالات، تجمع عين سيجام الأدلة التشغيلية في رؤية مكانية واحدة تدعم القرار.'
                    : 'From field surveys and asset logging to reading water, power, sewer, and telecom layers, Ain Sijam brings operational evidence into one decision-grade spatial view.'}
                </p>

                {/* Connecting Accent Line */}
                <div className="flex items-center gap-3 pt-1">
                  <div className="h-0.5 w-16 bg-gradient-to-r from-sky-400 to-transparent" />
                  <span className="text-xs font-semibold text-sky-300 flex items-center gap-1.5">
                    <Crosshair className="w-3.5 h-3.5" />
                    {isAr ? 'رؤية مكانية دقيقة للشبكات' : 'Precision Network Spatial View'}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => scrollToSection('network-explorer')}
                    className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-600/30 transition-all cursor-pointer flex items-center gap-2 group"
                  >
                    <span>{isAr ? 'استكشف طبقات الشبكات' : 'Explore Network Layers'}</span>
                    <ArrowLeft className={`w-4 h-4 transition-transform group-hover:-translate-x-1 ${isAr ? '' : 'rotate-180 group-hover:translate-x-1'}`} />
                  </button>

                  <button
                    onClick={() => scrollToSection('field-to-decision')}
                    className="px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white font-bold text-sm sm:text-base border border-white/20 shadow-xs transition-all cursor-pointer flex items-center gap-2 backdrop-blur-sm"
                  >
                    <Eye className="w-4 h-4 text-sky-400" />
                    <span>{isAr ? 'شاهد رحلة التوثيق' : 'See Documentation Journey'}</span>
                  </button>
                </div>

              </div>
            </div>

            {/* Left Column: Hero Main Visual (network-04) + Previews (network-03, network-02) */}
            <div className="lg:col-span-7">
              <div className="relative bg-slate-950/70 rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl overflow-hidden group backdrop-blur-md">
                
                {/* Header Bar */}
                <div className="bg-slate-950/80 px-4 py-2.5 border-b border-white/15 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                    <span className="text-xs font-semibold text-slate-200 mr-2">
                      {heroThumbnails[activeHeroThumb].label}
                    </span>
                  </div>
                  <button
                    onClick={() => setLightboxImage({
                      src: heroThumbnails[activeHeroThumb].src,
                      title: heroThumbnails[activeHeroThumb].label,
                      subtitle: heroThumbnails[activeHeroThumb].desc
                    })}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title={isAr ? 'تكبير وعرض كامل' : 'Expand full view'}
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Hero Main Visual: Large and readable with object-fit: contain */}
                <div 
                  className="relative aspect-16/10 sm:aspect-16/9 bg-slate-950 cursor-pointer overflow-hidden p-1 sm:p-2"
                  onClick={() => setLightboxImage({
                    src: heroThumbnails[activeHeroThumb].src,
                    title: heroThumbnails[activeHeroThumb].label,
                    subtitle: heroThumbnails[activeHeroThumb].desc
                  })}
                >
                  <img
                    src={heroThumbnails[activeHeroThumb].src}
                    alt={heroThumbnails[activeHeroThumb].label}
                    className="w-full h-full object-contain transition-all duration-300 group-hover:scale-[1.01]"
                    loading="eager"
                  />
                  <div className="absolute bottom-3 start-3 px-3 py-1.5 rounded-lg bg-slate-950/85 backdrop-blur-md border border-white/15 text-sky-200 text-xs font-medium">
                    {heroThumbnails[activeHeroThumb].desc}
                  </div>
                </div>

                {/* Selectable Previews Below Main Visual */}
                <div className="p-3 sm:p-4 bg-slate-950/85 border-t border-white/15">
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {heroThumbnails.map((thumb, idx) => {
                      const isActive = activeHeroThumb === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setActiveHeroThumb(idx)}
                          className={`flex flex-col sm:flex-row items-center gap-2 p-1.5 sm:p-2 rounded-xl text-start transition-all cursor-pointer border ${
                            isActive
                              ? 'bg-sky-950/70 border-sky-400 shadow-md ring-1 ring-sky-400/40'
                              : 'bg-slate-900/60 border-white/15 hover:border-white/30 text-slate-300'
                          }`}
                        >
                          <img
                            src={thumb.src}
                            alt={thumb.label}
                            className="w-12 h-8 sm:w-16 sm:h-10 object-contain rounded-lg shrink-0 border border-white/15 bg-slate-950"
                            loading="eager"
                          />
                          <div className="min-w-0 hidden sm:block">
                            <div className={`text-xs font-bold truncate ${isActive ? 'text-sky-300' : 'text-slate-200'}`}>
                              {thumb.label}
                            </div>
                            <div className="text-[10px] text-slate-400 truncate">
                              {thumb.desc}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </section>"""

new_content = content[:p1] + replacement + content[p_end:]
with open('src/components/InfrastructureNetworksPage.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("SUCCESS: Hero section updated!")
