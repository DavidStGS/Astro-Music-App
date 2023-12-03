import { useState, useEffect} from 'react';
import { Slider } from './SliderVolumen';

export const SongControl = ({ audio }) => {
    const [currentTime, setCurrentTime] = useState(0);

    const duration = audio?.current?.duration ?? 0

    useEffect(() => {
        audio.current.addEventListener('timeupdate', handleTimeUpdate)
        return () => {
            audio.current.removeEventListener('timeupdate', handleTimeUpdate)
        }
    }, [])

    const handleTimeUpdate = () => {
        setCurrentTime(audio.current.currentTime)
    }

    const formatTime = time => {
        if (time === 0) {
            return '0:00'
        }
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }
    return (
        <div className='flex gap-x-[10px] text-xs pt-[5px]'>
            <span className="text-white opacity-70 w-[23px] justify-center pt-[2px]">{formatTime(currentTime)}</span>
            <Slider 
              defaultValue={[0]}
              max={audio?.current?.duration ?? 0}
              min={0}
              value={[currentTime]}
              className="w-[443px] mt-[2px]"
              onValueChange={ (value) => {
                audio.current.currentTime = value
              }}
              
              />
            <span className="text-white opacity-70 text-xs w-[23px] justify-center pt-[2px]">{formatTime(duration)}</span>
        </div>
    )
}