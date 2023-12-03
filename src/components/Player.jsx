import { useRef, useEffect } from "react";
import { usePlayerStore } from "@/store/playerStore";
import { CurrentSong } from "./CurrentSong";
import { Play, Pause } from "../icons/Icons";
import { VolumenControl } from "./VolumenControl";

export const Player = () => {
  const {
    currentMusic,
    isPlaying,
    setIsPlaying,
    volume
  } = usePlayerStore(state => state)
  
  const audioRef = useRef();

  useEffect(() => {
    isPlaying 
    ? audioRef.current.play() 
    : audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const { song, playlist, songs } = currentMusic
    if (song) {
      const src = `/music/${playlist?.id}/0${song.id}.mp3`
      audioRef.current.src = src
      audioRef.current.volume = volume
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
        <div className="w-[200px] pl-[11px]">
            <VolumenControl />
        </div>
      </div>
      <audio ref={audioRef}></audio>
    </div>
  );
}
