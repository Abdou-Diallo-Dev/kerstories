# 🌍 KërStories — Contes africains personnalisés par IA

Plateforme SaaS qui génère des histoires africaines illustrées et personnalisées pour enfants, grâce à Claude (Anthropic AI).

---

## 📁 Structure du projet

```
kerstories/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── generate-story/
│   │   │       └── route.ts        ← Route API (appel Anthropic)
│   │   ├── globals.css             ← Styles globaux + variables CSS
│   │   ├── layout.tsx              ← Layout root + fonts Google
│   │   └── page.tsx                ← Page principale (client)
│   ├── components/
│   │   ├── Header.tsx              ← Barre de navigation
│   │   ├── StoryForm.tsx           ← Formulaire de génération
│   │   ├── TagButton.tsx           ← Bouton tag cliquable
│   │   ├── StoryPanel.tsx          ← Panneau droit (état)
│   │   ├── StoryDisplay.tsx        ← Affichage de l'histoire
│   │   ├── EmptyState.tsx          ← État vide (baobab)
│   │   └── LoadingState.tsx        ← État chargement
│   └── lib/
│       ├── types.ts                ← Types TypeScript
│       ├── constants.ts            ← Pays, valeurs, types
│       └── parseStory.ts           ← Parser de la réponse IA
├── public/                         ← Assets statiques
├── .env.local                      ← Clés API (NE PAS COMMITER)
├── .gitignore
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 Installation locale (étape par étape)

### Prérequis

Assure-toi d'avoir installé sur ta machine :
- **Node.js** v18 ou plus récent → https://nodejs.org
- **npm** (inclus avec Node.js)
- **Git** → https://git-scm.com

Pour vérifier :
```bash
node --version   # doit afficher v18.x.x ou plus
npm --version    # doit afficher 9.x ou plus
```

---

### Étape 1 — Cloner ou créer le projet

**Option A — Tu as reçu le dossier ZIP :**
```bash
# Décompresse le zip, puis entre dans le dossier
cd kerstories
```

**Option B — Créer depuis zéro avec Git :**
```bash
# Initialise Git dans le dossier
git init
git add .
git commit -m "Initial commit — KërStories MVP"
```

---

### Étape 2 — Installer les dépendances

```bash
npm install
```

Cette commande installe :
- Next.js 14
- React 18
- @anthropic-ai/sdk
- Tailwind CSS
- TypeScript

---

### Étape 3 — Configurer la clé API Anthropic

1. Va sur https://console.anthropic.com
2. Connecte-toi ou crée un compte
3. Clique sur **"API Keys"** dans le menu gauche
4. Clique **"Create Key"** → copie la clé (commence par `sk-ant-...`)

Ouvre le fichier `.env.local` et remplace la valeur :

```env
ANTHROPIC_API_KEY=sk-ant-XXXXXXXXXXXXXXXXXXXXXX
```

⚠️ **Important :** Ne commit JAMAIS ce fichier sur GitHub. Il est déjà dans `.gitignore`.

---

### Étape 4 — Lancer en développement

```bash
npm run dev
```

Ouvre ton navigateur sur : **http://localhost:3000**

Tu devrais voir KërStories fonctionner ! 🎉

---

### Commandes utiles

```bash
npm run dev      # Serveur de développement (hot reload)
npm run build    # Build de production
npm run start    # Lancer le build de production localement
npm run lint     # Vérifier le code
```

---

## ☁️ Déploiement sur Vercel (gratuit)

Vercel est la plateforme officielle pour Next.js. Déploiement en 5 minutes.

### Étape 1 — Créer un compte Vercel

Va sur https://vercel.com et crée un compte (gratuit, connecte-toi avec GitHub).

---

### Étape 2 — Pousser le code sur GitHub

```bash
# 1. Crée un nouveau repo sur https://github.com/new
#    Nom : kerstories
#    Visibilité : Private (recommandé)
#    Ne coche PAS "Initialize repository"

# 2. Dans ton terminal, dans le dossier kerstories :
git init
git add .
git commit -m "KërStories MVP initial"
git branch -M main
git remote add origin https://github.com/TON_USERNAME/kerstories.git
git push -u origin main
```

---

### Étape 3 — Importer sur Vercel

1. Va sur https://vercel.com/new
2. Clique **"Import Git Repository"**
3. Sélectionne ton repo `kerstories`
4. Vercel détecte automatiquement Next.js ✅
5. **NE PAS ENCORE CLIQUER "Deploy"** → d'abord configure les variables

---

### Étape 4 — Ajouter la variable d'environnement

Dans l'écran de configuration Vercel, avant de déployer :

1. Fais défiler jusqu'à **"Environment Variables"**
2. Clique **"Add"**
3. Remplis :
   - **Name :** `ANTHROPIC_API_KEY`
   - **Value :** `sk-ant-XXXXXXXXXXXXXXXX` (ta vraie clé)
4. Assure-toi que les 3 environnements sont cochés : Production, Preview, Development

---

### Étape 5 — Déployer !

Clique **"Deploy"**

Vercel va :
1. Cloner ton code
2. Installer les dépendances
3. Builder Next.js
4. Déployer sur un CDN mondial

En 2-3 minutes, tu auras une URL comme : `https://kerstories-xyz.vercel.app` 🚀

---

### Étape 6 — Domaine personnalisé (optionnel)

1. Dans ton dashboard Vercel → ton projet → **"Settings"** → **"Domains"**
2. Ajoute ton domaine : `kerstories.com` (ou tout autre)
3. Suis les instructions DNS (ajouter un enregistrement A ou CNAME chez ton registrar)

---

## 🔄 Déploiements automatiques

Une fois connecté à GitHub, **chaque `git push` déclenche un nouveau déploiement automatique** sur Vercel. Aucune action manuelle nécessaire.

```bash
# Modifier du code, puis :
git add .
git commit -m "Amélioration du design"
git push

# → Vercel redéploie automatiquement en 2 minutes
```

---

## 🧩 Prochaines fonctionnalités à ajouter

### Authentification (Supabase)
```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
```

### Export PDF
```bash
npm install @react-pdf/renderer
```

### Illustrations IA (Stability AI)
Ajouter dans `.env.local` :
```env
STABILITY_API_KEY=sk-XXXXXXXXXXXXXXXX
```

### Paiement (Stripe)
```bash
npm install stripe @stripe/stripe-js
```

---

## 🐛 Problèmes fréquents

| Problème | Solution |
|----------|----------|
| `Error: ANTHROPIC_API_KEY is not set` | Vérifie `.env.local` et redémarre avec `npm run dev` |
| `Module not found` | Lance `npm install` |
| Page blanche | Ouvre la console du navigateur (F12) pour voir l'erreur |
| Erreur 500 sur `/api/generate-story` | Vérifie que ta clé API Anthropic est valide et a du crédit |
| Build échoue sur Vercel | Vérifie que `ANTHROPIC_API_KEY` est bien configurée dans les variables Vercel |

---

## 📞 Support

Pour toute question sur l'API Anthropic : https://docs.anthropic.com  
Pour Vercel : https://vercel.com/docs  
Pour Next.js : https://nextjs.org/docs

---

*KërStories — Fait avec ❤️ pour les enfants africains*
