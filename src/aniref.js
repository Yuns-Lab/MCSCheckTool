import { TransitionPresets, useTransition } from "@vueuse/core";

export const applyAnimation = (old_var) => {
    const new_var = useTransition(old_var, {
        duration: 1500,
        transition: TransitionPresets.easeInOutCubic,
    });
    return new_var
}