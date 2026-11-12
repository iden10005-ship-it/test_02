import React from 'react';
import { PhoneCall, FileSearch, Sparkles, CheckCircle2 } from 'lucide-react';
import { ProcessStep } from '../types/siteData';
import { EditableText } from './common/EditableText';

interface ProcessSectionProps {
  sectionTitle: string;
  sectionSubtitle: string;
  steps: ProcessStep[];
  isEditMode: boolean;
  onUpdateTitle: (title: string) => void;
  onUpdateSubtitle: (subtitle: string) => void;
  onUpdateStep: (stepNumber: number, field: keyof ProcessStep, value: string) => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({
  sectionTitle,
  sectionSubtitle,
  steps,
  isEditMode,
  onUpdateTitle,
  onUpdateSubtitle,
  onUpdateStep,
}) => {
  const stepIcons = [
    <PhoneCall key="1" className="w-6 h-6 text-blue-600" />,
    <FileSearch key="2" className="w-6 h-6 text-indigo-600" />,
    <Sparkles key="3" className="w-6 h-6 text-cyan-600" />,
    <CheckCircle2 key="4" className="w-6 h-6 text-emerald-600" />,
  ];

  return (
    <section id="process" className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-600 tracking-wider uppercase mb-2 block">
            Work Process
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            <EditableText
              value={sectionTitle}
              onSave={onUpdateTitle}
              isEditMode={isEditMode}
              label="작업과정 제목 수정"
              tag="span"
            />
          </h2>
          <p className="text-base text-slate-600">
            <EditableText
              value={sectionSubtitle}
              onSave={onUpdateSubtitle}
              isEditMode={isEditMode}
              label="작업과정 부제목 수정"
              tag="span"
            />
          </p>
        </div>

        {/* Steps Grid with connected timeline line on desktop */}
        <div className="relative">
          {/* Timeline Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-0.5 bg-gradient-to-r from-blue-300 via-indigo-300 to-emerald-300 -translate-y-12 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((stepItem, idx) => (
              <div
                key={stepItem.step}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Step Number Badge & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-xs">
                      {stepIcons[idx % stepIcons.length]}
                    </div>
                    <span className="text-2xl font-black text-slate-200">
                      0{stepItem.step}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 mb-2.5">
                    <EditableText
                      value={stepItem.title}
                      onSave={(val) => onUpdateStep(stepItem.step, 'title', val)}
                      isEditMode={isEditMode}
                      label={`단계 ${stepItem.step} 제목 수정`}
                    />
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed">
                    <EditableText
                      value={stepItem.description}
                      onSave={(val) => onUpdateStep(stepItem.step, 'description', val)}
                      isEditMode={isEditMode}
                      label={`단계 ${stepItem.step} 설명 수정`}
                      multiline
                    />
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    STEP {stepItem.step}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
