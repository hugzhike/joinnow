# Analytics

Le site n'embarque aucun outil d'analyse tiers par défaut. À la place, tous
les événements passent par une seule fonction — `track()`, définie dans
[`src/lib/analytics.ts`](./src/lib/analytics.ts) — pour qu'un seul endroit
du code ait besoin de changer le jour où un vrai outil est branché.

## Comment ça marche aujourd'hui

`track(event, payload)` fait trois choses à chaque appel :

1. En développement, affiche l'événement dans la console (`[analytics] ...`).
2. Pousse `{ event: "joinnow_<event>", ...payload }` dans `window.dataLayer`
   (convention Google Tag Manager / GA4).
3. Appelle `window.plausible(event, { props: payload })` si disponible.

Tant qu'aucun outil n'est chargé, ces appels ne font rien de visible pour
l'utilisateur — ils ne font que remplir un tableau en mémoire ou ignorer un
appel à une fonction qui n'existe pas encore.

## Événements suivis

| Événement              | Où il est déclenché                                    | Payload                              |
| ----------------------- | ------------------------------------------------------- | ------------------------------------- |
| `page_view`              | Chargement de la page d'accueil                          | —                                     |
| `cta_primary_click`       | Clic sur "Rejoindre la liste d'attente" (nav, hero)       | `{ location }`                       |
| `cta_secondary_click`     | Clic sur "Voir comment ça marche"                         | `{ location }`                       |
| `waitlist_form_start`     | Premier champ du formulaire renseigné                     | —                                     |
| `waitlist_form_submit`    | Inscription réussie                                       | `{ city, ambassador, activitiesCount }` |
| `activity_selected`       | Sélection/désélection d'une activité dans le formulaire   | `{ activity, selected }`             |
| `ambassador_cta_click`    | Clic sur "Devenir ambassadeur"                            | `{ location }`                       |
| `referral_share`          | Partage du lien de parrainage                             | `{ method: "whatsapp" \| "instagram" \| "copy" }` |
| `demo_interaction`        | Interaction avec le radar d'activités (filtre, "Rejoindre")| `{ filter?, value?, action?, activity? }` |

## Brancher Google Analytics 4 (via GTM)

1. Ajoute le script GTM dans `src/app/layout.tsx` (dans `<head>` via
   `next/script`, stratégie `afterInteractive`).
2. Dans GTM, crée un déclencheur "Custom Event" pour chaque `joinnow_<event>`
   et connecte-le à une balise GA4.

Aucune modification du code de tracking n'est nécessaire : les événements
sont déjà dans `dataLayer`.

## Brancher Plausible

Ajoute le script Plausible dans `layout.tsx` :

```tsx
<Script
  defer
  data-domain="joinnow.app"
  src="https://plausible.io/js/script.js"
/>
```

`window.plausible` sera automatiquement détecté par `track()`.

## Brancher un autre outil (PostHog, Amplitude, Mixpanel...)

Ajoute l'appel correspondant directement dans `track()` (dans
`src/lib/analytics.ts`), à côté de `dataLayer`/`plausible`. C'est le seul
fichier à modifier — tous les appels `track(...)` dans les composants
resteront inchangés.
