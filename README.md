# Kravarbete Mallar

En enkel webbapplikation för att hantera mallar för kravarbete i projekt.

## Funktioner

- **Projektoutline**: Grundläggande projektinformation om studio, personal, verksamhet och ekonomi
- **Projektdirektiv**: Projektmål, omfattning och affärsnytta
- **Intressentanalys**: Hantera projektintressenter med dynamiska tabellrader
- **Personas**: Skapa och hantera användarpersonas
- **Kravspecifikation**: Funktionella och icke-funktionella krav med MoSCoW-prioritering
- **Riskanalys**: Identifiera risker och åtgärder

## Installation

```bash
# Installera beroenden
npm install

# Starta utvecklingsservern
npm run dev

# I en separat terminal, starta json-server
npx json-server --watch db.json --port 3000
```

## Användning

1. Starta både utvecklingsservern och json-server
2. Öppna webbläsaren på http://localhost:8080
3. Navigera mellan olika mallar via tabbarna
4. Fyll i formulär och klicka "Spara" för att spara datan
5. Data laddas automatiskt när sidan laddas om

## Teknologier

- React + TypeScript
- Vite
- Tailwind CSS
- shadcn-ui komponenter
- json-server för datapersistens
- axios för API-anrop
