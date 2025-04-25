import React, { useEffect, useState } from "react";
import { useMotionValue, useSpring, frame } from 'framer-motion';

const spring = { damping: 15, stiffness: 50, restDelta: 0.001 };

export function useFollowPointer(ref) {
    const xPoint = useMotionValue(0);
    const yPoint = useMotionValue(0);
    const x = useSpring(xPoint, spring);
    const y = useSpring(yPoint, spring);

    useEffect(() => {
        // Check if device is touch-enabled
        const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
        if (isTouchDevice) return null;

        const handelPointerMove = ({ pageX, pageY }) => {
            if (!ref.current) return;

            const element = ref.current;

            frame.read(() => {
                xPoint.set(pageX);
                yPoint.set(pageY);
            });
        };

        window.addEventListener("pointermove", handelPointerMove);

        return () => window.removeEventListener("pointermove", handelPointerMove);
    }, [xPoint, yPoint, ref]);

    // Return null for motion values on touch devices
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return { x: null, y: null };

    return { x, y };
}
  