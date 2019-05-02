module.exports = app =>{
    const index = (req,res)=>{
        res.json('ok').send()
    }
    return { index }
}
