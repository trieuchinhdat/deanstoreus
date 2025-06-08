'use client'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import DailyCountdown from './DailyCountdown'
import Swal from 'sweetalert2'

type Option = { title: string }
type Props = {
	ordersite?: any
}

type FormValues = {
	email?: any
}
export default function FormContact({ ordersite }: Props) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormValues>()
	const onSubmit = async (values: FormValues) => {
		// List of keys needed in ordersite
		const requiredFields = ['idnewletteremail', 'urlnewlettergform']

		// Check any field lack
		const missingFields = requiredFields.filter(
			(key) => !ordersite[key as keyof typeof ordersite],
		)

		if (missingFields.length > 0) {
			console.error('Lack of installation information form:', missingFields)
			alert('Create unsuccessful orders. Please contact the shop.')
			return
		}

		const formData = new FormData()
		formData.append(`entry.` + ordersite.idnewletteremail, values.email)

		try {
			await fetch(ordersite.urlnewlettergform, {
				method: 'POST',
				mode: 'no-cors',
				body: formData,
			})
			Swal.fire({
				icon: 'success',
				title: 'Successfully send!',
				html: 'We will contact you as soon as possible!',
				confirmButtonText: 'Close!',
				customClass: {
					popup: 'rounded-xl p-6',
					title: 'text-xl font-bold text-green-700',
					htmlContainer: 'text-gray-700 text-sm',
					confirmButton: 'bg-green-500 text-white px-4 py-2 rounded',
				},
			})
			reset()
		} catch (error) {
			console.error('Sent failure:', error)
			alert('Sent failure. Please try again later.')
		}
	}
	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex h-full w-full items-center gap-4"
			>
				<input
					{...register('email', {
						required:
							'Please provide your email address in format: yourname@example.com',
						pattern: {
							value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
							message:
								'Please provide your email address in format: yourname@example.com',
						},
					})}
					className="border-global-style flex-1 rounded-xl bg-white px-4 py-3 text-base"
					placeholder="yourname@example.com"
				/>

				<button
					type="submit"
					className="action rounded-xl px-6 py-3 text-base font-bold whitespace-nowrap uppercase shadow transition duration-300"
				>
					Submit
				</button>
			</form>
		</>
	)
}
