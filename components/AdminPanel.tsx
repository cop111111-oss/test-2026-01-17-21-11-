
import React from 'react';
import { SiteContent, Service, PortfolioItem } from '../types';
import { Save, Plus, Trash2, Edit3, X } from 'lucide-react';

interface AdminPanelProps {
  content: SiteContent;
  onUpdate: (newContent: SiteContent) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ content, onUpdate }) => {
  const [localContent, setLocalContent] = React.useState<SiteContent>(content);
  const [activeTab, setActiveTab] = React.useState<'general' | 'services' | 'portfolio'>('general');

  const handleSave = () => {
    onUpdate(localContent);
    alert('설정이 저장되었습니다.');
  };

  const updateField = (field: keyof SiteContent, value: string) => {
    setLocalContent({ ...localContent, [field]: value });
  };

  const addService = () => {
    const newService: Service = {
      id: Date.now().toString(),
      title: "새 서비스",
      description: "설명을 입력하세요.",
      icon: "Zap",
      imageUrl: "https://picsum.photos/seed/" + Date.now() + "/800/600"
    };
    setLocalContent({ ...localContent, services: [...localContent.services, newService] });
  };

  const addPortfolio = () => {
    const newPort: PortfolioItem = {
      id: Date.now().toString(),
      title: "새 프로젝트",
      category: "기타",
      description: "프로젝트 설명을 입력하세요.",
      imageUrl: "https://picsum.photos/seed/" + Date.now() + "/600/400"
    };
    setLocalContent({ ...localContent, portfolio: [...localContent.portfolio, newPort] });
  };

  const removeService = (id: string) => {
    setLocalContent({ ...localContent, services: localContent.services.filter(s => s.id !== id) });
  };

  const removePortfolio = (id: string) => {
    setLocalContent({ ...localContent, portfolio: localContent.portfolio.filter(p => p.id !== id) });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8 border-b border-purple-500/20 pb-6">
        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
          관리자 대시보드
        </h1>
        <button 
          onClick={handleSave}
          className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-all"
        >
          <Save size={18} />
          <span>변경사항 저장</span>
        </button>
      </div>

      <div className="flex space-x-4 mb-8">
        {(['general', 'services', 'portfolio'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
              activeTab === tab ? 'bg-purple-600 text-white' : 'bg-zinc-900 text-gray-400 hover:bg-zinc-800'
            }`}
          >
            {tab === 'general' ? '기본 정보' : tab === 'services' ? '서비스 관리' : '포트폴리오 관리'}
          </button>
        ))}
      </div>

      <div className="bg-zinc-950 p-8 rounded-2xl border border-zinc-800 shadow-xl">
        {activeTab === 'general' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="block">
                <span className="text-gray-400 text-sm">회사명</span>
                <input 
                  type="text" 
                  value={localContent.brandName} 
                  onChange={(e) => updateField('brandName', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 mt-1 focus:border-purple-500 outline-none"
                />
              </label>
              <label className="block">
                <span className="text-gray-400 text-sm">메인 헤드라인</span>
                <input 
                  type="text" 
                  value={localContent.heroTitle} 
                  onChange={(e) => updateField('heroTitle', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 mt-1 focus:border-purple-500 outline-none"
                />
              </label>
              <label className="block">
                <span className="text-gray-400 text-sm">서브 헤드라인</span>
                <textarea 
                  value={localContent.heroSubtitle} 
                  onChange={(e) => updateField('heroSubtitle', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 mt-1 h-24 focus:border-purple-500 outline-none"
                />
              </label>
            </div>
            <div className="space-y-4">
              <label className="block">
                <span className="text-gray-400 text-sm">연락처 번호</span>
                <input 
                  type="text" 
                  value={localContent.contactPhone} 
                  onChange={(e) => updateField('contactPhone', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 mt-1 focus:border-purple-500 outline-none"
                />
              </label>
              <label className="block">
                <span className="text-gray-400 text-sm">이메일</span>
                <input 
                  type="text" 
                  value={localContent.contactEmail} 
                  onChange={(e) => updateField('contactEmail', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 mt-1 focus:border-purple-500 outline-none"
                />
              </label>
              <label className="block">
                <span className="text-gray-400 text-sm">주소</span>
                <input 
                  type="text" 
                  value={localContent.contactAddress} 
                  onChange={(e) => updateField('contactAddress', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 mt-1 focus:border-purple-500 outline-none"
                />
              </label>
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="space-y-8">
            <div className="flex justify-end">
              <button onClick={addService} className="flex items-center space-x-2 text-purple-400 hover:text-purple-300">
                <Plus size={18} /> <span>새 서비스 추가</span>
              </button>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {localContent.services.map((service, index) => (
                <div key={service.id} className="p-6 bg-zinc-900 rounded-xl relative group border border-zinc-800 hover:border-purple-500/50 transition-all">
                  <button 
                    onClick={() => removeService(service.id)}
                    className="absolute top-4 right-4 text-zinc-600 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="서비스 명"
                      value={service.title} 
                      onChange={(e) => {
                        const newServices = [...localContent.services];
                        newServices[index].title = e.target.value;
                        setLocalContent({ ...localContent, services: newServices });
                      }}
                      className="bg-black border border-zinc-800 rounded p-2 text-white outline-none"
                    />
                    <input 
                      type="text" 
                      placeholder="이미지 URL"
                      value={service.imageUrl} 
                      onChange={(e) => {
                        const newServices = [...localContent.services];
                        newServices[index].imageUrl = e.target.value;
                        setLocalContent({ ...localContent, services: newServices });
                      }}
                      className="bg-black border border-zinc-800 rounded p-2 text-white outline-none"
                    />
                    <textarea 
                      placeholder="서비스 설명"
                      value={service.description} 
                      onChange={(e) => {
                        const newServices = [...localContent.services];
                        newServices[index].description = e.target.value;
                        setLocalContent({ ...localContent, services: newServices });
                      }}
                      className="bg-black border border-zinc-800 rounded p-2 text-white outline-none h-20 col-span-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="space-y-8">
            <div className="flex justify-end">
              <button onClick={addPortfolio} className="flex items-center space-x-2 text-purple-400 hover:text-purple-300">
                <Plus size={18} /> <span>새 포트폴리오 추가</span>
              </button>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {localContent.portfolio.map((item, index) => (
                <div key={item.id} className="p-6 bg-zinc-900 rounded-xl relative border border-zinc-800 hover:border-purple-500/50 transition-all">
                  <button 
                    onClick={() => removePortfolio(item.id)}
                    className="absolute top-4 right-4 text-zinc-600 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input 
                      type="text" 
                      placeholder="제목"
                      value={item.title} 
                      onChange={(e) => {
                        const newItems = [...localContent.portfolio];
                        newItems[index].title = e.target.value;
                        setLocalContent({ ...localContent, portfolio: newItems });
                      }}
                      className="bg-black border border-zinc-800 rounded p-2 text-white outline-none"
                    />
                    <input 
                      type="text" 
                      placeholder="카테고리"
                      value={item.category} 
                      onChange={(e) => {
                        const newItems = [...localContent.portfolio];
                        newItems[index].category = e.target.value;
                        setLocalContent({ ...localContent, portfolio: newItems });
                      }}
                      className="bg-black border border-zinc-800 rounded p-2 text-white outline-none"
                    />
                    <input 
                      type="text" 
                      placeholder="이미지 URL"
                      value={item.imageUrl} 
                      onChange={(e) => {
                        const newItems = [...localContent.portfolio];
                        newItems[index].imageUrl = e.target.value;
                        setLocalContent({ ...localContent, portfolio: newItems });
                      }}
                      className="bg-black border border-zinc-800 rounded p-2 text-white outline-none"
                    />
                    <textarea 
                      placeholder="설명"
                      value={item.description} 
                      onChange={(e) => {
                        const newItems = [...localContent.portfolio];
                        newItems[index].description = e.target.value;
                        setLocalContent({ ...localContent, portfolio: newItems });
                      }}
                      className="bg-black border border-zinc-800 rounded p-2 text-white outline-none h-20 col-span-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
