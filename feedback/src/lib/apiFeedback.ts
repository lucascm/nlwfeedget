//const apiUrl = 'https://nlwfeedget-production-fcac.up.railway.app/'
const apiUrl = import.meta.env.VITE_API_FEEDBACK_URL;

export async function sendFeedback(type: string, comment: string, screenshot?: string | null) {

    try {
        const options:RequestInit = {            
            method: 'POST',
            headers: {                
                'content-type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({
                type,
                comment,
                screenshot
            }),
        }

        const response = await fetch(`${apiUrl}feedback`, options)
        if (!response.ok) throw new Error(response.status + ': ' + response.statusText )

        if (response.status !== 201) throw new Error(response.status + ': ' + response.statusText)        

    } catch (error: any) {

        throw new Error(error.message);
        
    }

}