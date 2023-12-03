import { useEffect, useState } from 'react';

export const CurrentSong = ({ image, title, artists }) => {
  const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (image && title && artists) {
            setIsLoading(false);
        }
    }, [image, title, artists]);

    return (
      isLoading ? (
        <div className="flex items-center pt-[3px] pl-[1px] gap-x-4 rounded-lg w-[400px] h-[60px] duration-500">
        <div className="relative rounded-md w-[55px] h-[55px] overflow-hidden">
            <div className="bg-zinc-900 w-full h-full" />
        </div>
        <div className="flex flex-col rounded-full w-[150px] h-[30px] space-y-2">
          <p className="text-white rounded-full bg-zinc-900 w-full h-[20px]"></p>
          <p className="text-neutral-400 text-xs rounded-full bg-zinc-900 w-full h-[20px]"></p>
      </div>
    </div>
    ) : (
        <a
          className="flex
          items-center
          pt-1
          gap-x-4
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
      );
  }