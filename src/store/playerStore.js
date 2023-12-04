import { create } from "zustand";

export const usePlayerStore = create((set) => ({
  isPlaying: false,
  playedSongs: [],
  currentMusic: { playlist: null, song: null, songs: [] },
  volume: 1,
  setVolume: (volume) => set({ volume }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentMusic: (currentMusic) => set({ currentMusic }),
  setPlayedSongs: (playedSongs) => set({ playedSongs }),
}))