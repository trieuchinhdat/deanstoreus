'use client'

import { useEffect, useState } from 'react'
import { getSite } from '@/sanity/lib/queries'
import CTA from './CTA'
import { cn } from '@/lib/utils'
import {
	FaBluesky,
	FaFacebookF,
	FaFacebookMessenger,
	FaGithub,
	FaInstagram,
	FaLinkedinIn,
	FaTiktok,
	FaXTwitter,
	FaYoutube,
	FaXmark,
	FaPhone,
	FaPinterestP,
	FaSnapchat,
} from 'react-icons/fa6'
import { SiZalo } from 'react-icons/si'
import { LuMessageSquareMore } from 'react-icons/lu'
import { IoIosLink } from 'react-icons/io'
import type { ComponentProps } from 'react'

export default function ChatBox({ className }: ComponentProps<'div'>) {
	const [socialItems, setSocialItems] = useState<any[]>([])
	const [open, setOpen] = useState(true)

	useEffect(() => {
		getSite().then((data) => {
			if (data?.chatbox?.items?.length) {
				setSocialItems(data.chatbox.items)
			}
		})
	}, [])

	if (!socialItems.length) return null

	return (
		<div
			className={cn(
				'fixed right-8 bottom-12 z-50 flex flex-col items-end gap-2 max-md:right-4 max-md:bottom-8',
				className,
			)}
		>
			{/* List social */}
			{open && (
				<div className="flex flex-col items-end gap-2 transition-all">
					{socialItems.map((item, key) =>
						item._type === 'link' ? (
							<CTA className="group" link={item} key={key}>
								<div className="flex h-13 w-13 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-110 min-md:h-14 min-md:w-14">
									<Icon
										url={item.external}
										aria-label={item.label}
										className="text-2xl"
									/>
								</div>
							</CTA>
						) : null,
					)}
				</div>
			)}

			{/* Button Messenger Toggle */}
			<button
				onClick={() => setOpen(!open)}
				className="action flex h-13 w-13 items-center justify-center rounded-full text-white shadow-lg transition hover:scale-105 min-md:h-14 min-md:w-14"
				aria-label={open ? 'Close chat menu' : 'Open chat menu'}
			>
				{open ? (
					<FaXmark size={28} />
				) : (
					<LuMessageSquareMore size={28} className="animate-shake" />
				)}
			</button>
		</div>
	)
}

function Icon({
	url,
	className = '',
	...props
}: { url?: string } & React.ComponentProps<'svg'>) {
	if (!url) return null
	if (url.startsWith('tel:')) {
		return <FaPhone className={cn('text-green-600', className)} {...props} />
	}
	if (url.includes('zalo') || url.includes('zalo://')) {
		return <SiZalo className={cn('text-blue-500', className)} {...props} />
	}
	if (url.includes('bsky.app')) {
		return <FaBluesky className={cn('text-sky-500', className)} {...props} />
	}
	if (url.includes('facebook.com')) {
		return <FaFacebookF className={cn('text-blue-600', className)} {...props} />
	}
	if (url.includes('messenger.com')) {
		return (
			<FaFacebookMessenger
				className={cn('text-blue-600', className)}
				{...props}
			/>
		)
	}
	if (url.includes('github.com')) {
		return <FaGithub className={cn('text-gray-800', className)} {...props} />
	}
	if (url.includes('instagram.com')) {
		return <FaInstagram className={cn('text-pink-500', className)} {...props} />
	}
	if (url.includes('linkedin.com')) {
		return (
			<FaLinkedinIn className={cn('text-blue-700', className)} {...props} />
		)
	}
	if (url.includes('tiktok.com')) {
		return <FaTiktok className={cn('text-black', className)} {...props} />
	}
	if (url.includes('twitter.com') || url.includes('x.com')) {
		return <FaXTwitter className={cn('text-black', className)} {...props} />
	}
	if (url.includes('youtube.com')) {
		return <FaYoutube className={cn('text-red-600', className)} {...props} />
	}
	if (url.includes('pinterest.com')) {
		return <FaPinterestP className={cn('text-red-600', className)} {...props} />
	}
	if (url.includes('snapchat.com')) {
		return (
			<FaSnapchat className={cn('text-yellow-600', className)} {...props} />
		)
	}

	// default icon for links
	return <IoIosLink className={cn('text-gray-500', className)} {...props} />
}
