# Websocket Contract Brainstorming

## join_room

inputs: name, room

if room exists:

- ⬜️ add user to room with name
- ⬜️ add event to confirm user joined room

else:

- ⬜️ nothing happens
- ⬜️ add event to show connection failed

## create_room

inputs: name, password(optional)\*

if room exists:

- ⬜️ create room with name and password
- ⬜️ add user to room with name
- ⬜️ add event to confirm user joined room
- ⬜️ add event to tell user the room code

else:

- ⬜️ nothing happens
- ⬜️ add event to show connection failed

- password functionality to be added later
