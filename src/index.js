const express = require('express');
const { getCharData, getMoveData } = require('./get_char_data');

const app = express();
const port = 8080;

app.use(express.json());

const names = [
  'akuma',       'alisa',     'anna',
  'armor_king',  'asuka',     'bob',
  'bryan',       'claudio',   'devil_jin',
  'dragunov',    'eddy',      'eliza',
  'fahkumram',   'feng',      'ganryu',
  'geese',       'gigas',     'heihachi',
  'hwoarang',    'jack7',     'jin',
  'josie',       'julia',     'katarina',
  'kazumi',      'kazuya',    'king',
  'kuma',        'kunimitsu', 'lars',
  'law',         'lee',       'lei',
  'leo',         'leroy',     'lili',
  'lucky_chloe', 'marduk',    'master_raven',
  'miguel',      'negan',     'nina',
  'noctis',      'panda',     'paul',
  'shaheen',     'steve',     'xiaoyu',
  'yoshimitsu',  'zafina'
]

app.get('/', (_req, res) => {
  res.send(names);
});

app.get('/api/character/:name',  (request, response) => {
  if (!(names.includes(request.params.name))){
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

