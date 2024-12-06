// console.log( process.env );

import { log } from "console";

const { SHELL, HOMEBREW_PREFIX, npm_lifecycle_script } = process.env;

// console.table({ SHELL, HOMEBREW_PREFIX, npm_lifecycle_script });

export const characters = ["Flash", "Superman", "Wonder Woman", "Batman"];

const [, , , batman] = characters;

// console.log(batman);
