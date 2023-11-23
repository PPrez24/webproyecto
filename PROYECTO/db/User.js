const {mongo} = require('mongoose');
const {mongoose} = require('./connectdb');
const {Tarea} = require('./Tarea.js')

const userSchema = mongoose.Schema({
    uid : {
        type : String,
        unique : true,
        required : true
    },

    mail : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    tareas : [{type : mongoose.Schema.Types.ObjectId, ref:'tarea'}]
})

userSchema.statics.getUsers = async (filtros = {}, isAdmin=true) => {
    let projection = {_id:0, username:1, email:1}
    let skip=0
    let limit = 1000
    
    //if (isAdmin) projection.password = 1


    let docs = await User.find(filtros).populate({path : "tareas", model :"tarea", 
    select: "uid titulo descripcion"});

    console.log(docs);
    console.log(JSON.stringify(docs));
    return docs;
}

userSchema.statics.getUserbyId = async(uid)=>{
    let doc= await User.findOne({uid});
    return doc;
}

userSchema.statics.getUserByMail = async(mail)=>{
    let doc = await User.findOne({mail},{
        _id:0, uid:1, mail:1, password:1, horarios:1
    }).populate({path : "tareas", model :"tarea", 
    select: "uid titulo descripcion"});
    return doc
}

userSchema.statics.getTareasUser = async (uid)=> {
    let user = await Tarea.findOne({uid}).populate('tareas');
    let tareas = user.tareas
    return tareas;
}

userSchema.statics.createUser = async(userData) =>{
    let newUser = new User(userData);
    await newUser.save();
    return newUser;
}

userSchema.statics.addTarea = async (uid, uid_tarea) => {
    let doc = await User.findOne({uid});
    let tarea = await Tarea.getTareabyID(uid_tarea);
    doc.tareas.push(tarea);
    let newUser = {"uid": uid, "mail": doc.mail, 
    "password" : doc.password, "tareas" : doc.tareas};
    User.updateUser(uid, newUser);
    return doc;
}   

userSchema.statics.removeTarea = async (uid, uid_tarea) => {
    let user = await User.findOne({uid}).populate('tareas');
    let tarea = await Tarea.getTareabyID(uid_tarea);
    for (let i = 0; i < user.tareas.length; i++){
        if(user.tareas[i].uid == uid_tarea){
            user.tareas.splice(i, 1);
        }
    }
    let newUser = {"uid": uid, "mail": user.mail, 
    "password" : user.password, "tareas" : user.tareas};
    User.updateUser(uid, newUser);
    return user;
}

userSchema.statics.updateUser = async(uid, userData, isAdmin = true) => {
    if(isAdmin){
        let updatedUser = await User.findOneAndUpdate({uid}, {$set : userData}, {new: true});
        return updatedUser;
    }
    let updatedUser = await User.findOneAndUpdate({uid},userData);
    return updatedUser;
}

userSchema.statics.deleteUser = async(uid) => {
    let deletedUser = await User.findOneAndDelete({uid});
    return deletedUser;
}


let User = mongoose.model('user', userSchema);

// User.getUsers()
// User.createUser({"uid": "1234", "mail": "napo@test.com", "password": "213"})
// User.deleteUser("123")
// User.addTarea('VKDvT-GBX0K0URzbqNe3q', 'qbHcvArzU2mMN8D1rQGwE')
// User.removeTarea('VKDvT-GBX0K0URzbqNe3q', 'qbHcvArzU2mMN8D1rQGwE')

module.exports = {User};