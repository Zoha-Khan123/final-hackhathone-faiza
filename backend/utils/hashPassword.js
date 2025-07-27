import bcrypt from 'bcrypt';

// Function to hash password
 export async function hashPassword(password) {
    const hashPassword = await bcrypt.hash(password, 10);// bcrypt ak method hai jo hmare password ko hag kar dyta hai,
    //10 is a salt round, ya salt is lia hota hai jb bi agr do user same password rakhte hain to bhi unka password alag alag hota hai
    console.log(password);
    console.log(hashPassword);
    return hashPassword;
}
export async function comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
}
