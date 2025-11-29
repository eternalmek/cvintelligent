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
  TrendingUp,
  Menu,
  X,
  User,
  Download,
  MessageSquare
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

const LandingPage = ({ onGenerateClick, onPricing, onCoach }) => (
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
          Notre IA analyse ton profil pour créer un CV percutant et t'entraîne
          face à un recruteur virtuel.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button onClick={onGenerateClick}>
            Créer mon CV gratuitement <ArrowRight size={18} />
          </Button>
          <Button variant="secondary" onClick={onCoach}>
            Essayer le simulateur d'entretien
          </Button>
          <Button variant="ghost" onClick={onPricing}>
            Voir les tarifs
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
            <h3 className="text-xl font-bold mb-3">CV Intelligent</h3>
            <p className="text-gray-600">
              Génère un CV adapté à l'offre d'emploi. L'IA optimise la structure et le contenu pour un rendu impeccable.
            </p>
          </Card>
          <Card className="hover:-translate-y-2 transition-transform duration-300">
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-6">
              <Mic size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Coaching Entretien IA</h3>
            <p className="text-gray-600">Un simulateur unique en France pour t'entraîner en conditions réelles.</p>
          </Card>
          <Card className="hover:-translate-y-2 transition-transform duration-300">
            <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 mb-6">
              <Layout size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Lettre de Motivation</h3>
            <p className="text-gray-600">
              Génération automatique à partir de ton CV et de l'offre. Change de ton en un clic : Pro, Direct, ou Chaleureux.
            </p>
          </Card>
        </div>
      </div>
    </section>

    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">Comment ça marche ?</h2>
        <div className="grid md:grid-cols-4 gap-4 relative">
          <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gray-200 -z-10 mx-16"></div>

          {[
            { step: 1, title: 'Importe tes infos', desc: 'LinkedIn ou PDF' },
            { step: 2, title: "Colle l'offre", desc: "L'IA analyse le poste" },
            { step: 3, title: 'Génère ton CV', desc: 'Optimisé instantanément' },
            { step: 4, title: "Simule l'entretien", desc: 'Prépare-toi à gagner' }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center bg-white p-4">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow
