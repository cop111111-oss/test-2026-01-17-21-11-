
import React from 'react';
import Layout from './components/Layout';
import AdminPanel from './components/AdminPanel';
import { Page, SiteContent } from './types';
import { INITIAL_CONTENT } from './constants';
import { ArrowRight, Leaf, Shield, Zap, Mail, Phone, MapPin, Activity, Home, ChevronRight, Loader2, CheckCircle2 } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState<Page>('home');
  const [content, setContent] = React.useState<SiteContent>(INITIAL_CONTENT);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  React.useEffect(() => {
    const saved = localStorage.getItem('easygreen_content');
    if (saved) {
      try {
        setContent(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved content", e);
      }
    }
  }, []);

  const handleUpdateContent = (newContent: SiteContent) => {
    setContent(newContent);
    localStorage.setItem('easygreen_content', JSON.stringify(newContent));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setIsSubmitting(true);
    setIsSuccess(false);

    try {
      const response = await fetch("https://formspree.io/f/xgoooreq", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setIsSuccess(true);
        form.reset();
        // Reset success state after 5 seconds to allow new submissions
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        const data = await response.json();
        if (data && Object.prototype.hasOwnProperty.call(data, 'errors')) {
          alert(data["errors"].map((error: any) => error["message"]).join(", "));
        } else {
          alert('문의 제출 중 오류가 발생했습니다. 다시 시도해 주세요.');
        }
      }
    } catch (error) {
      alert('서버 연결 중 오류가 발생했습니다. 인터넷 연결을 확인해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
    <div className="mb-20 text-center">
      <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase">{title}</h2>
      {subtitle && <p className="text-zinc-500 max-w-2xl mx-auto text-lg leading-relaxed">{subtitle}</p>}
      <div className="mt-8 h-1 w-24 bg-gradient-to-r from-purple-600 to-transparent mx-auto"></div>
    </div>
  );

  const renderHome = () => (
    <div className="space-y-32">
      {/* Hero */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="max-w-4xl">
            <div className="flex items-center space-x-3 mb-8">
              <span className="h-[1px] w-12 bg-purple-500"></span>
              <span className="text-purple-400 text-xs font-black tracking-[0.2em] uppercase">
                Premium Eco Solution
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-10 leading-[0.9] tracking-tighter">
              {content.heroTitle.split(' ').map((word, i) => (
                <span key={i} className={i > 2 ? 'text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-purple-800' : ''}>
                  {word}{' '}
                </span>
              ))}
            </h1>
            <p className="text-xl text-zinc-400 mb-12 leading-relaxed max-w-2xl">
              {content.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <button 
                onClick={() => setCurrentPage('services')}
                className="group px-10 py-5 bg-purple-600 hover:bg-purple-700 text-white font-black rounded-full transition-all duration-500 flex items-center justify-center space-x-3 shadow-[0_10px_40px_rgba(168,85,247,0.3)] hover:shadow-[0_15px_50px_rgba(168,85,247,0.5)]"
              >
                <span>시작하기</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => setCurrentPage('contact')}
                className="px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 text-white font-black rounded-full transition-all duration-300"
              >
                상담 신청
              </button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
          <div className="w-1 h-12 bg-gradient-to-b from-purple-500 to-transparent rounded-full"></div>
        </div>
      </section>

      {/* Intro Stats */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { icon: <Leaf size={32} />, val: "35%", label: "에너지 절감율", desc: "국가 공인 데이터 기반 평균치" },
            { icon: <Activity size={32} />, val: "500+", label: "누적 프로젝트", desc: "검증된 전문성과 풍부한 경험" },
            { icon: <Shield size={32} />, val: "1등급", label: "인증 성공률", desc: "최적화된 ZEB 솔루션 제공" },
          ].map((stat, i) => (
            <div key={i} className="group p-10 bg-zinc-950/20 backdrop-blur-xl border border-white/5 rounded-[2.5rem] hover:border-purple-500/30 transition-all duration-500">
              <div className="w-16 h-16 bg-purple-950/40 rounded-2xl flex items-center justify-center text-purple-500 mb-8 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-500">
                {stat.icon}
              </div>
              <h3 className="text-5xl font-black mb-2 tracking-tighter">{stat.val}</h3>
              <p className="text-white font-bold mb-2 uppercase text-xs tracking-widest">{stat.label}</p>
              <p className="text-zinc-600 text-sm leading-relaxed">{stat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <SectionHeader title="Core Solutions" subtitle="지속 가능한 미래를 위한 최첨단 에너지 솔루션을 만나보세요." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {content.services.map((service, i) => (
              <div key={service.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-[2rem] mb-8 aspect-[4/5] border border-white/5">
                  <img 
                    src={service.imageUrl} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    alt={service.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent group-hover:via-black/5 transition-all duration-500"></div>
                  <div className="absolute bottom-8 left-8 right-8">
                     <span className="text-[10px] font-black tracking-widest uppercase text-purple-400 mb-2 block opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                       Solution 0{i+1}
                     </span>
                     <h3 className="text-3xl font-black text-white group-hover:text-purple-400 transition-colors duration-300">{service.title}</h3>
                  </div>
                </div>
                <p className="text-zinc-500 leading-relaxed text-sm mb-6 line-clamp-2 px-2">
                  {service.description}
                </p>
                <div className="h-[1px] w-full bg-zinc-900 mb-6 group-hover:bg-purple-500/30 transition-all duration-500"></div>
                <button 
                  onClick={() => setCurrentPage('services')}
                  className="flex items-center space-x-2 text-white/40 group-hover:text-purple-500 font-black text-xs uppercase tracking-widest transition-all duration-300 ml-2"
                >
                  <span>Explore Detail</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const renderAbout = () => (
    <div className="max-w-7xl mx-auto px-4 py-32 space-y-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="relative">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-600/10 blur-3xl rounded-full"></div>
          <h2 className="text-5xl md:text-7xl font-black mb-12 tracking-tighter leading-none">{content.aboutTitle}</h2>
          <p className="text-xl text-zinc-400 leading-relaxed mb-12">
            {content.aboutDescription}
          </p>
          <div className="grid grid-cols-2 gap-8 mb-12">
             <div className="p-6 bg-zinc-950/40 backdrop-blur-xl rounded-2xl border border-white/5">
               <div className="text-purple-500 font-black text-3xl mb-1">98%</div>
               <div className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Client Satisfaction</div>
             </div>
             <div className="p-6 bg-zinc-950/40 backdrop-blur-xl rounded-2xl border border-white/5">
               <div className="text-purple-500 font-black text-3xl mb-1">15+</div>
               <div className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Years Expertise</div>
             </div>
          </div>
          <div className="relative p-10 bg-zinc-950/40 backdrop-blur-xl rounded-[2.5rem] border border-purple-500/20 shadow-[0_20px_60px_-15px_rgba(168,85,247,0.1)]">
            <h4 className="text-purple-500 font-black text-xs uppercase tracking-[0.2em] mb-4">Our Vision</h4>
            <p className="text-2xl font-bold italic text-white/90 leading-snug">
              "{content.aboutVision}"
            </p>
          </div>
        </div>
        <div className="relative group">
           <div className="absolute inset-0 bg-purple-600/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
           <div className="relative rounded-[3rem] overflow-hidden aspect-[4/5] border border-white/5 shadow-2xl">
             <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="Office space" />
           </div>
        </div>
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="max-w-7xl mx-auto px-4 py-32">
      <SectionHeader title="Expert Solutions" subtitle="전문 지식과 혁신적인 기술을 결합하여 최상의 에너지 퍼포먼스를 보장합니다." />
      <div className="space-y-48 mt-32">
        {content.services.map((service, index) => (
          <div key={service.id} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-24 items-center group`}>
            <div className="flex-1">
              <span className="text-purple-600/10 font-black text-[10rem] leading-none block mb-[-2rem] select-none">
                0{index + 1}
              </span>
              <h3 className="text-5xl font-black mb-8 tracking-tighter group-hover:text-purple-400 transition-colors duration-300">{service.title}</h3>
              <p className="text-xl text-zinc-400 leading-relaxed mb-12">
                {service.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                {[
                  "에너지 효율 정밀 분석", 
                  "정부 보조금 혜택 가이드", 
                  "고성능 단열 시스템", 
                  "탄소 배출권 컨설팅"
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3 text-sm font-bold text-zinc-300 bg-white/5 py-4 px-6 rounded-xl border border-white/5">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)]"></div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setCurrentPage('contact')}
                className="px-12 py-5 bg-white text-black hover:bg-purple-600 hover:text-white transition-all duration-500 rounded-full font-black uppercase tracking-widest text-xs"
              >
                Inquiry Now
              </button>
            </div>
            <div className="flex-1 w-full relative">
               <div className="absolute -inset-4 bg-purple-600/5 rounded-[3rem] blur-2xl group-hover:bg-purple-600/10 transition-all duration-700"></div>
               <div className="relative rounded-[2.5rem] overflow-hidden aspect-video border border-white/10 shadow-2xl">
                 <img src={service.imageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={service.title} />
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPortfolio = () => (
    <div className="max-w-7xl mx-auto px-4 py-32">
      <SectionHeader title="Case Studies" subtitle="우리가 증명해 온 실질적인 에너지 혁신의 결과물들입니다." />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {content.portfolio.map((item) => (
          <div key={item.id} className="group bg-zinc-950/20 backdrop-blur-xl border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-purple-500/40 hover:translate-y-[-10px] transition-all duration-500">
            <div className="h-72 overflow-hidden relative">
              <img 
                src={item.imageUrl} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                alt={item.title} 
              />
              <div className="absolute top-6 left-6 bg-black/80 backdrop-blur-md text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-white/10">
                {item.category}
              </div>
            </div>
            <div className="p-10">
              <h3 className="text-2xl font-black mb-4 group-hover:text-purple-400 transition-colors">{item.title}</h3>
              <p className="text-zinc-500 text-sm mb-8 leading-relaxed line-clamp-2">
                {item.description}
              </p>
              <div className="pt-8 border-t border-zinc-900 flex justify-between items-center">
                <span className="text-[10px] text-zinc-600 font-black tracking-[0.2em] uppercase">Success Delivered</span>
                <div className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center group-hover:bg-purple-600 group-hover:border-purple-600 transition-all duration-300">
                  <ArrowRight size={16} className="text-zinc-600 group-hover:text-white" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="max-w-7xl mx-auto px-4 py-32">
      <SectionHeader title="Get in Touch" subtitle="당신의 공간을 더 가치 있게 만드는 첫 걸음, 전문가와 상의하세요." />
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 mt-20">
        <div className="lg:col-span-2 space-y-12">
          <div className="p-10 bg-zinc-950/40 backdrop-blur-xl rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-purple-600/20 transition-all duration-500"></div>
             <h4 className="text-xs font-black text-purple-500 uppercase tracking-widest mb-10">Direct Contact</h4>
             <div className="space-y-10">
               <div className="flex items-center space-x-6">
                 <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
                   <Phone size={20} />
                 </div>
                 <div>
                   <div className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Phone</div>
                   <div className="text-lg font-bold">{content.contactPhone}</div>
                 </div>
               </div>
               <div className="flex items-center space-x-6">
                 <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
                   <Mail size={20} />
                 </div>
                 <div>
                   <div className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Email</div>
                   <div className="text-lg font-bold">{content.contactEmail}</div>
                 </div>
               </div>
               <div className="flex items-center space-x-6">
                 <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
                   <MapPin size={20} />
                 </div>
                 <div>
                   <div className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Address</div>
                   <div className="text-sm font-bold leading-snug">{content.contactAddress}</div>
                 </div>
               </div>
             </div>
          </div>
          
          <div className="h-64 rounded-[2.5rem] overflow-hidden border border-zinc-900 grayscale brightness-50 contrast-125">
             <div className="w-full h-full bg-zinc-950 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-purple-500/5"></div>
                <MapPin size={32} className="text-purple-600 mb-2" />
             </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-[#111111] p-12 rounded-[2rem] border border-white/5 shadow-2xl relative">
            <form className="space-y-8" onSubmit={handleFormSubmit}>
              {/* Row 1: Name and Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[13px] font-bold text-zinc-400 ml-1">이름</label>
                  <input 
                    name="name" 
                    type="text" 
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-5 focus:border-green-500/50 outline-none transition-all placeholder-zinc-700 text-white" 
                    placeholder="홍길동" 
                    required 
                    disabled={isSubmitting} 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[13px] font-bold text-zinc-400 ml-1">연락처</label>
                  <input 
                    name="phone" 
                    type="tel" 
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-5 focus:border-green-500/50 outline-none transition-all placeholder-zinc-700 text-white" 
                    placeholder="010-0000-0000" 
                    required 
                    disabled={isSubmitting} 
                  />
                </div>
              </div>

              {/* Row 2: Email */}
              <div className="space-y-3">
                <label className="text-[13px] font-bold text-zinc-400 ml-1">이메일</label>
                <input 
                  name="email" 
                  type="email" 
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-5 focus:border-green-500/50 outline-none transition-all placeholder-zinc-700 text-white" 
                  placeholder="example@email.com" 
                  required 
                  disabled={isSubmitting} 
                />
              </div>

              {/* Row 3: Project Content */}
              <div className="space-y-3">
                <label className="text-[13px] font-bold text-zinc-400 ml-1">프로젝트 내용</label>
                <textarea 
                  name="message" 
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-5 h-40 focus:border-green-500/50 outline-none transition-all resize-none placeholder-zinc-700 text-white" 
                  placeholder="어떤 프로젝트를 구상 중이신가요?" 
                  required 
                  disabled={isSubmitting}
                ></textarea>
              </div>

              {/* Submit Button: Vibrant Green as per image */}
              <button 
                type="submit" 
                disabled={isSubmitting} 
                className={`w-full py-6 rounded-2xl font-bold transition-all text-white flex items-center justify-center space-x-3 text-lg ${
                  isSuccess 
                  ? 'bg-[#1fb155] shadow-[0_10px_30px_rgba(31,177,85,0.3)]' 
                  : 'bg-[#1fb155] hover:bg-[#19a349] active:scale-[0.98]'
                } disabled:opacity-70 disabled:cursor-not-allowed`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={24} />
                    <span>전송 중...</span>
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle2 size={24} />
                    <span>전송 완료</span>
                  </>
                ) : (
                  <span>문의보내기</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Layout 
      currentPage={currentPage} 
      setCurrentPage={setCurrentPage}
      content={content}
    >
      <div className="relative pt-20">
        {currentPage === 'home' && renderHome()}
        {currentPage === 'about' && renderAbout()}
        {currentPage === 'services' && renderServices()}
        {currentPage === 'portfolio' && renderPortfolio()}
        {currentPage === 'contact' && renderContact()}
        {currentPage === 'admin' && (
          <div className="pt-20">
            <AdminPanel content={content} onUpdate={handleUpdateContent} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default App;
