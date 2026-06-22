import { User } from "@prisma/client";

// Result type for safe error handling
export type Result<T> = { ok: true; val: T } | { ok: false; err: string };

export interface UserDTO {
  publicId: string;
  displayName: string | null;
}

export function toUserDTO(user: UserDTO): UserDTO {
  return {
    publicId: user.publicId,
    displayName: user.displayName,
  };
}
export function getPatronym() {
  const nyms = ["Jackson", "Richardson", "Johnson"];

  return nyms[Math.floor(Math.random() * nyms.length)];
}
