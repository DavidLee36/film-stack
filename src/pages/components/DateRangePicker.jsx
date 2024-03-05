import React, { useState, useEffect, useRef } from 'react';
import '../../styles/FilterStyles.css';

const DateRangePicker = ({ onDateRangeSelected }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [appliedStartDate, setAppliedStartDate] = useState('');
    const [appliedEndDate, setAppliedEndDate] = useState('');

    const datePickerRef = useRef(null); // Ref for the date picker container

    // This effect handles closing actions (Esc key or clicking outside)
    useEffect(() => {
        const handleEscapeKey = (e) => {
            if (e.key === 'Escape') {
                setIsVisible(false);
            }
        };

        const handleOutsideClick = (e) => {
            if (datePickerRef.current && !datePickerRef.current.contains(e.target) && !e.target.matches('.date-filter-btn')) {
                setIsVisible(false);
            }
        };

        document.addEventListener('keydown', handleEscapeKey);
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    // This effect reverts the startDate and endDate when the dropdown is closed without applying
    useEffect(() => {
        if (!isVisible) {
            setStartDate(appliedStartDate);
            setEndDate(appliedEndDate);
        }
    }, [isVisible, appliedStartDate, appliedEndDate]);

    const handleApply = () => {
        setAppliedStartDate(startDate);
        setAppliedEndDate(endDate);

        onDateRangeSelected({ startDate, endDate });
        setIsVisible(false); // Hide the date picker

        const btn = document.querySelector('.date-filter-btn');
        if(startDate || endDate) {
            btn.classList.add('filter-btn-active');
        }else {
            btn.classList.remove('filter-btn-active');
        }
    };

    const onClear = () => {
        setStartDate('');
        setEndDate('');
        setAppliedStartDate('');
        setAppliedEndDate('');
        const btn = document.querySelector('.date-filter-btn');
        btn.classList.remove('filter-btn-active');
        setIsVisible(false);
        onDateRangeSelected({startDate: '', endDate: ''});
    }

    return (
        <div className='filter-wrapper'>
            <button onClick={() => setIsVisible(!isVisible)} className={`main-btn-style date-filter-btn ${(appliedStartDate || appliedEndDate) && 'filter-btn-active'}`}>
                Filter Dates
            </button>
            {isVisible && (
                <div className="date-picker-container" ref={datePickerRef}>
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
                    <div className="filter-footer-btns">
                        <button className="apply-filter-btn" onClick={onClear}>Clear</button>
                        <button className='apply-filter-btn' onClick={handleApply}>Apply</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DateRangePicker;
