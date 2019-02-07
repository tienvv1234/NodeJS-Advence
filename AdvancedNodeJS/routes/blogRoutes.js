const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const Blog = mongoose.model('Blog');
const cleanCache = require('../middlewares/cleanCache');
module.exports = app => {
  app.get('/api/blogs/:id', requireLogin, async (req, res) => {
    const blog = await Blog.findOne({
      _user: req.user.id,
      _id: req.params.id
    });

    res.send(blog);
  });

  app.get('/api/blogs', requireLogin, async (req, res) => {
    // const redis = require('redis');
    // const redisUrl = 'redis://127.0.0.1:6379';
    // const client = redis.createClient(redisUrl);
    // const util = require('util');
    // // this function will take client.get function it wraps it all
    // // up with some fancy logic so that instead of making use of callback
    // // it instead returns promise
    // client.get = util.promisify(client.get);
    // // Do we have any cached data in redis related to this query
    // const cachedBlogs = await client.get(req.user.id);
    // // if yes, then response to the request right away and return
    // if (cachedBlogs) {
    //   console.log('Serving from Cache');
    //   return res.send(JSON.parse(cachedBlogs));
    // }
    // // if no, we need to response to request and update our cache to store the data
    // const blogs = await Blog.findOne({ _user: req.user.id });
    // console.log('MongoDB');
    // res.send(blogs);
    // // note that: in redis data always is JSON.stringify
    // client.set(req.user.id, JSON.stringify(blogs));
    // //delete all redis cache
    // //client.flushall()

    const blogs = await Blog.find({ _user: req.user.id }).cache({
      key: req.user.id
    });

    res.send(blogs);
  });

  app.post('/api/blogs', requireLogin, cleanCache, async (req, res) => {
    const { title, content } = req.body;

    const blog = new Blog({
      title,
      content,
      _user: req.user.id
    });

    try {
      await blog.save();
      res.send(blog);
    } catch (err) {
      res.send(400, err);
    }
  });
};
