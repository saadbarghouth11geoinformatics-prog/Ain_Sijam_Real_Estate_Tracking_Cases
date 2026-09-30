/**
 * Central Project Asset Manifest for Real Estate Tracking Case Studies
 * 
 * Strict Asset Mapping conforming to the local filesystem structure:
 * /assets/case-studies/{project-folder}/...
 *
 * Verifies and provides uniform paths for all 6 projects:
 * 1. 01_kafd_riyadh
 * 2. 02_riyadh_metro_west_depot
 * 3. 03_six_flags_qiddiya
 * 4. 04_red_sea_airport
 * 5. 05_sheybarah_resort
 * 6. 06_spark_energy_park
 */

export interface ProjectTimelineStageAsset {
  stageNumber: number;
  year: string;
  phaseAr: string;
  imageFilename: string;
  imagePath: string;
  fallbackAliasPath: string;
}

export interface ProjectAssetManifestItem {
  projectId: string;
  folderName: string;
  nameAr: string;
  nameEn: string;
  categoryKey: 'urban_business' | 'transport_infra' | 'tourism_entertainment' | 'airports' | 'industrial_cities';
  categoryAr: string;
  locationAr: string;
  
  // 1. Primary Before-and-Latest Comparison
  comparisonBeforeLatestFile: string;
  comparisonBeforeLatestPath: string;
  
  // 2. Construction Progress (3 Clear Stages)
  constructionProgressFile: string;
  constructionProgressPath: string;
  
  // 3. Five-Stage Timeline High-Resolution Board
  timelineHighResolutionFile: string;
  timelineHighResolutionPath: string;
  
  // 4. Individual 5-Stage Historical Timeline Images
  timelineStages: ProjectTimelineStageAsset[];
  
  // 5. High-Resolution Basemap Imagery (Esri World Imagery)
  highResolutionOverviewFile: string;
  highResolutionOverviewPath: string;
  highResolutionCloseDetailFile: string;
  highResolutionCloseDetailPath: string;
  
  // 6. Data JSON & Checklist Paths
  projectDataPath: string;
  checklistPath: string;
  caseStudyMarkdownPath: string;
  sourcesMarkdownPath: string;
}

export const CASE_STUDIES_ASSET_MANIFEST: Record<string, ProjectAssetManifestItem> = {
  '01_kafd_riyadh': {
    projectId: '01_kafd_riyadh',
    folderName: '01_kafd_riyadh',
    nameAr: 'مركز الملك عبدالله المالي – الرياض',
    nameEn: 'King Abdullah Financial District (KAFD)',
    categoryKey: 'urban_business',
    categoryAr: 'أعمال وتطوير حضري',
    locationAr: 'شمال مدينة الرياض، المملكة العربية السعودية',
    
    comparisonBeforeLatestFile: 'comparison_clear_before_latest.jpg',
    comparisonBeforeLatestPath: '/assets/case-studies/01_kafd_riyadh/comparison_clear_before_latest.jpg',
    
    constructionProgressFile: 'construction_progress_3_clear_stages.jpg',
    constructionProgressPath: '/assets/case-studies/01_kafd_riyadh/construction_progress_3_clear_stages.jpg',
    
    timelineHighResolutionFile: 'timeline_5_stages_high_resolution.jpg',
    timelineHighResolutionPath: '/assets/case-studies/01_kafd_riyadh/timeline_5_stages_high_resolution.jpg',
    
    timelineStages: [
      {
        stageNumber: 1,
        year: '2017',
        phaseAr: 'خط أساس',
        imageFilename: '2017_خط_أساس.png',
        imagePath: '/assets/case-studies/01_kafd_riyadh/timeline_5_stages/2017_خط_أساس.png',
        fallbackAliasPath: '/assets/case-studies/01_kafd_riyadh/timeline_5_stages/stage_1.png'
      },
      {
        stageNumber: 2,
        year: '2018',
        phaseAr: 'استكمال الهيكل العمراني',
        imageFilename: '2018_استكمال_الهيكل_العمراني.png',
        imagePath: '/assets/case-studies/01_kafd_riyadh/timeline_5_stages/2018_استكمال_الهيكل_العمراني.png',
        fallbackAliasPath: '/assets/case-studies/01_kafd_riyadh/timeline_5_stages/stage_2.png'
      },
      {
        stageNumber: 3,
        year: '2020',
        phaseAr: 'أعمال وتكثيف عمراني',
        imageFilename: '2020_أعمال_وتكثيف_عمراني.png',
        imagePath: '/assets/case-studies/01_kafd_riyadh/timeline_5_stages/2020_أعمال_وتكثيف_عمراني.png',
        fallbackAliasPath: '/assets/case-studies/01_kafd_riyadh/timeline_5_stages/stage_3.png'
      },
      {
        stageNumber: 4,
        year: '2022',
        phaseAr: 'تهيئة الأصول للتشغيل',
        imageFilename: '2022_تهيئة_الأصول_للتشغيل.png',
        imagePath: '/assets/case-studies/01_kafd_riyadh/timeline_5_stages/2022_تهيئة_الأصول_للتشغيل.png',
        fallbackAliasPath: '/assets/case-studies/01_kafd_riyadh/timeline_5_stages/stage_4.png'
      },
      {
        stageNumber: 5,
        year: '2025',
        phaseAr: 'تشغيل وتطوير مستمر',
        imageFilename: '2025_تشغيل_وتطوير_مستمر.png',
        imagePath: '/assets/case-studies/01_kafd_riyadh/timeline_5_stages/2025_تشغيل_وتطوير_مستمر.png',
        fallbackAliasPath: '/assets/case-studies/01_kafd_riyadh/timeline_5_stages/stage_5.png'
      }
    ],
    
    highResolutionOverviewFile: '01_current_overview_esri_world_imagery.jpg',
    highResolutionOverviewPath: '/assets/case-studies/01_kafd_riyadh/latest_high_resolution/01_current_overview_esri_world_imagery.jpg',
    highResolutionCloseDetailFile: '02_current_close_detail_esri_world_imagery.jpg',
    highResolutionCloseDetailPath: '/assets/case-studies/01_kafd_riyadh/latest_high_resolution/02_current_close_detail_esri_world_imagery.jpg',
    
    projectDataPath: '/assets/case-studies/01_kafd_riyadh/project_data_v3.json',
    checklistPath: '/assets/case-studies/01_kafd_riyadh/approval_and_construction_checklist_ar.json',
    caseStudyMarkdownPath: '/assets/case-studies/01_kafd_riyadh/case_study_ar.md',
    sourcesMarkdownPath: '/assets/case-studies/01_kafd_riyadh/sources.md'
  },

  '02_riyadh_metro_west_depot': {
    projectId: '02_riyadh_metro_west_depot',
    folderName: '02_riyadh_metro_west_depot',
    nameAr: 'مستودع غرب مترو الرياض',
    nameEn: 'Riyadh Metro – West Depot',
    categoryKey: 'transport_infra',
    categoryAr: 'نقل وبنية أساسية',
    locationAr: 'غرب مدينة الرياض، المملكة العربية السعودية',
    
    comparisonBeforeLatestFile: 'comparison_clear_before_latest.jpg',
    comparisonBeforeLatestPath: '/assets/case-studies/02_riyadh_metro_west_depot/comparison_clear_before_latest.jpg',
    
    constructionProgressFile: 'construction_progress_3_clear_stages.jpg',
    constructionProgressPath: '/assets/case-studies/02_riyadh_metro_west_depot/construction_progress_3_clear_stages.jpg',
    
    timelineHighResolutionFile: 'timeline_5_stages_high_resolution.jpg',
    timelineHighResolutionPath: '/assets/case-studies/02_riyadh_metro_west_depot/timeline_5_stages_high_resolution.jpg',
    
    timelineStages: [
      {
        stageNumber: 1,
        year: '2017',
        phaseAr: 'بداية الإنشاء',
        imageFilename: '2017_بداية_الإنشاء.png',
        imagePath: '/assets/case-studies/02_riyadh_metro_west_depot/timeline_5_stages/2017_بداية_الإنشاء.png',
        fallbackAliasPath: '/assets/case-studies/02_riyadh_metro_west_depot/timeline_5_stages/stage_1.png'
      },
      {
        stageNumber: 2,
        year: '2018',
        phaseAr: 'إنشاء المستودع والمسارات',
        imageFilename: '2018_إنشاء_المستودع_والمسارات.png',
        imagePath: '/assets/case-studies/02_riyadh_metro_west_depot/timeline_5_stages/2018_إنشاء_المستودع_والمسارات.png',
        fallbackAliasPath: '/assets/case-studies/02_riyadh_metro_west_depot/timeline_5_stages/stage_2.png'
      },
      {
        stageNumber: 3,
        year: '2020',
        phaseAr: 'تقدم مرافق التشغيل',
        imageFilename: '2020_تقدم_مرافق_التشغيل.png',
        imagePath: '/assets/case-studies/02_riyadh_metro_west_depot/timeline_5_stages/2020_تقدم_مرافق_التشغيل.png',
        fallbackAliasPath: '/assets/case-studies/02_riyadh_metro_west_depot/timeline_5_stages/stage_3.png'
      },
      {
        stageNumber: 4,
        year: '2022',
        phaseAr: 'الاختبارات وتجهيز التشغيل',
        imageFilename: '2022_الاختبارات_وتجهيز_التشغيل.png',
        imagePath: '/assets/case-studies/02_riyadh_metro_west_depot/timeline_5_stages/2022_الاختبارات_وتجهيز_التشغيل.png',
        fallbackAliasPath: '/assets/case-studies/02_riyadh_metro_west_depot/timeline_5_stages/stage_4.png'
      },
      {
        stageNumber: 5,
        year: '2024',
        phaseAr: 'مرحلة الإطلاق التشغيلي',
        imageFilename: '2024_مرحلة_الإطلاق_التشغيلي.png',
        imagePath: '/assets/case-studies/02_riyadh_metro_west_depot/timeline_5_stages/2024_مرحلة_الإطلاق_التشغيلي.png',
        fallbackAliasPath: '/assets/case-studies/02_riyadh_metro_west_depot/timeline_5_stages/stage_5.png'
      }
    ],
    
    highResolutionOverviewFile: '01_current_overview_esri_world_imagery.jpg',
    highResolutionOverviewPath: '/assets/case-studies/02_riyadh_metro_west_depot/latest_high_resolution/01_current_overview_esri_world_imagery.jpg',
    highResolutionCloseDetailFile: '02_current_close_detail_esri_world_imagery.jpg',
    highResolutionCloseDetailPath: '/assets/case-studies/02_riyadh_metro_west_depot/latest_high_resolution/02_current_close_detail_esri_world_imagery.jpg',
    
    projectDataPath: '/assets/case-studies/02_riyadh_metro_west_depot/project_data_v3.json',
    checklistPath: '/assets/case-studies/02_riyadh_metro_west_depot/approval_and_construction_checklist_ar.json',
    caseStudyMarkdownPath: '/assets/case-studies/02_riyadh_metro_west_depot/case_study_ar.md',
    sourcesMarkdownPath: '/assets/case-studies/02_riyadh_metro_west_depot/sources.md'
  },

  '03_six_flags_qiddiya': {
    projectId: '03_six_flags_qiddiya',
    folderName: '03_six_flags_qiddiya',
    nameAr: 'Six Flags مدينة القدية',
    nameEn: 'Six Flags Qiddiya City',
    categoryKey: 'tourism_entertainment',
    categoryAr: 'سياحة وترفيه',
    locationAr: 'جبال طويق، القدية، جنوب غرب الرياض',
    
    comparisonBeforeLatestFile: 'comparison_clear_before_latest.jpg',
    comparisonBeforeLatestPath: '/assets/case-studies/03_six_flags_qiddiya/comparison_clear_before_latest.jpg',
    
    constructionProgressFile: 'construction_progress_3_clear_stages.jpg',
    constructionProgressPath: '/assets/case-studies/03_six_flags_qiddiya/construction_progress_3_clear_stages.jpg',
    
    timelineHighResolutionFile: 'timeline_5_stages_high_resolution.jpg',
    timelineHighResolutionPath: '/assets/case-studies/03_six_flags_qiddiya/timeline_5_stages_high_resolution.jpg',
    
    timelineStages: [
      {
        stageNumber: 1,
        year: '2018',
        phaseAr: 'الموقع قبل التطوير',
        imageFilename: '2018_الموقع_قبل_التطوير.png',
        imagePath: '/assets/case-studies/03_six_flags_qiddiya/timeline_5_stages/2018_الموقع_قبل_التطوير.png',
        fallbackAliasPath: '/assets/case-studies/03_six_flags_qiddiya/timeline_5_stages/stage_1.png'
      },
      {
        stageNumber: 2,
        year: '2020',
        phaseAr: 'إعداد الموقع والطرق',
        imageFilename: '2020_إعداد_الموقع_والطرق.png',
        imagePath: '/assets/case-studies/03_six_flags_qiddiya/timeline_5_stages/2020_إعداد_الموقع_والطرق.png',
        fallbackAliasPath: '/assets/case-studies/03_six_flags_qiddiya/timeline_5_stages/stage_2.png'
      },
      {
        stageNumber: 3,
        year: '2022',
        phaseAr: 'أعمال الإنشاء',
        imageFilename: '2022_أعمال_الإنشاء.png',
        imagePath: '/assets/case-studies/03_six_flags_qiddiya/timeline_5_stages/2022_أعمال_الإنشاء.png',
        fallbackAliasPath: '/assets/case-studies/03_six_flags_qiddiya/timeline_5_stages/stage_3.png'
      },
      {
        stageNumber: 4,
        year: '2024',
        phaseAr: 'تركيب المنشآت والألعاب',
        imageFilename: '2024_تركيب_المنشآت_والألعاب.png',
        imagePath: '/assets/case-studies/03_six_flags_qiddiya/timeline_5_stages/2024_تركيب_المنشآت_والألعاب.png',
        fallbackAliasPath: '/assets/case-studies/03_six_flags_qiddiya/timeline_5_stages/stage_4.png'
      },
      {
        stageNumber: 5,
        year: '2025',
        phaseAr: 'اكتمال الأصل وافتتاحه',
        imageFilename: '2025_اكتمال_الأصل_وافتتاحه.png',
        imagePath: '/assets/case-studies/03_six_flags_qiddiya/timeline_5_stages/2025_اكتمال_الأصل_وافتتاحه.png',
        fallbackAliasPath: '/assets/case-studies/03_six_flags_qiddiya/timeline_5_stages/stage_5.png'
      }
    ],
    
    highResolutionOverviewFile: '01_current_overview_esri_world_imagery.jpg',
    highResolutionOverviewPath: '/assets/case-studies/03_six_flags_qiddiya/latest_high_resolution/01_current_overview_esri_world_imagery.jpg',
    highResolutionCloseDetailFile: '02_current_close_detail_esri_world_imagery.jpg',
    highResolutionCloseDetailPath: '/assets/case-studies/03_six_flags_qiddiya/latest_high_resolution/02_current_close_detail_esri_world_imagery.jpg',
    
    projectDataPath: '/assets/case-studies/03_six_flags_qiddiya/project_data_v3.json',
    checklistPath: '/assets/case-studies/03_six_flags_qiddiya/approval_and_construction_checklist_ar.json',
    caseStudyMarkdownPath: '/assets/case-studies/03_six_flags_qiddiya/case_study_ar.md',
    sourcesMarkdownPath: '/assets/case-studies/03_six_flags_qiddiya/sources.md'
  },

  '04_red_sea_airport': {
    projectId: '04_red_sea_airport',
    folderName: '04_red_sea_airport',
    nameAr: 'مطار البحر الأحمر الدولي',
    nameEn: 'Red Sea International Airport',
    categoryKey: 'airports',
    categoryAr: 'مطارات',
    locationAr: 'منطقة تبوك / الساحل الغربي، المملكة العربية السعودية',
    
    comparisonBeforeLatestFile: 'comparison_clear_before_latest.jpg',
    comparisonBeforeLatestPath: '/assets/case-studies/04_red_sea_airport/comparison_clear_before_latest.jpg',
    
    constructionProgressFile: 'construction_progress_3_clear_stages.jpg',
    constructionProgressPath: '/assets/case-studies/04_red_sea_airport/construction_progress_3_clear_stages.jpg',
    
    timelineHighResolutionFile: 'timeline_5_stages_high_resolution.jpg',
    timelineHighResolutionPath: '/assets/case-studies/04_red_sea_airport/timeline_5_stages_high_resolution.jpg',
    
    timelineStages: [
      {
        stageNumber: 1,
        year: '2018',
        phaseAr: 'الموقع قبل الإنشاء',
        imageFilename: '2018_الموقع_قبل_الإنشاء.png',
        imagePath: '/assets/case-studies/04_red_sea_airport/timeline_5_stages/2018_الموقع_قبل_الإنشاء.png',
        fallbackAliasPath: '/assets/case-studies/04_red_sea_airport/timeline_5_stages/stage_1.png'
      },
      {
        stageNumber: 2,
        year: '2019',
        phaseAr: 'تجهيز الموقع والمخطط',
        imageFilename: '2019_تجهيز_الموقع_والمخطط.png',
        imagePath: '/assets/case-studies/04_red_sea_airport/timeline_5_stages/2019_تجهيز_الموقع_والمخطط.png',
        fallbackAliasPath: '/assets/case-studies/04_red_sea_airport/timeline_5_stages/stage_2.png'
      },
      {
        stageNumber: 3,
        year: '2021',
        phaseAr: 'إنشاء المدرج والمرافق',
        imageFilename: '2021_إنشاء_المدرج_والمرافق.png',
        imagePath: '/assets/case-studies/04_red_sea_airport/timeline_5_stages/2021_إنشاء_المدرج_والمرافق.png',
        fallbackAliasPath: '/assets/case-studies/04_red_sea_airport/timeline_5_stages/stage_3.png'
      },
      {
        stageNumber: 4,
        year: '2023',
        phaseAr: 'الاختبارات وبداية التشغيل',
        imageFilename: '2023_الاختبارات_وبداية_التشغيل.png',
        imagePath: '/assets/case-studies/04_red_sea_airport/timeline_5_stages/2023_الاختبارات_وبداية_التشغيل.png',
        fallbackAliasPath: '/assets/case-studies/04_red_sea_airport/timeline_5_stages/stage_4.png'
      },
      {
        stageNumber: 5,
        year: '2024',
        phaseAr: 'تشغيل الرحلات الدولية',
        imageFilename: '2024_تشغيل_الرحلات_الدولية.png',
        imagePath: '/assets/case-studies/04_red_sea_airport/timeline_5_stages/2024_تشغيل_الرحلات_الدولية.png',
        fallbackAliasPath: '/assets/case-studies/04_red_sea_airport/timeline_5_stages/stage_5.png'
      }
    ],
    
    highResolutionOverviewFile: '01_current_overview_esri_world_imagery.jpg',
    highResolutionOverviewPath: '/assets/case-studies/04_red_sea_airport/latest_high_resolution/01_current_overview_esri_world_imagery.jpg',
    highResolutionCloseDetailFile: '02_current_close_detail_esri_world_imagery.jpg',
    highResolutionCloseDetailPath: '/assets/case-studies/04_red_sea_airport/latest_high_resolution/02_current_close_detail_esri_world_imagery.jpg',
    
    projectDataPath: '/assets/case-studies/04_red_sea_airport/project_data_v3.json',
    checklistPath: '/assets/case-studies/04_red_sea_airport/approval_and_construction_checklist_ar.json',
    caseStudyMarkdownPath: '/assets/case-studies/04_red_sea_airport/case_study_ar.md',
    sourcesMarkdownPath: '/assets/case-studies/04_red_sea_airport/sources.md'
  },

  '05_sheybarah_resort': {
    projectId: '05_sheybarah_resort',
    folderName: '05_sheybarah_resort',
    nameAr: 'منتجع شيبارة – البحر الأحمر',
    nameEn: 'Shebara Resort – The Red Sea',
    categoryKey: 'tourism_entertainment',
    categoryAr: 'سياحة وترفيه',
    locationAr: 'جزيرة شيبارة، البحر الأحمر، المملكة العربية السعودية',
    
    comparisonBeforeLatestFile: 'comparison_clear_before_latest.jpg',
    comparisonBeforeLatestPath: '/assets/case-studies/05_sheybarah_resort/comparison_clear_before_latest.jpg',
    
    constructionProgressFile: 'construction_progress_3_clear_stages.jpg',
    constructionProgressPath: '/assets/case-studies/05_sheybarah_resort/construction_progress_3_clear_stages.jpg',
    
    timelineHighResolutionFile: 'timeline_5_stages_high_resolution.jpg',
    timelineHighResolutionPath: '/assets/case-studies/05_sheybarah_resort/timeline_5_stages_high_resolution.jpg',
    
    timelineStages: [
      {
        stageNumber: 1,
        year: '2018',
        phaseAr: 'الجزيرة قبل التطوير',
        imageFilename: '2018_الجزيرة_قبل_التطوير.png',
        imagePath: '/assets/case-studies/05_sheybarah_resort/timeline_5_stages/2018_الجزيرة_قبل_التطوير.png',
        fallbackAliasPath: '/assets/case-studies/05_sheybarah_resort/timeline_5_stages/stage_1.png'
      },
      {
        stageNumber: 2,
        year: '2020',
        phaseAr: 'الإعداد اللوجستي للموقع',
        imageFilename: '2020_الإعداد_اللوجستي_للموقع.png',
        imagePath: '/assets/case-studies/05_sheybarah_resort/timeline_5_stages/2020_الإعداد_اللوجستي_للموقع.png',
        fallbackAliasPath: '/assets/case-studies/05_sheybarah_resort/timeline_5_stages/stage_2.png'
      },
      {
        stageNumber: 3,
        year: '2021',
        phaseAr: 'أعمال الوصول والإنشاء',
        imageFilename: '2021_أعمال_الوصول_والإنشاء.png',
        imagePath: '/assets/case-studies/05_sheybarah_resort/timeline_5_stages/2021_أعمال_الوصول_والإنشاء.png',
        fallbackAliasPath: '/assets/case-studies/05_sheybarah_resort/timeline_5_stages/stage_3.png'
      },
      {
        stageNumber: 4,
        year: '2023',
        phaseAr: 'تنفيذ الفلل والمرافق',
        imageFilename: '2023_تنفيذ_الفلل_والمرافق.png',
        imagePath: '/assets/case-studies/05_sheybarah_resort/timeline_5_stages/2023_تنفيذ_الفلل_والمرافق.png',
        fallbackAliasPath: '/assets/case-studies/05_sheybarah_resort/timeline_5_stages/stage_4.png'
      },
      {
        stageNumber: 5,
        year: '2024',
        phaseAr: 'افتتاح المنتجع',
        imageFilename: '2024_افتتاح_المنتجع.png',
        imagePath: '/assets/case-studies/05_sheybarah_resort/timeline_5_stages/2024_افتتاح_المنتجع.png',
        fallbackAliasPath: '/assets/case-studies/05_sheybarah_resort/timeline_5_stages/stage_5.png'
      }
    ],
    
    highResolutionOverviewFile: '01_current_overview_esri_world_imagery.jpg',
    highResolutionOverviewPath: '/assets/case-studies/05_sheybarah_resort/latest_high_resolution/01_current_overview_esri_world_imagery.jpg',
    highResolutionCloseDetailFile: '02_current_close_detail_esri_world_imagery.jpg',
    highResolutionCloseDetailPath: '/assets/case-studies/05_sheybarah_resort/latest_high_resolution/02_current_close_detail_esri_world_imagery.jpg',
    
    projectDataPath: '/assets/case-studies/05_sheybarah_resort/project_data_v3.json',
    checklistPath: '/assets/case-studies/05_sheybarah_resort/approval_and_construction_checklist_ar.json',
    caseStudyMarkdownPath: '/assets/case-studies/05_sheybarah_resort/case_study_ar.md',
    sourcesMarkdownPath: '/assets/case-studies/05_sheybarah_resort/sources.md'
  },

  '06_spark_energy_park': {
    projectId: '06_spark_energy_park',
    folderName: '06_spark_energy_park',
    nameAr: 'مدينة الملك سلمان للطاقة – سبارك',
    nameEn: 'King Salman Energy Park (SPARK)',
    categoryKey: 'industrial_cities',
    categoryAr: 'مدن صناعية',
    locationAr: 'المنطقة الشرقية بين الدمام والأحساء، المملكة العربية السعودية',
    
    comparisonBeforeLatestFile: 'comparison_clear_before_latest.jpg',
    comparisonBeforeLatestPath: '/assets/case-studies/06_spark_energy_park/comparison_clear_before_latest.jpg',
    
    constructionProgressFile: 'construction_progress_3_clear_stages.jpg',
    constructionProgressPath: '/assets/case-studies/06_spark_energy_park/construction_progress_3_clear_stages.jpg',
    
    timelineHighResolutionFile: 'timeline_5_stages_high_resolution.jpg',
    timelineHighResolutionPath: '/assets/case-studies/06_spark_energy_park/timeline_5_stages_high_resolution.jpg',
    
    timelineStages: [
      {
        stageNumber: 1,
        year: '2018',
        phaseAr: 'بدء التطوير',
        imageFilename: '2018_بدء_التطوير.png',
        imagePath: '/assets/case-studies/06_spark_energy_park/timeline_5_stages/2018_بدء_التطوير.png',
        fallbackAliasPath: '/assets/case-studies/06_spark_energy_park/timeline_5_stages/stage_1.png'
      },
      {
        stageNumber: 2,
        year: '2019',
        phaseAr: 'الطرق والمرافق الرئيسية',
        imageFilename: '2019_الطرق_والمرافق_الرئيسية.png',
        imagePath: '/assets/case-studies/06_spark_energy_park/timeline_5_stages/2019_الطرق_والمرافق_الرئيسية.png',
        fallbackAliasPath: '/assets/case-studies/06_spark_energy_park/timeline_5_stages/stage_2.png'
      },
      {
        stageNumber: 3,
        year: '2021',
        phaseAr: 'تقدم المرحلة الأولى',
        imageFilename: '2021_تقدم_المرحلة_الأولى.png',
        imagePath: '/assets/case-studies/06_spark_energy_park/timeline_5_stages/2021_تقدم_المرحلة_الأولى.png',
        fallbackAliasPath: '/assets/case-studies/06_spark_energy_park/timeline_5_stages/stage_3.png'
      },
      {
        stageNumber: 4,
        year: '2023',
        phaseAr: 'تطوير قطع المستثمرين',
        imageFilename: '2023_تطوير_قطع_المستثمرين.png',
        imagePath: '/assets/case-studies/06_spark_energy_park/timeline_5_stages/2023_تطوير_قطع_المستثمرين.png',
        fallbackAliasPath: '/assets/case-studies/06_spark_energy_park/timeline_5_stages/stage_4.png'
      },
      {
        stageNumber: 5,
        year: '2025',
        phaseAr: 'تشغيل وتخصيص أصول',
        imageFilename: '2025_تشغيل_وتخصيص_أصول.png',
        imagePath: '/assets/case-studies/06_spark_energy_park/timeline_5_stages/2025_تشغيل_وتخصيص_أصول.png',
        fallbackAliasPath: '/assets/case-studies/06_spark_energy_park/timeline_5_stages/stage_5.png'
      }
    ],
    
    highResolutionOverviewFile: '01_current_overview_esri_world_imagery.jpg',
    highResolutionOverviewPath: '/assets/case-studies/06_spark_energy_park/latest_high_resolution/01_current_overview_esri_world_imagery.jpg',
    highResolutionCloseDetailFile: '02_current_close_detail_esri_world_imagery.jpg',
    highResolutionCloseDetailPath: '/assets/case-studies/06_spark_energy_park/latest_high_resolution/02_current_close_detail_esri_world_imagery.jpg',
    
    projectDataPath: '/assets/case-studies/06_spark_energy_park/project_data_v3.json',
    checklistPath: '/assets/case-studies/06_spark_energy_park/approval_and_construction_checklist_ar.json',
    caseStudyMarkdownPath: '/assets/case-studies/06_spark_energy_park/case_study_ar.md',
    sourcesMarkdownPath: '/assets/case-studies/06_spark_energy_park/sources.md'
  }
};

/**
 * Returns the manifest item for a project ID or key.
 */
export function getProjectManifest(projectIdOrKey: string): ProjectAssetManifestItem | undefined {
  if (CASE_STUDIES_ASSET_MANIFEST[projectIdOrKey]) {
    return CASE_STUDIES_ASSET_MANIFEST[projectIdOrKey];
  }
  
  // Also match by short key (e.g. 'kafd' -> '01_kafd_riyadh')
  const found = Object.values(CASE_STUDIES_ASSET_MANIFEST).find(item => 
    item.folderName.includes(projectIdOrKey) || projectIdOrKey.includes(item.folderName)
  );
  return found;
}

/**
 * Hero image configuration - KAFD comparison file per specification
 */
export const HERO_IMAGE_CONFIG = {
  src: '/assets/case-studies/01_kafd_riyadh/comparison_clear_before_latest.jpg',
  alt: 'مقارنة فضائية قبل وبعد لمشروع مركز الملك عبدالله المالي',
  filename: 'comparison_clear_before_latest.jpg',
  caption: 'مقارنة فضائية معتمدة توضح مراحل التطور لمركز الملك عبدالله المالي (KAFD) من التأسيس إلى التشغيل',
  sourceAttribution: 'European Space Agency (Copernicus Sentinel-2) & Esri World Imagery Basemap'
};
