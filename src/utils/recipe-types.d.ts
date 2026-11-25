import type {
  RecipeConfig as PandaRecipeConfig,
  SlotRecipeConfig as PandaSlotRecipeConfig,
} from "@pandacss/dev";
import type {
  RecipeDefinition,
  RecipeVariantRecord,
  SlotRecipeDefinition,
  SlotRecipeVariantRecord,
} from "../../styled-system/types";

/**
 * The config-only keys Panda adds on top of a recipe definition (`className`,
 * `description`, `jsx`, `staticCss`). `RecipeConfigMeta` isn't exported, so
 * derive it by dropping everything `RecipeDefinition` already covers.
 */
type RecipeMeta = Omit<PandaRecipeConfig, keyof RecipeDefinition>;

/**
 * Same for slot recipes. The generated definition already has an optional
 * `className`; keep Panda's required one and drop the rest of the overlap.
 */
type SlotRecipeMeta = Omit<
  PandaSlotRecipeConfig,
  Exclude<keyof SlotRecipeDefinition, "className">
>;

/**
 * Token-aware recipe definition plus Panda's config metadata.
 *
 * Use as `{ ... } as const satisfies RecipeConfig`. `as const` keeps
 * `defaultVariants` as literals so `styled()` can infer the variants, and
 * `satisfies` keeps the inferred object type, which (unlike an annotated
 * `RecipeConfig<T>`) is assignable to Panda's config types.
 */
export type RecipeConfig<T extends RecipeVariantRecord = RecipeVariantRecord> =
  RecipeDefinition<T> & RecipeMeta;

export type SlotRecipeConfig<
  S extends string = string,
  T extends SlotRecipeVariantRecord<S> = SlotRecipeVariantRecord<S>,
> = SlotRecipeDefinition<S, T> & SlotRecipeMeta;
