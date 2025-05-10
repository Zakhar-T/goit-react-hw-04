import { useState, useEffect } from 'react';
import Description from '../Description/Description';
import Feedback from '../Feedback/Feedback';
import Options from '../Options/Options';
import css from './App.module.css';
import Notification from '../Notification/Notification';

export default function App() {
  const [state, setState] = useState(() => {
    if (window.localStorage.getItem('savedState') !== null) {
      return JSON.parse(window.localStorage.getItem('savedState'));
    }
    return {
      good: 0,
      neutral: 0,
      bad: 0,
    };
  });
  const stateSum = state.good + state.neutral + state.bad;
  const goodPercentage = Math.round((state.good / stateSum) * 100);

  const updateFeedback = (feedbackType) => {
    if (feedbackType === 'reset') {
      return setState({
        good: 0,
        neutral: 0,
        bad: 0,
      });
    }
    setState({ ...state, [feedbackType]: (state[feedbackType] += 1) });
  };

  useEffect(() => {
    window.localStorage.setItem('savedState', JSON.stringify(state));
  }, [state]);

  return (
    <div className={css.container}>
      <Description />
      <Options updateState={updateFeedback} votes={stateSum} />
      {stateSum ? (
        <Feedback
          clicks={state}
          total={stateSum}
          positivePercent={goodPercentage}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}
