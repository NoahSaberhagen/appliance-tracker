export const useAppliance = () => {
  const listAppliances = async () => {
    try {
      const res = await fetch('http://localhost:5001/appliances/list', {
        method: 'GET'
      })
        .then((res) => res.json())
        .then((res) => JSON.parse(res))
      return res;
    } catch (e) {
      console.error(e)
    }
  }

  return {
    listAppliances
  }
}