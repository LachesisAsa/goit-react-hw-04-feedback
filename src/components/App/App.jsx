import { Component } from 'react';
import Main from './App.styled';
import Section from '../Section/Section';
import FeedbackOptions from '../FeedbackOptions';
import Statistics from '../Statistics';
import Notification from '../Notification';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  onIncrement = option => {
    this.setState(prevState => {
      return {
        [option]: prevState[option] + 1,
      };
    });
  };

  countTotalFeedback = options => {
    return options.reduce((total, item) => {
      total += this.state[item];
      return total;
    }, 0);
  };

  countPositiveFeedbackPercentage = total => {
    return total === 0
      ? 0
      : Number(((this.state.good / total) * 100).toFixed(0));
  };

  render() {
    const options = Object.keys(this.state);
    const { good, neutral, bad } = this.state;
    const total = this.countTotalFeedback(options);
    return (
      <Main>
        <Section title="Please leave feedback">
          <FeedbackOptions options={options} onIncrement={this.onIncrement} />
        </Section>
        <Section title="Statistics">
          {total === 0 ? (
            <Notification message="No feedback given" />
          ) : (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              positivePercentage={this.countPositiveFeedbackPercentage(total)}
            />
          )}
        </Section>
      </Main>
    );
  }
}