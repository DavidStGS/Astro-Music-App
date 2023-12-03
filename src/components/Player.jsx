import { useRef, useEffect } from "react";
import { usePlayerStore } from "@/store/playerStore";
import { CurrentSong } from "./CurrentSong";
import { Play, Pause } from "../icons/Icons";
import { Slider } from "./SliderVolumen";

export const Player = () => {
  const {
    currentMusic,
    isPlaying,
    setIsPlaying,
  } = usePlayerStore(state => state)
  
  const audioRef = useRef();
  const volumeRef = useRef(1);

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
      audioRef.current.volume = volumeRef.current
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
          <Slider 
          defaultValue={[100]}
          max={100}
          min={0}
          className="w-[95px]"
          onValueChange={ (value) => {
            const [NewVolumen] = value 
            const volumeValue = NewVolumen / 100
            volumeRef.current = volumeValue
            audioRef.current.volume = volumeValue
          }}
          />
        </div>
      </div>
      <audio ref={audioRef}></audio>
    </div>
  );
}
