

module.exports = (id, res, tokens, wins, logs, gameType) => {
if (res.logs.length >= 10) res.logs.shift()
res.logs.push(logs)

const setQuery = {tokens: res.tokens + tokens}
if (!['hangman', 'matchup'].includes(gameType)) setQuery[`wins.${gameType}`] = res.wins[gameType] + wins
setQuery[`plays.${gameType}`] = res.plays[gameType] + 1
setQuery.logs = res.logs

require('../models/user.js').updateOne({id: id}, {$set: setQuery}, (err, res) => {
    if (err) console.log(err)
})
}