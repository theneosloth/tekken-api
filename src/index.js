const express = require('express');
const { getCharData, getMoveData, getCharMoves } = require('./get_char_data');
const { DEFAULT_PORT, VALID_CHARACTERS } = require('./consts.js');

const app = express();
const port = process.env.PORT || DEFAULT_PORT;

app.use(express.json());

app.get('/', (_req, res) => {
  res.send(VALID_CHARACTERS);
});

app.get('/api/character/:name',  (request, response) => {
  if (!(VALID_CHARACTERS.includes(request.params.name))){
    response.sendStatus(404);
    return;
  }

  response.contentType('application/json');
  if (request.query.order) {
    switch(request.query.order){
    case 'damage':
      response.send(getCharData(request.params.name, 'damage'));
      return;
    }
  }
  response.send(getCharData(request.params.name))
})

app.get('/api/character/:name/move/',  (request, response) => {
  // Exit if the character is invalid, or if a query was not provided
  if (!(VALID_CHARACTERS.includes(request.params.name)) || !(request.query.fuzzy || request.query.command)){
    response.sendStatus(404);
    return;
  }
  response.contentType('application/json');

  if (request.query.fuzzy) {
    const result = getMoveData(request.params.name, request.query.fuzzy, true);
    response.send(result);
    return;
  }

  const result = getMoveData(request.params.name, request.query.command, false);
  response.send(result);
})

app.get('/api/character/:name/moves',  (request, response) => {
  if (!(VALID_CHARACTERS.includes(request.params.name))){
    response.sendStatus(404);
    return;
  }
  const result = getCharMoves(request.params.name);
  response.contentType('application/json');
  response.send(result);
})

app.listen(port, () => {
  console.log(`Server started at ${port}`);
})

