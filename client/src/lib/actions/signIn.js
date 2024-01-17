export const LOGIN = async data => {
  try {
    const response = await fetch('/api/secrets/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const result = await response.json()

    return result
  } catch (error) {
    console.log(error)
  }
}
//
// Path: client/src/lib/actions/signUp.js
