import React, { Component } from 'react'
import './index.scss'

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

  componentDidUpdate () {
    return null
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

export default Number
