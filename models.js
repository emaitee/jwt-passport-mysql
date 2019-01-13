

const sequelize = new Sequelize({
  database: 'fullstack_app',
  username: 'root',
  password: '',
  dialect: 'mysql',
});

sequelize
  .query('SELECT * FROM projects WHERE status = ?', {
    raw: true,
    replacements: ['active'],
  })
  .then(projects => {
    console.log(projects);
  });

//   To define mappings between a model and a table, use the define method.

const Project = sequelize.define('project', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
});

//create table
Project.sync()
  .then(() => console.log('Project table created successfully'))
  .catch(err => console.log('oooh, did you enter wrong database credentials?'));

// Sync all models that aren't already in the database
sequelize.sync();

// Force sync all models
sequelize.sync({ force: true });

// Drop all tables
sequelize.drop();

// Sequelize Models are ES6 classes. You can very easily add custom instance or class level methods.

const User = sequelize.define('user', { firstname: Sequelize.STRING });

// Adding a class level method
User.classLevelMethod = function() {
  return 'foo';
};

// Adding an instance level method
User.prototype.instanceLevelMethod = function() {
  return 'bar';
};

// Of course you can also access the instance's data and generate virtual getters:

const User = sequelize.define('user', { firstname: Sequelize.STRING, lastname: Sequelize.STRING });

User.prototype.getFullname = function() {
  return [this.firstname, this.lastname].join(' ');
};

// Example:
User.build({ firstname: 'foo', lastname: 'bar' }).getFullname() // 'foo bar'
