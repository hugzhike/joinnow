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
    store/
      waitlist-store.ts          # Dispatcher : Supabase si configuré, sinon fichier local
      supabase-store.ts          # Implémentation Supabase (production)
      supabase-client.ts          # Client Supabase serveur (service role key)
      file-store.ts               # Fallback JSON local (dev sans config)
      referral-code.ts             # Génération du code de parrainage
    validation.ts               # Schéma zod partagé client/serveur
    analytics.ts                 # Abstraction analytics (voir ANALYTICS.md)
    waitlist-options.ts          # Libellés des options de formulaire
  types/                      # Types TypeScript partagés
```

## Stockage des inscriptions

Le store (`src/lib/store/waitlist-store.ts`) choisit automatiquement son
backend au démarrage :

- **`SUPABASE_URL` et `SUPABASE_SERVICE_ROLE_KEY` définies** → les
  inscriptions sont lues/écrites dans Supabase (`supabase-store.ts`).
  C'est le mode utilisé en production.
- **Sinon** → fallback sur un fichier `.data/waitlist-entries.json` local
  (`file-store.ts`), pour développer sans configuration. Sur un hébergement
  serverless sans Supabase configuré, ce fallback bascule lui-même en
  mémoire (non persistant) si le disque est en lecture seule — pratique
  pour une démo, mais **ne jamais lancer la liste d'attente publiquement
  dans cet état**.

Les deux implémentations exposent exactement les mêmes fonctions
(`getWaitlistCount`, `createWaitlistEntry`), donc `src/app/api/waitlist/route.ts`
et le reste de l'application n'ont pas besoin de savoir lequel des deux
backends est actif.

### Connecter Supabase

1. Crée un projet sur [supabase.com](https://supabase.com) et récupère
   l'URL du projet et la **clé `service_role`** (Project Settings → API).
2. Ajoute-les dans `.env.local` en local, et comme variables d'environnement
   sur ton hébergeur en production (voir `.env.example`) :
   ```
   SUPABASE_URL=https://xxxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=eyJ...
   ```
3. Crée la table via le SQL Editor de Supabase :

   ```sql
   create table if not exists public.waitlist_entries (
     id uuid primary key default gen_random_uuid(),
     first_name text not null,
     email text not null,
     city text not null,
     age_range text,
     activities text[] not null default '{}',
     frequency text not null,
     platform text not null,
     wants_ambassador boolean not null default false,
     referral_code text not null unique,
     referred_by text,
     referral_count integer not null default 0,
     created_at timestamptz not null default now()
   );

   -- Empêche les doublons d'inscription, insensible à la casse.
   create unique index if not exists waitlist_entries_email_unique_idx
     on public.waitlist_entries (lower(email));

   -- RLS activé sans policy : seule la clé service_role (utilisée
   -- uniquement côté serveur) peut lire/écrire cette table. Les clés
   -- publiques (anon) n'y ont jamais accès, même si elles fuitent.
   alter table public.waitlist_entries enable row level security;
   ```

4. Redéploie — le store bascule automatiquement sur Supabase dès que les
   deux variables d'environnement sont détectées, sans autre changement de
   code.

> **Important** : seule la clé `service_role` est utilisée, et uniquement
> dans du code serveur (`route.ts` → `waitlist-store.ts`). Elle ne doit
> jamais être préfixée `NEXT_PUBLIC_` ni référencée depuis un Client
> Component — cela l'exposerait dans le bundle envoyé au navigateur.

## Connecter une plateforme d'emailing

Pour envoyer un email de confirmation ou notifier l'équipe à chaque
inscription, ajoute l'appel dans `src/app/api/waitlist/route.ts`, juste
après `createWaitlistEntry`. Exemple avec [Resend](https://resend.com) :

```ts
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: "JoinNow <hugz.hike@gmail.com>",
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
