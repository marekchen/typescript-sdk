declare function shajs(data: string): Hash;

declare interface Hash {
  update(data: string): Hash;
  digest(data: string): string;
}

export = shajs;