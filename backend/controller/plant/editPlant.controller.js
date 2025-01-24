import sharp from "sharp";
import { Plant } from "../../modals/plant.modal.js";
import cloudinary from "../../utils/cloudanry.js";

export const editPlant = async(req, res) => {
    try {
        const { name, price, category, description } = req.body;
        const image = req.file;
        const ownerId = req.id;
        const plantId = req.params.id;

      if(category === "undefined"){
        return res.status(401).json({
            message: "name price category filed are requird",
            success: false
        })
      }

        let imageUrl;
        if (image) {
            const optimizeImageSize = await sharp(image.buffer)
                .resize({ width: 800, height: 800, fit: "cover" })
                .toFormat("jpeg", { quality: 80 })
                .toBuffer();

            const fileUri = `data:image/jpeg;base64,${optimizeImageSize.toString('base64')}`;
            const cloudResponse = await cloudinary.uploader.upload(fileUri);
            imageUrl = cloudResponse.secure_url;
        }

        const plant = await Plant.findById(plantId);

        if (!plant) {
            return res.status(404).json({
                message: "Plant not found",
                success: false
            });
        }

        if (plant.owner.equals(ownerId)) {
            if (name) plant.pname = name;
            if (price) plant.price = price;
            if (category) plant.category = category;
            if(description) plant.description = description
            if (imageUrl) plant.image = imageUrl;

            await plant.save();


            return res.status(200).json({
                message: "Plant updated",
                success: true,
                plant
            });
        } else {
            return res.status(401).json({
                message: "Ye tumhara plant nhi hai",
                success: false
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};
