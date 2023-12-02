import { Play, Pause } from './Player.jsx';
import { usePlayerStore } from "@/store/playerStore";
import { useEffect, useState } from 'react';
export function PlayButtom({ id }) {
    const {
        currentMusic,
        isPlaying,
        setIsPlaying,
        setCurrentMusic,
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

    return (
        <button onClick={handleClick} className="rounded-full bg-green-500 p-4 hover:p-[17px]">
            {isPlayingPlaylist ? <Pause /> : <Play />}
        </button>
    )
  }