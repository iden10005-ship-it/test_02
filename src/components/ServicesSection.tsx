import React from 'react';
import { Home, Store, Building2, Sparkles, Layers, ShieldCheck, Plus, Trash2 } from 'lucide-react';
import { ServiceItem } from '../types/siteData';
import { EditableText } from './common/EditableText';

interface ServicesSectionProps {
  sectionTitle: string;
  sectionSubtitle: string;
  services: ServiceItem[];
  isEditMode: boolean;
  onUpdateTitle: (title: string) => void;
  onUpdateSubtitle: (subtitle: string) => void;
  onUpdateService: (id: string, field: keyof ServiceItem, value: string) => void;
  onAddService?: () => void;
  onDeleteService?: (id: string) => void;
  onViewDetail?: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  sectionTitle,
  sectionSubtitle,
  services,
  isEditMode,
  onUpdateTitle,
  onUpdateSubtitle,
  onUpdateService,
  onAddService,
  onDeleteService,
  onViewDetail,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home':
        return <Home className="w-6 h-6 text-blue-600" />;
      case 'Store':
        return <Store className="w-6 h-6 text-blue-600" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-blue-600" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-blue-600" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-blue-600" />;
      case 'ShieldCheck':
      default:
        return <ShieldCheck className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <section id="service" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-600 tracking-wider uppercase mb-2 block">
            Our Services
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            <EditableText
              value={sectionTitle}
              onSave={onUpdateTitle}
              isEditMode={isEditMode}
              label="서비스 섹션 제목 수정"
              tag="span"
            />
          </h2>
          <p className="text-base text-slate-600">
            <EditableText
              value={sectionSubtitle}
              onSave={onUpdateSubtitle}
              isEditMode={isEditMode}
              label="서비스 섹션 부제목 수정"
              tag="span"
            />
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative bg-slate-50/80 hover:bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Icon & Badge Row */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100/70 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors shadow-xs">
                    <div className="group-hover:text-white transition-colors">
                      {getIcon(service.iconName)}
                    </div>
                  </div>

                  {service.badge && (
                    <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-blue-100/80 text-blue-700">
                      <EditableText
                        value={service.badge}
                        onSave={(val) => onUpdateService(service.id, 'badge', val)}
                        isEditMode={isEditMode}
                        label="서비스 뱃지 수정"
                      />
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5 group-hover:text-blue-600 transition-colors">
                  <EditableText
                    value={service.title}
                    onSave={(val) => onUpdateService(service.id, 'title', val)}
                    isEditMode={isEditMode}
                    label="서비스 제목 수정"
                  />
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed">
                  <EditableText
                    value={service.description}
                    onSave={(val) => onUpdateService(service.id, 'description', val)}
                    isEditMode={isEditMode}
                    label="서비스 설명 수정"
                    multiline
                  />
                </p>
              </div>

              {/* View Detail Link Button */}
              <div className="mt-5 pt-4 border-t border-slate-200/50 flex items-center justify-between">
                {onViewDetail && (
                  <button
                    type="button"
                    onClick={() => onViewDetail(service.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors group/btn"
                  >
                    <span>상세보기 및 작업범위</span>
                    <span className="group-hover/btn:translate-x-0.5 transition-transform">→</span>
                  </button>
                )}

                {/* Delete button in Edit mode */}
                {isEditMode && onDeleteService && services.length > 1 && (
                  <button
                    onClick={() => onDeleteService(service.id)}
                    className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 font-medium transition-colors ml-auto"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    항목 삭제
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Add Service Card in Edit Mode */}
          {isEditMode && onAddService && (
            <button
              onClick={onAddService}
              className="rounded-2xl border-2 border-dashed border-blue-300 hover:border-blue-500 bg-blue-50/30 hover:bg-blue-50/60 p-6 flex flex-col items-center justify-center text-blue-600 gap-2 min-h-[220px] transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus className="w-6 h-6" />
              </div>
              <span className="font-bold text-sm">새 서비스 항목 추가하기</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
