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
  X,
  User,
  Download,
  Cpu,
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
          <span className="text-indigo-400">prépare ton entretien</span> avec l'IA
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
          cvintelligent.fr t'aide à décrocher plus d'entretiens en quelques minutes.
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
  const [step, setStep] = useState(1)
  const [atsScore, setAtsScore] = useState(null)

  const computeAtsScore = (profile, job) => {
    const profileScore = Math.min(40, Math.floor(profile.length / 25))
    const jobScore = Math.min(40, Math.floor(job.length / 30))
    return Math.min(100, 60 + Math.floor((profileScore + jobScore) / 2))
  }

  const handleGenerate = async () => {
    if (!userProfile.trim() || !jobDescription.trim()) {
      setError('Merci de renseigner ton profil et la description du poste.')
      return
    }

    setLoading(true)
    setError(null)
    setGeneratedCv('')
    setStep(1)

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
      setStep(2)
      setAtsScore(computeAtsScore(userProfile, jobDescription))
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
      <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col lg:flex-row gap-8 min-h-[80vh]">
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Tes expériences (ou import LinkedIn)</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg p-3 h-32"
                  placeholder="Colle ton expérience ici..."
                  value={userProfile}
                  onChange={(e) => setUserProfile(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">L'offre d'emploi</label>
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
          ) : (
            <div className="space-y-4 animate-fadeIn">
              <Card className="bg-emerald-50 border-emerald-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-emerald-900 flex items-center gap-2">
                    <ShieldCheck size={20} /> Score ATS
                  </h3>
                  <span className="text-2xl font-bold text-emerald-600">{atsScore ?? 0}/100</span>
                </div>
                <div className="w-full bg-emerald-200 rounded-full h-2.5 mb-2">
                  <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: `${Math.max(atsScore || 0, 8)}%` }}></div>
                </div>
                <p className="text-xs text-emerald-800">
                  Score calculé selon la densité de mots-clés et la longueur de ton profil par rapport à l'offre.
                </p>
              </Card>

              <Card>
                <h3 className="font-bold mb-4">Actions rapides</h3>
                <div className="space-y-2">
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded border border-gray-200 text-sm flex items-center gap-2">
                    <MessageSquare size={16} /> Reformuler l'accroche (bientôt)
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded border border-gray-200 text-sm flex items-center gap-2">
                    <Cpu size={16} /> Traduire en Anglais (bientôt)
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded border border-gray-200 text-sm flex items-center gap-2">
                    <Layout size={16} /> Changer de design (bientôt)
                  </button>
                </div>
                <Button className="w-full mt-6" variant="secondary" onClick={() => setStep(1)}>
                  Modifier les infos
                </Button>
              </Card>
            </div>
          )}
        </div>

        <div className="w-full lg:w-2/3 bg-gray-200 rounded-xl p-8 flex items-center justify-center overflow-y-auto max-h-[800px] relative">
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

          {loading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Rédaction intelligente des bullet points...</p>
              <p className="text-xs text-gray-400 mt-2">Adaptation au vocabulaire français...</p>
            </div>
          ) : generatedCv ? (
            <div className="bg-white w-full shadow-2xl p-6 rounded-lg overflow-y-auto max-h-[680px]">
              <pre className="whitespace-pre-wrap text-gray-800 leading-6 text-sm">{generatedCv}</pre>
            </div>
          ) : (
            <div className="bg-white w-full max-w-[21cm] min-h-[29.7cm] shadow-2xl p-12 flex flex-col text-sm relative animate-slideUp">
              <div className="border-b-2 border-gray-800 pb-6 mb-6">
                <h1 className="text-3xl font-bold uppercase tracking-wider text-gray-900">{fullName}</h1>
                <p className="text-xl text-indigo-600 font-medium mt-1">{targetRole}</p>
                <div className="flex gap-4 text-xs text-gray-500 mt-3">
                  <span>Paris, France</span> • <span>ton.email@email.com</span> • <span>06 12 34 56 78</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-8 h-full">
                <div className="col-span-2 space-y-6">
                  <section>
                    <h3 className="font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-2 mb-3">Profil</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {userProfile}
                    </p>
                  </section>

                  <section>
                    <h3 className="font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-2 mb-3">Expériences</h3>
                    <div className="mb-4">
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-bold text-gray-800">Product Owner</h4>
                        <span className="text-gray-500 text-xs">2020 - Présent</span>
                      </div>
                      <p className="text-indigo-600 text-xs font-semibold mb-2">TechSolutions, Lyon</p>
                      <ul className="list-disc list-outside ml-4 text-gray-600 space-y-1">
                        <li>Pilotage de la roadmap produit et augmentation de la vélocité de l'équipe.</li>
                        <li>Gestion des stakeholders et priorisation du backlog.</li>
                        <li>Mise en place des cérémonies Scrum (Daily, Retro, Planning).</li>
                      </ul>
                    </div>
                  </section>
                </div>

                <div className="col-span-1 space-y-6 bg-gray-50 p-4 rounded -mt-4 -mb-12">
                  <section>
                    <h3 className="font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-2 mb-3">Compétences</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Jira', 'Notion', 'Agile/Scrum', 'Management', 'Budget', 'Anglais C1'].map((skill) => (
                        <span key={skill} className="bg-white px-2 py-1 rounded border border-gray-200 text-xs text-gray-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-2 mb-3">Formation</h3>
                    <div className="text-gray-600 text-xs">
                      <p className="font-bold">Master Management</p>
                      <p>IAE Lyon 3, 2019</p>
                    </div>
                  </section>
                </div>
              </div>

              <div className="absolute top-4 right-4 flex gap-2 no-print">
                <button className="bg-indigo-600 text-white p-2 rounded-full shadow-lg hover:bg-indigo-700" title="Téléchargement bientôt">
                  <Download size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
})

const InterviewCoach = React.forwardRef(function InterviewCoach(_, ref) {
  const [messages, setMessages] = useState([
    { id: 1, type: 'ai', text: "Bonjour ! Je suis ton coach IA. Pour quel poste passes-tu un entretien aujourd'hui ?" }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = () => {
    if (!input.trim()) return

    const userMsg = { id: Date.now(), type: 'user', text: input }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const followUp =
        messages.length === 1
          ? `C'est noté pour le poste de "${userMsg.text}". Commençons. Pouvez-vous vous présenter brièvement et m'expliquer pourquoi ce poste vous intéresse ?`
          : "Merci pour cette réponse. Voici mon feedback : précise davantage tes résultats chiffrés. Passons à la question suivante : Quelle est ta plus grande faiblesse professionnelle ?"

      const aiMsg = { id: Date.now() + 1, type: 'ai', text: followUp }
      setMessages((prev) => [...prev, aiMsg])
      setIsTyping(false)
    }, 1300)
  }

  return (
    <section className="bg-white" ref={ref} id="coach-section">
      <div className="max-w-4xl mx-auto px-4 py-16">
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
                <div
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    msg.type === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'
                  }`}
                >
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
              <button className="p-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200" title="Input vocal bientôt">
                <Mic size={20} />
              </button>
              <Button onClick={handleSend} className="px-6">
                Envoyer
              </Button>
            </div>
          </div>
        </div>
        <Button variant="outline" disabled title="Bientôt disponible">
          Arrive bientôt
        </Button>
      </div>
    </section>
  )
})

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

const LayoutShell = ({ path, navigate, goToBuilder, goToCoach, children }) => {
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
              <button onClick={goToCoach} className={`text-sm font-medium hover:text-indigo-600 ${path === '/' ? 'text-indigo-600' : 'text-gray-600'}`}>
                Entretien IA
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
            <button onClick={() => { setIsMenuOpen(false); goToCoach() }} className="block w-full text-left font-medium text-gray-700 py-2">Entretien IA</button>
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
            <p className="text-sm text-gray-400">L'IA au service de ta carrière. Adapté au marché français 🇫🇷.</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Produit</h4>
            <ul className="space-y-2 text-sm">
              <li>Créateur de CV</li>
              <li>Lettres de Motivation</li>
              <li>Coaching Entretien</li>
              <li>Tarifs</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Ressources</h4>
            <ul className="space-y-2 text-sm">
              <li>Blog Carrière</li>
              <li>Exemples de CV</li>
              <li>Questions d'entretien</li>
              <li>Guide ATS</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Légal</h4>
            <ul className="space-y-2 text-sm">
              <li>Mentions Légales</li>
              <li>CGV</li>
              <li>Confidentialité</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-xs">
          © 2025 cvintelligent.fr - Tous droits réservés.
        </div>
      </footer>
    </div>
  )
}

const HomePage = ({ navigate }) => {
  const builderRef = useRef(null)
  const coachRef = useRef(null)

  const scrollToBuilder = () => {
    if (builderRef.current) {
      builderRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToCoach = () => {
    if (coachRef.current) {
      coachRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <LandingPage onGenerateClick={scrollToBuilder} onPricing={() => navigate('/pricing')} onCoach={scrollToCoach} />
      <CVBuilder ref={builderRef} />
      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <div className="flex items-center gap-3 mb-3">
                <User className="text-indigo-600" />
                <div>
                  <p className="text-sm text-gray-500">Utilisateurs actifs</p>
                  <p className="text-2xl font-bold">2 150</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">Candidats accompagnés depuis janvier.</p>
            </Card>
            <Card>
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="text-emerald-600" />
                <div>
                  <p className="text-sm text-gray-500">Score moyen ATS</p>
                  <p className="text-2xl font-bold">82/100</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">Optimisé pour passer les filtres recruteurs.</p>
            </Card>
            <Card>
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500">Entretiens obtenus</p>
                  <p className="text-2xl font-bold">+34%</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">Impact moyen constaté après 2 semaines.</p>
            </Card>
          </div>
        </div>
      </section>
      <InterviewCoach ref={coachRef} />
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

  const scrollToCoach = () => {
    if (path !== '/') {
      navigate('/')
      setTimeout(() => {
        document.getElementById('coach-section')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
      return
    }
    document.getElementById('coach-section')?.scrollIntoView({ behavior: 'smooth' })
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
    <LayoutShell path={path} navigate={navigate} goToBuilder={scrollToBuilder} goToCoach={scrollToCoach}>
      {renderView()}
    </LayoutShell>
  )
}

export default App
