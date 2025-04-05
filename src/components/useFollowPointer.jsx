import React, { useEffect } from 'react';
import { useMotionValue, useSpring, frame } from 'framer-motion';

const spring = { damping: 2, stiffness: 60, restDelta: 0.001 };

export function useFollowPointer(ref) {
    const xPoint = useMotionValue(0);
    const yPoint = useMotionValue(0);
    const x = useSpring(xPoint, spring);
    const y = useSpring(yPoint, spring);

    useEffect(() => {
        const isTouchDevice = Window.matchMedia("(pointer: coarse)").matches;

        if  (isTouchDevice) return;

        const handelPointerMove = ({ clientX, clientY }) => {
            if (!ref.current) returen;

            const element = ref.current;

            frame.read(() => {
                xPoint.set(clientX - element.offsetLeft - element.offsetWidth / 2);
                yPoint.set(clientY - element.offsetTop - element.offsetWidth / 2);
            });
        };

        window.addEventListener("pointermove", handelPointerMove);

        return () => window.removeEventListener("pointermove", handelPointerMove);
    }, [xPoint, yPoint, ref]);

    return { x, y };
}
  