# tft api visualized logic flow

1. **User Input**:
   - User enters a match ID into the frontend application

2. **Frontend Request**:
   - Frontend makes HTTP GET request to your backend API
   - Endpoint: `/api/matches/{matchId}`

3. **Controller Action**:
   - TFTMatchController receives the request
   - Calls getMatchById() on the service layer

4. **Service Processing**:
   - TFTMatchService processes the request
   - Calls fetchMatch() on the API client

5. **Client to Riot**:
   - TFTApiClient makes HTTP GET request to Riot's API
   - Includes necessary API key and authentication

6. **Riot Response**:
   - Riot Games API returns match data in JSON format
   - Sent back to your API client

7. **Client Processing**:
   - TFTApiClient receives and processes Riot's response
   - Passes data back to service layer

8. **Service to Controller**:
   - Service processes the data if needed
   - Returns formatted data to controller

9. **Controller Response**:
   - Controller sends HTTP response back to frontend
   - Contains match data in JSON format

10. **Frontend Display**:
    - Frontend receives the data
    - Displays match information to user

This flow shows the core components and their interactions. Each layer has a specific responsibility:
- Frontend: User interaction and display
- Controller: HTTP request handling
- Service: Business logic
- Client: External API communication
- Riot API: Data source