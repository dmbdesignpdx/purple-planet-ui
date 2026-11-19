import type {
  RecipeVariantRecord,
  SlotRecipeVariantRecord,
} from "../../styled-system/types";
import type { RecipeConfig, SlotRecipeConfig } from "./recipe-types";

/** Keys on `C` that `K` doesn't know about, mapped to `never` to reject them. */
type Extra<C, K> = { [P in Exclude<keyof C, keyof K>]: never };

/**
 * Identity helper that type-checks a recipe against the token-aware generated
 * types plus Panda's config metadata.
 *
 * - `T` is inferred from `variants`, so `defaultVariants` and
 *   `compoundVariants` are checked against the variants you declared.
 * - `C` is the literal config, and is what gets returned. Returning the
 *   literal type (not an annotated `RecipeConfig<T>`) is what keeps the result
 *   assignable to Panda's `defineConfig` without a cast: the generated
 *   `SystemStyleObject` is an interface, and interfaces have no implicit index
 *   signature.
 * - `Extra` restores the excess-property check that inferring `C` would
 *   otherwise switch off, so a misspelled top-level key is still an error.
 */
export const defineRecipe = <
  const T extends RecipeVariantRecord,
  const C extends RecipeConfig<T>,
>(
  config: C & RecipeConfig<T> & Extra<C, RecipeConfig<T>>,
): C => config;

/** Slot-recipe version of `defineRecipe`; `S` is inferred from `slots`. */
export const defineSlotRecipe = <
  const S extends string,
  const T extends SlotRecipeVariantRecord<S>,
  const C extends SlotRecipeConfig<S, T>,
>(
  config: C & SlotRecipeConfig<S, T> & Extra<C, SlotRecipeConfig<S, T>>,
): C => config;
