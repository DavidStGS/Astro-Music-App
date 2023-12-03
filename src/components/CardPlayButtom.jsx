import { Play, Pause } from '../icons/Icons.jsx';
import { usePlayerStore } from "../store/playerStore";
import { useEffect, useState } from 'react';

export function PlayButtom({ id, size = 'small'}) {
    const {
        currentMusic,
        isPlaying,
        setIsPlaying,
        setCurrentMusic
      } = usePlayerStore(state => state)
      
      const [isPlayingPlaylist, setIsPlayingPlaylist] = useState(false);

      useEffect(() => {
        setIsPlayingPlaylist(isPlaying && currentMusic?.playlist.id === id);
      }, [isPlaying, currentMusic]);

      const handleClick = () => {
        
        if (isPlayingPlaylist) {
          setIsPlaying(false)
          return
        }

          fetch(`/api/get-info-playlist.json?id=${id}`)
          .then((res) => res.json())
          .then((data) => {
            const { songs, playlist } = data
            setIsPlaying(true)
            setCurrentMusic({ songs, playlist, song: songs[0]})
          })
        }
        const iconSize = size === 'small' ? 'w-4 h-4' : 'w-5 h-5'
    return (
        <button aria-label='Play' onClick={handleClick} className="rounded-full bg-green-500 p-4 transition hover:scale-105 ">
            {isPlayingPlaylist ? <Pause className={iconSize}/> : <Play className={iconSize}/>}
        </button>
    )
  }