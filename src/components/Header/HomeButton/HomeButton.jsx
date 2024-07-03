import React from 'react';
import {Link} from "react-router-dom";
import "./HomeButton.css"

const HomeButton = () => {
    return (
        <div>
            <div className="GoToStartButton_Conteiner">
                <div>

                    <Link to={"/"}>
                        <button data-glow>
                            Главная
                        </button>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default HomeButton;