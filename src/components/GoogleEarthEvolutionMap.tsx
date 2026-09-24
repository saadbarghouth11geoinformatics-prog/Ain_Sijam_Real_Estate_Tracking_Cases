import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe, 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Play, 
  Pause, 
  Building2, 
  Hammer, 
  Compass, 
  Eye, 
  Maximize2, 
  Sparkles, 
  MapPin, 
  CheckCircle2, 
  Flame,
  Info,
  X
} from 'lucide-react';
import { UrbanEvolutionPeriod } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

export interface SatelliteBuildingPlot {
  id: string;
  parcelNum: string;
  block: string;
  type: 'villa' | 'commercial' | 'apartment' | 'facility' | 'park';
  name: string;
  x: number; // percentage coordinate 0-100
  y: number; // percentage coordinate 0-100
  width: number; // in svg units / percentage
  height: number;
  rotation?: number;
  builtInPeriodIndex: number; // 0 to 5
  constructionStartedPeriodIndex: number; // 0 to 5
  floors: string;
  areaM2: number;
  roofColor?: string;
  hasPool?: boolean;
}

// Generate realistic parcel layout across 4 residential/commercial blocks in Al-Narjis, Riyadh (Tracking 2026 monthly evolution)
export const SATELLITE_PLOTS_DATA: SatelliteBuildingPlot[] = [
  // ================= BLOCK 1 (North-West: Villas & Mansions) =================
  { id: 'p-01', parcelNum: '101', block: 'المربع الشمالي أ', type: 'villa', name: 'فيلا مودرن طراز سلماني', x: 12, y: 16, width: 6.5, height: 5.5, builtInPeriodIndex: 0, constructionStartedPeriodIndex: 0, floors: 'دوران وملحق', areaM2: 750, hasPool: true },
  { id: 'p-02', parcelNum: '102', block: 'المربع الشمالي أ', type: 'villa', name: 'فيلا سكنية عائلية', x: 20, y: 16, width: 6, height: 5.5, builtInPeriodIndex: 0, constructionStartedPeriodIndex: 0, floors: 'دوران', areaM2: 620 },
  { id: 'p-03', parcelNum: '103', block: 'المربع الشمالي أ', type: 'villa', name: 'فيلا فاخرة بحجر الرياض', x: 27.5, y: 16, width: 6.5, height: 5.5, builtInPeriodIndex: 0, constructionStartedPeriodIndex: 0, floors: 'دوران وملحق', areaM2: 780, hasPool: true },
  { id: 'p-04', parcelNum: '104', block: 'المربع الشمالي أ', type: 'villa', name: 'قصر سكني مصغر', x: 35.5, y: 16, width: 8, height: 6, builtInPeriodIndex: 0, constructionStartedPeriodIndex: 0, floors: '3 أدوار وقبو', areaM2: 1100, hasPool: true },
  { id: 'p-05', parcelNum: '105', block: 'المربع الشمالي أ', type: 'villa', name: 'فيلا مستقلة حديثة', x: 12, y: 23, width: 6, height: 5, builtInPeriodIndex: 0, constructionStartedPeriodIndex: 0, floors: 'دوران', areaM2: 580 },
  { id: 'p-06', parcelNum: '106', block: 'المربع الشمالي أ', type: 'villa', name: 'فيلا زاوية على شارعين', x: 19.5, y: 23, width: 6.5, height: 5.2, builtInPeriodIndex: 0, constructionStartedPeriodIndex: 0, floors: 'دوران وملحق', areaM2: 690 },
  { id: 'p-07', parcelNum: '107', block: 'المربع الشمالي أ', type: 'villa', name: 'فيلا تصميم نيوكلاسيك', x: 27.5, y: 23, width: 6.5, height: 5, builtInPeriodIndex: 1, constructionStartedPeriodIndex: 0, floors: 'دوران', areaM2: 600 },
  { id: 'p-08', parcelNum: '108', block: 'المربع الشمالي أ', type: 'villa', name: 'فيلا سكنية ذكية', x: 35.5, y: 23.5, width: 7, height: 5.2, builtInPeriodIndex: 2, constructionStartedPeriodIndex: 0, floors: 'دوران ونصف', areaM2: 720 },
  { id: 'p-09', parcelNum: '109', block: 'المربع الشمالي أ', type: 'villa', name: 'فيلا دبلوكس أ', x: 12, y: 29.5, width: 5.8, height: 4.8, builtInPeriodIndex: 0, constructionStartedPeriodIndex: 0, floors: 'دوران', areaM2: 450 },
  { id: 'p-10', parcelNum: '110', block: 'المربع الشمالي أ', type: 'villa', name: 'فيلا دبلوكس ب', x: 19, y: 29.5, width: 5.8, height: 4.8, builtInPeriodIndex: 2, constructionStartedPeriodIndex: 1, floors: 'دوران', areaM2: 450 },
  { id: 'p-11', parcelNum: '111', block: 'المربع الشمالي أ', type: 'villa', name: 'فيلا تاون هاوس حديثة', x: 26, y: 29.5, width: 6.2, height: 4.8, builtInPeriodIndex: 4, constructionStartedPeriodIndex: 2, floors: 'دوران وملحق', areaM2: 520 },
  { id: 'p-12', parcelNum: '112', block: 'المربع الشمالي أ', type: 'park', name: 'حديقة الحي العامة والمسطح الأخضر', x: 33.5, y: 29.5, width: 9.5, height: 6.5, builtInPeriodIndex: 3, constructionStartedPeriodIndex: 1, floors: 'مسطح مفتوح وألعاب', areaM2: 1850 },
  { id: 'p-13', parcelNum: '113', block: 'المربع الشمالي أ', type: 'villa', name: 'فيلا خاصة راقية', x: 12, y: 35.5, width: 6.2, height: 5, builtInPeriodIndex: 3, constructionStartedPeriodIndex: 1, floors: 'دوران', areaM2: 600 },
  { id: 'p-14', parcelNum: '114', block: 'المربع الشمالي أ', type: 'villa', name: 'فيلا مستقلة مسبقة الصنع', x: 19.5, y: 35.5, width: 6, height: 5, builtInPeriodIndex: 5, constructionStartedPeriodIndex: 3, floors: 'دوران', areaM2: 550 },
  { id: 'p-15', parcelNum: '115', block: 'المربع الشمالي أ', type: 'villa', name: 'فيلا مودرن ذكية', x: 26.5, y: 35.5, width: 6, height: 5, builtInPeriodIndex: 8, constructionStartedPeriodIndex: 5, floors: 'دوران وملحق', areaM2: 630 },
  { id: 'p-16', parcelNum: '116', block: 'المربع الشمالي أ', type: 'villa', name: 'فيلا مطلة على الحديقة', x: 34, y: 37, width: 7.5, height: 4.8, builtInPeriodIndex: 5, constructionStartedPeriodIndex: 3, floors: 'دوران وملحق', areaM2: 700, hasPool: true },

  // ================= BLOCK 2 (North-East: Mixed Commercial Boulevard & Apartments) =================
  { id: 'p-17', parcelNum: '201', block: 'بوليفارد النرجس التجاري', type: 'commercial', name: 'مجمع تجاري ومقاهي النرجس', x: 53, y: 15, width: 12, height: 7, builtInPeriodIndex: 0, constructionStartedPeriodIndex: 0, floors: '3 طوابق + تراس', areaM2: 3200 },
  { id: 'p-18', parcelNum: '202', block: 'بوليفارد النرجس التجاري', type: 'commercial', name: 'مركز طبي وصيدلية مركزية', x: 66.5, y: 15, width: 8.5, height: 7, builtInPeriodIndex: 0, constructionStartedPeriodIndex: 0, floors: 'أرضي + ميزانين + دورين', areaM2: 2400 },
  { id: 'p-19', parcelNum: '203', block: 'بوليفارد النرجس التجاري', type: 'commercial', name: 'مبنى بنكي ومعارض سيارات', x: 76.5, y: 15, width: 9, height: 7, builtInPeriodIndex: 0, constructionStartedPeriodIndex: 0, floors: 'دورين تجاريين', areaM2: 2800 },
  { id: 'p-20', parcelNum: '204', block: 'المربع الشرقي ب', type: 'apartment', name: 'عمارة شقق تمليك فاخرة (سولاف)', x: 53, y: 23.5, width: 9, height: 6, builtInPeriodIndex: 0, constructionStartedPeriodIndex: 0, floors: '4 أدوار وقبو مواقف', areaM2: 2100 },
  { id: 'p-21', parcelNum: '205', block: 'المربع الشرقي ب', type: 'apartment', name: 'مشروع شقق ديلوكس (رواسي)', x: 63.5, y: 23.5, width: 9, height: 6, builtInPeriodIndex: 1, constructionStartedPeriodIndex: 0, floors: '4 أدوار + روف', areaM2: 2300 },
  { id: 'p-22', parcelNum: '206', block: 'المربع الشرقي ب', type: 'apartment', name: 'مجمع ريزيدنس السكني', x: 74, y: 23.5, width: 11.5, height: 6, builtInPeriodIndex: 5, constructionStartedPeriodIndex: 3, floors: '5 أدوار وقبو', areaM2: 3400 },
  { id: 'p-23', parcelNum: '207', block: 'المربع الشرقي ب', type: 'facility', name: 'جامع النرجس الكبير ومركز التحفيظ', x: 53, y: 31, width: 10, height: 7, builtInPeriodIndex: 0, constructionStartedPeriodIndex: 0, floors: 'جامع رئيسي ومنارة', areaM2: 2600 },
  { id: 'p-24', parcelNum: '208', block: 'المربع الشرقي ب', type: 'apartment', name: 'عمائر ديار العز السكنية', x: 64.5, y: 31, width: 9, height: 5.5, builtInPeriodIndex: 2, constructionStartedPeriodIndex: 0, floors: '4 أدوار متكررة', areaM2: 2000 },
  { id: 'p-25', parcelNum: '209', block: 'المربع الشرقي ب', type: 'apartment', name: 'عمارة المهيدب للشقق المفروشة', x: 75, y: 31, width: 10, height: 5.5, builtInPeriodIndex: 5, constructionStartedPeriodIndex: 3, floors: '4 أدوار', areaM2: 2200 },
  { id: 'p-26', parcelNum: '210', block: 'المربع الشرقي ب', type: 'commercial', name: 'سوبرماركت ومحلات تجارية', x: 53, y: 39, width: 8.5, height: 5, builtInPeriodIndex: 3, constructionStartedPeriodIndex: 1, floors: 'طابقين', areaM2: 1700 },
  { id: 'p-27', parcelNum: '211', block: 'المربع الشرقي ب', type: 'apartment', name: 'شقق النرجس بلس السكنية', x: 63, y: 38, width: 9.5, height: 5.8, builtInPeriodIndex: 7, constructionStartedPeriodIndex: 4, floors: '4 أدوار', areaM2: 2150 },
  { id: 'p-28', parcelNum: '212', block: 'المربع الشرقي ب', type: 'apartment', name: 'مشروع نيرفانا للأجنحة الفندقية', x: 74, y: 38, width: 11, height: 6, builtInPeriodIndex: 8, constructionStartedPeriodIndex: 5, floors: '5 أدوار + مسبح روف', areaM2: 3100, hasPool: true },

  // ================= BLOCK 3 (South-West: Premium Residential Enclave) =================
  { id: 'p-29', parcelNum: '301', block: 'المربع الجنوبي ج', type: 'villa', name: 'فيلا أرجوان الفاخرة', x: 12, y: 52, width: 6.5, height: 5.5, builtInPeriodIndex: 0, constructionStartedPeriodIndex: 0, floors: 'دوران وملحق', areaM2: 700, hasPool: true },
  { id: 'p-30', parcelNum: '302', block: 'المربع الجنوبي ج', type: 'villa', name: 'فيلا سكنية بتصميم واجهات زجاجية', x: 19.5, y: 52, width: 6.5, height: 5.5, builtInPeriodIndex: 0, constructionStartedPeriodIndex: 0, floors: 'دوران', areaM2: 640 },
  { id: 'p-31', parcelNum: '303', block: 'المربع الجنوبي ج', type: 'villa', name: 'فيلا كود البناء السعودي الحديث', x: 27, y: 52, width: 6.5, height: 5.5, builtInPeriodIndex: 0, constructionStartedPeriodIndex: 0, floors: 'دوران وملحق', areaM2: 680 },
  { id: 'p-32', parcelNum: '304', block: 'المربع الجنوبي ج', type: 'villa', name: 'فيلا زاوية مميزة', x: 34.5, y: 52, width: 7.5, height: 5.5, builtInPeriodIndex: 0, constructionStartedPeriodIndex: 0, floors: 'دوران ونصف', areaM2: 820 },
  { id: 'p-33', parcelNum: '305', block: 'المربع الجنوبي ج', type: 'villa', name: 'فيلا عصرية بطاقة شمسية', x: 12, y: 59, width: 6.2, height: 5.2, builtInPeriodIndex: 0, constructionStartedPeriodIndex: 0, floors: 'دوران', areaM2: 590 },
  { id: 'p-34', parcelNum: '306', block: 'المربع الجنوبي ج', type: 'villa', name: 'فيلا مودرن مع فناء داخلي', x: 19.5, y: 59, width: 6.5, height: 5.2, builtInPeriodIndex: 1, constructionStartedPeriodIndex: 0, floors: 'دوران وملحق', areaM2: 660 },
  { id: 'p-35', parcelNum: '307', block: 'المربع الجنوبي ج', type: 'villa', name: 'فيلا مستقلة تشطيب رخامي', x: 27, y: 59, width: 6.5, height: 5.2, builtInPeriodIndex: 2, constructionStartedPeriodIndex: 1, floors: 'دوران', areaM2: 650 },
  { id: 'p-36', parcelNum: '308', block: 'المربع الجنوبي ج', type: 'villa', name: 'قصر النرجس الجنوبي', x: 34.5, y: 59, width: 8.5, height: 5.5, builtInPeriodIndex: 6, constructionStartedPeriodIndex: 4, floors: '3 أدوار وقبو', areaM2: 1200, hasPool: true },
  { id: 'p-37', parcelNum: '309', block: 'المربع الجنوبي ج', type: 'villa', name: 'فيلا سمارت هوم 1', x: 12, y: 66, width: 6, height: 5, builtInPeriodIndex: 3, constructionStartedPeriodIndex: 1, floors: 'دوران', areaM2: 520 },
  { id: 'p-38', parcelNum: '310', block: 'المربع الجنوبي ج', type: 'villa', name: 'فيلا سمارت هوم 2', x: 19, y: 66, width: 6, height: 5, builtInPeriodIndex: 6, constructionStartedPeriodIndex: 4, floors: 'دوران', areaM2: 520 },
  { id: 'p-39', parcelNum: '311', block: 'المربع الجنوبي ج', type: 'villa', name: 'فيلا تصميم إسكندنافي', x: 26, y: 66, width: 6.5, height: 5, builtInPeriodIndex: 7, constructionStartedPeriodIndex: 5, floors: 'دوران وملحق', areaM2: 610 },
  { id: 'p-40', parcelNum: '312', block: 'المربع الجنوبي ج', type: 'villa', name: 'فيلا واجهة شمالية', x: 33.5, y: 66, width: 6.5, height: 5, builtInPeriodIndex: 9, constructionStartedPeriodIndex: 7, floors: 'دوران', areaM2: 600 },
  { id: 'p-41', parcelNum: '313', block: 'المربع الجنوبي ج', type: 'villa', name: 'فيلا عائلية دورين', x: 12, y: 73, width: 6, height: 5, builtInPeriodIndex: 7, constructionStartedPeriodIndex: 5, floors: 'دوران', areaM2: 540 },
  { id: 'p-42', parcelNum: '314', block: 'المربع الجنوبي ج', type: 'villa', name: 'فيلا استثمارية مؤجرة', x: 19, y: 73, width: 6, height: 5, builtInPeriodIndex: 8, constructionStartedPeriodIndex: 6, floors: 'دوران وملحق', areaM2: 580 },
  { id: 'p-43', parcelNum: '315', block: 'المربع الجنوبي ج', type: 'villa', name: 'فيلا بتشطيب خشبي ومعدني', x: 26, y: 73, width: 6.5, height: 5, builtInPeriodIndex: 9, constructionStartedPeriodIndex: 7, floors: 'دوران', areaM2: 620 },
  { id: 'p-44', parcelNum: '316', block: 'المربع الجنوبي ج', type: 'villa', name: 'فيلا سكنية تحت الإنشاء السريع', x: 33.5, y: 73, width: 7.5, height: 5.5, builtInPeriodIndex: 11, constructionStartedPeriodIndex: 9, floors: 'دوران وملحق', areaM2: 850 },

  // ================= BLOCK 4 (South-East: Metro Transit Oriented Development & Towers) =================
  { id: 'p-45', parcelNum: '401', block: 'محور محطة قطار الرياض', type: 'facility', name: 'محطة مترو النرجس (المسار الأصفر)', x: 53, y: 52, width: 13, height: 7, builtInPeriodIndex: 0, constructionStartedPeriodIndex: 0, floors: 'محطة علوية وساحة مواقف', areaM2: 4500 },
  { id: 'p-46', parcelNum: '402', block: 'محور محطة قطار الرياض', type: 'commercial', name: 'أبراج النرجس جيت للأعمال', x: 68, y: 52, width: 9, height: 7.5, builtInPeriodIndex: 4, constructionStartedPeriodIndex: 2, floors: '8 طوابق مكتبية', areaM2: 4200 },
  { id: 'p-47', parcelNum: '403', block: 'محور محطة قطار الرياض', type: 'commercial', name: 'فندق سيتي إكسبريس النرجس', x: 78.5, y: 52, width: 9.5, height: 7.5, builtInPeriodIndex: 6, constructionStartedPeriodIndex: 4, floors: '7 طوابق فندقية', areaM2: 3800 },
  { id: 'p-48', parcelNum: '404', block: 'المربع الجنوبي د', type: 'apartment', name: 'أبراج ديار السلام السكنية', x: 53, y: 61, width: 9, height: 6, builtInPeriodIndex: 4, constructionStartedPeriodIndex: 2, floors: '6 أدوار', areaM2: 2800 },
  { id: 'p-49', parcelNum: '405', block: 'المربع الجنوبي د', type: 'apartment', name: 'كمباوند فلل وشقق النرجس جاردنز', x: 63.5, y: 61, width: 11, height: 6, builtInPeriodIndex: 8, constructionStartedPeriodIndex: 5, floors: 'مجمع مسور ونادٍ', areaM2: 4800, hasPool: true },
  { id: 'p-50', parcelNum: '406', block: 'المربع الجنوبي د', type: 'commercial', name: 'ستريب مول النرجس بلازا', x: 76, y: 61, width: 10, height: 6, builtInPeriodIndex: 4, constructionStartedPeriodIndex: 2, floors: 'دورين تجاريين', areaM2: 2900 },
  { id: 'p-51', parcelNum: '407', block: 'المربع الجنوبي د', type: 'facility', name: 'مدارس النرجس الدولية للغات', x: 53, y: 69, width: 12, height: 7.5, builtInPeriodIndex: 0, constructionStartedPeriodIndex: 0, floors: '3 مبانٍ مدرسية وملاعب', areaM2: 5200 },
  { id: 'p-52', parcelNum: '408', block: 'المربع الجنوبي د', type: 'apartment', name: 'عمارات أفق النرجس السكنية', x: 66.5, y: 69, width: 9, height: 5.5, builtInPeriodIndex: 7, constructionStartedPeriodIndex: 5, floors: '4 أدوار', areaM2: 2200 },
  { id: 'p-53', parcelNum: '409', block: 'المربع الجنوبي د', type: 'apartment', name: 'برج الأماني السكني التجاري', x: 77, y: 69, width: 9.5, height: 5.5, builtInPeriodIndex: 10, constructionStartedPeriodIndex: 7, floors: '5 أدوار', areaM2: 2700 },
  { id: 'p-54', parcelNum: '410', block: 'المربع الجنوبي د', type: 'park', name: 'الممشى الرياضي وحديقة المترو', x: 53, y: 78, width: 15, height: 4.5, builtInPeriodIndex: 9, constructionStartedPeriodIndex: 6, floors: 'مسار دراجات ومسطح أخضر', areaM2: 3600 },
  { id: 'p-55', parcelNum: '411', block: 'المربع الجنوبي د', type: 'commercial', name: 'كافيهات ومطاعم الساحة المفتوحة', x: 69.5, y: 76, width: 8.5, height: 5.5, builtInPeriodIndex: 10, constructionStartedPeriodIndex: 8, floors: 'أرضي + روف', areaM2: 1800 },
  { id: 'p-56', parcelNum: '412', block: 'المربع الجنوبي د', type: 'villa', name: 'أرض تجارية استثمارية متبقية', x: 79.5, y: 76, width: 8, height: 5.5, builtInPeriodIndex: 13, constructionStartedPeriodIndex: 10, floors: 'أرض فضاء تجارية', areaM2: 1500 }, // Remaining vacant

  // ================= PERIMETER / BOULEVARD EXTRA PARCELS =================
  { id: 'p-57', parcelNum: '501', block: 'محور طريق عثمان بن عفان', type: 'commercial', name: 'محطة وقود وخدمات سريعة متكاملة', x: 12, y: 83, width: 9, height: 5.5, builtInPeriodIndex: 0, constructionStartedPeriodIndex: 0, floors: 'محطة + متجر + صيانة', areaM2: 2500 },
  { id: 'p-58', parcelNum: '502', block: 'محور طريق عثمان بن عفان', type: 'commercial', name: 'معرض أدوات صحية ومقاولات', x: 22.5, y: 83, width: 7.5, height: 5.5, builtInPeriodIndex: 0, constructionStartedPeriodIndex: 0, floors: 'دورين', areaM2: 1900 },
  { id: 'p-59', parcelNum: '503', block: 'محور طريق عثمان بن عفان', type: 'apartment', name: 'عمارة النخيل للشقق السكنية', x: 31.5, y: 83, width: 8, height: 5.5, builtInPeriodIndex: 6, constructionStartedPeriodIndex: 4, floors: '4 أدوار', areaM2: 2100 },
  { id: 'p-60', parcelNum: '504', block: 'محور طريق عثمان بن عفان', type: 'commercial', name: 'مجمع عيادات وصحة الأسرة', x: 41, y: 83, width: 8.5, height: 5.5, builtInPeriodIndex: 9, constructionStartedPeriodIndex: 7, floors: '3 أدوار', areaM2: 2400 },
];

interface GoogleEarthEvolutionMapProps {
  periods: UrbanEvolutionPeriod[];
  currentIndex: number;
  onSelectPeriodIndex: (index: number) => void;
  onConsultEngineering: (topic: string) => void;
}

export const GoogleEarthEvolutionMap: React.FC<GoogleEarthEvolutionMapProps> = ({
  periods,
  currentIndex,
  onSelectPeriodIndex,
  onConsultEngineering,
}) => {
  const { t, isAr } = useLanguage();
  const currentPeriod = periods[currentIndex] || periods[0];

  // Fixed satellite hybrid basemap (single fixed view)
  const [mapMode] = useState<'hybrid'>('hybrid');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedPlot, setSelectedPlot] = useState<SatelliteBuildingPlot | null>(null);
  const [isPlayingTimelapse, setIsPlayingTimelapse] = useState<boolean>(false);
  const [playSpeed, setPlaySpeed] = useState<number>(2000); // ms per step
  const [showRoadLabels, setShowRoadLabels] = useState<boolean>(true);
  const [showEquipmentMarkers, setShowEquipmentMarkers] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-play timelapse through periods
  useEffect(() => {
    let timer: any = null;
    if (isPlayingTimelapse) {
      timer = setInterval(() => {
        onSelectPeriodIndex((prev: number) => {
          if (prev >= periods.length - 1) {
            setIsPlayingTimelapse(false);
            return prev;
          }
          return prev + 1;
        });
      }, playSpeed);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlayingTimelapse, playSpeed, periods.length, onSelectPeriodIndex]);

  // Handle zoom
  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2.2));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 1));
  const handleResetZoom = () => setZoomLevel(1);

  // Filter plots status according to current period
  const getPlotStatus = (plot: SatelliteBuildingPlot) => {
    if (currentIndex < plot.constructionStartedPeriodIndex) {
      return 'vacant'; // أرض فضاء
    }
    if (currentIndex >= plot.constructionStartedPeriodIndex && currentIndex < plot.builtInPeriodIndex) {
      return 'under_construction'; // قيد التشييد والصب
    }
    return 'completed'; // مبنى مكتمل
  };

  // Counts for current period
  const completedCount = SATELLITE_PLOTS_DATA.filter(p => getPlotStatus(p) === 'completed').length;
  const underConstructionCount = SATELLITE_PLOTS_DATA.filter(p => getPlotStatus(p) === 'under_construction').length;
  const vacantCount = SATELLITE_PLOTS_DATA.filter(p => getPlotStatus(p) === 'vacant').length;

  return (
    <div 
      ref={containerRef}
      className={`relative rounded-3xl overflow-hidden border border-slate-700 bg-slate-950 shadow-2xl transition-all select-none ${
        isFullscreen ? 'fixed inset-4 z-50 rounded-2xl' : 'w-full'
      }`}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Top Google Earth HUD Bar */}
      <div className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-white z-20 relative">
        
        {/* Title & Satellite Indicator */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-sky-500/30">
            <Globe className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black tracking-tight text-white flex items-center gap-1.5">
                <span>{t('رصد الأقمار الصناعية عالي الدقة', 'High-Res Satellite Earth Observation')}</span>
                <span className="text-[10px] font-mono text-sky-400 bg-sky-950/80 px-2 py-0.5 rounded-full border border-sky-800/80">
                  Google Earth Engine™
                </span>
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              {isAr ? '24°50\'31.2"N 46°41\'07.4"E • حي النرجس، الرياض • دقة 50 سم/بكسل' : '24°50\'31.2"N 46°41\'07.4"E • Al-Narjis, Riyadh • 50cm/px Res'}
            </p>
          </div>
        </div>

        {/* Play / Timelapse Auto Controller */}
        <div className="flex items-center gap-2 bg-slate-800/80 p-1 rounded-2xl border border-slate-700">
          <button
            onClick={() => setIsPlayingTimelapse(!isPlayingTimelapse)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              isPlayingTimelapse 
                ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-md' 
                : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
            }`}
            title={isPlayingTimelapse ? t('إيقاف مؤقت', 'Pause') : t('تشغيل العرض التلقائي للتطور العمراني', 'Auto-play urban evolution time-lapse')}
          >
            {isPlayingTimelapse ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>{t('إيقاف المؤقت', 'Pause')}</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{t('عرض تايم لابس الشهري', 'Play Time-Lapse')}</span>
              </>
            )}
          </button>

          {/* Speed Selector */}
          <button
            onClick={() => setPlaySpeed(s => (s === 2000 ? 1200 : s === 1200 ? 3000 : 2000))}
            className="px-2 py-1 text-[11px] font-mono text-slate-300 hover:text-white rounded-lg hover:bg-slate-700 transition-all"
            title={t('سرعة العرض', 'Playback Speed')}
          >
            {playSpeed === 1200 ? '1.5x' : playSpeed === 3000 ? '0.7x' : '1.0x'}
          </button>
        </div>

        {/* Single Fixed Satellite Earth Basemap Indicator */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-slate-800/90 border border-emerald-500/40 text-emerald-300 text-xs font-semibold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <Globe className="w-3.5 h-3.5 text-emerald-400" />
          <span>{t('صورة فضائية للأرض (خلفية ثابتة)', 'Fixed Satellite Earth Basemap')}</span>
        </div>

        {/* Zoom & Fullscreen Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleZoomIn}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-slate-700"
            title="تكبير الخريطة"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-slate-700"
            title="تصغير الخريطة"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          {zoomLevel !== 1 && (
            <button
              onClick={handleResetZoom}
              className="px-2 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-[11px] font-mono text-sky-400 flex items-center justify-center transition-all border border-slate-700"
              title="إعادة ضبط المقياس 100%"
            >
              100%
            </button>
          )}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-slate-700 mr-1"
            title={isFullscreen ? 'تصغير الشاشة' : 'تكبير ملء الشاشة'}
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Main Satellite Earth Interactive Canvas */}
      <div className="relative w-full h-[460px] sm:h-[540px] overflow-hidden cursor-grab active:cursor-grabbing bg-[#1a1c18]">
        
        {/* Zoomable Container */}
        <div 
          className="w-full h-full relative transition-transform duration-300 ease-out origin-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* SATELLITE SVG CANVAS */}
          <svg 
            viewBox="0 0 1000 650" 
            className="w-full h-full object-cover"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              {/* Natural Desert Earth Texture Gradient */}
              <linearGradient id="desertSoilGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#bf9f78" />
                <stop offset="25%" stopColor="#aa8960" />
                <stop offset="50%" stopColor="#bfa17c" />
                <stop offset="75%" stopColor="#9c7a52" />
                <stop offset="100%" stopColor="#b39269" />
              </linearGradient>

              {/* Graded Construction Soil (Early 2020) */}
              <pattern id="soilGradingPattern" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 0,0 L 30,30 M 15,-15 L 45,15 M -15,15 L 15,45" stroke="#876642" strokeWidth="1" opacity="0.35" />
              </pattern>

              {/* Asphalt Road Gradient */}
              <linearGradient id="asphaltGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2c3036" />
                <stop offset="50%" stopColor="#22262b" />
                <stop offset="100%" stopColor="#1b1e22" />
              </linearGradient>

              {/* Metro Viaduct Gradient */}
              <linearGradient id="metroTrackGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#0369a1" />
              </linearGradient>

              {/* Heatmap Glow Filter */}
              <filter id="heatGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Building Shadow Filter */}
              <filter id="buildingDropShadow" x="-20%" y="-20%" width="150%" height="150%">
                <feDropShadow dx="3" dy="4" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.65" />
              </filter>
            </defs>

            {/* BASE SATELLITE TERRAIN: Natural Desert & Graded Land */}
            <rect x="0" y="0" width="1000" height="650" fill="url(#desertSoilGrad)" />
            {/* High-Resolution Google Earth Satellite Orthomosaic Backdrop */}
            <image
              href="https://images.unsplash.com/photo-1524813686514-a57563d77d66?w=1600&auto=format&fit=crop&q=85"
              x="0"
              y="0"
              width="1000"
              height="650"
              preserveAspectRatio="xMidYMid slice"
              opacity="0.70"
            />
            <rect x="0" y="0" width="1000" height="650" fill="url(#soilGradingPattern)" opacity="0.4" />

            {/* Satellite Terrain Topography Nuances (Wadi depressions, rock outcroppings) */}
            <path d="M 0,180 Q 250,220 500,190 T 1000,210 L 1000,280 Q 750,260 500,280 T 0,260 Z" fill="#9c784e" opacity="0.28" />
            <path d="M 0,420 Q 300,390 600,430 T 1000,410 L 1000,480 Q 700,460 400,480 T 0,460 Z" fill="#916c44" opacity="0.25" />

            {/* ROAD NETWORK (Progressively Paved by Period) */}
            {/* Primary Arterial: Othman Bin Affan Boulevard (North to South) */}
            <g id="arterial-north-south">
              {/* Road bed / asphalt */}
              <rect 
                x="470" 
                y="0" 
                width="42" 
                height="650" 
                fill="url(#asphaltGrad)" 
                stroke="#141619" 
                strokeWidth="2" 
              />
              {/* Center Median Landscaping */}
              <rect x="489" y="0" width="4" height="650" fill={currentIndex >= 4 ? '#166534' : '#2e7d32'} />
              {/* Road markings */}
              <line x1="480" y1="0" x2="480" y2="650" stroke="#facc15" strokeWidth="1.2" strokeDasharray="12 12" opacity="0.75" />
              <line x1="502" y1="0" x2="502" y2="650" stroke="#facc15" strokeWidth="1.2" strokeDasharray="12 12" opacity="0.75" />
            </g>

            {/* East-West Cross Boulevard: King Salman / Narjis Avenue */}
            <g id="arterial-east-west">
              <rect 
                x="0" 
                y="435" 
                width="1000" 
                height="46" 
                fill="url(#asphaltGrad)" 
                stroke="#141619" 
                strokeWidth="2" 
              />
              <rect x="0" y="456" width="1000" height="4" fill={currentIndex >= 4 ? '#15803d' : '#2e7d32'} />
              <line x1="0" y1="446" x2="1000" y2="446" stroke="#ffffff" strokeWidth="1" strokeDasharray="10 10" opacity="0.65" />
              <line x1="0" y1="469" x2="1000" y2="469" stroke="#ffffff" strokeWidth="1" strokeDasharray="10 10" opacity="0.65" />
            </g>

            {/* Secondary Local Street Grid */}
            <g id="local-streets" opacity={0.95}>
              {/* Horizontal Streets */}
              <rect x="100" y="90" width="370" height="18" fill="#2b2f35" />
              <rect x="512" y="90" width="410" height="18" fill="#2b2f35" />
              
              <rect x="100" y="275" width="370" height="16" fill="#2b2f35" />
              <rect x="512" y="275" width="410" height="16" fill="#2b2f35" />

              <rect x="100" y="555" width="370" height="16" fill="#2b2f35" />
              <rect x="512" y="555" width="410" height="16" fill="#2b2f35" />

              {/* Vertical Streets */}
              <rect x="90" y="90" width="16" height="490" fill="#2b2f35" />
              <rect x="440" y="90" width="16" height="490" fill="#2b2f35" />
              <rect x="525" y="90" width="16" height="490" fill="#2b2f35" />
              <rect x="900" y="90" width="16" height="490" fill="#2b2f35" />
            </g>

            {/* METRO ELEVATED VIADUCT */}
            <g id="metro-line">
              <path 
                d="M 525,0 L 525,650" 
                stroke="url(#metroTrackGrad)" 
                strokeWidth="6" 
                strokeDasharray="14 4" 
                filter="url(#buildingDropShadow)" 
              />
              {/* Metro Pillars */}
              {Array.from({ length: 11 }).map((_, i) => (
                <circle key={`pillar-${i}`} cx="525" cy={40 + i * 58} r="4" fill="#0f172a" stroke="#64748b" strokeWidth="1" />
              ))}
            </g>

            {/* CADASTRAL PARCEL BOUNDARIES (Shown in Hybrid mode or low opacity) */}
            {(mapMode === 'hybrid' || mapMode === 'satellite') && (
              <g id="cadastral-parcels" opacity={mapMode === 'hybrid' ? 0.65 : 0.25}>
                {SATELLITE_PLOTS_DATA.map((p) => (
                  <rect
                    key={`cad-${p.id}`}
                    x={p.x * 10}
                    y={p.y * 6.5}
                    width={p.width * 10}
                    height={p.height * 6.5}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="0.8"
                    strokeDasharray="4 3"
                  />
                ))}
              </g>
            )}

            {/* HEATMAP LAYER: Construction Activity Density */}
            {mapMode === 'heatmap' && (
              <g id="heatmap-overlay" opacity="0.65" filter="url(#heatGlow)">
                {SATELLITE_PLOTS_DATA.map((p) => {
                  const status = getPlotStatus(p);
                  if (status === 'vacant') return null;
                  const heatColor = status === 'under_construction' ? '#f43f5e' : '#f59e0b';
                  return (
                    <circle
                      key={`heat-${p.id}`}
                      cx={p.x * 10 + (p.width * 5)}
                      cy={p.y * 6.5 + (p.height * 3.25)}
                      r={status === 'under_construction' ? 28 : 20}
                      fill={heatColor}
                      opacity={status === 'under_construction' ? 0.8 : 0.55}
                    />
                  );
                })}
              </g>
            )}

            {/* SATELLITE BUILDINGS & PLOTS */}
            <g id="buildings-layer">
              {SATELLITE_PLOTS_DATA.map((plot) => {
                const status = getPlotStatus(plot);
                const isSelected = selectedPlot?.id === plot.id;
                const px = plot.x * 10;
                const py = plot.y * 6.5;
                const pw = plot.width * 10;
                const ph = plot.height * 6.5;

                // 1) VACANT LAND (أرض فضاء)
                if (status === 'vacant') {
                  return (
                    <g 
                      key={plot.id} 
                      onClick={() => setSelectedPlot(plot)}
                      className="cursor-pointer group"
                    >
                      <rect
                        x={px}
                        y={py}
                        width={pw}
                        height={ph}
                        fill="#b08e68"
                        stroke={isSelected ? '#38bdf8' : '#8c6e4b'}
                        strokeWidth={isSelected ? 2 : 0.8}
                        strokeDasharray={isSelected ? 'none' : '3 3'}
                        opacity="0.8"
                        className="group-hover:fill-[#c4a178] transition-colors"
                      />
                      {/* Faint Plot Number in Hybrid Mode */}
                      {mapMode === 'hybrid' && (
                        <text
                          x={px + pw / 2}
                          y={py + ph / 2 + 3}
                          textAnchor="middle"
                          fill="#451a03"
                          fontSize="7"
                          fontFamily="monospace"
                          fontWeight="bold"
                          opacity="0.5"
                        >
                          #{plot.parcelNum}
                        </text>
                      )}
                    </g>
                  );
                }

                // 2) UNDER CONSTRUCTION (قيد التشييد والصب الخرساني والرافعات)
                if (status === 'under_construction') {
                  return (
                    <g 
                      key={plot.id}
                      onClick={() => setSelectedPlot(plot)}
                      className="cursor-pointer group"
                    >
                      {/* Excavation Pit & Foundation Slab */}
                      <rect
                        x={px}
                        y={py}
                        width={pw}
                        height={ph}
                        fill="#78716c"
                        stroke="#f59e0b"
                        strokeWidth={isSelected ? 2.5 : 1.5}
                        filter="url(#buildingDropShadow)"
                        className="group-hover:brightness-110 transition-all"
                      />

                      {/* Rebar grid / concrete floor slab in progress */}
                      <rect
                        x={px + 3}
                        y={py + 3}
                        width={pw - 6}
                        height={ph - 6}
                        fill="#a8a29e"
                        stroke="#d97706"
                        strokeWidth="1"
                        strokeDasharray="4 2"
                      />

                      {/* Tower Crane or Heavy Machinery Marker on-site */}
                      {showEquipmentMarkers && (
                        <g transform={`translate(${px + pw / 2}, ${py + ph / 2})`}>
                          {/* Crane Base */}
                          <rect x="-3" y="-3" width="6" height="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="0.8" />
                          {/* Crane Jib Boom Arm with Shadow */}
                          <line x1="0" y1="0" x2="14" y2="-10" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
                          <line x1="0" y1="0" x2="-6" y2="4" stroke="#d97706" strokeWidth="2.5" />
                          <circle cx="14" cy="-10" r="1.5" fill="#ef4444" />
                        </g>
                      )}

                      {/* Pulse Status Ring */}
                      <circle
                        cx={px + pw - 4}
                        cy={py + 4}
                        r="3.5"
                        fill="#f59e0b"
                        className="animate-ping opacity-75"
                      />
                      <circle
                        cx={px + pw - 4}
                        cy={py + 4}
                        r="2.5"
                        fill="#f59e0b"
                      />
                    </g>
                  );
                }

                // 3) COMPLETED SATELLITE BUILDING (مبنى مكتمل على أرض الواقع)
                // Color palette reflects high-res Riyadh limestone & modern flat concrete roofs
                const isCommercial = plot.type === 'commercial';
                const isApartment = plot.type === 'apartment';
                const isFacility = plot.type === 'facility';
                const isPark = plot.type === 'park';

                // Specific realistic satellite roof coloring:
                let roofFill = '#e5dccb'; // standard villa sandstone
                let parapetStroke = '#c4b59f';

                if (isCommercial) {
                  roofFill = '#94a3b8'; // modern steel & grey waterproofing
                  parapetStroke = '#475569';
                } else if (isApartment) {
                  roofFill = '#d6cbba'; // beige apartment gravel roof
                  parapetStroke = '#8c7d6b';
                } else if (isFacility) {
                  roofFill = '#bae6fd'; // landmark blue roof / solar panels
                  parapetStroke = '#0284c7';
                } else if (isPark) {
                  roofFill = '#15803d'; // lush green turf
                  parapetStroke = '#166534';
                }

                return (
                  <g 
                    key={plot.id}
                    onClick={() => setSelectedPlot(plot)}
                    className="cursor-pointer group"
                  >
                    {/* Compound Boundary Wall for villas */}
                    {!isPark && (
                      <rect
                        x={px - 2}
                        y={py - 2}
                        width={pw + 4}
                        height={ph + 4}
                        fill="#d0beaa"
                        stroke="#a89279"
                        strokeWidth="0.8"
                        opacity="0.9"
                      />
                    )}

                    {/* Main Building Roof Block */}
                    <rect
                      x={px}
                      y={py}
                      width={pw}
                      height={ph}
                      fill={roofFill}
                      stroke={isSelected ? '#38bdf8' : parapetStroke}
                      strokeWidth={isSelected ? 3 : 1.5}
                      filter="url(#buildingDropShadow)"
                      className="group-hover:brightness-110 transition-all"
                    />

                    {/* Rooftop AC Condensers / Parapet Detail (Satellite Realism) */}
                    {!isPark && (
                      <>
                        <rect x={px + 4} y={py + 4} width="4" height="3" fill="#64748b" opacity="0.8" />
                        <rect x={px + 10} y={py + 4} width="3" height="3" fill="#64748b" opacity="0.8" />
                        {/* Skylight or stairwell penthouse */}
                        <rect 
                          x={px + pw / 2 - 3} 
                          y={py + ph / 2 - 3} 
                          width="6" 
                          height="6" 
                          fill="#334155" 
                          opacity="0.7" 
                        />
                      </>
                    )}

                    {/* Private Swimming Pool in Backyard */}
                    {plot.hasPool && (
                      <rect
                        x={px + pw - 9}
                        y={py + ph - 7}
                        width="7"
                        height="5"
                        rx="1"
                        fill="#38bdf8"
                        stroke="#0284c7"
                        strokeWidth="0.8"
                      />
                    )}

                    {/* Park Trees & Greenery Details */}
                    {isPark && (
                      <g>
                        <circle cx={px + 10} cy={py + 10} r="5" fill="#22c55e" opacity="0.9" />
                        <circle cx={px + 24} cy={py + 14} r="6" fill="#16a34a" opacity="0.9" />
                        <circle cx={px + 45} cy={py + 20} r="7" fill="#15803d" opacity="0.9" />
                        <circle cx={px + 65} cy={py + 15} r="6" fill="#22c55e" opacity="0.9" />
                        <path d={`M ${px + 5},${py + 25} Q ${px + pw / 2},${py + 10} ${px + pw - 5},${py + 25}`} stroke="#fef08a" strokeWidth="2" fill="none" />
                      </g>
                    )}

                    {/* Badge if built recently in this exact period */}
                    {plot.builtInPeriodIndex === currentIndex && (
                      <g transform={`translate(${px + pw / 2}, ${py - 6})`}>
                        <rect x="-24" y="-7" width="48" height="12" rx="3" fill="#10b981" />
                        <text x="0" y="2" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">جديد {currentPeriod.month || currentPeriod.year}</text>
                      </g>
                    )}
                  </g>
                );
              })}
            </g>

            {/* ROAD NAMES & LANDMARK LABELS */}
            {showRoadLabels && (
              <g id="labels-overlay" className="pointer-events-none select-none">
                {/* Othman Bin Affan Road Label */}
                <text
                  x="490"
                  y="320"
                  fill="#ffffff"
                  fontSize="10"
                  fontWeight="bold"
                  letterSpacing="1"
                  transform="rotate(-90 490 320)"
                  textAnchor="middle"
                  className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                >
                  {t('طريق عثمان بن عفان الرئيسي', 'Othman Bin Affan Arterial Blvd')}
                </text>

                {/* East-West Boulevard Label */}
                <text
                  x="720"
                  y="452"
                  fill="#ffffff"
                  fontSize="11"
                  fontWeight="bold"
                  textAnchor="middle"
                  className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                >
                  {t('محور الأمير فيصل بن بندر (حي النرجس)', 'Prince Faisal Bin Bandar Axis (Al-Narjis)')}
                </text>

                {/* Metro Station Marker */}
                {currentIndex >= 2 && (
                  <g transform="translate(580, 500)">
                    <rect x="-8" y="-8" width="130" height="20" rx="6" fill="#0284c7" stroke="#ffffff" strokeWidth="1" filter="url(#buildingDropShadow)" />
                    <text x="56" y="5" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                      {t('🚆 محطة مترو النرجس (مكتملة)', '🚆 Narjis Metro Station (Completed)')}
                    </text>
                  </g>
                )}

                {/* District Label */}
                <text
                  x="260"
                  y="50"
                  fill="#f8fafc"
                  fontSize="13"
                  fontWeight="900"
                  textAnchor="middle"
                  className="filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]"
                >
                  {t('الرياض • مخطط النرجس 2450', 'Riyadh • Al-Narjis Plan 2450')}
                </text>
              </g>
            )}

            {/* SATELLITE COMPASS & SCALE BAR (Inside SVG) */}
            <g transform="translate(930, 45)" className="pointer-events-none">
              {/* Compass Rose */}
              <circle cx="0" cy="0" r="18" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" opacity="0.9" />
              <polygon points="0,-14 -4,-2 0,0" fill="#ef4444" />
              <polygon points="0,-14 4,-2 0,0" fill="#dc2626" />
              <polygon points="0,14 -4,2 0,0" fill="#94a3b8" />
              <polygon points="0,14 4,2 0,0" fill="#cbd5e1" />
              <text x="0" y="-18" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">N</text>
            </g>

            {/* Scale Bar */}
            <g transform="translate(50, 615)" className="pointer-events-none">
              <rect x="-10" y="-16" width="120" height="26" rx="4" fill="#0f172a" opacity="0.8" />
              <line x1="0" y1="0" x2="100" y2="0" stroke="#ffffff" strokeWidth="2.5" />
              <line x1="0" y1="-5" x2="0" y2="5" stroke="#ffffff" strokeWidth="2" />
              <line x1="50" y1="-3" x2="50" y2="3" stroke="#ffffff" strokeWidth="1.5" />
              <line x1="100" y1="-5" x2="100" y2="5" stroke="#ffffff" strokeWidth="2" />
              <text x="50" y="-6" textAnchor="middle" fill="#ffffff" fontSize="8" fontFamily="monospace" fontWeight="bold">
                {t('200 متر', '200 m')}
              </text>
            </g>
          </svg>
        </div>

        {/* FLOATING INSPECTOR CARD: When a parcel is clicked */}
        {selectedPlot && (
          <div className="absolute bottom-4 right-4 z-30 max-w-sm bg-slate-900/95 backdrop-blur-md border border-sky-500/50 rounded-2xl p-4 text-white shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-2 mb-3">
              <div>
                <span className="text-[10px] text-sky-400 font-mono font-bold bg-sky-950 px-2 py-0.5 rounded-md border border-sky-800">
                  قطعة رقم #{selectedPlot.parcelNum} • {selectedPlot.block}
                </span>
                <h4 className="text-sm font-black text-white mt-1">{selectedPlot.name}</h4>
              </div>
              <button 
                onClick={() => setSelectedPlot(null)}
                className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-all"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Status in this chosen period */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">{t('الحالة في', 'Status as of')} {currentPeriod.month} {currentPeriod.year}:</span>
                <span className={`font-bold px-2 py-0.5 rounded-md ${
                  getPlotStatus(selectedPlot) === 'completed' 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                    : getPlotStatus(selectedPlot) === 'under_construction'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}>
                  {getPlotStatus(selectedPlot) === 'completed' 
                    ? t('✅ مبنى مكتمل ومأهول', '✅ Completed & Occupied')
                    : getPlotStatus(selectedPlot) === 'under_construction'
                    ? t('🏗️ قيد الصب والإنشاء', '🏗️ Active Construction')
                    : t('⏳ أرض فضاء مخططة', '⏳ Planned Vacant Plot')}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-800">
                <div>
                  <span className="text-slate-400">{t('المسطح: ', 'Footprint: ')}</span>
                  <span className="font-bold text-white font-mono">{selectedPlot.areaM2} {t('م²', 'm²')}</span>
                </div>
                <div>
                  <span className="text-slate-400">{t('الارتفاع: ', 'Levels: ')}</span>
                  <span className="font-bold text-white">{selectedPlot.floors}</span>
                </div>
                <div>
                  <span className="text-slate-400">{t('تاريخ الإنجاز: ', 'Completion: ')}</span>
                  <span className="font-bold text-emerald-400">
                    {periods[selectedPlot.builtInPeriodIndex]?.year || t('مستقبلي', 'Future')}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">{t('كود البناء: ', 'Building Code: ')}</span>
                  <span className="font-bold text-sky-400">{t('SBC 201 معتمد', 'SBC 201 Verified')}</span>
                </div>
              </div>

              <button
                onClick={() => onConsultEngineering(t(
                  `قدم لي فحصاً هندسياً لقطعة رقم ${selectedPlot.parcelNum} في حي النرجس (${selectedPlot.name}) مسطح ${selectedPlot.areaM2} م² وارتفاع ${selectedPlot.floors}.`,
                  `Provide geotechnical and code advisory for parcel #${selectedPlot.parcelNum} in Al-Narjis (${selectedPlot.name}) with ${selectedPlot.areaM2} m² area and ${selectedPlot.floors} height.`
                ))}
                className="w-full mt-2 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-sky-500/20 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('طلب استشارة كود البناء للقطعة', 'Request SBC Code Advisory for Plot')}</span>
              </button>
            </div>
          </div>
        )}

        {/* MONTH / YEAR WATERMARK BADGE IN BOTTOM-LEFT (Like Google Earth Time Machine) */}
        <div className="absolute bottom-4 left-4 z-20 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-2xl px-4 py-2.5 text-white shadow-xl flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-mono font-black text-sm">
            {currentPeriod.year}
          </div>
          <div>
            <div className="text-xs font-black text-white flex items-center gap-1.5">
              <span>{t('رصد شهر:', 'Observation:')} {currentPeriod.month} {currentPeriod.year}</span>
              <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/80 px-2 py-0.2 rounded-full border border-emerald-800">
                {currentPeriod.builtUpRatioPct}% {t('مبني', 'Built')}
              </span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {currentPeriod.phaseTitle}
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM FOOTER: Dynamic Status Counts & Layer Toggles */}
      <div className="bg-slate-900 border-t border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Real-time Building Counts for Selected Month */}
        <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-xs shadow-emerald-400/50" />
            <span className="text-slate-300">
              {t('المباني المكتملة:', 'Completed Buildings:')} <strong className="text-white font-mono">{completedCount}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-400 animate-pulse shadow-xs shadow-amber-400/50" />
            <span className="text-slate-300">
              {t('قيد التشييد والصب:', 'Under Construction:')} <strong className="text-amber-400 font-mono">{underConstructionCount}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-slate-600" />
            <span className="text-slate-400">
              {t('أراضٍ فضاء متبقية:', 'Remaining Vacant Plots:')} <strong className="text-slate-200 font-mono">{vacantCount}</strong>
            </span>
          </div>
        </div>

        {/* Quick Toggles */}
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <button
            onClick={() => setShowRoadLabels(!showRoadLabels)}
            className={`px-2.5 py-1 rounded-lg border transition-all ${
              showRoadLabels 
                ? 'bg-slate-800 text-sky-400 border-sky-500/40 font-bold' 
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
          >
            {t('تسميات الشوارع', 'Road Labels')}
          </button>

          <button
            onClick={() => setShowEquipmentMarkers(!showEquipmentMarkers)}
            className={`px-2.5 py-1 rounded-lg border transition-all ${
              showEquipmentMarkers 
                ? 'bg-slate-800 text-amber-400 border-amber-500/40 font-bold' 
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
          >
            {t('مواقع الرافعات', 'Cranes & Fleet')}
          </button>

          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-400 hidden sm:inline">
            {t('اضغط على أي مبنى أو قطعة أرض لعرض تفاصيلها وبيانات الصك', 'Click any plot to view cadastral and zoning specifications')}
          </span>
        </div>

      </div>

    </div>
  );
};
