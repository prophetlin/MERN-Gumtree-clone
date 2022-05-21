import jwt from 'jsonwebtoken';
export const generateAuthToken = async (user) => {
    const {
        _id,
        email
    } = user; 
    const secret = process.env.secret || 'masecret';
    const token = await jwt.sign({
        _id,
        email
    }, secret, {
        expiresIn: '30d'
    });
    return token;
}