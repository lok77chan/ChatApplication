# Overview

This is a simple chat system implemented using Websockets, Express and Node.js. The project support private as well as public messaging with presence update, secure communication using RSA encryption, point-to-point file transfer

## Features

- Real-time messaging: Users can send and receive messages in real time.
- Multiple chat rooms: There will be different option of chat room for user to use and experiences.
- Private messaging: The system can support private one-on-one chat via client with client.
- Secure communication using RSA encryption
- Presence updates to show online user

## Technologies Used

- **Express.js**: 
- **Node.js**: 
- **WebSocket**: 
- **Bootstrap**: 
- **RSA encryption**: 
- **Git**: 

## Getting Started

### Prerequisites
_ Node.js (v14 or later)
_ npm (Node Package Manager
)
To run the chat system locally, follow these steps:

1. Clone the repository
2. Install the dependencies: `npm install`
3. Start the server: `npm run start`
4. Access the chat system in your web browser: `http://127.0.0.1:5555`

## Usage
### Logging in
_ Open the chat application on your browser
_ Enter your name to join the chat room
_ The server will broadcast your presence to other users.
### Sending Messages
_Private message: Select a user that you want to have a private chat on the tab, The message will be encrypted and sent directly to the selected user.
_Public message: Just simply type your message in the input box then click "Send". The message will be broadcast to all users in the chat room.
### File Transfer
_ Pick a file to send to another user. It will be encrypted and transferred directly to the recipient.

## Peer Review
 If you have any suggestions for improvements, or bug fixes, feel free to open an issue or submit a pull request.

## License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). 

## Contact
For any feedback or inquiries, please feel free to contact a1878870@adelaide.edu.eu

