const router = require('express').Router();
const {User} = require('../db/User.js');
const nanoid = require('nanoid');
const jwt = require('jsonwebtoken');
const {validarBodyUsuario, validarToken} = require('../middlewares/validarDatos.js');
const dbConfig = require('../config/config.js')

router.get('/', validarToken,async (req, res) => {
    let mail = req.email;
    console.log(mail);
    let users = await User.getUserByMail(mail);
    res.send(users);
});

router.get('/:id', async (req, res) => {
    let user = User.getUserbyId(req.params.id);

    if(user){
        res.send(user);
    }
    else{
        res.status(404).send({erros : 'user not found'});
    }
});

//ESTE ES EL LOGIN
router.post('/',validarBodyUsuario, async (req, res) => {
    let {mail, password, tareas,registro} = req.body;
    let existeUsuario = await User.getUserByMail(req.body.mail);
    if(!existeUsuario){

        if(registro){
            let newUser = {uid: nanoid.nanoid(),mail,password, tareas};
            let newDoc = await User.createUser(newUser);
            let token = jwt.sign({email: newDoc.mail}, dbConfig.jwtSecret, {expiresIn: '1h'});
            res.status(201).send({token});
            return;
        }
        res.status(401).send({error : "Usuario o contraseña incorrectos"});
        return;
    }

    if(existeUsuario.password != req.body.password){
        res.status(401).send({error : "Usuario o contraseña incorrectos"});
        return;
    }
    let token = jwt.sign({email: existeUsuario.mail}, dbConfig.jwtSecret, {expiresIn: '1h'});
    res.send({token});
    return;
});


router.put('/:id', async(req, res) => {
    let userDoc = await User.getUserbyId(req.params.id);

    if(!userDoc) {
        res.status(404).send({error: 'User not found'});
        return
    }

    let {mail, password} = req.body;
    let updateUser={};
    if(mail) updateUser.mail = mail;
    if(password) updateUser.password = password;

    userDoc.update(updateUser)
    let changedUser = await User.updateUser(req.params.uid, updateUser);
    
    res.send(changedUser)
})

router.put('/tarea/:id', (req, res) => {
    let {uid_tarea, deleted} = req.body;
    let uid_user = req.params.id;
    console.log(uid_tarea, uid_user);
    if(deleted){
        User.removeTarea(uid_user, uid_tarea);
    }
    else{
        User.addTarea(uid_user, uid_tarea);
    }

    let user = User.getUserbyId(uid_user);
    res.send(user)
})

router.delete('/:id', async(req, res) => {
    let uid = req.params.id;
    let user = User.deleteUser(uid);
    res.send(user);
})

module.exports = router;