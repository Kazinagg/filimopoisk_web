import React from 'react';
import {Link} from "react-router-dom";
import "./HomeButton.css"

const HomeButton = () => {
    return (
        <div>
            <div className="GoToStartButton_Conteiner">
                <div>
                    <div data-glow className="GoToStartButton">
                        <Link to={"/"}>
                            Главная
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeButton;