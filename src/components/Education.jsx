import React from 'react';

function Education({ homeData, graduationIconRef, educationSectionRef, educationContentRef }) {
    return (
        <div className='education-section' id="education-section" ref={educationSectionRef}>
            <div className='education-content' ref={educationContentRef}>
                <h2>{homeData.education?.title || "loading..."}</h2>
                <p>{homeData.education?.explanation || ""}</p>
            </div>

            <div className='education-list'>
                <div className='education-container'>
                    <i className="fas fa-graduation-cap graduation-icon" ref={graduationIconRef}></i>
                    <div className="education-items">
                        {homeData.education?.universities?.map((edu, index) => {
                            // Create a strict alternating pattern
                            const rowNumber = index + 1;
                            const isFirstRow = rowNumber === 1;
                            const isThirdRow = rowNumber === 3;
                            const isFifthRow = rowNumber === 5;
                            
                            // Empty box should be on right for rows 2, 4, 6...
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