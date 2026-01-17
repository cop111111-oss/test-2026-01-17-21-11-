
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
      <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase text-white drop-shadow-2xl">{title}</h2>
      {subtitle && <p className="text-blue-100/70 max-w-2xl mx-auto text-lg leading-relaxed font-medium">{subtitle}</p>}
      <div className="mt-8 h-1.5 w-24 bg-gradient-to-r from-emerald-400 to-transparent mx-auto rounded-full"></div>
    </div>
  );

  const renderHome = () => (
    <div className="space-y-32">
      <section className="relative h-screen flex items-center overflow-hidden bg-transparent">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="max-w-4xl">
            <div className="flex items-center space-x-4 mb-8">
              <span className="h-[2px] w-12 bg-emerald-400"></span>
              <span className="text-emerald-400 text-sm font-black tracking-[0.3em] uppercase drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]">
                Eco-Innovation Leader
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-10 leading-[0.9] tracking-tighter text-white">
              {content.heroTitle.split(' ').map((word, i) => (
                <span key={i} className={i > 2 ? 'text-transparent bg-clip-text bg-gradient-to-br from-emerald-300 via-emerald-500 to-purple-400' : 'text-white'}>
                  {word}{' '}
                </span>
              ))}
            </h1>
            <p className="text-xl text-blue-100/80 mb-12 leading-relaxed max-w-2xl font-medium drop-shadow-lg">
              {content.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <button 
                onClick={() => setCurrentPage('services')}
                className="group px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-white font-black rounded-full transition-all duration-500 flex items-center justify-center space-x-3 shadow-[0_10px_40px_rgba(16,185,129,0.4)] hover:scale-105 active:scale-95"
              >
                <span>시작하기</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => setCurrentPage('contact')}
                className="px-10 py-5 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white font-black rounded-full transition-all duration-300 shadow-xl"
              >
                상담 신청
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { icon: <Leaf size={32} />, val: "35%", label: "에너지 절감율", desc: "국가 공인 데이터 기반 평균치" },
            { icon: <Activity size={32} />, val: "500+", label: "누적 프로젝트", desc: "검증된 전문성과 풍부한 경험" },
            { icon: <Shield size={32} />, val: "1등급", label: "인증 성공률", desc: "최적화된 ZEB 솔루션 제공" },
          ].map((stat, i) => (
            <div key={i} className="group p-10 bg-white/[0.05] backdrop-blur-3xl border border-white/10 rounded-[3rem] hover:border-emerald-500/50 transition-all duration-500 shadow-2xl relative z-10">
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center text-emerald-400 mb-8 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 shadow-lg">
                {stat.icon}
              </div>
              <h3 className="text-5xl font-black mb-2 tracking-tighter text-white">{stat.val}</h3>
              <p className="text-emerald-400 font-bold mb-2 uppercase text-xs tracking-widest">{stat.label}</p>
              <p className="text-blue-100/60 text-sm leading-relaxed font-medium">{stat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 relative overflow-hidden bg-transparent">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <SectionHeader title="Core Solutions" subtitle="지속 가능한 미래를 위한 최첨단 에너지 솔루션을 만나보세요." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {content.services.map((service, i) => (
              <div key={service.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-[3rem] mb-8 aspect-[4/5] border border-white/10 shadow-2xl">
                  <img src={service.imageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={service.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/95 via-transparent to-transparent group-hover:from-blue-900/80 transition-all duration-500"></div>
                  <div className="absolute bottom-10 left-10 right-10">
                     <span className="text-[10px] font-black tracking-widest uppercase text-emerald-300 mb-2 block opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">Solution 0{i+1}</span>
                     <h3 className="text-3xl font-black text-white group-hover:text-emerald-400 transition-colors duration-300 drop-shadow-md">{service.title}</h3>
                  </div>
                </div>
                <p className="text-blue-100/50 leading-relaxed text-sm mb-6 line-clamp-2 px-2 font-medium">{service.description}</p>
                <div className="h-[1px] w-full bg-white/10 mb-6 group-hover:bg-emerald-500/50 transition-all duration-500"></div>
                <button onClick={() => setCurrentPage('services')} className="flex items-center space-x-2 text-white/40 group-hover:text-emerald-400 font-black text-xs uppercase tracking-widest transition-all duration-300 ml-2">
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
    <div className="max-w-7xl mx-auto px-4 py-32 space-y-32 bg-transparent">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="relative">
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-emerald-500/10 blur-[100px] rounded-full"></div>
          <h2 className="text-5xl md:text-7xl font-black mb-12 tracking-tighter leading-none text-white drop-shadow-xl">{content.aboutTitle}</h2>
          <p className="text-xl text-blue-100/70 leading-relaxed mb-12 font-medium">{content.aboutDescription}</p>
          <div className="grid grid-cols-2 gap-8 mb-12">
             <div className="p-8 bg-white/[0.05] backdrop-blur-3xl rounded-3xl border border-white/10 shadow-xl">
               <div className="text-emerald-400 font-black text-4xl mb-1">98%</div>
               <div className="text-[10px] text-blue-100/50 font-black uppercase tracking-widest">Client Satisfaction</div>
             </div>
             <div className="p-8 bg-white/[0.05] backdrop-blur-3xl rounded-3xl border border-white/10 shadow-xl">
               <div className="text-purple-400 font-black text-4xl mb-1">15+</div>
               <div className="text-[10px] text-blue-100/50 font-black uppercase tracking-widest">Years Expertise</div>
             </div>
          </div>
          <div className="relative p-10 bg-emerald-500/10 backdrop-blur-3xl rounded-[3rem] border border-emerald-500/30 shadow-2xl">
            <h4 className="text-emerald-400 font-black text-xs uppercase tracking-[0.3em] mb-4 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]">Our Vision</h4>
            <p className="text-2xl font-bold italic text-white/90 leading-snug drop-shadow-md">"{content.aboutVision}"</p>
          </div>
        </div>
        <div className="relative group">
           <div className="absolute inset-0 bg-emerald-500/15 blur-[150px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
           <div className="relative rounded-[3.5rem] overflow-hidden aspect-[4/5] border border-white/20 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
             <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-1000" alt="Office space" />
           </div>
        </div>
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="max-w-7xl mx-auto px-4 py-32 bg-transparent">
      <SectionHeader title="Expert Solutions" subtitle="전문 지식과 혁신적인 기술을 결합하여 최상의 에너지 퍼포먼스를 보장합니다." />
      <div className="space-y-48 mt-32">
        {content.services.map((service, index) => (
          <div key={service.id} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-24 items-center group`}>
            <div className="flex-1">
              <span className="text-emerald-400/5 font-black text-[12rem] leading-none block mb-[-4rem] select-none pointer-events-none">0{index + 1}</span>
              <h3 className="text-5xl font-black mb-8 tracking-tighter text-white group-hover:text-emerald-400 transition-colors duration-300 drop-shadow-lg">{service.title}</h3>
              <p className="text-xl text-blue-100/60 leading-relaxed mb-12 font-medium">{service.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                {["에너지 효율 정밀 분석", "정부 보조금 혜택 가이드", "고성능 단열 시스템", "탄소 배출권 컨설팅"].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3 text-sm font-bold text-blue-100/80 bg-white/[0.06] py-5 px-6 rounded-2xl border border-white/5 shadow-md">
                    <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full shadow-[0_0_12px_rgba(52,211,153,0.8)]"></div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => setCurrentPage('contact')} className="px-12 py-5 bg-emerald-500 text-white hover:bg-emerald-400 transition-all duration-500 rounded-full font-black uppercase tracking-widest text-xs shadow-2xl">
                Inquiry Now
              </button>
            </div>
            <div className="flex-1 w-full relative">
               <div className="absolute -inset-6 bg-emerald-500/10 rounded-[4rem] blur-[80px] group-hover:bg-emerald-500/20 transition-all duration-700"></div>
               <div className="relative rounded-[3rem] overflow-hidden aspect-video border border-white/20 shadow-[0_30px_70px_rgba(0,0,0,0.6)]">
                 <img src={service.imageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={service.title} />
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPortfolio = () => (
    <div className="max-w-7xl mx-auto px-4 py-32 bg-transparent">
      <SectionHeader title="Case Studies" subtitle="우리가 증명해 온 실질적인 에너지 혁신의 결과물들입니다." />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {content.portfolio.map((item) => (
          <div key={item.id} className="group bg-white/[0.05] backdrop-blur-3xl border border-white/10 rounded-[3rem] overflow-hidden hover:border-emerald-400/50 hover:translate-y-[-12px] transition-all duration-500 shadow-2xl">
            <div className="h-72 overflow-hidden relative">
              <img src={item.imageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100" alt={item.title} />
              <div className="absolute top-8 left-8 bg-emerald-500/90 backdrop-blur-md text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-[0.2em] shadow-lg">{item.category}</div>
            </div>
            <div className="p-10">
              <h3 className="text-2xl font-black mb-4 text-white group-hover:text-emerald-400 transition-colors drop-shadow-md">{item.title}</h3>
              <p className="text-blue-100/50 text-sm mb-8 leading-relaxed line-clamp-2 font-medium">{item.description}</p>
              <div className="pt-8 border-t border-white/10 flex justify-between items-center">
                <span className="text-[10px] text-blue-100/30 font-black tracking-[0.3em] uppercase">Success Delivered</span>
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all duration-300 shadow-lg">
                  <ArrowRight size={18} className="text-blue-100/40 group-hover:text-white" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="max-w-7xl mx-auto px-4 py-32 bg-transparent">
      <SectionHeader title="Get in Touch" subtitle="당신의 공간을 더 가치 있게 만드는 첫 걸음, 전문가와 상의하세요." />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 mt-20">
        <div className="lg:col-span-2 space-y-12">
          <div className="p-12 bg-white/[0.06] backdrop-blur-3xl rounded-[3.5rem] border border-white/10 relative overflow-hidden group shadow-2xl">
             <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-emerald-500/20 transition-all duration-500"></div>
             <h4 className="text-xs font-black text-emerald-400 uppercase tracking-[0.3em] mb-12 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]">Direct Contact</h4>
             <div className="space-y-10">
               <div className="flex items-center space-x-8">
                 <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 shadow-md">
                   <Phone size={24} />
                 </div>
                 <div>
                   <div className="text-[10px] text-blue-100/40 font-black uppercase tracking-widest mb-1">Phone</div>
                   <div className="text-xl font-bold text-white tracking-tight">{content.contactPhone}</div>
                 </div>
               </div>
               <div className="flex items-center space-x-8">
                 <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 shadow-md">
                   <Mail size={24} />
                 </div>
                 <div>
                   <div className="text-[10px] text-blue-100/40 font-black uppercase tracking-widest mb-1">Email</div>
                   <div className="text-xl font-bold text-white tracking-tight">{content.contactEmail}</div>
                 </div>
               </div>
               <div className="flex items-center space-x-8">
                 <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 shadow-md">
                   <MapPin size={24} />
                 </div>
                 <div>
                   <div className="text-[10px] text-blue-100/40 font-black uppercase tracking-widest mb-1">Address</div>
                   <div className="text-base font-bold leading-tight text-white/90">{content.contactAddress}</div>
                 </div>
               </div>
             </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white/[0.08] backdrop-blur-3xl p-14 rounded-[3.5rem] border border-white/20 shadow-[0_40px_100px_rgba(0,0,0,0.5)] relative">
            <form className="space-y-8" onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[13px] font-bold text-blue-100/70 ml-2 uppercase tracking-widest">이름</label>
                  <input name="name" type="text" className="w-full bg-blue-950/40 border border-white/10 rounded-2xl p-6 focus:border-emerald-400/50 outline-none transition-all placeholder-blue-100/20 text-white shadow-inner" placeholder="홍길동" required disabled={isSubmitting} />
                </div>
                <div className="space-y-4">
                  <label className="text-[13px] font-bold text-blue-100/70 ml-2 uppercase tracking-widest">연락처</label>
                  <input name="phone" type="tel" className="w-full bg-blue-950/40 border border-white/10 rounded-2xl p-6 focus:border-emerald-400/50 outline-none transition-all placeholder-blue-100/20 text-white shadow-inner" placeholder="010-0000-0000" required disabled={isSubmitting} />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[13px] font-bold text-blue-100/70 ml-2 uppercase tracking-widest">이메일</label>
                <input name="email" type="email" className="w-full bg-blue-950/40 border border-white/10 rounded-2xl p-6 focus:border-emerald-400/50 outline-none transition-all placeholder-blue-100/20 text-white shadow-inner" placeholder="example@email.com" required disabled={isSubmitting} />
              </div>
              <div className="space-y-4">
                <label className="text-[13px] font-bold text-blue-100/70 ml-2 uppercase tracking-widest">프로젝트 내용</label>
                <textarea name="message" className="w-full bg-blue-950/40 border border-white/10 rounded-2xl p-6 h-48 focus:border-emerald-400/50 outline-none transition-all resize-none placeholder-blue-100/20 text-white shadow-inner" placeholder="어떤 프로젝트를 구상 중이신가요?" required disabled={isSubmitting}></textarea>
              </div>
              <button type="submit" disabled={isSubmitting} className={`w-full py-7 rounded-2xl font-black transition-all text-white flex items-center justify-center space-x-4 text-xl shadow-2xl ${isSuccess ? 'bg-emerald-500 scale-95 opacity-90' : 'bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98]'} disabled:opacity-70 disabled:cursor-not-allowed`}>
                {isSubmitting ? (
                  <><Loader2 className="animate-spin" size={28} /><span>전송 중...</span></>
                ) : isSuccess ? (
                  <><CheckCircle2 size={28} /><span>전송 완료</span></>
                ) : (
                  <span>상담 신청하기</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage} content={content}>
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
