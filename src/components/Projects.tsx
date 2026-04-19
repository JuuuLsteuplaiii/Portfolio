import { useEffect, useRef, useState } from 'react';
import ProjectCard from './ProjectCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectsProps {
  theme: 'dark' | 'light';
  scrollY: number;
  lang: 'FR' | 'EN';
}

const projectsData = {
  FR: [
    {
      title: "Plateforme du ministère",
      description: "Plateforme pour gérer les demandes de congés et permissions de tout les personnels du Ministere de la jeunesse et des sports de Madagascar",
      tech: ["ReactJS", "Laravel", "MySQL"],
      image: "captureRH.png"
    },
    {
      title: "Site FPTSD",
      description: "Conception d'un site vitrine pour l'Université FPTSD Madagascar, accompagné d'un back-office dédié à la gestion des contenus.",
      tech: ["Figma","ReactJS", "NestJS", "PostgreSQL"],
      image: "captureFPTSD.png"
    },
    {
      title: "iKandra",
      description: "Une plateforme pour pour freelancers et clients à Madagascar",
      tech: ["ReactJS", "Spring boot", "PostgreSQL"],
      image: "captureIkandra.png"
    },
    {
      title: "Site d'inscription universitaire",
      description: "Un site web pour faire l'inscription en ligne pour les étudiants pour la Faculté de Sciences Fianarantsoa",
      tech: ["ReactJS", "ASP.NET Core", "Mongo DB"],
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=500&fit=crop"
    },
    {
      title: "Mi-ZARA",
      description: "une application mobile pour repartir les factures JIRAMA de mon appartement entre mes colocataires",
      tech: ["Kotlin", "Gradle", "XML"],
      image: "imgCardMiZARA.png"
    }
  ],
  EN: [
    {
      title: "Ministry Platform",
      description: "Platform to manage leave and permission requests for all staff of the Ministry of Youth and Sports Madagascar",
      tech: ["ReactJS", "Laravel", "MySQL"],
      image: "captureRH.png"
    },
    {
      title: "FPTSD Website",
      description: "Design of a showcase website for FPTSD University Madagascar, with a dedicated back-office for content management.",
      tech: ["Figma","ReactJS", "NestJS", "PostgreSQL"],
      image: "captureFPTSD.png"
    },
    {
      title: "iKandra",
      description: "A platform connecting freelancers and clients in Madagascar",
      tech: ["ReactJS", "Spring boot", "PostgreSQL"],
      image: "captureIkandra.png"
    },
    {
      title: "University Registration Website",
      description: "A web application for online student enrollment at the Faculty of Sciences Fianarantsoa",
      tech: ["ReactJS", "ASP.NET Core", "Mongo DB"],
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=500&fit=crop"
    },
    {
      title: "Mi-ZARA",
      description: "A mobile app to split JIRAMA utility bills among roommates in my apartment",
      tech: ["Kotlin", "Gradle", "XML"],
      image: "imgCardMiZARA.png"
    }
  ]
};

const translations = {
  FR: {
    titleLeft: 'Mes ',
    titleRight: 'Projets',
    prevLabel: 'Projet précédent',
    nextLabel: 'Projet suivant',
    dotLabel: (i: number) => `Aller au projet ${i + 1}`,
  },
  EN: {
    titleLeft: 'My ',
    titleRight: 'Projects',
    prevLabel: 'Previous project',
    nextLabel: 'Next project',
    dotLabel: (i: number) => `Go to project ${i + 1}`,
  },
};

export default function Projects({ theme, lang }: ProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const t = translations[lang];
  const projects = projectsData[lang];

  const leftPart = t.titleLeft.split('');
  const rightPart = t.titleRight.split('');

  const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
  const nextIndex = (currentIndex + 1) % projects.length;

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        
        if (rect.top < window.innerHeight * 0.7 && rect.bottom > 0) {
          if (!isVisible) {
            setIsVisible(true);
            setHasAnimated(false);
          }
        } else {
          if (isVisible) {
            setIsVisible(false);
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  useEffect(() => {
    if (direction !== null) {
      const timer = setTimeout(() => {
        setDirection(null);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [direction]);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      const timer = setTimeout(() => {
        setHasAnimated(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, hasAnimated]);

  const nextSlide = () => {
    setPreviousIndex(currentIndex);
    setDirection('right');
    setCurrentIndex((prev) => (prev + 1) % projects.length);
    
    setTimeout(() => {
      setPreviousIndex(null);
    }, 300);
  };

  const prevSlide = () => {
    setPreviousIndex(currentIndex);
    setDirection('left');
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    
    setTimeout(() => {
      setPreviousIndex(null);
    }, 300);
  };

  return (
    <section
      ref={sectionRef}
      id="projets" 
      className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 py-16 sm:py-0 overflow-hidden"
    >
      <div 
        className="absolute inset-0"
        style={{
          background: theme === 'dark'
            ? 'rgb(0, 0, 0)'
            : 'rgb(255, 255, 255)',
        }}
      />

      {/* Contenu */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
        {/* Titre animé */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-amber-500 font-bold mb-8 sm:mb-12 md:mb-16 text-center flex justify-center">
          <span className="inline-flex">
            {leftPart.map((letter, index) => (
              <span
                key={`left-${index}`}
                className="inline-block"
                style={{
                  animation: isVisible ? `slideFromLeftLetter 0.5s ease-out forwards ${index * -0.06}s` : 'none',
                  opacity: 0,
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </span>
          
          <span className="inline-flex">
            {rightPart.map((letter, index) => (
              <span
                key={`right-${index}`}
                className="inline-block"
                style={{
                  animation: isVisible ? `slideFromRightLetter 0.5s ease-out forwards ${index * 0.06}s` : 'none',
                  opacity: 0,
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </span>
        </h2>
        
        {/* Carrousel */}
        <div className="relative w-full flex items-center justify-center gap-2 md:gap-4">
          {/* Aperçu gauche (prev) */}
          <div 
            key={`prev-${prevIndex}`}
            className="hidden xl:block w-48 2xl:w-64 hover:opacity-60 transition-opacity cursor-pointer scale-90"
            onClick={prevSlide}
            style={{
              animation: !hasAnimated && isVisible
                ? 'appearFromLeft 0.6s ease-out forwards'
                : direction === 'left' 
                  ? 'scaleUpAndEnlarge 0.4s ease-out' 
                  : direction === 'right' 
                    ? 'scaleDownAndReduce 0.4s ease-out' 
                    : 'none',
              opacity: hasAnimated ? 0.4 : 0,
              transform: hasAnimated ? 'scale(0.9)' : 'translateX(-100px) scale(0.8)'
            }}
          >
            <ProjectCard {...projects[prevIndex]} theme={theme} />
          </div>

          {/* Card principale (current) */}
          <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl relative">
            {/* Ancienne card qui sort */}
            {previousIndex !== null && (
              <div
                key={`prev-card-${previousIndex}`}
                className="absolute inset-0"
                style={{
                  animation: direction === 'left' ? 'slideOutToRight 0.4s ease-out forwards' : 
                            direction === 'right' ? 'slideOutToLeft 0.4s ease-out forwards' : 'none'
                }}
              >
                <ProjectCard {...projects[previousIndex]} theme={theme} />
              </div>
            )}
            
            {/* Nouvelle card qui entre */}
            <div
              key={currentIndex}
              style={{
                animation: !hasAnimated && isVisible
                  ? 'scaleUpAppear 0.6s ease-out forwards 0.2s'
                  : previousIndex !== null
                    ? direction === 'left'
                      ? 'slideInFromLeft 0.3s ease-out forwards' 
                      : 'slideInFromRight 0.3s ease-out forwards'
                    : 'none',
                opacity: hasAnimated || previousIndex !== null ? (previousIndex !== null ? 0 : 1) : 0,
                transform: !hasAnimated && !previousIndex ? 'scale(0.8)' : undefined
              }}
            >
              <ProjectCard {...projects[currentIndex]} theme={theme} />
            </div>
          </div>

          {/* Aperçu droite (next) */}
          <div 
            key={`next-${nextIndex}`}
            className="hidden xl:block w-48 2xl:w-64 hover:opacity-60 transition-opacity cursor-pointer scale-90"
            onClick={nextSlide}
            style={{
              animation: !hasAnimated && isVisible
                ? 'appearFromRight 0.6s ease-out forwards'
                : direction === 'left' 
                  ? 'scaleDownAndReduce 0.4s ease-out' 
                  : direction === 'right' 
                    ? 'scaleUpAndEnlarge 0.4s ease-out' 
                    : 'none',
              opacity: hasAnimated ? 0.4 : 0,
              transform: hasAnimated ? 'scale(0.9)' : 'translateX(100px) scale(0.8)'
            }}
          >
            <ProjectCard {...projects[nextIndex]} theme={theme} />
          </div>
          
          {/* Boutons de navigation */}
          <button
            onClick={prevSlide}
            className={`absolute left-0 xl:-left-4 top-1/2 -translate-y-1/2 -translate-x-2 xl:-translate-x-4 p-2 md:p-3 rounded-full transition-all hover:scale-110 z-20 ${
              theme === 'dark'
                ? 'bg-white/10 hover:bg-white/20 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-md'
            }`}
            aria-label={t.prevLabel}
            style={{
              animation: !hasAnimated && isVisible ? 'fadeInScale 0.5s ease-out forwards 0.4s' : 'none',
              opacity: hasAnimated ? 1 : 0,
              transform: hasAnimated ? 'scale(1)' : 'scale(0.5)'
            }}
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <button
            onClick={nextSlide}
            className={`absolute right-0 xl:-right-4 top-1/2 -translate-y-1/2 translate-x-2 xl:translate-x-4 p-2 md:p-3 rounded-full transition-all hover:scale-110 z-20 ${
              theme === 'dark'
                ? 'bg-white/10 hover:bg-white/20 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-md'
            }`}
            aria-label={t.nextLabel}
            style={{
              animation: !hasAnimated && isVisible ? 'fadeInScale 0.5s ease-out forwards 0.4s' : 'none',
              opacity: hasAnimated ? 1 : 0,
              transform: hasAnimated ? 'scale(1)' : 'scale(0.5)'
            }}
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Indicateurs */}
        <div className="flex gap-1.5 md:gap-2 mt-6 md:mt-8">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 'right' : 'left');
                setCurrentIndex(index);
              }}
              className={`h-2.5 md:h-3 rounded-full transition-all ${
                currentIndex === index
                  ? 'bg-amber-500 w-6 md:w-8'
                  : theme === 'dark'
                  ? 'bg-white/30 hover:bg-white/50 w-2.5 md:w-3'
                  : 'bg-gray-300 hover:bg-gray-400 w-2.5 md:w-3'
              }`}
              aria-label={t.dotLabel(index)}
            />
          ))}
        </div>
      </div>

      {/* Animations CSS */}
      <style>{`
        @keyframes slideFromLeftLetter {
          0% {
            transform: translateX(-200px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideFromRightLetter {
          0% {
            transform: translateX(200px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInFromLeft {
          0% {
            transform: translateX(-60%) scale(0.5);
            opacity: 0;
          }
          100% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }

        @keyframes slideInFromRight {
          0% {
            transform: translateX(60%) scale(0.5);
            opacity: 0.9;
          }
          100% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }

        @keyframes scaleUpAndEnlarge {
          0% {
            transform: scale(0.1);
            opacity: 0;
          }
          100% {
            transform: scale(0.9);
            opacity: 0.5;
          }
        }

        @keyframes scaleDownAndReduce {
          0% {
            transform: scale(0.9);
            opacity: 0.1;
          }
          100% {
            transform: scale(0.1);
            opacity: 0;
          }
        }

        @keyframes slideOutToLeft {
          0% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateX(-68%) scale(0.7);
            opacity: 0.4;
          }
        }

        @keyframes slideOutToRight {
          0% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateX(68%) scale(0.7);
            opacity: 0.4;
          }
        }

        @keyframes appearFromLeft {
          0% {
            transform: translateX(-100px) scale(0.8);
            opacity: 0;
          }
          100% {
            transform: translateX(0) scale(0.9);
            opacity: 0.4;
          }
        }

        @keyframes appearFromRight {
          0% {
            transform: translateX(100px) scale(0.8);
            opacity: 0;
          }
          100% {
            transform: translateX(0) scale(0.9);
            opacity: 0.4;
          }
        }

        @keyframes scaleUpAppear {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes fadeInScale {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}