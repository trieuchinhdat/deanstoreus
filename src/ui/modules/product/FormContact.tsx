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
		// Danh sách các key cần có trong ordersite
		const requiredFields = ['idnewletteremail', 'urlnewlettergform']

		// Kiểm tra thiếu field nào
		const missingFields = requiredFields.filter(
			(key) => !ordersite[key as keyof typeof ordersite],
		)

		if (missingFields.length > 0) {
			console.error('Thiếu thông tin cài đặt form:', missingFields)
			alert('Tạo đơn hàng không thành công. Vui lòng liên hệ với shop.')
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
				title: 'GỬI THÀNH CÔNG!',
				html: 'Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất!',
				confirmButtonText: 'Đóng',
				customClass: {
					popup: 'rounded-xl p-6',
					title: 'text-xl font-bold text-green-700',
					htmlContainer: 'text-gray-700 text-sm',
					confirmButton: 'bg-green-500 text-white px-4 py-2 rounded',
				},
			})
			reset()
		} catch (error) {
			console.error('Gửi thất bại:', error)
			alert('Gửi thất bại.')
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
						required: 'Vui lòng nhập email',
						pattern: {
							value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
							message: 'Email không hợp lệ',
						},
					})}
					className="border-global-style flex-1 rounded-xl bg-white px-4 py-3 text-base"
					placeholder="Nhập email"
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
