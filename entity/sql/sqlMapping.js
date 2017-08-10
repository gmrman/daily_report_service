var sqlstr = {
    test: {
        insert: 'INSERT INTO test(user, password, sex, address) VALUES(?,?,?,?)',
        // update:'update book set name=?, age=? where id=?',
        delete: 'delete from spah_t where spah001=?',
        // queryById: 'select * from book where id=?',
        queryAll: 'select id,name from user'
    },
    user:{
        register:"INSERT INTO user(id,name,password) VALUES(?,?,?)",
        logIn:"SELECT * FROM user WHERE id=?"
    },


};

module.exports = sqlstr;