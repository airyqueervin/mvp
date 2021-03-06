const BotTweet = require('./db/BotTweet/BotTweet.js');
const db = require('./db/index.js');
const pingTwitter = require('./server.js');


const getTweets = (req, res) => {
  // pingTwitter.getMentions();
  BotTweet.find()
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    console.error('Error retrieving BotTweet data from db: ', err);
    res.sendStatus(500);
  });
};

const addNewTweet = (req, res) => {
  // pingTwitter.getMentions();
  console.log('REQUEST IN addNewTweet:', req.body);
  const botTweet = new BotTweet({
    id_str: req.body.id_str,
    name: req.body.name,
    screen_name: req.body.screen_name,
    text: req.body.text
  });
  botTweet.save()
    .then(() => {
    })
    .catch(err => {
      console.error('Error adding botTweet', err);
      res.status(501).send(err);
    });
}

const postTweet = (req, res) => {
  pingTwitter.getMentions(req.body.value);
  console.log('REQUEST IN postTweet:', req.body);
  const botTweet = new BotTweet({
    id_str: req.body.id_str,
    name: req.body.name,
    screen_name: req.body.screen_name,
    text: req.body.text
  });
  botTweet.save()
    .then(() => {
    })
    .catch(err => {
      console.error('Error adding botTweet', err);
      res.status(501).send(err);
    });
}

module.exports.getTweets = getTweets;
module.exports.addNewTweet = addNewTweet;
module.exports.postTweet = postTweet;