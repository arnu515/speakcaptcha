import Axios from "axios"

const axios = Axios.create({
	withCredentials: true,
	validateStatus: () => true
})

export default axios
