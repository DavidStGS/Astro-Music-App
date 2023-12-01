import { Play, Pause } from './Player.jsx';

export function PlayButtom({ id }) {
    return (
        <div className="card-play-buttom rounded-full bg-green-500 p-4">
            <Play />
        </div>
    )
}