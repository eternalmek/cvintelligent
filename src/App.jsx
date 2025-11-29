import React, { useEffect, useRef, useState } from 'react'
import {
  FileText,
  Mic,
  CheckCircle,
  Star,
  Layout,
  ArrowRight,
  Copy,
  Loader2,
  ShieldCheck,
  TrendingUp,
  Menu,
  X
} from 'lucide-react'
import { generateCv } from './services/api'
import { startCheckout } from './utils/checkout'

const Button = ({ children, variant = 'primary', className = '', size = 'md', ...rest }) => {
  const baseStyle =
    'rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed'
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-3 text-lg'
  }
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-xl',
    secondary: 'bg-white text-indigo-900 border border-gray-200 hover:border-indigo-300 hover:bg-gray-50',
    outline: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50',
    ghost: 'text-gray-600 hover:text-indigo-600 hover:bg-gray-100 px-4 py-2'
  }

  return (
    <button type="button" className={`${baseStyle} ${sizes[size] || sizes.md} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  )
}

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${className}`}>
    {children}
  </div>
)

const Badge = ({ children, color = 'blue' }) => {
  const colors = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    purple: 'bg-purple-100 text-purple-800',
    orange: 'bg-orange-100 text-orange-800'
  }
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${colors[color] || colors.blue}`}>
      {children}
    </span>
  )
}

const useSpaRouter = () => {
  const [path, setPath] = useState(typeof window !== 'undefined' ? window.location.pathname : '/')

  useEffect(() => {
    const onPopState = () => {
      setPath(window.location.pathname || '/')
    }

    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = (nextPath) => {
    const target = nextPath || '/'
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', target)
    }
    setPath(target)
  }

  return { path, navigate }
}

const LandingPage = ({ onGenerateClick, onPricing }) => (
  <div className="flex flex-col min-h-screen">
    <section className="relative bg-slate-900 text-white pt-20 pb-32 overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      <div className="max-w-6xl mx-auto px-4 relative z-10 text-center">
        <Badge color="blue">Nouveau en France 🇫🇷</Badge>
        <h1 className="text-4xl md:text-6xl font-extrabold mt-6 mb-6 leading-tight">
          Crée un CV professionnel et <br />
          <span className="text-indigo-400">prépare ton entretien</span> avec l’IA
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
          cvintelligent.fr t’aide à décrocher plus d’entretiens en quelques minutes.
          Notre IA analyse ton profil pour créer un CV compatible ATS et t'entraîne
          face à un recruteur virtuel.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button onClick={onGenerateClick}>
            Créer mon CV gratuitement <ArrowRight size={18} />
          </Button>
          <Button variant="secondary" onClick={onPricing}>
            Découvrir les tarifs
          </Button>
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 text-gray-400 text-sm">
          <div className="flex text-yellow-400">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={16} fill="currentColor" />
            ))}
          </div>
          <span>Déjà adopté par +2000 candidats en France</span>
        </div>
      </div>
    </section>

    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="hover:-translate-y-2 transition-transform duration-300">
            <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-6">
              <FileText size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">CV Intelligent & ATS</h3>
            <p className="text-gray-600">
              Génère un CV adapté à l'offre d'emploi. L'IA optimise les mots-clés pour passer les robots des recruteurs (ATS).
            </p>
          </Card>
          <Card className="hover:-translate-y-2 transition-transform duration-300">
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-6">
              <Mic size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Coaching Entretien IA</h3>
            <p className="text-gray-600">Un simulateur unique en France. Bientôt disponible pour t'entraîner en conditions réelles.</p>
            <Badge color="orange">Coming soon</Badge>
          </Card>
          <Card className="hover:-translate-y-2 transition-transform duration-300">
            <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 mb-6">
              <Layout size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Lettre de Motivation</h3>
            <p className="text-gray-600">
              Génération automatique à partir de ton CV et de l'offre. Change de ton en un clic : Pro, Direct, ou Chaleureux.
            </p>
            <Badge color="orange">Coming soon</Badge>
          </Card>
        </div>
      </div>
    </section>

    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">Comment ça marche ?</h2>
        <div className="grid md:grid-cols-4 gap-4 relative">
          <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gray-200 -z-10 mx-16"></div>

          {[{ step: 1, title: 'Saisie ou import PDF', desc: 'Renseigne ton profil' }, { step: 2, title: "Colle l'offre", desc: "L'IA analyse le poste" }, { step: 3, title: 'Génère ton CV', desc: 'Optimisé ATS instantanément' }, { step: 4, title: "Simule l'entretien", desc: 'Prépare-toi à gagner' }].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center bg-white p-4">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-lg border-4 border-white">
                {item.step}
              </div>
              <h4 className="font-bold text-lg mb-2">{item.title}</h4>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
)

const CVBuilder = React.forwardRef(function CVBuilder(_, ref) {
  const [fullName, setFullName] = useState('Thomas Dupont')
  const [targetRole, setTargetRole] = useState('Chef de Projet Digital')
  const [userProfile, setUserProfile] = useState("5 ans d'expérience en gestion de projet agile. Maîtrise de Jira et Notion. Management d'équipe de 4 personnes.")
  const [jobDescription, setJobDescription] = useState("Recherche Chef de Projet confirmé, maîtrise méthodologie Agile, anglais courant, capacité à gérer des budgets...")
  const [loading, setLoading] = useState(false)
  const [generatedCv, setGeneratedCv] = useState('')
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)

  const sampleCvText = `PROFIL\nChef de projet expérimenté avec 5 ans d'expertise en méthodologie Agile. Passionné par l'optimisation des process et capable de gérer des budgets complexes.\n\nEXPERIENCES\nProduct Owner — TechSolutions (2020 - Présent)\n- Pilotage de la roadmap produit et augmentation de la vélocité de l'équipe de 20%.\n- Gestion des stakeholders et priorisation du backlog.\n- Mise en place des cérémonies Scrum.\n\nCOMPETENCES\nJira • Notion • Agile/Scrum • Management • Budget • Anglais C1\n\nFORMATION\nMaster Management — IAE Lyon 3 (2019)`

  const handleGenerate = async () => {
    if (!userProfile.trim() || !jobDescription.trim()) {
      setError('Merci de renseigner ton profil et la description du poste.')
      return
    }

    setLoading(true)
    setError(null)
    setGeneratedCv('')

    try {
      const payload = {
        jobDescription,
        userProfile: `${fullName} - ${targetRole}\n\n${userProfile}`
      }

      const data = await generateCv(payload)

      if (!data?.result) {
        setError('La génération a échoué, réessaie dans un instant.')
        return
      }

      setGeneratedCv(data.result)
    } catch (err) {
      console.error(err)
      setError(err.message || 'Erreur réseau')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    if (!generatedCv) return
    try {
      await navigator.clipboard.writeText(generatedCv)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('copy failed', err)
    }
  }

  return (
    <section className="bg-gray-50" ref={ref} id="cv-builder">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-start justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Créateur CV IA</h2>
            <p className="text-gray-500">Génère un CV optimisé en français à partir de ton profil et de l'offre.</p>
          </div>
          <Badge color="green">Disponible</Badge>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <Card className="space-y-4">
            {error && <p className="text-sm text-red-600 bg-red-50 border border-red-100 p-3 rounded">{error}</p>}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom et prénom</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3"
                placeholder="Ex: Thomas Dupont"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Métier visé</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3"
                placeholder="Ex: Commercial BtoB"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ton profil / ton CV (ou import PDF)</label>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 h-32"
                placeholder="Colle ton expérience ici..."
                value={userProfile}
                onChange={(e) => setUserProfile(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">L'offre d'emploi (pour le score ATS)</label>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 h-32 bg-blue-50 border-blue-200"
                placeholder="Colle l'annonce ici..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>
            <Button className="w-full" onClick={handleGenerate} disabled={loading}>
              {loading ? (
                <span className="flex items-center">
                  <Loader2 className="mr-2 animate-spin" /> Génération de ton CV...
                </span>
              ) : (
                <>
                  Générer mon CV optimisé <ArrowRight size={18} />
                </>
              )}
            </Button>
          </Card>

          <Card className="bg-gray-50 border-gray-200 min-h-[520px] relative">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <ShieldCheck size={18} className="text-emerald-600" /> Résultat IA
                </h3>
                <p className="text-xs text-gray-500">Texte brut prêt à être stylisé</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-emerald-700">
                <TrendingUp size={16} /> Optimisé pour l'ATS
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 max-h-[420px] overflow-y-auto">
              {loading ? (
                <div className="text-center text-gray-500">
                  <Loader2 className="mx-auto mb-2 animate-spin" />
                  <p>Génération en cours...</p>
                </div>
              ) : generatedCv ? (
                <pre className="whitespace-pre-wrap text-gray-800 leading-6 text-sm">{generatedCv}</pre>
              ) : (
                <pre className="whitespace-pre-wrap text-gray-400 leading-6 text-sm">{sampleCvText}</pre>
              )}
            </div>

            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleCopy}
                disabled={!generatedCv}
                className="px-3"
              >
                <Copy size={16} /> {copied ? 'Copié !' : 'Copier le texte'}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
})

const InterviewCoach = () => (
  <section className="bg-white">
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-4">
        <Mic className="text-indigo-600" />
        <h2 className="text-2xl font-bold">Coach Entretien IA</h2>
        <Badge color="orange">Coming soon</Badge>
      </div>
      <p className="text-gray-600 max-w-3xl mb-6">
        Nous finalisons un simulateur complet d'entretien. L'expérience inclura questions orales, feedback et scoring. L'outil sera activé dès qu'il sera prêt.
      </p>
      <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-6 text-gray-500 flex items-center justify-between flex-col md:flex-row gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-full border border-gray-200 flex items-center justify-center">
            <Mic />
          </div>
          <div>
            <p className="font-semibold text-gray-700">Simulateur en préparation</p>
            <p className="text-sm">Reste à l'écoute : notifications dans l'app dès l'ouverture.</p>
          </div>
        </div>
        <Button variant="outline" disabled title="Bientôt disponible">
          Arrive bientôt
        </Button>
      </div>
    </div>
  </section>
)

const Pricing = ({ onNavigate }) => {
  const [checkoutLoading, setCheckoutLoading] = useState(null)
  const [checkoutError, setCheckoutError] = useState(null)

  const handleCheckout = async (plan) => {
    setCheckoutError(null)
    setCheckoutLoading(plan)

    try {
      await startCheckout(plan)
    } catch (err) {
      console.error(err)
      setCheckoutError(err.message || 'Erreur réseau pendant le paiement')
    } finally {
      setCheckoutLoading(null)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Investis dans ta carrière</h2>
        <p className="text-gray-500">Des tarifs simples, transparents et sans engagement.</p>
        {checkoutError && <p className="text-red-600 text-sm mt-2">{checkoutError}</p>}
      </div>

      <div className="grid md:grid-cols-3 gap-8 items-start">
        <Card className="border-gray-200">
          <h3 className="text-xl font-bold mb-2">Starter</h3>
          <div className="text-4xl font-bold mb-6">9€<span className="text-base font-normal text-gray-500">/mois</span></div>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle size={16} className="text-green-500" /> 2 CV IA / mois</li>
            <li className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle size={16} className="text-green-500" /> 1 lettre de motivation</li>
            <li className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle size={16} className="text-green-500" /> Mini coaching entretien</li>
          </ul>
          <Button variant="outline" className="w-full" onClick={() => handleCheckout('starter')} disabled={checkoutLoading === 'starter'}>
            {checkoutLoading === 'starter' ? 'Redirection...' : 'Choisir Starter'}
          </Button>
        </Card>

        <Card className="border-indigo-600 ring-2 ring-indigo-600 ring-offset-2 relative">
          <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAIRE</div>
          <h3 className="text-xl font-bold mb-2 text-indigo-900">Pro</h3>
          <div className="text-4xl font-bold mb-6">19€<span className="text-base font-normal text-gray-500">/mois</span></div>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-2 text-sm text-gray-800"><CheckCircle size={16} className="text-indigo-600" /> CV et lettres illimités</li>
            <li className="flex items-center gap-2 text-sm text-gray-800"><CheckCircle size={16} className="text-indigo-600" /> Feedback ATS détaillé</li>
            <li className="flex items-center gap-2 text-sm text-gray-800"><CheckCircle size={16} className="text-indigo-600" /> Coaching entretien illimité</li>
            <li className="flex items-center gap-2 text-sm text-gray-800"><CheckCircle size={16} className="text-indigo-600" /> Modèles premium</li>
          </ul>
          <Button className="w-full" onClick={() => handleCheckout('pro')} disabled={checkoutLoading === 'pro'}>
            {checkoutLoading === 'pro' ? 'Redirection...' : 'Choisir Pro'}
          </Button>
        </Card>

        <Card className="bg-gray-50 border-gray-200">
          <h3 className="text-xl font-bold mb-2">Ultimate</h3>
          <div className="text-4xl font-bold mb-6">49€<span className="text-base font-normal text-gray-500">/mois</span></div>
          <p className="text-sm text-gray-500 mb-6">Pour ceux qui veulent une préparation complète et prioritaire.</p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle size={16} className="text-gray-400" /> Pack complet CV + Lettre bilingue</li>
            <li className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle size={16} className="text-gray-400" /> Sessions de coaching prioritaire</li>
            <li className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle size={16} className="text-gray-400" /> Rapport personnalisé</li>
          </ul>
          <Button variant="secondary" className="w-full" onClick={() => handleCheckout('ultimate')} disabled={checkoutLoading === 'ultimate'}>
            {checkoutLoading === 'ultimate' ? 'Redirection...' : 'Choisir Ultimate'}
          </Button>
        </Card>
      </div>

      {onNavigate && (
        <div className="text-center mt-12">
          <Button variant="ghost" onClick={() => onNavigate('/')}>Retour à l'accueil</Button>
        </div>
      )}
    </div>
  )
}

const SuccessPage = ({ onNavigate }) => (
  <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
    <div className="mx-auto h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
      <CheckCircle size={32} />
    </div>
    <h2 className="text-3xl font-bold">Paiement confirmé ✅</h2>
    <p className="text-gray-600">Ton accès premium est actif. Tu peux générer autant de CV et lettres que tu veux.</p>
    <Button onClick={() => onNavigate('/')}>Retour à l'accueil</Button>
  </div>
)

const CancelPage = ({ onNavigate }) => (
  <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
    <div className="mx-auto h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
      <X size={32} />
    </div>
    <h2 className="text-3xl font-bold">Paiement annulé</h2>
    <p className="text-gray-600">Tu peux relancer le paiement à tout moment depuis la page Tarifs.</p>
    <Button onClick={() => onNavigate('/pricing')} variant="secondary">Revenir aux tarifs</Button>
  </div>
)

const LayoutShell = ({ path, navigate, goToBuilder, children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="font-sans text-slate-800 bg-white min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <button className="flex items-center gap-2 font-bold text-xl" onClick={() => navigate('/') }>
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <FileText size={20} />
              </div>
              <span>cvintelligent<span className="text-indigo-600">.fr</span></span>
            </button>

            <div className="hidden md:flex items-center gap-8">
              <button onClick={goToBuilder} className={`text-sm font-medium hover:text-indigo-600 ${path === '/' ? 'text-indigo-600' : 'text-gray-600'}`}>
                Créateur CV
              </button>
              <button onClick={() => navigate('/pricing')} className={`text-sm font-medium hover:text-indigo-600 ${path === '/pricing' ? 'text-indigo-600' : 'text-gray-600'}`}>
                Tarifs
              </button>
              <Button size="sm" onClick={goToBuilder} className="py-2 px-4 text-sm">
                Commencer
              </Button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-600">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 p-4 space-y-4 shadow-lg absolute w-full">
            <button onClick={() => { setIsMenuOpen(false); goToBuilder() }} className="block w-full text-left font-medium text-gray-700 py-2">Créateur CV</button>
            <button onClick={() => { setIsMenuOpen(false); navigate('/pricing') }} className="block w-full text-left font-medium text-gray-700 py-2">Tarifs</button>
            <Button className="w-full justify-center" onClick={() => { setIsMenuOpen(false); goToBuilder() }}>Commencer</Button>
          </div>
        )}
      </nav>

      <main className="flex-grow">{children}</main>

      <footer className="bg-slate-900 text-gray-400 py-12 mt-auto">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-white text-lg mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <FileText size={18} />
              </div>
              <span>cvintelligent.fr</span>
            </div>
            <p className="text-sm text-gray-400">L'IA française qui t'aide à décrocher ton prochain job.</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Fonctionnalités</h4>
            <ul className="space-y-2 text-sm">
              <li>CV optimisé ATS</li>
              <li>Lettre de motivation</li>
              <li>Coach entretien IA</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Ressources</h4>
            <ul className="space-y-2 text-sm">
              <li>Guide ATS</li>
              <li>FAQ</li>
              <li>Support</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Légal</h4>
            <ul className="space-y-2 text-sm">
              <li>CGU</li>
              <li>Confidentialité</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}

const HomePage = ({ navigate }) => {
  const builderRef = useRef(null)

  const scrollToBuilder = () => {
    if (builderRef.current) {
      builderRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <LandingPage onGenerateClick={scrollToBuilder} onPricing={() => navigate('/pricing')} />
      <CVBuilder ref={builderRef} />
      <InterviewCoach />
      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-16 flex items-center justify-between flex-col md:flex-row gap-4">
          <div>
            <h3 className="text-2xl font-bold mb-2">Prêt à booster tes candidatures ?</h3>
            <p className="text-gray-600">Choisis un plan et accède aux fonctionnalités premium.</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={scrollToBuilder}>Tester gratuitement</Button>
            <Button variant="secondary" onClick={() => navigate('/pricing')}>Voir les tarifs</Button>
          </div>
        </div>
      </section>
    </>
  )
}

const getViewFromPath = (path) => {
  if (path.startsWith('/pricing')) return 'pricing'
  if (path.startsWith('/success')) return 'success'
  if (path.startsWith('/cancel')) return 'cancel'
  return 'home'
}

const App = () => {
  const { path, navigate } = useSpaRouter()

  const scrollToBuilder = () => {
    if (path !== '/') {
      navigate('/')
      setTimeout(() => {
        document.getElementById('cv-builder')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
      return
    }
    document.getElementById('cv-builder')?.scrollIntoView({ behavior: 'smooth' })
  }

  const view = getViewFromPath(path)

  const renderView = () => {
    switch (view) {
      case 'pricing':
        return <Pricing onNavigate={navigate} />
      case 'success':
        return <SuccessPage onNavigate={navigate} />
      case 'cancel':
        return <CancelPage onNavigate={navigate} />
      default:
        return <HomePage navigate={navigate} />
    }
  }

  return (
    <LayoutShell path={path} navigate={navigate} goToBuilder={scrollToBuilder}>
      {renderView()}
    </LayoutShell>
  )
}

export default App
