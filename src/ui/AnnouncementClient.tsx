'use client'

import { PortableText } from 'next-sanity'
import CTA from '@/ui/CTA'
import Scheduler from './Scheduler'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/autoplay'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css/effect-fade'

type Props = {
	announcements: {
		_id: string
		start?: string
		end?: string
		content: any
		cta?: any
	}[]
}

export default function AnnouncementClient({ announcements }: Props) {
	if (!announcements || announcements.length === 0) return null
	// Nếu chỉ có một thông báo, hiển thị trực tiếp
	if (announcements.length === 1) {
		const { start, end, content, cta, _id } = announcements[0]
		return (
			<Scheduler start={start} end={end}>
				<aside
					id="announcement"
					className="animate-slide-down bg-accent text-canvas flex items-center justify-center gap-x-4 p-2 text-center text-balance max-md:text-sm md:gap-x-6"
				>
					<div className="anim-fade-to-r [&_a]:link">
						<PortableText value={content} />
					</div>
					<CTA className="link anim-fade-to-l shrink" link={cta} />
				</aside>
			</Scheduler>
		)
	}
	// Nếu có nhiều thông báo, sử dụng Swiper để hiển thị
	return (
		<Swiper
			modules={[Autoplay]}
			slidesPerView="auto"
			spaceBetween={30}
			loop={true}
			autoplay={{
				delay: 4000, // Không delay giữa các lần lặp
				disableOnInteraction: false,
			}}
			speed={1000} // Tốc độ di chuyển (ms)
			className="bg-accent text-canvas"
		>
			{announcements.map(({ start, end, content, cta, _id }) => (
				<SwiperSlide key={_id}>
					<Scheduler start={start} end={end}>
						<aside
							id="announcement"
							className="animate-slide-down flex items-center justify-center gap-x-4 p-2 text-center text-balance max-md:text-sm md:gap-x-6"
						>
							<div className="anim-fade-to-r [&_a]:link">
								<PortableText value={content} />
							</div>
							<CTA className="link anim-fade-to-l shrink" link={cta} />
						</aside>
					</Scheduler>
				</SwiperSlide>
			))}
		</Swiper>
	)
}
