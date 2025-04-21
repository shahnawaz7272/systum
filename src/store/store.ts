import { create } from "zustand";

// Type for players
type player = "blue" | "red" | "green" | "yellow";



export type TokenState = {
  id: number;
  color: string;         // "red", "green", "blue", "yellow"
  position: string;      // "home", "start", or path string like "red-3"
  isFinished: boolean;   // whether token reached the center
  isOutofHome:boolean;
  stepsMoved:number;
};

type TokenRoutetype = {
  blue:string[];
  red:string[];
  green:string[];
  yellow:string[]
}

// Type for Zustand store
type GameStore = {
  Turn: player;
  Tokens:TokenState[];
  NumberOnDice: number | null;
  hasrolled:boolean;
  tokenTouched:boolean
  TokenRoute:TokenRoutetype
  sethasRolled:()=>void;
  rollDice: () => number; // Rolls a random dice value
  nextTurn: () => void;
  settokenTouched: () => void;
  initializeTokens: () => void;
  moveOutFromHome: (id: number, color: TokenState["color"]) => void;
  moveToken:(id:number,color:TokenState["color"])=>void;

};



// Zustand store
export const GameState = create<GameStore>((set, get) => ({
  // ✅ Fix: Add `get` as the second argument to access current state

  Turn:"blue",
  Tokens:[],
  NumberOnDice: null,
  hasrolled:false,
  tokenTouched:false,

  TokenRoute:{
    blue:["b9","b6","b3","b0","r15","r12","r9","starred","r3","r0","arrowred","r2","startred","r8","r11","r14","r17","g15","g12","g9","stargreen","g3","g0","arrowgreen","g2","startgreen","g8","g11","g14","g17","y2","y5","staryellow","y11","y14","y17","arrowyellow","y15","startyellow","y9","y6","y3","y0","b2","b5","b8","starblue","b14","b17","arrowblue","b13","b10","b7","b4","b1"],
    red:["r8","r11","r14","r17","g15","g12","g9","stargreen","g3","g0","arrowgreen","g2","startgreen","g8","g11","g14","g17","y2","y5","staryellow","y11","y14","y17","arrowyellow","y15","startyellow","y9","y6","y3","y0","b2","b5","b8","starblue","b14","b17","arrowblue","b15","startblue","b9","b6","b3","b0","r15","r12","r9","starred","r3","r0","arrowred","r4","r7","r10","r13","r16"],
    green:["g8","g11","g14","g17","y2","y5","staryellow","y11","y14","y17","arrowyellow","y15","startyellow","y9","y6","y3","y0","b2","b5","b8","starblue","b14","b17","arrowblue","b15","startblue","b9","b6","b3","b0","r15","r12","r9","starred","r3","r0","arrowred","r2","startred","r8","r11","r14","r17","g15","g12","g9","stargreen","g3","g0","arrowgreen","g4","g7","g10","g13","g16"],
    yellow:["y9","y6","y3","y0","b2","b5","b8","starblue","b14","b17","arrowblue","b15","startblue","b9","b6","b3","b0","r15","r12","r9","starred","r3","r0","arrowred","r2","startred","r8","r11","r14","r17","g15","g12","g9","stargreen","g3","g0","arrowgreen","g2","startgreen","g8","g11","g14","g17","y2","y5","staryellow","y11","y14","y17","arrowyellow","y13","y10","y7","y4","y1"],
  },
 
   // 🟢 Called once on app start: initialize 4 tokens per color
   initializeTokens: () =>{
    const colors = ["red", "green", "yellow", "blue"];
    const Tokens = colors.flatMap((color) =>
      Array.from({ length: 4 }).map((_, i) => ({
        id: i,
        color,
        position: "home",     // all start at "home"
        isFinished: false,
        isOutofHome:false,
        stepsMoved:0
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

    set({ Turn: next ,hasrolled:false});
  },


  moveToken: (id: number, color: string) => {
    const { Tokens, NumberOnDice, Turn, TokenRoute } = get();
  
    const updatedTokens = Tokens.map((token) => {
      if (
        token.id === id &&
        token.color === color &&
        Turn === color &&
        token.isOutofHome === true
      ) {
        const path = TokenRoute[Turn];
        const newStepsMoved = token.stepsMoved + NumberOnDice;
        const newPosition = path[newStepsMoved - 1]; // -1 if your path is 0-indexed
  
        return {
          ...token,
          position: newPosition,
          stepsMoved: newStepsMoved, // 👈 THIS WAS MISSING
        };
      }
  
      return token;
    });
  
    set({ Tokens: updatedTokens });
  },
  

  moveOutFromHome: (id:number, color:string) => {
    const { Tokens, NumberOnDice, Turn } = get();
    const updatedTokens = Tokens.map((token) => {
      if (
        token.id === id &&
        token.color === color &&
        token.position === "home" &&
        NumberOnDice === 6 &&
        Turn === color
      ) {
        return { ...token, position: `start${Turn}` , isOutofHome:true}; // Move to starting path
      }
      return token;
    });
    set({ Tokens: updatedTokens  });
  },
}));
