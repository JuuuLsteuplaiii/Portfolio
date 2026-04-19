import { Github, Linkedin, Mail } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface HeroProps {
  scrollY: number;
  onNavigate: (section: string) => void;
  theme: 'dark' | 'light';
  lang: 'FR' | 'EN';
}

const translations = {
  FR: {
    badge: 'Développeur Fullstack',
    description: "Passionné par la création d'expériences web modernes et performantes. Je transforme vos idées en solutions digitales élégantes.",
    contact: 'Me contacter',
    projects: 'Voir mes projets',
  },
  EN: {
    badge: 'Fullstack Developer',
    description: 'Passionate about crafting modern, high-performance web experiences. I turn your ideas into elegant digital solutions.',
    contact: 'Contact me',
    projects: 'View my projects',
  },
};

export default function Hero({ scrollY, onNavigate, theme, lang }: HeroProps) {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const t = translations[lang];

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(0, ${scrollY * 0.5}px, 0) scale(1.1)`;
      }
      if (contentRef.current) {
        contentRef.current.style.transform = `translate3d(0, ${scrollY * 0.2}px, 0)`;
      }
      if (overlayRef.current && scrollY >= 100) {
        const size = 100 + (scrollY - 100) * 0.8;
        overlayRef.current.style.backgroundSize = `${size}% 100%`;
      }
    });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [scrollY]);

  useEffect(() => {
    if (scrollY < 100) {
      setIsLoaded(false);
      
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setIsLoaded(false);
    }
  }, [scrollY]);

  const getBackgroundPosition = () => {
    if (windowWidth < 650) {
      const offset = Math.max(0, 10 - (650 - windowWidth) * 0.1);
      return `${offset}% 30%`;
    }
    return '10% 30%';
  };

  return (
    <section
      id="accueil"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: theme === 'dark' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)'
      }}
    >
      {/* Background image - caché sur petits écrans */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform hidden md:block"
        style={{
          backgroundImage: 'url(/imgHero.jpg)',
          backgroundSize: '130%',
          backgroundPosition: getBackgroundPosition(),
          backgroundRepeat: 'no-repeat',
          minWidth: '430px',
        }}
      />

      {/* Overlay gradient */}
      <div
        ref={overlayRef}
        className="absolute inset-0 will-change-transform"
        style={{
          background: theme === 'dark'
            ? 'linear-gradient(to right, rgba(0,0,0,1) 10%, rgba(0,0,0,0.95) 40%, rgba(0,0,0,0.1) 70%, transparent 100%)'
            : 'linear-gradient(to right, rgba(255,255,255,1) 10%, rgba(255,255,255,0.95) 40%, rgba(255,255,255,0.1) 70%, rgba(255,255,255,0) 100%)',
          backgroundSize: '100% 100%',
          backgroundPosition: 'left center',
        }}
      />

      <div style={{ maxWidth: '1600px' }} className="relative z-10 w-full mx-auto px-6">
        <div ref={contentRef} className="will-change-transform">
          {/* Badge avec animation de bordure */}
          <div className="flex justify-center mb-12 md:mb-20">
            <div 
              className="relative p-[2px] rounded-full overflow-hidden"
              style={{
                animation: scrollY < 100 ? 'dropBounce 1.5s' : 'slideToTop 1s forwards',
              }}
            >
              {/* Gradient qui tourne */}
              <div
                className={`absolute inset-0 rounded-full ${isLoaded ? 'animate-spin' : ''}`}
                style={{
                  background: isLoaded ? (
                    theme === 'dark'
                      ? 'conic-gradient(from 90deg, transparent 0%, transparent 95%, #f59e0b 80%, #fbbf24 100%, #f59e0b 100%, transparent 100%)'
                      : 'conic-gradient(from 90deg, transparent 0%, transparent 80%, #f59e0b 85%, #fbbf24 90%, #f59e0b 95%, transparent 100%)'
                  ) : 'transparent',
                  animationDuration: isLoaded ? '3s' : '0s',
                  transition: 'background 0.5s ease-in-out',
                }}
              />
              {/* Fond du badge */}
              <div className={`relative rounded-full px-4 py-2 text-sm md:text-lg backdrop-blur-lg ${
                theme === 'dark'
                  ? 'bg-white/5 hover:bg-white/10 border border-gray-700 text-white'
                  : 'bg-white/5 hover:bg-gray-100 border-2 border-gray-300 text-gray-800'
              }`}
                style={{
                  willChange: 'backdrop-filter',
                }}
              >
                {t.badge}
              </div>
            </div>
          </div>

          {/* Reste du contenu aligné à gauche avec animation slide */}
          <div className="text-left space-y-6 md:space-y-8 max-w-2xl">
            <h1 
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight transition-all duration-300"
              style={{
                animation: scrollY < 100 ? 'slideFromLeft 0.8s ease-out forwards' : 'slideToLeft 1s ease-out forwards',
                animationDelay: scrollY < 100 ? '0.2s' : '0s',
                opacity: scrollY >= 100 ? 0 : undefined,
                transform: scrollY < 100 ? 'translateX(-900px)' : undefined,
                color: theme === 'dark' ? 'white' : '#111827'
              }}
            >
              Julianot
              <span className="block bg-amber-500 bg-clip-text text-transparent mt-2">
                Ralahijaonina
              </span>
            </h1>

            <p
              className={`text-base md:text-lg lg:text-xl max-w-xl transition-all duration-300 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
              }`}
              style={{
                animation: scrollY < 100 ? 'slideFromLeft 0.8s ease-out forwards' : 'slideToLeft 1s ease-out forwards',
                animationDelay: scrollY < 100 ? '0.2s' : '0s',
                opacity: scrollY >= 100 ? 0 : undefined,
                transform: scrollY < 100 ? 'translateX(-900px)' : undefined,
              }}
            >
              {t.description}
            </p>

            <div 
              className="flex flex-wrap gap-3 md:gap-4 transition-all duration-300"
              style={{
                opacity: scrollY >= 100 ? 0 : undefined,
                animation: scrollY < 100 ? 'slideFromLeft 0.85s ease-out forwards' : 'slideToLeft 1s ease-out forwards',
                animationDelay: scrollY < 100 ? '0.2s' : '0s',
                transform: scrollY < 100 ? 'translateX(-900px)' : undefined,
              }}
            >
              <button
                onClick={() => onNavigate('contact')}
                className={`px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold transition-all hover:scale-105 text-sm md:text-base ${
                  theme === 'dark'
                    ? 'bg-white/5 text-amber-400 hover:bg-amber-500/10'
                    : 'bg-amber-500 text-white hover:bg-amber-600 shadow-md hover:shadow-lg'
                }`}
              >
                {t.contact}
              </button>

              <button
                onClick={() => onNavigate('projets')}
                className={`px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold transition-all hover:scale-105 text-sm md:text-base ${
                  theme === 'dark'
                    ? 'bg-white/5 hover:bg-white/10 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 text-gray-800 shadow-sm'
                }`}
              >
                {t.projects}
              </button>
            </div>

            <div className="flex gap-4 md:gap-6 pt-4">
              <a
                href="https://github.com/JuuuLsteuplaiii"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 md:p-3 rounded-full transition-all hover:scale-110 ${
                  theme === 'dark'
                    ? 'bg-white/5 hover:bg-white/10 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 text-gray-800 shadow-sm'
                }`}
                style={{
                  animation: scrollY >= 100 ? 'scaleDown 1.2s ease-out forwards' : 'scaleUp 0.8s ease-out forwards',
                  animationDelay: '0.8s',
                  transform: 'scale(0)' 
                }}
              >
                <Github className="w-5 h-5 md:w-6 md:h-6" />
              </a>

              <a
                href="https://www.linkedin.com/in/julianot-ralahijaonina-ba9262320/"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 md:p-3 rounded-full transition-all hover:scale-110 ${
                  theme === 'dark'
                    ? 'bg-white/5 hover:bg-white/10 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 text-gray-800 shadow-sm'
                }`}
                style={{
                  animation: scrollY >= 100 ? 'scaleDown 1.4s ease-out forwards' : 'scaleUp 0.9s ease-out forwards',
                  animationDelay: '0.85s',
                  transform: 'scale(0)'
                }}
              >
                <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
              </a>

              <a
                href="mailto:votre@email.com"
                className={`p-2 md:p-3 rounded-full transition-all hover:scale-110 ${
                  theme === 'dark'
                    ? 'bg-white/5 hover:bg-white/10 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 text-gray-800 shadow-sm'
                }`}
                style={{
                  animation: scrollY >= 100 ? 'scaleDown 1.6s ease-out forwards' : 'scaleUp 1s ease-out forwards',
                  animationDelay: '.9s',
                  transform: 'scale(0)'
                }}
              >
                <Mail className="w-5 h-5 md:w-6 md:h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Animations CSS */}
      <style>{`
        @keyframes dropBounce {
          0% {
            transform: translateY(-200px);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          70% {
            transform: translateY(10px);
          }
          85% {
            transform: translateY(-5px);
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideToTop {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-200px);
            opacity: 0;
          }
        }

        @keyframes slideFromLeft {
          0% {
            transform: translateX(-200px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes scaleUp {
          0% {
            transform: scale(0);
          }
          60% {
            transform: scale(1.15);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes scaleDown {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(0);
          }
        }

        @keyframes slideToLeft {
          0% {
            transform: translateX(0px);
            opacity: 1;
         }
          100% {
            transform: translateX(-200px);
            opacity: 0;
          }
        }

        @keyframes slideToRight {
          0% {
            transform: translateX(0px);
            opacity: 1;
          }
          100% {
            transform: translateX(200px);
            opacity: 0;
          }
        }

      `}</style>
    </section>
  );
}