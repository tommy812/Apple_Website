import React, {useRef} from 'react'
import {performanceImages, performanceImgPositions} from "../constants/index.js";
import {useMediaQuery} from 'react-responsive';
import {useGSAP} from "@gsap/react";
import gsap from 'gsap';
 

const Performance = () => {
    const sectionRef = useRef(null);
    const isMobile = useMediaQuery({query: '(max-width: 1024px)'});
 
    useGSAP(() => {
        const section = sectionRef.current;
        if (!section) return;

        // Text fade-in for all sizes
        gsap.fromTo(
            ".content p",
            {opacity: 0, y: 1}, 
            {
                opacity: 1,
                y: 0,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.content p',
                    start: 'top bottom',
                    end: 'top center',
                    scrub: true,
                    invalidateOnRefresh: true,
                }, 
            }
        );

        // Desktop: scrubbed timeline for images
        if (isMobile) {
            const tl = gsap.timeline({
                defaults: {ease: 'power1.inOut', duration: 2, overwrite: 'auto' },
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'center center ',
                    scrub: 1,
                    invalidateOnRefresh: true,
                },
            });

            // apply all image tweens at time 0 so they animate together with scrub
            performanceImgPositions.forEach((pos) => {
                if (pos.id === 'p5') return;


                const toVars = {};
                if (pos.mobile.left !== undefined) toVars.left = `${pos.mobile.left}%`;
                if (pos.mobile.right !== undefined) toVars.right = `${pos.mobile.right}%`;
                if (pos.mobile.bottom !== undefined) toVars.bottom = `${pos.mobile.bottom}%`;
                if (pos.mobile.transform !== undefined) toVars.transform = pos.mobile.transform;

                tl.to(`.${pos.id}`, toVars, 0);
            });
        }else {


            const tl = gsap.timeline({
                defaults: {ease: 'power1.inOut', duration: 2, overwrite: 'auto'},
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'center center ',
                    scrub: 1,
                    invalidateOnRefresh: true,
                },
            });

            // apply all image tweens at time 0 so they animate together with scrub
            performanceImgPositions.forEach((pos) => {
                if (pos.id === 'p5') return;


                const toVars = {};
                if (pos.desktop.left !== undefined) toVars.left = `${pos.desktop.left}%`;
                if (pos.desktop.right !== undefined) toVars.right = `${pos.desktop.right}%`;
                if (pos.desktop.bottom !== undefined) toVars.bottom = `${pos.desktop.bottom}%`;
                if (pos.desktop.transform !== undefined) toVars.transform = pos.desktop.transform;

                tl.to(`.${pos.id}`, toVars, 0);
            });
        }
           
    }, {scope: sectionRef, dependencies: [isMobile]});







    return (
        <section id="performance" ref={sectionRef}>
            <h2>Next-level Graphic performance. Game on.</h2>

            <div className="wrapper">
                {performanceImages.map(({id, src}) => (
                    <img key={id} id={id} className={id} src={src} alt={id}  />
                ))}
            </div>

            <div className="content">
                <p>
                    Run graphics-intensive workflows with a responsiveness that keeps up with your imagination. The M4 family of chips features a GPU with a second-generation hardware-accelerated ray tracing engine that renders images faster, so
                    {' '}<span className='text-white'>
                        gaming feels more immersive and realistic than ever.
                    </span>{' '}
                    Dynamic Caching, which better optimizes on-chip memory use for the GPU. This results in reduced memory bandwidth pressure and more consistent performance in complex scenes.
                </p>

            </div>
        </section>
    )
}
export default Performance
