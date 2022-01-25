// curl --request POST \
//     --url https://conversationkit-interview.vercel.app/api/messages \
//     --header 'Content-Type: application/json' \
//     --data '{
// "author": "author_name",
//     "message": "hello again"
// }'
//
//
// Sample response
//
// {
//     "_id": "40fd149e431eacf4",
//     "author": "Chatbot",
//     "createdAt": "2021-11-02T21:34:05.539Z",
//     "message": "Roger, roger!"
// }
import axios from 'axios'


export default {
    async getMessageFromThirdPartyAi({ author, message }) {
        const url =  'https://conversationkit-interview.vercel.app/api/messages'
        const headers = {
            'Content-type': 'application/json'
        }
        const data = { author, message }
        const response = await axios.post(url, data,{ headers })
        const responseData = response.data
        return {
            data: {
                id: responseData._id,
                text: responseData.message,
            }
        }
    }
}
