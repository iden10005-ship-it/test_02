/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  Building,
  Search,
  ShieldCheck,
  Sparkles,
  Droplets,
  CheckCircle2,
  ChevronRight,
  Phone,
  AlertTriangle,
  Layers,
  Wrench,
  Plus,
  Trash2,
  MapPin,
  ExternalLink,
  Flame,
  ThumbsUp,
} from 'lucide-react';
import { ApartmentComplexItem, RegionKnowHowItem, CompanyInfo } from '../../types/siteData';
import { EditableText } from '../common/EditableText';
import {
  getRegionApartments,
  getRegionKnowHows,
  getRegionEnvironmentalFactors,
} from '../../data/regionApartmentsAndKnowHowData';

interface RegionApartmentAndKnowHowSectionProps {
  regionName: string;
  company: CompanyInfo;
  customApartments?: ApartmentComplexItem[];
  customKnowHows?: RegionKnowHowItem[];
  customFactors?: string[];
  isEditMode: boolean;
  onUpdateApartments?: (apartments: ApartmentComplexItem[]) => void;
  onUpdateKnowHows?: (knowHows: RegionKnowHowItem[]) => void;
  onSelectComplexForQuote?: (complexName: string) => void;
}

export const RegionApartmentAndKnowHowSection: React.FC<RegionApartmentAndKnowHowSectionProps> = ({
  regionName,
  company,
  customApartments,
  customKnowHows,
  customFactors,
  isEditMode,
  onUpdateApartments,
  onUpdateKnowHows,
  onSelectComplexForQuote,
}) => {
  const [activeTab, setActiveTab] = useState<'both' | 'apartments' | 'knowhow'>('both');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'large' | 'system'>('all');

  // Resolved datasets
  const apartments = useMemo(() => {
    return getRegionApartments(regionName, customApartments);
  }, [regionName, customApartments]);

  const knowHows = useMemo(() => {
    return getRegionKnowHows(regionName, customKnowHows);
  }, [regionName, customKnowHows]);

  const environmentalFactors = useMemo(() => {
    return getRegionEnvironmentalFactors(regionName, customFactors);
  }, [regionName, customFactors]);

  // Filtered apartments
  const filteredApartments = useMemo(() => {
    return apartments.filter((apt) => {
      const matchesSearch =
        apt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.dong.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.windowType.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (selectedFilter === 'large') {
        const countNum = parseInt((apt.householdCount || '0').replace(/[^0-9]/g, ''), 10);
        return countNum >= 1000;
      }
      if (selectedFilter === 'system') {
        return (
          apt.windowType.includes('시스템') ||
          apt.windowType.includes('난간대') ||
          apt.windowType.includes('통창')
        );
      }
      return true;
    });
  }, [apartments, searchQuery, selectedFilter]);

  // Handlers for edit mode
  const handleAddApartment = () => {
    if (!onUpdateApartments) return;
    const newApt: ApartmentComplexItem = {
      id: `apt-custom-${Date.now()}`,
      name: `${regionName} 신규 아파트 단지`,
      dong: `${regionName} 관내동`,
      windowType: '이중창 / 시스템창호',
      householdCount: '1,000세대',
      keyCleaningPoint: '창틀 탈거 없는 실내 안전 양면 자석 세척 및 물때 복원',
      recommendedService: '아파트 외창 + 나노 발수코팅',
      satisfactionRate: '99.5%',
      caseCount: 20,
    };
    onUpdateApartments([...apartments, newApt]);
  };

  const handleUpdateApartment = (id: string, field: keyof ApartmentComplexItem, value: any) => {
    if (!onUpdateApartments) return;
    const updated = apartments.map((apt) => (apt.id === id ? { ...apt, [field]: value } : apt));
    onUpdateApartments(updated);
  };

  const handleDeleteApartment = (id: string) => {
    if (!onUpdateApartments) return;
    const updated = apartments.filter((apt) => apt.id !== id);
    onUpdateApartments(updated);
  };

  const handleUpdateKnowHow = (id: string, field: keyof RegionKnowHowItem, value: any) => {
    if (!onUpdateKnowHows) return;
    const updated = knowHows.map((kh) => (kh.id === id ? { ...kh, [field]: value } : kh));
    onUpdateKnowHows(updated);
  };

  const handleInquireComplex = (complexName: string) => {
    if (onSelectComplexForQuote) {
      onSelectComplexForQuote(complexName);
    } else {
      const quoteEl = document.getElementById('region-quote') || document.getElementById('contact');
      if (quoteEl) {
        quoteEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="space-y-10 my-10">
      {/* Top Banner: Regional Environmental Analysis */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-blue-600/10 to-transparent pointer-events-none" />
        
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
              ClearWorks Engineering Standard
            </span>
          </div>
          <span className="text-xs text-slate-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
            📍 [{regionName}] 지역 맞춤 시공 기준 적용
          </span>
        </div>

        <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight mb-3">
          [{regionName}] 주요 아파트 단지 정보 & 특화 작업 노하우
        </h2>
        <p className="text-sm text-slate-300 max-w-2xl leading-relaxed mb-6">
          {regionName} 관내 아파트들은 단지 연식, 도로 인접성, 창호 시스템(슬라이딩/유리난간/커튼월)에 따라 오염 원인과 청소 공법이 다릅니다. 클리어웍스는 단지별 맞춤 장비와 공법으로 창틀 손상 없이 100% 안전하게 시공합니다.
        </p>

        {/* Environmental Factor Tags */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
          <div className="text-xs font-bold text-blue-300 mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>[{regionName}] 관내 핵심 오염 원인 및 환경 요인</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {environmentalFactors.map((factor, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-medium border border-white/10 flex items-center gap-1.5 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                {factor}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveTab('both')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'both' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            전체 보기
          </button>
          <button
            onClick={() => setActiveTab('apartments')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'apartments' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>주요 아파트 단지 ({apartments.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('knowhow')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'knowhow' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>특화 작업 노하우 ({knowHows.length})</span>
          </button>
        </div>

        {/* Quick Inquire Button */}
        <button
          onClick={() => {
            const el = document.getElementById('region-quote') || document.getElementById('contact');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3.5 py-2 rounded-xl border border-blue-200/80 flex items-center gap-1 transition-all"
        >
          <span>{regionName} 아파트 무료 실측 신청</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* SECTION 1: Major Apartment Complexes */}
      {(activeTab === 'both' || activeTab === 'apartments') && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-2">
                <Building className="w-3.5 h-3.5 text-blue-600" />
                <span>[{regionName}] 아파트별 창호 구조 & 맞춤 가이드</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {regionName} 주요 시공 아파트 단지 리스트
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                주민들이 가장 많이 의뢰하시는 단지 목록입니다. 거주하시는 단지를 찾아 최적의 시공 솔루션을 확인해보세요.
              </p>
            </div>

            {isEditMode && onUpdateApartments && (
              <button
                onClick={handleAddApartment}
                className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>새 단지 추가</span>
              </button>
            )}
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={`${regionName} 내 아파트명 또는 동명 검색 (예: 래미안, 자이, 대치동)...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-400 text-[11px] hidden sm:inline">단지 필터:</span>
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  selectedFilter === 'all'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setSelectedFilter('large')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  selectedFilter === 'large'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                1,000세대 이상 대단지
              </button>
              <button
                onClick={() => setSelectedFilter('system')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  selectedFilter === 'system'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                시스템창호·조망형
              </button>
            </div>
          </div>

          {/* Apartment Grid Cards */}
          {filteredApartments.length === 0 ? (
            <div className="bg-slate-50 rounded-2xl p-8 text-center border border-slate-200">
              <p className="text-slate-500 text-sm mb-2">검색된 아파트 단지가 없습니다.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedFilter('all');
                }}
                className="text-xs font-bold text-blue-600 underline"
              >
                검색 조건 초기화
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredApartments.map((apt) => (
                <div
                  key={apt.id}
                  className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-200 flex flex-col justify-between group relative"
                >
                  {/* Card Header */}
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-extrabold text-[10px] border border-blue-200/60">
                            {apt.dong}
                          </span>
                          {apt.householdCount && (
                            <span className="text-[11px] font-semibold text-slate-500">
                              {apt.householdCount}
                            </span>
                          )}
                        </div>
                        <h4 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                          <EditableText
                            value={apt.name}
                            onSave={(val) => handleUpdateApartment(apt.id, 'name', val)}
                            isEditMode={isEditMode}
                            label="단지명 수정"
                          />
                        </h4>
                      </div>

                      {/* Satisfaction or Case Badge */}
                      <div className="flex flex-col items-end shrink-0">
                        {apt.satisfactionRate && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200/60 flex items-center gap-1">
                            <ThumbsUp className="w-2.5 h-2.5 text-emerald-600" />
                            {apt.satisfactionRate} 만족
                          </span>
                        )}
                        {apt.caseCount && (
                          <span className="text-[10px] font-medium text-slate-400 mt-0.5">
                            시공 {apt.caseCount}건+
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Window Type Pill */}
                    <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-100 mb-3.5">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Layers className="w-3 h-3 text-blue-500" />
                        <span>창호 및 난간 구조</span>
                      </div>
                      <div className="text-xs font-bold text-slate-800">
                        <EditableText
                          value={apt.windowType}
                          onSave={(val) => handleUpdateApartment(apt.id, 'windowType', val)}
                          isEditMode={isEditMode}
                          label="창호 구조 수정"
                        />
                      </div>
                    </div>

                    {/* Key Cleaning Point */}
                    <div className="space-y-1.5 mb-4">
                      <div className="text-[11px] font-extrabold text-blue-600 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>핵심 시공 포인트</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed bg-blue-50/40 p-2.5 rounded-xl border border-blue-100/60">
                        <EditableText
                          value={apt.keyCleaningPoint}
                          onSave={(val) => handleUpdateApartment(apt.id, 'keyCleaningPoint', val)}
                          isEditMode={isEditMode}
                          label="핵심 시공 포인트 수정"
                        />
                      </p>
                    </div>
                  </div>

                  {/* Card Footer: Recommended Service & CTA */}
                  <div className="pt-3 border-t border-slate-100 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-400">추천 서비스</span>
                      <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md text-[11px]">
                        {apt.recommendedService}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleInquireComplex(apt.name)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-sm transition-all group-hover:shadow-md"
                      >
                        <span>이 단지 견적 문의</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      {isEditMode && onUpdateApartments && (
                        <button
                          onClick={() => handleDeleteApartment(apt.id)}
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                          title="단지 삭제"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SECTION 2: Region-Specific Technical Work Know-How */}
      {(activeTab === 'both' || activeTab === 'knowhow') && (
        <div className="space-y-6 pt-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>클리어웍스 현장 엔지니어링 표준</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              [{regionName}] 지역 특화 시공 노하우 & 기술 사양
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              일반 청소업체와 차별화되는 고소 외창 안전 공법과 과학적 나노 케미컬 기술을 공개합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {knowHows.map((kh, idx) => (
              <div
                key={kh.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all space-y-5"
              >
                {/* Header: Category and Number */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      0{idx + 1}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-extrabold text-xs">
                      {kh.category}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-400">
                    {company.name} 특화 공법
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h4 className="text-lg font-black text-slate-900 tracking-tight mb-1">
                    <EditableText
                      value={kh.title}
                      onSave={(val) => handleUpdateKnowHow(kh.id, 'title', val)}
                      isEditMode={isEditMode}
                      label="노하우 제목 수정"
                    />
                  </h4>
                  <p className="text-xs font-semibold text-blue-600">
                    <EditableText
                      value={kh.subtitle}
                      onSave={(val) => handleUpdateKnowHow(kh.id, 'subtitle', val)}
                      isEditMode={isEditMode}
                      label="부제목 수정"
                    />
                  </p>
                </div>

                {/* Problem vs Solution Comparison Box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* Problem */}
                  <div className="p-3.5 bg-rose-50/70 rounded-2xl border border-rose-100">
                    <div className="flex items-center gap-1.5 text-rose-800 font-extrabold mb-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                      <span>기존 시공의 문제점</span>
                    </div>
                    <p className="text-rose-900/80 leading-relaxed text-[11px]">
                      <EditableText
                        value={kh.problem}
                        onSave={(val) => handleUpdateKnowHow(kh.id, 'problem', val)}
                        isEditMode={isEditMode}
                        label="문제점 수정"
                      />
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-100">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-extrabold mb-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>클리어웍스 해결 솔루션</span>
                    </div>
                    <p className="text-emerald-900/80 leading-relaxed text-[11px]">
                      <EditableText
                        value={kh.solution}
                        onSave={(val) => handleUpdateKnowHow(kh.id, 'solution', val)}
                        isEditMode={isEditMode}
                        label="솔루션 수정"
                      />
                    </p>
                  </div>
                </div>

                {/* Equipment & Customer Benefit */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <Wrench className="w-3.5 h-3.5 text-slate-500 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-slate-800">투입 장비 및 약품: </strong>
                      <span className="text-slate-600">
                        <EditableText
                          value={kh.equipment}
                          onSave={(val) => handleUpdateKnowHow(kh.id, 'equipment', val)}
                          isEditMode={isEditMode}
                          label="투입 장비 수정"
                        />
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-slate-800">고객 체감 가치: </strong>
                      <span className="text-slate-600">
                        <EditableText
                          value={kh.benefit}
                          onSave={(val) => handleUpdateKnowHow(kh.id, 'benefit', val)}
                          isEditMode={isEditMode}
                          label="고객 가치 수정"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: Resident FAQ & Direct Quote Callout */}
      <div className="bg-gradient-to-tr from-blue-50 via-white to-indigo-50/50 rounded-3xl p-6 sm:p-8 border border-blue-200/80 shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-600 text-white text-[11px] font-bold">
              <Sparkles className="w-3 h-3" />
              <span>[{regionName}] 주민 특별 혜택</span>
            </div>
            <h4 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              거주하시는 아파트 창문 견적이 궁금하신가요?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              단지명과 평형만 알려주시면 10분 내로 예상 시공 시간과 정찰제 할인 견적을 문자로 안내해 드립니다.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={`tel:${company.phone}`}
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>전화 견적 ({company.phone})</span>
            </a>
            <button
              onClick={() => {
                const el = document.getElementById('region-quote') || document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-colors"
            >
              온라인 무료 신청
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
