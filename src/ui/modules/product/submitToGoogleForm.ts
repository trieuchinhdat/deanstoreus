export const submitToGoogleForm = async (data: {
	name: string
	phone: string
	address: string
	product: string
	option1?: string
	option2?: string
}) => {
	const formUrl =
		'https://docs.google.com/forms/d/e/1FAIpQLSd5AYUXvPt-6BbX2fJTDyCvT_vrlfafYF68fB-AgY-AIagspA/formResponse'

	const formData = new FormData()
	formData.append('entry.1000020', data.name) // Replace with your actual entry ID
	formData.append('entry.1000022', data.phone)
	formData.append('entry.586134838', data.address)
	formData.append('entry.2055232012', data.product)
	if (data.option1) formData.append('entry.1279272231', data.option1)
	if (data.option2) formData.append('entry.1141783331', data.option2)

	try {
		await fetch(formUrl, {
			method: 'POST',
			mode: 'no-cors', // Required by Google Forms
			body: formData,
		})
		return true
	} catch (error) {
		console.error('Failed to submit form:', error)
		return false
	}
}
