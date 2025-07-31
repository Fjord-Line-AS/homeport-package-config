// lib/formSync/skipDraftWrite.ts
let skip = false;

export function shouldSkipNextDraftWrite() {
  const current = skip;
  skip = false; // reset after one use
  return current;
}

export function setSkipNextDraftWrite() {
  skip = true;
}
