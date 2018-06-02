import React, { Component } from 'react'
import './App.scss'

class App extends Component {
  constructor () {
    super()
    this.state = {
      date: new Date()
    }
  }

  componentDidMount () {
    setInterval(() => this.setState({date: new Date()}), 1000)
  }

  mask = (mask,value) => {
    let str = Math.pow(10,mask.length) + value +''
    str = str.split('')
    str.shift()

    return str
  }
  render () {
    let {date} = this.state
    let year = this.mask('xxxx',date.getFullYear())
    let month = this.mask('xx',date.getMonth())
    let day = this.mask('xx',date.getDate())
    let hour = this.mask('xx',date.getHours())
    let min = this.mask('xx',date.getMinutes())
    let sec = this.mask('xx',date.getSeconds())
    return (
      <div className='App'>
        <div className='clock'>
          <div className={'date'}>
            <Number number={year[0]} />
            <Number number={year[1]} />
            <Number number={year[2]} />
            <Number number={year[3]} />
            <span className={'delimiter'}>{'-'}</span>
            <Number number={month[0]} />
            <Number number={month[1]} />
            <span className={'delimiter'}>{'-'}</span>
            <Number number={day[0]} />
            <Number number={day[1]} />
          </div>
          <br/>
          <div className={'time'}>
            <Number number={hour[0]} />
            <Number number={hour[1]} />
            <span className={'delimiter'}>{':'}</span>
            <Number number={min[0]} />
            <Number number={min[1]} />
            <span className={'delimiter'}>{':'}</span>
            <Number number={sec[0]} />
            <Number number={sec[1]} />
          </div>
        </div>
        <div className={'container'}>
          <div className='top-half red' />
          <div className='bottom-half green' id='animation' />
        </div>
      </div>
    )
  }
}

class Number extends Component {
  constructor () {
    super()
    this.state = {
      before: null,
      run: false
    }
  }

  getSnapshotBeforeUpdate(prevProps,prevState){
    if(this.props.number !== prevProps.number){
      this.setState({
        run: true
      })
    }

    return null
  }

  static getDerivedStateFromProps(props){
    let before = props.number -1

    if(before < 0){
      before = 9
    }
    return {
      before
    }
  }

  endAnimation = () => {
    this.setState({
      run: false
    })
  }

  render () {
    let {number} = this.props
    let after = number
    let {before,run} = this.state

    return <div className='number'>
      <span className='before-top' id={run ? 'fold' : ''} onAnimationEnd={this.endAnimation}><span className={'number-mask'}>{before}</span></span>
      <span className='before-bottom'><span className={'number-mask'}>{before}</span></span>
      <span className='after-top'><span className={'number-mask'}>{after}</span></span>
      <span className='after-bottom' id={run ? 'fold-inv': ''} onAnimationEnd={this.endAnimation}><span className={'number-mask'}>{after}</span></span>
    </div>
  }
}
export default App
