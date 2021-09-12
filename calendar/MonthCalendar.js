import React, { PureComponent } from 'react';
import moment from 'moment';
import CalendarDateInfo from './CalenderDateInfo';
import './Calendar.css';

function getCurrentDaysInMonthArray(daysInMonth) {
    let result = [];
    for(let i = 1; i <= daysInMonth; i++) {
        result.push(i);
    }
    return result;
}

class Calendar extends PureComponent {
    constructor() {
        super();
        this.state = {
            currentYear: moment().year(),
            currentMonth: moment().month(),
            currentMonthFirstDay: new Date(moment().year(), moment().month(), 1).getUTCDay(),
            currentDaysInMonth: moment(`${moment().year()}-${moment().month() + 1}`).daysInMonth(),
            currentDaysInMonthArray: getCurrentDaysInMonthArray(moment(`${moment().year()}-${moment().month() + 1}`).daysInMonth()),
            selectedDate: new Date()
        };
        debugger;
        //Bind Methods
        // this.initializeCalendar = this.initializeCalendar.bind(this);
        this.getMonthInfo = this.getMonthInfo.bind(this);
        this.nextMonth = this.nextMonth.bind(this);
        this.prevMonth = this.prevMonth.bind(this);
        this.selectDate = this.selectDate.bind(this);
        // this.initializeCalendar(this.state.currentYear, this.state.currentMonth);
    }

    // initializeCalendar(year, month) {
    //     var monthInfo = this.getMonthInfo(year, month);
    //     monthInfo.firstDay === 0 ? monthInfo.firstDay = 7 : monthInfo.firstDay;
    //     $('#calendarList').empty();
    //     for (let i = 1; i <= monthInfo.daysInMonth; i++) {

    //         // $('#calendarList').append(div);
    //     }
    //     const monthName = EventMonths.find(x => x.id === month).name;
    //     $('#yearMonth').text(year + ' ' + monthName);
    // }
    getMonthInfo(year, month) {
        console.log("year:", year);
        console.log("year:", month);
        var daysInMonth =  moment(`${year}-${month + 1}`).daysInMonth();
        var firstDay = new Date(year, month, 1).getUTCDay() + 1;
        console.log("September 1st Day:", firstDay);
        return { daysInMonth, firstDay };
    }

    nextMonth(e) {
        e.preventDefault();
        const { currentMonth, currentYear } = this.state;
        let newCurrentYear = currentYear,
            newCurrentMonth = currentMonth + 1;
        if (newCurrentMonth > 11) {
            newCurrentYear = currentYear + 1;
            newCurrentMonth = 0;
        }
        var monthInfo = this.getMonthInfo(newCurrentYear, newCurrentMonth);
        if(monthInfo.firstDay === 0) monthInfo.firstDay = 7;
        this.setState({ 
            currentYear: newCurrentYear, 
            currentMonth: newCurrentMonth,
            currentMonthFirstDay: monthInfo.firstDay,
            currentDaysInMonth: monthInfo.daysInMonth,
            currentDaysInMonthArray: getCurrentDaysInMonthArray(monthInfo.daysInMonth)
        });
    }
    
    
    prevMonth(e) {
        e.preventDefault();
        const { currentMonth, currentYear } = this.state;
        let newCurrentYear = currentYear,
            newCurrentMonth = currentMonth - 1;

        if (newCurrentMonth <= -1) {
            newCurrentYear = currentYear - 1,
            newCurrentMonth = 11;
        }
        var monthInfo = this.getMonthInfo(newCurrentYear, newCurrentMonth);
        if(monthInfo.firstDay === 0) monthInfo.firstDay = 7;
        this.setState({ 
            currentYear: newCurrentYear, 
            currentMonth: newCurrentMonth,
            currentMonthFirstDay: monthInfo.firstDay,
            currentDaysInMonth: monthInfo.daysInMonth,
            currentDaysInMonthArray: getCurrentDaysInMonthArray(monthInfo.daysInMonth)
        });
    }

    selectDate(e, day) {
        e.preventDefault();
        const { currentMonth, currentYear } = this.state;
        const newSelectedDate = new Date(currentYear, currentMonth, day);
        console.log('selectedDate: ', newSelectedDate);
        this.setState({selectedDate: newSelectedDate});
    }

    render() {
        const { currentYear, currentMonth, currentMonthFirstDay, currentDaysInMonthArray, selectedDate } = this.state;

        return (
            <React.Fragment>
                <section id="myCalendar">
                    <div className="hbContainer">
                        <div className="calendarYearMonth center">
                        <button className="left calBtn" onClick={this.prevMonth}> Prev </button>
                        <p id="yearMonth"> {moment().month(currentMonth).format('MMMM')} {currentYear}</p>
                        <button className="right calBtn" onClick={this.nextMonth}> Next </button>
                        </div>
                        <div>
                        <ol className="weekdayList">
                            <li className="day-name">Sun</li>
                            <li className="day-name">Mon</li>
                            <li className="day-name">Tue</li>
                            <li className="day-name">Wed</li>
                            <li className="day-name">Thu</li>
                            <li className="day-name">Fri</li>
                            <li className="day-name">Sat</li>
                        </ol>
                        <ol className="calendarList" id="calendarList">
                            {
                                currentDaysInMonthArray && currentDaysInMonthArray.map(day => {
                                    const isActiveDate = moment(selectedDate).isSame(new Date(currentYear, currentMonth, day), 'day');
                                    if (day === 1) {
                                        return (
                                            <li 
                                                key={day} 
                                                id={`day-${day}`} 
                                                className={`month-cell ${isActiveDate && 'active'}`}
                                                style={{gridColumnStart: currentMonthFirstDay}}
                                                onClick={e => this.selectDate(e, day)}
                                            >
                                                1
                                            </li>
                                        );
                                    } else {
                                        return (
                                            <li 
                                                key={day} 
                                                id={`day-${day}`} 
                                                className={`month-cell ${isActiveDate && 'active'}`}
                                                onClick={e => this.selectDate(e, day)}
                                            >
                                                {day}
                                            </li>
                                        );
                                    }
                                })
                            }
                        </ol>
                        </div>
                        <CalendarDateInfo date={selectedDate} />
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

export default Calendar;