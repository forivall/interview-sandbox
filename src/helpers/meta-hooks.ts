import * as React from 'react';

export type AnyFn = (...args: any) => any;

type HookMemoized<F extends AnyFn> = F & { [K in keyof F]: unknown };
export function memoUse<F extends AnyFn>(fn: F): HookMemoized<F> {
  type W = HookMemoized<F>;
  const useMemoized = ((...args: any) =>
    // eslint-disable-next-line react-hooks2/exhaustive-deps, @typescript-eslint/no-unsafe-return
    React.useMemo(() => fn(...args), args)) as unknown as W;
  return useMemoized;
}
