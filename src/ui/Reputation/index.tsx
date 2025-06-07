import { getCachedRepoData } from './getRepoData'
import Image from 'next/image'
import { Img } from '@/ui/Img'
import { VscStarFull, VscRepoForked } from 'react-icons/vsc'
import { cn, count } from '@/lib/utils'

export default async function Reputation({
	reputation,
	className,
}: {
	reputation?: Sanity.Reputation
} & React.ComponentProps<'div'>) {
	if (!reputation) return null

	const { stargazers_count, forks_count, avatars } =
		await getCachedRepoData(reputation)

	const imgClassname = cn(
		'border-canvas bg-canvas -me-2 aspect-square h-8 w-auto overflow-hidden rounded-full border-2 object-cover last:me-0',
	)

	const { limit = 5 } = reputation
	const hasForks = !!reputation.showForks && !!forks_count

	return (
		<div
			className={cn('flex flex-wrap items-center gap-x-6 gap-y-2', className)}
		>
			<figure className="flex *:relative empty:hidden">
				{avatars
					?.slice(0, limit - (reputation.avatars?.length ?? 0))
					.map(
						(avatar, key) =>
							!!avatar && (
								<Image
									className={imgClassname}
									style={{ zIndex: avatars.length - key }}
									src={avatar.avatar_url + '&s=48'}
									alt={'@' + avatar.login}
									title={'@' + avatar.login}
									width={48}
									height={48}
									key={key}
								/>
							),
					)}

				{reputation.avatars?.slice(0, limit)?.map((avatar, key) => (
					<Img
						className={imgClassname}
						style={{
							zIndex: (reputation.avatars?.length || limit) - key,
						}}
						image={avatar}
						title={avatar.alt}
						width={96}
						key={key}
					/>
				))}
			</figure>

			<dl className="flex flex-col text-start [figure:empty+&]:text-center">
				<dt className="max-[25rem]:text-center">
					{reputation.repo ? (
						<a
							className="inline-flex items-center gap-x-2 font-bold text-yellow-700 no-underline!"
							href={`https://github.com/${reputation.repo}`}
						>
							{reputation.title ||
								(!!stargazers_count && (
									<span
										className="flex items-center gap-x-px"
										title={count(stargazers_count, 'star')}
									>
										<VscStarFull className="inline-block" />
										{hasForks
											? stargazers_count
											: count(stargazers_count, 'star')}
									</span>
								))}
							{hasForks && (
								<span
									className="flex items-center gap-x-px"
									title={count(forks_count, 'fork')}
								>
									<VscRepoForked className="inline-block" />
									{!!stargazers_count
										? forks_count
										: count(forks_count, 'fork')}
								</span>
							)}
						</a>
					) : (
						<strong>{reputation.title || '★★★★★'}</strong>
					)}
				</dt>

				{reputation.subtitle && (
					<dd className="text-sm max-sm:mx-auto">{reputation.subtitle}</dd>
				)}
			</dl>
		</div>
	)
}
