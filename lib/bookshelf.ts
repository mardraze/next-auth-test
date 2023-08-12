const knex = require('knex')({
    client: 'mysql',
    connection: process.env.DATABASE_URL
  })
  const bookshelf = require('bookshelf')(knex)
  
  const User = bookshelf.model('User', {
    tableName: 'users',
    posts() {
      return this.hasMany(Post)
    }
  })
  
  const Post = bookshelf.model('Post', {
    tableName: 'posts',
    tags() {
      return this.belongsToMany(Tag)
    }
  })
  
  const Tag = bookshelf.model('Tag', {
    tableName: 'tags'
  })
  
  new User({id: 1}).fetch({withRelated: ['posts.tags']}).then((user:any) => {
    console.log(user.related('posts').toJSON())
  }).catch((error:any) => {
    console.error(error)
  })