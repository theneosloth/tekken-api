const express = require('express');
const { getCharData, getMoveData } = require('./get_char_data');
const { DEFAULT_PORT, VALID_CHARACTERS } = require('./consts.js');

const app = express();
const port = process.env.PORT || DEFAULT_PORT;

app.use(express.json());

app.get('/', (_req, res) => {
  res.send(names);
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

app.get('/api/character/:name/:move',  (request, response) => {
  if (!(names.includes(request.params.name))){
    response.sendStatus(404);
    return;
  }
  const result = getMoveData(request.params.move, request.params.name);
  response.contentType('application/json');
  response.send(result);
})

app.listen(port, () => {
  console.log(`Server started at ${port}`);
})

