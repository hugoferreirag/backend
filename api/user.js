// requerindo auth
const { authSecret} = require('../.env')
// requerindo jwt
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')


module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
      
      const user = { ...req.body }
      const data_criacao = new Date()
      const data_atualizacao = data_criacao
      const ultimo_login = data_criacao
      user.data_criacao = data_criacao
      user.data_atualizacao = data_atualizacao
      user.ultimo_login = ultimo_login
  
       const payload = {
           name: user.name,
           email: user.email
       }
       // envio o token para o payload
      const token =  jwt.encode(payload, authSecret)
      user.token_acessoAPI = token
       
      // se for passado um id, salvar dentro de user.id
      if(req.params.id)user.id = req.params.id
      try{
          existsOrError(user.name, 'Nome não informado')
          existsOrError(user.email, 'Email não informado')
          existsOrError(user.telefones, 'Telefone não informados')
          existsOrError(user.password, 'Senha não informada')
          existsOrError(user.confirmPassword, 'Confirmação da senha não informada')
          equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem')
          // conferindo se email ou id ja existe se for passado id
          const userFromDB = await app.db('users')
              .where({email: user.email}).first()
          if(!user.id){
              notExistsOrError(userFromDB, 'Email já existente')
          }
      }catch(msg){
          return res.status(400).send(msg)
      }
      // usando bcrypt na senha
      user.password = encryptPassword(user.password)
      delete user.confirmPassword

      if(user.id){
          app.db('users')
           .update(user)
           .where({id: user.id})
           .whereNull('deletedAt')
           .then(_=> res.status(204).send())
           .catch(err => res.status(500).send(err))
      }else{
          
          // caso nao for passado, inserir novo usuario
          app.db('users')
           .insert(user)
           .catch(err =>  res.status(500).send(err)) 


           const email = await app.db('users')
          // caso nao estiver vazio, pegar primeiro email encontrado para logar
          .select('id','name', 'email', 'telefones','data_criacao','data_atualizacao', 'ultimo_login','token_acessoAPI')
          .where({email: req.body.email})
          .first()
          // se não encontrar nenhum email transmitir que usuario nao esta cadastrado
          if (email) return res.status(200).json(email).send()

           
         }

          
      }

    const get = (req, res) => {
        app.db('users')
            .select('id','name', 'email', 'telefones','data_criacao','data_atualizacao', 'ultimo_login','token_acessoAPI')
            .whereNull('deletedAt')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('users')
            .select('id','name', 'email', 'telefones','data_criacao','data_atualizacao', 'ultimo_login','token_acessoAPI')
            .where({ id: req.params.id })
            .whereNull('deletedAt')
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
           

            const rowsUpdated = await app.db('users')
                .update({deletedAt: new Date()})
                .where({ id: req.params.id })
            existsOrError(rowsUpdated, 'Usuário não foi encontrado.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getById, remove }
}