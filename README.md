[![Heroku](https://heroku-badge.herokuapp.com/?app=tekken-api)]
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

`http://HOST/api/character/CHARNAME/`

Returns the character's every command


`http://HOST/api/character/CHARNAME/moves`

Returns the character's entire movelist with detailed data


`http://HOST/api/character/CHARNAME/move/?fuzzy=FUZZY_QUERY`

Returns all moves similar to FUZZY_QUERY with detailed data


`http://HOST/api/character/CHARNAME/move/?command=COMMAND_QUERY`

Returns a move that exactly matches COMMAND_QUERY
