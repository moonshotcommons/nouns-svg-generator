export interface NounSeed {
    background: number;
    body: number;
    accessory: number;
    head: number;
    glasses: number;
  }
  
  export interface NounData {
    parts: Array<{
      filename: string;
      data: string;
    }>;
    background: string;
  }