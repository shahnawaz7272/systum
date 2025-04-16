import { create } from "zustand";

// Type for players
type player = "blue" | "red" | "green" | "yellow";



export type TokenState = {
  id: number;
  color: string;         // "red", "green", "blue", "yellow"
  position: string;      // "home", "start", or path string like "red-3"
  isFinished: boolean;   // whether token reached the center
};


// Type for Zustand store
type GameStore = {
  Turn: player;
  Tokens:TokenState[];
  NumberOnDice: number | null;
  hasrolled:boolean;
  tokenTouched:boolean
  sethasRolled:()=>void;
  rollDice: () => number; // Rolls a random dice value
  nextTurn: () => void;
  settokenTouched: () => void;
  initializeTokens: () => void;
  moveOutFromHome: (id: number, color: TokenState["color"]) => void;

};



// Zustand store
export const GameState = create<GameStore>((set, get) => ({
  // ✅ Fix: Add `get` as the second argument to access current state

  Turn:"blue",
  Tokens:[],
  NumberOnDice: null,
  hasrolled:false,
  tokenTouched:false,
 
   // 🟢 Called once on app start: initialize 4 tokens per color
   initializeTokens: () =>{
    const colors = ["red", "green", "yellow", "blue"];
    const Tokens = colors.flatMap((color) =>
      Array.from({ length: 4 }).map((_, i) => ({
        id: i,
        color,
        position: "home",     // all start at "home"
        isFinished: false,
      }))
    );
    set({ Tokens });
  },


  rollDice: () => {
    const value: number = Math.floor(Math.random() * 6) + 1;
    set({ NumberOnDice: value });
    return value;
    // ✅ Fix: Corrected syntax — use `NumberOnDice: value` instead of `NumberOnDice(value)`
  },

  sethasRolled :()=>{
    set((state)=>({hasrolled:!state.hasrolled}))
  },
  settokenTouched :()=>{
    set((state)=>({hasrolled:!state.tokenTouched}))
  },


  nextTurn: () => {
    const order: player[] = ["blue", "red", "green", "yellow"];
    const currentTurn = get().Turn;
    // ✅ Fix: use get().Turn to access current state.

    const next = order[(order.indexOf(currentTurn) + 1) % order.length];
    // ✅ Correct logic: safely cycles through the player order

    set({ Turn: next });
  },


  moveOutFromHome: (id, color) => {
    const { Tokens, NumberOnDice, Turn } = get();
    const updatedTokens = Tokens.map((token) => {
      if (
        token.id === id &&
        token.color === color &&
        token.position === "home" &&
        NumberOnDice === 6 &&
        Turn === color
      ) {
        return { ...token, position: "start" }; // Move to starting path
      }
      return token;
    });
    set({ Tokens: updatedTokens  });
  },
}));
