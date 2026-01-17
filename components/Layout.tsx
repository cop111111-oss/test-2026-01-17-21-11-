
import React from 'react';
import { Page, SiteContent } from '../types';
import { Menu, X, ArrowRight, Instagram, MessageCircle, BookOpen } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  content: SiteContent;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, setCurrentPage, content }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navLinks: { name: string; id: Page }[] = [
    { name: '홈', id: 'home' },
    { name: '회사소개', id: 'about' },
    { name: '서비스', id: 'services' },
    { name: '포트폴리오', id: 'portfolio' },
    { name: '문의하기', id: 'contact' },
  ];

  return (
    <div className="min-h-screen bg-transparent text-white flex flex-col relative">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-purple-500/10 bg-black/40 backdrop-blur-xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div 
              className="flex items-center cursor-pointer group"
              onClick={() => setCurrentPage('home')}
            >
              <span className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 group-hover:from-purple-300 group-hover:to-purple-500 transition-all duration-300">
                {content.brandName}
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-10 items-center">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => setCurrentPage(link.id)}
                  className={`text-sm font-bold tracking-tight transition-all duration-300 relative group py-2 ${
                    currentPage === link.id ? 'text-purple-400' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 transition-transform duration-300 origin-left ${
                    currentPage === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                </button>
              ))}
              <button 
                onClick={() => setCurrentPage('admin')}
                className="px-5 py-2 border border-purple-500/40 text-[10px] font-black tracking-widest uppercase rounded-full hover:bg-purple-500 hover:text-white hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300"
              >
                Admin
              </button>
            </div>

            {/* Mobile Nav Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-400 hover:text-white transition-colors p-2">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-20 left-0 w-full bg-black/95 backdrop-blur-2xl border-b border-purple-500/10 overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-6 py-8 flex flex-col space-y-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setCurrentPage(link.id);
                  setIsMenuOpen(false);
                }}
                className={`text-2xl font-black text-left tracking-tight ${
                  currentPage === link.id ? 'text-purple-500' : 'text-gray-500'
                }`}
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => {
                setCurrentPage('admin');
                setIsMenuOpen(false);
              }}
              className="text-left text-purple-400 font-bold tracking-widest uppercase text-sm border-t border-purple-500/10 pt-6"
            >
              Dashboard
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black/80 backdrop-blur-md border-t border-purple-500/10 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="col-span-1 md:col-span-2">
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 mb-6 block">
                {content.brandName}
              </span>
              <p className="text-zinc-500 text-sm max-w-sm leading-relaxed mb-8">
                우리는 혁신적인 그린리모델링 기술과 제로에너지빌딩 솔루션을 통해 더 건강한 지구와 높은 건축 가치를 창조합니다.
              </p>
              <div className="flex space-x-4">
                <a href={content.kakaoLink} target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center bg-zinc-900 rounded-xl hover:bg-purple-600 transition-all duration-300 group">
                  <MessageCircle size={18} className="text-zinc-400 group-hover:text-white" />
                </a>
                <a href={content.instagramLink} target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center bg-zinc-900 rounded-xl hover:bg-purple-600 transition-all duration-300 group">
                  <Instagram size={18} className="text-zinc-400 group-hover:text-white" />
                </a>
                <a href={content.blogLink} target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center bg-zinc-900 rounded-xl hover:bg-purple-600 transition-all duration-300 group">
                  <BookOpen size={18} className="text-zinc-400 group-hover:text-white" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-widest mb-6">Contact</h4>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li className="flex items-start space-x-2">
                  <span className="text-purple-500">A.</span>
                  <span>{content.contactAddress}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-purple-500">T.</span>
                  <span>{content.contactPhone}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-purple-500">E.</span>
                  <span>{content.contactEmail}</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-widest mb-6">Menu</h4>
              <ul className="space-y-4 text-sm text-zinc-500">
                {navLinks.map(link => (
                  <li key={link.id}>
                    <button 
                      onClick={() => {
                        setCurrentPage(link.id);
                        window.scrollTo(0, 0);
                      }} 
                      className="hover:text-purple-400 transition-colors"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-zinc-900 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-zinc-600 uppercase tracking-widest">
            <div>&copy; {new Date().getFullYear()} {content.brandName}. Premium Energy Solutions.</div>
            <div className="mt-4 md:mt-0 space-x-6">
              <a href="#" className="hover:text-zinc-400">Privacy Policy</a>
              <a href="#" className="hover:text-zinc-400">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
