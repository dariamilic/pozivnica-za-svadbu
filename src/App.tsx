import { useState, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Info, 
  Phone, 
  ChevronDown, 
  Heart,
  Music,
  Utensils,
  MailOpen
} from 'lucide-react';

// --- Components ---

const OliveBranchShort = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 95C50 95 48 70 52 40" stroke="white" strokeOpacity="0.1" strokeWidth="0.8" strokeLinecap="round"/>
    {/* Leaves left */}
    <ellipse cx="44" cy="80" rx="2.5" ry="6" transform="rotate(-35 44 80)" fill="white" fillOpacity="0.05" stroke="white" strokeOpacity="0.1" strokeWidth="0.4"/>
    <ellipse cx="42" cy="62" rx="2.5" ry="6" transform="rotate(-45 42 62)" fill="white" fillOpacity="0.05" stroke="white" strokeOpacity="0.1" strokeWidth="0.4"/>
    <ellipse cx="45" cy="45" rx="2.5" ry="6" transform="rotate(-30 45 45)" fill="white" fillOpacity="0.05" stroke="white" strokeOpacity="0.1" strokeWidth="0.4"/>
    {/* Leaves right */}
    <ellipse cx="56" cy="72" rx="2.5" ry="6" transform="rotate(35 56 72)" fill="white" fillOpacity="0.05" stroke="white" strokeOpacity="0.1" strokeWidth="0.4"/>
    <ellipse cx="58" cy="54" rx="2.5" ry="6" transform="rotate(45 58 54)" fill="white" fillOpacity="0.05" stroke="white" strokeOpacity="0.1" strokeWidth="0.4"/>
    <ellipse cx="54" cy="38" rx="2.2" ry="5" transform="rotate(20 54 38)" fill="white" fillOpacity="0.05" stroke="white" strokeOpacity="0.1" strokeWidth="0.4"/>
    {/* Top leaf */}
    <ellipse cx="52" cy="28" rx="2" ry="5" transform="rotate(5 52 28)" fill="white" fillOpacity="0.05" stroke="white" strokeOpacity="0.1" strokeWidth="0.4"/>
  </svg>
);

const OliveBranchLong = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 115C50 115 48 80 52 15" stroke="white" strokeOpacity="0.1" strokeWidth="0.7" strokeLinecap="round"/>
    {/* Leaves left */}
    <ellipse cx="44" cy="100" rx="2.5" ry="6" transform="rotate(-35 44 100)" fill="white" fillOpacity="0.05" stroke="white" strokeOpacity="0.1" strokeWidth="0.4"/>
    <ellipse cx="42" cy="82" rx="2.5" ry="6" transform="rotate(-45 42 82)" fill="white" fillOpacity="0.05" stroke="white" strokeOpacity="0.1" strokeWidth="0.4"/>
    <ellipse cx="43" cy="65" rx="2.5" ry="6" transform="rotate(-40 43 65)" fill="white" fillOpacity="0.05" stroke="white" strokeOpacity="0.1" strokeWidth="0.4"/>
    <ellipse cx="45" cy="48" rx="2.5" ry="6" transform="rotate(-30 45 48)" fill="white" fillOpacity="0.05" stroke="white" strokeOpacity="0.1" strokeWidth="0.4"/>
    <ellipse cx="48" cy="32" rx="2.2" ry="5" transform="rotate(-25 48 32)" fill="white" fillOpacity="0.05" stroke="white" strokeOpacity="0.1" strokeWidth="0.4"/>
    
    {/* Leaves right */}
    <ellipse cx="56" cy="92" rx="2.5" ry="6" transform="rotate(35 56 92)" fill="white" fillOpacity="0.05" stroke="white" strokeOpacity="0.1" strokeWidth="0.4"/>
    <ellipse cx="58" cy="74" rx="2.5" ry="6" transform="rotate(45 58 74)" fill="white" fillOpacity="0.05" stroke="white" strokeOpacity="0.1" strokeWidth="0.4"/>
    <ellipse cx="57" cy="56" rx="2.5" ry="6" transform="rotate(40 57 56)" fill="white" fillOpacity="0.05" stroke="white" strokeOpacity="0.1" strokeWidth="0.4"/>
    <ellipse cx="54" cy="40" rx="2.2" ry="5" transform="rotate(20 54 40)" fill="white" fillOpacity="0.05" stroke="white" strokeOpacity="0.1" strokeWidth="0.4"/>
    <ellipse cx="53" cy="26" rx="2" ry="5" transform="rotate(15 53 26)" fill="white" fillOpacity="0.05" stroke="white" strokeOpacity="0.1" strokeWidth="0.4"/>
    
    {/* Top leaf */}
    <ellipse cx="52" cy="10" rx="1.8" ry="5" transform="rotate(5 52 10)" fill="white" fillOpacity="0.05" stroke="white" strokeOpacity="0.1" strokeWidth="0.4"/>
  </svg>
);

const Countdown = ({ targetDate }: { targetDate: Date }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex justify-center gap-4 md:gap-8 my-12">
      {[
        { label: 'DANA', value: timeLeft.days },
        { label: 'SATI', value: timeLeft.hours },
        { label: 'MINUTA', value: timeLeft.minutes },
        { label: 'SEKUNDI', value: timeLeft.seconds }
      ].map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <span className="text-3xl md:text-4xl font-serif text-white mb-1 font-light">{item.value}</span>
          <span className="text-[9px] tracking-[0.2em] text-white/60 uppercase font-medium">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

const ScheduleItem = ({ time, title, location, icon: Icon, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="flex gap-6 mb-12 last:mb-0"
  >
    <div className="flex flex-col items-center">
      <div className="w-10 h-10 rounded-full border border-olive-light/10 flex items-center justify-center text-olive-dark bg-white shadow-sm">
        <Icon size={18} strokeWidth={1} />
      </div>
      <div className="w-px h-full bg-olive-light/5 mt-4"></div>
    </div>
    <div className="flex-1 pt-1">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] font-medium text-olive-light tracking-[0.2em] uppercase">{time}</span>
      </div>
      <h3 className="text-lg font-serif mb-1 text-olive-dark">{title}</h3>
      <div className="flex items-start gap-2 text-gray-400 text-xs italic leading-relaxed">
        <MapPin size={12} className="mt-0.5 shrink-0" />
        <span>{location}</span>
      </div>
    </div>
  </motion.div>
);

const Accordion = ({ title, children }: { title: string, children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left"
      >
        <span className="text-base font-serif text-white tracking-wide">{title}</span>
        <ChevronDown 
          className={`text-white/50 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          size={18} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 text-white/70 leading-relaxed text-xs">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const weddingDate = new Date('2026-09-19T15:00:00');

  if (!isOpened) {
    return (
      <div className="h-screen w-full bg-wedding-green flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="envelope-wrapper mb-12"
          onClick={() => setIsOpened(true)}
        >
          <div className="envelope group">
            <div className="envelope-flap group-hover:-rotate-x-180 transition-transform duration-700"></div>
            <div className="envelope-pocket"></div>
            <div className="envelope-body"></div>
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-wedding-green-dark text-center">
                <p className="font-serif text-sm tracking-[0.5em] opacity-40">B & L</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => setIsOpened(true)}
          className="text-white/60 font-serif text-xs tracking-[0.3em] uppercase hover:text-white transition-colors"
        >
          Otvorite pozivnicu
        </motion.button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen selection:bg-white/10 bg-wedding-green text-white"
    >
      {/* Hero Section - Redesigned to match the image layout precisely */}
      <section className="relative h-screen flex items-center justify-center px-6 overflow-hidden bg-wedding-green">
        <div className="max-w-5xl w-full h-full relative flex flex-col justify-between py-16 md:py-24">
          
          {/* Top Row: Names and Date */}
          <div className="flex justify-between items-start w-full">
            {/* Left Side: Names */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex flex-col items-start"
            >
              <h1 className="text-6xl md:text-9xl font-serif text-white mb-2 font-light tracking-tight">BRIGITA</h1>
              <span className="text-4xl md:text-6xl font-serif text-white/60 my-1 ml-4">&</span>
              <h1 className="text-6xl md:text-9xl font-serif text-white mt-2 font-light tracking-tight">LUKA</h1>
            </motion.div>

            {/* Right Side: Date & Vertical Line */}
            <motion.div 
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="flex flex-col items-center"
            >
               <div className="flex flex-col items-center text-2xl md:text-4xl font-serif tracking-[0.2em] mb-6 space-y-1">
                  <span>19</span>
                  <span>09</span>
                  <span>26</span>
               </div>
               <div className="w-px h-48 md:h-80 bg-white/30"></div>
            </motion.div>
          </div>

          {/* Middle/Bottom Text: Invitation */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-[10px] md:text-sm tracking-[0.4em] text-white uppercase mb-6 font-medium leading-loose">
              POZIVAMO VAS DA S NAMA PROSLAVITE NAŠE VJENČANJE!
            </p>
            <div className="flex justify-center items-center gap-6">
              <div className="w-16 md:w-32 h-px bg-white/20"></div>
              <Heart size={18} className="text-white/60" fill="white" fillOpacity={0.2} />
              <div className="w-16 md:w-32 h-px bg-white/20"></div>
            </div>
          </motion.div>
        </div>

        {/* Subtle Olive Branch Decorations - White as requested, very low opacity */}
        <OliveBranchShort className="absolute top-20 right-40 w-48 h-48 text-white/5 rotate-45 pointer-events-none" />
        <OliveBranchLong className="absolute bottom-20 right-10 w-64 h-64 text-white/5 -rotate-12 pointer-events-none" />

        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/20"
        >
          <ChevronDown size={20} strokeWidth={1} />
        </motion.div>
      </section>

      {/* Countdown Section - Slightly darker green as requested */}
      <section className="py-24 bg-wedding-green-dark px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-lg font-serif text-white mb-2 tracking-[0.2em] uppercase">Odbrojavanje</h2>
          <p className="text-[10px] italic text-white/40 mb-8 uppercase tracking-widest">Do najljepšeg dana u našim životima</p>
          <Countdown targetDate={weddingDate} />
        </div>
      </section>

      {/* Schedule Section - Compact 3-column layout with clickable links */}
      <section className="py-16 bg-wedding-green px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-serif tracking-[0.4em] uppercase text-white">RASPORED</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            
            {/* Okupljanje */}
            <div className="flex flex-col items-center px-4">
              <h3 className="text-lg font-serif mb-3 tracking-[0.3em] uppercase text-white/90">OKUPLJANJE</h3>
              <div className="w-px h-6 bg-white/20 mb-4 hidden md:block"></div>
              <motion.a 
                href="https://www.google.com/maps/search/?api=1&query=Božjakovinska+ul.+34B+Zagreb" 
                target="_blank" 
                rel="noopener noreferrer"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="text-sm text-white/80 mb-3 italic tracking-wide hover:text-white transition-colors underline underline-offset-4 decoration-white/20 flex items-center gap-1"
              >
                <MapPin size={14} className="shrink-0" />
                Božjakovinska ul. 34B
              </motion.a>
              <div className="w-8 h-px bg-white/20 mb-4"></div>
              <p className="text-xl font-serif tracking-widest">15:00</p>
            </div>

            {/* Vjenčanje */}
            <div className="flex flex-col items-center px-4 border-y md:border-y-0 md:border-x border-white/10 py-8 md:py-0">
              <h3 className="text-lg font-serif mb-3 tracking-[0.3em] uppercase text-white/90">VJENČANJE</h3>
              <div className="w-px h-6 bg-white/20 mb-4 hidden md:block"></div>
              <p className="text-base text-white/90 font-medium mb-1 uppercase tracking-wider">Crkva bl. Djevice Marije Majke Crkve</p>
              <motion.a 
                href="https://www.google.com/maps/search/?api=1&query=Tomaševa+ul.+22+Zagreb" 
                target="_blank" 
                rel="noopener noreferrer"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="text-sm text-white/80 mb-3 italic tracking-wide hover:text-white transition-colors underline underline-offset-4 decoration-white/20 flex items-center gap-1"
              >
                <MapPin size={14} className="shrink-0" />
                Tomaševa ul. 22
              </motion.a>
              <div className="w-8 h-px bg-white/20 mb-4"></div>
              <p className="text-xl font-serif tracking-widest">17:00</p>
            </div>

            {/* Večera */}
            <div className="flex flex-col items-center px-4 py-8 md:py-0">
              <h3 className="text-lg font-serif mb-3 tracking-[0.3em] uppercase text-white/90">VEČERA</h3>
              <div className="w-px h-6 bg-white/20 mb-4 hidden md:block"></div>
              <p className="text-base text-white/90 font-medium mb-1 uppercase tracking-wider">The Hall</p>
              <motion.a 
                href="https://www.google.com/maps/search/?api=1&query=Magazinska+ul.+16+Zagreb" 
                target="_blank" 
                rel="noopener noreferrer"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="text-sm text-white/80 mb-3 italic tracking-wide hover:text-white transition-colors underline underline-offset-4 decoration-white/20 flex items-center gap-1"
              >
                <MapPin size={14} className="shrink-0" />
                Magazinska ul. 16
              </motion.a>
              <div className="w-8 h-px bg-white/20 mb-4"></div>
              <p className="text-xl font-serif tracking-widest">19:00</p>
            </div>

          </div>

          <div className="text-center mt-16">
             <h2 className="text-xl md:text-2xl font-serif tracking-[0.3em] uppercase text-white">VESELIMO SE VAŠEM DOLASKU!</h2>
          </div>
        </div>
      </section>

      {/* Info Section - Parking Information restored */}
      <section className="py-24 bg-wedding-green-dark px-6">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-xl font-serif text-white mb-2 tracking-[0.2em] uppercase">Informacije</h2>
          </div>
          
          <div className="space-y-2">
            <Accordion title="Upute o parkingu">
              <p>Besplatan parking osiguran je u garaži restorana <strong>The Hall</strong>. Garaža je dostupna svim gostima tijekom cijele večeri.</p>
            </Accordion>
          </div>
        </div>
      </section>

      {/* RSVP Section - Redesigned with frame and olive branch */}
      <section className="py-20 bg-wedding-green-light px-6 text-center">
        <div className="max-w-2xl mx-auto border border-white/20 p-8 md:p-12 relative overflow-hidden">
          {/* Decorative Olive Branch in the frame */}
          <OliveBranchShort className="absolute -top-6 -right-6 w-24 h-24 text-white/10 rotate-12 pointer-events-none" />
          
          <p className="text-white/90 italic text-sm mb-10 tracking-[0.2em]">
            Molimo svoj dolazak potvrdite najkasnije do 1.9.2026.
          </p>
          
          <div className="flex flex-row justify-center items-center gap-8 md:gap-16">
            <div className="flex flex-col items-center">
              <p className="text-2xl md:text-3xl font-serif mb-2 tracking-wide">Brigita</p>
              <a href="tel:0951231234" className="text-white/70 hover:text-white transition-colors text-xs md:text-sm tracking-[0.2em]">
                095 509 9162
              </a>
            </div>
            
            <div className="w-px h-12 bg-white/20"></div>

            <div className="flex flex-col items-center">
              <p className="text-2xl md:text-3xl font-serif mb-2 tracking-wide">Luka</p>
              <a href="tel:0951231234" className="text-white/70 hover:text-white transition-colors text-xs md:text-sm tracking-[0.2em]">
                099 273 0826
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-wedding-green-dark text-center px-6">
        <div className="flex flex-col items-center">
          <OliveBranchShort className="w-10 h-10 text-white/30 mb-4" />
          <h2 className="text-base font-serif text-white mb-1 tracking-[0.3em] font-light uppercase">B & L</h2>
          <p className="text-[10px] text-white/40 tracking-[0.2em] uppercase">19. rujna 2026.</p>
        </div>
      </footer>
    </motion.div>
  );
}
