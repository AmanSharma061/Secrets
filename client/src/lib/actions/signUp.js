export const postFormData = async data => {
  try {
    const response = await fetch('/api/secrets/signup', {
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
