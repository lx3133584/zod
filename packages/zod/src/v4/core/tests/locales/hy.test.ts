import { expect, test } from "vitest";
import { z } from "../../../../index.js";
import hy from "../../../locales/hy.js";

test("Armenian locale - invalid_value error message with single expected value", () => {
  z.config(hy());

  const literalSchema = z.literal("a");
  const literalResult = literalSchema.safeParse("b");
  expect(literalResult.success).toBe(false);
  if (!literalResult.success) {
    expect(literalResult.error.issues[0].message).toBe('Սխալ մուտքագրում․ սպասվում էր "a"');
  }

  const enumSchema = z.enum(["only"]);
  const enumResult = enumSchema.safeParse("other");
  expect(enumResult.success).toBe(false);
  if (!enumResult.success) {
    expect(enumResult.error.issues[0].message).toBe('Սխալ մուտքագրում․ սպասվում էր "only"');
  }
});

test("Armenian locale - invalid_value error message with multiple expected values", () => {
  z.config(hy());

  const multiEnum = z.enum(["first", "second"]);
  const multiResult = multiEnum.safeParse("other");
  expect(multiResult.success).toBe(false);
  if (!multiResult.success) {
    expect(multiResult.error.issues[0].message).toBe('Սխալ տարբերակ․ սպասվում էր հետևյալներից մեկը՝ "first"|"second"');
  }
});
