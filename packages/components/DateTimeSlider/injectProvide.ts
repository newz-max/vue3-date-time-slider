import { InjectionKey, Ref } from "vue";

export const offsetsKey = Symbol("offsetsKey") as InjectionKey<{
  scaleBarOffsets: Ref<number[]>;
}>;

export const containerKey = Symbol("containerKey") as InjectionKey<{
  container: Ref<HTMLDivElement | undefined>;
}>;

export const containerBoxKey = Symbol("containerBoxKey") as InjectionKey<{
  containerBox: Ref<HTMLDivElement | undefined>;
}>;
