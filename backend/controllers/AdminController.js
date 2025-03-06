

const Getuser = async(req,res)=>{
    try {
        res.send("hello admin");
        console.log("hello from admin");
    } catch (error) {
        
    }
}
export {Getuser}