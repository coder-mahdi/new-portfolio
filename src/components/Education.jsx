import { useState, useEffect } from 'react';

function Education() {
    const [educationData, setEducationData] = useState({
        title: '',
        explanation: '',
        universities: []
    });

    useEffect(() => {
        fetch('/data/educationData.json')
            .then(response => response.json())
            .then(data => setEducationData(data))
            .catch(error => console.error('Error loading education data:', error));
    }, []);

    return (
        <div className="education">
            <h2>{educationData.title || "loading..."}</h2>
            <p>{educationData.explanation || ""}</p>
            <div className="universities">
                {educationData.universities?.map((edu, index) => (
                    <div key={index} className="university">
                        <h3>{edu.name}</h3>
                        <p className="university__degree">{edu.degree}</p>
                        <p className="university__field">{edu.field}</p>
                        <p className="university__date">{edu.date}</p>
                        {edu.description && (
                            <p className="university__description">{edu.description}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Education; 