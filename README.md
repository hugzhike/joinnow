# JoinNow — Landing page

Landing page de test de concept pour **JoinNow** (nom provisoire), une
application mobile qui connecte les gens disponibles autour de soi pour une
activité, maintenant. Ce dépôt contient uniquement le site de présentation
et de collecte de liste d'attente — pas l'application mobile elle-même.

Lancement ciblé : Nice et les Alpes-Maritimes.

## Stack technique

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- TypeScript
- Tailwind CSS v4
- [react-hook-form](https://react-hook-form.com) + [zod](https://zod.dev) pour la validation de formulaire
- [lucide-react](https://lucide.dev) pour les icônes

## Démarrage rapide

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000). Aucune configuration
n'est requise pour développer en local : la liste d'attente est stockée
dans un fichier JSON créé automatiquement (voir plus bas).

### Scripts disponibles

| Commande        | Effet                                      |
| --------------- | ------------------------------------------- |
| `npm run dev`    | Serveur de développement (hot reload)       |
| `npm run build`  | Build de production                         |
| `npm run start`  | Démarre le build de production              |
| `npm run lint`   | Vérifie le code avec ESLint                 |

## Arborescence

```
src/
  app/
    page.tsx                  # Assemble toutes les sections de la landing page
    layout.tsx                # Layout racine, police, métadonnées SEO
    opengraph-image.tsx        # Image Open Graph générée dynamiquement
    sitemap.ts, robots.ts      # SEO
    api/waitlist/route.ts      # API d'inscription à la liste d'attente
    confidentialite/, mentions-legales/,
    conditions-utilisation/, contact/   # Pages légales
  components/
    layout/                   # Navbar, Footer, Logo
    sections/                 # Une section = un composant (Hero, FAQ, etc.)
    activities/ActivityCard.tsx # Carte d'activité réutilisée (démo + mockup)
    waitlist/                 # Formulaire + modale de confirmation
    ui/                       # Composants génériques (Button, Accordion...)
    legal/                    # Layout partagé des pages légales
  data/                       # Données de démonstration (activités, FAQ)
  lib/
    store/waitlist-store.ts    # Stockage des inscriptions + génération du code de parrainage
    validation.ts               # Schéma zod partagé client/serveur
    analytics.ts                 # Abstraction analytics (voir ANALYTICS.md)
    waitlist-options.ts          # Libellés des options de formulaire
  types/                      # Types TypeScript partagés
```

## Stockage des inscriptions (v1)

Par défaut, chaque inscription est écrite dans `.data/waitlist-entries.json`
à la racine du projet (fichier ignoré par git). C'est suffisant pour
développer en local ou héberger sur un serveur avec disque persistant.

**Sur un hébergement serverless (Vercel, etc.), le système de fichiers est
en lecture seule** : le code détecte l'échec d'écriture et bascule
automatiquement sur un stockage en mémoire, propre à chaque instance. Le
formulaire continue de fonctionner pour une démo, mais les données ne
persistent pas entre deux déploiements ou "cold starts". **Ne pas lancer
la liste d'attente publiquement sans brancher une vraie base de données au
préalable.**

### Connecter Supabase

1. Crée un projet sur [supabase.com](https://supabase.com) et récupère l'URL
   et les clés API.
2. Ajoute-les dans `.env.local` (voir `.env.example`).
3. Crée la table :

   ```sql
   create table waitlist_entries (
     id uuid primary key default gen_random_uuid(),
     first_name text not null,
     email text not null unique,
     city text not null,
     age_range text,
     activities text[] not null,
     frequency text not null,
     platform text not null,
     wants_ambassador boolean not null default false,
     referral_code text not null unique,
     referred_by text,
     referral_count integer not null default 0,
     created_at timestamptz not null default now()
   );
   ```

4. Remplace l'implémentation de `src/lib/store/waitlist-store.ts` par des
   appels au [client Supabase](https://supabase.com/docs/reference/javascript/introduction)
   (`createWaitlistEntry` → `insert`, `getWaitlistCount` → `select count`).
   Les deux fonctions exportées ont la même signature : le reste de
   l'application (formulaire, API route) n'a rien à changer.

## Connecter une plateforme d'emailing

Pour envoyer un email de confirmation ou notifier l'équipe à chaque
inscription, ajoute l'appel dans `src/app/api/waitlist/route.ts`, juste
après `createWaitlistEntry`. Exemple avec [Resend](https://resend.com) :

```ts
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: "JoinNow <hello@joinnow.app>",
  to: entry.email,
  subject: "Bienvenue sur la liste d'attente JoinNow",
  html: `...`,
});
```

## Analytics

Voir [`ANALYTICS.md`](./ANALYTICS.md) pour la liste des événements suivis
et comment brancher Google Analytics, Plausible ou un autre outil.

## Programme de parrainage

Chaque inscription génère un `referralCode` unique et un lien
`https://.../?ref=CODE`. Si quelqu'un s'inscrit via ce lien, le compteur
`referralCount` de la personne qui a parrainé est incrémenté
automatiquement (voir `createWaitlistEntry` dans le store). Pour aller plus
loin (paliers de récompenses, classement des ambassadeurs...), c'est ce
compteur qu'il faut exploiter — il est déjà stocké par inscription.

## Variables d'environnement

Copie `.env.example` vers `.env.local` et ajuste si besoin — rien n'est
obligatoire pour développer en local. Voir les commentaires du fichier pour
le détail de chaque variable (site, Supabase, emailing, analytics).

## Déploiement

### Vercel (recommandé)

```bash
npx vercel
```

Ou connecte le dépôt Git depuis le dashboard Vercel. Pense à :

1. Définir `NEXT_PUBLIC_SITE_URL` avec l'URL réelle de déploiement (pour les
   métadonnées SEO et les liens de parrainage).
2. Brancher Supabase (voir plus haut) **avant** de partager le lien
   publiquement, le stockage fichier ne persistant pas en serverless.

### Autre hébergement Node

```bash
npm run build
npm run start
```

Fonctionne sur toute plateforme avec un système de fichiers persistant
(VPS, Railway, Render...) — le stockage JSON fonctionnera nativement sans
configuration supplémentaire.

## Notes

- `npm audit` peut signaler des vulnérabilités dans des dépendances de
  *build* (ESLint/PostCSS/Sharp embarqués par Next.js) — elles n'affectent
  pas le code exécuté en production et un correctif forcé rétrograderait
  Next.js vers une version majeure obsolète. À surveiller lors des mises à
  jour de Next.js plutôt qu'à corriger manuellement.
- Toutes les activités, avis et profils affichés sur le site (mockup du
  téléphone, démo du radar) sont fictifs et servent uniquement à illustrer
  le produit à venir.
