import React, { useState, useEffect } from 'react';
import {
  Truck,
  Shield,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Menu,
  X,
  Gauge,
  Zap,
  Award,
  Users,
  Settings,
  Clock,
  CheckCircle,
  ExternalLink,
  Sliders,
  DollarSign,
  TrendingDown,
  Info,
  Calendar,
  Send
} from 'lucide-react';

interface TruckModel {
  id: string;
  name: string;
  subtitle: string;
  category: 'super' | 'v8' | 'gas_electric' | 'xt';
  categoryLabel: string;
  power: string;
  torque: string;
  transmission: string;
  fuel: string;
  image: string;
  pbtc: string;
  description: string;
  highlights: string[];
}

const TRUCK_MODELS: TruckModel[] = [
  {
    id: 'scania-560-r-super',
    name: 'Scania 560 R Super 6x4',
    subtitle: 'Eficiência superior para transporte rodoviário pesado',
    category: 'super',
    categoryLabel: 'Linha Super',
    power: '560 cv (412 kW) a 1.800 rpm',
    torque: '2.800 Nm a 900 - 1.400 rpm',
    transmission: 'Scania Opticruise G33CM (12+2 marchas)',
    fuel: 'Diesel / Biodiesel (B100)',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1000&q=80',
    pbtc: 'Até 74 toneladas',
    description: 'Equipado com o motor Scania Super de 13 litros com tecnologia de duplo comando no cabeçote e freio de liberação de compressão (CRB). Proporciona até 8% de economia de combustível.',
    highlights: ['Até 8% de economia', 'Freio CRB + Retarder', 'Cabine Highline de luxo', 'Controle de cruzeiro com previsão ativa']
  },
  {
    id: 'scania-770-s-v8',
    name: 'Scania 770 S V8 King of the Road',
    subtitle: 'O caminhão de produção em série mais potente do mundo',
    category: 'v8',
    categoryLabel: 'Linha V8',
    power: '770 cv (566 kW) a 1.800 rpm',
    torque: '3.700 Nm a 1.000 - 1.450 rpm',
    transmission: 'Scania Opticruise G33CH reforçada',
    fuel: 'Diesel / HVO',
    image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1000&q=80',
    pbtc: 'Até 91 toneladas (VLP e Cargas Especiais)',
    description: 'A lenda do V8 de 16,4 litros atinge seu ápice. Criado para as rotas mais exigentes, composições rodotrem e cargas superpesadas, oferecendo a máxima velocidade média com piso 100% plano.',
    highlights: ['Motor V8 16.4L lendário', 'Piso plano com 2,07m de pé direito', 'Acabamento interno exclusivo V8', 'Maior torque do mercado comercial']
  },
  {
    id: 'scania-460-r-super',
    name: 'Scania 460 R Super 6x2',
    subtitle: 'O equilíbrio perfeito para frotas rodoviárias',
    category: 'super',
    categoryLabel: 'Linha Super',
    power: '460 cv (338 kW) a 1.800 rpm',
    torque: '2.500 Nm a 900 - 1.290 rpm',
    transmission: 'Scania Opticruise G25CM com overdrive',
    fuel: 'Diesel',
    image: 'https://images.unsplash.com/photo-1591768793355-74d04bb6608f?auto=format&fit=crop&w=1000&q=80',
    pbtc: '48,5 a 53 toneladas',
    description: 'O cavalo mecânico ideal para carretas de 3 eixos e bitrens. Reconhecido pelo melhor TCO (Custo Total de Operação) da categoria e índice recorde de satisfação dos motoristas.',
    highlights: ['Recorde de autonomia por tanque', 'Sistema de telemetria ativo', 'Manutenção flexível com base no uso', 'Excelente valor de revenda']
  },
  {
    id: 'scania-g-500-xt',
    name: 'Scania G 500 XT 6x4 Heavy Tipper',
    subtitle: 'Resistência extrema para cana, minério e construção pesada',
    category: 'xt',
    categoryLabel: 'Operação Severa XT',
    power: '500 cv (368 kW) a 1.900 rpm',
    torque: '2.550 Nm a 1.000 - 1.300 rpm',
    transmission: 'Opticruise Off-Road com modo clutch on demand',
    fuel: 'Diesel',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
    pbtc: 'Capacidade máxima de tração de até 150 toneladas',
    description: 'Projetado para os terrenos mais hostis. Parachoque de aço de peça única saliente em 150 mm, pino de reboque de 40 toneladas, escudo protetor sob o cárter e degraus antiderrapantes.',
    highlights: ['Parachoque de aço inteiriço', 'Ângulo de ataque de 25 graus', 'Filtro de ar ciclônico reforçado', 'Eixos reforçados com redução nos cubos']
  },
  {
    id: 'scania-460-r-gas',
    name: 'Scania 460 R Gás Natural & Biometano',
    subtitle: 'Transporte descarbonizado com redução de até 90% em CO2',
    category: 'gas_electric',
    categoryLabel: 'Gás & Elétrico',
    power: '460 cv (338 kW) com ciclo Otto',
    torque: '2.300 Nm a 1.000 - 1.300 rpm',
    transmission: 'Scania Opticruise G25CM',
    fuel: 'GNC, GNL ou Biometano puro',
    image: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=1000&q=80',
    pbtc: 'Até 53 toneladas',
    description: 'Líder da transição energética no Brasil. Cilindros laterais com autonomia de até 1.600 km na versão a gás líquido (GNL) e operação até 20% mais silenciosa que motores equivalentes a diesel.',
    highlights: ['Até 90% menos emissões com biometano', 'Ruído 50% menor em áreas urbanas', 'Isenção de restrições de tráfego', 'Ideal para metas ESG corporativas']
  },
  {
    id: 'scania-45-r-electric',
    name: 'Scania 45 R 100% Elétrico (BEV)',
    subtitle: 'A nova era do transporte regional com zero emissões locais',
    category: 'gas_electric',
    categoryLabel: 'Gás & Elétrico',
    power: '450 kW contínuos (610 cv equivalentes)',
    torque: '3.500 Nm instantâneos',
    transmission: 'Caixa integrada de 6 velocidades com embreagem dupla',
    fuel: 'Baterias de íon-lítio NMC (624 kWh)',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80',
    pbtc: 'Até 64 toneladas',
    description: 'Desenvolvido para operações de curta e média distância com emissão zero no escapamento. Recarga ultra-rápida CCS2 de 375 kW que permite recarregar durante a pausa regulamentar do motorista.',
    highlights: ['Zero emissão direta de carbono', 'Autonomia de até 350 km com carga total', 'Recarga rápida de 45 minutos (80%)', 'Condução suave e ultra silenciosa']
  }
];

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portfolioFilter, setPortfolioFilter] = useState<'all' | 'super' | 'v8' | 'gas_electric' | 'xt'>('all');
  const [selectedTruck, setSelectedTruck] = useState<TruckModel | null>(null);
  const [typedIndex, setTypedIndex] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    fleetSize: '',
    modelInterest: 'Scania 560 R Super',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Rotating typed phrases for hero
  const typedPhrases = [
    'Líder em Soluções de Transporte Sustentável',
    'Nova Geração Scania Super: até 8% mais econômica',
    'A Força Lendária do Motor V8 de 770 cv',
    'Conectividade e Telemetria Inteligente de Frotas'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTypedIndex((prev) => (prev + 1) % typedPhrases.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'stats', 'skills', 'resume', 'portfolio', 'services', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        fleetSize: '',
        modelInterest: 'Scania 560 R Super',
        message: ''
      });
    }, 4500);
  };

  const filteredTrucks = portfolioFilter === 'all'
    ? TRUCK_MODELS
    : TRUCK_MODELS.filter(t => t.category === portfolioFilter);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex font-sans antialiased">
      {/* Mobile Menu Toggle Button */}
      <button
        id="mobile-nav-toggle"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-4 right-4 z-50 xl:hidden bg-[#041e42] text-white p-3 rounded-full shadow-lg border border-slate-700 hover:bg-[#d6001c] transition-colors focus:outline-none"
        aria-label="Abrir menu de navegação"
      >
        {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Backdrop for mobile */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 xl:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Header (faithful to iPortfolio layout) */}
      <header
        id="header"
        className={`fixed top-0 bottom-0 left-0 z-40 w-72 bg-[#041e42] text-white flex flex-col justify-between py-6 px-5 transition-transform duration-300 ease-in-out border-r border-slate-800/80 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'
        }`}
      >
        <div>
          {/* Scania Brand Emblem & Logo */}
          <div className="flex flex-col items-center text-center mt-2 mb-6">
            <div className="relative group mb-3">
              <div className="w-24 h-24 rounded-full bg-linear-to-b from-[#003366] to-[#021329] border-2 border-[#d6001c] p-2 flex items-center justify-center shadow-xl shadow-black/40">
                {/* Scania Griffin Emblem Vector */}
                <svg className="w-14 h-14 text-white" viewBox="0 0 100 100" fill="currentColor">
                  {/* Crowned Griffin Silhouette representation */}
                  <path d="M50 12 L56 22 L66 18 L64 28 L74 30 L67 38 L72 48 L61 46 L60 56 L50 49 L40 56 L39 46 L28 48 L33 38 L26 30 L36 28 L34 18 L44 22 Z" fill="#d6001c" />
                  <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="3" />
                  <path d="M50 28 C60 28 68 36 68 46 C68 56 60 62 50 62 C40 62 32 56 32 46 C32 36 40 28 50 28 Z" fill="#ffffff" />
                  <path d="M47 38 Q52 34 56 41 Q59 47 52 52 Q44 57 40 50 Z" fill="#041e42" />
                  <polygon points="50,68 55,80 68,80 57,88 61,100 50,92 39,100 43,88 32,80 45,80" fill="#facc15" />
                </svg>
              </div>
              <span className="absolute bottom-0 right-1 bg-[#d6001c] text-[10px] font-bold tracking-widest text-white px-2 py-0.5 rounded-full uppercase border border-[#041e42]">
                BRASIL
              </span>
            </div>

            <h1 className="text-2xl font-black tracking-widest text-white uppercase">
              SCANIA
            </h1>
            <p className="text-xs text-slate-300 font-medium tracking-wide mt-1">
              Concessionária & Showroom Oficial
            </p>

            {/* Social Links Bar */}
            <div className="flex items-center gap-2 mt-4">
              <a
                href="#contact"
                className="w-8 h-8 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#d6001c] transition-all text-xs"
                title="Atendimento"
              >
                <Phone size={14} />
              </a>
              <a
                href="#contact"
                className="w-8 h-8 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#d6001c] transition-all text-xs"
                title="E-mail"
              >
                <Mail size={14} />
              </a>
              <a
                href="#contact"
                className="w-8 h-8 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#d6001c] transition-all text-xs"
                title="Localização"
              >
                <MapPin size={14} />
              </a>
              <a
                href="#portfolio"
                className="w-8 h-8 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#d6001c] transition-all text-xs"
                title="Caminhões"
              >
                <Truck size={14} />
              </a>
            </div>
          </div>

          {/* Navigation Menu Links */}
          <nav id="navmenu" className="mt-4">
            <ul className="space-y-1 text-sm font-medium">
              {[
                { id: 'hero', label: 'Início', icon: Gauge },
                { id: 'about', label: 'Sobre a Scania', icon: Shield },
                { id: 'stats', label: 'Em Números', icon: Award },
                { id: 'skills', label: 'Eficiência & Tecnologia', icon: Sliders },
                { id: 'resume', label: 'Gama de Cabines', icon: Truck },
                { id: 'portfolio', label: 'Showroom de Modelos', icon: Zap },
                { id: 'services', label: 'Serviços & Pós-Venda', icon: Settings },
                { id: 'testimonials', label: 'Depoimentos Frotistas', icon: Users },
                { id: 'contact', label: 'Contato & Cotação', icon: Mail },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <button
                      id={`nav-link-${item.id}`}
                      onClick={() => scrollTo(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left ${
                        isActive
                          ? 'bg-[#d6001c] text-white font-semibold shadow-md'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                      }`}
                    >
                      <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Footer in Sidebar */}
        <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 text-center">
          <p>© 2026 Scania Template</p>
          <p className="text-[11px] text-slate-300 mt-0.5">Tecnologia, Sustentabilidade e Força</p>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 xl:ml-72 min-w-0">
        {/* 1. HERO SECTION */}
        <section
          id="hero"
          className="relative min-h-screen flex items-center justify-center bg-slate-950 text-white overflow-hidden"
        >
          {/* Background Image with Dark Vignette */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 transition-transform duration-1000 ease-out"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1920&q=80')`
            }}
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-radial from-transparent via-slate-950/50 to-slate-950" />

          {/* Hero Content */}
          <div className="relative z-10 max-w-4xl px-6 md:px-12 py-24 text-left mr-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d6001c]/90 text-white text-xs font-bold uppercase tracking-widest mb-4 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Gama Scania Super & V8
            </div>

            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              SCANIA <span className="text-[#d6001c]">BRASIL</span>
            </h1>

            {/* Subtitle with animated cycling text */}
            <div className="mt-4 flex items-center gap-2 text-xl sm:text-2xl text-slate-200 font-light min-h-[40px]">
              <span className="font-semibold text-white">Soluções:</span>
              <span className="text-[#facc15] font-medium border-b-2 border-[#d6001c] pb-0.5">
                {typedPhrases[typedIndex]}
              </span>
            </div>

            <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              O padrão de referência no transporte pesado rodoviário e fora-de-estrada. Projetado para proporcionar o menor custo por quilômetro rodado e a maior produtividade para sua frota.
            </p>

            {/* Quick Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                id="hero-explore-btn"
                onClick={() => scrollTo('portfolio')}
                className="inline-flex items-center gap-2 bg-[#d6001c] hover:bg-red-700 text-white font-bold px-6 py-3.5 rounded-lg shadow-lg hover:shadow-red-600/30 transition-all text-sm uppercase tracking-wider"
              >
                <Truck size={18} />
                Explorar Modelos
              </button>
              <button
                id="hero-quote-btn"
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center gap-2 bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 font-semibold px-6 py-3.5 rounded-lg transition-all text-sm"
              >
                <Phone size={18} />
                Falar com Consultor
              </button>
            </div>

            {/* Key Value Badges */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-slate-800/80">
              <div>
                <p className="text-2xl font-black text-white">8%</p>
                <p className="text-xs text-slate-400">Menos Combustível</p>
              </div>
              <div>
                <p className="text-2xl font-black text-[#facc15]">770 cv</p>
                <p className="text-xs text-slate-400">Potência Máxima V8</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white">+50 mil</p>
                <p className="text-xs text-slate-400">Veículos Conectados</p>
              </div>
              <div>
                <p className="text-2xl font-black text-[#d6001c]">+150</p>
                <p className="text-xs text-slate-400">Pontos de Atendimento</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. ABOUT SECTION */}
        <section id="about" className="py-20 px-6 md:px-12 bg-white">
          <div className="max-w-6xl mx-auto">
            {/* Section Title */}
            <div className="mb-12">
              <div className="flex items-center gap-2">
                <span className="w-8 h-1 bg-[#d6001c]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#041e42]">Sobre a Scania</span>
              </div>
              <h2 className="text-3xl font-black text-[#041e42] mt-2 uppercase tracking-tight">
                Engenharia de Ponta e Paixão pelo Transporte
              </h2>
              <p className="text-slate-600 mt-2 max-w-3xl leading-relaxed">
                Fundada em 1891 na Suécia e instalada desde 1957 em São Bernardo do Campo (SP), a Scania revolucionou as estradas brasileiras. Aliamos robustez, conforto inigualável para o motorista e as mais rigorosas metas de redução de emissões do setor automotivo.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Featured Image */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-100 group">
                  <img
                    src="https://images.unsplash.com/photo-1591768793355-74d04bb6608f?auto=format&fit=crop&w=800&q=80"
                    alt="Scania Super 560 R"
                    className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-[#041e42] via-[#041e42]/80 to-transparent p-5 text-white">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#d6001c]">Trem de Força Super</p>
                    <p className="text-lg font-bold">Scania 560 R Highline</p>
                    <p className="text-xs text-slate-300">Conforto de classe mundial e consumo otimizado.</p>
                  </div>
                </div>
              </div>

              {/* Specifications & Overview */}
              <div className="lg:col-span-7">
                <h3 className="text-xl font-bold text-[#041e42] mb-3">
                  Soluções Sob Medida para Cada Perfil de Carga
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Seja no agronegócio puxando grãos em bitrens e rodotrens, no transporte frigorífico veloz, na severidade da mineração ou na distribuição urbana noturna, nossa linha entrega disponibilidade mecânica ininterrupta e máxima rentabilidade líquida por viagem.
                </p>

                {/* Specification Grid (as in iPortfolio about section) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-6 text-sm py-4 border-y border-slate-200">
                  <div className="flex items-center gap-2">
                    <ChevronRight size={16} className="text-[#d6001c] shrink-0" />
                    <span className="font-semibold text-slate-800">Fábrica Matriz:</span>
                    <span className="text-slate-600">São Bernardo do Campo - SP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight size={16} className="text-[#d6001c] shrink-0" />
                    <span className="font-semibold text-slate-800">Faixa de Potência:</span>
                    <span className="text-slate-600">280 cv a 770 cv (V8)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight size={16} className="text-[#d6001c] shrink-0" />
                    <span className="font-semibold text-slate-800">Transmissão:</span>
                    <span className="text-slate-600">Opticruise Automatizada</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight size={16} className="text-[#d6001c] shrink-0" />
                    <span className="font-semibold text-slate-800">Opções de Combustível:</span>
                    <span className="text-slate-600">Diesel, GNC, Biometano e Elétrico</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight size={16} className="text-[#d6001c] shrink-0" />
                    <span className="font-semibold text-slate-800">Conectividade:</span>
                    <span className="text-slate-600">Telemetria Scania Fleet Care</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight size={16} className="text-[#d6001c] shrink-0" />
                    <span className="font-semibold text-slate-800">Rede de Suporte:</span>
                    <span className="text-slate-600">+150 pontos em todo o Brasil</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight size={16} className="text-[#d6001c] shrink-0" />
                    <span className="font-semibold text-slate-800">Assistência:</span>
                    <span className="text-slate-600">Scania Assistance 24 Horas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight size={16} className="text-[#d6001c] shrink-0" />
                    <span className="font-semibold text-slate-800">Financiamento:</span>
                    <span className="text-slate-600">Scania Banco e Consórcio</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                    <CheckCircle size={14} />
                    Atende normas Proconve P8 (Euro 6)
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200">
                    <CheckCircle size={14} />
                    Garantia estendida de trem de força
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. STATS SECTION */}
        <section id="stats" className="py-16 px-6 md:px-12 bg-slate-900 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex items-start gap-4 p-5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <div className="p-3 rounded-lg bg-[#d6001c] text-white shrink-0">
                  <Truck size={24} />
                </div>
                <div>
                  <h4 className="text-3xl font-black text-white">+50.000</h4>
                  <p className="text-sm font-semibold text-slate-200 mt-1">Caminhões Conectados</p>
                  <p className="text-xs text-slate-400 mt-0.5">Gerando inteligência operacional no país.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <div className="p-3 rounded-lg bg-[#004481] text-white shrink-0">
                  <TrendingDown size={24} />
                </div>
                <div>
                  <h4 className="text-3xl font-black text-white">Até 8%</h4>
                  <p className="text-sm font-semibold text-slate-200 mt-1">Economia de Diesel</p>
                  <p className="text-xs text-slate-400 mt-0.5">Com o novo trem de força Scania Super.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <div className="p-3 rounded-lg bg-[#d6001c] text-white shrink-0">
                  <Zap size={24} />
                </div>
                <div>
                  <h4 className="text-3xl font-black text-white">770 CV</h4>
                  <p className="text-sm font-semibold text-slate-200 mt-1">Potência Recorde V8</p>
                  <p className="text-xs text-slate-400 mt-0.5">Maior torque do mercado com 3.700 Nm.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <div className="p-3 rounded-lg bg-[#004481] text-white shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-3xl font-black text-white">+150</h4>
                  <p className="text-sm font-semibold text-slate-200 mt-1">Pontos de Atendimento</p>
                  <p className="text-xs text-slate-400 mt-0.5">Ampla cobertura em todo território nacional.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. SKILLS / TECNOLOGIA E EFICIÊNCIA */}
        <section id="skills" className="py-20 px-6 md:px-12 bg-slate-50 border-y border-slate-200">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <div className="flex items-center gap-2">
                <span className="w-8 h-1 bg-[#d6001c]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#041e42]">Engenharia & Pilares</span>
              </div>
              <h2 className="text-3xl font-black text-[#041e42] mt-2 uppercase tracking-tight">
                Eficiência Operacional Comprovada
              </h2>
              <p className="text-slate-600 mt-2 max-w-3xl text-sm leading-relaxed">
                Cada caminhão Scania é fruto de mais de um século de pesquisa aerodinâmica e inovação mecatrônica. Nossos índices de desempenho lideram todos os comparativos de mercado.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Skill 1 */}
              <div>
                <div className="flex justify-between items-center mb-1 text-sm font-bold text-slate-800">
                  <span className="flex items-center gap-2">
                    <Gauge size={16} className="text-[#d6001c]" />
                    Eficiência Térmica do Trem de Força Super
                  </span>
                  <span className="text-[#d6001c]">98%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div className="bg-[#d6001c] h-3 rounded-full transition-all duration-1000" style={{ width: '98%' }} />
                </div>
                <p className="text-xs text-slate-500 mt-1">Eficiência de queima de combustível inédita de até 50% de rendimento térmico do motor.</p>
              </div>

              {/* Skill 2 */}
              <div>
                <div className="flex justify-between items-center mb-1 text-sm font-bold text-slate-800">
                  <span className="flex items-center gap-2">
                    <Zap size={16} className="text-[#041e42]" />
                    Conectividade & Inteligência de Frota
                  </span>
                  <span className="text-[#041e42]">95%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div className="bg-[#041e42] h-3 rounded-full transition-all duration-1000" style={{ width: '95%' }} />
                </div>
                <p className="text-xs text-slate-500 mt-1">Telemetria em tempo real com relatórios de estilo de condução e manutenção preditiva.</p>
              </div>

              {/* Skill 3 */}
              <div>
                <div className="flex justify-between items-center mb-1 text-sm font-bold text-slate-800">
                  <span className="flex items-center gap-2">
                    <Shield size={16} className="text-[#d6001c]" />
                    Segurança Ativa & Assistentes ADAS
                  </span>
                  <span className="text-[#d6001c]">94%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div className="bg-[#d6001c] h-3 rounded-full transition-all duration-1000" style={{ width: '94%' }} />
                </div>
                <p className="text-xs text-slate-500 mt-1">Frenagem autônoma de emergência (AEB), alerta de faixa e controle adaptativo de velocidade.</p>
              </div>

              {/* Skill 4 */}
              <div>
                <div className="flex justify-between items-center mb-1 text-sm font-bold text-slate-800">
                  <span className="flex items-center gap-2">
                    <DollarSign size={16} className="text-[#041e42]" />
                    Valor de Revenda & Liquidez no Mercado
                  </span>
                  <span className="text-[#041e42]">99%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div className="bg-[#041e42] h-3 rounded-full transition-all duration-1000" style={{ width: '99%' }} />
                </div>
                <p className="text-xs text-slate-500 mt-1">Historicamente o caminhão mais valorizado e procurado no mercado de seminovos do Brasil.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. RESUME / GAMA DE CABINES & APLICAÇÕES (iPortfolio Resume Style) */}
        <section id="resume" className="py-20 px-6 md:px-12 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <div className="flex items-center gap-2">
                <span className="w-8 h-1 bg-[#d6001c]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#041e42]">Gama de Cabines Scania</span>
              </div>
              <h2 className="text-3xl font-black text-[#041e42] mt-2 uppercase tracking-tight">
                A Cabine Certa Para Sua Operação
              </h2>
              <p className="text-slate-600 mt-2 max-w-3xl text-sm leading-relaxed">
                A Scania utiliza o aclamado sistema modular: cabines projetadas em torno do motorista com ergonomia incomparável, máxima visibilidade periférica e acabamento premium.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Left Column - Rodoviário & Luxo */}
              <div>
                <h3 className="text-xl font-black text-[#041e42] uppercase tracking-wide mb-6 flex items-center gap-2">
                  <Truck className="text-[#d6001c]" size={20} />
                  Linhas Rodoviárias de Longa Distância
                </h3>

                <div className="space-y-8 pl-4 border-l-2 border-[#d6001c]/40 relative">
                  {/* Linha S */}
                  <div className="relative pl-6">
                    <span className="absolute -left-[23px] top-1 w-4 h-4 rounded-full bg-[#d6001c] border-2 border-white" />
                    <h4 className="text-lg font-bold text-slate-900">Cabine S — O Ápice do Conforto Premium</h4>
                    <span className="inline-block bg-[#041e42] text-white text-xs font-bold px-2.5 py-0.5 rounded-sm my-1">
                      Piso 100% Plano • Altura livre de 2,07 m
                    </span>
                    <p className="text-xs text-slate-500 font-medium">Aplicação: Rotas interestaduais, transporte de longa permanência</p>
                    <p className="text-sm text-slate-600 mt-2">
                      Concebida para o motorista que vive na estrada. Sem túnel sobre o motor, oferece espaço similar a um apartamento móvel, com cama expansível, geladeira integrada e isolamento acústico duplo.
                    </p>
                  </div>

                  {/* Linha R */}
                  <div className="relative pl-6">
                    <span className="absolute -left-[23px] top-1 w-4 h-4 rounded-full bg-[#041e42] border-2 border-white" />
                    <h4 className="text-lg font-bold text-slate-900">Cabine R — O Clássico Imbatível do Brasil</h4>
                    <span className="inline-block bg-[#d6001c] text-white text-xs font-bold px-2.5 py-0.5 rounded-sm my-1">
                      Referência em Aerodinâmica e Equilíbrio
                    </span>
                    <p className="text-xs text-slate-500 font-medium">Aplicação: Graneleiros, cargas secas, frigoríficos e tanques</p>
                    <p className="text-sm text-slate-600 mt-2">
                      O campeão de vendas das rodovias brasileiras. Excelente aerodinâmica, painel envolvente voltado ao condutor e múltiplos compartimentos de bagagem externa e interna.
                    </p>
                  </div>

                  {/* Linha G */}
                  <div className="relative pl-6">
                    <span className="absolute -left-[23px] top-1 w-4 h-4 rounded-full bg-[#041e42] border-2 border-white" />
                    <h4 className="text-lg font-bold text-slate-900">Cabine G — Versatilidade e Agilidade Rodoviária</h4>
                    <span className="inline-block bg-slate-700 text-white text-xs font-bold px-2.5 py-0.5 rounded-sm my-1">
                      Acesso Facilitado • Excelente Custo-Benefício
                    </span>
                    <p className="text-xs text-slate-500 font-medium">Aplicação: Distribuição regional pesada, rotas médias e apoio logístico</p>
                    <p className="text-sm text-slate-600 mt-2">
                      Facilidade de entrada com degraus baixos, cabine leve que maximiza a capacidade de carga líquida no semirreboque.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Severidade & Distribuição */}
              <div>
                <h3 className="text-xl font-black text-[#041e42] uppercase tracking-wide mb-6 flex items-center gap-2">
                  <Shield className="text-[#041e42]" size={20} />
                  Aplicações Especiais & Severidade XT
                </h3>

                <div className="space-y-8 pl-4 border-l-2 border-[#041e42]/40 relative">
                  {/* Linha XT */}
                  <div className="relative pl-6">
                    <span className="absolute -left-[23px] top-1 w-4 h-4 rounded-full bg-[#d6001c] border-2 border-white" />
                    <h4 className="text-lg font-bold text-slate-900">Linha XT — Fora-de-Estrada e Mineração</h4>
                    <span className="inline-block bg-amber-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-sm my-1">
                      Parachoque de Aço • Ângulo de Ataque 25°
                    </span>
                    <p className="text-xs text-slate-500 font-medium">Aplicação: Usinas de cana-de-açúcar, mineração e construção civil pesada</p>
                    <p className="text-sm text-slate-600 mt-2">
                      Construído para não parar sob nenhuma circunstância. Protetor de faróis, suspensão reforçada de feixes parabólicos e pino de reboque homologado para até 40 toneladas.
                    </p>
                  </div>

                  {/* Linha P */}
                  <div className="relative pl-6">
                    <span className="absolute -left-[23px] top-1 w-4 h-4 rounded-full bg-[#041e42] border-2 border-white" />
                    <h4 className="text-lg font-bold text-slate-900">Cabine P — Manobrabilidade Urbana</h4>
                    <span className="inline-block bg-slate-700 text-white text-xs font-bold px-2.5 py-0.5 rounded-sm my-1">
                      Visibilidade Total • Fácil Acesso
                    </span>
                    <p className="text-xs text-slate-500 font-medium">Aplicação: Centros de distribuição urbana, coleta de resíduos e betoneiras</p>
                    <p className="text-sm text-slate-600 mt-2">
                      Posicionamento baixo com grande área envidraçada e espelhos de amplo ângulo que eliminam pontos cegos no tráfego congestionado das grandes cidades.
                    </p>
                  </div>

                  {/* Transição Energética */}
                  <div className="relative pl-6">
                    <span className="absolute -left-[23px] top-1 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white" />
                    <h4 className="text-lg font-bold text-slate-900">Gás Natural, Biometano e 100% Elétrico</h4>
                    <span className="inline-block bg-emerald-700 text-white text-xs font-bold px-2.5 py-0.5 rounded-sm my-1">
                      Transição Energética Real
                    </span>
                    <p className="text-xs text-slate-500 font-medium">Aplicação: Frotas corporativas com compromissos de sustentabilidade ESG</p>
                    <p className="text-sm text-slate-600 mt-2">
                      Caminhões já homologados e operando comercialmente no Brasil com redução drástica de emissões e autonomia competitiva.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. PORTFOLIO / SHOWROOM DE MODELOS */}
        <section id="portfolio" className="py-20 px-6 md:px-12 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10 text-center sm:text-left">
              <div className="flex items-center gap-2">
                <span className="w-8 h-1 bg-[#d6001c]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#041e42]">Showroom Scania</span>
              </div>
              <h2 className="text-3xl font-black text-[#041e42] mt-2 uppercase tracking-tight">
                Modelos em Destaque
              </h2>
              <p className="text-slate-600 mt-2 max-w-2xl text-sm">
                Selecione os caminhões para ver especificações técnicas completas de trem de força, torque e capacidade de carga.
              </p>
            </div>

            {/* Filter Tabs (iPortfolio style) */}
            <div className="flex flex-wrap items-center gap-2 mb-10">
              {[
                { key: 'all', label: 'Todos os Veículos' },
                { key: 'super', label: 'Linha Scania Super' },
                { key: 'v8', label: 'Motores V8 (King)' },
                { key: 'gas_electric', label: 'Sustentáveis (Gás/BEV)' },
                { key: 'xt', label: 'Operação Severa XT' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setPortfolioFilter(tab.key as any)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                    portfolioFilter === tab.key
                      ? 'bg-[#041e42] text-white shadow-md'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Truck Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTrucks.map((truck) => (
                <div
                  key={truck.id}
                  id={`truck-card-${truck.id}`}
                  className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  {/* Card Image */}
                  <div className="relative h-56 overflow-hidden bg-slate-900">
                    <img
                      src={truck.image}
                      alt={truck.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#041e42]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {truck.categoryLabel}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#d6001c] transition-colors">
                        {truck.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {truck.subtitle}
                      </p>

                      {/* Tech Pills */}
                      <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100 text-xs">
                        <div className="bg-slate-50 p-2 rounded-md">
                          <span className="text-[10px] text-slate-400 block font-semibold uppercase">Potência</span>
                          <span className="font-bold text-slate-800">{truck.power.split(' ')[0]} cv</span>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-md">
                          <span className="text-[10px] text-slate-400 block font-semibold uppercase">Torque</span>
                          <span className="font-bold text-slate-800">{truck.torque.split(' ')[0]} Nm</span>
                        </div>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-500">
                        {truck.pbtc}
                      </span>
                      <button
                        onClick={() => setSelectedTruck(truck)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#d6001c] hover:text-red-700 transition-colors uppercase tracking-wider"
                      >
                        Ver Detalhes
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TECHNICAL DETAILS MODAL */}
        {selectedTruck && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
              <div className="relative h-64 bg-slate-900">
                <img
                  src={selectedTruck.image}
                  alt={selectedTruck.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedTruck(null)}
                  className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white p-2 rounded-full transition-colors"
                  aria-label="Fechar modal"
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-3 rounded-lg text-white">
                  <span className="text-xs font-bold text-[#d6001c] uppercase tracking-widest">{selectedTruck.categoryLabel}</span>
                  <h3 className="text-xl font-black">{selectedTruck.name}</h3>
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {selectedTruck.description}
                </p>

                <h4 className="text-xs font-bold uppercase tracking-widest text-[#041e42] mb-3">
                  Ficha Técnica Resumida
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
                  <div>
                    <span className="font-semibold text-slate-500 block">Potência:</span>
                    <span className="font-bold text-slate-900">{selectedTruck.power}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-500 block">Torque Máximo:</span>
                    <span className="font-bold text-slate-900">{selectedTruck.torque}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-500 block">Câmbio:</span>
                    <span className="font-bold text-slate-900">{selectedTruck.transmission}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-500 block">Combustível:</span>
                    <span className="font-bold text-slate-900">{selectedTruck.fuel}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-500 block">Capacidade / PBTC:</span>
                    <span className="font-bold text-slate-900">{selectedTruck.pbtc}</span>
                  </div>
                </div>

                <h4 className="text-xs font-bold uppercase tracking-widest text-[#041e42] mb-2">
                  Destaques da Configuração
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 mb-6">
                  {selectedTruck.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-emerald-600 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setFormData(prev => ({ ...prev, modelInterest: selectedTruck.name }));
                      setSelectedTruck(null);
                      scrollTo('contact');
                    }}
                    className="flex-1 bg-[#d6001c] hover:bg-red-700 text-white font-bold py-3 rounded-lg text-xs uppercase tracking-wider transition-colors text-center"
                  >
                    Solicitar Cotação Deste Modelo
                  </button>
                  <button
                    onClick={() => setSelectedTruck(null)}
                    className="px-5 py-3 border border-slate-300 hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-700 transition-colors"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 7. SERVICES SECTION */}
        <section id="services" className="py-20 px-6 md:px-12 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <div className="flex items-center gap-2">
                <span className="w-8 h-1 bg-[#d6001c]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#041e42]">Serviços & Pós-Venda</span>
              </div>
              <h2 className="text-3xl font-black text-[#041e42] mt-2 uppercase tracking-tight">
                Soluções Completas de Transporte
              </h2>
              <p className="text-slate-600 mt-2 max-w-3xl text-sm leading-relaxed">
                Comprar um Scania é ter ao seu lado um ecossistema que cuida do veículo do primeiro ao último quilômetro, reduzindo paradas não programadas e elevando sua margem operacional.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Settings,
                  title: 'Manutenção com Planos Flexíveis',
                  desc: 'As revisões são agendadas com base no desgaste real das peças apurado pelos sensores de telemetria, evitando manutenções prematuras ou atrasadas.'
                },
                {
                  icon: Gauge,
                  title: 'Serviços Conectados Scania',
                  desc: 'Acompanhe consumo médio, emissões, localização e o score de direção de cada motorista pelo portal de frotas ou aplicativo mobile.'
                },
                {
                  icon: DollarSign,
                  title: 'Scania Banco & Consórcio',
                  desc: 'Condições de CDC, leasing operacional e consórcio com taxas competitivas e planos estruturados para frotistas e transportadores autônomos.'
                },
                {
                  icon: Shield,
                  title: 'Peças Genuínas & Linha Reman',
                  desc: 'Componentes originais com garantia de 1 ano sem limite de quilometragem e peças remanufaturadas de fábrica com o mesmo rigor de qualidade.'
                },
                {
                  icon: Award,
                  title: 'Scania Driver Training',
                  desc: 'Treinamento prático especializado para motoristas, focado em direção defensiva e condução econômica, reduzindo até 10% do consumo de combustível.'
                },
                {
                  icon: Clock,
                  title: 'Scania Assistance 24/7',
                  desc: 'Atendimento emergencial 24 horas por dia, 365 dias por ano, com socorro mecânico dedicado e técnicos treinados para atendimento in loco.'
                }
              ].map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={index}
                    className="p-6 rounded-xl border border-slate-200 hover:border-[#d6001c] hover:shadow-lg transition-all group bg-slate-50/50"
                  >
                    <div className="w-12 h-12 rounded-lg bg-[#041e42] text-white flex items-center justify-center mb-4 group-hover:bg-[#d6001c] transition-colors">
                      <Icon size={22} />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 8. TESTIMONIALS SECTION */}
        <section id="testimonials" className="py-20 px-6 md:px-12 bg-slate-900 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <div className="flex items-center gap-2">
                <span className="w-8 h-1 bg-[#d6001c]" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Depoimentos</span>
              </div>
              <h2 className="text-3xl font-black text-white mt-2 uppercase tracking-tight">
                A Palavra de Quem Vive a Estrada
              </h2>
              <p className="text-slate-400 mt-2 max-w-2xl text-sm">
                Empresas e frotistas compartilham os resultados obtidos com os caminhões e serviços Scania.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: 'Trocamos parte da nossa frota pela nova linha Scania Super 560 R. A economia de diesel foi constatada já no primeiro mês: superou 8,5% nas rotas de grãos do Centro-Oeste.',
                  author: 'Marcos Vinicius Andrade',
                  role: 'Diretor de Operações — TransAndrade Log',
                  truck: 'Frota de 42 caminhões Scania Super'
                },
                {
                  quote: 'O Scania 770 S V8 é incomparável para composições pesadas de 74t. A velocidade média nas serras aumentou sem elevar o consumo. O conforto da cabine de piso plano é de primeiro mundo.',
                  author: 'Eduardo Silveira',
                  role: 'Proprietário & Frotista — Transportes Silveira',
                  truck: 'Scania 770 S V8 e R 540'
                },
                {
                  quote: 'Adotamos os caminhões a Gás / Biometano para abastecer os grandes centros. Conseguimos novos contratos com clientes multinacionais focados em descarbonização e redução de emissões.',
                  author: 'Renata Albuquerque',
                  role: 'Gerente de Sustentabilidade — Rota Verde Transportes',
                  truck: '15 unidades Scania 460 R a Gás'
                }
              ].map((testi, i) => (
                <div key={i} className="bg-slate-800/70 p-6 rounded-xl border border-slate-700/80 flex flex-col justify-between">
                  <p className="text-sm text-slate-300 italic leading-relaxed mb-6">
                    "{testi.quote}"
                  </p>
                  <div className="pt-4 border-t border-slate-700">
                    <p className="text-sm font-bold text-white">{testi.author}</p>
                    <p className="text-xs text-[#d6001c] font-medium">{testi.role}</p>
                    <p className="text-[11px] text-slate-400 mt-1">{testi.truck}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. CONTACT SECTION */}
        <section id="contact" className="py-20 px-6 md:px-12 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <div className="flex items-center gap-2">
                <span className="w-8 h-1 bg-[#d6001c]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#041e42]">Atendimento & Propostas</span>
              </div>
              <h2 className="text-3xl font-black text-[#041e42] mt-2 uppercase tracking-tight">
                Fale com a Concessionária Scania
              </h2>
              <p className="text-slate-600 mt-2 max-w-2xl text-sm">
                Solicite uma proposta personalizada de aquisição, simulação de consórcio ou agendamento de test-drive técnico.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Contact Info (iPortfolio contact info cards) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#041e42] text-white flex items-center justify-center shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Localização Matriz & Fábrica:</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Av. José Odorizzi, 151 — Vila Euro<br />
                        São Bernardo do Campo - SP, CEP 09810-902
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#d6001c] text-white flex items-center justify-center shrink-0">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Central de Vendas & Atendimento:</h4>
                      <p className="text-xs text-slate-600 mt-1">
                        0800 019 4224 (Ligação Gratuita)<br />
                        WhatsApp Vendas: (11) 98765-4321
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#041e42] text-white flex items-center justify-center shrink-0">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">E-mail Comercial:</h4>
                      <p className="text-xs text-slate-600 mt-1">
                        contato.brasil@scania.com.br<br />
                        vendas.frotas@scania.com.br
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#041e42] text-white flex items-center justify-center shrink-0">
                      <Clock size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Horário de Funcionamento:</h4>
                      <p className="text-xs text-slate-600 mt-1">
                        Segunda a Sexta: 08h00 às 18h00<br />
                        Plantão de Peças & Scania Assistance: 24 Horas
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact / Quotation Form */}
              <div className="lg:col-span-7">
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                  <h3 className="text-lg font-bold text-[#041e42] mb-1">
                    Solicitar Cotação / Contato Comercial
                  </h3>
                  <p className="text-xs text-slate-500 mb-6">
                    Preencha o formulário e um consultor técnico Scania entrará em contato em até 2 horas úteis.
                  </p>

                  {formSubmitted ? (
                    <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-xl text-center">
                      <CheckCircle className="mx-auto text-emerald-600 mb-2" size={36} />
                      <h4 className="text-base font-bold text-emerald-900">Solicitação Enviada com Sucesso!</h4>
                      <p className="text-xs text-emerald-700 mt-1">
                        Recebemos seus dados. Nosso consultor especializado da rede Scania entrará em contato via WhatsApp e e-mail.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                            Seu Nome Completo *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Ex: Carlos Silva"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#d6001c] bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                            E-mail Corporativo *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="carlos@transportes.com.br"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#d6001c] bg-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                            Telefone / WhatsApp *
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="(11) 99999-9999"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#d6001c] bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                            Tamanho Atual da Frota
                          </label>
                          <select
                            value={formData.fleetSize}
                            onChange={(e) => setFormData({ ...formData, fleetSize: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#d6001c] bg-white"
                          >
                            <option value="">Selecione...</option>
                            <option value="autonomo">Motorista Autônomo (1 veículo)</option>
                            <option value="pequena">Pequena Frota (2 a 10 veículos)</option>
                            <option value="media">Média Frota (11 a 50 veículos)</option>
                            <option value="grande">Grande Frotista (+ de 50 veículos)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          Modelo de Interesse Principal
                        </label>
                        <select
                          value={formData.modelInterest}
                          onChange={(e) => setFormData({ ...formData, modelInterest: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#d6001c] bg-white font-medium"
                        >
                          {TRUCK_MODELS.map(m => (
                            <option key={m.id} value={m.name}>{m.name}</option>
                          ))}
                          <option value="consorcio">Cotação para Consórcio Scania</option>
                          <option value="outro">Outra configuração / Ônibus / Motores Industriais</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          Mensagem / Tipo de Operação
                        </label>
                        <textarea
                          rows={3}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Informe seu tipo de carga, rotas ou preferência de financiamento..."
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#d6001c] bg-white resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#d6001c] hover:bg-red-700 text-white font-bold py-3.5 px-6 rounded-lg shadow-md transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-2"
                      >
                        <Send size={16} />
                        Enviar Solicitação de Cotação
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-[#021329] text-white py-12 px-6 md:px-12 border-t border-slate-800">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <span className="text-lg font-black tracking-widest text-white uppercase">SCANIA</span>
              <span className="text-slate-600">|</span>
              <span>Template Institucional & Showroom de Frotas</span>
            </div>
            <div className="flex items-center gap-6">
              <button onClick={() => scrollTo('hero')} className="hover:text-white transition-colors">Voltar ao Topo</button>
              <button onClick={() => scrollTo('portfolio')} className="hover:text-white transition-colors">Modelos</button>
              <button onClick={() => scrollTo('services')} className="hover:text-white transition-colors">Serviços</button>
              <button onClick={() => scrollTo('contact')} className="hover:text-white transition-colors">Contato</button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
