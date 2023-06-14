async function getData() {
  try {
    const res = await fetch('/get-data')

    if (res.status === 401) return false

    return await res.json()
  } catch (error) {
    console.log(error)
  }
}