
const handleRegister = (req, res, db, bcrypt) => {
    const { email, name, password } = req.body;
    if(!name || !email || !password) {
        return res.status(400).json('incorrect form submission')
    }
    const hash = bcrypt.hashSync(password);
    //Creating a transaction
    db.transaction(trx => { //!return
        trx.insert({
            hash: hash,
            email: email
        })    
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
                .returning('*')
                .insert({
                    email: loginEmail[0],
                    name: name,
                    // password /cuz in our table we don't have tables under the password
                    joined: new Date()
                })
                .then(user => {
                    res.json(user[0]);
                })
        })
        .then(trx.commit) 
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('Unable to register'))
}

module.exports = {
    handleRegister: this.handleRegister
};