const {mongo} = require('mongoose');
const {mongoose} = require('./connectdb');

const tareaSchema = mongoose.Schema({
    uid : {
        type : String,
        unique : true,
        required : true
    },
    titulo : {
        type : String,
        required : true
    },
    descripcion : {
        type : String,
        required : true
    }
});


horarioSchema.statics.getTareaByID = async (uid) => {
    let doc = await Tarea.findOne({uid});
    return doc;
}

horarioSchema.statics.createTarea  = async (tareaData) => {
    let newTarea = new Tarea(tareaData);
    return await newTarea.save();
}

tareaSchema.statics.updateTarea = async (uid, tareaData) => {
    let updatedT = await Tarea.findOneAndUpdate({uid}, {$set : tareaData}, {new: true});
    return updatedT;
}


tareaSchema.statics.deleteTarea = async (uid) => {
    let deletedT = await Tarea.findOneAndDelete({uid});
    return deletedT;
} 

let Tarea = mongoose.model('tarea', tareaSchema);

// Tarea.getTarea();
// Tarea.getTareabyID('YgdF2hdj7O0mxcRhgjrRZ');
// Tarea.deleteTarea('123');
// Tarea.createTarea({"uid":"123", "titulo" : "Horario1", "totalCreditos" : 0, "materias" : [], "dias" : []})
// Tarea.deleteTarea('49qD11kaxyk_ilP42wi1c');

module.exports = {Tarea}