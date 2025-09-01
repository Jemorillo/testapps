# Weekly Match (Expo Router)

MVP para crear equipos, programar encuentros, registrar goles, crear categorías de votación y votar. Persiste en `AsyncStorage` local para pruebas en web/móvil. Incluye recordatorios locales (expo-notifications) que funcionan en dispositivos nativos; en web no envía push reales.

## Scripts
- `npm run start` o `npm run web`: inicia en Web (Expo Web).
- `npm run android` / `npm run ios`: compilar nativo.

## Rutas
- `/` Home
- `/players` Gestión de jugadores (nick, nombre).
- `/teams` Crear encuentro, asignar colores y jugadores a cada equipo. Agenda recordatorios.
- `/admin` Registrar goles (solo admin), crear categorías de votación.
- `/vote` Votar en categorías abiertas.

## Datos y métricas
- Se registra para cada jugador: goles, W/L/D (puedes actualizar la lógica en `history` y `admin`).
- Historial de encuentros con resultado agregado por goles registrados.

## Notas
- Para multiusuario y notificaciones push remotas, conecta Supabase/Firestore y el servicio de `Expo Push` en una siguiente iteración.