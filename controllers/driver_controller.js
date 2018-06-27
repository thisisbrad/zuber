module.exports = {
  greeting(req, res) {
    res.send({ howdy: 'partner' });
  },
  create(req, res) {
    //
    console.log('body', req.body);
    res.send({ hi: 'there' });
  }
};
