import mongoose from "mongoose";

const DbConn = async() => {
    try {
        const connect = mongoose.connect(process.env.DB_URL);
        console.log('Database Connected SuccessfullY');
    } catch (error) {
        console.log('Failed to connect database');
    }
}
export default DbConn