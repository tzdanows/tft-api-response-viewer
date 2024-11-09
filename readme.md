# a tft api wrapper / api visualization attempt

### current stack
- Java/Spring Boot/Maven
- REST assured/Lombok
- React/Typescript/Vite/Tailwind
- Postgresql / Docker(api visualization does not require persistant data, but analysis likely will)
- CI/CD planned
- API integration testing
- Riot API

### intent
- provide a visual dashboard that indicates what the tft match api returns
- which will provide a clearer picture for how else to apply this returned data for match analysis
- per-turn analysis is only possible with image capture of the player's screen as shown in tft improvement tools like overwolf
    - how other platforms get more thorough analysis
- etc..

![flow of the application](/docs/image.png)