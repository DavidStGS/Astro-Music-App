export const CurrentSong = ({ image, title, artists }) => {
    return (
        <a
          className="flex
          items-center
          gap-x-3
          cursor-pointer
          hover:bg-neutral-800/50
          p-2
          rounded-sm"
        >
          <div className="relative
          rounded-md
          w-[50px]
          h-[50px]
          overflow-hidden">
            <picture>
              <img src={image} alt={`Cover of ${title}}`} />
            </picture>
          </div>
          <div className="flex flex-col overflow-hidden">
            <p className="text-white truncate">{title}</p>
            <p className="text-neutral-400 text-sm truncate">
              {artists?.join(', ')}
              </p>
          </div>
        </a>
    )
  }