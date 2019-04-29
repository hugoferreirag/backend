// requerindo auth
const { authSecret} = require('../.env')
// requerindo jwt
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app =>{

    // criando sigin
    const signin = async (req,res)=>{
        // se email ou password estiver vazio
        if (!req.body.email || !req.body.password){
            // retornar erro
            return res.status(400).send('Informe usuário e senha!')
        }
        const user = await app.db('users')
        // caso nao estiver vazio, pegar primeiro email encontrado para logar
            .where({email: req.body.email})
            .first()

        // se não encontrar nenhum email transmitir que usuario nao esta cadastrado
        if (!user) return res.status(400).send('"Usuário e/ou senha inválidos"')
        // vendo se senhas conferem, so atraves do bcrypt
        const isMatch = bcrypt.compareSync(req.body.password, user.password)
        if(!isMatch) return res.status(401).send('Usuário e/ou senha inválidos!')

        await app.db('users')
            .update({ultimo_login: new Date()})
            .where({id:user.id})
           
            const now = Math.floor(Date.now() / 1000)

            const payload = {
                id: user.id,
                name: user.name,
                email: user.email,
                admin: user.admin,
                iat: now,
                exp: now + (60 * 60 * 24 * 3)
            }
         const token_signin =  jwt.encode(payload, authSecret)
        
        return res.status(202).json({
            
            ...user,
            token_signin
        }).send()
      
      
    }
    

// validar token
    const validateToken = async (req,res) =>{
        // verifico se user data ja expirou ou nao
        const userData = req.body || null
        try{
            // caso exista
            if(userdata){
                // token decodifica
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

 