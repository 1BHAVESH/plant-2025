import sharp from "sharp"
import cloudinary from "../../utils/cloudanry.js";
import { Plant } from "../../modals/plant.modal.js";
import { User } from "../../modals/user.modal.js";

export const createPlantPost = async(req, res) => {
    try {

        console.log(req.body)

        const {name, price, category,description } = req.body
        const image = req.file;
        const ownerId = req.id;

        if (!name || !price || !category) {
            return res.status(400).json({
                message: "Name, price, and category are required",
            });
        }

        if(!image){
            return res.status(400).json({
                mesaage:"image reqaired",
               
            })
        }

        const optimizeImageSize = await sharp(image.buffer)
    .resize({width:800, height:800, fit: "cover"})
    .toFormat("jpeg", {quality:80})
    .toBuffer()

     const fileUri = `data:image/jpeg;base64,${optimizeImageSize.toString('base64')}`

     let cloudResponse = await cloudinary.uploader.upload(fileUri);

     const plant = await Plant.create({
        pname: name,
        image: cloudResponse.secure_url,
        owner: ownerId,
        price: price,
        category : category, 
        description: description
     })

     const user = await User.findById(ownerId)

     if(user){
        user.ownPlant.push(plant._id)

        await user.save()
     }

     return res.status(201).json({
        mesaage:"new plant created",
        plant,
        success:true,
       
    })


    } catch (error) {
        console.log(error)
    }
}