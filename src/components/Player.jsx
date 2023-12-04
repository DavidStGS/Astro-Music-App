import { useRef, useEffect, useState } from "react";
import { usePlayerStore } from "../store/playerStore";
import { CurrentSong } from "./CurrentSong";
import { Play, Pause, SongPrevious, SongNext, SongRandom, SongLoop, SongNormal } from "../icons/Icons";
import { VolumenControl } from "./VolumenControl";
import { SongControl } from "./SongControl";

export const Player = () => {
  const {
    currentMusic,
    isPlaying,
    setIsPlaying,
    volume,
    setCurrentMusic
  } = usePlayerStore(state => state)
  
  const [isLooping, setIsLooping] = useState(false);
  const [isRandom, setIsRandom] = useState(false);

  const handleLoop = () => {
    setIsLooping(!isLooping);
  };

  const handleRandomToggle = () => {
    setIsRandom(!isRandom);
  };

  const audioRef = useRef();

  useEffect(() => {
    if (isPlaying) {
      setTimeout(() => {
        audioRef.current.play();
      });
    } else {
      audioRef.current.pause();
    }
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
    
    audioRef.current.onended = () => {
      let nextSongIndex;
      if (isRandom) {
        nextSongIndex = Math.floor(Math.random() * songs.length);
      } else {
        nextSongIndex = songs.findIndex(s => s.id === song.id) + 1;
        if (nextSongIndex >= songs.length) nextSongIndex = 0;
      }
        setCurrentMusic({ song: songs[nextSongIndex], playlist, songs });
    };
  }, [currentMusic]);

  const handleClick = () => {
    setIsPlaying(!isPlaying)
  }

  const handlePrevious = () => {
    const { song, playlist, songs } = currentMusic
    let previousIndex = songs.findIndex(s => s.id === song.id) - 1;
    if (previousIndex < 0) {
      previousIndex = songs.length - 1;
    }
    setCurrentMusic({ song: songs[previousIndex], playlist, songs });
  };
  
  const handleNext = () => {
    const { song, playlist, songs } = currentMusic
    let nextSongIndex = songs.findIndex(s => s.id === song.id) + 1;
    if (nextSongIndex >= songs.length) {
      nextSongIndex = 0;
    }
    setCurrentMusic({ song: songs[nextSongIndex], playlist, songs });
  }
  

  return (
    <div className="flex flex-row justify-between w-full h-[72px] px-1">
      <div className="w-[200px] p-1">
      <CurrentSong {...currentMusic.song}/>
      </div>
      <div className="grid place-content-center flex-1">
        <div className="flex justify-center flex-col items-center">
          <div className="flex flex-row gap-x-6">
          <button aria-label='Random' className="text-[#C1C1C1] cursor-default transition-all duration-75 hover:text-white" onClick={handleRandomToggle}>
           {isRandom ?  <SongRandom className="text-green-500" /> : <SongRandom className="text-[#C1C1C1] hover:text-white" />}
          </button>
          <button aria-label='Previous' className="text-[#C1C1C1] hover:text-white cursor-default" onClick={handlePrevious}>
            <SongPrevious />
          </button>
            <button aria-label='Play' className="bg-white rounded-full p-2 cursor-default hover:scale-105 transition duration-75" onClick={handleClick}>
              {isPlaying ? <Pause /> : <Play />}
            </button>
            <button aria-label='Next' className="text-[#C1C1C1] hover:text-white cursor-default" onClick={handleNext}>
              <SongNext/>
            </button>
            <button aria-label='Loop' className="text-[#C1C1C1] cursor-default transition-all duration-75 hover:text-white" onClick={handleLoop}>
              {isLooping ?  <SongLoop className="text-green-500" /> : <SongNormal className="text-[#C1C1C1] hover:text-white" />}
            </button>
          </div>
          <SongControl audio={audioRef}/> 

          <audio ref={audioRef} loop={isLooping} ></audio>
        </div>

      </div>
      <div className="grid place-content-center">
        <div className="w-[200px] pl-[11px]">
            <VolumenControl />
        </div>
      </div>
    </div>
  );
}
