export const SongRow = ({ song, index }) => {
  return (
    <tr 
      className="text-gray-400 hover:bg-zinc-800 overflow-hidden transition duration-100"
    >
      <td className="px-4 py-2 rounded-tl-lg rounded-bl-lg w-14">
        {index + 1}
      </td>
      <td className="px-4 py-2 flex gap-x-2">
        <picture>
          <img
            className="w-[45px] h-[45px] rounded-[3px]"
            src={song.image}
            alt={`Cover of ${song.title}`}
          />
        </picture>
        <div className="flex flex-col">
          <p className="text-white truncate">{song.title}</p>
          <p className="text-neutral-400 text-sm truncate">
            {song.artists.join(", ")}
          </p>
        </div>
      </td>
      <td className="px-4 py-2">{song.album}</td>
      <td className="px-4 py-2 rounded-tr-lg rounded-br-lg">
        {song.duration}
      </td>
    </tr>
  );
};