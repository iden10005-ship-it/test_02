import React, { useState } from 'react';
import {
  X,
  Settings,
  Sparkles,
  Layers,
  HelpCircle,
  MapPin,
  DollarSign,
  Star,
  Image as ImageIcon,
  Check,
  Plus,
  Trash2,
  Phone,
  Building,
} from 'lucide-react';
import { SiteData, ServiceItem, PriceRow, ReviewItem, FaqItem, CaseItem } from '../../types/siteData';
import { PRESET_IMAGES } from '../../data/defaultSiteData';

interface EditorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  siteData: SiteData;
  onUpdateSiteData: (updater: (prev: SiteData) => SiteData) => void;
}

export const EditorDrawer: React.FC<EditorDrawerProps> = ({
  isOpen,
  onClose,
  siteData,
  onUpdateSiteData,
}) => {
  const [activeTab, setActiveTab] = useState<
    'basic' | 'hero' | 'services' | 'process' | 'cases' | 'pricing' | 'reviews' | 'faq' | 'regions'
  >('basic');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Settings className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">홈페이지 전체 상세 편집</h3>
              <p className="text-xs text-slate-400">모든 섹션의 텍스트와 사진을 원하는 대로 수정할 수 있습니다.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-slate-200 bg-slate-50 px-2 py-2 gap-1 text-xs font-bold scrollbar-none">
          {[
            { id: 'basic', label: '기본 정보', icon: Building },
            { id: 'hero', label: '히어로/통계', icon: Sparkles },
            { id: 'services', label: '서비스', icon: Layers },
            { id: 'cases', label: '시공사례', icon: ImageIcon },
            { id: 'pricing', label: '가격표', icon: DollarSign },
            { id: 'reviews', label: '후기', icon: Star },
            { id: 'faq', label: 'FAQ', icon: HelpCircle },
            { id: 'regions', label: '서비스지역', icon: MapPin },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: BASIC INFO */}
          {activeTab === 'basic' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900 border-b pb-2">업체 기본 정보</h4>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">상호명</label>
                  <input
                    type="text"
                    value={siteData.company.name}
                    onChange={(e) =>
                      onUpdateSiteData((prev) => ({
                        ...prev,
                        company: { ...prev.company, name: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">활동 지역 ([지역])</label>
                  <input
                    type="text"
                    value={siteData.company.region}
                    onChange={(e) =>
                      onUpdateSiteData((prev) => ({
                        ...prev,
                        company: { ...prev.company, region: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">대표 전화번호</label>
                  <input
                    type="text"
                    value={siteData.company.phone}
                    onChange={(e) =>
                      onUpdateSiteData((prev) => ({
                        ...prev,
                        company: { ...prev.company, phone: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">카카오톡 상담 링크</label>
                  <input
                    type="text"
                    value={siteData.company.kakaoLink}
                    onChange={(e) =>
                      onUpdateSiteData((prev) => ({
                        ...prev,
                        company: { ...prev.company, kakaoLink: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">대표자 성명</label>
                  <input
                    type="text"
                    value={siteData.company.representative}
                    onChange={(e) =>
                      onUpdateSiteData((prev) => ({
                        ...prev,
                        company: { ...prev.company, representative: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">사업자등록번호</label>
                  <input
                    type="text"
                    value={siteData.company.bizNumber}
                    onChange={(e) =>
                      onUpdateSiteData((prev) => ({
                        ...prev,
                        company: { ...prev.company, bizNumber: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">사업장 주소</label>
                <input
                  type="text"
                  value={siteData.company.address}
                  onChange={(e) =>
                    onUpdateSiteData((prev) => ({
                      ...prev,
                      company: { ...prev.company, address: e.target.value },
                    }))
                  }
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">운영시간</label>
                  <input
                    type="text"
                    value={siteData.company.operatingHours}
                    onChange={(e) =>
                      onUpdateSiteData((prev) => ({
                        ...prev,
                        company: { ...prev.company, operatingHours: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">A/S 보장 기간(일)</label>
                  <input
                    type="text"
                    value={siteData.company.asPeriod}
                    onChange={(e) =>
                      onUpdateSiteData((prev) => ({
                        ...prev,
                        company: { ...prev.company, asPeriod: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HERO & STATS */}
          {activeTab === 'hero' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900 border-b pb-2">히어로 메인 문구 및 전후 비교</h4>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">상단 뱃지 문구</label>
                <input
                  type="text"
                  value={siteData.hero.badgeText}
                  onChange={(e) =>
                    onUpdateSiteData((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, badgeText: e.target.value },
                    }))
                  }
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">메인 헤드라인 제목</label>
                <input
                  type="text"
                  value={siteData.hero.title}
                  onChange={(e) =>
                    onUpdateSiteData((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, title: e.target.value },
                    }))
                  }
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">서브 카피 설명</label>
                <textarea
                  rows={2}
                  value={siteData.hero.subtitle}
                  onChange={(e) =>
                    onUpdateSiteData((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, subtitle: e.target.value },
                    }))
                  }
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">전화 버튼 텍스트</label>
                  <input
                    type="text"
                    value={siteData.hero.callButtonText}
                    onChange={(e) =>
                      onUpdateSiteData((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, callButtonText: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">카톡 버튼 텍스트</label>
                  <input
                    type="text"
                    value={siteData.hero.kakaoButtonText}
                    onChange={(e) =>
                      onUpdateSiteData((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, kakaoButtonText: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <h4 className="text-sm font-bold text-slate-900 border-b pb-2 pt-4">전후 비교 슬라이더 사진 URL</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">청소 전 사진 URL</label>
                  <input
                    type="text"
                    value={siteData.hero.beforeImage}
                    onChange={(e) =>
                      onUpdateSiteData((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, beforeImage: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">청소 후 사진 URL</label>
                  <input
                    type="text"
                    value={siteData.hero.afterImage}
                    onChange={(e) =>
                      onUpdateSiteData((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, afterImage: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <h4 className="text-sm font-bold text-slate-900 border-b pb-2 pt-4">통계 수치 4종</h4>
              <div className="grid grid-cols-2 gap-3">
                {siteData.hero.stats.map((stat, idx) => (
                  <div key={stat.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold text-blue-600 block mb-1">통계 #{idx + 1}</span>
                    <input
                      type="text"
                      value={stat.value}
                      placeholder="수치 (예: 3,500건)"
                      onChange={(e) =>
                        onUpdateSiteData((prev) => ({
                          ...prev,
                          hero: {
                            ...prev.hero,
                            stats: prev.hero.stats.map((s) =>
                              s.id === stat.id ? { ...s, value: e.target.value } : s
                            ),
                          },
                        }))
                      }
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded mb-1.5 font-bold"
                    />
                    <input
                      type="text"
                      value={stat.label}
                      placeholder="라벨 (예: 누적 시공)"
                      onChange={(e) =>
                        onUpdateSiteData((prev) => ({
                          ...prev,
                          hero: {
                            ...prev.hero,
                            stats: prev.hero.stats.map((s) =>
                              s.id === stat.id ? { ...s, label: e.target.value } : s
                            ),
                          },
                        }))
                      }
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded text-slate-600"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SERVICES */}
          {activeTab === 'services' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h4 className="text-sm font-bold text-slate-900">제공 서비스 관리</h4>
                <button
                  type="button"
                  onClick={() =>
                    onUpdateSiteData((prev) => ({
                      ...prev,
                      services: {
                        ...prev.services,
                        items: [
                          ...prev.services.items,
                          {
                            id: `srv-${Date.now()}`,
                            title: '신규 청소 서비스',
                            description: '상세 서비스 설명 내용을 작성하세요.',
                            iconName: 'Sparkles',
                            badge: 'NEW',
                          },
                        ],
                      },
                    }))
                  }
                  className="px-2.5 py-1 text-xs bg-blue-600 text-white rounded-lg font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  서비스 추가
                </button>
              </div>

              <div className="space-y-3">
                {siteData.services.items.map((srv, idx) => (
                  <div key={srv.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500">서비스 #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateSiteData((prev) => ({
                            ...prev,
                            services: {
                              ...prev.services,
                              items: prev.services.items.filter((s) => s.id !== srv.id),
                            },
                          }))
                        }
                        className="text-red-500 hover:text-red-700 text-xs flex items-center gap-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        삭제
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-2">
                        <input
                          type="text"
                          value={srv.title}
                          onChange={(e) =>
                            onUpdateSiteData((prev) => ({
                              ...prev,
                              services: {
                                ...prev.services,
                                items: prev.services.items.map((s) =>
                                  s.id === srv.id ? { ...s, title: e.target.value } : s
                                ),
                              },
                            }))
                          }
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded font-bold"
                          placeholder="서비스 제목"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={srv.badge || ''}
                          onChange={(e) =>
                            onUpdateSiteData((prev) => ({
                              ...prev,
                              services: {
                                ...prev.services,
                                items: prev.services.items.map((s) =>
                                  s.id === srv.id ? { ...s, badge: e.target.value } : s
                                ),
                              },
                            }))
                          }
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded"
                          placeholder="뱃지 (선택)"
                        />
                      </div>
                    </div>

                    <textarea
                      rows={2}
                      value={srv.description}
                      onChange={(e) =>
                        onUpdateSiteData((prev) => ({
                          ...prev,
                          services: {
                            ...prev.services,
                            items: prev.services.items.map((s) =>
                              s.id === srv.id ? { ...s, description: e.target.value } : s
                            ),
                          },
                        }))
                      }
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded"
                      placeholder="서비스 상세 설명"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CASES */}
          {activeTab === 'cases' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h4 className="text-sm font-bold text-slate-900">시공사례 관리</h4>
                <button
                  type="button"
                  onClick={() =>
                    onUpdateSiteData((prev) => ({
                      ...prev,
                      cases: {
                        ...prev.cases,
                        items: [
                          ...prev.cases.items,
                          {
                            id: `case-${Date.now()}`,
                            title: '신규 시공 프로젝트',
                            specs: '30평형 · 외창 물때 케어',
                            category: '아파트',
                            beforeImage: PRESET_IMAGES.aptBefore,
                            afterImage: PRESET_IMAGES.aptAfter,
                            description: '시공 상세 설명 내용을 작성하세요.',
                          },
                        ],
                      },
                    }))
                  }
                  className="px-2.5 py-1 text-xs bg-blue-600 text-white rounded-lg font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  사례 추가
                </button>
              </div>

              <div className="space-y-4">
                {siteData.cases.items.map((item, idx) => (
                  <div key={item.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">사례 #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateSiteData((prev) => ({
                            ...prev,
                            cases: {
                              ...prev.cases,
                              items: prev.cases.items.filter((c) => c.id !== item.id),
                            },
                          }))
                        }
                        className="text-red-500 hover:text-red-700 text-xs flex items-center gap-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        삭제
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) =>
                          onUpdateSiteData((prev) => ({
                            ...prev,
                            cases: {
                              ...prev.cases,
                              items: prev.cases.items.map((c) =>
                                c.id === item.id ? { ...c, title: e.target.value } : c
                              ),
                            },
                          }))
                        }
                        className="px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded font-bold"
                        placeholder="사례 제목"
                      />
                      <input
                        type="text"
                        value={item.specs}
                        onChange={(e) =>
                          onUpdateSiteData((prev) => ({
                            ...prev,
                            cases: {
                              ...prev.cases,
                              items: prev.cases.items.map((c) =>
                                c.id === item.id ? { ...c, specs: e.target.value } : c
                              ),
                            },
                          }))
                        }
                        className="px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded"
                        placeholder="평수 및 작업 내용"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-0.5">청소 전 사진 URL</label>
                        <input
                          type="text"
                          value={item.beforeImage}
                          onChange={(e) =>
                            onUpdateSiteData((prev) => ({
                              ...prev,
                              cases: {
                                ...prev.cases,
                                items: prev.cases.items.map((c) =>
                                  c.id === item.id ? { ...c, beforeImage: e.target.value } : c
                                ),
                              },
                            }))
                          }
                          className="w-full px-2 py-1 text-[11px] bg-white border border-slate-200 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-0.5">청소 후 사진 URL</label>
                        <input
                          type="text"
                          value={item.afterImage}
                          onChange={(e) =>
                            onUpdateSiteData((prev) => ({
                              ...prev,
                              cases: {
                                ...prev.cases,
                                items: prev.cases.items.map((c) =>
                                  c.id === item.id ? { ...c, afterImage: e.target.value } : c
                                ),
                              },
                            }))
                          }
                          className="w-full px-2 py-1 text-[11px] bg-white border border-slate-200 rounded"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PRICING */}
          {activeTab === 'pricing' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h4 className="text-sm font-bold text-slate-900">가격표 행 관리</h4>
                <button
                  type="button"
                  onClick={() =>
                    onUpdateSiteData((prev) => ({
                      ...prev,
                      pricing: {
                        ...prev.pricing,
                        rows: [
                          ...prev.pricing.rows,
                          {
                            id: `price-${Date.now()}`,
                            category: '신규 항목',
                            standard: '면적/평수 기준',
                            price: '00,000원~',
                          },
                        ],
                      },
                    }))
                  }
                  className="px-2.5 py-1 text-xs bg-blue-600 text-white rounded-lg font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  행 추가
                </button>
              </div>

              <div className="space-y-3">
                {siteData.pricing.rows.map((row) => (
                  <div key={row.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2">
                    <input
                      type="text"
                      value={row.category}
                      onChange={(e) =>
                        onUpdateSiteData((prev) => ({
                          ...prev,
                          pricing: {
                            ...prev.pricing,
                            rows: prev.pricing.rows.map((r) =>
                              r.id === row.id ? { ...r, category: e.target.value } : r
                            ),
                          },
                        }))
                      }
                      placeholder="구분"
                      className="w-1/3 px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded font-bold"
                    />
                    <input
                      type="text"
                      value={row.standard}
                      onChange={(e) =>
                        onUpdateSiteData((prev) => ({
                          ...prev,
                          pricing: {
                            ...prev.pricing,
                            rows: prev.pricing.rows.map((r) =>
                              r.id === row.id ? { ...r, standard: e.target.value } : r
                            ),
                          },
                        }))
                      }
                      placeholder="기준"
                      className="w-1/3 px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded"
                    />
                    <input
                      type="text"
                      value={row.price}
                      onChange={(e) =>
                        onUpdateSiteData((prev) => ({
                          ...prev,
                          pricing: {
                            ...prev.pricing,
                            rows: prev.pricing.rows.map((r) =>
                              r.id === row.id ? { ...r, price: e.target.value } : r
                            ),
                          },
                        }))
                      }
                      placeholder="가격"
                      className="w-1/3 px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded font-bold text-blue-600"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        onUpdateSiteData((prev) => ({
                          ...prev,
                          pricing: {
                            ...prev.pricing,
                            rows: prev.pricing.rows.filter((r) => r.id !== row.id),
                          },
                        }))
                      }
                      className="p-1.5 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h4 className="text-sm font-bold text-slate-900">고객 후기 관리</h4>
                <button
                  type="button"
                  onClick={() =>
                    onUpdateSiteData((prev) => ({
                      ...prev,
                      reviews: {
                        ...prev.reviews,
                        items: [
                          ...prev.reviews.items,
                          {
                            id: `rev-${Date.now()}`,
                            content: '만족스러운 청소 후기를 남겨주셨습니다.',
                            author: '새 고객님',
                            rating: 5,
                            tag: '외창 케어',
                          },
                        ],
                      },
                    }))
                  }
                  className="px-2.5 py-1 text-xs bg-blue-600 text-white rounded-lg font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  후기 추가
                </button>
              </div>

              <div className="space-y-3">
                {siteData.reviews.items.map((rev) => (
                  <div key={rev.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={rev.author}
                        onChange={(e) =>
                          onUpdateSiteData((prev) => ({
                            ...prev,
                            reviews: {
                              ...prev.reviews,
                              items: prev.reviews.items.map((r) =>
                                r.id === rev.id ? { ...r, author: e.target.value } : r
                              ),
                            },
                          }))
                        }
                        className="px-2 py-1 text-xs bg-white border border-slate-200 rounded font-bold w-1/2"
                        placeholder="작성자/지역"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateSiteData((prev) => ({
                            ...prev,
                            reviews: {
                              ...prev.reviews,
                              items: prev.reviews.items.filter((r) => r.id !== rev.id),
                            },
                          }))
                        }
                        className="text-red-500 hover:text-red-700 text-xs flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        삭제
                      </button>
                    </div>
                    <textarea
                      rows={2}
                      value={rev.content}
                      onChange={(e) =>
                        onUpdateSiteData((prev) => ({
                          ...prev,
                          reviews: {
                            ...prev.reviews,
                            items: prev.reviews.items.map((r) =>
                              r.id === rev.id ? { ...r, content: e.target.value } : r
                            ),
                          },
                        }))
                      }
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded"
                      placeholder="후기 본문"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: FAQ */}
          {activeTab === 'faq' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h4 className="text-sm font-bold text-slate-900">자주 묻는 질문 FAQ 관리</h4>
                <button
                  type="button"
                  onClick={() =>
                    onUpdateSiteData((prev) => ({
                      ...prev,
                      faq: {
                        ...prev.faq,
                        items: [
                          ...prev.faq.items,
                          {
                            id: `faq-${Date.now()}`,
                            question: '새 질문을 입력하세요',
                            answer: '친절하고 상세한 답변을 입력하세요.',
                          },
                        ],
                      },
                    }))
                  }
                  className="px-2.5 py-1 text-xs bg-blue-600 text-white rounded-lg font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  질문 추가
                </button>
              </div>

              <div className="space-y-3">
                {siteData.faq.items.map((faq, idx) => (
                  <div key={faq.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-600">Q{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateSiteData((prev) => ({
                            ...prev,
                            faq: {
                              ...prev.faq,
                              items: prev.faq.items.filter((f) => f.id !== faq.id),
                            },
                          }))
                        }
                        className="text-red-500 hover:text-red-700 text-xs flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        삭제
                      </button>
                    </div>
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) =>
                        onUpdateSiteData((prev) => ({
                          ...prev,
                          faq: {
                            ...prev.faq,
                            items: prev.faq.items.map((f) =>
                              f.id === faq.id ? { ...f, question: e.target.value } : f
                            ),
                          },
                        }))
                      }
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded font-bold"
                      placeholder="질문"
                    />
                    <textarea
                      rows={2}
                      value={faq.answer}
                      onChange={(e) =>
                        onUpdateSiteData((prev) => ({
                          ...prev,
                          faq: {
                            ...prev.faq,
                            items: prev.faq.items.map((f) =>
                              f.id === faq.id ? { ...f, answer: e.target.value } : f
                            ),
                          },
                        }))
                      }
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded"
                      placeholder="답변"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: REGIONS */}
          {activeTab === 'regions' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900 border-b pb-2">서비스 가능 지역 태그</h4>
              <p className="text-xs text-slate-500">
                고객이 출장 가능 여부를 쉽게 알아볼 수 있도록 활동하는 시, 구, 동 명칭을 추가하세요.
              </p>

              <div className="flex flex-wrap gap-2">
                {siteData.regions.list.map((region, idx) => (
                  <span
                    key={`${region}-${idx}`}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs font-semibold text-blue-800"
                  >
                    {region}
                    <button
                      type="button"
                      onClick={() =>
                        onUpdateSiteData((prev) => ({
                          ...prev,
                          regions: {
                            ...prev.regions,
                            list: prev.regions.list.filter((_, i) => i !== idx),
                          },
                        }))
                      }
                      className="text-blue-400 hover:text-red-500 ml-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs"
          >
            편집 완료 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
