'use client'

import Countdown, { CountdownRenderProps } from 'react-countdown'
import { useEffect, useState } from 'react'

export default function DailyCountdown({
	lastSaleDate,
}: {
	lastSaleDate?: string
}) {
	const getTargetTime = (): Date => {
		if (lastSaleDate) {
			// Dùng constructor Date để tự động parse định dạng ISO
			return new Date(lastSaleDate)
		}
		// Nếu không có lastSaleDate thì mặc định là hết ngày hôm nay
		const now = new Date()
		const end = new Date(now)
		end.setHours(23, 59, 59, 999)
		return end
	}

	const [targetTime, setTargetTime] = useState<Date | null>(null)

	useEffect(() => {
		setTargetTime(getTargetTime())
	}, [lastSaleDate])

	const renderer = ({
		days,
		hours,
		minutes,
		seconds,
		completed,
	}: CountdownRenderProps) => {
		if (completed) return null

		return (
			<div className="space-y-3 text-center">
				<div className="text-base font-semibold text-red-600 uppercase">
					⏰ Ưu đãi kết thúc sau:
				</div>

				<div className="flex justify-center gap-4 text-white">
					{/* DAYS */}
					<div className="flex flex-col items-center rounded-lg bg-red-600 px-4 py-2 shadow-md">
						<div className="text-2xl font-bold">{days}</div>
						<div className="text-xs">ngày</div>
					</div>

					{/* HOURS */}
					<div className="flex flex-col items-center rounded-lg bg-red-600 px-4 py-2 shadow-md">
						<div className="text-2xl font-bold">{hours}</div>
						<div className="text-xs">giờ</div>
					</div>

					{/* MINUTES */}
					<div className="flex flex-col items-center rounded-lg bg-red-600 px-4 py-2 shadow-md">
						<div className="text-2xl font-bold">{minutes}</div>
						<div className="text-xs">phút</div>
					</div>

					{/* SECONDS */}
					<div className="flex flex-col items-center rounded-lg bg-red-600 px-4 py-2 shadow-md">
						<div className="text-2xl font-bold">{seconds}</div>
						<div className="text-xs">giây</div>
					</div>
				</div>
			</div>
		)
	}

	if (!targetTime) return null

	return (
		<Countdown
			date={targetTime}
			renderer={renderer}
			onComplete={() => setTargetTime(getTargetTime())}
		/>
	)
}
