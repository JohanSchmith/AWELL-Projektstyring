# Awell Disponering Cloud

Første cloud-klare version af disponeringsappen. UI'et er bevidst holdt tæt på den eksisterende HTML-app, men data kan nu synkes via Supabase Realtime.

## Sådan sættes den op

1. Opret et Supabase-projekt.
2. Kør `supabase/schema.sql` i Supabase SQL Editor.
3. Slå Email Auth til i Supabase Authentication.
4. Sæt Site URL til din Vercel URL, når den findes.
5. Opret et GitHub-repo med denne mappe.
6. Importer repoet i Vercel.
7. Tilføj disse environment variables i Vercel:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
8. Brug build command `npm run build` og output directory `dist`.

## Lokal test

Kør:

```bash
npm run dev
```

Hvis `config.js` ikke har Supabase URL/key, kører appen bare lokalt med `localStorage`.

## Første version af datamodellen

Denne version gemmer hele appens tilstand i én række i `public.app_state`. Det er den hurtigste sikre vej fra lokal HTML-fil til fælles realtime-værktøj for et lille team.

Næste naturlige skridt er at normalisere data til tabeller som `projects`, `tasks`, `employees`, `comments` og `vacations`, så I får bedre historik, audit log og rapportering.
