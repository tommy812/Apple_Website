//detects phone size and animate trasitions usign gsap and presentation controls

import React, {useRef} from 'react'
import {PresentationControls} from "@react-three/drei";
import MacbookModel16 from "../models/Macbook-16.jsx";
import MacbookModel14 from "../models/Macbook-14.jsx";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";

    const ANIMATIONS_DURATION =  1; //second
    const OFFSET_DISTANCE = 5;

    const fadeMashes = (group, opacity) => {
        if(!group) return;

        group.traverse((child) => {
            if(child.isMesh) {
                child.material.trasparent = true;
                gsap.to(child.material, {opacity, duration:OFFSET_DISTANCE});
            }
        })
    }

    const moveGroup = (group, x) => {
        if(!group) return;
        gsap.to(group.position, {x, duration:ANIMATIONS_DURATION})
    }


    const ModelSwitcher = ({scale, isMobile}) => {
        const SCALE_LARGE_DESKTOP = 0.08
        const SCALE_LARGE_MOBILE = 0.05
        const smallMacbookRef = useRef();
        const largeMacbookRef = useRef();

        const showLargeMacbook= scale === SCALE_LARGE_DESKTOP || scale === SCALE_LARGE_MOBILE;

        useGSAP(() =>  {
            if(showLargeMacbook){
                moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE);
                moveGroup(largeMacbookRef.current, 0);

                fadeMashes(smallMacbookRef.current, 0);
                fadeMashes(smallMacbookRef.current, 1 );
            }else{
                moveGroup(smallMacbookRef.current, 0);
                moveGroup(largeMacbookRef.current, +OFFSET_DISTANCE);

                fadeMashes(smallMacbookRef.current, 1);
                fadeMashes(smallMacbookRef.current, 0 );
            }


        }, [scale])

        const controlsConfig ={
            snap: true,
            speed:1,
            zoom:1,
            polar:[-Math.PI,Math.PI],//slide vertically
            azimuth:[-Infinity, Infinity],
            config: {mass:1, tension: 0, friction: 26}


        }

        return (
            <>
                <PresentationControls {...controlsConfig}>
                    <group ref={largeMacbookRef}>
                        <MacbookModel16 scale={isMobile ? SCALE_LARGE_MOBILE : SCALE_LARGE_DESKTOP}/>
                    </group>
                </PresentationControls>
                <PresentationControls {...controlsConfig}>
                    <group ref={smallMacbookRef}>
                        <MacbookModel14 scale={isMobile ? 0.04 : 0.07}/>
                    </group>
                </PresentationControls>
            </>
        )
    }
export default ModelSwitcher
