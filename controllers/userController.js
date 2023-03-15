const User = require ('../models/userModel')
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');

const createUser = async (req, res) => {
    try {
        const { name, lastName, email, zipCode, password} = req.body
        if(!(name && lastName && email && zipCode && password)) {
            return res.status(400).send({
                success:false,
                message: "All input are required"
            })
        }
    // // Valider si le user existe déja
    //     const oldUser = await User.findOne({email})
    //     if(oldUser){
    //         return res.status(200).send({
    //             success: false, 
    //             message: "User already exists, please login"
    //         })
    //     }
        // Hashé le mdp mode password
        const hashedPassword =  await bcrypt.hash(password, 10);
        // Creer le user donc le SAVE
        const user = await User.create({name, lastName, email: email.toLowerCase(), zipCode, password : hashedPassword});
        
        // Mettre le JWT
        const token = jwt.sign({user_id: user.id, email}, process.env.TOKEN_KEY, {expiresIn: "2h"})
        user.token = token;
        return res.status(200).send({
            success: true,
            message: "Un User a bien étais enregistrer",
            user,
            token
            
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
        
    }
};

const getAllUser= async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        
    }
}

const editUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body)
        res.send({
            success: true,
            message: "User udpate "
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message: error.message
        })
        
    }
}

const getUserById = async (req, res) => {
  try {
    const getUserId = await Course.findById(req.params.id);
    res.send(getUserId);
  } catch (error) {
    console.error(error);
  }
};


const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id, req.body);
    res.send({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
  }
}

const loginUser = async (req, res)=>{
    try {
        // On recupere l'email et le password du req
        const { email, password} = req.body
        if(!(email && password)){
            return res.status(400).send({
                success: false, 
                message: "All input are required"

            });
        }
        // on trouve le user en fct de email
        const user = await User.findOne({email})
        //si ya pas user:
        if(user && (await bcrypt.compare(password, user.password))){
            const token = jwt.sign({user_id: user.id, email}, process.env.TOKEN_KEY, {expiresIn: "2h"})
            user.token = token;
            return res.status(200).send({
                success: true,
                message: "Le user a  été Trouvé",
                user
            })
        }
        // om compare le password avec celui hashé
        
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
  createUser,
  getAllUser,
  editUser,
  deleteUser,
  getUserById,
  loginUser,
};