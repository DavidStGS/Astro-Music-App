export const CurrentSong = ({ image, title, artists }) => {
    return (
        <a
          className="flex
          items-center
          pt-1
          gap-x-3
          rounded-lg"
        >
          <div className="relative
          rounded-md
          w-[55px]
          h-[55px]
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