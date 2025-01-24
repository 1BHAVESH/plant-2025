import axios from "axios"

export const udePlantEdit = (id) => {

    const editPlant = async() => {

        const res =axios.post(`http://localhost:3001/api/v1/plant/${id}/edit`)
    }
}