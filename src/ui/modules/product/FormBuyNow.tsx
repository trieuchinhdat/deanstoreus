'use client'

import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'

type Option = { title: string }
type Props = {
	title?: string
	option1?: Option[]
	option2?: Option[]
	product?: string
	ordersite?: any
}

type FormValues = {
	order: string
	name: string
	phone: string
	email?: any
	address: string
	title: string
	option1?: string
	option2?: string
}

export default function FormBuyNow({
	title,
	option1 = [],
	option2 = [],
	ordersite,
}: Props) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormValues>({
		defaultValues: {
			option1: option1?.[0]?.title || '',
			option2: option2?.[0]?.title || '',
		},
	})
	function generateOrderId() {
		const now = new Date()
		const day = String(now.getDate()).padStart(2, '0')
		const month = String(now.getMonth() + 1).padStart(2, '0')
		const year = String(now.getFullYear()).slice(-2) // 2 số cuối của năm

		const datePart = `${year}${month}${day}`
		const random = Math.floor(1000 + Math.random() * 9000) // Random 4 số

		return `DH${datePart}-${random}`
	}

	const onSubmit = async (values: FormValues) => {
		const orderId = generateOrderId()
		// Danh sách các key cần có trong ordersite
		const requiredFields = [
			'idorder',
			'idordername',
			'idorderphone',
			'idorderemail',
			'idorderaddress',
			'idorderproduct',
			'urlordergform',
		]

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
		formData.append(`entry.` + ordersite.idorder, orderId)
		formData.append(`entry.` + ordersite.idordername, values.name)
		formData.append(`entry.` + ordersite.idorderphone, values.phone)
		formData.append(`entry.` + ordersite.idorderemail, values.email)
		formData.append(`entry.` + ordersite.idorderaddress, values.address)
		formData.append(`entry.` + ordersite.idorderproduct, values.title)
		if (values.option1 && ordersite.idorderoption1)
			formData.append(`entry.` + ordersite.idorderoption1, values.option1)
		if (values.option2 && ordersite.idorderoption2)
			formData.append(`entry.` + ordersite.idorderoption2, values.option2)

		try {
			await fetch(ordersite.urlordergform, {
				method: 'POST',
				mode: 'no-cors',
				body: formData,
			})
			Swal.fire({
				icon: 'success',
				title: '🎉 CHÚC MỪNG BẠN ĐÃ ĐẶT HÀNG THÀNH CÔNG',
				html: 'Nếu không nhận được email xác nhận đơn hàng, vui lòng kiểm tra hộp thư rác hoặc spam hoặc liên hệ với shop để được hỗ trợ.',
				confirmButtonText: 'Đóng',
				customClass: {
					popup: 'rounded-xl p-6',
					title: 'text-xl font-bold text-green-700',
					htmlContainer: 'text-gray-700 text-sm',
					confirmButton: 'bg-green-500 text-white px-4 py-2 rounded',
				},
			})
			reset({
				order: generateOrderId(),
				title: title,
				option1: values.option1,
				option2: values.option2,
			})
		} catch (error) {
			console.error('Gửi thất bại:', error)
			alert('Gửi thất bại.')
		}
	}
	const idorder = generateOrderId()

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div>
					<input
						{...register('title')}
						defaultValue={title}
						readOnly
						className="hidden w-full rounded-xl bg-gray-100 p-2 font-semibold text-gray-700"
					/>
					<input
						{...register('name', { required: 'Vui lòng nhập họ tên' })}
						className="border-global-style w-full rounded-xl bg-white p-4 max-md:p-2"
						placeholder="Nhập họ và tên"
					/>
					{errors.name && (
						<p className="text-sm text-red-500">{errors.name.message}</p>
					)}
				</div>

				<div>
					<input
						{...register('phone', { required: 'Vui lòng nhập số điện thoại' })}
						className="border-global-style w-full rounded-xl bg-white p-4 max-md:p-2"
						placeholder="Nhập số điện thoại"
					/>
					{errors.phone && (
						<p className="text-sm text-red-500">{errors.phone.message}</p>
					)}
				</div>

				<div>
					<input
						{...register('email', {
							required: 'Vui lòng nhập email',
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: 'Email không hợp lệ',
							},
						})}
						className="border-global-style w-full rounded-xl bg-white p-4 max-md:p-2"
						placeholder="Nhập email"
					/>
					{errors.email?.message && (
						<p className="text-sm text-red-500">
							{String(errors.email.message)}
						</p>
					)}
				</div>

				<div>
					<textarea
						{...register('address', { required: 'Vui lòng nhập địa chỉ' })}
						className="border-global-style w-full rounded-xl bg-white p-4 max-md:p-2"
						placeholder="Nhập địa chỉ"
					/>
					{errors.address && (
						<p className="text-sm text-red-500">{errors.address.message}</p>
					)}
				</div>

				{option1.length > 0 && (
					<div>
						<p className="mb-2 font-semibold">Lựa chọn:</p>
						<div className="space-y-2">
							{option1.map((opt, idx) => (
								<label
									key={idx}
									className="flex items-center space-x-2 rounded-xl border border-[#fff] bg-white p-2"
								>
									<input
										type="radio"
										value={opt.title}
										{...register('option1')}
										className="accent-blue-600"
									/>
									<span>{opt.title}</span>
								</label>
							))}
						</div>
					</div>
				)}

				{option2.length > 0 && (
					<div>
						<p className="mb-2 font-semibold">Lựa chọn:</p>
						<div className="space-y-2">
							{option2.map((opt, idx) => (
								<label
									key={idx}
									className="flex items-center space-x-2 rounded-xl border border-[#fff] bg-white p-2"
								>
									<input
										type="radio"
										value={opt.title}
										{...register('option1')}
										className="accent-blue-600"
									/>
									<span>{opt.title}</span>
								</label>
							))}
						</div>
					</div>
				)}

				<button
					type="submit"
					className="action rounded-xl px-6 py-3 text-base font-bold whitespace-nowrap uppercase shadow transition duration-300"
				>
					Đặt hàng ngay
				</button>
			</form>
		</>
	)
}
