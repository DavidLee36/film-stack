import React, { useState, useEffect } from 'react';
import '../../styles/FilterStyles.css'; // Adjust the path as necessary

const DateRangePicker = ({ onDateRangeSelected }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const handleEscapeKey = (e) => {
            if (e.key === 'Escape') {
                setIsVisible(false);
            }
        };

        const handleWindowClick = (e) => {
            if(!e.target.classList.contains('date-picker-container') &&
            !e.target.classList.contains('date-input') && 
            !e.target.classList.contains('date-filter-btn')) {
                setIsVisible(false);
            }
        }

        // Add event listener
        window.addEventListener('keydown', handleEscapeKey);
        window.addEventListener('click', handleWindowClick);

        // Clean up
        return () => {
            window.removeEventListener('keydown', handleEscapeKey);
            window.removeEventListener('click', handleWindowClick);
        };
    }, []);

    const handleApply = () => {
        const dateBtn = document.querySelector('.date-filter-btn');

        const selectedDates = {
            'startDate': startDate,
            'endDate': endDate
        }

        if(selectedDates.startDate || selectedDates.endDate) {
            dateBtn.classList.add('filter-btn-active');
        }else {
            dateBtn.classList.remove('filter-btn-active');
        }

        onDateRangeSelected(selectedDates);
        setIsVisible(false); // Hide the date picker
    };

    return (
        <div>
            <button onClick={() => setIsVisible(!isVisible)} className='main-btn-style date-filter-btn'>Filter Dates</button>
            {isVisible && (
                <div className="date-picker-container">
                    <h3>Released After:</h3>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className='date-input'
                    />
                    <h3>Released Before:</h3>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className='date-input'
                    />
                    <button onClick={handleApply}>Apply</button>
                </div>
            )}
        </div>
    );
};

export default DateRangePicker;
