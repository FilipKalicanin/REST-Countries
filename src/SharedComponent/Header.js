import React, { useContext } from 'react';
import Moon from './IconMoon';
import { ThemeContext } from './ThemeContext';

function Header() {
    const context = useContext(ThemeContext);

    return (
        <div className={context.currentTheme === 'light' ? 'header-wrapper' : 'header-wrapper-dark'}>
            <div className={context.currentTheme === 'light' ? 'header-data-container' : 'header-data-container-dark'}>
                <h2 className="header-heading">Where in the world?</h2>
                <div className="header-theme-container">
                    <Moon />
                    <button className={context.currentTheme === 'light' ? 'header-theme-button' : 'header-theme-button-dark'} onClick={context.toggleTheme}>Switch theme</button>
                </div>
            </div>
        </div>
    )
}

export default Header