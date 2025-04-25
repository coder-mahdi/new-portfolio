import React, { useEffect, useRef } from 'react';

function Education({ homeData, graduationIconRef, educationSectionRef, educationContentRef }) {
    const educationListRef = useRef(null);
    const educationItemsRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (graduationIconRef.current && educationListRef.current && educationItemsRef.current) {
                const educationSection = educationSectionRef.current;
                if (educationSection) {
                    const rect = educationSection.getBoundingClientRect();
                    const itemsRect = educationItemsRef.current.getBoundingClientRect();
                    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                    
                    if (isVisible) {
                        graduationIconRef.current.classList.add('visible');
                        
                        const itemsHeight = educationItemsRef.current.offsetHeight;
                        const viewportHeight = window.innerHeight;
                        
                        // Calculate progress based on education-items position
                        const scrollProgress = Math.min(1, Math.max(0, 
                            (viewportHeight - itemsRect.top) / (itemsRect.height + viewportHeight)
                        ));
                        
                        // Smooth easing function
                        const smoothProgress = t => {
                            // Cubic easing for smooth movement
                            return t < 0.5 
                                ? 4 * t * t * t 
                                : 1 - Math.pow(-2 * t + 2, 3) / 2;
                        };
                        
                        const finalProgress = smoothProgress(scrollProgress);
                        
                        // Calculate icon position relative to education-items
                        const iconPosition = finalProgress * itemsHeight;
                        graduationIconRef.current.style.top = `${iconPosition}px`;
                    } else {
                        graduationIconRef.current.classList.remove('visible');
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [graduationIconRef, educationSectionRef]);

    return (
        <div className='education-section' id="education-section" ref={educationSectionRef}>
            <div className='education-content' ref={educationContentRef}>
                <h2>{homeData.education?.title || "loading..."}</h2>
                <p>{homeData.education?.explanation || ""}</p>
            </div>

            <div className='education-list' ref={educationListRef}>
                <div className='education-container'>
                    <i className="fas fa-graduation-cap graduation-icon" ref={graduationIconRef}></i>
                    <div className="education-items" ref={educationItemsRef}>
                        {homeData.education?.universities?.map((edu, index) => {
                            const rowNumber = index + 1;
                            const isFirstRow = rowNumber === 1;
                            const isThirdRow = rowNumber === 3;
                            const isFifthRow = rowNumber === 5;
                            const emptyBoxOnLeft = isFirstRow || isThirdRow || isFifthRow || rowNumber % 2 === 1;
                            
                            return (
                                <div key={index} className={`education-row row-${rowNumber}`}>
                                    {emptyBoxOnLeft ? (
                                        <>
                                            <div className="empty-box"></div>
                                            <div className="content-box">
                                                <h3>{edu.name}</h3>
                                                <p>{edu.university}</p>
                                                <p>{edu.degree}</p>
                                                <p>{edu.duration}</p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="content-box">
                                                <h3>{edu.name}</h3>
                                                <p>{edu.university}</p>
                                                <p>{edu.degree}</p>
                                                <p>{edu.duration}</p>
                                            </div>
                                            <div className="empty-box"></div>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Education; 