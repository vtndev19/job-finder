import React, { useState, useRef, useEffect } from 'react';
import '../styles/components/AdminDropdown.scss';

export default function AdminDropdown({ trigger, children, align = 'right' }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleMenuClick = (e) => {
        // Only close if clicking on the menu container, not on items
        if (e.target === e.currentTarget) {
            setIsOpen(false);
        }
    };

    return (
        <div className="admin-dropdown" ref={dropdownRef}>
            <div className="admin-dropdown__trigger" onClick={() => setIsOpen(!isOpen)}>
                {trigger}
            </div>
            {isOpen && (
                <div 
                    className={`admin-dropdown__menu admin-dropdown__menu--${align}`}
                    onClick={handleMenuClick}
                >
                    {React.Children.map(children, (child, index) => {
                        if (React.isValidElement(child) && child.type === 'button') {
                            return React.cloneElement(child, {
                                key: index,
                                onClick: (e) => {
                                    if (child.props.onClick) {
                                        child.props.onClick(e);
                                    }
                                    setIsOpen(false);
                                }
                            });
                        }
                        return child;
                    })}
                </div>
            )}
        </div>
    );
}

