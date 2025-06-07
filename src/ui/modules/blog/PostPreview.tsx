import { Img } from '@/ui/Img'
import Link from 'next/link'
import resolveUrl from '@/lib/resolveUrl'
import Authors from './Authors'
import Date from '@/ui/Date'
import Categories from './Categories'
import { cn } from '@/lib/utils'

export default function PostPreview({
	post,
	skeleton,
}: {
	post?: Sanity.BlogPost
	skeleton?: boolean
}) {
	if (!post && !skeleton) return null

	return (
		<div className="group border-global-style relative isolate flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition-all hover:shadow-lg dark:border-[#f1d1b1]/[0.2]">
			<figure className="bg-ink/3 relative aspect-video overflow-hidden">
				<Img
					className="aspect-video w-full object-cover transition-all group-hover:scale-105 group-hover:brightness-110"
					image={post?.metadata.image}
					width={700}
					alt={post?.metadata.title}
				/>

				{post?.featured && (
					<span className="action absolute top-0 right-4 rounded-t-none py-1 text-xs shadow-md">
						Featured
					</span>
				)}
			</figure>

			<div className="p-4 sm:p-6">
				<div className={cn('h4 mb-2', skeleton && 'skeleton-2')}>
					<Link
						className="link-global line-clamp-3 text-lg sm:text-xl"
						href={resolveUrl(post, { base: false })}
					>
						<span className="absolute inset-0" />
						{post?.metadata.title}
					</Link>
				</div>
				<div className="grow">
					<p className="line-clamp-3 text-sm">{post?.metadata.description}</p>
				</div>
			</div>

			{/* {(post?.authors?.length || skeleton) && (
				<Authors
					className="flex flex-wrap items-center gap-4 text-sm"
					authors={post?.authors}
					skeleton={skeleton}
				/>
			)} */}

			{/* <hr />

			<div className="empty:skeleton flex flex-wrap gap-x-4 text-sm">
				<Date value={post?.publishDate} />
				<Categories
					className="flex flex-wrap gap-x-2"
					categories={post?.categories}
				/>
			</div> */}
		</div>
	)
}
