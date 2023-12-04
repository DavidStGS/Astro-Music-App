export const Time = () => (
  <svg
  role="img"
  height="20"
  width="20"
  aria-hidden="true"
  viewBox="0 0 16 16"
  fill="currentColor"
  ><path
    d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
  ></path><path
    d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"
  ></path></svg>
)

export const SongRow = ({ song }) => {

  return (
    <div className="px-6 pt-4">
      <table className="table-auto text-left min-w-full divide-y divide-slate-500/50">
        <thead>
          <tr className="text-sm text-gray-400 font-light">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Título</th>
            <th className="px-4 py-2">Álbum</th>
            <th className="px-4 py-2"><Time /></th>
          </tr>
        </thead>
        <tbody>
          <tr className="h-[15px]"></tr>
          {song.map((song, index) => (
            <tr 
            className={`text-gray-400 hover:bg-zinc-800 overflow-hidden transition duration-100 cursor-pointer`}
            key={song.id}
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
            ))
        }
          </tbody>
        </table>
    </div>
  )
      }