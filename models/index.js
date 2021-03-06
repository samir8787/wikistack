const Sequelize = require('sequelize');
const marked = require('marked');

//'wikistack', 'wikistack'
var db = new Sequelize('wikistack', 'wikistack', 'wikistack', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
});

var Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    content: {
        type: Sequelize.TEXT
    },
    status: {
        type: Sequelize.ENUM('open', 'close'),
        allowNull: false,
        defaultValue: 'open'
    }
}, {
    getterMethods: {
        getRoute: function() {
            return '/wiki/' + this.urlTitle;
        },
        getRenderedContent: function(){
            console.log(this.content);
            return marked(this.content)
        }
    }
});

Page.hook('beforeValidate', function(page, options) {
    page.urlTitle = page.title.replace(/[^\da-z\s]/ig, '').replace(/\s/g, '_').replace(/__+/g, '_');
});

Page.belongsTo(User, { as: 'author'});

module.exports = {
    Page: Page,
    User: User,
    db: db
};
