const dbLogin = {
    login: 'Sergiy',
    password: 'q1w2e3r4'
  }
module.exports = {
    mongoURI: `mongodb+srv://${dbLogin.login}:${dbLogin.password}@cluster0-7idyp.mongodb.net/TodoViewer`,
    jwt: 'dev-jwt'
}