import React from "react";
import "./assets/Home.css";

function Home() {
    return (
        <div className="main-content">
            <div className="welcome-section">
                <div className="welcome-text">
                    <h1 >Welcome to ChatUp</h1>
                    <p>Connect with your friends and family instantly. Enjoy seamless and secure messaging.</p>
                    <button className="start-chat-btn">Start Chatting</button>
                </div>
                <div className="welcome-image">
                    <img src="./chating.png" alt="Welcome to ChatUp" />
                </div>
            </div>
            <h1 className="test-text">Features</h1>
            <div className="features-section">
            
                <div className="feature">
                    <i className="fas fa-comments"></i>
                    <h2>Real-time Messaging</h2>
                    <p>Experience real-time communication with your contacts. Instant delivery, instant replies.</p>
                </div>
                <div className="feature">
                    <i className="fas fa-user-shield"></i>
                    <h2>Privacy & Security</h2>
                    <p>Your privacy is our priority. We ensure end-to-end encryption for all your conversations.</p>
                </div>
                <div className="feature">
                    <i className="fas fa-smile"></i>
                    <h2>Custom Emojis</h2>
                    <p>Express yourself with custom emojis. Personalize your messages with unique and fun graphics.</p>
                </div>
            </div>
            
            <h2 className="test-text">What Our Users Say</h2>
            <section className="testimonials">
                <div className="testimonial">
                    <p>"ChatUp has completely transformed the way I stay in touch with my friends and family ♥️. The user-friendly interface and reliable features make it my go-to messaging app!☺️"</p>
                    <p className="author">- Sachin</p>
                </div>
                <div className="testimonial">
                    <p>"I love the group chat feature on ChatUp ❣️. It's perfect for staying connected with my work team and friends 👍🏻."</p>
                    <p className="author">- Arun Mathew</p>
                </div>
                <div className="testimonial">
                    <p>"The secure conversations on ChatUp give me peace of mind knowing that my messages are private and safe 🤩. Highly recommended for anyone who values their privacy ✌️."</p>
                    <p className="author">- Prabha</p>
                </div>
            </section>
        </div>
    );
}

export default Home;
