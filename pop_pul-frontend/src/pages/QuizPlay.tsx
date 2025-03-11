import React, { useState } from 'react';

const QuizPlay: React.FC = () => {
    const [quizId, setQuizId] = useState('');
    const [pin, setPin] = useState('');
    const [username, setUsername] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/quiz/subscribe?quizId=${quizId}&pin=${pin}&username=${username}`);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Quiz Play</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Quiz ID:</label>
                    <input
                        type="text"
                        value={quizId}
                        onChange={(e) => setQuizId(e.target.value)}
                    />
                </div>
                <div>
                    <label>PIN:</label>
                    <input
                        type="text"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                    />
                </div>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <button type="submit">Subscribe</button>
            </form>
        </div>
    );
};

export default QuizPlay;