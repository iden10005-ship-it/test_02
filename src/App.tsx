/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { initialTemplateData } from './data/defaultSiteData';
import {
  SiteData,
  CompanyInfo,
  HeroData,
  ServiceItem,
  PriceRow,
  ReviewItem,
  FaqItem,
  CaseItem,
  InquiryItem,
  ThemeColor,
  PageView,
  RegionDetailItem,
  GalleryPost,
} from './types/siteData';

// Layout & Section Components
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { CasesSection } from './components/CasesSection';
import { GallerySection } from './components/GallerySection';
import { PricingSection } from './components/PricingSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { RegionsSection } from './components/RegionsSection';
import { ContactFormSection } from './components/ContactFormSection';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';

// Detail Pages
import { ServiceDetailPage } from './components/pages/ServiceDetailPage';
import { RegionDetailPage } from './components/pages/RegionDetailPage';
import { RegionServiceMatrixPage } from './components/pages/RegionServiceMatrixPage';
import { GalleryListPage } from './components/pages/GalleryListPage';
import { GalleryDetailPage } from './components/pages/GalleryDetailPage';

// Editor Suite
import { EditorHeaderBar } from './components/editor/EditorHeaderBar';
import { QuickBatchFillModal } from './components/editor/QuickBatchFillModal';
import { EditorDrawer } from './components/editor/EditorDrawer';
import { InquiriesModal } from './components/editor/InquiriesModal';
import { ImagePickerModal } from './components/editor/ImagePickerModal';
import { SeoMasterModal } from './components/seo/SeoMasterModal';

const STORAGE_KEY = 'clearworks_site_data_v8';

export default function App() {
  // Load data from localStorage or initial template
  const [siteData, setSiteData] = useState<SiteData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Sync regions list, cases items, and gallery posts with latest initialTemplateData
        if (parsed.regions) {
          parsed.regions.list = initialTemplateData.regions.list;
        }
        if (!parsed.cases || !parsed.cases.items || parsed.cases.items.length < 6) {
          parsed.cases = initialTemplateData.cases;
        }
        if (!parsed.gallery || !parsed.gallery.posts || parsed.gallery.posts.length < 6) {
          parsed.gallery = initialTemplateData.gallery;
        }
        return parsed;
      }
    } catch (e) {
      console.error('Failed to load saved site data', e);
    }
    return initialTemplateData;
  });

  // Navigation state: Default to home page
  const [currentPage, setCurrentPage] = useState<PageView>({ type: 'home' });

  // Editor states: Default to true as user requested to open for editing!
  const [isEditMode, setIsEditMode] = useState<boolean>(true);
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Modals
  const [isBatchFillOpen, setIsBatchFillOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isInquiriesOpen, setIsInquiriesOpen] = useState(false);
  const [isSeoMasterOpen, setIsSeoMasterOpen] = useState(false);
  const [imagePickerTarget, setImagePickerTarget] = useState<'hero' | { caseId: string } | null>(null);

  // Save to localStorage whenever siteData changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(siteData));
    } catch (e) {
      console.error('Failed to persist site data', e);
    }
  }, [siteData]);

  // Dynamic SEO metadata & JSON-LD updates on page change
  useEffect(() => {
    let title = `${siteData.hero.title} | ${siteData.company.name}`;
    let description = `${siteData.hero.subtitle} 전화상담: ${siteData.company.phone}`;

    if (currentPage.type === 'service') {
      const srv = siteData.services.items.find((s) => s.id === currentPage.serviceId);
      if (srv) {
        title = `[${siteData.company.region}] ${srv.title} 전문 클리닝 | ${siteData.company.name}`;
        description = `${srv.description} ${srv.detail?.tagline || ''} 무료견적: ${siteData.company.phone}`;
      }
    } else if (currentPage.type === 'region') {
      title = `[${currentPage.regionName}] 유리창청소 전문 | ${siteData.company.name}`;
      description = `${currentPage.regionName} 전지역 아파트 외창 및 상가 통유리 클리닝. 배상책임보험 가입, 당일 방문 실측.`;
    } else if (currentPage.type === 'matrix') {
      const srv = siteData.services.items.find((s) => s.id === currentPage.serviceId);
      const sTitle = srv ? srv.title : '유리창 청소';
      title = `[${currentPage.regionName}] ${sTitle} 전문 | ${siteData.company.name}`;
      description = `${currentPage.regionName} ${sTitle} 시공 사례, 작업 범위 및 가격 가이드. ${siteData.company.phone}`;
    }

    document.title = title;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }

    // Dynamic JSON-LD update
    let scriptTag = document.getElementById('jsonld-seo') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'jsonld-seo';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const jsonLdContent = {
      '@context': 'https://schema.org',
      '@type': 'HomeAndConstructionBusiness',
      name: siteData.company.name,
      description,
      telephone: siteData.company.phone,
      areaServed: siteData.regions.list,
    };
    scriptTag.text = JSON.stringify(jsonLdContent);
  }, [currentPage, siteData]);

  // Company info update
  const handleUpdateCompany = (field: keyof CompanyInfo, value: string) => {
    setSiteData((prev) => ({
      ...prev,
      company: { ...prev.company, [field]: value },
    }));
  };

  // Hero section update
  const handleUpdateHero = (field: keyof HeroData, value: any) => {
    setSiteData((prev) => ({
      ...prev,
      hero: { ...prev.hero, [field]: value },
    }));
  };

  const handleUpdateStat = (statId: string, field: 'value' | 'label', value: string) => {
    setSiteData((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        stats: prev.hero.stats.map((s) => (s.id === statId ? { ...s, [field]: value } : s)),
      },
    }));
  };

  // Services update
  const handleUpdateService = (id: string, field: keyof ServiceItem, value: any) => {
    setSiteData((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        items: prev.services.items.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
      },
    }));
  };

  const handleAddService = () => {
    const newService: ServiceItem = {
      id: `srv-${Date.now()}`,
      title: '새 청소 서비스',
      description: '작업 내용과 차별화 포인트를 입력하세요.',
      iconName: 'Sparkles',
      badge: 'NEW',
    };
    setSiteData((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        items: [...prev.services.items, newService],
      },
    }));
  };

  const handleDeleteService = (id: string) => {
    setSiteData((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        items: prev.services.items.filter((s) => s.id !== id),
      },
    }));
  };

  // Process update
  const handleUpdateStep = (stepNumber: number, field: string, value: string) => {
    setSiteData((prev) => ({
      ...prev,
      process: {
        ...prev.process,
        steps: prev.process.steps.map((st) =>
          st.step === stepNumber ? { ...st, [field]: value } : st
        ),
      },
    }));
  };

  // Cases update
  const handleUpdateCase = (id: string, field: keyof CaseItem, value: string) => {
    setSiteData((prev) => ({
      ...prev,
      cases: {
        ...prev.cases,
        items: prev.cases.items.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
      },
    }));
  };

  const handleAddCase = (category: string = '아파트') => {
    const newCase: CaseItem = {
      id: `case-${Date.now()}`,
      title: `${siteData.company.region} 신규 시공 프로젝트`,
      specs: '34평형 · 외창 물때 케어',
      category: category,
      beforeImage: siteData.hero.beforeImage,
      afterImage: siteData.hero.afterImage,
      description: '물때와 분진을 특수 약품 및 스퀴지로 완벽 제거',
    };
    setSiteData((prev) => ({
      ...prev,
      cases: {
        ...prev.cases,
        items: [...prev.cases.items, newCase],
      },
    }));
  };

  const handleDeleteCase = (id: string) => {
    setSiteData((prev) => ({
      ...prev,
      cases: {
        ...prev.cases,
        items: prev.cases.items.filter((c) => c.id !== id),
      },
    }));
  };

  // Gallery Blog updates
  const handleAddGalleryPost = (newPost: GalleryPost) => {
    setSiteData((prev) => ({
      ...prev,
      gallery: {
        ...prev.gallery,
        posts: [newPost, ...(prev.gallery?.posts || [])],
      },
    }));
  };

  const handleUpdateGalleryPost = (updatedPost: GalleryPost) => {
    setSiteData((prev) => ({
      ...prev,
      gallery: {
        ...prev.gallery,
        posts: (prev.gallery?.posts || []).map((p) => (p.id === updatedPost.id ? updatedPost : p)),
      },
    }));
  };

  const handleDeleteGalleryPost = (postId: string) => {
    setSiteData((prev) => ({
      ...prev,
      gallery: {
        ...prev.gallery,
        posts: (prev.gallery?.posts || []).filter((p) => p.id !== postId),
      },
    }));
  };

  // Pricing update
  const handleUpdatePriceRow = (id: string, field: keyof PriceRow, value: any) => {
    setSiteData((prev) => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        rows: prev.pricing.rows.map((r) => (r.id === id ? { ...r, [field]: value } : r)),
      },
    }));
  };

  const handleAddPriceRow = () => {
    const newRow: PriceRow = {
      id: `price-${Date.now()}`,
      category: '신규 청소 항목',
      standard: '면적/평수 기준',
      price: '00,000원~',
    };
    setSiteData((prev) => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        rows: [...prev.pricing.rows, newRow],
      },
    }));
  };

  const handleDeletePriceRow = (id: string) => {
    setSiteData((prev) => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        rows: prev.pricing.rows.filter((r) => r.id !== id),
      },
    }));
  };

  // Reviews update
  const handleUpdateReview = (id: string, field: keyof ReviewItem, value: any) => {
    setSiteData((prev) => ({
      ...prev,
      reviews: {
        ...prev.reviews,
        items: prev.reviews.items.map((r) => (r.id === id ? { ...r, [field]: value } : r)),
      },
    }));
  };

  const handleAddReview = () => {
    const newReview: ReviewItem = {
      id: `rev-${Date.now()}`,
      content: '너무 친절하시고 찌든 물때가 말끔히 사라져서 창밖 풍경이 시원하게 보입니다!',
      author: `${siteData.company.region} 고객님`,
      rating: 5,
      tag: '아파트 외창 청소',
    };
    setSiteData((prev) => ({
      ...prev,
      reviews: {
        ...prev.reviews,
        items: [...prev.reviews.items, newReview],
      },
    }));
  };

  const handleDeleteReview = (id: string) => {
    setSiteData((prev) => ({
      ...prev,
      reviews: {
        ...prev.reviews,
        items: prev.reviews.items.filter((r) => r.id !== id),
      },
    }));
  };

  // FAQ update
  const handleUpdateFaq = (id: string, field: keyof FaqItem, value: string) => {
    setSiteData((prev) => ({
      ...prev,
      faq: {
        ...prev.faq,
        items: prev.faq.items.map((f) => (f.id === id ? { ...f, [field]: value } : f)),
      },
    }));
  };

  const handleAddFaq = () => {
    const newFaq: FaqItem = {
      id: `faq-${Date.now()}`,
      question: '새 질문을 입력하세요',
      answer: '정확하고 친절한 답변을 작성해 주세요.',
    };
    setSiteData((prev) => ({
      ...prev,
      faq: {
        ...prev.faq,
        items: [...prev.faq.items, newFaq],
      },
    }));
  };

  const handleDeleteFaq = (id: string) => {
    setSiteData((prev) => ({
      ...prev,
      faq: {
        ...prev.faq,
        items: prev.faq.items.filter((f) => f.id !== id),
      },
    }));
  };

  // Regions update
  const handleAddRegion = (newRegion: string) => {
    setSiteData((prev) => ({
      ...prev,
      regions: {
        ...prev.regions,
        list: [...prev.regions.list, newRegion],
      },
    }));
  };

  const handleRemoveRegion = (index: number) => {
    setSiteData((prev) => ({
      ...prev,
      regions: {
        ...prev.regions,
        list: prev.regions.list.filter((_, idx) => idx !== index),
      },
    }));
  };

  const handleUpdateRegionDetail = (regionName: string, detail: RegionDetailItem) => {
    setSiteData((prev) => ({
      ...prev,
      regions: {
        ...prev.regions,
        details: {
          ...(prev.regions.details || {}),
          [regionName]: detail,
        },
      },
    }));
  };

  // Inquiries
  const handleSubmitInquiry = (inquiry: Omit<InquiryItem, 'id' | 'createdAt' | 'status'>) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newInquiry: InquiryItem = {
      id: `inq-${Date.now()}`,
      ...inquiry,
      createdAt: formattedDate,
      status: '대기중',
    };

    setSiteData((prev) => ({
      ...prev,
      inquiries: [newInquiry, ...prev.inquiries],
    }));
  };

  const handleUpdateInquiryStatus = (id: string, status: InquiryItem['status']) => {
    setSiteData((prev) => ({
      ...prev,
      inquiries: prev.inquiries.map((inq) => (inq.id === id ? { ...inq, status } : inq)),
    }));
  };

  const handleDeleteInquiry = (id: string) => {
    setSiteData((prev) => ({
      ...prev,
      inquiries: prev.inquiries.filter((inq) => inq.id !== id),
    }));
  };

  const handleAddTestInquiry = () => {
    handleSubmitInquiry({
      name: '이서연',
      phone: '010-3344-5566',
      region: '서울 강남구 대치동',
      buildingType: '아파트 외창 (베란다/확장형)',
      content: '입주 전 거실과 방 3개 외창 전체 물때 제거 및 발수코팅 문의드립니다.',
    });
  };

  // Batch Fill Apply
  const handleApplyBatchFill = (updatedData: Partial<SiteData>) => {
    setSiteData((prev) => ({
      ...prev,
      ...updatedData,
    }));
  };

  // Reset to original template
  const handleResetToTemplate = () => {
    setSiteData(initialTemplateData);
    setCurrentPage({ type: 'home' });
  };

  // Export JSON
  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(siteData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `clearworks-website-backup-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON
  const handleImportJson = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        setSiteData(parsed);
      } catch (err) {
        alert('올바른 JSON 데이터 파일이 아닙니다.');
      }
    };
    reader.readAsText(file);
  };

  // Helper for image picker
  const activeImagePickerValues = () => {
    if (imagePickerTarget === 'hero') {
      return {
        before: siteData.hero.beforeImage,
        after: siteData.hero.afterImage,
        title: '히어로 메인 전후 사진 교체',
      };
    }
    if (imagePickerTarget && typeof imagePickerTarget === 'object' && 'caseId' in imagePickerTarget) {
      const c = siteData.cases.items.find((item) => item.id === imagePickerTarget.caseId);
      if (c) {
        return {
          before: c.beforeImage,
          after: c.afterImage,
          title: `[${c.title}] 시공 사진 교체`,
        };
      }
    }
    return { before: '', after: '', title: '' };
  };

  const handleSavePickedImages = (beforeImage: string, afterImage: string) => {
    if (imagePickerTarget === 'hero') {
      setSiteData((prev) => ({
        ...prev,
        hero: {
          ...prev.hero,
          beforeImage,
          afterImage,
        },
      }));
    } else if (imagePickerTarget && typeof imagePickerTarget === 'object' && 'caseId' in imagePickerTarget) {
      setSiteData((prev) => ({
        ...prev,
        cases: {
          ...prev.cases,
          items: prev.cases.items.map((item) =>
            item.id === imagePickerTarget.caseId ? { ...item, beforeImage, afterImage } : item
          ),
        },
      }));
    }
  };

  // Viewport container styling
  const getViewportContainerClass = () => {
    if (viewport === 'mobile') {
      return 'max-w-[410px] mx-auto my-6 border-8 border-slate-900 rounded-[44px] shadow-2xl overflow-clip bg-white';
    }
    if (viewport === 'tablet') {
      return 'max-w-[800px] mx-auto my-6 border-8 border-slate-900 rounded-[36px] shadow-2xl overflow-clip bg-white';
    }
    return 'w-full bg-white';
  };

  // Helper to resolve active service
  const activeService =
    currentPage.type === 'service'
      ? siteData.services.items.find((s) => s.id === currentPage.serviceId) || siteData.services.items[0]
      : currentPage.type === 'matrix'
      ? siteData.services.items.find((s) => s.id === currentPage.serviceId) || siteData.services.items[0]
      : null;

  const activeGalleryPost =
    currentPage.type === 'gallery_detail'
      ? (siteData.gallery?.posts || []).find((p) => p.id === currentPage.postId) || (siteData.gallery?.posts || [])[0]
      : null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      {/* 1. Master Top Editor Control Bar */}
      <EditorHeaderBar
        isEditMode={isEditMode}
        onToggleEditMode={() => setIsEditMode(!isEditMode)}
        viewport={viewport}
        onChangeViewport={setViewport}
        theme={siteData.theme}
        onChangeTheme={(theme: ThemeColor) => setSiteData((prev) => ({ ...prev, theme }))}
        onOpenBatchFill={() => setIsBatchFillOpen(true)}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenInquiries={() => setIsInquiriesOpen(true)}
        onOpenSeoMaster={() => setIsSeoMasterOpen(true)}
        currentPage={currentPage}
        onNavigate={(page) => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setCurrentPage(page);
        }}
        services={siteData.services.items}
        regions={siteData.regions.list}
        inquiryCount={siteData.inquiries.length}
        onExportJson={handleExportJson}
        onImportJson={handleImportJson}
        onReset={handleResetToTemplate}
      />

      {/* 2. Main Website Viewport Container */}
      <div className={getViewportContainerClass()}>
        {/* Navigation Bar with 서비스, 시공사례, 작업갤러리, and 서비스지역 links */}
        <Navbar
          company={siteData.company}
          services={siteData.services.items}
          regions={siteData.regions.list}
          currentPage={currentPage}
          isEditMode={isEditMode}
          onUpdateCompany={handleUpdateCompany}
          onNavigateHome={() => setCurrentPage({ type: 'home' })}
          onNavigateService={(serviceId) => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setCurrentPage({ type: 'service', serviceId });
          }}
          onNavigateRegion={(regionName) => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setCurrentPage({ type: 'region', regionName });
          }}
          onNavigateGalleryList={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setCurrentPage({ type: 'gallery_list' });
          }}
          onOpenSeoMaster={() => setIsSeoMasterOpen(true)}
        />

        {/* Dynamic Page Router */}
        <main>
          {/* A. HOMEPAGE */}
          {currentPage.type === 'home' && (
            <>
              {/* Hero Section */}
              <HeroSection
                hero={siteData.hero}
                company={siteData.company}
                isEditMode={isEditMode}
                onUpdateHero={handleUpdateHero}
                onUpdateStat={handleUpdateStat}
                onOpenImagePicker={() => setImagePickerTarget('hero')}
              />

              {/* Services Section */}
              <ServicesSection
                sectionTitle={siteData.services.sectionTitle}
                sectionSubtitle={siteData.services.sectionSubtitle}
                services={siteData.services.items}
                isEditMode={isEditMode}
                onUpdateTitle={(val) =>
                  setSiteData((prev) => ({
                    ...prev,
                    services: { ...prev.services, sectionTitle: val },
                  }))
                }
                onUpdateSubtitle={(val) =>
                  setSiteData((prev) => ({
                    ...prev,
                    services: { ...prev.services, sectionSubtitle: val },
                  }))
                }
                onUpdateService={handleUpdateService}
                onAddService={handleAddService}
                onDeleteService={handleDeleteService}
                onViewDetail={(serviceId) => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setCurrentPage({ type: 'service', serviceId });
                }}
              />

              {/* Process Section */}
              <ProcessSection
                sectionTitle={siteData.process.sectionTitle}
                sectionSubtitle={siteData.process.sectionSubtitle}
                steps={siteData.process.steps}
                isEditMode={isEditMode}
                onUpdateTitle={(val) =>
                  setSiteData((prev) => ({
                    ...prev,
                    process: { ...prev.process, sectionTitle: val },
                  }))
                }
                onUpdateSubtitle={(val) =>
                  setSiteData((prev) => ({
                    ...prev,
                    process: { ...prev.process, sectionSubtitle: val },
                  }))
                }
                onUpdateStep={handleUpdateStep}
              />

              {/* Cases / Portfolio Section */}
              <CasesSection
                sectionTitle={siteData.cases.sectionTitle}
                sectionSubtitle={siteData.cases.sectionSubtitle}
                cases={siteData.cases.items}
                isEditMode={isEditMode}
                onUpdateTitle={(val) =>
                  setSiteData((prev) => ({
                    ...prev,
                    cases: { ...prev.cases, sectionTitle: val },
                  }))
                }
                onUpdateSubtitle={(val) =>
                  setSiteData((prev) => ({
                    ...prev,
                    cases: { ...prev.cases, sectionSubtitle: val },
                  }))
                }
                onUpdateCase={handleUpdateCase}
                onAddCase={handleAddCase}
                onDeleteCase={handleDeleteCase}
                onEditCaseImages={(caseItem) => setImagePickerTarget({ caseId: caseItem.id })}
              />

              {/* Gallery / Work Stories Section */}
              <GallerySection
                sectionTitle={siteData.gallery?.sectionTitle || '작업 갤러리 & 현장 일지'}
                sectionSubtitle={siteData.gallery?.sectionSubtitle || '클리어웍스가 직접 다녀온 생생한 현장 스토리와 청소 노하우를 확인하세요.'}
                posts={siteData.gallery?.posts || []}
                isEditMode={isEditMode}
                onUpdateTitle={(val) =>
                  setSiteData((prev) => ({
                    ...prev,
                    gallery: { ...prev.gallery, sectionTitle: val },
                  }))
                }
                onUpdateSubtitle={(val) =>
                  setSiteData((prev) => ({
                    ...prev,
                    gallery: { ...prev.gallery, sectionSubtitle: val },
                  }))
                }
                onViewGalleryList={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setCurrentPage({ type: 'gallery_list' });
                }}
                onSelectPost={(postId) => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setCurrentPage({ type: 'gallery_detail', postId });
                }}
              />

              {/* Pricing Section */}
              <PricingSection
                sectionTitle={siteData.pricing.sectionTitle}
                sectionSubtitle={siteData.pricing.sectionSubtitle}
                footerNote={siteData.pricing.footerNote}
                rows={siteData.pricing.rows}
                isEditMode={isEditMode}
                onUpdateTitle={(val) =>
                  setSiteData((prev) => ({
                    ...prev,
                    pricing: { ...prev.pricing, sectionTitle: val },
                  }))
                }
                onUpdateSubtitle={(val) =>
                  setSiteData((prev) => ({
                    ...prev,
                    pricing: { ...prev.pricing, sectionSubtitle: val },
                  }))
                }
                onUpdateFooterNote={(val) =>
                  setSiteData((prev) => ({
                    ...prev,
                    pricing: { ...prev.pricing, footerNote: val },
                  }))
                }
                onUpdateRow={handleUpdatePriceRow}
                onAddRow={handleAddPriceRow}
                onDeleteRow={handleDeletePriceRow}
              />

              {/* Reviews Section */}
              <ReviewsSection
                sectionTitle={siteData.reviews.sectionTitle}
                sectionSubtitle={siteData.reviews.sectionSubtitle}
                reviews={siteData.reviews.items}
                isEditMode={isEditMode}
                onUpdateTitle={(val) =>
                  setSiteData((prev) => ({
                    ...prev,
                    reviews: { ...prev.reviews, sectionTitle: val },
                  }))
                }
                onUpdateSubtitle={(val) =>
                  setSiteData((prev) => ({
                    ...prev,
                    reviews: { ...prev.reviews, sectionSubtitle: val },
                  }))
                }
                onUpdateReview={handleUpdateReview}
                onAddReview={handleAddReview}
                onDeleteReview={handleDeleteReview}
              />

              {/* FAQ Section */}
              <FaqSection
                sectionTitle={siteData.faq.sectionTitle}
                sectionSubtitle={siteData.faq.sectionSubtitle}
                items={siteData.faq.items}
                isEditMode={isEditMode}
                onUpdateTitle={(val) =>
                  setSiteData((prev) => ({
                    ...prev,
                    faq: { ...prev.faq, sectionTitle: val },
                  }))
                }
                onUpdateSubtitle={(val) =>
                  setSiteData((prev) => ({
                    ...prev,
                    faq: { ...prev.faq, sectionSubtitle: val },
                  }))
                }
                onUpdateFaq={handleUpdateFaq}
                onAddFaq={handleAddFaq}
                onDeleteFaq={handleDeleteFaq}
              />

              {/* Service Regions Section (상단 메뉴의 '서비스지역' 클릭 시 이 섹션으로 스크롤됨) */}
              <RegionsSection
                sectionTitle={siteData.regions.sectionTitle}
                sectionSubtitle={siteData.regions.sectionSubtitle}
                regions={siteData.regions.list}
                isEditMode={isEditMode}
                onUpdateTitle={(val) =>
                  setSiteData((prev) => ({
                    ...prev,
                    regions: { ...prev.regions, sectionTitle: val },
                  }))
                }
                onUpdateSubtitle={(val) =>
                  setSiteData((prev) => ({
                    ...prev,
                    regions: { ...prev.regions, sectionSubtitle: val },
                  }))
                }
                onAddRegion={handleAddRegion}
                onRemoveRegion={handleRemoveRegion}
                onViewRegion={(regionName) => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setCurrentPage({ type: 'region', regionName });
                }}
              />

              {/* Contact / Quote Form Section */}
              <ContactFormSection
                sectionTitle={siteData.contactForm.sectionTitle}
                sectionSubtitle={siteData.contactForm.sectionSubtitle}
                successMessage={siteData.contactForm.successMessage}
                company={siteData.company}
                isEditMode={isEditMode}
                onUpdateTitle={(val) =>
                  setSiteData((prev) => ({
                    ...prev,
                    contactForm: { ...prev.contactForm, sectionTitle: val },
                  }))
                }
                onUpdateSubtitle={(val) =>
                  setSiteData((prev) => ({
                    ...prev,
                    contactForm: { ...prev.contactForm, sectionSubtitle: val },
                  }))
                }
                onUpdateSuccessMessage={(val) =>
                  setSiteData((prev) => ({
                    ...prev,
                    contactForm: { ...prev.contactForm, successMessage: val },
                  }))
                }
                onSubmitInquiry={handleSubmitInquiry}
                onOpenInquiriesModal={() => setIsInquiriesOpen(true)}
                inquiryCount={siteData.inquiries.length}
              />
            </>
          )}

          {/* B. SERVICE DETAIL PAGE */}
          {currentPage.type === 'service' && activeService && (
            <ServiceDetailPage
              service={activeService}
              allServices={siteData.services.items}
              company={siteData.company}
              isEditMode={isEditMode}
              onBack={() => setCurrentPage({ type: 'home' })}
              onSelectService={(serviceId) => setCurrentPage({ type: 'service', serviceId })}
              onUpdateService={handleUpdateService}
              onSubmitInquiry={handleSubmitInquiry}
            />
          )}

          {/* C. REGION DETAIL PAGE */}
          {currentPage.type === 'region' && (
            <RegionDetailPage
              regionName={currentPage.regionName}
              regionDetail={siteData.regions.details ? siteData.regions.details[currentPage.regionName] : undefined}
              allRegions={siteData.regions.list}
              company={siteData.company}
              reviews={siteData.reviews.items}
              cases={siteData.cases.items}
              isEditMode={isEditMode}
              onBack={() => setCurrentPage({ type: 'home' })}
              onSelectRegion={(reg) => setCurrentPage({ type: 'region', regionName: reg })}
              onUpdateRegionDetail={handleUpdateRegionDetail}
              onSubmitInquiry={handleSubmitInquiry}
            />
          )}

          {/* D. REGION X SERVICE COMBINATORIAL MATRIX PAGE */}
          {currentPage.type === 'matrix' && activeService && (
            <RegionServiceMatrixPage
              regionName={currentPage.regionName}
              regionDetail={siteData.regions.details ? siteData.regions.details[currentPage.regionName] : undefined}
              service={activeService}
              allRegions={siteData.regions.list}
              allServices={siteData.services.items}
              company={siteData.company}
              reviews={siteData.reviews.items}
              cases={siteData.cases.items}
              onBack={() => setCurrentPage({ type: 'home' })}
              onNavigateRegion={(reg) => setCurrentPage({ type: 'region', regionName: reg })}
              onNavigateService={(srvId) => setCurrentPage({ type: 'service', serviceId: srvId })}
              onNavigateMatrix={(reg, srvId) => setCurrentPage({ type: 'matrix', regionName: reg, serviceId: srvId })}
              onSubmitInquiry={handleSubmitInquiry}
            />
          )}

          {/* E. GALLERY LIST PAGE (WORK BLOG LIST) */}
          {currentPage.type === 'gallery_list' && (
            <GalleryListPage
              posts={siteData.gallery?.posts || []}
              company={siteData.company}
              isEditMode={isEditMode}
              onBackHome={() => setCurrentPage({ type: 'home' })}
              onSelectPost={(postId) => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setCurrentPage({ type: 'gallery_detail', postId });
              }}
              onAddPost={handleAddGalleryPost}
              onUpdatePost={handleUpdateGalleryPost}
              onDeletePost={handleDeleteGalleryPost}
            />
          )}

          {/* F. GALLERY DETAIL PAGE (WORK BLOG POST) */}
          {currentPage.type === 'gallery_detail' && activeGalleryPost && (
            <GalleryDetailPage
              post={activeGalleryPost}
              allPosts={siteData.gallery?.posts || []}
              company={siteData.company}
              isEditMode={isEditMode}
              onBackToList={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setCurrentPage({ type: 'gallery_list' });
              }}
              onSelectPost={(postId) => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setCurrentPage({ type: 'gallery_detail', postId });
              }}
              onUpdatePost={handleUpdateGalleryPost}
              onSubmitInquiry={handleSubmitInquiry}
            />
          )}
        </main>

        {/* Footer */}
        <Footer
          company={siteData.company}
          isEditMode={isEditMode}
          onUpdateCompany={handleUpdateCompany}
        />

        {/* Mobile Floating Sticky Bar */}
        <MobileStickyBar company={siteData.company} />
      </div>

      {/* 3. Floating Quick Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
        <button
          onClick={() => setIsSeoMasterOpen(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs sm:text-sm shadow-xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all"
        >
          <span>🗺️ 사이트맵 & SEO</span>
        </button>
        {isEditMode && (
          <>
            <button
              onClick={() => setIsBatchFillOpen(true)}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all"
            >
              <span>⚡ 빈칸 일괄 채우기</span>
            </button>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-xl shadow-black/30 hover:scale-105 active:scale-95 transition-all"
            >
              <span>⚙️ 전체 설정 열기</span>
            </button>
          </>
        )}
      </div>

      {/* 4. Modals */}
      <QuickBatchFillModal
        isOpen={isBatchFillOpen}
        onClose={() => setIsBatchFillOpen(false)}
        siteData={siteData}
        onApply={handleApplyBatchFill}
        onResetToTemplate={handleResetToTemplate}
      />

      <EditorDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        siteData={siteData}
        onUpdateSiteData={setSiteData}
      />

      <InquiriesModal
        isOpen={isInquiriesOpen}
        onClose={() => setIsInquiriesOpen(false)}
        inquiries={siteData.inquiries}
        onUpdateStatus={handleUpdateInquiryStatus}
        onDeleteInquiry={handleDeleteInquiry}
        onAddTestInquiry={handleAddTestInquiry}
      />

      <ImagePickerModal
        isOpen={!!imagePickerTarget}
        onClose={() => setImagePickerTarget(null)}
        beforeImage={activeImagePickerValues().before}
        afterImage={activeImagePickerValues().after}
        onSave={handleSavePickedImages}
        title={activeImagePickerValues().title}
      />

      <SeoMasterModal
        isOpen={isSeoMasterOpen}
        onClose={() => setIsSeoMasterOpen(false)}
        siteData={siteData}
        onNavigateMatrix={(reg, srvId) => {
          setCurrentPage({ type: 'matrix', regionName: reg, serviceId: srvId });
        }}
        onNavigateRegion={(reg) => {
          setCurrentPage({ type: 'region', regionName: reg });
        }}
        onNavigateService={(srvId) => {
          setCurrentPage({ type: 'service', serviceId: srvId });
        }}
      />
    </div>
  );
}
