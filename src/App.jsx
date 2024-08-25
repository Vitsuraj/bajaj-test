import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [inputData, setInputData] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const options = ["Alphabets", "Numbers", "Highest lowercase alphabet"];

    const handleSubmit = async () => {
        try {
            const parsedData = JSON.parse(inputData);
            const response = await axios.post('https://your-api-endpoint/bfhl', { data: parsedData.data });
            setResponseData(response.data);
        } catch (error) {
            console.error("Invalid JSON input", error);
        }
    };

    const handleOptionChange = (e) => {
        const { value, checked } = e.target;
        setSelectedOptions(prev => checked ? [...prev, value] : prev.filter(opt => opt !== value));
    };

    const renderResponse = () => {
        if (!responseData) return null;
        const { alphabets, numbers, highest_lowercase_alphabet } = responseData;
        return (
            <div>
                {selectedOptions.includes("Alphabets") && <div>Alphabets: {alphabets.join(', ')}</div>}
                {selectedOptions.includes("Numbers") && <div>Numbers: {numbers.join(', ')}</div>}
                {selectedOptions.includes("Highest lowercase alphabet") && <div>Highest Lowercase: {highest_lowercase_alphabet}</div>}
            </div>
        );
    };

    return (
        <div>
            <h1>Your Roll Number</h1>
            <textarea value={inputData} onChange={e => setInputData(e.target.value)} />
            <button onClick={handleSubmit}>Submit</button>

            {responseData && (
                <>
                    <div>
                        {options.map(option => (
                            <div key={option}>
                                <label>
                                    <input type="checkbox" value={option} onChange={handleOptionChange} />
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>
                    {renderResponse()}
                </>
            )}
        </div>
    );
}

export default App;
