import { create } from "zustand";
/*
export const useSetFrameVille = create((set) => ({

    frame: "current",
    setFrame: (val) => set({ frame: val })
})
) */

export const useSetFrameVille = create((set) => ({

  villes: {},

  // ajoute une ville avec son frame initial
  addVille: (name, frame = "current") =>
    set((state) => ({
      villes: {
        ...state.villes,
        [name]: { frame },
      },
    })),

  

  // change juste le frame d'une ville précise
  setFrame: (name, frame) =>
    set((state) => ({
      villes: {
        ...state.villes,
        [name]: {
          ...state.villes[name],
          frame,
        },
      },
    })),


}));