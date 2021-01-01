![Heroku](https://heroku-badge.herokuapp.com/?app=tekken-api)
# Tekken Frame Data API

This is an express app serving and filtering json data containing moves for Tekken 7 characters.

## Documentation
Formal documentation coming later.
### Data spec
notes contains miscellaneous information, such as whether the move tailspins
```json
{
  "command": "d/f+1",
  "hit_level": "m",
  "damage": "10",
  "start_up_frame": "13~14",
  "block_frame": "-3~-2",
  "hit_frame": "+6~+7",
  "counter_hit_frame": "+6~+7",
  "notes": ""
}
```

### Routes

[https://tekken-api.herokuapp.com/api/character/devil_jin](https://tekken-api.herokuapp.com/api/character/devil_jin)
Returns the character's every command


[https://tekken-api.herokuapp.com/api/character/devil_jin/moves](https://tekken-api.herokuapp.com/api/character/devil_jin/moves)

Returns the character's entire movelist with detailed data


[https://tekken-api.herokuapp.com/api/character/devil_jin/move?fuzzy=df1](https://tekken-api.herokuapp.com/api/character/devil_jin/move?fuzzy=df1)

Returns all moves similar to FUZZY_QUERY with detailed data


[https://tekken-api.herokuapp.com/api/character/devil_jin/move?command=fnddf2](https://tekken-api.herokuapp.com/api/character/devil_jin/move?command=fnddf2)


Returns a move that exactly matches COMMAND_QUERY
