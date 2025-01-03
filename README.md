# Dutch Grocery List App

Een mobiele applicatie voor het beheren van boodschappenlijstjes met real-time prijzen van Nederlandse supermarkten.

## Features

- 📝 Maak en beheer boodschappenlijstjes
- 💰 Real-time prijzen van verschillende supermarkten
- 🔐 Beveiligde gebruikersaccounts
- 🇳🇱 Volledig Nederlandstalige interface

## Technische Details

Deze applicatie is gebouwd met:
- React Native
- TypeScript
- React Navigation
- AsyncStorage voor lokale opslag

## Vereisten

- Node.js >= 18
- npm of yarn
- React Native CLI
- iOS/Android development environment

## Installatie

1. Clone de repository
```bash
git clone https://github.com/nexio123/dutch-grocery-app.git
cd dutch-grocery-app
```

2. Installeer dependencies
```bash
npm install
# of
yarn install
```

3. Start de ontwikkelomgeving
```bash
# Voor iOS
npm run ios
# of
yarn ios

# Voor Android
npm run android
# of
yarn android
```

## Project Structuur

```
src/
├── navigation/      # Navigatie configuratie
├── screens/         # App schermen
│   ├── auth/        # Authenticatie schermen
│   └── ...         # Andere schermen
├── components/      # Herbruikbare componenten
├── services/        # API services
└── utils/          # Helper functies
```

## In Ontwikkeling

Huidige features in ontwikkeling:
- [ ] Supermarkt API integratie
- [ ] Prijsvergelijking tussen winkels
- [ ] Offline modus
- [ ] Delen van boodschappenlijstjes

## Bijdragen

1. Fork het project
2. Maak je feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit je veranderingen (`git commit -m 'Add some AmazingFeature'`)
4. Push naar de branch (`git push origin feature/AmazingFeature`)
5. Open een Pull Request

## Contact

Project Link: [https://github.com/nexio123/dutch-grocery-app](https://github.com/nexio123/dutch-grocery-app)

## License

Distributed under the MIT License. See `LICENSE` for more information.