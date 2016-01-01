/** schemas.js **/

var schemas = {
    users: {
        id: null,
        first_name: null,
        last_name: null,
        email: null
    },
    articles: {
        id: null,
        path: null,
        name: null,
        title:null,
        content: null,
        excerpt: null,
        created_at: null,
        updated_at:null
    },

    snippets: {
        id: null,
        name: null,
        content: null,
        created_at: null,
        updated_at: null
    },
    menus: {
        id:null,
        name: null,
        items: null,
        created_at: null,
        updated_at: null
    }
}

module.exports = schemas;  