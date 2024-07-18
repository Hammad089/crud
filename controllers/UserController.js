import UserSchema from "../model/UserModel.js";
import mongoose from "mongoose";
export const CreateRequest = async (req, res) => {
    try {
        const { first_name, last_name, email } = req.body;
        const existingUser = await UserSchema.findOne({ email: email });

        if (existingUser) {
            return res.send({
                success: false,
                message: 'User already exists'
            });
        }

        const newUser = new UserSchema({
            first_name,
            last_name,
            email
        });

        await newUser.save();

        return res.send({
            success: true,
            message: 'User created successfully'
        });

    } catch (error) {
        console.error('Failed to save the user', error);
        if (!res.headersSent) {
            return res.status(500).send({
                success: false,
                message: 'Internal Server Error'
            });
        }
    }
};
export const getAllUser = async(req,res) => {
   try {
    const users = await UserSchema.find()
   return res.status(200).send({
        success:true,
        data:users,
        message:"All users retrieved successfully"
    })
   } catch (error) {
        console.log('Failed to get all user');
        if (!res.headersSent) {
            return res.status(500).send({
                success: false,
                message: 'Internal Server Error'
            });
        }
   }
}

export const getSpecificUser = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const trimmedId = id.replace(/[^a-zA-Z0-9]/g, '');

        // Log the trimmed ID for debugging
        console.log('Trimmed ID:', trimmedId);


        // Check if the ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(trimmedId)) {
            return res.status(400).send({
                success: false,
                message: "Invalid user ID"
            });
        }

        const foundUser = await UserSchema.findById(trimmedId);

        if (!foundUser) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).send({
            success: true,
            data: foundUser,
            message: "Specific user retrieved by ID"
        });

    } catch (error) {
        console.error('Failed to get specific user', error);
        if (!res.headersSent) {
            return res.status(500).send({
                success: false,
                message: 'Internal Server Error'
            });
        }
    }
};

export const DeleteUser = async(req,res) => {
    try {
        const {id} = req.params
        const trimmedId = id.replace(/[^a-zA-Z0-9]/g, '');
        if (!mongoose.Types.ObjectId.isValid(trimmedId)) {
            return res.status(400).send({
                success: false,
                message: "Invalid user ID"
            });
        }
        const deleteUser = await UserSchema.findByIdAndDelete(trimmedId)
        if (!deleteUser) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).send({
            success: true,
            message: "Delete user successfully",
           
        });

        
    } catch (error) {
        console.error('Failed to get Delete user', error);
        if (!res.headersSent) {
            return res.status(500).send({
                success: false,
                message: 'Internal Server Error'
            });
        }
    }
}

export const UpdateUser = async(req,res) => {
       try { 
        const {id} = req.params;
        const updateData = req.body;
        const trimmedId = id.replace(/[^a-zA-Z0-9]/g, '');
        if (!mongoose.Types.ObjectId.isValid(trimmedId)) {
            return res.status(400).send({
                success: false,
                message: "Invalid user ID"
            });
        }
        const updateUser = await UserSchema.findByIdAndUpdate(trimmedId, updateData, { new: true })
        if (!updateUser) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }
        return res.status(200).send({
            success: true,
            message: "update user successfully",
            data: updateUser,
           
        });
       } catch (error) {
        console.error('Failed to get update user', error);
        if (!res.headersSent) {
            return res.status(500).send({
                success: false,
                message: 'Internal Server Error'
            });
        }
       }

}
