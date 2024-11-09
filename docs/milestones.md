# Milestones

Learning goals:
- Selenium WebDriver
- REST Assured for API testing
- Postgresql usage on docker (maybe k8s)
- CI/CD integration
- API integration testing
- Database testing

## 1. Project Setup and Configuration
- [x] Set up a Spring Boot application with necessary dependencies using Maven
- [x] Configured RestAssured for making HTTP requests to the Riot Games API
- [x] Established a basic frontend setup using React, Shadcn, Tailwind, and Vite

## 2. Model Creation
- [x] Defined Java models to map the JSON responses from the API:
  - TFTMatch
  - Metadata
  - MatchInfo
  - Participant
  - Companion
  - Trait
  - Unit

## 3. API Client Implementation
- [x] Implemented TFTApiClient to interact with the Riot Games API using RestAssured
- [x] Created methods to:
  - Fetch match data
  - Fetch match IDs by PUUID

## 4. Controller and Service Layer
- [x] Developed TFTMatchController to expose REST endpoints for match data retrieval
- [x] Implemented TFTMatchService to handle api payload data model processing (processes match data from api response)

## 5. Frontend Integration
- [x] Set up a basic React component (TFTApiDisplay) to display api output
- [x] Configure Vite for development and build processes
- [x] Configure shadcn + tailwind for basic styling

## 6. Testing
- [] remove useless code before continuing
- [] Created unit tests for:
  - Controller functionality
  - API client functionality

## 7. User Input Handling
- [ ] Implement frontend form/input field to capture match ID from user

## 8. Dynamic API Call
- [ ] Modify TFTMatchController to accept match IDs dynamically from a frontend field
- [ ] Update TFTApiClient to use user-provided match ID for API calls

## 9. Frontend-Backend Communication
- [ ] Ensure frontend can send requests to backend with user-provided match ID
- [ ] Handle responses and errors on frontend

## 10. Data Display
- [ ] Enhance TFTApiDisplay component to render fetched match data
- [ ] Add:
  - Loading indicators
  - Error messages
  - Better ux elements

## 11. Testing and Validation
- [ ] Write additional tests for:
  - User input handling
  - On demand API calls
- [ ] Validate user input for expected format before making API calls

## 12. Deployment and Documentation
- production setup (not possible unless approved by riot, since api keys are on 24h refresh limits)
- enhancements and other means of analysis