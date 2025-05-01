import captainModel from "../models/captain.model.js";


const createCaptain = async ({
    firstName,
    lastName,
    email,
    password,
    color,
    plate,
    capaCity,
    vchileType,
    
}) => {
    if (!firstName || !lastName || !email || !password || !color || !plate || !capaCity || !vchileType) {
        throw new Error(" All fields are required ");
    }
    const captain = await captainModel.create({
        fullName: {
            firstName,
            lastName,
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capaCity,
            vchileType,
        },
    });
    return captain;
}

export default createCaptain;