import React, { useEffect, useState } from 'react'
import {
  FileText,
  Mic,
  CheckCircle,
  Star,
  Layout,
  ArrowRight,
  Download,
  Cpu,
  Menu,
  X,
  ShieldCheck,
  TrendingUp
} from 'lucide-react'
import { createCheckoutSession, generateCv, sendCoachMessage } from './services/api'

/*
  Single-file app container.
  - LinkedIn option removed (remplacé par import PDF / saisie manuelle)
  - UI components basiques fournis
  - Simulations locales remplacées par appels API configurables via VITE_API_BASE_URL
*/

const Button = ({ children, variant = 'primary', className = '', size = 'md', onClick, ...rest }) => {
  const baseStyle = 'rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2'
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
    <button type="button" className={`${baseStyle} ${sizes[size] || sizes.md} ${variants[variant]} ${className}`} onClick={onClick} {...rest}>
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

const LandingPage = ({ onNavigate }) => (
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
          <Button onClick={() => onNavigate('builder')}>
            Créer mon CV gratuitement <ArrowRight size={18} />
          </Button>
          <Button variant="secondary" onClick={() => onNavigate('coach')}>
            Essayer le simulateur d'entretien
          </Button>
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 text-gray-400 text-sm">
          <div className="flex text-yellow-400">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
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
            <p className="text-gray-600">
              Un simulateur unique en France. Réponds aux questions orales/écrites et reçois un feedback immédiat sur ta confiance.
            </p>
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
            { step: 1, title: 'Saisie ou import PDF', desc: 'Renseigne ton profil' },
            { step: 2, title: "Colle l'offre", desc: "L'IA analyse le poste" },
            { step: 3, title: 'Génère ton CV', desc: 'Optimisé ATS instantanément' },
            { step: 4, title: "Simule l'entretien", desc: 'Prépare-toi à gagner' }
          ].map((item, idx) => (
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

const CVBuilder = () => {
  const [fullName, setFullName] = useState('Thomas Dupont')
  const [targetRole, setTargetRole] = useState('Chef de Projet Digital')
  const [userProfile, setUserProfile] = useState("5 ans d'expérience en gestion de projet agile. Maîtrise de Jira et Notion. Management d'équipe de 4 personnes.")
  const [jobDescription, setJobDescription] = useState("Recherche Chef de Projet confirmé, maîtrise méthodologie Agile, anglais courant, capacité à gérer des budgets...")
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [atsScore, setAtsScore] = useState(0)
  const [generatedCv, setGeneratedCv] = useState('')
  const [error, setError] = useState(null)

  const sampleCvText = `PROFIL\nChef de projet expérimenté avec 5 ans d'expertise en méthodologie Agile. Passionné par l'optimisation des process et capable de gérer des budgets complexes.\n\nEXPERIENCES\nProduct Owner — TechSolutions (2020 - Présent)\n- Pilotage de la roadmap produit et augmentation de la vélocité de l'équipe de 20%.\n- Gestion des stakeholders et priorisation du backlog.\n- Mise en place des cérémonies Scrum.\n\nCOMPETENCES\nJira • Notion • Agile/Scrum • Management • Budget • Anglais C1\n\nFORMATION\nMaster Management — IAE Lyon 3 (2019)`

  const handleGenerate = async () => {
    setLoading(true)
    setError(null)
    setGeneratedCv('')

    try {
      const data = await generateCv({
        name: fullName,
        targetRole,
        experiences: `${fullName} - ${targetRole}\n\n${userProfile}`,
        jobPosting: jobDescription
      })

      if (!data?.generatedCvText) {
        setError('La génération a échoué, réessaie dans un instant.')
        return
      }

      setGeneratedCv(data.generatedCvText || sampleCvText)
      setAtsScore(data.atsScore ?? 82)
      setStep(2)
    } catch (err) {
      console.error(err)
      setError(err.message || 'Erreur réseau')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8 min-h-[80vh]">
      <div className="w-full lg:w-1/3 space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Créateur CV IA</h2>
          <p className="text-gray-500 text-sm">Étape {step === 1 ? '1 : Tes infos' : '2 : Résultat'}</p>
        </div>

        {step === 1 ? (
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
              <label className="block text-sm font-medium text-gray-700 mb-1">L'offre d'emploi (Pour le score ATS)</label>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 h-32 bg-blue-50 border-blue-200"
                placeholder="Colle l'annonce ici..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>
            <Button className="w-full" onClick={handleGenerate} disabled={loading}>
              {loading ? (
                <span className="flex items-center animate-pulse">
                  <Cpu className="mr-2" /> Analyse IA en cours...
                </span>
              ) : (
                <>Générer mon CV optimisé <ArrowRight size={18} /></>
              )}
            </Button>
          </Card>
        ) : (
          <div className="space-y-4 animate-fadeIn">
            <Card className="bg-emerald-50 border-emerald-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-emerald-900 flex items-center gap-2">
                  <ShieldCheck size={20} /> Score ATS
                </h3>
                <span className="text-2xl font-bold text-emerald-600">{atsScore}/100</span>
              </div>
              <div className="w-full bg-emerald-200 rounded-full h-2.5 mb-2">
                <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: `${atsScore}%` }} />
              </div>
              <p className="text-xs text-emerald-800">Plus le score est élevé, plus ton CV reflète les mots-clés de l'offre.</p>
            </Card>

            <Card>
              <h3 className="font-bold mb-4">Options d'édition</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded border border-gray-200 text-sm">✨ Reformuler l'accroche</button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded border border-gray-200 text-sm">🇺🇸 Traduire en Anglais</button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded border border-gray-200 text-sm">🎨 Changer de design</button>
              </div>
              <Button className="w-full mt-6" variant="secondary" onClick={() => setStep(1)}>Modifier les infos</Button>
            </Card>
          </div>
        )}
      </div>

      <div className="w-full lg:w-2/3 bg-gray-200 rounded-xl p-8 flex items-center justify-center overflow-y-auto max-h-[800px]">
        {loading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4" />
            <p className="text-gray-500">Rédaction intelligente des bullet points...</p>
            <p className="text-xs text-gray-400 mt-2">Adaptation au vocabulaire français...</p>
          </div>
        ) : step === 1 ? (
          <div className="text-center text-gray-500">
            <Layout size={64} className="mx-auto mb-4 opacity-30" />
            <p>Ton CV s'affichera ici</p>
          </div>
        ) : (
          <div className="bg-white w-full shadow-2xl p-8 flex flex-col text-sm relative animate-slideUp rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">CV généré</h3>
                <p className="text-xs text-gray-500">Texte brut prêt à être stylisé</p>
              </div>
              <span className="text-sm font-semibold text-emerald-600 flex items-center gap-2"><TrendingUp size={16} /> Score {atsScore}/100</span>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-[600px] overflow-y-auto">
              <pre className="whitespace-pre-wrap text-gray-800 leading-6">{generatedCv || sampleCvText}</pre>
            </div>
            <div className="absolute top-4 right-4 flex gap-2 no-print">
              <button className="bg-indigo-600 text-white p-2 rounded-full shadow-lg hover:bg-indigo-700">
                <Download size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const InterviewCoach = () => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'ai', text: "Bonjour ! Je suis ton coach IA. Pour quel poste passes-tu un entretien aujourd'hui ?" }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [coachError, setCoachError] = useState(null)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMsg = { id: Date.now(), type: 'user', text: input }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)
    setCoachError(null)

    try {
      const sessionContext = messages.map((msg) => ({ role: msg.type === 'user' ? 'user' : 'assistant', content: msg.text }))
      const response = await sendCoachMessage({ sessionContext, message: userMsg.text })
      const aiResponseText = response?.reply || "Merci pour ta réponse. Pourrais-tu détailler un succès mesurable ?"
      const aiMsg = { id: Date.now() + 1, type: 'ai', text: aiResponseText }
      setMessages((prev) => [...prev, aiMsg])
    } catch (err) {
      console.error(err)
      setCoachError("Coach indisponible. Vérifie le backend ou ton OPENAI_API_KEY.")
      setMessages((prev) => [...prev, { id: Date.now() + 2, type: 'ai', text: 'Coach indisponible pour le moment.' }])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 flex flex-col h-[600px]">
        <div className="bg-slate-900 p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
              <Mic size={20} />
            </div>
            <div>
              <h3 className="font-bold">Coach Entretien IA</h3>
              <p className="text-xs text-indigo-300">En ligne • Mode Recruteur Exigeant</p>
            </div>
          </div>
          <Badge color="green">Session Gratuite</Badge>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl p-4 ${msg.type === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'}`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
                {msg.type === 'ai' && msg.id !== 1 && (
                  <div className="mt-3 pt-3 border-t border-gray-100 flex gap-2">
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">Conseil Clarté</span>
                    <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded">Vocabulaire</span>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 p-4 rounded-2xl rounded-tl-none shadow-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            </div>
          )}
          {coachError && <p className="text-sm text-red-600">{coachError}</p>}
        </div>

        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Écris ta réponse ici..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="p-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200" type="button">
              <Mic size={20} />
            </button>
            <Button onClick={handleSend} className="px-6">
              Envoyer
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const Pricing = () => {
  const [checkoutLoading, setCheckoutLoading] = useState(null)
  const [checkoutError, setCheckoutError] = useState(null)

  const handleCheckout = async (plan) => {
    setCheckoutError(null)
    setCheckoutLoading(plan)

    try {
      const url = await createCheckoutSession({ plan })

      if (!url) {
        setCheckoutError('Erreur lors de la redirection Stripe')
        return
      }

      window.location.href = url
    } catch (err) {
      console.error(err)
      setCheckoutError('Erreur réseau pendant le paiement')
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
    <div className="flex gap-3 justify-center">
      <Button onClick={() => onNavigate('builder')}>Générer un CV</Button>
      <Button variant="secondary" onClick={() => onNavigate('coach')}>Tester le coach</Button>
    </div>
  </div>
)

const CancelPage = ({ onNavigate }) => (
  <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
    <div className="mx-auto h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
      <X size={32} />
    </div>
    <h2 className="text-3xl font-bold">Paiement annulé</h2>
    <p className="text-gray-600">Aucun débit effectué. Tu peux revenir aux formules et choisir quand tu veux.</p>
    <div className="flex gap-3 justify-center">
      <Button onClick={() => onNavigate('pricing')}>Voir les offres</Button>
      <Button variant="secondary" onClick={() => onNavigate('builder')}>Essayer le générateur</Button>
    </div>
  </div>
)

const getViewFromPath = () => {
  if (typeof window === 'undefined') return 'landing'
  const path = window.location.pathname.replace(/^\//, '')
  if (path.startsWith('builder')) return 'builder'
  if (path.startsWith('coach')) return 'coach'
  if (path.startsWith('pricing')) return 'pricing'
  if (path.startsWith('success') || path.startsWith('paiement/succes')) return 'success'
  if (path.startsWith('cancel') || path.startsWith('paiement/annule')) return 'cancel'
  return 'landing'
}

const App = () => {
  const [currentView, setCurrentView] = useState(getViewFromPath)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setCurrentView(getViewFromPath())
  }, [])

  const navigate = (view) => {
    setCurrentView(view)
    if (typeof window !== 'undefined') {
      const nextPath = view === 'landing' ? '/' : `/${view}`
      window.history.replaceState({}, '', nextPath)
    }
    setIsMenuOpen(false)
  }

  const renderView = () => {
    switch (currentView) {
      case 'landing': return <LandingPage onNavigate={navigate} />
      case 'builder': return <CVBuilder />
      case 'coach': return <InterviewCoach />
      case 'pricing': return <Pricing />
      case 'success': return <SuccessPage onNavigate={navigate} />
      case 'cancel': return <CancelPage onNavigate={navigate} />
      default: return <LandingPage onNavigate={navigate} />
    }
  }

  return (
    <div className="font-sans text-slate-800 bg-white min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div
              className="flex items-center gap-2 font-bold text-xl cursor-pointer"
              onClick={() => navigate('landing')}
            >
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <FileText size={20} />
              </div>
              <span>cvintelligent<span className="text-indigo-600">.fr</span></span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => navigate('builder')} className={`text-sm font-medium hover:text-indigo-600 ${currentView === 'builder' ? 'text-indigo-600' : 'text-gray-600'}`}>Créateur CV</button>
              <button onClick={() => navigate('coach')} className={`text-sm font-medium hover:text-indigo-600 ${currentView === 'coach' ? 'text-indigo-600' : 'text-gray-600'}`}>Entretien IA</button>
              <button onClick={() => navigate('pricing')} className={`text-sm font-medium hover:text-indigo-600 ${currentView === 'pricing' ? 'text-indigo-600' : 'text-gray-600'}`}>Tarifs</button>
              <Button size="sm" onClick={() => navigate('builder')} className="py-2 px-4 text-sm">
                Mon Espace
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
            <button onClick={() => navigate('builder')} className="block w-full text-left font-medium text-gray-700 py-2">Créateur CV</button>
            <button onClick={() => navigate('coach')} className="block w-full text-left font-medium text-gray-700 py-2">Entretien IA</button>
            <button onClick={() => navigate('pricing')} className="block w-full text-left font-medium text-gray-700 py-2">Tarifs</button>
            <Button className="w-full justify-center" onClick={() => navigate('builder')}>Connexion</Button>
          </div>
        )}
      </nav>

      <main className="flex-grow">
        {renderView()}
      </main>

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

export default App
