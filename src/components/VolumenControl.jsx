import { usePlayerStore } from "../store/playerStore";
import { useRef } from "react";
import { Slider } from "./SliderVolumen";
import { VolumeSilence } from "../icons/Icons";
import { VolumeLow } from "../icons/Icons";
import { VolumeMid } from "../icons/Icons";
import { VolumeHigh } from "../icons/Icons";
export const VolumenControl = () => {
    const volume = usePlayerStore (state => state.volume);
    const setVolume = usePlayerStore (state => state.setVolume);
    const PreviousVolumeRef = useRef(volume);

    const isVolumenIsSilence = volume === 0

    const handleClickVolume = () => {
        if (isVolumenIsSilence) {
            setVolume(PreviousVolumeRef.current)
            return
        }else{
            PreviousVolumeRef.current = volume
            setVolume(0)
        }
    }

    return (
        <div className="flex justify-center gap-x-2 text-white">
            <button aria-label='Volumen' className="opacity-70 hover:opacity-100" onClick={handleClickVolume}>
                {volume < 0.01 ? <VolumeSilence /> : volume < 0.3 ? <VolumeLow /> : volume < 0.65 ? <VolumeMid /> : <VolumeHigh />}
            </button>

            <Slider 
              defaultValue={[100]}
              max={100}
              min={0}
              value={[volume * 100]}
              className="w-[93px]"
              onValueChange={ (value) => {
                const [NewVolumen] = value 
                const volumeValue = NewVolumen / 100
                setVolume(volumeValue)
              }}
              />
        </div>
    )
}