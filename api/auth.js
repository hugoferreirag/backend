// requerindo auth
const { authSecret} = require('../.env')
// requerindo jwt
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app =>{

    // criando sigin
    const signin = async (req,res)=>{
       
        if (!req.body.email || !req.body.password){
          
            return res.status(400).send('Informe usuário e senha!')
        }
        const user = await app.db('users')
       
            .where({email: req.body.email})
            .first()

      const msg = "Usuário e/ou senha inválidos"
        if (!user) return res.status(400).json(`{mensagem : ${msg}}`).send()
       
        const isMatch = bcrypt.compareSync(req.body.password, user.password)
        if(!isMatch) return res.status(401).json(`{mensagem : ${msg}}`).send()

        await app.db('users')
            .update({ultimo_login: new Date()})
            .where({id:user.id})
           
            const now = Math.floor(Date.now() / 1000)

            const payload = {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                telefones: user.telefones,
                data_criacao: user.data_criacao,
                ultimo_login: user.ultimo_login,
                token_acessoAPI: user.token_acessoAPI,
                iat: now,
                exp: now + (60 * 30)
            }
        const token_authHeaderBearer = jwt.encode(payload, authSecret)
        
        return res.status(202).json({
            
            ...payload,
            token_authHeaderBearer
        }).send()
      
      
    }
    


    const validateToken = async (req,res) =>{
        // verifico se user data ja expirou ou nao
        const userData = req.body || null
        try{
            
            if(userdata){
                const token = jwt.decode(userData.token, authSecret)
                // confere se data do token expirar é maior que a atual
                if(new Date(token.exp * 1000)> new Date()){
                    return res.send(true)
                }
            }
        }catch(e){
           // problema com o token
          
        }
        res.send(false)
        
    }
    
    
  
    return {signin, validateToken}
}

 