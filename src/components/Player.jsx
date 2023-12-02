import { useState, useRef, useEffect } from "react";
import { usePlayerStore } from "@/store/playerStore";

export const Pause = () => (
  <svg
    role="img"
    height="16"
    width="16"
    aria-hidden="true"
    viewBox="0 0 16 16"
  >
    <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
  </svg>
);

export const Play = () => (
  <svg
    role="img"
    height="16"
    width="16"
    aria-hidden="true"
    viewBox="0 0 16 16"
  >
    <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
  </svg>
);
const CurrentSong = ({ image, title, artists }) => {
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


export function Player() {
  const {
    currentMusic,
    isPlaying,
    setIsPlaying,
  } = usePlayerStore(state => state)
  
  const audioRef = useRef();

  useEffect(() => {
    isPlaying 
    ? audioRef.current.play() 
    : audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    const { song, playlist, songs } = currentMusic
    if (song) {
      const src = `/music/${playlist?.id}/0${song.id}.mp3`
      audioRef.current.src = src
      audioRef.current.play()
    }
  }, [currentMusic])

  const handleClick = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="flex flex-row justify-between w-full h-[72px] px-1">
      <div className="w-[200px] p-1">
      <CurrentSong {...currentMusic.song}/>
      </div>
      <div className="grid place-content-center flex-1">
        <div className="flex justify-center flex-col items-center mb-[23px] ">
          <button className="bg-white rounded-full p-2" onClick={handleClick}>
            {isPlaying ? <Pause /> : <Play />}
          </button>
        </div>
      </div>
      <div className="grid place-content-center">
        <div className="w-[200px] p-1">
          <CurrentSong {...currentMusic.song}/>
        </div>
      </div>
      <audio ref={audioRef}></audio>
    </div>
  );
}
