import { usePlayerStore } from "@/store/playerStore";
import { Slider } from "./SliderVolumen";
import { VolumeSilence } from "../icons/Icons";
import { VolumeHigh } from "../icons/Icons";

export const VolumenControl = () => {
    const volume = usePlayerStore (state => state.volume);
    const setVolume = usePlayerStore (state => state.setVolume);

    return (
        <div className="flex justify-center gap-x-2 text-white">
            {volume < 0.1 ? <VolumeSilence /> : <VolumeHigh />}
            
            <Slider 
              defaultValue={[100]}
              max={100}
              min={0}
              className="w-[95px]"
              onValueChange={ (value) => {
                const [NewVolumen] = value 
                const volumeValue = NewVolumen / 100
                setVolume(NewVolumen)
              }}
              />
        </div>
    )
}